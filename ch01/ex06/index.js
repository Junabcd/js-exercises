export function fib(n){
    let fibArray = [1,1];
    if(n > 2){
        for(let i = 0; i < n-2; i++){
            fibArray.push(fibArray[i] + fibArray[i+1])
        }
    }
    return fibArray[n-1];
};