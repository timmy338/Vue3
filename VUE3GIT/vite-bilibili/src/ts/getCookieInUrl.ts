import Cookie from "js-cookie"

export function setCookie(url: string) {

    let DedeUserID: RegExpMatchArray|string | null = url.match("DedeUserID=\\w+");
    let DedeUserID__ckMd5: RegExpMatchArray | null = url.match("DedeUserID__ckMd5=\\w+");
    let SESSDATA: RegExpMatchArray | null = url.match("SESSDATA=[\\w | %]+");
    let bili_jct: RegExpMatchArray | null = url.match("bili_jct=\\w+");

    if (DedeUserID != null) {
        Cookie.set('DedeUserID', DedeUserID[0].substring(11), { expires: 7 })
    }
    if (DedeUserID__ckMd5 != null) {
        Cookie.set('DedeUserID__ckMd5', DedeUserID__ckMd5[0].substring(18), { expires: 7 })
    }
    if (SESSDATA != null) {
        Cookie.set('SESSDATA', SESSDATA[0].substring(9), { expires: 7 })
    }
    if (bili_jct != null) {
        Cookie.set('bili_jct', bili_jct[0].substring(9), { expires: 7 })
    }


}