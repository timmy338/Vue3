//數值轉換
export function millionsHandle(num: number) {
    return num > 9999 ? Math.floor(num / 1000) / 10 + "万" : num;
}

//時長轉換
export function durationHandle(num: number) {
    let min = Math.floor(num / 60);
    let second = Math.floor(num % 60);
    return (min < 10 ? "0" + min : min) + ":" + ((second % 60) < 10 ? '0' + second : second);
}

//日期轉換(月-日)
export function monthDayHandle(num: number) {
    let myDate = new Date(num * 1000);
    return "· " + (myDate.getMonth() + 1) + "-" + myDate.getDate();
}

//日期轉換(年-月-日)
export function yearToSecondHandle(num: number) {
    let myDate = new Date(num*1000);
    return (myDate.getFullYear()) + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate()+" "+myDate.toTimeString().substring(0,8);
}

export function checkNull(myObject:object){
    if(myObject==undefined){
        return "";
    }
    else return myObject;
}