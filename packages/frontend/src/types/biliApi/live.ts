export interface RoomInfo {
    uid: number;
    room_id: number;
    short_id: number;
    attention: number;
    online: number;
    is_portrait: boolean;
    description: string;
    live_status: number;
    area_id: number;
    parent_area_id: number;
    parent_area_name: string;
    old_area_id: number;
    background: string;
    title: string;
    user_cover: string;
    keyframe: string;
    is_strict_room: boolean;
    live_time: string;
    tags: string;
    is_anchor: number;
    room_silent_type: string;
    room_silent_level: number;
    room_silent_second: number;
    area_name: string;
    pendants: string;
    area_pendants: string;
    hot_words: string[];
    hot_words_status: number;
    verify: string;
    new_pendants: {
      frame: {
        name: string;
        value: string;
        position: number;
        desc: string;
        area: number;
        area_old: number;
        bg_color: string;
        bg_pic: string;
        use_old_area: boolean;
      };
      badge: null;
      mobile_frame: {
        name: string;
        value: string;
        position: number;
        desc: string;
        area: number;
        area_old: number;
        bg_color: string;
        bg_pic: string;
        use_old_area: boolean;
      };
      mobile_badge: null;
    };
    up_session: string;
    pk_status: number;
    pk_id: number;
    battle_id: number;
    allow_change_area_time: number;
    allow_upload_cover_time: number;
    studio_info: {
      status: number;
      master_list: any[];
    };
  }
  
  export interface RoomHistory {
    group: string;
    business_id: number;
    refresh_row_factor: number;
    refresh_rate: number;
    max_delay: number;
    token: string;
    host_list: {
      host: string;
      port: number;
      wss_port: number;
      ws_port: number;
    }[];
  }
  
  export interface MasterInfo {
    info: {
      uid: number;
      uname: string;
      face: string;
      official_verify: {
        type: number;
        desc: string;
      };
      gender: number;
    };
    exp: {
      master_level: {
        level: number;
        color: number;
        current: number[];
        next: number[];
      };
    };
    follower_num: number;
    room_id: number;
    medal_name: string;
    glory_count: number;
    pendant: string;
    link_group_num: number;
    room_news: {
      content: string;
      ctime: string;
      ctime_text: string;
    };
  }
  
  
  export interface HistoryComment {
    text: string;
    dm_type: number;
    uid: number;
    nickname: string;
    uname_color: string;
    timeline: string;
    isadmin: number;
    vip: number;
    svip: number;
    medal: (number | string)[];
    title: string[];
    user_level: (number | string)[];
    rank: number;
    teamid: number;
    rnd: string;
    user_title: string;
    guard_level: number;
    bubble: number;
    bubble_color: string;
    lpl: number;
    yeah_space_url: string;
    jump_to_url: string;
    check_info: {
      ts: number;
      ct: string;
    };
    voice_dm_info: {
      voice_url: string;
      file_format: string;
      text: string;
      file_duration: number;
      file_id: string;
    };
    emoticon: {
      id: number;
      emoticon_unique: string;
      text: string;
      perm: number;
      url: string;
      in_player_area: number;
      bulge_display: number;
      is_dynamic: number;
      height: number;
      width: number;
    };
    emots: Record<string, {
      count: number;
      descript: string;
      emoji: string;
      emoticon_id: number;
      emoticon_unique: string;
      height: number;
      url: string;
      width: number;
    }>;
    id_str: string;
    wealth_level: number;
    bubble_id_v2: number;
    reply: {
      show_reply: boolean;
      reply_mid: number;
      reply_uname: string;
      reply_uname_color: string;
      reply_is_mystery: boolean;
      reply_type_enum: number;
    };
    group_medal: null;
    user: {
      uid: number;
      base: {
        name: string;
        face: string;
        name_color: number;
        is_mystery: boolean;
        risk_ctrl_info: null;
        origin_info: {
          name: string;
          face: string;
        };
        official_info: {
          role: number;
          title: string;
          desc: string;
          type: number;
        };
        name_color_str: string;
      };
      medal: {
        name: string;
        level: number;
        color_start: number;
        color_end: number;
        color_border: number;
        color: number;
        id: number;
        typ: number;
        is_light: number;
        ruid: number;
        guard_level: number;
        score: number;
        guard_icon: string;
        honor_icon: string;
        v2_medal_color_start: string;
        v2_medal_color_end: string;
        v2_medal_color_border: string;
        v2_medal_color_text: string;
        v2_medal_color_level: string;
        user_receive_count: number;
      };
      wealth: null;
      title: {
        old_title_css_id: string;
        title_css_id: string;
      };
      guard: null;
      uhead_frame: null;
      guard_leader: {
        is_guard_leader: boolean;
      };
    };
  }
  