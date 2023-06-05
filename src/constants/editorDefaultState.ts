import { EditorState } from '@/contexts/EditorContext'
import { en_US } from '@/data/templates/templates-en_US'

export const defaultState: EditorState = {
  layout: [en_US[0]],
  templates: en_US.slice(1),
  currentTemplate: en_US[0],
}
