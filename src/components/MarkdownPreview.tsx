import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownPreviewProps {
  content: string
  raw?: boolean
}

export const MarkdownPreview = ({
  content,
  raw = false,
}: MarkdownPreviewProps) => {
  return raw ? (
    <pre className="flex-1">{content}</pre>
  ) : (
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
  )
}
