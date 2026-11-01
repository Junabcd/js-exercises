export function restrict(target, template){
    for(const key of Object.keys(target)){ //targetの独自プロパティを抽出。
        if(!Object.hasOwn(template,key)){ //独自プロパティだけを考慮するので、hasOwn()を使用する。templateに存在しなければ削除。
            delete target[key];
        }
    }
    return target;
}

export function substract(target, ...sources){
    for(const source of sources){ //複数ある場合もあるので、1つずつ検証する。
        for(const key of Object.keys(source)){ //sourceの独自プロパティを抽出。
            if(Object.hasOwn(target,key)){ //targetにも同じ独自プロパティがある場合は削除。
                delete target[key];
            }
        }
    }
    return target;
}