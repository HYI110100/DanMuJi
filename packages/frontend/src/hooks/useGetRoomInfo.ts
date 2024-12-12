import { getMasterInfo, getRoomInfo } from "~/config/biliApiFn";
import { toNumber } from "~/utils";

export default function useGetRoomInfo() {

    const roomInfo = getRoomInfo();
    const masterInfo = getMasterInfo();

    interface RoomInfoData {
        title: string;
        id: number;
        status: number;
        cover: string;
        areaName: string;
        areaId: number;
        info: {
            pendant: string;
            uid: number;
            uname: string;
            face: string;
            followerNum: number;
            medalName: string;
        };
        announcement: {
            content: string;
            ctime: string;
            ctime_text: string;
        };
    }
    const loading = ref(false);
    const roomId = ref<string | null>(null);
    const roomInfoData = ref<RoomInfoData | null>(null);
    async function getRoomData() {
        if (!roomId.value) {
            $message.warning("请输入正确的房间ID");
            return;
        }
        const id = toNumber(roomId.value);
        loading.value = true;
        try {
            const roomData = await roomInfo.start(id);
            const masterData = await masterInfo.start(roomData.uid);
            roomInfoData.value = {
                title: roomData.title,
                id: roomData.room_id,
                status: roomData.live_status,
                cover: roomData.user_cover,
                areaName: roomData.area_name,
                areaId: roomData.area_id,
                info: {
                    pendant: masterData.pendant,
                    uid: masterData.info.uid,
                    uname: masterData.info.uname,
                    face: masterData.info.face,
                    followerNum: masterData.follower_num,
                    medalName: masterData.medal_name,
                },
                announcement: masterData.room_news,
            };
            loading.value = false;
        } catch (error) {
            loading.value = false;
            return Promise.reject(error);
        }
    }
    return {
        roomId,
        roomInfoData,
        getRoomData,
        loading,
    }
}