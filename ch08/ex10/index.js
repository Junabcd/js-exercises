export function addMyCall(f){ //addMyCallに関数を引数として渡す。
    f.myCall = function(thisArg, ...args){ //myCallをメソッドとしてプロパティ追加。関数名は省略 => 無名でもmyCallに渡して呼ぶので問題なし。
        const bound = f.bind(thisArg, ...args); //第一引数はthisを、それ以降は関数fに渡す引数として第二引数以降に渡す。
        return bound(); //bindは新しい関数を返すので、関数を実行するためにbound()を呼んでreturnする。
    }
}