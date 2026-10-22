function checkObject(){
    const proto = {1: 10, "str": "JavaScript"};
    Object.defineProperty(proto, "e", { value: 100 ,enumerable: true});
    const obj = Object.create(proto);
    obj[1] = 999; //プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
    obj[10] = 9999; //プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
    obj.str = "vitest";
    obj.strProp = "other";
    Object.defineProperty(obj, "e", { value: 1000 ,enumerable: false});
    proto.onlyProto = "proto only"; //プロトタイプにしかないプロパティはどうなるのか
    Object.defineProperty(proto, "e2", { value: 2222 ,enumerable: true}); //プロトタイプにしかないプロパティはどうなるのか
    for (const key in obj) {
        console.log(key, obj[key],obj.hasOwnProperty(key));
    }
}

checkObject();

/*
checkObject()の結果は以下のようになった。

キー      値          hasOwnProperty
1         999         true
10        9999        true
str       vitest      true
strProp   other       true
onlyProto proto only  false
e2        2222        false

継承元のプロパティも列挙するが独自プロパティとして持ってはいないので、hasOwnPropertyがfalseになる。
*/