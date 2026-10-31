export function assign(target, ...sources){
    if(target === null || target === undefined){ // target側がnullかundefinedならエラーになる。
        throw new TypeError("Cannot convert undefined or null to object");
    }
    target = Object(target); //targetがプリミティブでも対応できるように。Objectを渡すとそのまま返すので、この1行で両方カバーできる。
    for(const source of sources){
        if(source === null || source === undefined){ //sources側はエラーではなくスキップ。
            continue;
        }
        for(const key of Object.keys(source)){ //列挙可能な独自のプロパティを持つ場合のループ。
            target[key] = source[key];
        }

        for(const sym of Object.getOwnPropertySymbols(source)){ //Symbolの場合のループ。
            if(Object.prototype.propertyIsEnumerable.call(source, sym)){ //Object.create(null)で落ちないように
                target[sym] = source[sym];
            }
        }
    } //ネストやゲッター/セッターは、普通に読み書きすれば特別なコードなしで通る。
    return target;
}