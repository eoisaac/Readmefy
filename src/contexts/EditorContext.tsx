import { Template } from '@/components/TemplateItem'
import { en_US } from '@/data/templates/templates-en_US'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

export interface EditorContextType {
  document: string
  layout: Template[]
  currentTemplate: Template
  templates: Template[]

  addLayoutTemplate: (template: Template) => void
  updateLayoutOrder: (updatedLayout: Template[]) => void

  selectCurrentTemplate: (template: Template) => void
  editTemplate: (markdown: string) => void

  resetLayoutAndTemplates: () => void
}

interface EnvContextProviderProps {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export const EditorContextProvider = ({
  children,
}: EnvContextProviderProps) => {
  const [document, setDocument] = useState<string>('')
  const [templates, setTemplates] = useState<Template[]>(en_US.slice(1))
  const [layout, setLayout] = useState<Template[]>([en_US[0]])
  const [currentTemplate, setCurrentTemplate] = useState<Template>(en_US[0])

  useEffect(() => {
    const updatedLayoutContent = layout.map((item) => item.markdown).join('')
    setDocument(updatedLayoutContent)

    return () => setDocument('')
  }, [layout])

  const addLayoutTemplate = (template: Template) => {
    setLayout([...layout, template])

    const updatedTemplates = templates.filter((item) => item.id !== template.id)
    setTemplates(updatedTemplates)
  }

  const updateLayoutOrder = (updatedLayout: Template[]) => {
    setLayout(updatedLayout)
  }

  const selectCurrentTemplate = (template: Template) => {
    setCurrentTemplate(template)
  }

  const editTemplate = (markdown: string) => {
    const updatedTemplate = { ...currentTemplate, markdown }
    setCurrentTemplate(updatedTemplate)

    const updatedLayout = layout.map((item) =>
      item.id === updatedTemplate.id ? updatedTemplate : item,
    )
    setLayout(updatedLayout)
  }

  const resetLayoutAndTemplates = () => {
    setLayout([en_US[0]])
    setCurrentTemplate(en_US[0])
    setTemplates(en_US.slice(1))
  }

  return (
    <EditorContext.Provider
      value={{
        document,
        layout,
        templates,
        currentTemplate,

        addLayoutTemplate,
        updateLayoutOrder,

        selectCurrentTemplate,
        editTemplate,

        resetLayoutAndTemplates,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
