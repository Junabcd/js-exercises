export function filterEven(obj){
    let evenObj = {};
    for(const prop in obj){
        if(obj[prop] % 2 === 0){
            evenObj[prop] = obj[prop];
        }
    }
    console.log(obj);
    return evenObj;
}