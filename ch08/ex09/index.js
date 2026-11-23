export function withResource(resource, fn){ //第一引数にオブジェクト、第二引数にコールバック用の関数を渡せるようにする。
    try{
        fn(resource);
    }
    finally{ //例外が出ても必ずcloseさせる。
        if(typeof resource.close !== "function"){ //close()を持つオブジェクトが引数として渡されているかチェック。
            throw new TypeError("resource.close is not a function.");
        }
        resource.close();
    }
}