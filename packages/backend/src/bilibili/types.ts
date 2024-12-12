/**
 * @param STOP_LIVE_ROOM_LIST 估计是更新关注的主播直播状态的
 * @param NOTICE_MSG 通知消息
 * @param DANMU_MSG 弹幕消息
 * @param DM_INTERACTION 连续弹幕消息
 * @param INTERACT_WORD 进场或关注消息
 * @param GUARD_BUY 上舰通知
 * @param USER_TOAST_MSG 用户庆祝消息
 * @param SUPER_CHAT_MESSAGE 醒目留言
 * @param SUPER_CHAT_MESSAGE_JPN 醒目留言 日语
 * @param SUPER_CHAT_MESSAGE_DELETE 醒目留言删除
 * @param SEND_GIFT 送礼
 * @param GIFT_STAR_PROCESS 礼物星球点亮
 * @param COMBO_SEND 礼物星球点亮
 * @param SPECIAL_GIFT 特殊礼物
 * @param PREPARING 轮播状态
 * @param LIVE 直播开始
 * @param ROOM_REAL_TIME_MESSAGE_UPDATE 主播粉丝信息更新
 * @param ONLINE_RANK_V2 直播间高能榜
 * @param ONLINE_RANK_COUNT 直播间高能用户数量
 * @param ONLINE_RANK_TOP3 用户到达直播间高能榜前三名的消息
 * @param POPULAR_RANK_CHANGED 直播间在人气榜的排名改变
 * @param HOT_RANK_CHANGED 直播间限时热门榜排名改变
 * @param HOT_RANK_CHANGED_V2 当前直播间限时热门榜排名改变V2
 * @param HOT_RANK_SETTLEMENT 限时热门榜上榜信息
 * @param HOT_RANK_SETTLEMENT_V2 限时热门榜上榜信息V2
 * @param LIKE_INFO_V3_CLICK 直播间用户点赞
 * @param LIKE_INFO_V3_UPDATE 直播间点赞数更新
 * @param POPULARITY_RED_POCKET_START 直播间发红包弹幕
 * @param POPULARITY_RED_POCKET_NEW 直播间红包
 * @param POPULARITY_RED_POCKET_WINNER_LIST 直播间抢到红包的用户
 * @param WATCHED_CHANGE 直播间看过人数
 * @param ENTRY_EFFECT 用户进场特效
 * @param FULL_SCREEN_SPECIAL_EFFECT 全屏特效
 * @param AREA_RANK_CHANGED 直播间在所属分区的排名改变
 * @param COMMON_NOTICE_DANMAKU 广播通知弹幕信息
 * @param ROOM_CHANGE 直播间信息更改
 * @param SUPER_CHAT_ENTRANCE 醒目留言按钮
 * @param WIDGET_BANNER 顶部横幅
 * @param WIDGET_WISH_LIST 礼物心愿单进度
 * @param SYS_MSG 系统信息
 * @param WARNING 警告
 * @param CUT_OFF 切断
 * @param CHANGE_ROOM_INFO 直播间背景图片修改
 * @param ROOM_SKIN_MSG 直播间皮肤变更
 * @param ROOM_SILENT_ON 开启等级禁言
 * @param ROOM_SILENT_OFF 关闭等级禁言
 * @param ROOM_BLOCK_MSG 指定观众禁言
 * @param ROOM_ADMINS 房管列表
 * @param room_admin_entrance 设立房管
 * @param ROOM_ADMIN_REVOKE 撤销房管
 * @param ANCHOR_LOT_CHECKSTATUS 天选时刻合法检查
 * @param ANCHOR_LOT_START 天选时刻开始
 * @param ANCHOR_LOT_END 天选时刻开始
 * @param ANCHOR_LOT_AWARD 天选时刻中奖者
 * @param VIDEO_CONNECTION_JOIN_START 邀请视频连线
 * @param VIDEO_CONNECTION_MSG 视频连线信息
 * @param VIDEO_CONNECTION_JOIN_END 结束视频连线
 * @param REENTER_LIVE_ROOM 重连直播间
 * @param PLAY_TOGETHER ???
 */
export type BILI_WS_CMD_TYPE =
  | "STOP_LIVE_ROOM_LIST"
  | "NOTICE_MSG"
  | "DANMU_MSG"
  | "DM_INTERACTION"
  | "INTERACT_WORD"
  | "GUARD_BUY"
  | "USER_TOAST_MSG"
  | "SUPER_CHAT_MESSAGE"
  | "SUPER_CHAT_MESSAGE_JPN"
  | "SUPER_CHAT_MESSAGE_DELETE"
  | "SEND_GIFT"
  | "GIFT_STAR_PROCESS"
  | "COMBO_SEND"
  | "SPECIAL_GIFT"
  | "NOTICE_MSG"
  | "PREPARING"
  | "LIVE"
  | "ROOM_REAL_TIME_MESSAGE_UPDATE"
  | "ONLINE_RANK_V2"
  | "ONLINE_RANK_COUNT"
  | "ONLINE_RANK_TOP3"
  | "POPULAR_RANK_CHANGED"
  | "HOT_RANK_CHANGED"
  | "HOT_RANK_CHANGED_V2"
  | "HOT_RANK_SETTLEMENT"
  | "HOT_RANK_SETTLEMENT_V2"
  | "LIKE_INFO_V3_CLICK"
  | "LIKE_INFO_V3_UPDATE"
  | "POPULARITY_RED_POCKET_START"
  | "POPULARITY_RED_POCKET_NEW"
  | "POPULARITY_RED_POCKET_WINNER_LIST"
  | "WATCHED_CHANGE"
  | "ENTRY_EFFECT"
  | "FULL_SCREEN_SPECIAL_EFFECT"
  | "AREA_RANK_CHANGED"
  | "COMMON_NOTICE_DANMAKU"
  | "ROOM_CHANGE"
  | "SUPER_CHAT_ENTRANCE"
  | "WIDGET_BANNER"
  | "WIDGET_WISH_LIST"
  | "SYS_MSG"
  | "WARNING"
  | "CUT_OFF"
  | "CHANGE_ROOM_INFO"
  | "ROOM_SKIN_MSG"
  | "ROOM_SILENT_ON"
  | "ROOM_SILENT_OFF"
  | "ROOM_BLOCK_MSG"
  | "ROOM_ADMINS"
  | "room_admin_entrance"
  | "ROOM_ADMIN_REVOKE"
  | "ANCHOR_LOT_CHECKSTATUS"
  | "ANCHOR_LOT_START"
  | "ANCHOR_LOT_END"
  | "ANCHOR_LOT_AWARD"
  | "VIDEO_CONNECTION_JOIN_START"
  | "VIDEO_CONNECTION_MSG"
  | "VIDEO_CONNECTION_JOIN_END"
  | "REENTER_LIVE_ROOM"
  | "PLAY_TOGETHER";

export interface BiLiWsParam {
  uid: number;
  roomId: number;
  urlList: string[];
  token: string;
  buvid3: string;
}

export interface WSBinaryHeader {
  name: string;
  key: "headerLen" | "ver" | "op" | "seq";
  bytes: number;
  offset: number;
  value: number;
}

export type MessageData = { cmd: BILI_WS_CMD_TYPE, [key: string]: any; }
