import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { TemplatesList } from '@/components/TemplatesList'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useState } from 'react'

export const Editor = () => {
  const { isMobile } = useIsMobile()

  const [content, setContent] = useState<string>('')

  const handleEditorChange = (content: string) => {
    setContent(content)
  }

  return (
    <section className="page">
      {isMobile ? (
        <Tabs defaultValue="editor">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
          <TabsContent value="templates">
            <TemplatesList />
          </TabsContent>

          <TabsContent value="editor">
            <MarkdownEditor content={content} onChange={handleEditorChange} />
          </TabsContent>

          <TabsContent value="preview">
            <MarkdownPreview content={content} />
          </TabsContent>

          <TabsContent value="raw">
            <MarkdownPreview content={content} raw />
          </TabsContent>
        </Tabs>
      ) : (
        <div
          className="row-span-3 grid grid-cols-1 gap-4 md:row-span-1
        md:grid-cols-5 md:gap-6 lg:gap-8"
        >
          <div className="col-span-1 md:col-span-1">
            <TemplatesList />
          </div>
          <Tabs defaultValue="editor" className="col-span-1 md:col-span-2">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <MarkdownEditor content={content} onChange={handleEditorChange} />
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="preview" className="col-span-1 md:col-span-2">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <MarkdownPreview content={content} />
            </TabsContent>

            <TabsContent value="raw">
              <MarkdownPreview content={content} raw />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </section>
  )
}
