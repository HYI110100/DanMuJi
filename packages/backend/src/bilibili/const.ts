import { WS_CONST } from "./enum";
import { WSBinaryHeader } from "./types";

export const wsBinaryHeaderList: WSBinaryHeader[] = [
    {
        name: "Header Length",
        key: "headerLen",
        bytes: 2,
        offset: WS_CONST.WS_HEADER_OFFSET,
        value: WS_CONST.WS_PACKAGE_HEADER_TOTAL_LENGTH,
    },
    {
        name: "Protocol Version",
        key: "ver",
        bytes: 2,
        offset: WS_CONST.WS_VERSION_OFFSET,
        value: WS_CONST.WS_HEADER_DEFAULT_VERSION,
    },
    {
        name: "Operation",
        key: "op",
        bytes: 4,
        offset: WS_CONST.WS_OPERATION_OFFSET,
        value: WS_CONST.WS_HEADER_DEFAULT_OPERATION,
    },
    {
        name: "Sequence Id",
        key: "seq",
        bytes: 4,
        offset: WS_CONST.WS_SEQUENCE_OFFSET,
        value: WS_CONST.WS_HEADER_DEFAULT_SEQUENCE,
    }
]