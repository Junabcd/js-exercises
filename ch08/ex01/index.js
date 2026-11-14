// 引数、戻り値の括弧ともに必要 => 引数が2つある、処理が複数行にまたがる
export const logAndRepeat = (n, c) => {
    const arr = [];
    for(let i = 0; i < n; i++){
        console.log(c);
        arr.push(c);
    }
    return arr;
}

// 引数、戻り値の括弧ともに不要 => 引数が1つのみ、returnするものが数値
export const square = x => x * x;

// 引数、戻り値の括弧ともに必要 => 引数なし、returnするものがオブジェクト
export const dateNow = () => ({now: Date.now()});