// import WebSocketClient from "~/utils/wsClient";
// import { BiLiWsParam } from "./types";
// import { biliDecoding, biliEncoding } from "./utils";
// import { WS_CONST } from "./enum";

// class BiLiWs {
//   private ws: WebSocketClient;
//   constructor(opt: BiLiWsParam) {
//     this.ws = new WebSocketClient({
//       MODE: "Inquiry",
//       urls: opt.urlList,
//       authenticationPackage: () => {
//         const auth = {
//           uid: opt.uid,
//           roomid: opt.roomId,
//           platform: "web",
//           buvid: opt.buvid3,
//           key: opt.token,
//           protover: 3,
//           type: 2,
//         };
//         return biliEncoding(
//           JSON.stringify(auth),
//           WS_CONST.WS_OP_USER_AUTHENTICATION
//         );
//       },
//       heartbeatPacket: () => {
//         return biliEncoding("", WS_CONST.WS_OP_HEARTBEAT);
//       },
//       isAuthenticationSuccess: (data) => {
//         const parsedData = biliDecoding(data as ArrayBuffer);
//         return parsedData.op === WS_CONST.WS_OP_CONNECT_SUCCESS ? parsedData.body[0].code === WS_CONST.WS_AUTH_OK ? true : false : true
//       },
//       isHeartbeatResume: (data) => {
//         const parsedData = biliDecoding(data as ArrayBuffer);
//         return parsedData.op === WS_CONST.WS_OP_MESSAGE
//       },
//     });

//     this.ws.on("message", (data) => {
//       const parsedData = biliDecoding(data as ArrayBuffer);
//       if (parsedData instanceof Object) {
//         switch (parsedData.op) {
//           case WS_CONST.WS_OP_MESSAGE:
//             break;
//         }
//       }
//     });
//     this.ws.on("open", () => {});
//   }
// }

// export default BiLiWs;
