/* eslint-disable @typescript-eslint/no-explicit-any */
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    permissions?: string[]
    title?: string
    show2ndSidebar?: boolean
  }
}
