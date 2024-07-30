import { defineStore } from 'pinia'
import { reactive, readonly, shallowRef, type Component } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const mutableState = reactive({
    header: "",
    isOpen: false,
    component: shallowRef<Component | null>(null)
  })

  const state = readonly(mutableState)

  const openModal = (component: Component, header: string) => {
    mutableState.isOpen = true
    mutableState.component = component
    mutableState.header = header
  }

  const closeModal = () => {
    mutableState.header = ''
    mutableState.component = null
    mutableState.isOpen = false
  }

  return {
    state,
    openModal,
    closeModal
  }
})
