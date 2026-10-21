function checkProp(){
    const obj = {};
    Object.defineProperty(obj, "w" ,{
        value: 1,
        writable: true,
        enumerable: false,
        configurable: false
    });
    Object.defineProperty(obj, "e" ,{
        value: 10,
        writable: false,
        enumerable: true,
        configurable: false
    });
    Object.defineProperty(obj, "c" ,{
        value: 100,
        writable: false,
        enumerable: false,
        configurable: true
    });

    console.log("writableのみtrue");
    validEntity(obj,"w");
    console.log("enumerableのみtrue");
    validEntity(obj,"e");
    console.log("configurableのみtrue");
    validEntity(obj,"c");
}

function validEntity(obj, prop){
    try {
        obj[prop] = 20;
        console.log("代入成功:", obj[prop]);
    }
    catch(e) {
        console.log("代入失敗:", e.message);
    }
    try {
        delete obj[prop];
        console.log("削除成功:", obj[prop]);
    }
    catch(e) {
        console.log("削除失敗:", e.message);
    }
    console.log("hasOwnProperty",Object.prototype.hasOwnProperty.call(obj, prop));
    console.log("propertyIsEnumerable",Object.prototype.propertyIsEnumerable.call(obj, prop));
}

checkProp();