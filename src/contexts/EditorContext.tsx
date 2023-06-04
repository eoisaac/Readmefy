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
  currentTemplate: Template | null
  templates: Template[]

  handleSelectCurrentTemplate: (item: Template) => void
  handleSelectTemplate: (item: Template) => void
  handleRemoveTemplate: (itemId: string) => void

  handleResetLayout: () => void
  handleResetTemplates: () => void
  handleResetAll: () => void
}

interface EnvContextProviderProps {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export const EditorContextProvider = ({
  children,
}: EnvContextProviderProps) => {
  const [document, setDocument] = useState<string>('')
  const [layout, setLayout] = useState<Template[]>([])
  const [templates, setTemplates] = useState<Template[]>(en_US)
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null)

  useEffect(() => {
    const updatedLayoutContent = layout.map((item) => item.markdown).join('')
    setDocument(updatedLayoutContent)

    return () => setDocument('')
  }, [layout])

  const handleSelectCurrentTemplate = (item: Template) => {
    setCurrentTemplate(item)
  }

  const handleSelectTemplate = (item: Template) => {
    const updatedSelectedItems = [...layout, item]
    setLayout(updatedSelectedItems)

    handleSelectCurrentTemplate(item)
  }

  const handleRemoveTemplate = (itemId: string) => {
    const updatedItems = layout.filter((i) => i.id !== itemId)
    setLayout(updatedItems)
  }

  const handleResetLayout = () => {
    setLayout([])
  }

  const handleResetTemplates = () => {
    setTemplates(en_US)
  }

  const handleResetAll = () => {
    handleResetLayout()
    handleResetTemplates()
  }

  return (
    <EditorContext.Provider
      value={{
        document,
        layout,
        templates,
        currentTemplate,
        handleSelectCurrentTemplate,
        handleSelectTemplate,
        handleRemoveTemplate,

        handleResetLayout,
        handleResetTemplates,
        handleResetAll,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
