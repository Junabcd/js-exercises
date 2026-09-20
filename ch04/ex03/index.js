export function sub(a,b){
    return add(a, neg(b));
};

export function add(a,b){
    let m = a ^ b;
    let n = a & b;
    let n_tmp = 0;
    while(n !== 0){ //繰り上がりがなくなるまで繰り返す
        n = n << 1; //繰り上がりしたものともう一度xorとandを取る
        n_tmp = n; //古いnの値を一時的に避難 → xorでの計算で使用するため
        n = m & n;
        m = m ^ n_tmp;
    }
    return m;
};

export function neg(n){
    n = add(~n, 1); //33ビット目以降は省略されるので、ここは1を足すだけでよい。（add関数の繰り返しの中で33ビット目に繰り上がると33ビット目以降が省略された状態でwhile式での判定になる）
    return n;
}