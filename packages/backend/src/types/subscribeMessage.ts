export interface RoomInfo {
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

export interface Connect<T> {
    roomId: number;
    params: T
    roomInfo: RoomInfo
}
export interface Destroy {}