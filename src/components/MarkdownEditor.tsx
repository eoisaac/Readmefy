import { ChangeEvent } from 'react'

interface MarkdownEditorProps {
  content: string | null
  onEdit: (event: string) => void
}

export const MarkdownEditor = ({
  content = '',
  onEdit,
}: MarkdownEditorProps) => {
  const handleEditorChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onEdit(event.target.value)
  }

  return (
    <section className="absolute inset-0 flex overflow-y-auto rounded-md">
      <h3 className="sr-only">Markdown Editor</h3>
      <textarea
        className="m-[2px] flex-1 resize-none rounded-md
        bg-slate-200 p-2 focus:outline-none"
        value={content || ''}
        onChange={handleEditorChange}
      />
    </section>
  )
}
