// with文でのエラー
// エラー文は「SyntaxError: Strict mode code may not include a with statement」だった。
export function withStateFix(num, str){
    let obj = {a:1, s:"string"};
    let b = 5;
    obj.a = num;
    b = num;
    obj.s = str;
    return [b,obj];
};

// 関数での複数プロパティのエラー
// エラー文は「SyntaxError: Duplicate parameter name not allowed in this context」だった。
// withState関数をコメントアウトして実行。
export function duplicateParamFix(num1, num2, str){
    let a = num1;
    a = num2;
    const s = str;
    return [a,s];
};

// オブジェクトリテラルで同じ名前で複数のプロパティを定義
// 教科書にはエラーになると書いてあるが、ES2015以降はこの制限が撤廃されたので、strict.jsでも実行できた。
// withState関数、duplicateParam関数をコメントアウトして実行。
export function duplicatePropFix(num, str){
    let obj = {a:1, s:"string"};
    obj.a = 10; // エラーにはならないが、同じプロパティを指定すると上書きされるので、その処理を記載。
    obj.a = num;
    obj.s = str;
    return obj;
};

// 宣言キーワードを付けずにいきなり代入
// エラー文は「ReferenceError: globalNumber is not defined」になった。
// withState関数、duplicateParam関数をコメントアウトして実行。
export function referenceErrorFix(){
    globalThis.globalNumber = 9999;
    globalThis.globalString = "global";
    return [globalThis.globalNumber, globalThis.globalString];
};

console.log(withStateFix(10,"hello"));
console.log(duplicateParamFix(1, 99, "world"));
console.log(duplicatePropFix(111, "JavaScript"));
referenceErrorFix();
console.log(globalThis.globalNumber, globalThis.globalString); // referenceError()をコメントアウトして実行すると両方ともundefinedになった。
console.log(referenceErrorFix());