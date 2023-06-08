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
  return (
    <section
      className="absolute inset-0 flex overflow-y-auto rounded-md 
    bg-slate-200"
    >
      {raw ? (
        <>
          <h3 className="sr-only">Markdown Raw Preview</h3>
          <pre className="flex-1 break-words rounded-md bg-slate-200 p-2">
            {content}
          </pre>
        </>
      ) : (
        <>
          <h3 className="sr-only">Markdown Formatted Preview</h3>
          <ReactMarkdown
            className="prose prose-slate flex-1 break-words rounded-md p-2"
            remarkPlugins={[remarkGfm]}
            // components={{
            //   code({ children }) {
            //     return <CodeBlock content={String(children)} />
            //   },
            // }}
          >
            {content}
          </ReactMarkdown>
        </>
      )}
    </section>
  )
}
