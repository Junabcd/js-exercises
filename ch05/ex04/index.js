export function fibWhile(){
    let fibArray = [1,1];
    let n = fibArray.length
    while(n < 10){
        fibArray.push(fibArray[n-2] + fibArray[n-1]);
        n++;
    }
    return fibArray;
}

export function fibDoWhile(){
    let fibArray = [1,1];
    let n = fibArray.length
    do{
        fibArray.push(fibArray[n-2] + fibArray[n-1]);
        n++;
    } while(n < 10);
    return fibArray;
}

export function fibFor(){
    let fibArray = [1,1];
    for(let n = fibArray.length; n<10; n++){
        fibArray.push(fibArray[n-2] + fibArray[n-1]);
    }
    return fibArray;
}