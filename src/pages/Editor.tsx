import { useState } from 'react'

import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { TemplatesList } from '@/components/TemplatesList'
import { useIsMobile } from '@/hooks/useIsMobile'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Editor = () => {
  const { isMobile } = useIsMobile()

  const [content, setContent] = useState<string>('')

  const handleEditorChange = (content: string) => {
    setContent(content)
  }

  return (
    <section
      className="page row-span-3 grid grid-cols-1 gap-4 sm:row-span-1
    sm:grid-cols-5"
    >
      <div className="col-span-1 sm:col-span-1">
        <TemplatesList />
      </div>

      {isMobile ? (
        <Tabs defaultValue="editor" className="col-span-1 row-span-2">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <MarkdownEditor content={content} onChange={handleEditorChange} />
            <TabsContent value="preview">
              <ReactMarkdown
                className="prose prose-slate"
                remarkPlugins={[remarkGfm]}
                // components={{
                //   code({ children }) {
                //     return <CodeBlock content={String(children)} />
                //   },
                // }}
              >
                {content}
              </ReactMarkdown>
            </TabsContent>

            <TabsContent value="raw">
              <MarkdownPreview content={content} raw />
            </TabsContent>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <Tabs defaultValue="editor" className="col-span-1 sm:col-span-2">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <MarkdownEditor content={content} onChange={handleEditorChange} />
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="preview" className="col-span-1sm:col-span-2">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <ReactMarkdown
                className="prose prose-slate"
                remarkPlugins={[remarkGfm]}
                // components={{
                //   code({ children }) {
                //     return <CodeBlock content={String(children)} />
                //   },
                // }}
              >
                {content}
              </ReactMarkdown>
            </TabsContent>

            <TabsContent value="raw">
              <MarkdownPreview content={content} raw />
            </TabsContent>
          </Tabs>
        </>
      )}
    </section>
  )
}
