import { LayoutEditor } from '@/components/LayoutEditor'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { TemplatesList } from '@/components/TemplatesList'
import { useEditor } from '@/contexts/EditorContext'
import { useIsMobile } from '@/hooks/useIsMobile'

export const Editor = () => {
  const { isMobile } = useIsMobile()

  const { document, currentTemplate, updateCurrentTemplateContent } =
    useEditor()

  return (
    <section className="page flex">
      {isMobile ? (
        <Tabs defaultValue="editor" className="flex flex-1 flex-col">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <TemplatesList />
          </TabsContent>

          <TabsContent value="layout">
            <LayoutEditor />
          </TabsContent>

          <TabsContent value="editor">
            <MarkdownEditor
              content={currentTemplate.markdown}
              onEdit={updateCurrentTemplateContent}
            />
          </TabsContent>

          <TabsContent value="preview">
            <MarkdownPreview content={document} />
          </TabsContent>

          <TabsContent value="raw">
            <MarkdownPreview content={document} raw />
          </TabsContent>
        </Tabs>
      ) : (
        <div
          className="row-span-3 grid flex-1 grid-cols-1 gap-4 md:row-span-1 
        md:grid-cols-5 md:gap-6 lg:gap-8"
        >
          <Tabs defaultValue="templates" className="col-span-1 md:col-span-1">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <TemplatesList />
            </TabsContent>

            <TabsContent value="layout">
              <LayoutEditor />
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="editor" className="col-span-1 md:col-span-2">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
            </TabsList>

            <TabsContent value="editor">
              <MarkdownEditor
                content={currentTemplate.markdown}
                onEdit={updateCurrentTemplateContent}
              />
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="preview" className="col-span-1 md:col-span-2">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <MarkdownPreview content={document} />
            </TabsContent>

            <TabsContent value="raw">
              <MarkdownPreview content={document} raw />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </section>
  )
}
