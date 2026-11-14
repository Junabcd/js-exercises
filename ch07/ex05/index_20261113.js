export function pop(arr){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    const result = copyArr.slice(0,-1);
    return result;
}

export function push(arr, ...elems){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr, ...elems]; //コピー
    return copyArr;
}

export function shift(arr){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...arr]; //コピー
    const result = copyArr.slice(1);
    return result;
}

export function unshift(arr, ...elems){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    const copyArr = [...elems, ...arr]; //コピー
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