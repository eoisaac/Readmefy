import { AppRoutes } from '@/routes/AppRoutes'
import '@/styles/main.css'
import { EditorContextProvider } from './contexts/EditorContext'

export const App = () => {
  return (
    <EditorContextProvider>
      <AppRoutes />
    </EditorContextProvider>
  )
}
