import { defaultState } from '@/constants/editorDefaultState'
import { EditorState } from '@/contexts/EditorContext'
import { ActionType, EditorActionTypes } from './EditorActions'

export const EditorReducer = (state: EditorState, action: ActionType) => {
  switch (action.type) {
    case EditorActionTypes.ADD_TEMPLATE_TO_LAYOUT:
      return {
        ...state,
        templates: state.templates.filter(
          (item) => item.id !== action.payload.template.id,
        ),
        layout: [...state.layout, action.payload.template],
      }

    case EditorActionTypes.UPDATE_LAYOUT_ORDER:
      return {
        ...state,
        layout: action.payload.layout,
      }

    case EditorActionTypes.SELECT_TEMPLATE:
      return {
        ...state,
        currentTemplate: action.payload.template,
      }

    case EditorActionTypes.UPDATE_CURRENT_TEMPLATE_CONTENT:
      return {
        ...state,
        currentTemplate: {
          ...state.currentTemplate,
          markdown: action.payload.markdown,
        },
        layout: state.layout.map((item) =>
          item.id === state.currentTemplate.id
            ? { ...item, markdown: action.payload.markdown }
            : item,
        ),
      }

    case EditorActionTypes.RESET_LAYOUT_AND_TEMPLATES:
      return defaultState

    default:
      return state
  }
}
