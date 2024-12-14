import { BiliData } from "~/types/biliApi";
import {
  HistoryComment,
  MasterInfo,
  RoomHistory,
  RoomInfo,
} from "~/types/biliApi/live";
import biliApi from "~/config/biliApi";
import axios, { AxiosResponse } from "axios";
import { BuTicket, Buvid } from "~/types/biliApi/misc";
import { createBiliTicketHmac } from "~/utils/createBiliTicketHmac";
import { UserInfoByNva } from "~/types/biliApi/user";
import { LoginByQR, LoginQR, Logout } from "~/types/biliApi/login";
import { ListForUserBillRecord } from "~/types/biliApi/pay";

// headers: { 'Cache-Control': 'no-cache' }, // 强制缓存失效
const instance = axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: {
    // 'origin-proxy': 'https://live.bilibili.com',
    // 'referer-proxy': 'https://live.bilibili.com/1697272?broadcast_type=0&is_room_feed=0&spm_id_from=333.999.to_liveroom.0.click&live_from=86002',
    // 'host-proxy': 'bilibili.com'
  },
});
instance.interceptors.request.use((config) => {
  config.headers["url-proxy"] = config.url;
  config.url = `${new URL(config.url || "").pathname}`;
  config.baseURL = `http://${window.SEVER_URL}/api/proxy`
  return config;
});
instance.interceptors.response.use(
  (response) => {
    if (response.data.code < 0 || !response.data.data?.toString()) {
      const msg =
        response.data?.message || response.data?.msg || response.data?.error;
      msg && $message.error(msg);
      return Promise.reject(response.data);
    }
    return response;
  },
  (error) => {
    error.code !== "ERR_CANCELED" && $message.error(`${error}`);
    return Promise.reject(error);
  }
);
function createRequest<T, D = void>(
  requestFn: (
    signal: AbortSignal,
    data?: D extends void ? never : D
  ) => Promise<AxiosResponse<BiliData<T>, any>>
) {
  let controller: AbortController | null = null;

  const start = async (...args: D extends void ? [] : [D]): Promise<T> => {
    try {
      controller = new AbortController();
      const response = await requestFn(controller.signal, ...args);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  const cancel = () => {
    controller?.abort();
  };

  return { start, cancel };
}

/**
 * 获取直播间信息，最重要的是获取到真实直播间ID
 * @param roomId 直播间ID，短号
 */
export function getRoomInfo() {
  return createRequest<RoomInfo, number>((signal, roomId) =>
    instance.get(biliApi.getRoomInfo, { params: { room_id: roomId }, signal })
  );
}

/**
 * 获取直播间最近历史弹幕
 * @param roomId 直播间ID，短号
 */
export function getRoomHistoryComment() {
  return createRequest<{ admin: HistoryComment[]; room: HistoryComment[] }, number>(
    (signal, roomId) =>
      instance.get(biliApi.getRoomHistoryComment, {
        params: { room_id: roomId, room_type: 0 },
        signal,
      })
  );
}

/**
 * 获取主播信息
 * @param uid 用户id
 */
export function getMasterInfo() {
  return createRequest<MasterInfo, number>((signal, uid) =>
    instance.get(biliApi.getMasterInfo, { params: { uid }, signal })
  );
}

/**
 * 获取弹幕服务地址和认证秘钥
 * @param id 直播间真实id
 */
export function getDanmuInfo() {
  return createRequest<RoomHistory, number>((signal, id) =>
    instance.get(biliApi.getDanmuInfo, { params: { id }, signal })
  );
}

/**
 * 获取 b_3 b_4
 */
export function getBuvid() {
  return createRequest<Buvid>((signal) =>
    instance.get(biliApi.getBuvid, { signal })
  );
}

/**
 * 获取 bili_ticket
 * @param hexSign 由 hmac_sha256 算法计算的 hexsign 值`必要`
 * @param ts UNIX 秒级时间戳`必要`
 * @param csrf cookie 中的 bili_jct 值 `非必要`
 */
export function postBiLTicket() {
  return createRequest<BuTicket, string>((signal, csrf) => {
    return new Promise((resolve, reject) => {
      const ts = Math.floor(Date.now() / 1000);
      createBiliTicketHmac("XgwSnGZ1p", `ts${ts}`).then((hexsign) => {
        const params = new URLSearchParams({
          key_id: "ec02",
          csrf: csrf || "",
          hexsign,
          "context[ts]": ts.toString(),
        });
        instance
          .post(biliApi.genWebTicket + `?${params}`, {}, { signal })
          .then(resolve, reject);
      });
    });
  });
}

/**
 * 退出登录
 * @param biliCSRF CSRF Token (位于 cookie 中的 bili_jct)
 */
export function postLogout() {
  return createRequest<Logout, string>((signal, biliCSRF) =>
    instance.post(biliApi.logout, { biliCSRF }, { signal, headers: { 'Cache-Control': 'no-cache' } })
  );
}

/**
 * 获取扫码登录二维码
 */
export function getLoginQR() {
  return createRequest<LoginQR>((signal) =>
    instance.get(biliApi.getLoginQR, { signal, headers: { 'Cache-Control': 'no-cache' } })
  );
}

/**
 * 扫码登录
 */
export function getLoginByQR() {
  return createRequest<LoginByQR, string>((signal, key) => {
    return instance.get(biliApi.loginByQR, { params: { qrcode_key: key }, signal, headers: { 'Cache-Control': 'no-cache' } })
  });
}

/**
 * 获取用户信息
 */
export function getNav() {
  return createRequest<UserInfoByNva>((signal) =>
    instance.get(biliApi.getNav, { signal })
  );
}

/**
 * 发消息
 * @param roomId 房间id
 * @param csrf CSRF Token (位于 cookie 中的 bili_jct)
 * @param msg 要发送的消息
 */
export function postSendLiveMsg() {
  return createRequest<
    void,
    {
      roomId: number;
      csrf: string;
      msg: string;
    }
  >((signal, data) => {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject("data is null");
      }
      // 生成当前时间戳
      const timestamp = Math.floor(Date.now() / 1000);

      // 创建FormData对象
      const form = new FormData();
      form.append("bubble", "0");
      form.append("msg", data.msg);
      form.append("color", "16777215");
      form.append("mode", "1");
      form.append("room_type", "0");
      form.append("jumpfrom", "86002");
      form.append("reply_mid", "0");
      form.append("reply_attr", "0");
      form.append("replay_dmid", "");
      form.append("statistics", JSON.stringify({ appId: 100, platform: 5 }));
      form.append("reply_type", "0");
      form.append("reply_uname", "");
      form.append("fontsize", "25");
      form.append("rnd", timestamp.toString()); // 使用当前时间戳
      form.append("roomid", `${data.roomId}`);
      form.append("csrf", data.csrf);
      form.append("csrf_token", data.csrf);

      instance
        .post(biliApi.liveMsgSend, form, { signal, headers: { 'Cache-Control': 'no-cache'} })
        .then(resolve, reject);
    });
  });
}


/**
 * 交易记录
 * @param currentPage 当前页码
 * @param pageSize 每页数量
 * @param traceId 当前时间戳（毫秒）
 * @param timestamp 当前时间戳（毫秒）
 * @param sdkVersion 1.1.7
 * @param endTime 开始日期 YYYY-MM-DD HH:mm:ss
 * @param beginTime 结束日期 YYYY-MM-DD HH:mm:ss
 */
export function getListForUserBillRecord() {
  return createRequest<ListForUserBillRecord, {
    currentPage: number;
    pageSize: number;
    traceId: number;
    timestamp: number;
    sdkVersion?: string;
    endTime: string;
    beginTime: string;
  }>((signal, data) =>
    instance.post(biliApi.getListForUserBillRecord, { ...data, sdkVersion: '1.1.7' }, { signal, headers: { 'Cache-Control': 'no-cache' } })
  );
}