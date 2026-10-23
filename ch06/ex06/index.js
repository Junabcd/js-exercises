export function getObjectProp(obj){
    const originPropArray = Object.getOwnPropertyNames(obj);
    const symbolPropArray = Object.getOwnPropertySymbols(obj);
    const propArray = [...originPropArray,...symbolPropArray];
    for(const key in obj){
        if(Object.hasOwn(obj, key) === false){
            propArray.push(key);
        }
    }
    return propArray;
}