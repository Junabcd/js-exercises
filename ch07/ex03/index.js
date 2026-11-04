export function sum(arr){
    if(arr === undefined){
        arr = []; // sumに引数が渡されなった場合は空の配列を生成。
    }
    return arr.reduce((acc, cur) => acc + cur, 0);
}

export function join(arr, sep){
    if(arr === undefined){
        throw new Error("arr must be an array");
    }
    if(sep === undefined){ //引数でsep = ","でもデフォルト値を設定できる。
        sep = ",";
    }
    return arr.reduce((acc, cur, index) => {
        if(cur === null || cur === undefined){ //配列の中身がnullやundefinedの場合は空文字に変換。
            cur = "";
        }
        if(index !== 0){
            cur = String(sep) + cur; //sepを明示的に文字列にして文字連結をする。最初の文字の前に区切り文字はつけないので、indexで制御。
        }
        return acc + cur; //次のaccに入る。
    }, "");
}

export function reverse(arr){
    if(arr === undefined){
        throw new Error("arr must be an array");
    }
    return arr.reduce((acc, cur, index) => {
        acc[arr.length - index - 1] = cur; //後ろから値を埋めていく。
        return acc;
    }, []);
}

export function every(arr, fn){
    return arr.reduce((acc, cur, index) => { //everyは、コールバックを(要素, インデックス, 配列)の順で呼ぶ
        return acc && fn(cur, index, arr); //一旦falseになったら、ずっとfalseにしたい。
    },true);
}

export function some(arr, fn){
    return arr.reduce((acc, cur, index) => { //someも、コールバックを(要素, インデックス, 配列)の順で呼ぶ
        return acc || fn(cur, index, arr); //一旦trueになったら、ずっとtrueにしたい。
    },false);
}