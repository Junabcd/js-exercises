export function f(fn) { //関数部分の実装をfnで受け取る
    if(typeof fn !== "string"){ //fnは文字列である必要がある
        throw new TypeError("fn must be a string.");
    }
    if(!fn.trim().startsWith("{")){ //{}で囲まれている場合はreturnをつけないようにする。先頭が空白であっても問題ないようにtrim()を使用する。アロー関数の文法と同じ考え方。
        fn = "return " + fn.trim(); //returnの後に空白を入れないと、return 実行部分という風にならない。fn.trim()にするのは先頭に改行が入っても実行できるようにするため。
    }
    return new Function("$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10", fn); //実行関数に対して$1~$10まで引数に取れるように設定。
}