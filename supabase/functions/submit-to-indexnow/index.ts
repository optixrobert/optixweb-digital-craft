import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const indexNowApiKey = Deno.env.get('INDEXNOW_API_KEY');
    
    if (!indexNowApiKey) {
      console.error('INDEXNOW_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'IndexNow API key not configured' }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { urlList, host } = await req.json();
    
    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      return new Response(
        JSON.stringify({ error: 'urlList is required and must be a non-empty array' }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const requestHost = host || 'optixweb.space';
    
    // Prepare IndexNow request payload
    const indexNowPayload = {
      host: requestHost,
      key: indexNowApiKey,
      keyLocation: `https://${requestHost}/${indexNowApiKey}.txt`,
      urlList: urlList
    };

    console.log('Submitting to IndexNow:', indexNowPayload);

    // Submit to IndexNow API
    const indexNowResponse = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(indexNowPayload),
    });

    const responseText = await indexNowResponse.text();
    console.log('IndexNow response status:', indexNowResponse.status);
    console.log('IndexNow response:', responseText);

    if (indexNowResponse.ok || indexNowResponse.status === 202) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'URLs submitted to IndexNow successfully',
          submittedUrls: urlList.length,
          status: indexNowResponse.status
        }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    } else {
      console.error('IndexNow API error:', indexNowResponse.status, responseText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit to IndexNow',
          status: indexNowResponse.status,
          details: responseText
        }), 
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

  } catch (error) {
    console.error('Error in submit-to-indexnow function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});