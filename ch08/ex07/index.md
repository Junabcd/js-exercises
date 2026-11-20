# 問題8.7
## 即時実行関数式を使っているjsファイル
https://www.ricoh.co.jp を開き、ロードされているjsファイル中で名前空間としての関数の即時実行関数式を使っているjsファイルを以下に記載する。  
Chromeでページを開き、検証モードの```source```タブで調査した。
```
https://www.ricoh.co.jp/-/Media/Ricoh/Sites/co_jp/js/save-referrer-to-cookie.js
https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_v2/js/globalnavi.js
https://www.ricoh.co.jp/-/Media/ScAssets/System/JS/common.js
```

それぞれどのような形で即時実行関数式が記載されていたかを以下に示す。
```
https://www.ricoh.co.jp/-/Media/Ricoh/Sites/co_jp/js/save-referrer-to-cookie.js
↓
(function() {
...処理内容
})();
```

```
https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_v2/js/globalnavi.js
↓
;(function($) {
...処理内容
})(jQuery);
```

```
https://www.ricoh.co.jp/-/Media/ScAssets/System/JS/common.js
↓
;(function($) {
...処理内容
})(jQuery);
```

3つのjsファイルを見た際に、以下のような特徴があった。
- 3つの即時実行関数式ともファイル全体の処理をつつんで書かれていた。

AIで調査したところ、ファイル全体をつつむ理由として以下の理由があった。
- ブラウザでは、```script```で読み込んだファイルのトップレベルで宣言した変数や関数は、すべてグローバル (= ページ内で共有される場所) に置かれる。```ricoh.co.jp```のようにjsファイルをたくさん読み込むサイトでは、別々のファイルが同じ名前の変数を使うと、上書きし合って壊れる危険がある。そこでファイル全体を関数で包み、中で宣言したものをその関数のスコープに閉じ込め、外に漏れなくしている。名前の衝突を防ぐために、関数を名前空間 (名前の入れ物) として使っている。

他にも以下の特徴があった。
- ```(function($) {```の前に```;```があった。これは```;```直前に読み込まれた別のコードが```;```なしで終わっていても、つなげて解釈されて壊れないようにするための防御的な書き方。（AI調査）
- ```(function ($) { ... })(jQuery)```ではグローバルの```jQuery```を引数として渡し、中では ```$```という名前で使っている。他のライブラリも```$```を使っていたとしても、この関数の中では```$```が必ず```jQuery```を指すようにする工夫。（AI調査）

以下の内容を検証モードで実行し、即時実行関数式の中で定義している変数がグローバルに漏れていないことを確認した。
1. 即時実行関数式の中で定義している変数を選択する。今回は```naviOpenClassName```、```COOKIE_DOMAIN```、```$window```の3つを選択した。どれも即時実行関数式の直下で宣言された変数である。

2. 検証モードの```console```で3つの変数を入力し、どのような応答が返ってくるかを確認した。コンソールの実行コンテキストが```top```になっていることを確認し、実行した。

3. 3つの変数に対して実行した結果は以下のようになった。どの変数も```not defined```となり、グローバルになっていないことが確認できた。
```
naviOpenClassName
Uncaught ReferenceError: naviOpenClassName is not defined

COOKIE_DOMAIN
Uncaught ReferenceError: COOKIE_DOMAIN is not defined

$window
Uncaught ReferenceError: $window is not defined
```