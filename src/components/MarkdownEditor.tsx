import { ChangeEvent } from 'react'

interface MarkdownEditorProps {
  content: string
  onContentChange: (event: string) => void
}

export const MarkdownEditor = ({
  content,
  onContentChange,
}: MarkdownEditorProps) => {
  const handleEditorChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(event.target.value)
  }

  return (
    <textarea
      className="w-full flex-1 resize-none rounded-md bg-slate-200 p-1"
      rows={32}
      value={content}
      onChange={handleEditorChange}
    />
  )
}
