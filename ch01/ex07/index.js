export class Point { // クラス名は大文字から記述するのが慣習。
    constructor(x, y) { // 新しいインスタンスを初期化するコンストラクタ関数。
        this.x = x; // this キーワードで、初期化中のオブジェクトを参照できる。
        this.y = y; // 関数の引数をオブジェクトのプロパティとして保存する。
    } // return 文は必要ない。
    add(p) {
        return new Point(this.x + p.x, this.y + p.y);
    }
}