// with文でのエラー
// エラー文は「SyntaxError: Strict mode code may not include a with statement」だった。
function withState(num, str){
    let obj = {a:1, s:"string"};
    let b = 5;
    with(obj){
        a = num;
        b = num;
        s = str; 
    }
    return [b,obj];
};

// 関数での複数プロパティのエラー
// エラー文は「SyntaxError: Duplicate parameter name not allowed in this context」だった。
// withState関数をコメントアウトして実行。
function duplicateParam(num, num, str){
    const a = num;
    const s = str;
    return [a,s];
};

// オブジェクトリテラルで同じ名前で複数のプロパティを定義
// 教科書にはエラーになると書いてあるが、ES2015以降はこの制限が撤廃されたので、strict.jsでも実行できた。
// withState関数、duplicateParam関数をコメントアウトして実行。
function duplicateProp(num, str){
    let obj = {a:1, a:10, s:"string"};
    obj.a = num;
    obj.s = str;
    return obj;
};

// 宣言キーワードを付けずにいきなり代入
// エラー文は「ReferenceError: globalNumber is not defined」になった。
// withState関数、duplicateParam関数をコメントアウトして実行。
function referenceError(){
    globalNumber = 9999;
    globalString = "global";
    return [globalNumber, globalString];
};

console.log(withState(10,"hello"));
console.log(duplicateParam(1, 99, "world"));
console.log(duplicateProp(111, "JavaScript"));
referenceError();
console.log(globalThis.globalNumber, globalThis.globalString); // referenceError()をコメントアウトして実行すると両方ともundefinedになった。
console.log(referenceError());

module.exports = {withState, duplicateParam, duplicateProp, referenceError}