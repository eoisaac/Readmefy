import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/Tabs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownPreviewProps {
  content: string
}

export const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <Tabs defaultValue="preview" className="flex-1">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="raw">Raw</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose flex-1">
          {content}
        </ReactMarkdown>
      </TabsContent>

      <TabsContent value="raw">
        <pre className="flex-1">{content}</pre>
      </TabsContent>
    </Tabs>
  )
}
