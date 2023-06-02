import { Editor as MonacoEditor } from '@monaco-editor/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'

interface MarkdownEditorProps {
  content: string
  onChange: (event: string | undefined) => void
}

export const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  return (
    <Tabs defaultValue="editor" className="flex-1">
      <TabsList>
        <TabsTrigger value="editor">Editor</TabsTrigger>
      </TabsList>

      <TabsContent value="editor">
        <MonacoEditor
          aria-label="Editor"
          height={700}
          width={600}
          value={content}
          language="markdown"
          theme="vs-dark"
          onChange={onChange}
          options={{
            minimap: {
              enabled: false,
            },
            fontFamily: 'Fira Code',
            language: 'markdown',
            fontSize: 16,
            wordWrap: 'on',
          }}
        />
      </TabsContent>
    </Tabs>
  )
}
