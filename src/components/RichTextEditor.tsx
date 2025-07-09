import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  label?: string;
  placeholder?: string;
  height?: number;
  disabled?: boolean;
  error?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = "Scrivi qui il contenuto dell'articolo...",
  height = 400,
  disabled = false,
  error
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="border rounded-md overflow-hidden">
        <Editor
          apiKey="no-api-key" // Per uso locale, non serve chiave API
          onInit={(evt, editor) => editorRef.current = editor}
          value={value}
          onEditorChange={handleEditorChange}
          disabled={disabled}
          init={{
            height,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
              'emoticons', 'codesample', 'hr', 'pagebreak', 'nonbreaking',
              'visualchars', 'paste', 'textpattern', 'imagetools'
            ],
            toolbar: [
              'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor',
              'alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist',
              'link image media table | codesample blockquote hr pagebreak',
              'removeformat | fullscreen preview code | emoticons charmap | help'
            ].join(' | '),
            content_style: `
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
                font-size: 14px;
                line-height: 1.6;
                color: #333;
                margin: 1rem;
              }
              h1, h2, h3, h4, h5, h6 {
                color: #2563eb;
                margin-bottom: 0.5rem;
                margin-top: 1rem;
              }
              h1 { font-size: 2rem; }
              h2 { font-size: 1.75rem; }
              h3 { font-size: 1.5rem; }
              h4 { font-size: 1.25rem; }
              h5 { font-size: 1.1rem; }
              h6 { font-size: 1rem; }
              p { margin-bottom: 1rem; }
              ul, ol { margin-bottom: 1rem; padding-left: 2rem; }
              li { margin-bottom: 0.25rem; }
              blockquote {
                border-left: 4px solid #2563eb;
                margin: 1rem 0;
                padding-left: 1rem;
                font-style: italic;
                background-color: #f8fafc;
                padding: 1rem;
                border-radius: 0.25rem;
              }
              pre {
                background-color: #1e293b;
                color: #e2e8f0;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
                margin: 1rem 0;
              }
              code {
                background-color: #f1f5f9;
                padding: 0.125rem 0.25rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
              }
              table {
                border-collapse: collapse;
                width: 100%;
                margin: 1rem 0;
              }
              table, th, td {
                border: 1px solid #e2e8f0;
              }
              th, td {
                padding: 0.5rem;
                text-align: left;
              }
              th {
                background-color: #f8fafc;
                font-weight: bold;
              }
              img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 1rem 0;
              }
              a {
                color: #2563eb;
                text-decoration: underline;
              }
              a:hover {
                color: #1d4ed8;
              }
            `,
            placeholder,
            branding: false,
            resize: false,
            elementpath: false,
            statusbar: true,
            paste_data_images: true,
            images_upload_handler: (blobInfo: any, progress: any) => {
              return new Promise((resolve, reject) => {
                // Per ora convertiremo l'immagine in base64
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(reader.result as string);
                };
                reader.onerror = () => {
                  reject('Errore nel caricamento dell\'immagine');
                };
                reader.readAsDataURL(blobInfo.blob());
              });
            },
            image_advtab: true,
            image_uploadtab: true,
            media_live_embeds: true,
            media_url_resolver: (data: any, resolve: any) => {
              // Gestione automatica per YouTube, Vimeo, etc.
              if (data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
                let videoId = '';
                if (data.url.includes('youtube.com')) {
                  videoId = data.url.split('v=')[1]?.split('&')[0];
                } else {
                  videoId = data.url.split('youtu.be/')[1]?.split('?')[0];
                }
                if (videoId) {
                  resolve({
                    html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`
                  });
                }
              }
              resolve({ html: '' });
            },
            table_responsive_width: true,
            table_default_attributes: {
              border: '1'
            },
            table_default_styles: {
              'border-collapse': 'collapse',
              'width': '100%'
            },
            link_default_target: '_blank',
            target_list: [
              { title: 'Stessa finestra', value: '_self' },
              { title: 'Nuova finestra', value: '_blank' }
            ],
            codesample_languages: [
              { text: 'HTML/XML', value: 'markup' },
              { text: 'JavaScript', value: 'javascript' },
              { text: 'CSS', value: 'css' },
              { text: 'PHP', value: 'php' },
              { text: 'Python', value: 'python' },
              { text: 'Java', value: 'java' },
              { text: 'C', value: 'c' },
              { text: 'C#', value: 'csharp' },
              { text: 'C++', value: 'cpp' },
              { text: 'SQL', value: 'sql' },
              { text: 'JSON', value: 'json' }
            ],
            setup: (editor) => {
              // Aggiungiamo alcuni pulsanti personalizzati
              editor.ui.registry.addButton('customButton', {
                text: 'Inserisci CTA',
                tooltip: 'Inserisci call-to-action',
                onAction: () => {
                  editor.insertContent(`
                    <div style="background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 1.5rem; border-radius: 0.5rem; text-align: center; margin: 1.5rem 0;">
                      <h3 style="color: white; margin-bottom: 0.5rem;">Hai bisogno di aiuto?</h3>
                      <p style="margin-bottom: 1rem;">Contattaci per una consulenza gratuita</p>
                      <a href="/contatti" style="background: rgba(255,255,255,0.2); color: white; padding: 0.75rem 1.5rem; border-radius: 0.25rem; text-decoration: none; font-weight: bold;">Contattaci</a>
                    </div>
                  `);
                }
              });
            }
          }}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}