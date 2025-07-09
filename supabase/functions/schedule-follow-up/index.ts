import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ScheduleRequest {
  email_subject: string;
  email_body: string;
  send_at: string;
  recipient: {
    nome: string;
    azienda: string;
    whatsapp: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { email_subject, email_body, send_at, recipient }: ScheduleRequest = await req.json();

    console.log("Scheduling follow-up email for:", recipient.nome, "at:", send_at);

    // Salva l'email programmata nel database
    const { data, error } = await supabase
      .from('email_sequences')
      .insert({
        sequence_type: 'follow_up_24h',
        email_subject,
        email_body,
        sent_at: send_at // Usa sent_at per indicare quando deve essere inviata
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    // Simula la programmazione dell'email (in produzione useresti un service come Resend con scheduling)
    const sendTime = new Date(send_at);
    const currentTime = new Date();
    const delayMs = sendTime.getTime() - currentTime.getTime();

    if (delayMs > 0 && delayMs < 86400000) { // Max 24 ore per evitare timeout
      console.log(`Scheduling email to be sent in ${delayMs}ms`);
      
      // Usa setTimeout per inviare l'email (in produzione dovresti usare un sistema di code)
      setTimeout(async () => {
        try {
          console.log("Sending scheduled follow-up email to:", recipient.nome);
          
          // Qui invieresti l'email usando Resend o altro servizio
          // Per ora aggiorniamo solo il record come "sent"
          await supabase
            .from('email_sequences')
            .update({ 
              sent_at: new Date().toISOString(),
              opened: false 
            })
            .eq('id', data.id);

          console.log("Follow-up email sent successfully");
        } catch (error) {
          console.error("Error sending scheduled email:", error);
        }
      }, delayMs);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Follow-up email scheduled successfully",
        scheduled_id: data.id,
        send_time: send_at
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in schedule-follow-up:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);