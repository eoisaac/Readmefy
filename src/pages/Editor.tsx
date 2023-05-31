import { Editor as MonacoEditor } from '@monaco-editor/react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'

export const Editor = () => {
  const [content, setContent] = useState<string>('')

  const handleEditorChange = (event: string | undefined) => {
    setContent(String(event))
  }

  return (
    <section className="page flex gap-8">
      <Tabs defaultValue="editor" className="">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <MonacoEditor
            aria-label="Editor"
            height={700}
            width={600}
            onChange={handleEditorChange}
            language="markdown"
            theme="vs-dark"
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
        <TabsContent value="preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
            {content}
          </ReactMarkdown>
        </TabsContent>
      </Tabs>
    </section>
  )
}
