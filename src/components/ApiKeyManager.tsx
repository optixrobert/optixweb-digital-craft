import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const ApiKeyManager = () => {
  const [keyName, setKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateApiKey = async () => {
    if (!keyName.trim()) {
      toast.error('Inserisci un nome per la chiave API');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-api-key', {
        body: { name: keyName }
      });

      if (error) throw error;

      setGeneratedKey(data.api_key);
      setKeyName('');
      toast.success('Chiave API generata con successo!');
    } catch (error) {
      toast.error('Errore nella generazione della chiave API');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genera API Key</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Nome della chiave API"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
          />
          <Button onClick={generateApiKey} disabled={isGenerating}>
            {isGenerating ? 'Generando...' : 'Genera'}
          </Button>
        </div>
        
        {generatedKey && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-700 mb-2">
              ⚠️ Copia questa chiave ora! Non sarà più visibile:
            </p>
            <code className="block p-2 bg-white border rounded text-sm break-all">
              {generatedKey}
            </code>
          </div>
        )}
      </CardContent>
    </Card>
  );
};