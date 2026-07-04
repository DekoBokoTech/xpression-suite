samples_by_format （スポーツ想定・日英併記 / bilingual）
========================================================

DataLinqの「汎用ソース（自分でデータを用意する種類）」で使える、
スポーツ想定のサンプルです。日本語・英語の両方を収録。すべて架空です。

ファイルと対応ソース / Files & sources：
  player_stats.csv   … Text / ASCII / ADODB(Excel)想定（Name＝日本語, NameEN＝英語, Team/TeamJP）
  standings.csv      … 同上（Team / TeamJP / TeamEN）
  game_score.json    … JSONソース想定（home.name / home.nameJp / home.nameEn …）
  game_score.xml     … XMLソース想定（属性 name / nameJp / nameEn …）
  notices.rss.xml    … RSS / HTTPソース想定（日本語項目＋英語項目を収録）

ヒント / Hints：
  ・表示言語に合わせて列/フィールドを選ぶ（例：英語なら NameEN, nameEn）。
  ・CSVは半角英数字の列名・UTF-8がトラブりにくい。
  ・JSON/XMLは「取りたい値のキー階層／要素・属性」を指定して読む。
  ・Excelで使う場合は、player_stats.csv と同じ列構成でXLSXを作ればADODBで読めます。
