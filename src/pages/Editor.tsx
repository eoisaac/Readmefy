import { LayoutEditor } from '@/components/LayoutEditor'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useState } from 'react'

export const Editor = () => {
  const { isMobile } = useIsMobile()

  const [layout, setLayout] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleLayoutChange = (layout: string) => {
    setLayout(layout)
  }

  const handleContentChange = (content: string) => {
    setContent(content)
  }

  return (
    <section className="page flex">
      {isMobile ? (
        <Tabs defaultValue="layout" className="flex flex-1 flex-col">
          <TabsList className="self-start">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="flex-1">
            <LayoutEditor
              onLayoutChange={handleLayoutChange}
              className="h-full"
            />
          </TabsContent>

          <TabsContent value="editor">
            <MarkdownEditor
              content={layout}
              onContentChange={handleContentChange}
            />
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
          className="row-span-3 grid flex-1 grid-cols-1 gap-4 md:row-span-1 
        md:grid-cols-5 md:gap-6 lg:gap-8"
        >
          <LayoutEditor
            onLayoutChange={handleLayoutChange}
            className="col-span-1 md:col-span-1"
          />

          <Tabs defaultValue="editor" className="col-span-1 md:col-span-2">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <MarkdownEditor
                content={layout}
                onContentChange={handleContentChange}
              />
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
