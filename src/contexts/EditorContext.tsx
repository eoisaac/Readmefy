import { Template } from '@/components/TemplateItem'
import { en_US } from '@/data/templates/templates-en_US'
import {
  ActionType,
  addTemplateToLayoutAction,
  resetLayoutAndTemplatesAction,
  selectTemplateAction,
  updateCurrentTemplateContentAction,
  updateLayoutOrderAction,
} from '@/reducers/EditorActions'
import { EditorReducer } from '@/reducers/EditorReducer'
import {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'

export interface EditorState {
  layout: Template[]
  templates: Template[]
  currentTemplate: Template
}

const initialState: EditorState = {
  layout: [en_US[0]],
  templates: en_US.slice(1),
  currentTemplate: en_US[0],
}

export interface EditorContextType {
  document: string
  layout: Template[]
  currentTemplate: Template
  templates: Template[]

  addTemplateToLayout: (template: Template) => void
  updateLayoutOrder: (updatedLayout: Template[]) => void

  selectTemplate: (template: Template) => void
  updateCurrentTemplateContent: (markdown: string) => void

  resetLayoutAndTemplates: () => void
}

interface EditorContextProviderProps {
  children: ReactNode
}

export const EditorContext = createContext({} as EditorContextType)

export const EditorContextProvider = ({
  children,
}: EditorContextProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<EditorState, ActionType>>(
    EditorReducer,
    initialState,
  )
  const [document, setDocument] = useState<string>('')

  const { layout, templates, currentTemplate } = state

  useEffect(() => {
    const updatedLayoutContent = layout.map((item) => item.markdown).join('')
    setDocument(updatedLayoutContent)

    return () => setDocument('')
  }, [layout])

  const addTemplateToLayout = (template: Template) => {
    dispatch(addTemplateToLayoutAction(template))
  }

  const updateLayoutOrder = (updatedLayout: Template[]) => {
    dispatch(updateLayoutOrderAction(updatedLayout))
  }

  const selectTemplate = (template: Template) => {
    dispatch(selectTemplateAction(template))
  }

  const updateCurrentTemplateContent = (markdown: string) => {
    dispatch(updateCurrentTemplateContentAction(markdown))
  }

  const resetLayoutAndTemplates = () => {
    dispatch(resetLayoutAndTemplatesAction())
  }

  return (
    <EditorContext.Provider
      value={{
        document,
        layout,
        templates,
        currentTemplate,

        addTemplateToLayout,
        updateLayoutOrder,

        selectTemplate,
        updateCurrentTemplateContent,

        resetLayoutAndTemplates,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)
