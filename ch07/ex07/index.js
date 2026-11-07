export function merge(arr1,arr2,compare){
    const result = [];
    let i = 0;
    let j = 0;
    while((i < arr1.length) && (j < arr2.length)){
        if(compare(arr1[i], arr2[j]) > 0){
            result.push(arr2[j]);
            j++;
        }
        else{
            result.push(arr1[i]);
            i++;
        }
    }
    result.push(...arr1.slice(i), ...arr2.slice(j));
    return result;
}

export function mergeSort(arr, compare  = (a, b) => (a < b ? -1 : a > b ? +1 : 0)){
    if(!Array.isArray(arr)){
        throw new TypeError("arr must be an array");
    }
    if(arr.length < 2){
        return arr;
    }

    const half = Math.floor(arr.length / 2);
    
    const leftArr = mergeSort(arr.slice(0, half), compare);
    const rightArr = mergeSort(arr.slice(half), compare);
    
    return merge(leftArr, rightArr, compare);
}