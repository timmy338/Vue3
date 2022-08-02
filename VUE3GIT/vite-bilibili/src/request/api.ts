import request from './request'

interface codeLoginRes {
    code: number;
    status: boolean;
    ts: number;
    data: {
        url: string;
        oauthKey: string;
    }
}

//登錄api
export const codeLoginApi = (): Promise<codeLoginRes> => {
    return request.get('/qrcode/getLoginUrl');
}

