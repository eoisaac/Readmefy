import { Editor as MonacoEditor } from '@monaco-editor/react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Editor = () => {
  const [content, setContent] = useState<string>('')

  const handleEditorChange = (event: string | undefined) => {
    setContent(String(event))
  }

  return (
    <section className="page flex gap-8">
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

      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose">
        {content}
      </ReactMarkdown>
    </section>
  )
}
