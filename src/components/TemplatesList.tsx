import { useEditor } from '@/contexts/EditorContext'
import { TemplateItem } from './TemplateItem'

export const TemplatesList = () => {
  const { templates, addTemplateToLayout } = useEditor()

  return (
    <section className="absolute inset-0 flex overflow-auto">
      <ul className="flex-1 space-y-2">
        {templates.map((item) => (
          <TemplateItem
            key={item.id}
            id={item.id}
            label={item.label}
            markdown={item.markdown}
            onItemSelect={addTemplateToLayout}
          />
        ))}
      </ul>
    </section>
  )
}
