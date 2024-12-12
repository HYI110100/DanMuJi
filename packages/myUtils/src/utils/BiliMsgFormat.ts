export interface DATA<T = null> {
    uid: number;
    name: string;
    avatar: string;
    level: number;
    guard_level: number;
    time: number | null;
    medal: {
        name: string;
        level: number;
    } | null;
    data: T;
}

// 弹幕
export interface DANMU extends DATA<{
    msg: string;
    isMystery: boolean;
}> { }

export interface DanmuData {
    type: 'DANMU_MSG',
    data: DANMU
}

// 互动（进场与管制）
export interface INTERACT extends DATA<{
    msgType: number;
}> { }
export interface InteractWordData {
    type: 'ENTRY' | 'SUBSCRIBER',
    data: INTERACT
}

// 点赞
export interface LIKE extends DATA<{
    text: string
}> { }
export interface LikedData {
    type: 'LIKE',
    data: LIKE
}

// 礼物
export interface GIFT extends DATA<{
    giftName: string
    icon: string
    num: number
    netPrice: number
    price: number
}> { }
export interface GiftData {
    type: 'GIFT',
    data: GIFT
}
type ExtractType<T> = T extends { type: infer U } ? U : never;
export type MessageItem = DanmuData | InteractWordData | LikedData | GiftData
export type MessageType = ExtractType<MessageItem>;

// #######################################################################

const infoData: DATA = {
    uid: 0,
    name: '',
    avatar: '',
    level: 0,
    guard_level: 0,
    time: 0,
    medal: null,
    data: null
}
export function danmu(info: any) {

    const data: DANMU = {
        ...infoData,
        data: {
            msg: '',
            isMystery: false
        }
    }
    try {
        data.name = info[2][1]
        data.level = info[16][0]
        data.time = info[0][4]

        const user = info[0][15].user
        data.avatar = user.base.face || ''
        data.uid = user.base.uid || 0

        data.data.msg = info[1] || '',
            data.data.isMystery = !!user.base.is_mystery

        const medal = user.medal
        if (medal) {
            data.medal = {
                name: medal.name || '',
                level: medal.level || 0
            }
            data.guard_level = medal.guard_level
        }
        const extra = JSON.parse(info[0][15].extra || "{}")
        if (extra.emots) {
            for (const key in extra.emots) {
                const emot = extra.emots[key];
                data.data.msg = data.data.msg.replaceAll(key, `<img alt="${key}" class="emot" title="${key}" src="::API_URL::_${emot.url}" />`)
            }
        }

        const emoticon_unique = extra.emoticon_unique
        if (emoticon_unique) {
            const emots2 = info[0][13]
            data.data.msg = `<img alt="${extra.content}" class="emot2" title="${extra.content}" src="::API_URL::_${emots2.url}"/>`
        }
        
        if(extra.reply_uname){
            data.data.msg = `<span class="alt">@${extra.reply_uname}</span>${data.data.msg}`
        }
    } catch (error) {
        console.warn(error);
    }

    return data
}

export function interactWord(info: any) {
    const data: INTERACT = {
        ...infoData,
        data: {
            msgType: 0,
        }
    }

    try {
        data.uid = info.uid
        data.name = info.uname
        data.time = info.timestamp
        data.data.msgType = info.msg_type

        const user = info.uinfo
        data.avatar = user.base.face
        data.level = user.guard.level

        const medal = user.medal
        if (medal) {
            data.medal = {
                name: medal.name || '',
                level: medal.level || 0
            }
            data.guard_level = medal.guard_level
        }
    } catch (error) {
        console.warn(error);
    }

    return data
}

export function sendGift(info: any) {
    // coin_type silver免费  gold付费
    const data: GIFT = {
        ...infoData,
        data: {
            giftName: '',
            num: 0,
            price: 0,
            netPrice: 0,
            icon: ''
        }
    }
    try {
        data.uid = info.uid
        data.name = info.uname
        data.time = info.timestamp
        data.level = info.wealth_level
        data.guard_level = info.guard_level

        data.data.giftName = info.giftName
        data.data.num = info.num
        data.data.icon = info.gift_info.img_basic
        data.data.price = info.price
        data.data.netPrice = info.total_coin

        const user = info.sender_uinfo
        data.avatar = user.base.face

        const medal = user.medal || info.medal_info
        if (user.medal || info.medal_info) {
            data.medal = {
                name: user.medal.name || info.medal_info.medal_name || '',
                level: user.medal.level || info.medal_info.medal_level || 0
            }
        }

        const comboSend = info.combo_send || info.batch_combo_send
        if(comboSend){
            data.data.num = comboSend.batch_combo_num
        }
    } catch (error) {
        console.warn(error);
    }

    return data
}

export function likeClick(info: any) {
    const data: LIKE = {
        ...infoData,
        data: {
            text: ''
        }
    }
    try {
        // 赋值给data对象
        data.uid = info.uid || 0; // 用户ID
        data.name = info.uname || ''; // 用户昵称
        data.data.text = info.like_text

        // 提取点赞用户的基础信息
        const uinfo = info.uinfo.base;
        data.avatar = uinfo.face || ''; // 用户头像
        data.level = uinfo.guard ? uinfo.guard.level : 0; // 用户守护等级
        data.guard_level = info.fans_medal.guard_level || 0; // 粉丝牌守护等级
        data.time = Date.now(); // 获取当前时间戳

        // 提取粉丝牌信息
        if (info.fans_medal && info.fans_medal.medal_name) {
            data.medal = {
                name: info.fans_medal.medal_name,
                level: info.fans_medal.medal_level,
            };
        } else {
            data.medal = null; // 没有粉丝牌
        }
    } catch (error) {
        console.warn(error);
    }

    return data
}