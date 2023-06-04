import { LayoutEditor } from '@/components/LayoutEditor'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useEffect, useState } from 'react'

export const Editor = () => {
  const { isMobile } = useIsMobile()

  const [layout, setLayout] = useState<string>('')
  const [section, setContent] = useState<string>('')

  const handleLayoutChange = (layout: string) => {
    setLayout(layout)
  }

  const handleSectionChange = (section: string) => {
    setContent(section)
  }

  useEffect(() => {
    console.log('section', section)
  }, [section])

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
              className="h-full"
              onLayoutChange={handleLayoutChange}
              onSelectSection={handleSectionChange}
            />
          </TabsContent>

          <TabsContent value="editor">
            <MarkdownEditor
              content={section}
              onContentChange={handleSectionChange}
            />
          </TabsContent>

          <TabsContent value="preview">
            <MarkdownPreview content={layout} />
          </TabsContent>

          <TabsContent value="raw">
            <MarkdownPreview content={layout} raw />
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
                content={section}
                onContentChange={handleSectionChange}
              />
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="preview" className="col-span-1 md:col-span-2">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <MarkdownPreview content={layout} />
            </TabsContent>

            <TabsContent value="raw">
              <MarkdownPreview content={layout} raw />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </section>
  )
}
