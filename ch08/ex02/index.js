export function powRecursive(x,n){
    if(!Number.isFinite(x)){// xがNaN、Infinity、数値以外の場合ははじく。
        throw new Error("x must be a number.");
    }
    if(!Number.isInteger(n) || n <= 0){// nが整数でない、0以下の場合ははじく。
        throw new Error("n must be a positive integer");
    }
    if(n === 1){// nが1の場合は再帰を終了してxをreturn => nが0になって再帰した場合、上のエラー文でエラーになってしまう。
        return x;
    }
    if(n % 2 === 0){// b^n = (b^{n/2})^2 (n が偶数の時)
        const half = powRecursive(x, n / 2);// nを半分にしたもので出した関数を保持しておく。
        return half * half;// 1段下の掛け算を行ってreturnする。その値を上に上げていく形。
    }
    if(n % 2 !== 0){// b^n = b * b^{n - 1} (n が奇数の時)
        return x * powRecursive(x, n - 1);
    }
}

export function powIterative(x,n){
    if(!Number.isFinite(x)){// xがNaN、Infinity、数値以外の場合ははじく。
        throw new Error("x must be a number.");
    }
    if(!Number.isInteger(n) || n <= 0){// nが整数でない、0以下の場合ははじく。
        throw new Error("n must be a positive integer");
    }
    let result = 1;// 最終的な答えになる
    let base = x;// 下からべき乗していくときに保持する値
    while(n > 0){
        if(n % 2 === 0){// b^n = (b^{n/2})^2 (n が偶数の時) => (b^2)^{n/2}と解釈できる。(b^2)がbase*baseにあたる。
            base = base * base;
        }
        if(n % 2 !== 0){// b^n = b * b^{n - 1} (n が奇数の時)
            result = result * base;// 取り出したbをresultに掛け算する
            base = base * base;// 残ったb^{n-1}に関してはn-1が偶数になるので、(b^2)^{(n-1)/2}と解釈できる。(b^2)がbase*baseにあたる。
        }
        n = Math.floor(n/2);// nが奇数の場合でも小数点にならないようにする。
    }
    return result;
}