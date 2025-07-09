import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuditRequestData {
  nome: string;
  azienda: string;
  whatsapp: string;
  obiettivo_principale: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { nome, azienda, whatsapp, obiettivo_principale }: AuditRequestData = await req.json();

    console.log("Processing audit welcome email for:", { nome, azienda });

    // 1. Invia email di benvenuto immediata
    const welcomeSubject = `Benvenuto ${nome}! Il tuo audit gratuito è in preparazione`;
    const welcomeBody = `
      <h2>Ciao ${nome},</h2>
      
      <p>Grazie per aver richiesto l'audit gratuito per <strong>${azienda}</strong>!</p>
      
      <p>Il nostro team di esperti è già al lavoro per analizzare il tuo obiettivo: <em>${obiettivo_principale}</em></p>
      
      <h3>Cosa succede ora:</h3>
      <ul>
        <li>📞 Ti contatteremo entro 2 ore lavorative al numero WhatsApp: ${whatsapp}</li>
        <li>📊 Prepareremo un'analisi personalizzata per la tua azienda</li>
        <li>💡 Ti forniremo strategie concrete per raggiungere i tuoi obiettivi</li>
      </ul>
      
      <p>Nel frattempo, ti consigliamo di leggere questo articolo sui <a href="https://vdokiyowgmsdqjaewcxi.supabase.co/blog/5-errori-fatali-siti-web">5 errori fatali che le aziende italiane commettono con i loro siti web</a>.</p>
      
      <p>A presto!</p>
      <p><strong>Il Team OptixWeb</strong><br>
      40+ esperti al tuo servizio</p>
    `;

    // Salva l'email nella sequence
    await supabase
      .from('email_sequences')
      .insert({
        sequence_type: 'welcome',
        email_subject: welcomeSubject,
        email_body: welcomeBody
      });

    // 2. Programma follow-up automatico dopo 24 ore
    const followUpDate = new Date();
    followUpDate.setHours(followUpDate.getHours() + 24);

    const followUpSubject = `${nome}, non dimenticare il tuo audit gratuito per ${azienda}`;
    const followUpBody = `
      <h2>Ciao ${nome},</h2>
      
      <p>Ieri hai richiesto l'audit gratuito per <strong>${azienda}</strong>, ma forse non siamo riusciti a contattarti.</p>
      
      <p>Non perdere questa opportunità! I nostri audit hanno aiutato oltre 200 aziende italiane a:</p>
      <ul>
        <li>🚀 Aumentare le vendite online del 150% in media</li>
        <li>📈 Triplicare i lead qualificati</li>
        <li>💰 Migliorare il ROI degli investimenti digitali</li>
      </ul>
      
      <p>Clicca qui per prenotare direttamente una chiamata: <a href="https://wa.me/393451234567?text=Ciao!%20Vorrei%20parlare%20del%20mio%20audit%20per%20${encodeURIComponent(azienda)}">WhatsApp Diretto</a></p>
      
      <p>Oppure rispondi a questa email con il momento migliore per chiamarti.</p>
      
      <p>Il tuo successo online ci sta a cuore!</p>
      <p><strong>Il Team OptixWeb</strong></p>
    `;

    // Programma il follow-up
    const scheduleResponse = await fetch(
      `${supabaseUrl}/functions/v1/schedule-follow-up`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_subject: followUpSubject,
          email_body: followUpBody,
          send_at: followUpDate.toISOString(),
          recipient: { nome, azienda, whatsapp }
        })
      }
    );

    console.log("Welcome sequence initiated successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Welcome email sent and follow-up scheduled",
        follow_up_scheduled: followUpDate.toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-audit-welcome:", error);
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