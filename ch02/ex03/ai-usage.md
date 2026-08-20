# AI 利用記録 (ch02/ex03)

## 利用した AI

Claude Code (モデル: Fable 5)

## 目的

- 問題 2.3-1: 「パン」を Unicode エスケープシーケンスで NFC / NFD それぞれの形式の文字列リテラルとして書くための調査 (U+309A と U+309C の違い、課題の趣旨の確認、実装のヒント)
- 問題 2.3-2: 濁音・半濁音を含むファイル名が Windows / macOS で NFC と NFD のどちらで保存されるかの調査

## セッション 1: Unicode エスケープシーケンスの調査 (問題 2.3-1)

### 実際に入力したプロンプト

1. 「Unicodeエスケープシーケンスで309Aと309Cで同じ「゜」に見えるが、位置が微妙に異なる。どう違うか教えて。」
2. 「パをNFDで表すことを考えた場合、「゜」は「ハ」と結合するので、309Aを用いるという理解であっていますか？」
3. 「Unicode エスケープシーケンスで記述した文字列リテラルを作成するコードを作成したいが、ヒントをください。」
4. 「READMEを見る感じだと変換コードを作成するかと思ったが違いますか？」
5. 「『"パン"を Unicode エスケープシーケンスで記述した文字列リテラルを NFC と NFD のそれぞれの形式で作ってください』とあり、『💻: chXX/exYY 以下にプログラムを作成しなさい』という指示がある場合は？」

### AI の回答の要約

- `U+309A` は結合文字 (COMBINING KATAKANA-HIRAGANA SEMI-VOICED SOUND MARK) で、直前の文字に重ねて描画される。単独表示だと基準となる文字がないため位置がずれて見える。`U+309C` は 1 文字分の幅を持つ独立した通常文字で、前の文字と合成されることはない。濁点にも同じペア (結合用 `U+3099` と独立 `U+309B`) がある。
- 「パ」(U+30D1) を NFD 分解すると「ハ」(U+30CF) + 結合用半濁点 `U+309A` になる。合成に使われるのは結合文字の方なので、`U+309A` を使うという理解で正しい。
- 課題は「任意の文字列を NFC/NFD に変換するプログラム」ではなく、`\uXXXX` 形式で自分で書き下した文字列リテラルを含む小さなプログラムを作るもの。`normalize()` は解答本体ではなく、書いたリテラルが正しいかの検証 (テスト側) に使うと役割分担がきれい。
- 検証に使える性質のヒント: NFC 版と NFD 版は見た目が同じでも `===` は false、`.length` は 2 と 3、`nfd.normalize("NFC") === nfc` は true になる、など。

## セッション 2: ファイル名の正規化の調査 (問題 2.3-2)

### 実際に入力したプロンプト

1. 「WindowsではNFCでもNFDでも正規化をしないという情報をネットで見つけたが、それは本当でしょうか？正しい情報を調べてください。」
2. 「NFCでの入力が基本的にされるからファイル保存するとNFCが多いってだけ？」
3. 「今のmacOSも正規化しないの？正しい情報を」
4. 「現行macOSの場合は正規化して照合とあるが、正規化したらNFCとNDFで変わるんじゃないの？どのように正規化して比較している？」
5. 「『ある文字列を NFD に正規化し、NFC 正規化を行っても、元の文字列に戻せる保証はありません。』と見つけたが、これとAPFSの正規化でのハッシュ比較は異なるの？」
6. 「Windows のキーボード入力や Microsoft 製アプリは通常 NFC 形式の文字を生成するとあるが、Apple製のキーボードで入力するとNFDになる可能性があるってこと？それと、Windows のキーボード入力は必ずNFC？」

### AI の回答の要約

- **Windows (NTFS) は正規化しない**。Microsoft 公式ドキュメントに「ファイルシステムはパスとファイル名を不透明な WCHAR の並びとして扱うため正規化は不要 (アプリ側で行うこと)」と明記されている。実際にこの PC の NTFS 上で NFC の「ガ.txt」(U+30AC) と NFD の「ガ.txt」(U+30AB U+3099) を作る実験を行い、2 つの別ファイルとして共存することを確認した。
- 「Windows は NFC」と言われるのは、Windows の IME・キーボード入力が NFC 形式の文字を生成するため、結果的にファイル名がほぼ NFC になるという入力経路の傾向の話で、ファイルシステムが強制しているわけではない。
- **旧 macOS (HFS+) は保存時に Unicode 3.2 ベースの NFD 変種へ強制変換**していた。これが「Mac は NFD」の正体。
- **現行 macOS (APFS, High Sierra 10.13 以降) は保存時の変換はしない (normalization-preserving) が、比較時には正規化する (normalization-insensitive)**。ファイル名はそのまま保存しつつ、照合には「(大文字小文字を区別しないボリュームなら小文字化 →) NFD 正規化 → UTF-32 化 → CRC-32C ハッシュ」を使う。NFC と NFD の名前は同じ NFD 形に揃うため同じハッシュになり、同一ファイルとして扱われて共存できない (Apple File System Reference で仕様確認)。
- 正規化は多対一の変換なので NFD→NFC で元のバイト列に戻せる保証はない (例: U+212B Å は NFD→NFC で U+00C5 になる) が、APFS は正規化結果をハッシュ計算のための一時データにしか使わず「戻す」工程が存在しないため矛盾しない。比較に必要なのは可逆性ではなく「正準等価な文字列は必ず同一の NFD 形になる」という決定性。
- 正規化形式を決めるのは物理キーボードではなく OS の入力処理系 (IME・キーボードレイアウト)。Apple 製キーボードを Windows につないでも Windows の入力系が変換するので基本 NFC。macOS のキー入力も基本 NFC で、NFD の元凶はキーボードではなく HFS+ だった。Windows のキー入力も「必ず NFC」の保証はなく (公式も "generally" 表記)、結合文字の直接入力や貼り付けで NFC でない列が入り得る。また合成済みコードポイントが存在しない文字は NFC でも結合文字を含む。

### 参照した主な情報源

- [誤解の多い「NFD問題とUTF-8-MAC問題」を解説する - macOSの濁点を含むファイル名の扱い](https://qiita.com/ko1nksm/items/3a66197efd1c096a801f)
- [Naming Files, Paths, and Namespaces — Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/fileio/naming-a-file)
- [Using Unicode Normalization to Represent Strings — Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/intl/using-unicode-normalization-to-represent-strings)
- [Apple File System Reference (PDF) — Apple Developer](https://developer.apple.com/support/downloads/Apple-File-System-Reference.pdf)
- [APFS Guide FAQ — Apple Developer](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/APFS_Guide/FAQ/FAQ.html)
- [Apple File System (APFS) documentation — libyal/libfsapfs](https://github.com/libyal/libfsapfs/blob/main/documentation/Apple%20File%20System%20(APFS).asciidoc)

## どのように解答に反映したか

- 問題 2.3-1: AI の回答で U+309A (結合文字) と U+309C (独立文字) の違いを理解した上で、エスケープシーケンスのリテラル (index.js) と解説 (index.md) を自分でまとめた。
- 問題 2.3-2: AI の調査結果 (公式ドキュメントの記述と NTFS 上での実証実験) をもとに内容を理解し、自分の言葉で index.md に調査結果をまとめた。