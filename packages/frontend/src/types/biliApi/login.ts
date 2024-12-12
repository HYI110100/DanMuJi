export interface LoginQR { 
    qrcode_key: string
    url: string
}
export interface LoginByQR { 
    url: string
    refresh_token: string
    timestamp: number
    code: number
    message: string
}

export interface Logout  {
  code: number;
  status: boolean;
  ts: number;
  data: {
    redirectUrl: string;
  }
}