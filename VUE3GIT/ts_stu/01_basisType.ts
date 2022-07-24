//第一次賦值時,typeScript會判斷你的變量是甚麼類型并給出限制
let a = 320;//number類型
a = 10;

//指定對象中的數據類型,還有有甚麼屬性
let b: { name: string, [name: string]: unknown };
b = { name: 'timmy', age: 19 };

//指定數組類型
let f: number[];
f = [1, 2, 3];

//自定義類型
type myType = 1 | 2 | 3
let k:myType;
k=2;

//函數可以指定參數類型,返回值也可以指定
let d: (a: number, b: number) => number;
function sum(a: number, b: number): number {
    return 1;
}
console.log('hello')