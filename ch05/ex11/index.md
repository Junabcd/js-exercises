# 問題5.11
## Nodeでの実行方法
コードの中で任意の箇所にdebuggerを記述する。  
できたコードに対して、inspectコマンドを実行する。  
→index.jsだったら、```node inspect index.js```とターミナルに入力して実行。  
実行を行うと、ソースコードの1行目にフォーカス（>）が当たり、```debug>```が出力された状態でストップする（デバッグ状態）。  
cキーを入力してEnterを押すと、debuggerを記述した箇所でストップする。  
さらにcキーを入力してEnterを押すと、次のdebuggerを記述した箇所でストップする。  
このようにしてNodeでdebugger文を記述してデバッグすることができる。  

## 実際にデバッグした
index.jsに以下のようなプログラムを記述してNodeでデバッグ実行した。  
```JavaScript
let s = "aaa";
console.log(s);
debugger;
s = "bbb";
console.log(s);
debugger;
s = "ccc";
console.log(s);
debugger;
```
デバッグ実行したときのターミナルの出力は以下のようになった。  
```
< Debugger listening on ws://127.0.0.1:9229/46c7a870-0ff3-4508-a0d7-88d2aff9bb82
< For help, see: https://nodejs.org/learn/getting-started/debugging
< 
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
< 
Break on start in index.js:1
> 1 let s = "aaa";
  2 console.log(s);
  3 debugger;
debug> c
< aaa
< 
break in index.js:3
  1 let s = "aaa";
  2 console.log(s);
> 3 debugger;
  4 s = "bbb";
  5 console.log(s);
debug> c
< bbb
< 
break in index.js:6
  4 s = "bbb";
  5 console.log(s);
> 6 debugger;
  7 s = "ccc";
  8 console.log(s);
debug> c
break in index.js:9
  7 s = "ccc";
  8 console.log(s);
> 9 debugger;
< ccc
< 
debug> c
< Waiting for the debugger to disconnect...
< 
debug>
```
実行直後は1行目の```let s = "aaa";```にフォーカスが当たった状態でスタートした。  
cキーを入力して、Enterを実行すると2行目の```console.log(s);```の結果```aaa```が出力され、3行目の```debugger;```にフォーカスが当たった。  
再度cキーを入力して、Enterを実行すると5行目の```console.log(s);```の結果```bbb```が出力され、6行目の```debugger;```にフォーカスが当たった。  
さらにcキーを入力して、Enterを実行すると9行目の```debugger;```にフォーカスが当たり、8行目の```console.log(s);```の結果```ccc```が出力された。  
最後にcキーを入力して、Enterを実行すると```Waiting for the debugger to disconnect...```が出力された（index.jsの最後のdebuggerにたどり着いた状態でcキーを入力）。  

## 参考文献
- [初心者向けにNode.jsのデバッグ(debug)手法を徹底解説](https://www.sejuku.net/blog/87186)