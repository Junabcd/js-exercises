export function pop(arr){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    copyArr.pop();
    return copyArr;
}

export function push(arr, ...elems){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    copyArr.push(...elems); //引数が複数ある可能性があるので。
    return copyArr;
}

export function shift(arr){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    copyArr.shift();
    return copyArr;
}

export function unshift(arr, ...elems){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    copyArr.unshift(...elems); //引数が複数ある可能性があるので。
    return copyArr;
}

export function sort(arr,fn){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    copyArr.sort(fn); //関数を渡す。
    return copyArr;
}