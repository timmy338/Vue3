import request from './request'

interface codeLoginUrl {
    code: number;
    status: boolean;
    ts: number;
    data: {
        url: string;
        oauthKey: string;
    }
}

//獲取2維碼登錄api
export const getCodeLoginUrl = (): Promise<codeLoginUrl> => {
    return request.get('/qrcode/getLoginUrl');
}

interface codeLoginInfo {
    code?: number;
    status: boolean;
    message?:string;
    ts?: number;
    data: number|{
        url: string;
        refresh_token: string;
        timestamp:number;
    }
}

//2維碼登錄api
export const getCodeLoginInfo=(oauthKey:string):Promise<codeLoginInfo>=>{
    return request.post('/qrcode/getLoginInfo?oauthKey='+oauthKey)
}