import { defineStore } from 'pinia'
import { reactive, type Component } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const state = reactive({
    header: "",
    isOpen: false,
    component: null as Component | null
  })

  const openModal = (component: Component, header: string) => {
    state.isOpen = true;
    state.component = component;
    state.header = header;
  }

  const closeModal = () => {
    state.header = "";
    state.component = null;
    state.isOpen = false;
  }

  return {
    state,
    openModal,
    closeModal
  }
})
