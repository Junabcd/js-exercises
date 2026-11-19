export function sequenceToObject(...values){
    if(values.length % 2 !== 0){
        throw new RangeError("The number of values must be even.");
    }
    const obj = {};
    for(let i = 1; i <= values.length; i++){
        let value = values[i-1];
        if(i % 2 !== 0){
            if(typeof value !== "string"){
                throw new TypeError("Key must be a string.");
            }
            obj[value] = values[i];
        }
    }
    return obj;
}
console.log(sequenceToObject("a", 1, "b", 2));