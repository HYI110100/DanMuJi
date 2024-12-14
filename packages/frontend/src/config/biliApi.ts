const path = {
  getLoginQR: 'https://passport.bilibili.com/x/passport-login/web/qrcode/generate',
  loginByQR: 'https://passport.bilibili.com/x/passport-login/web/qrcode/poll',
  logout: 'https://passport.bilibili.com/login/exit/v2',
  getNav: 'https://api.bilibili.com/x/web-interface/nav',
  getRoomInfo: 'https://api.live.bilibili.com/room/v1/Room/get_info', // 获取直播间信息，最重要的是获取到真实直播间ID
  getRoomHistoryComment: 'https://api.live.bilibili.com/xlive/web-room/v1/dM/gethistory', // 获取直播间最近历史弹幕
  getMasterInfo: 'https://api.live.bilibili.com/live_user/v1/Master/info', // 获取主播信息
  getDanmuInfo: 'https://api.live.bilibili.com/xlive/web-room/v1/index/getDanmuInfo', // 获取弹幕服务地址和认证秘钥
  msgSend: 'https://api.live.bilibili.com/msg/send', // 弹幕发送
  genWebTicket: 'https://api.bilibili.com/bapis/bilibili.api.ticket.v1.Ticket/GenWebTicket', // 获取bv
  getBuvid: 'https://api.bilibili.com/x/frontend/finger/spi', // 获取bv
  liveMsgSend: 'https://api.live.bilibili.com/msg/send', // 直播消息发送
  getMedalIcon: 'https://workers.laplace.cn/api/bilibili/wealth-config', // 直播消息发送
  getListForUserBillRecord: 'https://pay.bilibili.com/payplatform/pay/listForUserBillRecord', // 交易记录 https://pay.bilibili.com/pay-v2/all-bill?noTitleBar=1&native
};
// 获取直播间用户排行榜
// https://api.live.bilibili.com/xlive/general-interface/v1/rank/queryContributionRank?ruid=590852876&room_id=1946527922&page=1&page_size=100&type=online_rank&switch=contribution_rank&platform=web
type ApiKeys = keyof typeof path;

function getApi() {
  const Api = {} as Record<ApiKeys, string>;
  Object.keys(path).forEach((item) => {
    Api[item as ApiKeys] = `${path[item as ApiKeys]}`;
  });
  return Api;
}

export default getApi();
