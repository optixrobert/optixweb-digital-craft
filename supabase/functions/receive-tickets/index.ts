import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verifica API key
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Missing or invalid Authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const apiKey = authHeader.replace('Bearer ', '');
    
    // Hash della chiave ricevuta per la verifica
    const encoder = new TextEncoder();
    const data = encoder.encode(apiKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = new Uint8Array(hashBuffer);
    const keyHash = Array.from(hashArray).map(b => b.toString(16).padStart(2, '0')).join('');

    // Verifica che la chiave esista ed è attiva
    const { data: apiKeyRecord, error: keyError } = await supabase
      .from('api_keys')
      .select('user_id, is_active, name')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (keyError || !apiKeyRecord) {
      console.log('API key validation failed:', keyError);
      return new Response(JSON.stringify({ error: 'Invalid API key' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Aggiorna last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('key_hash', keyHash);

    // Leggi i dati del ticket dalla richiesta
    const ticketData = await req.json();
    
    console.log('Received ticket data:', ticketData);
    console.log('From API key:', apiKeyRecord.name, 'User ID:', apiKeyRecord.user_id);

    // Valida i campi obbligatori
    if (!ticketData.title || !ticketData.description) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: title and description' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Salva il ticket nel database
    const { data: newTicket, error: insertError } = await supabase
      .from('tickets')
      .insert({
        user_id: apiKeyRecord.user_id,
        title: ticketData.title,
        description: ticketData.description,
        category: ticketData.category || 'general',
        priority: ticketData.priority || 'medium',
        status: 'open'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting ticket:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to create ticket' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Invia eventualmente a sistema esterno OptixWeb
    const optixWebApiKey = Deno.env.get('OPTIX_WEB_API_KEY');
    if (optixWebApiKey) {
      try {
        const response = await fetch('https://weareoptixweb.cloud/api/tickets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${optixWebApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...ticketData,
            source: 'lovable-platform',
            ticket_id: newTicket.id,
            created_at: newTicket.created_at
          })
        });

        if (!response.ok) {
          console.error('Failed to sync with OptixWeb:', response.status, response.statusText);
        } else {
          console.log('Successfully synced ticket with OptixWeb');
        }
      } catch (error) {
        console.error('Error syncing with OptixWeb:', error);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Ticket received and processed successfully',
      ticket_id: newTicket.id,
      status: 'created'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error processing ticket:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});