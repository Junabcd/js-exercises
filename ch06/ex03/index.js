export function isPrototypeChain(parent, child){
    if(parent === null || parent === undefined){
        throw new TypeError("null or undefined");
    }
    return parent.isPrototypeOf(child);
}

function prototypeChainCheck(){
    console.log("------------Object------------");
    console.log("Object.prototypeはArray.prototypeの祖先か:",isPrototypeChain(Object.prototype,Array.prototype));
    console.log("Object.prototypeはDate.prototypeの祖先か:",isPrototypeChain(Object.prototype,Date.prototype));
    console.log("Object.prototypeはMap.prototypeの祖先か:",isPrototypeChain(Object.prototype,Map.prototype));

    console.log("------------Array------------");
    console.log("Array.prototypeはObject.prototypeの祖先か:",isPrototypeChain(Array.prototype,Object.prototype));
    console.log("Array.prototypeはDate.prototypeの祖先か:",isPrototypeChain(Array.prototype,Date.prototype));
    console.log("Array.prototypeはMap.prototypeの祖先か:",isPrototypeChain(Array.prototype,Map.prototype));

    console.log("------------Date------------");
    console.log("Date.prototypeはObject.prototypeの祖先か:",isPrototypeChain(Date.prototype,Object.prototype));
    console.log("Date.prototypeはArray.prototypeの祖先か:",isPrototypeChain(Date.prototype,Array.prototype));
    console.log("Date.prototypeはMap.prototypeの祖先か:",isPrototypeChain(Date.prototype,Map.prototype));

    console.log("------------Map------------");
    console.log("Map.prototypeはObject.prototypeの祖先か:",isPrototypeChain(Map.prototype,Object.prototype));
    console.log("Map.prototypeはArray.prototypeの祖先か:",isPrototypeChain(Map.prototype,Array.prototype));
    console.log("Map.prototypeはDate.prototypeの祖先か:",isPrototypeChain(Map.prototype,Date.prototype));
}

prototypeChainCheck();