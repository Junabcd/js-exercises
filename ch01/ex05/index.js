export function abs(x) {
    if (x >= 0) {
        return x;
    }
    else {
        return -x;
    }
}

export function sum(array) { // 配列の要素の合計を計算する。
    let sum = 0; // sum の初期値を0 にする。
    for(let x of array) { // 配列をループし、各要素をx に代入する。
        sum += x; // sum に各要素の値を加算する。
    } // ここでループが終わる。
    return sum; // sum を返す。
}

export function factorial(n) { // 階乗を計算する関数。
    let product = 1; // 1 からスタート。
    while(n > 1) { // () 中の式がtrue の間は{}中の文を繰り返す。
        product *= n; // product = product * n; の短縮表記。
        n--; // n = n - 1 の短縮表記。
    } // ループの最後。
    return product; // 計算結果を返す。
}