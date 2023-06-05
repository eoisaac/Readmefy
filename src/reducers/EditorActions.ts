/* eslint-disable no-unused-vars */
import { Template } from '@/components/TemplateItem'

export enum EditorActionTypes {
  ADD_TEMPLATE_TO_LAYOUT = 'ADD_TEMPLATE_TO_LAYOUT',
  UPDATE_LAYOUT_ORDER = 'UPDATE_LAYOUT_ORDER',
  SELECT_TEMPLATE = 'SELECT_TEMPLATE',
  UPDATE_CURRENT_TEMPLATE_CONTENT = 'UPDATE_CURRENT_TEMPLATE_CONTENT',
  RESET_LAYOUT_AND_TEMPLATES = 'RESET_LAYOUT_AND_TEMPLATES',
}

export interface ActionType {
  type: EditorActionTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any
}

export const addTemplateToLayoutAction = (selectedTemplate: Template) => {
  return {
    type: EditorActionTypes.ADD_TEMPLATE_TO_LAYOUT,
    payload: { template: selectedTemplate },
  }
}

export const updateLayoutOrderAction = (updatedLayout: Template[]) => {
  return {
    type: EditorActionTypes.UPDATE_LAYOUT_ORDER,
    payload: { layout: updatedLayout },
  }
}

export const selectTemplateAction = (selectedTemplate: Template) => {
  return {
    type: EditorActionTypes.SELECT_TEMPLATE,
    payload: { template: selectedTemplate },
  }
}

export const updateCurrentTemplateContentAction = (markdownContent: string) => {
  return {
    type: EditorActionTypes.UPDATE_CURRENT_TEMPLATE_CONTENT,
    payload: { markdown: markdownContent },
  }
}

export const resetLayoutAndTemplatesAction = () => {
  return {
    type: EditorActionTypes.RESET_LAYOUT_AND_TEMPLATES,
    payload: undefined,
  }
}
