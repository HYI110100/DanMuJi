import { createPinia } from 'pinia'

const store = createPinia()

export { store }

export * from './modules/useAppStore'
export * from './modules/useUserStore'

export default store
