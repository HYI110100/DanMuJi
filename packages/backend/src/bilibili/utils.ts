import { wsBinaryHeaderList } from "./const";
import { WS_CONST } from "./enum";
import * as brotli from "brotli";

export const textUtils = {
    getTextDecoder: function () {
        return new TextDecoder ? new TextDecoder() : {
            decode: function (buffer: ArrayBuffer) {
                return Buffer.from(buffer).toString('utf8');
            }
        };
    },

    getTextEncoder: function () {
        return new TextEncoder ? new TextEncoder() : {
            encode: function (text: string) {
                return Buffer.from(text, 'utf8').buffer;
            }
        };
    },

    mergeArrayBuffers: function (buffer1:ArrayBuffer, buffer2:ArrayBuffer) {
        const array1 = new Uint8Array(buffer1);
        const array2 = new Uint8Array(buffer2);
        const mergedArray = new Uint8Array(array1.byteLength + array2.byteLength);
        mergedArray.set(array1, 0);
        mergedArray.set(array2, array1.byteLength);
        return mergedArray.buffer;
    },

    // invokeFunctions: function (functions, context) {
    //     if (Array.isArray(functions) && functions.length) {
    //         functions.forEach((fn) => {
    //             if (typeof fn === 'function') {
    //                 fn(context);
    //             }
    //         });
    //         return null;
    //     } else if (typeof functions === 'function') {
    //         functions(context);
    //     }
    // },

    // mergeObjects: function (target) {
    //     const args = Array.prototype.slice.call(arguments, 1);
    //     const result = target || {};
    //     if (result instanceof Object) {
    //         args.forEach((source) => {
    //             if (source instanceof Object) {
    //                 Object.keys(source).forEach((key) => {
    //                     result[key] = source[key];
    //                 });
    //             }
    //         });
    //     }
    //     return result;
    // }
}
const encoder = textUtils.getTextEncoder()
/**
 * 将客户端发给B站的数据进行编码
 * @param payload 要发送的数据
 * @param op 操作码
 */
export function biliEncoding(payload: string, op: number): ArrayBuffer {
    const header = new ArrayBuffer(WS_CONST.WS_PACKAGE_HEADER_TOTAL_LENGTH)
    const dataView = new DataView(header, WS_CONST.WS_PACKAGE_OFFSET)
    const body = encoder.encode(payload)

    dataView.setInt32(WS_CONST.WS_PACKAGE_OFFSET, WS_CONST.WS_PACKAGE_HEADER_TOTAL_LENGTH + body.byteLength)
    wsBinaryHeaderList[2].value = op
    wsBinaryHeaderList.forEach(head => {
        if (head.bytes === 4) {
            dataView.setInt32(head.offset, head.value)
        } else if (head.bytes === 2) {
            dataView.setInt16(head.offset, head.value)
        }
    })
    return textUtils.mergeArrayBuffers(header, body as ArrayBuffer) 
}


const decoder = textUtils.getTextDecoder()
/**
 * 解析B站发回的数据
 * @param buffer 原始 message 消息
 */
export function biliDecoding(data: ArrayBuffer){
    const view = new DataView(data);
    const packet: {
        op?: WS_CONST,
        seq?: number,
        ver?: number,
        headerLen?: number,
        packetLen?: number,
        body: any
    } = { body: [] };

    packet.packetLen = view.getInt32(WS_CONST.WS_PACKAGE_OFFSET);

    wsBinaryHeaderList.forEach((header) => {
        if (header.bytes === 4) {
            packet[header.key] = view.getInt32(header.offset);
        } else if (header.bytes === 2) {
            packet[header.key] = view.getInt16(header.offset);
        }
    });

    if (packet.packetLen < data.byteLength) {
        biliDecoding(data.slice(0, packet.packetLen));
    }

    if (!packet.op || (packet.op !== WS_CONST.WS_OP_MESSAGE && packet.op !== WS_CONST.WS_OP_CONNECT_SUCCESS)) {
        if (packet.op === WS_CONST.WS_OP_HEARTBEAT_REPLY) {
            packet.body = {
                count: view.getInt32(WS_CONST.WS_PACKAGE_HEADER_TOTAL_LENGTH),
            };
        }
    } else {
        let offset = WS_CONST.WS_PACKAGE_OFFSET;
        let length = packet.packetLen;

        while (offset < data.byteLength) {
            length = view.getInt32(offset);
            const headerLength = view.getInt16(offset + WS_CONST.WS_HEADER_OFFSET);
            let body;

            if (packet.ver === WS_CONST.WS_BODY_PROTOCOL_VERSION_NORMAL) {
                const jsonString = decoder.decode(
                    data.slice(offset + headerLength, offset + length)
                );
                body = jsonString.length !== 0 ? JSON.parse(jsonString) : null;

                if (body)
                    packet.body.push(body);
            } else if (packet.ver === WS_CONST.WS_BODY_PROTOCOL_VERSION_BROTLI) {
                const compressedData = data.slice(
                    offset + headerLength,
                    offset + length
                );
                const decompressedData = brotli.decompress(Buffer.from(compressedData))
                body = biliDecoding(decompressedData.buffer as ArrayBuffer).body;
                if (body)
                    packet.body.push(...body);

            }

            offset += length;
        }
    }

    return packet;

}