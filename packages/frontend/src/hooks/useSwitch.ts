import { useStorage } from '@vueuse/core'

export function useSwitch(
  key: string,
  fn?: (v: 1 | 2, k: string) => void,
  isStorage = true,
) {
  const currentState = isStorage
    ? useStorage<1 | 2>(key || 'currentState', 1)
    : ref<1 | 2>(1)
  const changeState = () => {
    if (currentState.value === 1) {
      currentState.value = 2
    } else {
      currentState.value = 1
    }
    if (fn) {
      fn(currentState.value, key)
    }
  }
  return {
    currentState,
    changeState,
  }
}
