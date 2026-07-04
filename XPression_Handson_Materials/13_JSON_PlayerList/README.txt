13_JSON_PlayerList ハンズオン用サンプルデータ
=============================================
ハンズオン「JSONで選手リストを回す」で使うJSON一式です。
すべてUTF-8（BOMなし）。

players.json              … メインのサンプル（手順1〜6で使用）
                             team > players[] > name / name_en / number / position
                             ※6人目は超長い名前（幅テスト用）
players_short.json        … 選手を減らした版（手順7：データが減ったとき）
players_missing_name.json … 2人目に name が無い版（手順7：項目欠落）
players_empty.json        … players が空配列の版（手順7：空データ）

使い方のポイント
・Table Presets の Path には players 配列の階層を指定
  （プリセット名の例：Players）
・手順7では players.json の内容を上記3ファイルの中身で置き換えて
 （または読込先を切り替えて）表示の壊れ方を確認します
・name_en や position を使うと「日本語＋ローマ字」の2段表示の
  練習もできます（Vol4のローワーサードと組み合わせ可）
