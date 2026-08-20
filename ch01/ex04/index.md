# 問題 1.4
## index.html実行時の予想と結果
index.htmlを実行すると以下の内容が開発者ツール (Chrome の場合 F12) のコンソール上に表示されると予想。
```
answer：42
answer：0
```

実行結果は以下の通りになった。
```
answer：0
answer：0
```


## 開発者ツールを開くタイミングの違いによる結果の比較
開発者ツールを開いた状態のタブで HTML を開く場合、以下の結果になった。
```
answer：42
answer：0
```

HTML を開いた状態のタブで開発者ツールを開く場合、以下のようになった。
```
answer：0
answer：0
```

## どのようにコードを修正すべきか
answerの値をスナップショットとして保持しておく必要があるので、JSON.stringify(obj)などを用いてコンソールに表示するようにする。
以下のようにコードを変更した結果、開発者ツールの表示タイミングに関わらず、常に同じ結果を得られることを確認した。
```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(JSON.stringify(life));
      life.answer = 0;
      console.log(life);
    </script>
  </body>
</html>
```