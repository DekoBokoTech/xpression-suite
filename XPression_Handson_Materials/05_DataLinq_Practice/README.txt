05 DataLinq実践（CSV・Excel）/ DataLinq practice
================================================
外部の表から名前・スコア・チーム情報を流し込むハンズオンです。
サンプルは日本語・英語の両方を収録（列を分けています）。
Sample data is bilingual (separate JA/EN columns).

同梱データ / Files（日英併記）：
  names_and_titles.csv … Name / NameEN / Title / TitleEN（肩書きが空の行も含む）
  teams.csv            … TeamName / TeamNameJP / TeamNameEN / Abbr / ColorHex / LogoFile
  scores.csv           … Side / SideJP / SideEN / TeamName(JP/EN) / Abbr / Score / ColorHex
  samples_by_format/   … CSV・JSON・XML・RSS の形式別サンプル（同じく日英）

使い方 / How to use：
  ・表示したい言語の列（例 NameEN / TitleEN）を、Text ObjectのColumnに割り当てる。
    Assign the column of the language you want (e.g. NameEN / TitleEN) to the Text Object's Column.
  ・日本語表示なら Name / Title、英語表示なら NameEN / TitleEN を指定。
  ・まずCSVを読み込んで1件表示→行を切り替えて差し替わるか確認。
ポイント：列名（1行目）がキーになります。半角英数字・UTF-8がトラブりにくいです。
