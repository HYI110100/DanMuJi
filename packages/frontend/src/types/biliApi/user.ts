
export interface UserInfoByNva {
  isLogin: boolean;
  email_verified: number;
  face: string;
  face_nft: number;
  face_nft_type: number;
  level_info: Levelinfo;
  mid: number;
  mobile_verified: number;
  money: number;
  moral: number;
  official: Official;
  officialVerify: OfficialVerify;
  pendant: Pendant;
  scores: number;
  uname: string;
  vipDueDate: number;
  vipStatus: number;
  vipType: number;
  vip_pay_type: number;
  vip_theme_type: number;
  vip_label: Viplabel;
  vip_avatar_subscript: number;
  vip_nickname_color: string;
  vip: Vip;
  wallet: Wallet;
  has_shop: boolean;
  shop_url: string;
  answer_status: number;
  is_senior_member: number;
  wbi_img: Wbiimg;
  is_jury: boolean;
  name_render: null;
}

interface Wbiimg {
  img_url: string;
  sub_url: string;
}

interface Wallet {
  mid: number;
  bcoin_balance: number;
  coupon_balance: number;
  coupon_due_time: number;
}

interface Vip {
  type: number;
  status: number;
  due_date: number;
  vip_pay_type: number;
  theme_type: number;
  label: Viplabel;
  avatar_subscript: number;
  nickname_color: string;
  role: number;
  avatar_subscript_url: string;
  tv_vip_status: number;
  tv_vip_pay_type: number;
  tv_due_date: number;
  avatar_icon: Avataricon;
}

interface Avataricon {
  icon_resource: Iconresource;
}

interface Iconresource {
}

interface Viplabel {
  path: string;
  text: string;
  label_theme: string;
  text_color: string;
  bg_style: number;
  bg_color: string;
  border_color: string;
  use_img_label: boolean;
  img_label_uri_hans: string;
  img_label_uri_hant: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant_static: string;
}

interface Pendant {
  pid: number;
  name: string;
  image: string;
  expire: number;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
}

interface OfficialVerify {
  type: number;
  desc: string;
}

interface Official {
  role: number;
  title: string;
  desc: string;
  type: number;
}

interface Levelinfo {
  current_level: number;
  current_min: number;
  current_exp: number;
  next_exp: string;
}