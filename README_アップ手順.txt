━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GitHub Pages 公開手順（このフォルダの中身をアップ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
このフォルダは 2026-07-04 時点の最新アプリ一式です。
（マイルストーン／放送用語ミニ入門／ハンズオン14本／クイズ273問 反映済み）
原寸画像 gallery_full は含めていません。アプリ側で「高画質でDL」
ボタンは自動的に非表示になります（機能欠けにはなりません）。

■ アップするもの（このフォルダの"中身"を全部）
  index.html / info.html / app/ / assets/ /
  XPression_Handson_Materials/ / .nojekyll
  ※README_アップ手順.txt（このファイル）は上げなくてOK

■ 手順（ブラウザだけの場合）
  1. github.com → ＋ → New repository → 名前(例 xpression-suite) → Public → Create
  2. Add file → Upload files → このフォルダの中身をドラッグ＆ドロップ → Commit
     ※画像が約1000枚あるため時間がかかります。失敗する場合はGitHub Desktop推奨
  3. Settings → Pages → Source: Deploy from a branch / Branch: main /(root) → Save
  4. 1〜2分後 https://ユーザー名.github.io/リポジトリ名/ で公開

■ 更新のとき
  アプリを更新したら、同じ場所に新しいファイルを上書きアップロード
  （study.html や steps/ だけ差し替えでもOK。画像の再アップは不要）
