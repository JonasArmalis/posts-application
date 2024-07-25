import { defineStore } from 'pinia'
import type { NotificationType } from '@/types/NotificationType'
import type { Notification } from '@/interfaces/Notification'

export const useNotifyStore = defineStore('notify', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  actions: {
    notify(messageOrError: unknown, type: NotificationType) {
      let message = ''
      if (messageOrError instanceof Error) message = messageOrError.message
      if (typeof messageOrError === 'string') message = messageOrError
      const notification: Notification = { message, type, notifyTime: Date.now() }
      this.notifications.push(notification)

    },
    removeNotification(notification: Notification) {
      this.notifications = this.notifications.filter(
        (n) => n.notifyTime !== notification.notifyTime
      )
    }
  }
})
