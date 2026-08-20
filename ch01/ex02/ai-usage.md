# AI 利用記録 (ch01/ex02)

## 2026-08-13: ブラウザエラーの意味を質問

- **利用 AI**: Claude Code (Claude Fable 5)
- **プロンプト**:
  > `'file:' URLs are treated as unique security origins.`
  > ブラウザ上でこういうエラーが出たんだけど、このエラーはどういうときに出るものですか？
- **AI の回答概要**:
  - HTML ファイルを `file://` プロトコルで直接開いたときに出る警告 (主に Firefox 系)。
  - `file://` で開いたページはファイルごとに独立したオリジン (unique origin) として扱われるため、ES Modules の読み込み (`<script type="module">` や `import`) や `fetch()` などクロスオリジン制限 (CORS) の対象になる操作が失敗する。
  - 解決策はローカル HTTP サーバー経由 (`http://localhost/...`) で開くこと (例: `npx serve .`、VS Code の Live Server 拡張)。
- **備考**: エラーの意味の解説のみで、解答コードの生成・修正は行っていない。