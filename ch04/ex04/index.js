export function bitCount(n){
    const string_n = (n >>> 0).toString(2); //負の数にも対応するように補数として表すためのシフト
    const regex = /1/g; //1を探す。gはすべてのマッチしたものを取り出すためのフラグ。
    const found = string_n.match(regex);
    if(found === null){ //1がないときはnullになる
        return 0;
    }
    return found.length; //配列で返されるので、長さを返せば1の個数になる。
}