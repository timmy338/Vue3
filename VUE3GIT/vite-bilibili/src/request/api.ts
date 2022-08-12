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
    duration:number|string,
    title:string,
    pubdate:number|string,
    owner:{
        name:string,
        face:string
    }
    stat:{
        view:number,
        like:number,
        danmaku:number
    }
}

interface recommendVideo extends apiBasic{
    data: {
        item:rcmdVideo[];
    };
}
//首頁推薦視頻
export const getHomePageRcmdVideo=():Promise<recommendVideo>=>{
    return request.get('/api/x/web-interface/index/top/rcmd?version=1&ps=3');
}

export const getHomeCarousel=():Promise<unknown>=>{
    return request.get('/api/x/web-interface/index/top/rcmd?version=1&ps=3');
}
