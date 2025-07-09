import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ]
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'check',
    'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div 
        className="border rounded-md overflow-hidden bg-background"
        style={{ height: height }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={disabled}
          style={{
            height: height - 42, // Account for toolbar height
            fontFamily: 'inherit'
          }}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .ql-toolbar {
            border-bottom: 1px solid hsl(var(--border));
            border-top: none;
            border-left: none;
            border-right: none;
          }
          
          .ql-container {
            border: none;
            font-family: inherit;
          }
          
          .ql-editor {
            font-family: inherit;
            font-size: 14px;
            line-height: 1.6;
          }
          
          .ql-editor.ql-blank::before {
            color: hsl(var(--muted-foreground));
            font-style: italic;
          }
          
          .ql-editor h1 {
            font-size: 2rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ql-editor h2 {
            font-size: 1.75rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ql-editor h3 {
            font-size: 1.5rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ql-editor h4 {
            font-size: 1.25rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ql-editor h5 {
            font-size: 1.1rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ql-editor h6 {
            font-size: 1rem;
            font-weight: bold;
            color: hsl(var(--foreground));
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .ql-editor p {
            margin-bottom: 1rem;
          }
          
          .ql-editor ul, .ql-editor ol {
            margin-bottom: 1rem;
          }
          
          .ql-editor blockquote {
            border-left: 4px solid hsl(var(--primary));
            margin: 1rem 0;
            padding-left: 1rem;
            font-style: italic;
            background-color: hsl(var(--muted));
            padding: 1rem;
            border-radius: 0.25rem;
          }
          
          .ql-editor pre {
            background-color: hsl(var(--muted));
            color: hsl(var(--foreground));
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1rem 0;
          }
          
          .ql-editor code {
            background-color: hsl(var(--muted));
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
          }
          
          .ql-editor img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }
          
          .ql-editor a {
            color: hsl(var(--primary));
            text-decoration: underline;
          }
          
          .ql-editor a:hover {
            color: hsl(var(--primary));
            opacity: 0.8;
          }
        `
      }} />
    </div>
  );
}