import request from './request'

interface apiBasic{
    code: number;
    status: boolean;
    ts: number;
}

interface codeLoginUrl  extends apiBasic{
    data: {
        url: string;
        oauthKey: string;
    }
}

//獲取2維碼登錄api
export const getCodeLoginUrl = (): Promise<codeLoginUrl> => {
    return request.get('/passport/qrcode/getLoginUrl');
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
    return request.post('/passport/qrcode/getLoginInfo?oauthKey='+oauthKey)
}

interface userInfo extends apiBasic{
    data: {
        face:string;
    };
}
//用戶信息api
export const getUserInfo=():Promise<userInfo>=>{
    return request.get('/api/nav');
}

export type rcmdVideo={
    pic:string,
    duration:number,
    owner:{
        name:string,
        face:string
    }
    stat:{
        view:number,
        like:number
    }
}

interface recommendVideo extends apiBasic{
    data: {
        item:rcmdVideo[];
    };
}
//首頁輪播圖
export const getHomePageCarousel=():Promise<recommendVideo>=>{
    return request.get('/api/x/web-interface/index/top/rcmd?version=1&ps=3');
}