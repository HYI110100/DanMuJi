import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const useAppStore = defineStore('app-store', () => {
  const loading = ref(false)
  const theme = useSwitch('currentTheme')
  const customCss = useStorage('customCss', '')
  const sysConfig = useStorage('sysConfig', {
    "showUsername": true,
    "showAvatar": true,
    "showAvatarFrame": true,
    "showMedal": true,
    "showFanMedal": true,
    "showManagerMark": true,
    "showNavyMark": true,
    "showRankMark": true,
    "showDanMu": true,
    "showGift": true,
    "showRedPacket": true,
    "showNavy": true,
    "showHighlightMessage": true,
    "showFreeGifts": true,
    "showInteractionEvents": true,
    "showSystemMessages": true,
    "showUserEnter": true,
    "batteryToUnitConversion": {
      "battery": 10,
      "conversionNumber": 1,
      "unit": "CN ￥"
    },
    "hideDanMuByMedal": 0,
    "hideDanMuByFanMedal": 0,
    "hideGiftsBelowBattery": 0
  })
  return {
    loading,
    theme,
    customCss,
    sysConfig,
  }
})
export default useAppStore
