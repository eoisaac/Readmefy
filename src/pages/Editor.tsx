import { useState } from 'react'

import { MarkdownEditor } from '@/components/MarkdownEditor'
import { MarkdownPreview } from '@/components/MarkdownPreview'
import { TemplatesList } from '@/components/TemplatesList'

export const Editor = () => {
  const [content, setContent] = useState<string>('')

  const handleEditorChange = (event: string | undefined) => {
    setContent(String(event))
  }

  return (
    <section
      className="page grid grid-cols-1 grid-rows-3 sm:grid-cols-3 
    sm:grid-rows-1"
    >
      <TemplatesList />

      <MarkdownEditor content={content} onChange={handleEditorChange} />

      <MarkdownPreview content={content} />
    </section>
  )
}
