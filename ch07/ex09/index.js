const s1 = "𠮷野家";
const s2 = "👨‍👨‍👧‍👧";

console.log("𠮷野家[0]の長さ：",s1[0].length);
console.log("16進のコード値：",s1[0].charCodeAt(0).toString(16));
console.log("サロゲートペアのコードポイントで見る：",s1.slice(0,2).codePointAt(0).toString(16));
console.log("𠮷野家の長さ：",s1.length);

console.log("---------------------------");

console.log("👨‍👨‍👧‍👧[0]の長さ：",s2[0].length);
console.log("16進のコード値：",s2[0].charCodeAt(0).toString(16));
console.log("サロゲートペアのコードポイントで見る：",s2.slice(0,2).codePointAt(0).toString(16));
console.log("👨‍👨‍👧‍👧の長さ：",s2.length);