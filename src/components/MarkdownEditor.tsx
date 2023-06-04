import { ChangeEvent } from 'react'

interface MarkdownEditorProps {
  content: string
  onChange: (event: string) => void
}

export const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  const handleEditorChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <textarea
      className="w-full flex-1 resize-none p-1"
      rows={30}
      value={content}
      onChange={handleEditorChange}
    />
  )
}
