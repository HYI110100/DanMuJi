// ws
import http from "http";
import { Connect, Destroy } from "~/types/subscribeMessage";
// bili ws
import { BiLiWsParam, MessageData } from "~/bilibili/types";
import { WS_CONST } from "~/bilibili/enum";
import { biliDecoding, biliEncoding } from "~/bilibili/utils";
import Joi from '@hapi/joi';
import { MessageItem, MessageType, TaskQueue } from "my-utils";
import { handleMessageFn } from "~/modules/ws/dataFormatting";
// Joi.object({
//   // roomId: Joi.number().min(0).required(),
//   params: Joi.object({
//     uid: Joi.number().min(0).required(),
//     roomId: Joi.number().min(0).required(),
//     urlList: Joi.array().items(Joi.string()).required(),
//     token: Joi.string().required(),
//     buvid3: Joi.string().required(),
//   }).required(),
// })
export default (server: http.Server) => {
 
};
