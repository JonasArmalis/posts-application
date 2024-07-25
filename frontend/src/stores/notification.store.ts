import { defineStore } from 'pinia'
import { NotificationType } from '@/types/NotificationType'
import type { Notification } from '@/interfaces/Notification'
import { reactive } from 'vue'

export const useNotifyStore = defineStore('notify', () => {
  const state = reactive({
    notifications: [] as Notification[]
  })

  function notify(messageOrError: unknown, type: NotificationType) {
    let message = ''
    if (messageOrError instanceof Error) message = messageOrError.message
    if (typeof messageOrError === 'string') message = messageOrError
    const notification: Notification = { message, type, notifyTime: Date.now() }
    state.notifications.push(notification)
  }

  function removeNotification(notification: Notification) {
    state.notifications = state.notifications.filter(
      (n) => n.notifyTime !== notification.notifyTime
    )
  }
  
  function notifyDefault(message: string) {
    notify(message, NotificationType.DEFAULT)
  }
  
  function notifyInfo(message: string) {
    notify(message, NotificationType.INFO)
  }
  
  function notifySuccess(message: string) {
    notify(message, NotificationType.SUCCESS)
  }

  function notifyWarning(message: string) {
    notify(message, NotificationType.WARNING)
  }
  
  function notifyError (message: string) {
    notify(message, NotificationType.ERROR);
  }


  return {
    state,
    notifyDefault,
    notifyInfo,
    notifySuccess,
    notifyWarning,
    notifyError,
    removeNotification
  }
})