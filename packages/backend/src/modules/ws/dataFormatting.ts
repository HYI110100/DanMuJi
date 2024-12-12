import { danmu, interactWord, likeClick, MessageItem } from "my-utils"
import { BILI_WS_CMD_TYPE, MessageData } from "~/bilibili/types"

export const handleMessageFn: Partial<Record<BILI_WS_CMD_TYPE, (item: MessageData) => MessageItem | null>> = {
    // 弹幕
    'DANMU_MSG': (item) => {
        return {
            type: 'DANMU_MSG',
            data: danmu(item.info || [])
        }
    },
    // 进场，关注
    'INTERACT_WORD': (item) => {
        const data = interactWord(item.data || {})
        if (data.data.msgType === 1) {
            return {
                type: 'ENTRY',
                data
            }
        }
        if (data.data.msgType === 2) {
            return {
                type: 'SUBSCRIBER',
                data
            }
        }
        return null
    },
    // 点赞
    'LIKE_INFO_V3_CLICK': (item) => {
        return {
            type: 'LIKE',
            data: likeClick(item.data)
        }
    },
    // 上舰
    // 'GUARD_BUY': (item) => {
    //     return null
    // },
    // // 礼物
    // 'SEND_GIFT': (item) => {
    //     return {
    //         type: 'GIFT',
    //         data: sendGift(item.data)
    //     }
    // },
    // // 连续礼物
    // 'COMBO_SEND': (item) => {
    //     return null
    // },
    // // 礼物（红包）
    // 'POPULARITY_RED_POCKET_NEW': (item) => {
    //     return null
    // },
    // // 醒目留言
    // 'SUPER_CHAT_MESSAGE': (item) => {
    //     return null
    // },
    // // 警告
    // 'WARNING': (item) => {
    //     return null
    // },
    // // 切断直播
    // 'CUT_OFF': (item) => {
    //     return null
    // },

}