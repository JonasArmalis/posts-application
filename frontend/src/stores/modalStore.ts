import { defineStore } from 'pinia'
import { markRaw, reactive, readonly, shallowRef, type Component } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const mutableState = reactive({
    header: '',
    isOpen: false,
    component: shallowRef<Component | null>(null),
    props: shallowRef<object | null>(null),
    requestSent: false 
  })

  const state = readonly(mutableState)

  const openModal = (component: Component, header: string, props: object = {}) => {
    mutableState.props = props
    mutableState.component = markRaw(component)
    mutableState.header = header
    mutableState.isOpen = true
    mutableState.requestSent = false
  }

  const closeModal = () => {
    mutableState.header = ''
    mutableState.component = null
    mutableState.isOpen = false
    mutableState.props = null
  }

  const setRequestSentStatus = (status: boolean) => {
    mutableState.requestSent = status;
  };

  return {
    state,
    openModal,
    closeModal,
    setRequestSentStatus
  }
})

