const obj1 = {x: 1};
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2
console.log(obj1);

const obj2 = {x: 1, y: 2};
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
// 別々のオブジェクトは等しいと判断されないので、falseが表示される。
console.log(obj1 === obj2);

export function equals(o1,o2){
    if(o1 === o2) return true; //objectの場合は別々のものとみなされてfalseになる。
	if((o1 === null || typeof o1 !== "object") || (o2 === null || typeof o2 !== "object")) return false; //objectかどうかの判断だけだとnullも通ってしまい、次の行でエラーが発生する。
	if(Object.keys(o1).length !== Object.keys(o2).length) return false; //キーの数が同一か調べる。
	for (const key in o1){
        if(typeof o1[key] === "object"){
            if(!equals(o1[key],o2[key])) return false; //objectの中にまたobjectがあった場合は再帰関数でもう一度呼び出す。呼び出した結果がtrueじゃない限りはfalseとして処理。
        } else if(o1[key] !== o2[key]) return false; //objectの中にobjectがなくなったことを確認出来て初めてプロパティの中身を比較できる。
	}
	return true; //すべて問題ない場合はtrueとして処理。
}