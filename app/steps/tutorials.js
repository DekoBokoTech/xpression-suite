/* =====================================================================
   XPression 学習ノート — ハンズオン（作ってみる）データ
   このファイルに作例を追記すると、アプリの「ハンズオン」タブに増えます。
   1作例＝下のオブジェクトを1つ。steps[] に手順を並べるだけ。

   使えるフィールド:
     id       … 半角英数のユニークID（進捗保存に使う。重複禁止）
     title    … 作例タイトル
     subtitle … 副題（任意）
     srcVol   … 元記事の巻番号（1〜6）。「元の記事を読む」リンクに使う
     srcChap  … 元記事の章（例 '第12章'）。前方一致で本文へリンク
     level    … 難易度の表示（任意）
     minutes  … 目安時間（分・任意）
     goal     … 完成形の説明
     goalImg  … 完成形の画像ファイル名（gallery内。任意。例 'v4_12_001.jpg'）
     overview … 手順の全体像（任意）
     steps    … [{ h:見出し, body:本文, tip:ヒント(任意), img:'v4_..jpg'(任意) }]
     checklist… 本番前チェック項目の配列（任意）
   画像は gallery/ 内のファイル名を指定します（巻フォルダは自動判定）。
   ===================================================================== */
window.TUTORIALS = [
  {
    "id": "lower-third",
    "title": "壊れないローワーサードを作る",
    "subtitle": "ネイティブ機能とVisual Logicの分担",
    "srcVol": 4,
    "srcChap": "第12章",
    "level": "中級",
    "minutes": 30,
    "goal": "名前と肩書きの2段ローワーサード。短い名前でも長い名前でも背景が文字に合わせて気持ちよく収まり、いくら長くても安全エリアからはみ出さない上限を持つ。肩書きが空のときは行を出さず名前だけできれいに見せ、Online / Offline / Take で安定して出し隠しできる。",
    "goalImg": "v4_12_001.jpg",
    "overview": "「器を作る」→「ネイティブで幅の土台を作る」→「Visual Logicで判断だけ足す」→「出す・隠すを整える」。ネイティブで土台ができた時点で見た目はもう壊れず、Visual Logicは最後の仕上げの判断だけを乗せる。",
    "steps": [
      {
        "h": "器を作る（背景とText Objectの親子）",
        "body": "新しいSceneを作り、名前用のText Objectを置き、その最初の子（First Child）として背景を持たせる。この親子関係が後のAuto Scaleで効く。背景はMaterialで色を持たせる（色は見た目ではなく値として持たせると、チームカラーへの差し替えが楽）。肩書き用のText Objectも置き、名前は Name、肩書きは Title のように役割が分かる名前を付けておく。\n\n✅ 確認：Object Managerで、名前Textの子（First Child）に背景がぶら下がっている。名前がName、肩書きがTitleなど役割が分かる名前になっている。",
        "img": "v4_12_002.jpg"
      },
      {
        "h": "ネイティブで幅の土台を作る（ここが本命）",
        "body": "名前のText Object の Tabs & Options タブで3つを設定する。\n① Auto Squeeze：Enabled にして Max Width に上限幅を入れ、Scaling は Width Only（横だけ詰める）。\n② Auto Scale：Enabled・Target = First Child・Mode = Width & Height にすると、親の詰まりに子の背景が追従する（背景幅をVisual Logicで計算する必要はない）。\n③ Character Limits：Soft Limit で警告（文字が赤くなる）、Hard Limit で文字数を頭打ち（最後の保険）。\nこれで幅まわりは完成、Visual Logicは一切使わない。\n\n✅ 確認：仮の長い名前を入れると横に詰まり、Max Widthを超えない。背景も一緒に追従する。Soft Limitを超えると文字が赤くなる。",
        "img": "v4_12_003.jpg",
        "tip": "Max Width・Hard Limit の具体値は安全エリアとフォント依存。実機で最長の名前を入れて決める。"
      },
      {
        "h": "Visual Logicの出番①：肩書きが空なら、行を出さない",
        "body": "比較と Not の考え方で「肩書きが空ではないときだけ肩書きの行を表示する」という条件を作り、肩書きText Object の Visible につなぐ。空のときは隠す。名前を中央に寄せたいときは、名前Text Object の Position（X / Y / Z）につないで動かす。オペレーターが毎回手で直さなくても、テンプレートが整えてくれる。\n\n✅ 確認：肩書きを空にすると肩書きの行が消え、入れると再表示される。",
        "img": "v4_12_004.jpg"
      },
      {
        "h": "設計の判断：読めなくなる手前で切り替える（Visual Logicの出番②）",
        "body": "Width Only の横詰めは便利だが、詰めすぎると文字が縦長になり、ある所から急に読みにくくなる（「収まる」と「読める」は別）。名前の長さをVisual Logicで見て、決めたしきい値を超えたら二行折り返しなどに切り替える。折り返しそのものはネイティブの Word Wrap が担当し、Visual Logicは「どこで切り替えるか」の判断だけを持つ。\n\n✅ 確認：しきい値を超える長い名前で折り返し（切替）が発動し、読める状態を保っている。",
        "tip": "切り替えのしきい値は文字数で近似する。解像度・セーフティゾーン・フォント依存なので実機で決める。"
      },
      {
        "h": "出す・隠すを整える",
        "body": "ローワーサードをScene単位で扱う。送出は Take（テンキーの + キー、または RossTalk の TAKE）、消すときは Offline（テンキーの − キー、または SEQO）。短い名前・長い名前・極端に長い名前・肩書き無しの各パターンをリハで実際に出し、どの状態でも崩れず読めるか確認する。差し替えたら、まずプレビューで Auto Squeeze と背景の追従が崩れていないかを確認し、問題なければ再TAKEで送出に反映する。"
      }
    ],
    "checklist": [
      "いちばん長く想定される名前で、Auto Squeezeが効いて安全エリアからはみ出さない",
      "背景がAuto Scaleで名前に追従し、余白が破綻していない",
      "極端に長い名前で、Hard Limitが最後の保険として効く",
      "横詰めが効きすぎて読みにくくなる手前で切り替えが入る（収まる≠読める）",
      "肩書き無しのとき、間延びせず名前だけきれいに収まる",
      "送出中に名前を差し替えても、詰めと背景の追従が破綻しない"
    ]
  },
  {
    "id": "scoreboard",
    "title": "スコアボードを作る",
    "subtitle": "Visual Logicが本領を出す場所",
    "srcVol": 4,
    "srcChap": "第13章",
    "level": "中級〜上級",
    "minutes": 40,
    "goal": "2チームのスコアボード。ホームとアウェイのチーム名・色・スコア・ピリオド表示。勝っている側がひと目で分かるリード強調。スコアが動いたときは変わった数字が軽く強調され、登場と退場はなめらかに。",
    "goalImg": "v4_13_001.jpg",
    "overview": "「器を作る」→「スコアを表示用に整える」→「Visual Logicで判断を足す」→「動きをネイティブで付ける」。Visual Logicは「値を見て何をどう見せるかを決める」担当、ネイティブは「決まったものを動かす・出し入れする」担当。",
    "steps": [
      {
        "h": "器を作る（スコアボードのオブジェクト構成）",
        "body": "新しいSceneに部品を並べる。チーム名・スコアの数字・背景パネル・リードマーカー（グローや矢印）を、ホーム側とアウェイ側で左右対称に持つ。HomeName / HomeScore / AwayName / AwayScore、リードマーカーは HomeLead / AwayLead のように、左右と役割が一目で分かる名前を付けると結線で迷わない。\n\n✅ 確認：Home/Awayの各部品が左右対称に置かれ、名前だけで役割が分かる。",
        "img": "v4_13_002.jpg"
      },
      {
        "h": "スコアを表示用に整える",
        "body": "スコアは数値だが、画面に出すときは見せ方を整える（1桁を「7」と出すか「07」と出すか、3桁で桁あふれしないか）。第4・6章の Format の実物応用。数値はそのまま出さず、Format で表示用の形に整えてから表示につなぐ。「外部データほど、表示の直前で型を整える」をそのまま適用する。\n\n✅ 確認：スコアに1桁・3桁を入れても表示形式（07など）が意図通り。",
        "tip": "桁数の想定（最大何点まで）とゼロ詰めの有無は競技・運用で決め、実機で桁あふれの挙動を確認する。"
      },
      {
        "h": "Visual Logicの出番①：リードを強調する",
        "body": "この章の中心。Greater Than でホームとアウェイのスコアを比較し、大きい側のマーカーを Visible / Color で強調する（勝っている側を明るいチームカラー、負けている側を落ち着いた色に）。ネイティブは「どちらが大きいか」を判断できないので、ここはVisual Logicの仕事。そして同点の分岐を最初から入れる（放っておくと「両方が勝っている」ように見える事故になる）。\n\n✅ 確認：ホーム優勢・アウェイ優勢・同点の3状態すべてで強調が正しく出る（同点で両方光らない）。",
        "img": "v4_13_003.jpg",
        "tip": "比較・色切り替え・同点判定の具体的なFunction Blocks結線は、実機で組んだものを正とする。"
      },
      {
        "h": "Visual Logicの出番②：チームカラーを出し分ける",
        "body": "対戦カードごとにチームが変わり、色も変わる。色を値として持たせておけば、チームの選択を入力にして対応するチームカラーを背景やマーカーに流し込める（Selectorsの考え方）。「どの色にするか」を決めるのがVisual Logic、「その色で表示する」のがネイティブ（Material）。\n\n✅ 確認：チーム選択を切り替えると、背景とマーカーの色が対応するチームカラーに変わる。",
        "img": "v4_13_004.jpg"
      },
      {
        "h": "動きをネイティブで付ける",
        "body": "登場と退場は Scene Director と Transition でなめらかに、順序は Sequencer で管理する。\nスコアが入った瞬間の強調は、変わった数字を軽く光らせる・弾ませる（常時の細かな動きは Continuous Animation）。\n「スコアが変わったこと」をVisual Logicで検知し、その瞬間に強調を出す組み方もできる（変化の検知は Timers / Counters の考え方）。\n値が動く瞬間に表示が破綻しないか、必ず確認する。\n\n✅ 確認：スコアを変えた瞬間に強調が出て、表示が崩れない。"
      },
      {
        "h": "発展：スコアに比例したバーを作る（任意）",
        "body": "点差を視覚的に見せたいときは、スコアの値を入力にバーの長さや位置を計算する（Mathの応用）。ただし伸ばしっぱなしにせず、最大値で頭打ちにする（ローワーサードの幅と同じ考え方）。数字だけで足りる現場も多いので、必要なときに足す部品として捉える。\n\n✅ 確認：大差のスコアでもバーが最大値で頭打ちになり、はみ出さない。"
      }
    ],
    "checklist": [
      "ホームリード・アウェイリード・同点の3状態すべてで、強調が正しく出る",
      "同点のとき、両方が勝っているように見えていない",
      "チームを差し替えたとき、色が正しく出し分けられる",
      "スコアが2桁から3桁になっても、桁あふれせず読める",
      "スコアが入れ替わった瞬間・同点になった瞬間に、表示が破綻しない",
      "登場・退場がなめらかで、送出の順序が乱れない"
    ]
  },
  {
    "id": "datalinq-image",
    "title": "DataLinqで画像を差し替える",
    "subtitle": "Dynamic Material と Material Path（画像・ロゴの自動差し替え）",
    "srcVol": 5,
    "srcChap": "第3章",
    "level": "中級",
    "minutes": 25,
    "goal": "チームロゴ・選手写真・スポンサー素材などの画像を、毎回手で貼り替えずに切り替えられるテンプレートを作ります。表示する画像を「ファイルの置き場所（パス）」で決めるようにし、さらに Widget やデータの値を変えるだけで別の画像へ入れ替わる状態を目指します。対戦カードや出演者が変わっても、画像を貼り替える手間がなくなります。",
    "goalImg": "v5_05_001.jpg",
    "overview": "考え方はシンプルです。オブジェクトの見た目（マテリアル）を『固定の画像』ではなく『Dynamic Material（動的マテリアル）』にして、表示する画像をパスやマクロで指定します。手順は ①素材を整理 → ②画像を出すオブジェクトを用意 → ③Dynamic Materialに切替 → ④Material Pathで画像を指定 → ⑤Widget/データの値で切り替え（マクロ @W:名前@ を使用）→ ⑥本番前チェック。最大のポイントは『パスが本番機でも同じ場所を指せるか』です。",
    "steps": [
      {
        "h": "① 素材ファイルを整理する",
        "body": "まず、差し替えたい画像をあとで指定しやすい場所に整理します。プロジェクトフォルダの中に「Images」フォルダを作り、用途ごとにサブフォルダを分けて、次のようなファイルを用意します。\n\n【準備するフォルダとファイルの例】\nImages/Teams/\n　・TokyoTeamLogo.png\n　・OsakaTeamLogo.png\n　・NagoyaTeamLogo.png\nImages/Players/\n　・Player_01_Photo.png\n　・Player_02_Photo.png\nImages/Sponsors/\n　・Sponsor_Main.png\nImages/Backgrounds/\n　・Arena_Background.png\n\n大事なポイント：チームロゴは「チーム名＋Logo.png」の形でファイル名を統一します（TokyoTeamLogo.png / OsakaTeamLogo.png …）。こうしておくと、⑤で Widget の値（TokyoTeam / OsakaTeam …）を変えるだけで、対応するファイルへ自動で切り替わります。\n\n✅ 確認：Images/Teams などのフォルダに、命名規則どおりのファイルが並んでいる。",
        "tip": "フォルダ名・ファイル名は半角英数字で統一するとパス指定でトラブりにくいです。ファイル名の付け方（値＋固定語）を先に決めておくと、後の自動切り替え（⑤）がそのままハマります。"
      },
      {
        "h": "② 画像を表示するオブジェクトを用意する",
        "body": "画像を映すためのオブジェクトを置きます。チームロゴやスポンサー画像なら、四角い面に画像を貼れる Quad Object が分かりやすいです。すでにロゴ枠などがある場合はそれを使ってOK。あとで指定しやすいよう、オブジェクトには「HomeLogo」など役割が分かる名前を付けておきましょう。\n\n✅ 確認：Quadが置かれ、HomeLogoなど役割が分かる名前が付いている。",
        "tip": "「画像を貼る面」を用意するイメージ。まだ固定の画像が入っていても大丈夫です（次で動的に切り替えます）。"
      },
      {
        "h": "③ マテリアルを Dynamic Material に切り替える",
        "body": "画像を出したいオブジェクトを選択し、Object Inspector（設定パネル）を開きます。「DataLinq」タブへ移動し、「Select Material Source」で「Dynamic Material」を選びます。これで、このオブジェクトの画像が『固定』ではなく『後から指定して差し替えられる』状態になります。\n\n✅ 確認：DataLinqタブの Select Material Source が Dynamic Material になっている。",
        "img": "v5_05_002.jpg",
        "tip": "Dynamic Material＝『表示する画像を、パスやデータで動的に決められるマテリアル』。ここが画像差し替えの心臓部です。"
      },
      {
        "h": "④ Material Path で表示する画像を指定する",
        "body": "Dynamic Material Properties の中の「Material Path」に、表示したい画像ファイルの場所（パス）を入力します。プロジェクトフォルダからの相対パスで書くのが基本です。\n記入例：\n・チームロゴ → Images/Teams/TokyoTeamLogo.png\n・選手写真 → Images/Players/Player_01_Photo.png\n・スポンサー → Images/Sponsors/Sponsor_Main.png\n・背景 → Images/Backgrounds/Arena_Background.png\nここで指定したファイルが、そのオブジェクトに表示されます。\n\n【重要：編集画面（Layout）は市松模様でOK。送出側で表示される】\n編集中の Layout ビューでは Dynamic Material はプレビューされず、青と黄色の市松模様（プレースホルダー）が表示されます。これは正常な挙動で、パスが間違っているわけではありません。実際の画像は送出（シーケンサー／Take＝オンエア）側で正しく表示されます。まずは Sequence で表示を確認してください。\n\n【送出（Sequence）側でも画像が出ないときだけ、パスを見直す】\nSequence でも市松のまま／画像が出ない場合は、パスが解決できていません。次を確認します：\n・パスの前後に \" （ダブルクォート）が付いていないか。「パスのコピー」で貼り付けると \"C:/…/TokyoTeamLogo.png\" のように付くことがあり、残っていると解決できません。必ず削除。\n・区切りが ¥ ではなく / になっているか。\n・フォルダ名・ファイル名に日本語や全角が混じっていないか（半角英数字が安全）。\n・指定したファイルが実際にその場所にあるか、名前・拡張子（大文字小文字含む）が一致しているか。\n・相対パスの場合、プロジェクトを保存し、Images フォルダが保存先プロジェクトの下にあるか。\n（編集画面で位置やサイズを合わせたいときは、作業中だけ Static Material に同じ画像を割り当て、送出前に Dynamic Material へ戻すと確認しやすいです。）\n\n【パスをコピーする方法（Windows）】\n・エクスプローラーで対象ファイルを Shift＋右クリック →「パスのコピー」を選ぶ。\n・フォルダのパスだけ欲しいときは、アドレスバーをクリックしてコピー。\nコピーされるのは絶対パスです。Material Path を相対にしたいときは、プロジェクトフォルダより下の部分（例：Images/Teams/…）だけを残して貼り付けます。区切りは / でOKです。\n・重要：「パスのコピー」で貼り付けると、パスの前後に \" （ダブルクォート）が付くことがあります（例：\"C:/…/TokyoTeamLogo.png\"）。この \" は必ず削除してください。残っているとパスを解決できず、市松模様のままになります。\n\n✅ 確認：Material Pathに直書きしたパスでロゴが表示される（市松模様のままなら「\"」や誤字を疑う）。",
        "img": "v5_05_003.jpg",
        "tip": "絶対パス（D:/… など）を使う場合は、本番機でも同じパスで解決できるか必ず確認を。相対パスの方が別PCへ移しても崩れにくく安全です。"
      },
      {
        "h": "⑤ Widget（Text List）の値でファイル名を切り替える（具体的な書き方）",
        "body": "ここが自動切り替えの肝です。まず切り替え用の Widget を作ります。\nDisplay メニュー → Widgets パネルの『New Widget』→『Text List』を選びます（＝テキストを切り替えられるウィジェット。時刻なら Clock Timer、数値なら Counter）。\nできた『TextList1』は、分かりやすい名前（例：TeamNameForFile）に変更しておきます。\n\n次に Widget Properties（プロパティ）を開き、『Add』で切り替えたい値を登録します。\n例：TokyoTeam / OsakaTeam / NagoyaTeam …\n※『Allow manual entry of text』にチェックすると、一覧に無い値もその場で手入力できます。\n\nそして Material Path のファイル名部分に、この Widget を差し込むマクロ @W:ウィジェット名@ を書きます。\n記入例：\nImages/Teams/@W:TeamNameForFile@Logo.png\n\n【手入力しない方法：右クリックで挿入】\nマクロは手で打たなくてもOKです。Material Path の入力欄を右クリック →『Insert Lookup』→『Widgets』→ 作成した Widget名（例：TeamNameForFile）を選ぶと、@W:TeamNameForFile@ が自動で挿入されます。\n同じ右クリックメニューから『Published Text Objects』『All Text Objects』を選べば、テキストオブジェクトの値も同じように差し込めます。打ち間違い（スペルミス）を防げるので、こちらが確実です。\n\n@W:TeamNameForFile@ の部分が、いま選ばれている値に置き換わります。\n・選択が TokyoTeam のとき → Images/Teams/TokyoTeamLogo.png\n・OsakaTeam に切り替えると → Images/Teams/OsakaTeamLogo.png\nWidgets パネルのドロップダウンや Prev / Next で値を切り替えると、表示ロゴが自動で入れ替わります。\n\n✅ 確認：Widgetの値を切り替えると、ロゴが自動で入れ替わる。",
        "img": "v5_05_010.jpg",
        "tip": "値の種類で使うWidgetが違います：文字（チーム名など）＝Text List、数値カウント＝Counter、時刻＝Clock Timer。コツはファイル名を『値＋固定語』で統一すること（TokyoTeamLogo.png / OsakaTeamLogo.png…）。外部データで切り替えるなら @W:名前@ の代わりに %DataLinqキー名% を使います。"
      },
      {
        "h": "⑥ 本番前に確認する",
        "body": "想定するすべての画像で、パスが正しく解決できて画像が表示されるかを確認します。特に次の3点をチェック：\n・相対パスが別PC（本番機）でも通るか（保存場所や共有ドライブの割り当て違いに注意）\n・Widget／データの値を変えたら、本当に画像が切り替わるか\n・指定した画像が見つからない（空・欠番）ときに大きく崩れないか\nリハーサルで実際に何パターンか切り替えてみると安心です。",
        "img": "v5_05_018.jpg",
        "tip": "「本番機で画像が出ない」の多くはパスの解決ミス。素材はプロジェクトに同梱し、相対パスで指定しておくと事故が減ります。素材の置き場所が毎回変わる現場では file path 指定は慎重に。"
      }
    ],
    "checklist": [
      "相対パスで、別のPC（本番機）でも画像が表示される",
      "Widget（@W:名前@）またはDataLinqキー（%キー名%）の値を変えるだけで画像が切り替わる",
      "ファイル名を『値＋固定語』で統一してある（TokyoTeamLogo.png など）",
      "絶対パスを使う場合、本番機でも同じパスで解決できることを確認した",
      "指定した画像が無いとき（空・欠番）に表示が大きく崩れない",
      "対戦カード・出演者の差し替えを、手作業なしで回せる"
    ]
  },
  {
    "id": "game-clock",
    "title": "簡易ゲームクロックを作る",
    "subtitle": "Clock Timer Widgetでカウントダウン表示",
    "srcVol": 4,
    "srcChap": "第14章",
    "level": "中級",
    "minutes": 30,
    "goal": "12:00から00:00へ向かってカウントダウンする簡易ゲームクロック。Text Objectは表示先で、時間の値はClock Timer Widgetが持つ。Start / Stop / ResetをManualで確実に操作でき、Online・再Takeでも意図しないResetや再Startが起きないことを確認する。",
    "goalImg": "v4_14_003.jpg",
    "overview": "時計の作り方をまず3つ（簡易＝Clock Timer Widget／演出連動＝Visual Logic／公式時計＝DataLinq）に切り分け、ここでは最もシンプルなClock Timer Widgetで作る。器（Text Object）を置く→Widgetで時間を作る→つなぐ→Manualで動作確認、の順。",
    "steps": [
      {
        "h": "作り方を3つに切り分ける",
        "body": "時計・タイマー表示は目的で道具が変わる。\n① シンプルなカウントダウン→Clock Timer Widget（今回はこれ）。\n② 残り時間で色を変えるなどの演出連動→Visual Logic。\n③ 外部スコアボード等の公式時計を表示→DataLinq。ここでは最も分かりやすいClock Timer Widgetで作る。Visual Logicを無理に最初から使わない。\n\n✅ 確認：「今回はClock Timer Widgetで作る」と方針を言える。",
        "img": "v4_14_002.jpg"
      },
      {
        "h": "テスト用Sceneを作る",
        "body": "新規Sceneを作り、GameClock_Test など分かる名前を付ける。この段階では背景・装飾・ロゴ・スコアは入れない。まず確認したいのは見た目ではなく『時計が正しく表示され、Start / Stop / Resetできるか』。\n\n✅ 確認：GameClock_Test という空のSceneができている。"
      },
      {
        "h": "表示先のText Objectを置く",
        "body": "Scene上にText Objectを1つ置き、仮で「12:00」と入れる（位置・サイズ・Font・Materialの確認用）。名前は Clock_Text のように役割が分かる名前にする。重要：この仮文字を打っただけでは動くタイマーにはならない。Text Objectは時間を作る部品ではなく、時間の値を表示する表示先。\n\n✅ 確認：Clock_Text に仮の「12:00」が表示されている（まだ動かなくてよい）。",
        "img": "v4_14_004.jpg"
      },
      {
        "h": "Clock Timer Widgetを作る",
        "body": "メニューの Display > Widgets を開き、New Widget から Clock Timer を作る。名前は GameClock_Timer のように用途が分かる名前に（後でText Object側から選ぶときに効く）。Widgets画面は『Timerを作る場所』であり、同時に『Timerの状態を見て操作する場所』でもある。\n\n✅ 確認：Widgetsパネルに GameClock_Timer が並んでいる。",
        "tip": "Widgetが増えるとどのTimerをどのTextにつないだか分からなくなる。最初から用途の分かる名前を付けておく。"
      },
      {
        "h": "ModeをTimerにする",
        "body": "作ったClock Timer WidgetのPropertiesで Mode を Timer にする。Clock＝『今の時刻』を扱う考え方、Timer＝『任意の開始値から進める／戻す』考え方。12:00から00:00へ減らしたいのでTimerが中心。\n\n✅ 確認：Mode が Timer になっている。",
        "img": "v4_14_005.jpg"
      },
      {
        "h": "Start At / Stop At / Direction を決める",
        "body": "12分→0分のカウントダウンなら、Start At=12:00、Stop At=00:00、Direction=Down。暗記すべきは設定名ではなく『どこから始まる／どこで止まる／上がるか下がるか』の3つ。入力形式や項目名はバージョン・画面で異なるので実機で確認する。\n\n✅ 確認：Start At=12:00・Stop At=00:00・Direction=Down になっている。",
        "img": "v4_14_006.jpg",
        "tip": "この3つを間違えると、表示形式が合っていてもタイマーとして使いにくくなる。"
      },
      {
        "h": "Formatを決める（まずはNN:SS）",
        "body": "FormatはTimerの値をどんな文字列で出すかの設定。NN:SS / HH:NN:SS / NN:SS.ZZZ などが扱える。簡易ゲームクロックは NN:SS（例 12:00 / 05:30 / 00:10）が分かりやすい。小数表示（.ZZZ）は桁が増え、Fontによっては数字の幅が揃わず揺れて見えるので、最初はNN:SSが安全。\n\n✅ 確認：表示が NN:SS 形式になっている。",
        "img": "v4_14_007.jpg"
      },
      {
        "h": "Start / Stop / Reset を Manual にする",
        "body": "最初の作例では Start / Stop / Reset の Method を Manual にする（Operatorが明示的に操作）。When Onlineにすると出した瞬間に動き出し、原因の切り分けがしにくい。注意：『Manualに設定する』ことと『実際にStartする』ことは別。StartはあとでWidget側の操作で実行する。Ctrl+1〜9などショートカット割り当てはKeyboard Mappingと競合しないか実機で確認。\n\n✅ 確認：Start / Stop / Reset の Method がすべて Manual になっている。",
        "img": "v4_14_008.jpg"
      },
      {
        "h": "Text ObjectのData SourceにWidgetをつなぐ",
        "body": "Clock_Textを選び、Text Objectの Data Source タブを開く。\nData SourceとしてWidgetを選び、一覧から GameClock_Timer を選ぶ。これでClock_Textにタイマーの値が表示される。\n直接「12:00」と打ちっぱなしにしない（それは固定表示）。\n表示されないときの確認順：\n・対象のTextを選択しているか\n・Data SourceでWidgetを選んだか\n・正しいWidget（GameClock_Timer）を指定したか\n・Formatは意図通りか\n・Font／Material／位置に問題はないか\n\n✅ 確認：Clock_Text にWidgetの値（12:00）が表示されている。",
        "img": "v4_14_009.jpg"
      },
      {
        "h": "Main Viewportで表示を確認する",
        "body": "接続できたらMain Viewportで値が出ているか確認。ここで見るのはデザインではなく『Widgetの値が表示されているか／Formatが意図通りか／文字が範囲に収まるか』。動きが見えないときは Viewport上部の Show or Hide Continuous Animations and Other Effects などの表示更新状態も確認。表示されている＝Startしている、ではない点に注意。\n\n✅ 確認：Main Viewportで値とFormatが意図通りに見えている。"
      },
      {
        "h": "Widget側のManual操作でStart→Stop→Reset",
        "body": "Widget側の操作でStartし、12:00 → 11:59 → 11:58 と減れば表示接続は成功。\n動かないときは、Text Objectのデザインより先に次を確認：\n・WidgetがStartしているか\n・MethodがManualになっているか\n・Start操作を実行したか\n・Start At・Directionが意図通りか\n次にStopで保持、Resetで開始値へ戻るかを確認する。\nResetは強力（本番中の誤操作で意図しない値に戻る）。「いつ／誰がResetしてよいか」「自動Reset（Reset on timer 等）が有効になっていないか」まで確認する。\n\n✅ 確認：Startで減り始め、Stopで止まり、Resetで12:00に戻る。"
      },
      {
        "h": "OnlineにしてTake/Offline/再Takeを確認する",
        "body": "Layoutで確認できたらSceneをOnlineにして、送出時の挙動を見る。Main Viewportで動いても、送出時に同じとは限らない。\n確認すること：\n・Onlineにしたとき時計は止まっているか\n・Manual Startまで動かないか\n・Offlineで止まる・保持・Resetのどれになるか\n・再Take時に意図しないReset・再Startが起きないか\n再Take時の値保持/ResetはScene属性やSequencer・Widgetの設定に依存するので必ず実機で確認し、Operatorが説明できる状態にしておく。",
        "img": "v4_14_010.jpg"
      }
    ],
    "checklist": [
      "3つの作り方のうち、簡易＝Clock Timer Widgetを選べている",
      "Text Objectは表示先、時間の値はClock Timer Widgetが持つ、と分けて作っている",
      "Start At / Stop At / Direction が意図通り（どこから・どこで止まる・増減）",
      "Manual設定と実際のStart操作を混同していない（表示≠Start）",
      "Reset のタイミングと権限、自動Resetの有無を確認した",
      "Online・Offline・再Takeで意図しないReset/再Startが起きないことを確認した"
    ]
  },
  {
    "id": "datalinq-practice",
    "title": "CSV／Excelでスコアや名前を流し込む",
    "subtitle": "DataLinqとWidgetsで手入力を減らす",
    "srcVol": 5,
    "srcChap": "第3・4章",
    "level": "中級",
    "minutes": 35,
    "goal": "外部の表（CSV/Excel）から選手名・スコア・チーム情報をText Objectへ流し込み、表を書き換えるだけで表示が変わる状態を作る。データソースは『誰が編集し、どう壊れるか』で選び、失敗時の見え方まで想定する。",
    "goalImg": "v5_03_001.jpg",
    "overview": "DataLinqの共通構造（データソース→キー→表示先）を押さえ、まずCSVで動かす。編集頻度が高いならExcel、構造化・外部連携ならJSON。仕上げにWidgets（Text List等）で切り替えも足せる。同梱の サンプルデータ_チーム.csv / サンプルデータ_名前と肩書き.csv で試せる。",
    "steps": [
      {
        "h": "DataLinqの共通構造を押さえる",
        "body": "DataLinqは『外部データを取り込み→キー（列や項目）で参照→Text ObjectやMaterialに表示』という共通構造。形式（CSV/Excel/JSON）が違っても骨格は同じ。まず『何の値を、どのキーで、どこに出すか』を決める。\n\n✅ 確認：「何の値を・どのキーで・どこに出すか」を言葉にできる。",
        "img": "v5_03_002.jpg"
      },
      {
        "h": "まずCSVで動かす",
        "body": "単純で追いやすいデータはCSVが向く。同梱の サンプルデータ_チーム.csv（TeamName / Abbr / ColorHex / LogoFile）や サンプルデータ_名前と肩書き.csv（Name / Title）を使う。DataLinqでCSVをデータソースとして読み込み、列名（キー）をText ObjectのData Sourceに割り当てる。文字コード・区切り・ヘッダー行の有無でつまずきやすいので、まず1件表示して確認。\n\n✅ 確認：CSVの1件目（チーム名や名前）がText Objectに表示された。",
        "img": "v5_03_003.jpg",
        "tip": "CSVは半角英数字の列名・UTF-8がトラブりにくい。1行目（ヘッダー）がキーになる。"
      },
      {
        "h": "行を切り替えて表示を変える",
        "body": "読み込んだ表の『どの行を表示するか』を切り替えると、名前やスコアが差し替わる。ローワーサードなら1件ずつ、スコアボードならHome/Awayの2件を割り当てる。表（CSV）側を書き換えて再読み込みし、表示が追従するか確認する。\n\n✅ 確認：行を切り替えると表示が差し替わり、CSVを書き換えて再読込すると追従する。"
      },
      {
        "h": "編集しやすさが要るならExcel、構造化ならJSON",
        "body": "現場担当者が頻繁に手編集するならExcelが選ばれやすい（ただし、どのシート・範囲・保存形式を読むかの読み取り方式を実機で確認）。項目が入れ子・外部システム連携ならJSON。断定より『現場で確認すべき観点』で選ぶ。\n\n✅ 確認：自分の現場ならどれを選ぶか、理由付きで説明できる。",
        "img": "v5_03_004.jpg"
      },
      {
        "h": "本番挙動（更新・失敗時）を決める",
        "body": "Live Update（自動更新）は便利だが全項目で使うものではない。Poll every（取得間隔）は短ければよいわけではない。Return Empty on Failure（失敗時に空を返す）で、データが取れないときの見え方が決まる。取れないとき前の値が残るのか空になるのかを想定して選ぶ。\n\n✅ 確認：データを読めなくしたとき（ファイル名変更など）の表示が想定どおり（空／前回値）。",
        "img": "v5_03_006.jpg",
        "tip": "『空データ時にどう見えるか』を必ず一度作って確認。Prepend/Appendを使う場合は空データ時の挙動に注意。"
      },
      {
        "h": "Widgetsで切り替えも足す（任意）",
        "body": "手入力を減らす仕上げとしてWidgetsが使える。Text Listで選択肢を持つ、Counterでスコアを増減、Clock Timerで時刻。Widgetは作っただけでは表示に出ず、Text ObjectのData Sourceに割り当てて初めて効く。DataLinq（外部データ）とWidget（現場操作の値）は分けて考える。\n\n✅ 確認：Widgetの値がText Objectに表示され、切り替えで変わる。",
        "img": "v5_04_006.jpg"
      },
      {
        "h": "本番前に確認する",
        "body": "データソースは『誰が編集し、どう壊れるか』で選ぶ。確認：想定する全データで正しく表示されるか／文字数が多い行でも崩れないか／データが取れない・空・欠番のときに大きく破綻しないか／編集ルール（列を消さない等）を担当者が守れるか。",
        "img": "v5_03_009.jpg"
      }
    ],
    "checklist": [
      "『何の値を・どのキーで・どこに出すか』を先に決めている",
      "CSVで1件表示→行切り替えで差し替わることを確認した",
      "形式（CSV/Excel/JSON）を『編集頻度・構造・連携』で選べている",
      "Live Update / Poll every / Return Empty on Failure の挙動を決めた",
      "空データ・欠番時の見え方を確認した",
      "Widgetを使う場合、Data Sourceへ割り当てて表示に反映している"
    ]
  },
  {
    "id": "stagger-text",
    "title": "Staggerで一文字ずつ出す見出し",
    "subtitle": "現場で読めるテキスト演出",
    "srcVol": 3,
    "srcChap": "第2章",
    "level": "中級",
    "minutes": 25,
    "goal": "文字が少しずつずれて登場する見出し。設定を作る→Scene Director上の対象へ配置→再生して確認、の3ステップで、Timing Offsetsで『文字ごと／単語ごと／行ごと』のずれを設計する。差し替わっても成立する演出にする。",
    "goalImg": "v3_02_001.jpg",
    "overview": "Stagger Animationは『きれいに作る』だけでなく『情報が差し替わっても成立する』演出を設計する道具。Track（何を動かすか）とKeyframe（動きの形）とTiming Offsets（ずれの単位）を分けて考える。",
    "steps": [
      {
        "h": "3ステップの流れを押さえる",
        "body": "Stagger Animationは①アニメーションの設定を作る②その設定をScene Director上の対象オブジェクト（Text ObjectやGroup）へ配置する③再生して見え方を確認する、の3つ。Scene ManagerでSceneやScene Groupを選ぶのは、動かしたいオブジェクトを含むシーンを選ぶため。\n\n✅ 確認：「①設定を作る→②配置する→③再生する」の3ステップを言える。",
        "img": "v3_02_004.jpg"
      },
      {
        "h": "対象と名前を決める",
        "body": "動かすText ObjectをScene Directorに追加する。NameとDescriptionは現場運用のために使う（後から見て何の動きか分かるように）。リアルタイムでは、きれいさだけでなく『あとから見ても分かる状態』が大事。\n\n✅ 確認：対象TextがScene Directorに載り、Name/Descriptionで用途が分かる。",
        "img": "v3_02_003.jpg"
      },
      {
        "h": "Trackで『何を動かすか』を決める",
        "body": "Trackは動かすプロパティ。Position.X/Y/Z（位置）、Rotation（回転）、Scale（拡大縮小）、Alpha（透明度）など。登場なら Alpha＋Position（フェードしながら少し動く）が定番。動かす対象だけTrackを持たせる。\n\n✅ 確認：動かすプロパティ（例 Alpha＋Position）だけにTrackがある。",
        "img": "v3_02_005.jpg"
      },
      {
        "h": "Keyframeで動きの形を作る",
        "body": "Keyframeは動きの形を決める。Clip Length（そのTrackの変化にかける長さ）とTotal Duration（全体尺）は分けて考える。尺を変えたら Recalculate Keyframe Positions で位置がずれていないか確認。\n\n✅ 確認：再生すると1つの塊として動く（まだ、ずれ無しでOK）。",
        "img": "v3_02_006.jpg",
        "tip": "Track Controlsは作業中の事故（誤って別Trackを動かす等）を減らすために使う。"
      },
      {
        "h": "Timing Offsetsでずれを作る（ここが中心）",
        "body": "Stagger Animationの中心はTiming Offsets。Character（文字ごと）／Word（単語ごと）／Line（行ごと）／Paragraph（段落ごと）で、どの単位でずらすかを決める。日本語見出しなら Character や Word でのずれが読みやすいことが多い。PivotはScaleやRotationで特に効く（回転・拡大の中心）。\n\n✅ 確認：Character／Word単位で文字が順番に出てくる。",
        "img": "v3_02_007.jpg"
      },
      {
        "h": "再生して読めるか確認する",
        "body": "実際に再生し、演出として気持ちよいかだけでなく『読めるか』を確認する。速すぎると文字が追えない。文字数が変わる差し替え（長い名前・短い名前）でも破綻しないかを見る。"
      }
    ],
    "checklist": [
      "設定を作る→対象へ配置→再生確認、の3ステップで進めた",
      "Name / Description を後から分かるように付けた",
      "動かすTrack（Alpha/Position等）を必要な分だけ持たせた",
      "Clip LengthとTotal Durationを分けて考え、尺変更後に再計算で確認した",
      "Timing Offsetsのずれ単位（Character/Word/Line/Paragraph）を選んだ",
      "文字数が変わっても読める速度・崩れないことを確認した"
    ]
  },
  {
    "id": "transition",
    "title": "Transitionで出入りを設計する",
    "subtitle": "正しく消えて、正しく更新できるSceneにする",
    "srcVol": 3,
    "srcChap": "第8章",
    "level": "中級",
    "minutes": 25,
    "goal": "Sceneの登場（In）だけでなく退場（Out）と更新（Back-to-Back）まで設計し、本番で残り方が読みにくくならないようにする。Layerと重なり順、外部制御での消え方まで想定する。",
    "goalImg": "v3_08_001.jpg",
    "overview": "Transitionは演出ではなく『送出状態の設計』。In/Out→Duration→用途ごとの判断、の順で整理し、『きれいに出るScene』ではなく『正しく消えるScene』を作る。Scene Director（動きの中身）とTransition Logic（条件でどのDirectorを使うか）を分けて考える。",
    "steps": [
      {
        "h": "Transitionが設計するものを理解する",
        "body": "Transitionは単なるエフェクトではなく、Sceneの出入りを破綻させないための設計項目。In（出る）だけでなく Out（消える）・更新（連続で内容が変わる）まで含む。\n\n✅ 確認：In／Out／更新の3つを設計対象として言える。",
        "img": "v3_08_003.jpg"
      },
      {
        "h": "In / Out をまず作る",
        "body": "Transition In / Out を設定する。Cut / Dissolve / Push / Distort などを用途で使い分ける。まずはInとOutの両方を必ず作る（Outを設計しないと本番で残り方が読みにくい）。\n\n✅ 確認：InとOutの両方が設定され、出して消すまでが成立している。",
        "img": "v3_08_004.jpg"
      },
      {
        "h": "Durationは現場テンポで決める",
        "body": "Durationは見た目の好みではなく現場テンポで決める。常駐テロップは自然にOut、緊急表示は即座に消せる経路、演出SceneはOutまで含めて見せ方を作る、スコア更新系は次の情報を邪魔しない長さに。\n\n✅ 確認：用途（常駐／緊急／演出）に合ったDurationになっている。",
        "img": "v3_08_005.jpg"
      },
      {
        "h": "更新（Back-to-Back）を設計する",
        "body": "同じSceneで内容が連続更新される（スコアや情報更新）なら、Back-to-Backで『更新の見え方』を設計する。毎回In/Outを打つのか、中身だけ差し替えるのかを決める。\n\n✅ 確認：連続更新したときの見え方が意図どおり（毎回In/Outか、差し替えか）。",
        "img": "v3_08_009.jpg"
      },
      {
        "h": "Scene DirectorとTransition Logicを分ける",
        "body": "Scene Directorは動きの中身を作る場所。Transition Logicは条件に応じてどのScene Directorを使うかを決める場所。単純なIn/Outで足りるならそれで済ませ、必要な複雑さに留める（作り込みすぎるとデータが読みにくくなる）。\n\n✅ 確認：どのScene Directorがいつ使われるかを説明できる。",
        "img": "v3_08_010.jpg",
        "tip": "本番前修正・別担当・複製・Layer変更・外部制御変更が起きる前提で、必要以上に高度にしない。"
      },
      {
        "h": "LayerとFramebuffer・外部制御まで見る",
        "body": "動きだけでなく重なり順（Layer / Framebuffer）まで見る。別Layerの状態に反応させるならScene Triggersを検討。外部制御（GPI / RossTalk / PBus等）で消す場合は、Transitionの想定と実際の消え方が一致しているか確認。\n\n✅ 確認：重なり順と、外部制御で消したときの動きが想定どおり。",
        "img": "v3_08_011.jpg"
      },
      {
        "h": "本番前の確認順序",
        "body": "In だけを見ず、更新・Out・Layer・外部制御まで含めて確認する。確認：出たあと正しく消えるか／連続更新が破綻しないか／重なり順が意図通りか／外部制御で消したとき想定通りか。",
        "img": "v3_08_014.jpg"
      }
    ],
    "checklist": [
      "In と Out の両方を作った（Outを設計している）",
      "Durationを現場テンポ・用途で決めた",
      "連続更新があるならBack-to-Backを設計した",
      "Scene DirectorとTransition Logicの役割を分けている",
      "Layer/Framebufferの重なり順を確認した",
      "外部制御での消え方が想定と一致することを確認した"
    ]
  },
  {
    "id": "endroll",
    "title": "スタッフロール（Roll）を作る",
    "subtitle": "Scene GroupでRoll/Crawlを設計する",
    "srcVol": 3,
    "srcChap": "第9・10章",
    "level": "中級",
    "minutes": 30,
    "goal": "スタッフ名・役職が縦に流れるエンドロール。『どう動かすか』より『どう直すか・どう運用するか』を先に決め、Global Marginsで安全に見える範囲を保ち、Loopの止め方まで設計する。",
    "goalImg": "v3_09_001.jpg",
    "overview": "Roll/Crawlは『動き』ではなく『運用』で考える。Scene Groupから作る（デザインのまとまり優先）かSequence側で作る（変更が多い運用向き）かをまず選ぶ。ここではScene Groupで縦Rollを作り、Direction・速度・余白・開始終了の空白・Loopを整える。",
    "steps": [
      {
        "h": "用途を先に決める",
        "body": "Scene Groupを作る前に『何を、どう流すか』を決める。スタッフロールならスタッフ名・役職を表示するSceneをまとめる。スポンサーRollならロゴ入りSceneをまとめる。地味だがここが一番大事。作るときは『どう動かすか』より『どう直すか（本番前の修正・別担当・再利用）』を先に考える。\n\n✅ 確認：何を・どの順で流すかが決まっている。",
        "img": "v3_09_003.jpg"
      },
      {
        "h": "Scene GroupとSequenceのどちらで作るか選ぶ",
        "body": "Scene Group＝デザインのまとまりを優先、テンプレート構造に近い場所で管理。Sequence側（Take Item Group）＝内容変更が多い運用向き、送出の並びで管理。今回はScene Groupで作る。どちらでも『あとから直す人が理解できる構造』にする。\n\n✅ 確認：Scene Groupで作る理由を言える。",
        "img": "v3_09_006.jpg"
      },
      {
        "h": "現場で分かる名前を付ける",
        "body": "Scene Groupにも中のSceneにも、後から見て分かる名前を付ける（例：EndRoll_Staff）。名前が曖昧だと、修正・再利用の段階で誰も触れなくなる。\n\n✅ 確認：EndRoll_Staff など、後から見て分かる名前になっている。",
        "img": "v3_10_005.jpg"
      },
      {
        "h": "EffectでRoll（縦）かCrawl（横）を選ぶ",
        "body": "縦に流すのがRoll、横に流すのがCrawl。スタッフロールはRoll。Effectで種類を選び、Directionで視線の流れ（下から上など）を決める。\n\n✅ 確認：Roll（縦）で、意図した方向に流れる。",
        "img": "v3_10_003.jpg"
      },
      {
        "h": "Duration（速度・時間感）を決める",
        "body": "まずSpeedやSeconds（秒）で大きな見え方を作り、必要に応じてFrames（フレーム）で詰める。速すぎると読めず、遅すぎると間延びする。読みやすさ優先で。\n\n✅ 確認：最後まで読める速度になっている。",
        "tip": "最初はSpeed/Secondsでざっくり、そのあとFramesで微調整。"
      },
      {
        "h": "Global Marginsで安全な範囲を保つ",
        "body": "Global Marginsで、画面端に対して安全に見える範囲を作る。テロップが端で切れたり、はみ出したりしないための運用上の設定。\n\n✅ 確認：画面端で文字が切れず、安全な範囲に収まっている。",
        "img": "v3_10_006.jpg"
      },
      {
        "h": "開始・終了の空白とLoopを設計する",
        "body": "Blank Page on Start / End で始まりと終わりを整える（いきなり文字が入る／唐突に切れるのを防ぐ）。Loopは便利だが『止め方』まで設計する（本番でどう止めるか決めずにLoopしない）。Ease In / Outは気持ちよさより読みやすさで判断。\n\n✅ 確認：開始・終了が唐突でなく、Loopの止め方が決まっている。"
      },
      {
        "h": "本番前に確認する",
        "body": "確認：最後まで読める速度か／端で切れず安全範囲に収まるか／開始と終了が唐突でないか／Loopする場合に意図通り止められるか／Per Scene Lightingなどで見え方が変わらないか。差し替え（名前追加）しても崩れないかも見る。",
        "img": "v3_10_009.jpg"
      }
    ],
    "checklist": [
      "『どう動かすか』より『どう直すか・運用するか』を先に決めた",
      "Scene GroupとSequenceのどちらで作るか選び、理由が説明できる",
      "後から分かる名前を付けた",
      "速度は読みやすさ優先（Speed/Seconds→Framesで調整）",
      "Global Marginsで端で切れない",
      "Loopの止め方・開始終了の空白まで設計した"
    ]
  },
  {
    "id": "mask",
    "title": "Maskで見せる範囲を作る",
    "subtitle": "隠す・抜く・見せる範囲を設計する",
    "srcVol": 2,
    "srcChap": "第14章",
    "level": "中級",
    "minutes": 25,
    "goal": "四角い表示範囲（ワイプ／切り抜き）を作り、その範囲を動かせるようにする。『消す』ではなく『見せる範囲を決める』考え方で、本番で調整が要る値だけをPublishして運用を壊さない。",
    "goalImg": "v2_14_001.jpg",
    "overview": "Maskは消す機能ではなく『見せる範囲を決める』考え方。Layer Objectでまとめる→Box Maskで四角い範囲→Scene Directorで動かす→調整が要る値だけSequencerにPublish、の順。",
    "steps": [
      {
        "h": "Maskの考え方を押さえる",
        "body": "Maskは『消す』のではなく『見せる範囲を決める』。何を見せて何を隠すかを先に決めてから作ると迷わない。使う前に『どの範囲を、いつ、どう見せたいか』を確認する。\n\n✅ 確認：見せる範囲と隠す範囲を言葉にできる。",
        "img": "v2_14_003.jpg"
      },
      {
        "h": "Layer Objectで対象をまとめる",
        "body": "Maskをかけたい複数のObjectを Layer Object でまとめると、まとめて範囲制御しやすい。まず対象をLayerに入れる。\n\n✅ 確認：対象ObjectがLayer Objectにまとまっている。",
        "img": "v2_14_006.jpg"
      },
      {
        "h": "Box Maskで四角い表示範囲を作る",
        "body": "Box Maskで四角形の表示範囲を作る。範囲の内側だけが見える。ワイプや切り抜き表示の基本形。画像のアルファで抜きたい場合は Mask Material とアルファ素材を使う考え方もある。\n\n✅ 確認：Box Maskの内側だけが見えている。",
        "img": "v2_14_007.jpg",
        "tip": "まずBox Maskで四角の範囲を確実に作ってから、必要ならアルファ素材の抜きへ進む。"
      },
      {
        "h": "Scene DirectorでMaskを動かす",
        "body": "Scene Directorで、Maskの範囲や位置を時間で動かせる（ワイプイン等）。範囲が動くことで『見えてくる／隠れる』演出になる。\n\n✅ 確認：再生すると範囲が動き、ワイプとして見える。",
        "img": "v2_14_009.jpg"
      },
      {
        "h": "調整が要る値だけPublishする",
        "body": "本番で調整する値だけをSequencerにPublishする。判断基準：本番中に本当に調整するか／制作調整用の値を本番データに残していないか／運用者が意味を理解できる項目名か／触ってはいけない値まで公開していないか／初期値に戻せるか／Take Inspectorで分かりやすいか。\n\n✅ 確認：Publishした値だけがTake Inspectorに出て、意味が分かる名前になっている。",
        "img": "v2_14_010.jpg"
      },
      {
        "h": "本番前チェックと切り分け",
        "body": "確認：見せたい範囲だけが見え、隠したいものが隠れているか／範囲を動かしたとき破綻しないか／Publishした値が運用者に分かるか。うまくいかないときは、Layer構成・Mask種別・重なり順の順で切り分ける。",
        "img": "v2_14_011.jpg"
      }
    ],
    "checklist": [
      "『消す』ではなく『見せる範囲を決める』で設計している",
      "対象をLayer Objectでまとめた",
      "Box Maskで四角い表示範囲を作れた",
      "Scene Directorで範囲を動かせる",
      "本番で調整する値だけをPublishし、触らせたくない値は隠した",
      "初期値へ戻せる／項目名が運用者に分かる"
    ]
  },
  {
    "id": "gradient",
    "title": "Gradientで読みやすい色面を作る",
    "subtitle": "装飾ではなく、現場で使える色面を設計する",
    "srcVol": 2,
    "srcChap": "第10章",
    "level": "初級",
    "minutes": 20,
    "goal": "文字が載る部分を少し暗くした『読ませるための座布団』や、端に向かって透明にして映像になじむパネルを作る。派手さではなく、コントロールできる色面を目的から設計する。",
    "goalImg": "v2_10_001.jpg",
    "overview": "Gradientは4色のリニアグラデーション（透明度も扱える）。『きれいな背景』ではなく『情報が読みやすい色面』として使う。目的を決める→文字の載る場所を先に置く→色と透明度に役割を持たせる→少しずつ調整、の順。",
    "steps": [
      {
        "h": "目的を先に決める",
        "body": "Gradientは4色のリニアグラデーションで、透明度も含められる。作る前に目的を決める：上を少し明るく下を暗く／文字の後ろだけ暗くして読みやすい座布団／端に向かって透明にして映像になじませる、など。『きれいな背景』とだけ考えない。\n\n✅ 確認：この色面の目的（なじませ／文字の座布団など）を言える。",
        "img": "v2_10_003.jpg"
      },
      {
        "h": "情報が載る場所を先に置く",
        "body": "色より先に、文字や数字が載る位置を決める。仮の文字を先に置いてから色面を作ると、あとで読みにくくならない。位置が決まらないまま色を作ると、文字を載せたとき破綻しやすい。\n\n✅ 確認：仮の文字が置かれ、載る位置が決まっている。",
        "img": "v2_10_004.jpg"
      },
      {
        "h": "4色で役割を持たせる",
        "body": "4色は派手にするためではなく、明るさや色味の変化に役割を持たせるために使う。上下だけ明るさを変える、左右は同じにして縦方向の変化だけ作る、片側だけ暗くして文字置き場を作る、など。\n\n✅ 確認：4色それぞれの役割を説明できる。",
        "img": "v2_10_005.jpg"
      },
      {
        "h": "透明度で『なじませる』と『読ませる』を両立",
        "body": "透明度にも役割を持たせる。端だけ透明にして映像になじませつつ、文字が載る部分は不透明寄りにして読ませる。角1か所だけ透明度を変えて抜け感を作る、といった使い方もできる。\n\n✅ 確認：端はなじみ、文字が載る部分は読める濃さになっている。",
        "img": "v2_10_006.jpg",
        "tip": "透明度は『なじませる』と『読ませる』のバランス。文字の下は読める濃さを確保する。"
      },
      {
        "h": "少しずつ変えて確認する",
        "body": "設定は少しずつ変える。派手に作るより、コントロールできる状態で作るのが大事。ローワーサードなら文字の下を暗く、スコア表示なら数字が読める濃さ、チームカラーは強すぎない範囲でなじませる。\n\n✅ 確認：実際に文字を載せた状態で読める。",
        "img": "v2_10_007.jpg"
      }
    ],
    "checklist": [
      "作る前に目的（読ませる/なじませる）を決めた",
      "文字・数字の載る場所を先に置いてから色を作った",
      "4色に役割を持たせた（変化の方向を絞った）",
      "透明度で『なじませる』と『読ませる』を両立できている",
      "文字の下が読める濃さになっている",
      "派手さより、コントロールできる色面になっている"
    ]
  },
  {
    "id": "clock-datetime",
    "title": "現在時刻・カウントダウンを表示する",
    "subtitle": "Date Timeで『変化する情報』として時間を扱う",
    "srcVol": 4,
    "srcChap": "第5章",
    "level": "中級",
    "minutes": 30,
    "goal": "現在時刻の表示と、試合・イベント開始までのカウントダウンを作る。時間を『文字』ではなく『変化する情報』として扱い、目標時刻を作って現在時刻との差を出し、見やすい文字列に整える。",
    "goalImg": "v4_05_001.jpg",
    "overview": "Clockだけで済む場面（現在時刻をそのまま出す）と、Date Timeブロックが要る場面（目標時刻との差＝カウントダウン等）を切り分ける。Clockで現在時刻→Encode Date Timeで目標時刻→Time Deltaで差→Format Date Timeで整える、が基本の流れ。",
    "steps": [
      {
        "h": "時間を『変化する情報』として捉える",
        "body": "実務の時間表示（開始時刻・開始日・カウントダウン・曜日・一定時刻での切替）は『時間が変化する』前提で作る。完成した1枚の絵ではなく、値が変わっても成立する仕組みを作る。\n\n✅ 確認：作る表示が「変化する情報」であることを説明できる。",
        "img": "v4_05_002.jpg"
      },
      {
        "h": "ClockかDate Timeブロックかを切り分ける",
        "body": "現在時刻や日付をそのまま出すだけならClockで足りる。『目標時刻との差（カウントダウン）』『日時を分解して曜日を出す』『指定した年月日から日時を作る』などはDate Time系ブロックが要る。\n\n✅ 確認：Clockだけで足りるか、Date Time系ブロックが要るか判断できた。",
        "img": "v4_05_003.jpg"
      },
      {
        "h": "現在時刻をそのまま出す（Clock）",
        "body": "まず現在時刻の表示から。Clockで現在時刻を取得し、Format（またはFormat Date Time）で見やすい文字列に整えてText Objectに出す。時・分・秒のうち必要な桁だけ出す。\n\n✅ 確認：現在時刻がTextに表示され、秒が進んでいる。",
        "img": "v4_05_004.jpg"
      },
      {
        "h": "目標時刻を作る（Encode Date Time）",
        "body": "カウントダウンには目標時刻が要る。Encode Date Timeで、年・月・日・時・分・秒から試合開始時刻などの目標日時を組み立てる。\n\n✅ 確認：Encode Date Timeから目標日時が出力されている。",
        "img": "v4_05_009.jpg",
        "tip": "月末±1か月のような境界（1/31の1か月後など）は期待通りになるか実機で確認。"
      },
      {
        "h": "差を計算して残り時間を出す（Time Delta）",
        "body": "Clockで取った現在時刻と、Encodeで作った目標時刻を Time Delta に渡して差を計算する。Days / Hours / Minutes / Seconds を使って残り時間を表示すれば、開始までのカウントダウンになる。\n\n✅ 確認：残り時間（目標−現在）が表示され、1秒ごとに減っていく。",
        "img": "v4_05_012.jpg"
      },
      {
        "h": "表示用に整える（Format Date Time）",
        "body": "Format Date TimeでDate Timeを表示用の文字列に整える。曜日が要るなら Day of the Week で取り出す。桁数が変わると幅が動くので、Text Objectの幅と揃えを確認する。\n\n✅ 確認：表示形式が意図どおりで、桁が変わっても幅が崩れない。",
        "img": "v4_05_010.jpg"
      },
      {
        "h": "本番前に確認する",
        "body": "確認：現在時刻が正しく更新されるか／カウントダウンが0に近づくときの表示が破綻しないか／桁数が変わっても揃うか／タイムゾーンや基準時刻が意図通りか。値が変化し続ける前提で、しばらく置いて確認する。",
        "img": "v4_05_017.jpg"
      }
    ],
    "checklist": [
      "時間を『変化する情報』として扱っている",
      "Clockで足りるか、Date Timeブロックが要るかを切り分けた",
      "Encode Date Timeで目標時刻を作れた",
      "Time Deltaで差を出し、残り時間を表示できた",
      "Format Date Timeで見やすく整え、桁揺れを確認した",
      "しばらく動かして更新・境界の破綻がないことを確認した"
    ]
  },
  {
    "id": "render-view-monitor",
    "title": "Render Viewで仮想モニターを作る",
    "subtitle": "Sceneを素材化して演出に組み込む",
    "srcVol": 2,
    "srcChap": "第4章",
    "level": "中級",
    "minutes": 30,
    "goal": "別Sceneで作った情報表示（スコアや選手カード）を、演出Scene内のQuad＝仮想モニターに貼って表示する。素材Scene側を直すと演出側にも反映される「Sceneの部品化」を体験する。",
    "overview": "「素材Sceneを用意」「貼り先のQuadを置く」「Render View Shaderを追加」「Resolutionを決める」「収まりを調整」「更新と参照関係を確認」の順で進めます。",
    "steps": [
      {
        "h": "素材になる情報Sceneを用意する",
        "body": "表示したい情報（例：スコア表示や選手カード）を、独立したSceneとして作る。名前は SRC_ScorePanel のように「部品」であることが分かる名前にする。文字が読める大きさで作り、背景は透過か単色にしておくと、貼ったときに扱いやすい。\n\n✅ 確認：素材Sceneが単体で正しく表示される。演出側のSceneと同じ名前にしない（同名だとどちらが素材か分からなくなる。例：素材=SRC_ScorePanel／演出=RV_Monitor）。"
      },
      {
        "h": "演出Scene側に貼り先のQuadを置く",
        "body": "仮想モニターとして使うQuad Objectを演出Sceneに置き、Monitor_Main など役割が分かる名前を付ける。少し角度を付けて置くと「画面の中のモニター」らしく見える。\n\n✅ 確認：Quadが意図した位置・角度で置かれている。"
      },
      {
        "h": "MaterialにRender View Shaderを追加する",
        "body": "Material Editorで新しいMaterialを作り、Add Shader > Render View を選ぶ。Scene / Camera Source で素材Sceneと使用するカメラを指定し、このMaterialをQuadに割り当てる。\n\n✅ 確認：Quadの面に素材Sceneの絵が表示される。",
        "tip": "表示されないときは、素材Sceneの指定→カメラの指定→Materialの割り当て先、の順に確認する。素材側のCameraはOrtho Cameraを選ぶと、パネルの文字が歪まず「読ませる画面」になる（第3巻のCamera選びの実践）。"
      },
      {
        "h": "Resolutionを使うサイズから決める",
        "body": "Render ViewのResolution（Width / Height）を、最終的に画面でどの大きさに見えるかから決める。実機での目安（1920×1080のパネルを大画面LEDに貼った場合）：100×100＝明確にぼけて読めない／480×270＝やや甘い／1920×1080＝鮮明。高すぎると描画負荷、低すぎると文字がぼける。\n\n✅ 確認：一度100×100まで落としてぼけを体感し、文字が読める解像度に戻す。"
      },
      {
        "h": "Texture Coordinatesで収まりを調整する",
        "body": "貼った絵の位置・スケールをTexture Coordinatesで整え、パネルからのはみ出しや余白を調整する。\n\n✅ 確認：素材の端がQuadに正しく収まっている。"
      },
      {
        "h": "更新と参照関係を確認する",
        "body": "素材Scene側の文字や色を変更し、演出Scene側の仮想モニターに反映されることを確認する。\n【実機確認済み】素材Sceneをリネームしても、Render View MaterialのScene参照は自動で追従する（名前の文字列ではなく内部参照。リネームで壊れない）。ただし削除は別なので、素材Sceneを消す前は使用先を必ず確認する。\n最後に「どのSceneが、どのMaterialで、どのObjectに使われているか」を説明できる状態にしておく。\n\n✅ 確認：素材側の変更が仮想モニターに反映される。リネームしても表示が維持される。",
        "tip": "Render Viewの多用は参照関係を複雑にする。「部品化する理由」を言えるものだけに使う。"
      }
    ],
    "checklist": [
      "素材SceneとMaterialに「部品」と分かる名前が付いているか",
      "Resolutionが使うサイズに合っているか（過剰・不足なし）",
      "貼った状態で文字が読めるか",
      "演出Scene全体の負荷に問題がないか",
      "本番中に触る値と制作時に固定する値が分かれているか",
      "素材Sceneを消したり改名したときの影響範囲を把握しているか"
    ]
  },
  {
    "id": "json-playerlist",
    "title": "JSONで選手リストを回す",
    "subtitle": "Table Presetsで階層データを表として扱う",
    "srcVol": 5,
    "srcChap": "第3章",
    "level": "中級",
    "minutes": 40,
    "goal": "選手リストのJSONをDataLinqで読み込み、選手名・背番号・ポジションをTextに表示する。さらにDataLinq Keyを使って「キーを1つ変えると行全体（名前・番号・ポジション）が連動して切り替わる」現場運用の形まで作る。素材は 13_JSON_PlayerList フォルダの players.json 一式を使用。",
    "overview": "「JSONを用意」「DataLinq ServerでSource追加（Encoding=UTF-8が重要）」「ツリーからTextに割り当て」「Table Presets（任意）」「DataLinq Keyで行連動」「Sequencer/外部からKey変更」「更新確認」「壊れたデータ確認」の順です。",
    "steps": [
      {
        "h": "サンプルJSONを用意する",
        "body": "素材フォルダ 13_JSON_PlayerList の players.json を使う（UTF-8・BOMなし）。構造は team > players[] > name / name_en / number / position。6人目はわざと超長い名前にしてあり、幅崩れの確認に使える。\n\n✅ 確認：エディタで開けて、構造（players配列の中に選手オブジェクト）を説明できる。"
      },
      {
        "h": "DataLinq ServerでJSON Sourceを追加する",
        "body": "XPression DataLinq Server（XPression本体とは別ウィンドウ）で Add DataLinq Source →一覧から「JSON DataLinq Source」（Provides access to JSON data files）を選びOK。\nJSON Linq - Configuration で：\n・File Path：players.json を指定\n・Encoding：ASCII（既定）→ UTF-8 に必ず変更（ASCIIのままだと日本語が文字化けする）\n・更新方式：ローカルファイルなら Wait for file change events（画面注記どおりネットワークドライブでは非推奨）、または Poll every 秒指定\n\n✅ 確認：Sourceがエラーなく追加され、EncodingがUTF-8になっている。",
        "tip": "Enable Loggingを入れておくと、後でトラブルを追いやすい。"
      },
      {
        "h": "Table Presetsで「表（ファイル）」を登録する",
        "body": "Textに割り当てる前に先にやっておく（後の行連動でTable指定が正しくないと動かないため実質必須）。Table Presetsは「JSON内の階層を指定する」ものではなく、複数のJSONファイルをName＋File Pathで登録しておき、データ参照時のTable一覧で切り替えられるようにする仕組み（設定画面の説明にも「browsing for dataのTablesドロップダウンに出るTableの一覧」とある）。\n手順：\n① Settingsタブで Enable Table Presets にチェック → Table Presets タブを開く\n② Add → Name列に名前、File Path列の「…」でJSONファイルを指定\n③ 同梱サンプルなら次の4つを登録する（→の右はファイル名。File Pathには「…」で選んだ絶対パスが入る。相対パスは前提にしない）：\nPlayers_Player → players.json\nPlayers_Short → players_short.json\nPlayers_MissingName → players_missing_name.json\nPlayers_Empty → players_empty.json\n「共通プレフィックス（Players_）＋差分名」で揃えるのがコツ。あとでKeyによるTable切替（手順5の発展）が綺麗に組める。\n④ OKで保存 → TextのBrowse（Select DataLinq Field）のTable一覧に4つが並び、選ぶだけで参照ファイルが切り替わる\n\n✅ 確認：TableをPlayers_Emptyに切り替えると表示が空になり、Players_Playerに戻すと選手が復帰する。",
        "tip": "Name列だけ入れてFile Pathが空だと機能しない。File Pathは絶対パスになるため、別PCへ移すと崩れる。本番では全マシン共通の固定フォルダ（例 C:\\XPression_Data\\）にデータを置いて、そのパスで登録するのが定石（第6巻「納品で崩れない」参照）。"
      },
      {
        "h": "Textに割り当てる（Tableを選んでツリーから指定）",
        "body": "XPression側で選手名用のText Objectを選び、Object Inspectorの Data Source タブ → DataLinq を選択 → Set。\nSet DataLinq Properties で Enabled にチェック → DataLinq一覧からこのJSONソースを選び → Browse。\nSelect DataLinq Field で、まず Table のドロップダウンで Players を選び、ツリーで players の中の name を選ぶ（上部Selectionに Column: players / Row: name / Table: Players と表示される）→ OK。\n背番号用Textには number、ポジション用には position を同様に割り当てる。\n\n✅ 確認：「佐藤 大輝」「1」「GK」が文字化けせずに表示され、Table欄がPlayersになっている。",
        "tip": "化けたときは手順2のEncoding（UTF-8か）を最初に疑う。Tableが違うと後のKey連動が動かないので、ここで必ず確認。"
      },
      {
        "h": "DataLinq Keyで行をまとめて切り替える（ここが肝・実機検証済み）",
        "body": "目的：キーを1つ変えるだけで、名前・背番号・ポジションが同じ選手の行にそろって切り替わる。\n【確定事項（実機検証済み）】行指定は山かっこ＋1始まりの行番号（2人目＝players<2>）。値検索の書式（players<number=7>など）は通らない。players<%PlayerNo%> が正解。Table欄が正しく（Players）設定されていないと動かない。\n① Object ManagerでSceneを選択 → Object Inspectorの DataLinq Keys タブ → Add。Name に PlayerNo（Published にチェック、Value に初期値 2）。\n② 各Text（name / number / position）の Set DataLinq Properties を開き、Column欄を players<%PlayerNo%> にする（%で囲む）。RowとTableはそのまま。\n③ KeyのValueを変えて反映を確認する。反映タイミングは：プレビュー＝即時／オンエア中のScene＝一度Offlineにして再TAKEした時（テキスト差し替えと同じ鉄則）。\n\n✅ 確認：Key値を2→3に変えると、プレビューが即時に高橋 悠人／11／FWへ連動して切り替わる。オンエア反映は再TAKEで。",
        "tip": "範囲外の行番号（例 99）の挙動はWrap Indicesの設定で変わる（ON＝有効な行に巻き戻る／OFF＝欠損扱い）。【発展・実機検証済み】Table欄を Players_%TeamTable% の形にし、DataLinq Keysに TeamTable（値は Player / Short / Empty などの差分だけ）を追加すると、参照ファイルもKeyで切り替えられる。行のPlayerNoと合わせ、Key2つで「どの表の何行目」を完全制御できる。"
      },
      {
        "h": "Sequencerと外部（RossTalk）からKeyを変える",
        "body": "PublishedにしたKeyはSequencer（Take InspectorのTemplate Data）に公開され、オペレーターはそこに行番号を入れるだけで選手が切り替わる。\n外部制御からはRossTalkの DATALINQKEY コマンドで同じことができる。\n書式：DATALINQKEY [takeid]:[キー名]:[値]\n\n実機検証済みの確実なシーケンス（Take ID 0002 を3行目の選手＝高橋 悠人に差し替えて送出）：\nDATALINQKEY 0002:PlayerNo:3　←①中身を高橋に差し替える\nCUE 0002　←②新しい値でTake Itemをキュー（積み込み）\n（200ms程度待つ）　←③キュー完了を待つ\nTAKE 2　←④画面に出す（送出）\n\n値を変えた直後にいきなりTAKEすると反映が間に合わないことがあるため、CUEと短いPauseを挟むのが確実。キー名は公開した名前と完全一致させる。\n\n✅ 確認：Take InspectorでKey値を変えると表示が切り替わる。上のシーケンスを外部から送ると、新しい選手で確実に送出される。",
        "tip": "Keyの値はTake Item単位で保持される。同じSceneから複数のTake Itemを作れば、選手A用・B用として別々の行番号を持たせられる（外部システム連携の放送定番構成）。Stream Deck系ツール（Companion等）ならこの4手順を1ボタンに登録できる。"
      },
      {
        "h": "データ更新を確認する",
        "body": "players.json の値（名前や背番号）を書き換えて保存し、表示への反映を確認する。反映されないときは手順2の更新方式（Wait for file change events / Poll every）を確認する。\n\n✅ 確認：保存後、想定したタイミングで表示が変わる。"
      },
      {
        "h": "壊れたデータで挙動を見る（Return Empty on Failureが鍵）",
        "body": "手順3でTable Presetsに登録した Players_Short（選手が減った）／Players_MissingName（nameが無い選手）／Players_Empty（空配列）にTableを切り替えて、表示を確認する。\n【実機で確認された危険な挙動】各Textの Return Empty on Failure がOFFのままだと、行やデータが見つからないとき、Keyに入れた数字など意図しない値がそのまま画面に出る。\n対策：DataLinqリンクした各Textの Set DataLinq Properties で Return Empty on Failure にチェック（ON）→ 欠損時は空欄になる。\nWrap Indicesとの関係も整理しておく：ON＝範囲外の行番号を有効な行に巻き戻す（何かしら表示される）／OFF＝範囲外は欠損扱い。「絶対に間違った選手を出したくない」ならWrap Indices OFF＋Return Empty ONの組み合わせが安全側。\n\n✅ 確認：Return Empty on Failure をONにすると、欠損時に変な値ではなく空欄になる。",
        "tip": "空欄になったときにレイアウトが破綻しないか（座布団だけ残る等）も見ておく。原因調査には Enable Logging / Data Logger を使う。"
      }
    ],
    "checklist": [
      "EncodingがUTF-8になっているか（既定ASCIIのままにしない）",
      "DataLinq Key名（PlayerNo等）が意味の分かる名前でPublishされているか",
      "Table Presets（Name＋File Path）の切替がTable一覧で機能するか",
      "空データ・項目欠落時の表示を確認したか",
      "更新方式（file change / Poll）を本番機で確認したか",
      "項目名や階層の変更ルールを外部システム側と合意しているか"
    ]
  },
  {
    "id": "rosstalk-take",
    "title": "RossTalkで外部からTakeする",
    "subtitle": "外部制御の入口をTCPで体験する",
    "srcVol": 5,
    "srcChap": "第6章",
    "level": "中級",
    "minutes": 30,
    "goal": "Smart GPI / RossTalkをTCPで受けられるようにし、外部からTAKE / SEQI / SEQOなどのコマンドでTake Itemを出し入れする。外部制御の基本動作と消し方の違いを体験する。",
    "overview": "「受け口を有効化」「Take Itemを用意」「TCPで接続」「TAKEで出す」「SEQI/SEQOを試す」「片付け系コマンド」「GPIコマンド（任意）」の順です。※同一PC（localhost）でも検証可。素材フォルダ 14_RossTalk に実機検証済みのDashBoardサンプルパネル（.grid）を同梱しています。",
    "steps": [
      {
        "h": "Hardware SetupでRossTalkを有効化する",
        "body": "メニューの Edit → Hardware Setup を開き、「GPI / Tally Boards」タブで Add → Brand一覧から Smart GPI / RossTalk を選ぶ（一覧にはPBus / Serial GPI (CTS/DSR) / TSL Tallyも並ぶ）。\nSmart GPI / RossTalk Setup で State を Enabled、Mode を TCP にし、Incoming Network Settings の TCP Port（例 7788）を控える。設定後、一覧の State が Active になればOK。\n\n✅ 確認：State=Active・Mode=TCP・ポート番号をメモした。",
        "tip": "本番機ではWindowsファイアウォールの受信許可も確認する。Keyboard / GPI Mappingも同じEditメニューにある。"
      },
      {
        "h": "送出対象のTake Itemを用意する",
        "body": "Sequencerにテスト用SceneのTake Itemを置き、Take IDを決める（例 0001）。出し先のフレームバッファとレイヤーも確認しておく。\n\n✅ 確認：手動のTake（テンキー＋）で正しく出る状態になっている。"
      },
      {
        "h": "外部からTCP接続する（DashBoardが実戦的）",
        "body": "送信側はRoss公式の無料ツール DashBoard のCustomPanelが実戦的：ボタンを作り、TaskにRossTalkを選ぶ→Connection=Custom、Host=XPressionのIPアドレス（同一PCならlocalhost）、Port=手順1のポート番号。CommandはドロップダウンにTAKE / CUE / SEQI…が用意されており、Take IDなどを入れるだけ。\nターミナルソフト（PuTTYのRaw接続等）で直接コマンドを打つ方法もある（その場合はCR/LF終端に注意）。\n\n✅ 確認：ボタン実行（または接続）がエラーなく通る。",
        "tip": "DashBoardならPause（待ち時間）もタスクとして挟めるので、「DATALINQKEY→CUE→Pause 200ms→TAKE」のような複数コマンドを1ボタンに登録できる。素材フォルダ 14_RossTalk の検証済みサンプルパネルを開けば、Host/Portを直すだけで全ボタンを試せる。"
      },
      {
        "h": "TAKEで出す",
        "body": "「TAKE 1」または「TAKE 1:0:7」（TakeID:フレームバッファ:レイヤー）を送信し、オンエアされることを確認する。TAKEはSequencerのフォーカス（選択行）が動かないのが特徴。\n\n✅ 確認：コマンド送信でSceneが出て、Sequencerの選択行は動かない。"
      },
      {
        "h": "SEQIとSEQOを試す",
        "body": "SEQI 1（テンプレ定義の出力先に出る。フォーカスがその項目へ移動）と、SEQO 1（そのTake IDを下げる）を送信して、TAKEとの違いを確認する。\n\n✅ 確認：SEQIでは選択行が移動し、SEQOで消える。"
      },
      {
        "h": "片付け系コマンドを確認する",
        "body": "LAYEROFF 0000:7（そのレイヤーのSceneをOutトランジションで下げる）、CLFB 0000（フレームバッファをクリア）、CLRA（全フレームバッファをクリア）を試し、消え方の違いを見る。\n\n✅ 確認：LAYEROFFはOutの動きで消え、CLFB / CLRAは即座にクリアされる。",
        "tip": "CLRAは全部消える強いコマンド。本番での使いどころ（使わないという判断も含めて）を決めておく。"
      },
      {
        "h": "GPIコマンドで機能を呼ぶ（任意・物理機器は不要）",
        "body": "RossTalkの「GPI 1」はソフト的にGPI入力を叩くシミュレートコマンドで、物理的なGPI機器は不要。\n① Edit → Keyboard / GPI Mapping で、シミュレートGPI入力1に機能（例：Sequencerの選択を進める）を割り当てる\n② DashBoardのRossTalkタスク（またはターミナル）から GPI 1 を送信\n\n✅ 確認：GPIコマンドで、割り当てた機能が実行される。"
      }
    ],
    "checklist": [
      "ポート番号とファイアウォールを本番機で確認したか",
      "コマンドのCR/LF終端を送信側が守っているか",
      "Take IDの付番ルール（範囲で意味を持たせる）が決まっているか",
      "TAKEとSEQIのフォーカス挙動の違いを運用者が説明できるか",
      "本番中に接続が切れたことに気づける手順があるか",
      "誤送信時のリカバリ（SEQO / LAYEROFF）を確認したか"
    ]
  }
];
