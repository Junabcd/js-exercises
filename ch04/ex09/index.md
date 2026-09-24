# 問題4.9
## 予想
```undefined```：undefined  
```null```：object  
```オブジェクト```：object  
```NaN```：object  
```数値```：number  
```関数```：function  

## 結果
```undefined```：undefined  
```null```：object  
```オブジェクト```：object  
```NaN```：number  
```数値```：number  
```関数```：function  

## 実行してみて
予想が外れたのは```NaN```だった。数字ではないと思っていたので、```number```ではないと思っていた。  
```function```の結果を確認する際に、index.jsで1を返す関数を定義したが、```console.log(typeof x());```と書いてしまい、戻り値の```typeof```の結果を出力して```number```と表示されてしまった。  
```console.log(typeof x);```と直して、関数自体の```typeof```の結果を出力して```function```と表示されることを確認した。