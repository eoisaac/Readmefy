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
    <pre className="flex-1 rounded-md bg-slate-200">{content}</pre>
  ) : (
    <ReactMarkdown
      className="prose prose-slate whitespace-pre-wrap rounded-md bg-slate-200"
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
