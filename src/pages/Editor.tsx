import { Button } from '@/components/Button'
import { LayoutEditor } from '@/components/LayoutEditor'
import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import { TemplatesList } from '@/components/TemplatesList'
import { useEditor } from '@/contexts/EditorContext'
import { useIsMobile } from '@/hooks/useIsMobile'
import {
  ArrowCounterClockwise,
  Clipboard,
  DownloadSimple,
} from '@phosphor-icons/react'

export const Editor = () => {
  const { isMobile } = useIsMobile()

  const {
    document,
    currentTemplate,
    updateCurrentTemplateContent,
    resetLayoutAndTemplates,
  } = useEditor()

  const handleDownloadFile = () => {
    const element = window.document.createElement('a')
    const file = new Blob([document], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'README.md'
    element.click()

    element.remove()
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(document)
  }

  const handleResetLayoutAndTemplates = () => {
    resetLayoutAndTemplates()
  }

  return (
    <section className="page flex">
      {isMobile ? (
        <Tabs defaultValue="editor" className="flex flex-1 flex-col">
          <div className="flex w-full flex-col items-center gap-2">
            <div className="flex w-full items-center justify-end gap-2 self-end">
              <Button
                label="Reset"
                title="Reset"
                variant="link"
                size="xs"
                className="mr-auto"
                icon={<ArrowCounterClockwise size={18} />}
                onClick={handleResetLayoutAndTemplates}
              />

              <Button
                label="Copy to clipboard"
                title="Copy to clipboard"
                variant="secondary"
                size="xs"
                className="p-1.5"
                icon={<Clipboard />}
                onClick={handleCopyToClipboard}
                srLabel
              />

              <Button
                label="Download"
                title="Download file"
                size="xs"
                icon={<DownloadSimple />}
                onClick={handleDownloadFile}
                reverse
              />
            </div>

            <TabsList className="self-start">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>
          </div>

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
            <div className="flex w-full items-center justify-between gap-2">
              <TabsList>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              <Button
                label="Reset"
                title="Reset"
                variant="link"
                size="xs"
                icon={<ArrowCounterClockwise size={18} />}
                onClick={handleResetLayoutAndTemplates}
              />
            </div>

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
            <div className="flex w-full items-center justify-between gap-2">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw">Raw</TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <Button
                  label="Copy to clipboard"
                  title="Copy to clipboard"
                  variant="secondary"
                  icon={<Clipboard />}
                  onClick={handleCopyToClipboard}
                  srLabel
                />

                <Button
                  label="Download"
                  title="Download file"
                  icon={<DownloadSimple />}
                  onClick={handleDownloadFile}
                  reverse
                />
              </div>
            </div>

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
