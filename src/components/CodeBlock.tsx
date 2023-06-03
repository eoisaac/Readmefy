import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeBlockProps {
  content: string
}

export const CodeBlock = ({ content }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter
      theme={vs2015}
      language="javascript"
      showLineNumbers={true}
      showInlineLineNumbers={false}
      customStyle={{ background: 'transparent' }}
    >
      {content}
    </SyntaxHighlighter>
  )
}
