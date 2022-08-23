import request from './request'

interface apiBasic {
    code: number;
    status: boolean;
    ts: number;
}

interface codeLoginUrl extends apiBasic {
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
    message?: string;
    ts?: number;
    data: number | {
        url: string;
        refresh_token: string;
        timestamp: number;
    }
}

//2維碼登錄api
export const getCodeLoginInfo = (oauthKey: string): Promise<codeLoginInfo> => {
    return request.post('/passport/qrcode/getLoginInfo?oauthKey=' + oauthKey)
}

interface userInfo extends apiBasic {
    data: {
        face: string;
    };
}
//用戶信息api
export const getUserInfo = (): Promise<userInfo> => {
    return request.get('/api/nav');
}

export type rcmdVideo = {
    aid: string,
    pic: string,
    duration: number,
    title: string,
    pubdate: number,
    owner: {
        name: string,
        face: string
    }
    stat: {
        view: number,
        like: number,
        danmaku: number
    }
}

interface recommendVideo extends apiBasic {
    data: {
        archives: rcmdVideo[];
    };
}
//首頁推薦視頻
export const getHomePageRcmdVideo = (): Promise<recommendVideo> => {
    return request.get('/api/x/web-interface/dynamic/region?ps=6&rid=1');
}
export interface videoPageInfo {
    data: {
        aid:number,
        desc: string,
        title: string,
        pubdate: number,
        stat: {
            view: number,
            danmaku: number,
            favorite: number,
            like: number,
            coin: number,
            share: number
        }
        honor_reply: {
            honor: {
                desc: string
            }[]
        }
    };
}


//視頻api
export const getVideo = (bv: string): Promise<videoPageInfo> => {
    return request.get('/api/x/web-interface/view?bvid=' + bv);
}

export type videoTag = { tag_name: string, type: number }
interface videoTags {
    data: videoTag[]
}

//視頻tag
export const getVideoTags = (bv: string): Promise<videoTags> => {
    return request.get('/api/x/tag/archive/tags?bvid=' + bv)
}

export type reply = { ctime: number,rpid:number, rcount: number, like: number,mid:number,page:{num:number},folder:{is_folded:boolean}, member: { uname: string, avatar: string, level_info: { current_level: number } }, content: { message: string }, replies: reply[] , reply_control: { sub_reply_entry_text: string } };

interface videoComments {
    data: {
        replies: reply[],
        top:{upper:{mid:number}}
    }
}


//視頻評論
export const getVideoComments = (av: number): Promise<videoComments> => {
    return request.get('/api/x/v2/reply/main?type=1&oid=' + av)
}

interface rootReplies {
    data: {
        replies: reply[],
    }
}


//視頻評論
export const getRootReplies = (oid: number,root:number,page:number): Promise<rootReplies> => {
    console.log('https://api.bilibili.com/x/v2/reply/reply?type=1&oid='+oid+'&root=' + root+'&ps=10'+'&pn='+page);
    return request.get('/api/x/v2/reply/reply?type=1&oid='+oid+'&root=' + root+'&ps=10'+'&pn='+page)
}