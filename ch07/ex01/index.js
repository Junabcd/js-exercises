export function add(table1, table2){
    const result = [];
    if(!isValidateMatrix(table1) || !isValidateMatrix(table2)){
        throw new TypeError("table1 or table2 is not a valid matrix");
    }
    if((table1.length !== table2.length) || (table1[0].length !== table2[0].length)){
        throw new RangeError("Matrix sizes do not match");
    }
    for(let row = 0; row < table1.length; row++){
        result.push([]); //先に空の配列をプッシュしておく。→resultは空なので result[0] はundefinedで、pushがない。
        for(let col = 0; col < table1[row].length; col++) {
            result[row].push(table1[row][col] + table2[row][col]);
        }
    }
    return result;
}

export function multiply(table1, table2){
    const result = [];
    if(!isValidateMatrix(table1) || !isValidateMatrix(table2)){
        throw new TypeError("table1 or table2 is not a valid matrix");
    }
    if(table1[0].length !== table2.length){
        throw new RangeError("Matrix sizes do not match");
    }
    for(let row = 0; row < table1.length; row++){
        result.push([]); //先に空の配列をプッシュしておく。→resultは空なので result[0] はundefinedで、pushがない。
        for(let col = 0; col < table2[0].length; col++) {
            let sum = 0;
            for(let k = 0; k < table2.length; k++){
                sum += table1[row][k] * table2[k][col];
            }
            result[row].push(sum);
        }
    }
    return result;
}

// 行列をチェックする関数。仕様は以下でその順番でチェックしている。
// 1. 引数が配列か
// 2. 行数が 1 以上か (m.length)
// 3. 各行が配列か
// 4. 列数が 1 以上か (m[0].length) ← 3 のあとなら m[0] が配列だと確定している。ここでは[[]]のパターンをはじく。
// 5. 全行の長さがそろっているか ← ここでどこかしらの配列が空だとはじかれる。
// 6. 全要素が数値か ← NaN、Infinityははじいている。
// 7. すべてクリアした場合はtrueを返す
function isValidateMatrix(m){
    if(!Array.isArray(m)){
        return false;
    }
    else if(m.length === 0){
        return false;
    }
    else if(!m.every(row => Array.isArray(row))){
        return false;
    }
    else if(m[0].length === 0){
        return false;
    }
    else if(!m.every(row => m[0].length === row.length)){
        return false;
    }
    else if(!m.every(row => row.every(value => Number.isFinite(value)))){
        return false;
    }
    else return true;
}