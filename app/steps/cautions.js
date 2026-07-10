/* =====================================================================
   XPression 学習ノート — 制作・運用の「注意点」データ
   記事の「チェックリスト／よくある失敗／制作メモ／注意」から自動抽出した下地です。
   ここを編集して、重要な項目だけに絞る／並べ替える／文言を整えると、
   アプリの「注意点」タブがそのまま良くなります。

   1項目＝下の配列の1オブジェクト:
     when   … '制作' か '運用'（表示グループ）
     cat    … 'チェックリスト' | '失敗例' | '注意' | '制作メモ'（バッジ）
     title  … 見出し（元の節タイトル）
     vol    … 巻番号(1〜6) / srcChap … 章(例 '第4章')
     ci, si … 本文へのリンク用（章の通し番号・節番号。動かさないでください）
     items  … 箇条書き（この配列を削る/並べ替える/直すのが編集の中心）
   不要な項目は items から削除、不要な節はオブジェクトごと削除でOK。
   ===================================================================== */
window.CAUTIONS=[
 {
  "when": "制作",
  "cat": "注意",
  "title": "【Material Editor】注意書き",
  "title_en": "[Material Editor] Notes",
  "vol": 2,
  "srcChap": "第1章",
  "ci": 1,
  "si": 15,
  "items": [
   "具体的な項目名、表示内容、挙動、使用できる機能は、使用しているXPressionのバージョンや環境によって異なる場合があります。",
   "正確な仕様や最新情報については、公式ドキュメントや実際の使用環境で確認してください。"
  ]
 },
 {
  "when": "制作",
  "cat": "失敗例",
  "title": "【Material Texture】失敗例2：スポンサー画像の背景が白く残る",
  "title_en": "[Material Texture] Failure 2: A sponsor image keeps a white background",
  "vol": 2,
  "srcChap": "第2章",
  "ci": 2,
  "si": 79,
  "items": [
   "原因は、Alpha付き素材の確認不足です。",
   "対策は、RGBだけでなくAlphaを確認することです。",
   "透明背景のつもりでも、実際には白背景付きPNGになっていることがあります。"
  ]
 },
 {
  "when": "制作",
  "cat": "失敗例",
  "title": "【Material Texture】失敗例3：背景Textureが文字を邪魔する",
  "title_en": "[Material Texture] Failure 3: The background Texture interferes with text",
  "vol": 2,
  "srcChap": "第2章",
  "ci": 2,
  "si": 80,
  "items": [
   "原因は、見た目の質感を優先しすぎて、情報エリアの視認性を確認していないことです。",
   "対策は、文字の背後だけTextureを弱める、情報エリアに半透明パネルを置く、または背景と情報表示を別Materialで管理することです。"
  ]
 },
 {
  "when": "制作",
  "cat": "失敗例",
  "title": "【Material Texture】失敗例5：Materialの設定が複雑すぎて誰も直せない",
  "title_en": "[Material Texture] Failure 5: The Material is too complex for anyone to fix",
  "vol": 2,
  "srcChap": "第2章",
  "ci": 2,
  "si": 82,
  "items": [
   "原因は、BlendやModifierを多用しすぎて、見た目の理由が追えなくなっていることです。",
   "対策は、Material名に用途を入れることです。",
   "また、複雑な設定を使う場合は、なぜその設定にしたのかを制作メモに残すべきです。"
  ]
 },
 {
  "when": "制作",
  "cat": "失敗例",
  "title": "【Stagger Animation】Track Controlsは作業中の事故を減らすために使う",
  "title_en": "[Stagger Animation] Use Track Controls to reduce accidents while working",
  "vol": 3,
  "srcChap": "第2章",
  "ci": 2,
  "si": 9,
  "items": [
   "Tracksの各トラックには、アニメーションの有効・無効やロックに関するコントロールがあります。",
   "これは単なる便利機能ではなく、作業中の確認や事故防止に役立ちます。",
   "複数のトラックを組み合わせていると、どの動きがどの印象を作っているのか分かりにくくなることがあります。たとえば、Position、Scale、Alphaを同時に入れていると、動きが良く見えても「どのトラックが効いているのか」が見えにくくなります。",
   "そういうときは、一部のトラックを一時的に無効にして、動きの違いを確認すると分かりやすいです。また、完成したトラックを誤って動かしたくない場合は、ロックを使う考え方もあります。",
   "現場向けのデータでは、あとから別の人が触る可能性があります。誤ってキーフレームやClipを変更してしまうと、見え方が変わってしまいます。",
   "ロックや表示切り替えは、単なる編集補助ではなく、作業中の事故を減らすための機能として見るとよいと思います。"
  ]
 },
 {
  "when": "制作",
  "cat": "失敗例",
  "title": "【Function Blocks】よくある失敗例",
  "title_en": "[Function Blocks] Common mistakes",
  "vol": 4,
  "srcChap": "第1章",
  "ci": 1,
  "si": 24,
  "items": [
   "DataLinqで値が取れているから大丈夫、と思ってしまうことがあります。",
   "でも、実際には空欄、スペース、表記ゆれ、RowやColumnのズレ、更新タイミングの違いが起きる可能性があります。",
   "DataLinqは入口です。",
   "その値をどう安全に表示するかまで考えて、初めてテンプレートとして使いやすくなります。",
   "String Lengthは便利です。",
   "ただし、文字数と表示幅は一致しません。",
   "日本語と英語、全角と半角、大文字と小文字では、同じ文字数でも見た目の幅が変わります。",
   "String Lengthは判断材料として使い、最終的には実データで表示確認する必要があります。",
   "スコア比較では、リードしている場合だけでなく、同点の場合も考える必要があります。",
   "ホームが大きい。 アウェイが大きい。 同点。",
   "この3つを考えておかないと、同点になったときに表示が不自然になることがあります。",
   "条件分岐では、成立する場合だけでなく、成立しない場合や例外も設計に入れることが大切です。",
   "Visual Logicは、つなげばかなり多くのことができます。",
   "ただし、作れることと、現場で使いやすいことは別です。",
   "あまりに複雑なVisual Logicは、あとから修正する人が読めません。",
   "できるだけシンプルにする。 意味のある単位で整理する。 固定値や条件の意味が分かるようにする。",
   "このあたりを意識した方が、現場では使いやすくなります。",
   "Waveformなどを使うと、簡単に動きのある表現が作れます。",
   "でも、動いているから良いとは限りません。",
   "特に放送グラフィックスでは、情報を読ませることが優先です。",
   "スコア、時計、選手名、スタッツに強すぎる動きを入れると、視認性が下がります。",
   "アリーナ演出では迫力が必要な場面もありますが、それでも情報として読ませるものと、演出として動かすものは分けて考えたいです。",
   "時刻表示は、少しのズレでも問題になりやすい部分です。",
   "Epoch Timeの単位が秒なのかミリ秒なのか。 UTCなのかローカルタイムなのか。 Clockの基準が何なのか。",
   "この確認をしないまま作ると、テストでは合っていたのに本番環境でずれることがあります。",
   "時刻系の表示は、必ず本番に近い環境と実データで確認した方が安全です。"
  ]
 },
 {
  "when": "運用",
  "cat": "注意",
  "title": "【ショートカットキー一覧】Keyboard Mappingを触るときに気をつけたいこと",
  "title_en": "[Shortcut Key Reference] What to watch when editing Keyboard Mapping",
  "vol": 1,
  "srcChap": "第2章",
  "ci": 2,
  "si": 8,
  "items": [
   "Keyboard Mappingは便利ですが、扱い方によっては混乱の原因にもなります。",
   "既存のショートカットと重複しないか",
   "本番中に誤操作しやすいキーではないか",
   "他の担当者が使っても分かる設定になっているか",
   "Project Shortcut、Global Shortcut、Local Shortcutの使い分けが適切か",
   "別のマシンや別の環境でも同じように使えるか",
   "設定した内容をチーム内で共有できているか",
   "個人作業であれば、自分が使いやすい設定で問題ないこともあります。",
   "ただし、チームで使う環境や本番運用に関わる環境では、個人の使いやすさだけで決めない方が安全です。",
   "標準の状態を確認する。必要なものだけ追加する。チームで使う場合はルールをそろえる。設定した内容を共有する。",
   "この順番で考えると、ショートカット設定は扱いやすくなります。",
   "ショートカットは、作業を速くするためのものですが、同時に現場で混乱しないためのルールでもあります。"
  ]
 },
 {
  "when": "運用",
  "cat": "失敗例",
  "title": "【Material Texture】失敗例1：ロゴを差し替えたらサイズが合わない",
  "title_en": "[Material Texture] Failure 1: Swapping the logo breaks its size",
  "vol": 2,
  "srcChap": "第2章",
  "ci": 2,
  "si": 78,
  "items": [
   "原因は、最初のロゴだけに合わせてTextureやオブジェクトを作っていることです。",
   "対策は、ロゴ枠の最大サイズを決め、横長ロゴ、縦長ロゴ、正方形ロゴでテストすることです。"
  ]
 },
 {
  "when": "運用",
  "cat": "失敗例",
  "title": "【Material Texture】失敗例4：DataLinqで画像を読みに行ったら本番で表示が遅い",
  "title_en": "[Material Texture] Failure 4: Loading images via DataLinq is slow on air",
  "vol": 2,
  "srcChap": "第2章",
  "ci": 2,
  "si": 81,
  "items": [
   "原因は、ネットワークやURL参照の安定性を前提にしすぎていることです。",
   "対策は、本番素材をローカルまたは安定した場所に置く、事前に読み込み確認をする、代替画像を用意することです。",
   "特にhttpやhttpsのURLを参照する場合、ネットワーク環境によってリアルタイム性能が保証されない可能性がある点は注意が必要です。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "Event Markerを使う前に確認したいこと",
  "title_en": "What to check before using Event Marker",
  "vol": 3,
  "srcChap": "第1章",
  "ci": 1,
  "si": 19,
  "items": [
   "□ Event Markerをタイムライン上のマーカーと誤解していないか",
   "□ Event MarkerをScene内のObjectとして考えられているか",
   "□ Event Marker自身がいつレンダー対象になるのか",
   "□ Event Marker自身がいつレンダー対象から外れるのか",
   "□ On ShowとOn Hideの役割は分かれているか",
   "□ どこでINが終わるのか",
   "□ どこで表示完了になるのか",
   "□ どこからOUTへ進むのか",
   "□ どこで速度を変えるのか",
   "□ どこでDelayを入れるのか",
   "□ 自動再開するのか、手動操作を待つのか",
   "□ 他Objectの通過検知と誤解していないか",
   "□ オペレーターが見ても意味が分かる名前になっているか",
   "□ データ差し替えがある場合、表示タイミングは安全か",
   "□ OUTのタイミングは視聴者や現場進行を邪魔しないか",
   "□ Delayや速度変更の意図をあとから説明できるか",
   "このチェックをするだけでも、Event Markerの使い方はかなり整理されます。",
   "Event Markerは「置くもの」ではなく、意味を設計するものとして考えることが大切です。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "【Stagger Animation】本番前に確認したいチェックポイント",
  "title_en": "[Stagger Animation] Checkpoints before the show",
  "vol": 3,
  "srcChap": "第2章",
  "ci": 2,
  "si": 20,
  "items": [
   "Stagger Animationを現場で使う前には、最低限次の点を確認しておくと安心です。",
   "□ Text Objectに割り当てるのか、Group Objectに割り当てるのかが明確か",
   "□ 作成したStagger AnimationをScene Directorの対象オブジェクトのTimelineへ配置しているか",
   "□ Scene Director上で開始タイミングが意図通りか",
   "□ Track、Clip、Keyframeの関係を理解した上で設定しているか",
   "□ Insert Clipが必要なTrackにClipが入っているか",
   "□ Framesの数値だけで判断せず、実際の再生速度で確認しているか",
   "□ 短い文字列だけでなく、長い文字列でも破綻しないか",
   "□ 文字がすべて表示されるまでの時間が長すぎないか",
   "□ Characterでずらす必要が本当にあるか",
   "□ WordやLineで見せた方が読みやすくないか",
   "□ Character、Word、Line、Paragraphを重ねすぎていないか",
   "□ AlphaとPositionだけで成立する場面に、ScaleやRotationを足しすぎていないか",
   "□ Clip Lengthを変更したあと、キーフレーム位置と見え方を確認したか",
   "□ Recalculate Keyframe Positionsを使った場合、動きの印象が変わっていないか",
   "□ ScaleやRotationを使う場合、Pivotが意図した基準になっているか",
   "□ コピー＆ペーストで流用した場合、流用先の文字列でも再生確認したか",
   "□ Scene Director上で、他のアニメーションとタイミングがぶつかっていないか",
   "□ Animation ControllerのPlayで実際の見え方を確認したか",
   "□ オペレーターが見て分かりやすい名前や構成になっているか",
   "このチェックは、単なる確認作業ではありません。",
   "Stagger Animationを「作った人だけが分かる演出」にしないための確認です。",
   "現場では、自分以外の人が触ることもあります。急な修正が入ることもあります。本番中に、予定とは違うタイミングで出すこともあります。",
   "そのときに壊れにくいか。迷わず扱えるか。情報としてちゃんと読めるか。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "【Function Blocks】実務チェックリスト",
  "title_en": "[Function Blocks] Practical checklist",
  "vol": 4,
  "srcChap": "第1章",
  "ci": 1,
  "si": 23,
  "items": [
   "値はどこから来るのか。 手入力なのか、CSVなのか、DataLinqなのか、外部データソースなのか。",
   "その値は数値なのか、文字列なのか。 見た目が数字でも、数値として扱えるのか。",
   "空欄の場合はどうするのか。 0と空欄を同じ扱いにしていないか。",
   "文字列が長い場合はどうするのか。 フォントサイズを変えるのか、別レイアウトにするのか、短縮するのか。",
   "同点や境界値の処理はあるか。 「以上」「より大きい」「以下」「未満」を正しく使い分けているか。",
   "時刻の基準は正しいか。 UTCなのか、ローカルタイムなのか。 秒なのか、ミリ秒なのか。",
   "ラベルだけ残る状態になっていないか。 値だけ消えて、背景や単位が残っていないか。",
   "あとから別の人が見ても追える構造になっているか。 固定値の意味が分かるか。 条件分岐が複雑になりすぎていないか。",
   "オペレーターが本番中に判断しなくてよい部分と、人が判断すべき部分を分けているか。",
   "このチェックを入れるだけでも、Visual Logicの設計はかなり安定します。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "【Math】本番運用で確認したいポイント",
  "title_en": "[Math] Points to check for live operation",
  "vol": 4,
  "srcChap": "第2章",
  "ci": 2,
  "si": 10,
  "items": [
   "XPressionのMathブロックは、制作中に見た目が合っていても、本番で値が変わったときに問題が出ることがあります。",
   "文字数が長くなっても背景が崩れないか",
   "短い文字でも背景が小さくなりすぎないか",
   "値が0になっても計算が破綻しないか",
   "小数が出たとき、表示として問題ないか",
   "最大値や最小値を超えたときの制御があるか",
   "空の値が入ったときに大きく崩れないか",
   "後から別の担当者が見ても、何をしているか理解できるか",
   "スポーツ演出や放送グラフィックスでは、データは常にきれいな状態で入ってくるとは限りません。",
   "試合前で値が未入力 選手名が想定より長い スタッツが0 ランキングの件数が変わる 表示タイミングによってデータがまだ更新されていない",
   "こうしたことは現場で起こり得ます。",
   "だからこそ、Mathブロックを使うときは、 理想的な値が入ったときだけではなく、少し困った値が入ったときにどうなるか を確認することが大切です。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "【DataLinqを使う前に考えたいこと】本番前に確認したいこと",
  "title_en": "[Things to Consider Before Using DataLinq] Things to check before the show",
  "vol": 5,
  "srcChap": "第1章",
  "ci": 1,
  "si": 11,
  "items": [
   "DataLinqを使うとき、本番前には最低限確認しておきたいことがあります。",
   "次に、更新のタイミングです。試合前に一度更新すればよい情報なのか。試合中に何度も変わる情報なのか。演出のタイミングに合わせて切り替える情報なのか。",
   "そして、データが来なかったときの対応です。空欄のまま出すのか。非表示にするのか。手動入力に切り替えるのか。別のグラフィックスで逃がすのか。",
   "本番中は、考える時間がほとんどありません。だからこそ、事前に決められることは決めておくべきです。",
   "DataLinqの設定そのものよりも、こうした事前確認の方が、現場では効くことがあります。"
  ]
 },
 {
  "when": "運用",
  "cat": "注意",
  "title": "【DataLinq Serverの役割】DataLinq Serverを考えると、トラブルの切り分けがしやすくなる",
  "title_en": "[The Role of DataLinq Server] Thinking in terms of DataLinq Server makes troubleshooting easier",
  "vol": 5,
  "srcChap": "第2章",
  "ci": 2,
  "si": 5,
  "items": [
   "表示が更新されない。選手名が違う。スコアが古い。画像が出ない。一部のシーンだけ値が違う。外部データを更新したのに、グラフィックス側に反映されない。",
   "このとき、どこを見ればよいかが決まっていないと、対応に時間がかかります。",
   "問題は、グラフィックス側の設定なのか。DataLinqの紐づけなのか。DataLinq Server側で受けているデータなのか。元データの内容なのか。ファイルパスやネットワークの問題なのか。外部システム側の更新タイミングなのか。",
   "DataLinq Serverまわりを整理しておくと、こうした切り分けがしやすくなります。",
   "これは、見た目のデザインとは別の話です。でも、本番運用ではとても重要です。",
   "リアルタイムグラフィックスは、きれいに表示されることだけでなく、問題が起きたときに戻せること、止められること、確認できることも含めて設計する必要があります。",
   "DataLinq Serverを意識することは、トラブル時に現場が迷わないための準備でもあります。",
   "まず、元データが正しいか。次に、そのデータを正しい場所で受けているか。次に、XPression側の紐づけが正しいか。最後に、画面上で意図した表示になっているか。",
   "本番中は、焦って画面側だけを直そうとしてしまいがちです。でも、原因が元データや参照先にある場合、グラフィックス側だけを触っても解決しないことがあります。",
   "だからこそ、データの入口から表示までの流れを持っておくことが大切です。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "【DataLinq Serverの役割】DataLinq Serverを使う前に確認したいこと",
  "title_en": "[The Role of DataLinq Server] What to check before using DataLinq Server",
  "vol": 5,
  "srcChap": "第2章",
  "ci": 2,
  "si": 8,
  "items": [
   "DataLinq Serverを使う案件では、本番前に確認しておきたいことがあります。",
   "まず、データソースが明確かどうかです。",
   "どのデータを使うのか。そのデータはどこから来るのか。誰が更新するのか。どのタイミングで更新されるのか。本番中に修正できる必要があるのか。",
   "次に、参照先や接続まわりの確認です。",
   "本番環境で同じデータを見ているか。テスト環境と本番環境で参照先が変わっていないか。ネットワーク越しに参照する場合、安定してアクセスできるか。外部システム側の起動順や更新タイミングに問題がないか。ファイル名やフォルダ構成が変わっても、現場で気づけるか。",
   "さらに、トラブル時の対応も確認しておきたいです。",
   "データが来ないとき、どこを見るのか。古い値が残ったとき、どう判断するのか。外部データが止まった場合、手動運用に切り替えられるのか。どのグラフィックスを止めるべきなのか。誰が最終判断するのか。",
   "DataLinq Serverは、本番中に目立つ部分ではないかもしれません。でも、本番で問題が起きたときには、この部分の整理がかなり効いてきます。",
   "本番前の確認では、画面に表示されているかどうかだけでなく、データの入口から画面表示までがつながっているかを見る必要があります。",
   "ここを確認しておくと、現場での不安がかなり減ります。"
  ]
 },
 {
  "when": "運用",
  "cat": "チェックリスト",
  "title": "【Hardware Setup】本番前は、この順番で確認すると整理しやすい",
  "title_en": "[Hardware Setup] Checking in this order before the show keeps it organized",
  "vol": 6,
  "srcChap": "第1章",
  "ci": 1,
  "si": 11,
  "items": [
   "Video Mode (Standard)は現場に合っているか",
   "1080i、1080p、720p、UHDなどの前提は合っているか",
   "SD環境でHDプロジェクトを扱う場合の制限を理解しているか",
   "資料上、SD専用ソフトウェアでもHDプロジェクトを開けるケースが説明されています。ただし、内部的にSDでレンダリングしてからアップスケールされるため、ネイティブHDほどの鮮明さは得られないとされています。",
   "このような制限は、見た目の品質に関わるため、現場や納品先の前提として確認しておきたい部分です。",
   "ProgramはどのOutputか",
   "現場のスイッチャー入力と一致しているか",
   "Output名や用途が現場内で共有されているか",
   "Virtual Outputと本番出力を混同していないか",
   "ここで大事なのは、「XPressionから出ている」ではなく、現場の本線に届いているかです。",
   "Fill / Keyが必要な運用では、必ず合成結果まで確認したいです。",
   "FillとKeyのペアは正しいか",
   "スイッチャー側で正しく合成されているか",
   "Shaped / Unshapedの前提が合っているか",
   "縁や透明部分に不自然な見え方がないか",
   "XPression上の見え方だけでなく、スイッチャー側の合成結果を見ることが重要です。",
   "Previewで次のTake Itemを確認できるか",
   "ProgramとPreviewを混同しない表示になっているか",
   "Video Previewは現場の確認に使えるか",
   "Desktop Previewだけで判断していないか",
   "誰がどのモニターを見るか決まっているか",
   "Previewは、送出前の判断材料です。見えているだけでなく、運用者が迷わず判断できる状態にすることが大切です。",
   "Live Sourceに使う入力は正しいか",
   "Virtual Inputで検証しているだけではないか",
   "実際の入力信号が入っているか",
   "Input Grabbingなど、負荷に影響する可能性がある設定を理解しているか",
   "Input To Output Latencyが運用上問題にならないか",
   "Embedded Audioなのか",
   "AES Audioなのか",
   "Audio Deviceを使うのか",
   "Audio Channel Mappingは現場に合っているか",
   "Audio Monitorと本線音声を混同していないか",
   "音声卓側で受けられているか",
   "音声は「聞こえるか」だけでなく、「どの経路で聞こえているか」を見る必要があります。",
   "External Referenceを使う構成か",
   "Genlock Sourceは正しいか",
   "Free Runningでよい環境か",
   "Timing Offsetを触る必要があるか",
   "Queue SizeやPre Queueを遅延と安定性のバランスで考えているか",
   "ここは、XPression単体ではなく、現場のシステム全体で判断する項目です。",
   "どの外部機器から制御を受けるのか",
   "どのトリガーで何が起きるのか",
   "Keyboard-GPI MappingやPBus Mappingは本番用か",
   "テスト用設定が残っていないか",
   "手動操作と競合しないか",
   "トラブル時に手動運用へ戻せるか",
   "外部制御は、つながったことよりも、動作の意味が共有されていることが大切です。",
   "Hardware Setup側のServer Channelsは想定通りか",
   "Material Editor - Server Channelの指定は正しいか",
   "同時再生で競合しないか",
   "ループ素材、スポンサー素材、ワンショット素材の再生順は確認したか",
   "本番に近い組み合わせでテストしたか",
   "動画素材は、単体再生だけでなく、本番の順番や同時使用を想定して確認した方が安全です。",
   "Live Sourceに依存していないか",
   "Server Channel指定があるか",
   "Fill / Key前提か",
   "外部制御で呼ばれる前提か",
   "Preview運用を前提にしているか",
   "音声付き素材を含むか",
   "別現場へ持ち込む場合に変更が必要な箇所はどこか",
   "ここまで見ると、Hardware Setupが単なる初期設定ではなく、テンプレート制作や納品にも関係することが分かります。"
  ]
 },
 {
  "when": "運用",
  "cat": "注意",
  "title": "トラブル時は、シーンだけでなくHardware Setupも見る",
  "title_en": "On trouble, check Hardware Setup, not just the scene",
  "vol": 6,
  "srcChap": "第1章",
  "ci": 1,
  "si": 12,
  "items": [
   "XPressionでトラブルが起きたとき、初心者はシーンや素材だけを見がちです。もちろん、シーン構造やマテリアルが原因のこともあります。",
   "ただ、現場ではHardware Setup側が原因になっていることもあります。",
   "トラブル時に大切なのは、いきなり設定を変えることではありません。まず、どこまで確認できていて、どこから先が未確認なのかを分けることです。"
  ]
 }
];
window.CAUTIONS_TOP=[
 {
  "when": "制作",
  "cat": "ポイント",
  "vol": 4,
  "srcChap": "第2章",
  "text": "便利だからと全部をVisual Logicで組まない",
  "why": "ネイティブでできることはネイティブで。判断が要る所だけVLに絞ると、壊れにくく直しやすい。",
  "text_en": "Don't build everything in Visual Logic just because it's handy",
  "why_en": "Native for what native can do. Keeping VL only where judgment is needed stays robust and fixable."
 },
 {
  "when": "制作",
  "cat": "注意",
  "vol": 5,
  "srcChap": "第1章",
  "text": "空欄・長い文字・画像なしを先に想定して作る",
  "why": "本番で初めて長い名前や空データが来て事故る。最初に織り込む。",
  "text_en": "Anticipate blanks, long text, and missing images up front",
  "why_en": "Long names and empty data appearing live for the first time cause accidents. Bake them in from the start."
 },
 {
  "when": "制作",
  "cat": "注意",
  "vol": 5,
  "srcChap": "第1章",
  "text": "「つながること」と「安定して運用できること」は別",
  "why": "自動化しすぎると逆に現場が苦しくなる。運用できる形を優先する。",
  "text_en": "\"It connects\" and \"it runs stably\" are different things",
  "why_en": "Over-automation makes the site suffer. Prioritize an operable shape."
 },
 {
  "when": "運用",
  "cat": "チェック",
  "vol": 6,
  "srcChap": "第1章",
  "text": "本番前は「順番」を決めて確認する",
  "why": "全部を同じ重みで見ると逆に分かりにくい。Hardware→出力→Sceneの順で切り分ける。",
  "text_en": "Check in a fixed order before the show",
  "why_en": "Equal weight on everything obscures issues. Isolate in the order Hardware → output → Scene."
 },
 {
  "when": "運用",
  "cat": "注意",
  "vol": 6,
  "srcChap": "第1章",
  "text": "トラブル時はSceneだけでなくHardware Setupも見る",
  "why": "原因がシーン側とは限らない。ハード側も切り分け対象にする。",
  "text_en": "In trouble, check Hardware Setup too, not just the Scene",
  "why_en": "The cause isn't always the scene side. Isolate hardware too."
 },
 {
  "when": "運用",
  "cat": "注意",
  "vol": 5,
  "srcChap": "第2章",
  "text": "表示が遅い／出ない時はDataLinq Serverを切り分けの起点に",
  "why": "「データの窓口」を先に見ると、トラブルの切り分けがしやすい。",
  "text_en": "Slow or missing displays: start isolation at DataLinq Server",
  "why_en": "Checking the data gateway first makes isolation easier."
 },
 {
  "when": "運用",
  "cat": "失敗例",
  "vol": 2,
  "srcChap": "第2章",
  "text": "外部画像をDataLinqで読むと本番で表示が遅いことがある",
  "why": "事前キャッシュやローカル化を検討する。本番で初めて詰まらない。",
  "text_en": "External images via DataLinq can display slowly on air",
  "why_en": "Consider pre-caching or localizing. Don't hit the jam live for the first time."
 },
 {
  "when": "運用",
  "cat": "ポイント",
  "vol": 3,
  "srcChap": "第2章",
  "text": "止まった絵でなく「動いても壊れないか」まで確認",
  "why": "値が動く瞬間（桁変化・入れ替わり・同点）に表示が破綻しないか。",
  "text_en": "Verify it survives motion, not just the still frame",
  "why_en": "Does the display hold the moment values move (digit changes, swaps, ties)?"
 },
 {
  "when": "運用",
  "cat": "チェック",
  "vol": 6,
  "srcChap": "第1章",
  "text": "引き継ぎ・納品前に、別担当者が使える状態か確認",
  "why": "理解・修正・差し替えができるか。現場の再現性を担保する。",
  "text_en": "Before handover or delivery, confirm another person can run it",
  "why_en": "Understand, fix, swap — guarantee on-site reproducibility."
 }
];
