# 問題4.8
Undefinedはグローバルプロパティであるが、1999年12月に標準化されたECMAScript3ではUndefinedプロパティは書き込み可能であった。  
そのため、```var undefined = 100```などで上書きをしてしまった場合、```a === undefined```という式が成り立たなくなってしまう。  
一方```void 0```は与えられた式が何であろうとundefinedを返す。つまり、通常は内部でundefined以外の評価結果になるような処理をしつつ、でも結果はundefinedであって欲しいといったようなケースで使用される。  
そのため、確実にundefinedを返してほしい場合に```void 0```が使用されていた。  
2009年12月に発行されたECMAScript5ではUndefinedプロパティは読み込みのみになり、上書きができなくなったため、```void 0```はあまり使用されなくなった。  
ただし、シャドーイングをしてローカルスコープでundefinedに値を設定することはできるため、ESLintの```no-shadow```ルールで警告させるプロジェクトも多い。

## 参考文献
- [void(0)とundefinedの使い分け](https://qiita.com/vsanna/items/3daa7c4788d5480d964e)
- [JavaScript の undefined と void 0 と](https://qiita.com/cyakarin/items/57a6dc06cdb315e31b01)
- [【JavaScript】voidについて](https://qiita.com/irico/items/8adbfb446ce858da136c)