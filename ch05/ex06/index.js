export function orderCheck(n){
    try{
        console.log("tryを通過しました");
        if (n != 0){
            throw new Error("n is not zero");
        }
    }
    catch (e) {
        console.log("catchを通過しました");
    }
    finally{
        console.log("finallyを通過しました");
    }
}