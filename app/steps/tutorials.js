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
  "goal": "名前と肩書きの2段ローワーサード。短い名前でも長い名前でも背景が文字に合わせて気持ちよく収まり、いくら長くても安全エリアからはみ出さない上限を持つ。肩書きが空のときは行を出さず名前だけできれいに見せ、Online / Offline / Take で安定して出し隠しできる。作例：Name_TXT＋Title_TXT の2段。Auto Squeeze（Max Width 1200・Width Only）＋Character Limits、Title の空判定は IsEmpty→Not→Title行の Visible。",
  "goalImg": "v4_90_001.jpg",
  "overview": "「器を作る」→「ネイティブで幅の土台を作る」→「Visual Logicで判断だけ足す」→「出す・隠すを整える」。ネイティブで土台ができた時点で見た目はもう壊れず、Visual Logicは最後の仕上げの判断だけを乗せる。",
  "steps": [
   {
    "h": "器を作る（背景とText Objectの親子）",
    "body": "この作例の器は「名前Text＋その子の背景」と「肩書きText」。\n① Object Library の Text をSceneにドラッグし、名前用Textを作って Object Manager で Name_TXT に改名\n② 背景用オブジェクト（QuadやBackground）を追加し、Object Manager上で Name_TXT の子（First Child）になる位置へドラッグして親子化（この親子関係が後のAuto Scaleで効く）\n③ 肩書き用Textを追加して Title_TXT に。仮の名前・肩書きを入れておく\n④ 背景の色はMaterialで持たせる（色を「値」として持つと、後でチームカラー差し替えが楽）\n\n✅ 確認：Object Managerで Name_TXT の子に背景がぶら下がり、名前だけで役割が分かる。",
    "img": "v4_90_002.jpg",
    "h_en": "Build the container (background parented to the Text Object)",
    "body_en": "The container here is \"name Text + its child background\" plus \"title Text\".\n① Drag a Text from the Object Library into the Scene, make the name Text, and rename it Name_TXT in the Object Manager\n② Add a background object (Quad or Background) and drag it in the Object Manager so it becomes the child (First Child) of Name_TXT (this parent-child link is what makes Auto Scale work later)\n③ Add a title Text as Title_TXT. Enter a placeholder name and title\n④ Keep the background color in a Material (holding color as a value makes team-color swaps easy later)\n\n✅ Check: In the Object Manager the background hangs under Name_TXT, and each name alone tells you the role."
   },
   {
    "h": "ネイティブで幅の土台を作る（ここが本命）",
    "body": "名前のText Object の Tabs & Options タブで3つを設定する。\n① Auto Squeeze：Enabled にして Max Width に上限幅を入れ、Scaling は Width Only（横だけ詰める）。\n② Auto Scale：Enabled・Target = First Child・Mode = Width & Height にすると、親の詰まりに子の背景が追従する（背景幅をVisual Logicで計算する必要はない）。\n③ Character Limits：Soft Limit で警告（文字が赤くなる）、Hard Limit で文字数を頭打ち（最後の保険）。\nこれで幅まわりは完成、Visual Logicは一切使わない。\n\n✅ 確認：仮の長い名前を入れると横に詰まり、Max Widthを超えない。背景も一緒に追従する。Soft Limitを超えると文字が赤くなる。",
    "img": "v4_90_003.jpg",
    "tip": "Max Width・Hard Limit の具体値は安全エリアとフォント依存。実機で最長の名前を入れて決める。",
    "tip_en": "The exact Max Width / Hard Limit values depend on the safe area and the font. Decide them on the real system by entering the longest name.",
    "h_en": "Build the width foundation natively (this is the main event)",
    "body_en": "On the name Text Object's Tabs & Options tab, set three things.\n① Auto Squeeze: Enabled, enter the max width in Max Width, Scaling = Width Only (squeeze horizontally only).\n② Auto Scale: Enabled, Target = First Child, Mode = Width & Height — the child background follows the parent's squeeze (no need to compute background width in Visual Logic).\n③ Character Limits: Soft Limit warns (text turns red), Hard Limit caps the character count (the final insurance).\nWidth handling is now done — no Visual Logic at all.\n\n✅ Check: A long placeholder name squeezes horizontally and never exceeds Max Width. The background follows. Text turns red past the Soft Limit."
   },
   {
    "h": "Visual Logicの出番①：肩書きが空なら、行を出さない",
    "body": "「肩書きが空なら行ごと隠す」をVisual Logicで作る。\n① Sceneを選択し、Visual Logic（Visual Logic Editor）を開く\n② 左のObjectsから Title_TXT を展開し、Text（値）をキャンバスへドラッグ\n③ Function Blocks の Strings から String Length、Logic から Greater Than をドラッグ\n④ 接続：Title_TXT.Text → String Length.In ／ String Length.Out → Greater Than.Base（しきい値0＝「1文字以上あるか」）\n⑤ Greater Than の出力を、肩書き行（Title_TXTと背景をまとめたGroup）の Visible に接続\n空なら0で非表示、入っていれば1で表示になる。名前を中央に寄せたいときは、同じ判定を名前Textの Position(Y) にもつなぐ。\n\n✅ 確認：肩書きを空にすると肩書きの行が消え、入れると再表示される。",
    "img": "v4_90_004.jpg",
    "h_en": "Visual Logic, part 1: if the title is empty, hide the row",
    "body_en": "Build \"hide the whole row when the title is empty\" in Visual Logic.\n① Select the Scene and open Visual Logic (Visual Logic Editor)\n② Expand Title_TXT under Objects on the left and drag Text (the value) onto the canvas\n③ From Function Blocks drag String Length (Strings) and Greater Than (Logic)\n④ Wire: Title_TXT.Text → String Length.In / String Length.Out → Greater Than.Base (threshold 0 = \"has at least one character?\")\n⑤ Wire Greater Than's output to the Visible of the title row (the Group holding Title_TXT and its background)\nEmpty gives 0 → hidden; non-empty gives 1 → shown. To recenter the name, wire the same result to the name Text's Position(Y) too.\n\n✅ Check: Clearing the title removes the title row; entering one brings it back."
   },
   {
    "h": "設計の判断：読めなくなる手前で切り替える（Visual Logicの出番②）",
    "body": "実機検証済みの構成をそのまま組む：\n① Visual Logicで Name_TXT の Text → Strings の String Length に接続\n② Math の Value を置き、しきい値の文字数を入力（実機例 43）\n③ String Length.Out → Logic の Greater Than.Base、Value → しきい値側に接続\n④ Greater Than の出力 → Name_TXT の WordWrap.Enabled に接続（しきい値超えで折り返しON）\n⑤ Strings の String Value（実機例 1520）→ WordWrap.Width に接続して折り返し幅を固定\n折り返しそのものはネイティブの Word Wrap が担当し、Visual Logicは「いつ切り替えるか」の判断だけを持つ。\n\n✅ 確認：しきい値を超える長い名前だけ2行に折り返され、読める状態を保つ。",
    "tip": "切り替えのしきい値は文字数で近似する。解像度・セーフティゾーン・フォント依存なので実機で決める。",
    "tip_en": "Approximate the switch threshold by character count. It depends on resolution, safe zone, and font — decide on the real system.",
    "h_en": "The design decision: switch just before it becomes unreadable (Visual Logic, part 2)",
    "body_en": "Build the machine-verified setup as-is:\n① In Visual Logic wire Name_TXT's Text → String Length (Strings)\n② Place a Value (Math) and enter the threshold character count (verified example: 43)\n③ String Length.Out → Greater Than.Base (Logic), Value → the threshold side\n④ Greater Than output → Name_TXT's WordWrap.Enabled (wrap turns on past the threshold)\n⑤ String Value (Strings, verified example 1520) → WordWrap.Width to fix the wrap width\nThe wrapping itself is native Word Wrap; Visual Logic only decides when to switch.\n\n✅ Check: Only names past the threshold wrap to two lines and stay readable.",
    "img": "v4_90_005.jpg"
   },
   {
    "h": "出す・隠すを整える",
    "body": "① SequencerにSceneをドラッグしてTake Item化し、Template Linksで公開した名前・肩書きを差し替えて「短い名前」「長い名前」「限界超え」「肩書きなし」の4パターンのTake Itemを用意\n② 送出は Take（テンキー＋、RossTalkならTAKE）、消すのは Offline（テンキー−、SEQO）\n③ 4パターンを順番に出して、どれも崩れず読めるかをリハで確認\n④ 差し替えたら、プレビュー確認→再TAKEで送出に反映（鉄則）\n\n✅ 確認：全パターンで背景が追従し、安全エリアからはみ出さない。",
    "h_en": "Tidy up show and hide",
    "body_en": "① Drag the Scene into the Sequencer to make a Take Item, swap the published name/title via Template Links, and prepare four Take Items: \"short name\", \"long name\", \"over the limit\", \"no title\"\n② Play out with Take (numpad +, TAKE via RossTalk), remove with Offline (numpad −, SEQO)\n③ Run all four patterns in rehearsal and confirm nothing breaks and everything reads\n④ After a swap: check preview → re-TAKE to update the output (iron rule)\n\n✅ Check: In every pattern the background follows and nothing leaves the safe area.",
    "img": "v4_90_006.jpg"
   }
  ],
  "checklist": [
   "いちばん長く想定される名前で、Auto Squeezeが効いて安全エリアからはみ出さない",
   "背景がAuto Scaleで名前に追従し、余白が破綻していない",
   "極端に長い名前で、Hard Limitが最後の保険として効く",
   "横詰めが効きすぎて読みにくくなる手前で切り替えが入る（収まる≠読める）",
   "肩書き無しのとき、間延びせず名前だけきれいに収まる",
   "送出中に名前を差し替えても、詰めと背景の追従が破綻しない"
  ],
  "title_en": "Build an Unbreakable Lower Third",
  "subtitle_en": "Splitting work between native features and Visual Logic",
  "goal_en": "A two-line lower third with name and title. The background hugs the text nicely whether the name is short or long, with a hard cap so it never leaves the safe area. When the title is empty, the row disappears and the name alone looks clean. It shows and hides reliably with Online / Offline / Take.",
  "overview_en": "\"Build the container\" → \"Build the width foundation natively\" → \"Add only the decisions in Visual Logic\" → \"Tidy up show/hide\". Once the native foundation is in, the look can no longer break; Visual Logic only adds the final decisions on top.",
  "checklist_en": [
   "With the longest expected name, Auto Squeeze kicks in and nothing leaves the safe area",
   "The background follows the name via Auto Scale without broken margins",
   "With an absurdly long name, Hard Limit works as the final insurance",
   "The switch happens before over-squeezing makes text unreadable (fits ≠ reads)",
   "With no title, the name alone sits cleanly without gaps",
   "Swapping the name during playout doesn't break the squeeze or background tracking"
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
  "goal": "2チームのスコアボード。ホームとアウェイのチーム名・色・スコア・ピリオド表示。勝っている側がひと目で分かるリード強調。スコアが動いたときは変わった数字が軽く強調され、登場と退場はなめらかに。作例：HomeScore/AwayScore（Text）、リード強調は Greater Than＋Smaller Than（両方 Base=Home・比較側=Away、Smaller→HOME/Greater→AWAY、同点は両方0）、スコア更新の強調は OnSetText→Scene Director 再生。",
  "goalImg": "v4_91_001.jpg",
  "overview": "「器を作る」→「スコアを表示用に整える」→「Visual Logicで判断を足す」→「動きをネイティブで付ける」。Visual Logicは「値を見て何をどう見せるかを決める」担当、ネイティブは「決まったものを動かす・出し入れする」担当。",
  "steps": [
   {
    "h": "器を作る（スコアボードのオブジェクト構成）",
    "body": "① 新しいSceneに、Text×4（HomeName_TXT／HomeScore_TXT／AwayName_TXT／AwayScore_TXT）、背景パネル、リードマーカー（HomeLead／AwayLead：グローや矢印）を左右対称に置く\n② ピリオド用 Period_TXT、クロック用 Timer_TXT も配置\n③ Object Managerで、左右と役割が一目で分かる名前に統一する（あとの結線で迷わないための投資）\n\n✅ 確認：Home/Awayの各部品が左右対称に置かれ、名前だけで役割が分かる。",
    "img": "v4_91_002.jpg",
    "h_en": "Build the container (scoreboard object structure)",
    "body_en": "① In a new Scene, place Text ×4 (HomeName_TXT / HomeScore_TXT / AwayName_TXT / AwayScore_TXT), a background panel, and lead markers (HomeLead / AwayLead: glow or arrows), mirrored left-right\n② Place Period_TXT for the period and Timer_TXT for the clock\n③ In the Object Manager unify names so side and role are obvious (an investment so you don't get lost wiring later)\n\n✅ Check: Home/Away parts are mirrored and each name alone tells you the role."
   },
   {
    "h": "スコアを表示用に整える",
    "body": "実機検証済みの構成（NumFormatタブ）：\n① Visual Logic Editorでタブを追加し NumFormat と命名（機能ごとにタブを分けると後から読める）\n② Strings の Format String を2つ置く\n③ 接続：スコアの元値 → Format String.Param → SB_HomeScore_TXT.Text（Away側も同様）\n④ 「07」のような桁揃えはFormat側の書式で決める。数値はそのまま出さず、表示の直前で整える\n\n✅ 確認：スコアに1桁・3桁を入れても表示形式が意図通り。",
    "tip": "桁数の想定（最大何点まで）とゼロ詰めの有無は競技・運用で決め、実機で桁あふれの挙動を確認する。",
    "tip_en": "Decide the expected digits (max score) and zero-padding per sport and operation, and check digit-overflow behavior on the real system.",
    "h_en": "Shape scores for display",
    "body_en": "Machine-verified setup (NumFormat tab):\n① Add a tab in the Visual Logic Editor and name it NumFormat (splitting tabs by function keeps it readable later)\n② Place two Format String blocks (Strings)\n③ Wire: raw score value → Format String.Param → SB_HomeScore_TXT.Text (same for Away)\n④ Zero-padding like \"07\" is decided by the Format pattern. Never show raw numbers — shape them right before display\n\n✅ Check: 1-digit and 3-digit scores both display as intended.",
    "img": "v4_91_005.jpg"
   },
   {
    "h": "Visual Logicの出番①：リードを強調する",
    "body": "① Logic の Greater Than でホームとアウェイのスコアを比較\n② 結果を HomeLead／AwayLead の Visible に接続（勝っている側だけ表示）\n③ 同点分岐を最初から入れる：Equal To で同点を判定し、両マーカーを消す（または同点用の表示に切替）。放置すると「両方勝ち」に見える事故になる\n④ 色の強弱も付けるなら、判定結果を Colors 系ブロック経由でMaterialへ\n\n✅ 確認：ホーム優勢・アウェイ優勢・同点の3状態すべてで強調が正しく出る。",
    "img": "v4_91_003.jpg",
    "tip": "比較・色切り替え・同点判定の具体的なFunction Blocks結線は、実機で組んだものを正とする。",
    "tip_en": "For the exact Function Block wiring of comparison, color switching, and tie detection, treat what you build on the real system as the source of truth.",
    "h_en": "Visual Logic, part 1: highlight the lead",
    "body_en": "① Compare home and away scores with Greater Than (Logic)\n② Wire the result to HomeLead / AwayLead Visible (only the winning side shows)\n③ Build the tie branch from the start: detect ties with Equal To and hide both markers (or switch to a tie display). Left alone, it looks like both teams are winning\n④ For color intensity too, route the result through Colors blocks to the Material\n\n✅ Check: All three states — home lead, away lead, tie — highlight correctly."
   },
   {
    "h": "Visual Logicの出番②：チームカラーを出し分ける",
    "body": "① チーム選択（WidgetのText Listや公開Text）を入力にして、Selectors の Input Selector で対応するチームカラーを選ぶ\n② 選ばれた色を、背景・マーカーの Material（Colors.Diffuse）に接続\n「どの色にするか」を決めるのがVisual Logic、「その色で表示する」のがネイティブ（Material）という分担。\n\n✅ 確認：チーム選択を切り替えると、背景とマーカーの色が対応チームカラーに変わる。",
    "img": "v4_91_004.jpg",
    "h_en": "Visual Logic, part 2: switch team colors",
    "body_en": "① Take the team selection (a Widget Text List or published Text) as input and pick the matching team color with Input Selector (Selectors)\n② Wire the chosen color to the background/marker Material (Colors.Diffuse)\nVisual Logic decides which color; native (Material) displays it. That's the division of labor.\n\n✅ Check: Switching the team selection changes background and marker colors to that team's colors."
   },
   {
    "h": "動きをネイティブで付ける",
    "body": "実機検証済みの構成：\n① 登場・退場は Scene Director にIn/Outの動きを作り、SequencerのTransition In/Out列と組み合わせる。順序はSequencerで管理\n② スコア強調用に、Scene Director に ScoreMove（数字が軽く弾む短い動き）を作り、Event（Stop）で待機させる\n③ Visual Logic に PointMove タブを作り、SB_HomeScore_TXT の Events.OnSetText → Scene Director（ScoreMove）の Actions.Play に接続（Away側も同様）\nテキストが差し替わった瞬間に強調が自動再生される。値が動く瞬間に表示が破綻しないか必ず確認。\n\n✅ 確認：スコアを変えた瞬間に強調が出て、表示が崩れない。",
    "h_en": "Add motion natively",
    "body_en": "Machine-verified setup:\n① Build In/Out moves in the Scene Director and combine with the Sequencer's Transition In/Out columns. Order is managed in the Sequencer\n② For score emphasis, build ScoreMove (a short bounce of the digits) in the Scene Director and park it with an Event (Stop)\n③ Add a PointMove tab in Visual Logic and wire SB_HomeScore_TXT's Events.OnSetText → Scene Director (ScoreMove) Actions.Play (same for Away)\nThe emphasis auto-plays the instant text is replaced. Always verify the display survives the moment values move.\n\n✅ Check: Changing the score triggers the emphasis and nothing breaks.",
    "img": "v4_91_006.jpg"
   },
   {
    "h": "発展：スコアに比例したバーを作る（任意）",
    "body": "実機検証済みの構成（%BARタブ）：\n① HomeScore と AwayScore → Math の Add（合計）\n② HomeScore → Divide.Base、Add.Out → Divide.Divisor（ホーム側の比率 0〜1）\n③ 0対0対策：Add.Out → Equal To（==0）→ Input Selector で「合計0なら0.5、それ以外は比率」を選ぶ（0除算の定石）\n④ 選ばれた値 → Multiply（×バー最大幅 実機例1500）→ HomeBar_SHAPE.Width に接続\n比率は0〜1なので、最大幅で自然に頭打ちになる。\n\n✅ 確認：大差のスコアでもバーが最大値で止まり、はみ出さない。0対0でも半々で表示される。",
    "h_en": "Advanced: a bar proportional to the score (optional)",
    "body_en": "Machine-verified setup (%BAR tab):\n① HomeScore and AwayScore → Add (Math) (the total)\n② HomeScore → Divide.Base, Add.Out → Divide.Divisor (home share, 0–1)\n③ Guard against 0-0: Add.Out → Equal To (==0) → Input Selector choosing \"0.5 if total is 0, else the ratio\" (the standard division-by-zero guard)\n④ Chosen value → Multiply (× max bar width, verified example 1500) → HomeBar_SHAPE.Width\nThe ratio is 0–1, so the max width caps it naturally.\n\n✅ Check: Even lopsided scores stop the bar at the max width. 0-0 shows half and half.",
    "img": "v4_91_007.jpg"
   }
  ],
  "checklist": [
   "ホームリード・アウェイリード・同点の3状態すべてで、強調が正しく出る",
   "同点のとき、両方が勝っているように見えていない",
   "チームを差し替えたとき、色が正しく出し分けられる",
   "スコアが2桁から3桁になっても、桁あふれせず読める",
   "スコアが入れ替わった瞬間・同点になった瞬間に、表示が破綻しない",
   "登場・退場がなめらかで、送出の順序が乱れない"
  ],
  "title_en": "Build a Scoreboard",
  "subtitle_en": "Where Visual Logic shines",
  "goal_en": "A two-team scoreboard. Team names, colors, scores, and period for home and away. A lead highlight that shows at a glance who's winning. Changed digits get a light emphasis when the score moves, and entrances/exits are smooth.",
  "overview_en": "\"Build the container\" → \"Shape scores for display\" → \"Add decisions in Visual Logic\" → \"Add motion natively\". Visual Logic decides what to show based on values; native features move and stage what's been decided.",
  "checklist_en": [
   "All three states — home lead, away lead, tie — highlight correctly",
   "At a tie, it doesn't look like both teams are winning",
   "Swapping teams switches colors correctly",
   "Scores going from 2 to 3 digits stay readable without overflow",
   "Nothing breaks the instant scores swap or tie",
   "Entrances and exits are smooth and playout order stays intact"
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
  "goalImg": "v5_92_001.jpg",
  "overview": "考え方はシンプルです。オブジェクトの見た目（マテリアル）を『固定の画像』ではなく『Dynamic Material（動的マテリアル）』にして、表示する画像をパスやマクロで指定します。手順は ①素材を整理 → ②画像を出すオブジェクトを用意 → ③Dynamic Materialに切替 → ④Material Pathで画像を指定 → ⑤Widget/データの値で切り替え（マクロ @W:名前@ を使用）→ ⑥本番前チェック。最大のポイントは『パスが本番機でも同じ場所を指せるか』です。",
  "steps": [
   {
    "h": "① 素材ファイルを整理する",
    "body": "まず、差し替えたい画像をあとで指定しやすい場所に整理します。プロジェクトフォルダの中に「Images」フォルダを作り、用途ごとにサブフォルダを分けて、次のようなファイルを用意します。\n\n【準備するフォルダとファイルの例】\nImages/Teams/\n　・TokyoTeamLogo.png\n　・OsakaTeamLogo.png\n　・NagoyaTeamLogo.png\nImages/Players/\n　・Player_01_Photo.png\n　・Player_02_Photo.png\nImages/Sponsors/\n　・Sponsor_Main.png\nImages/Backgrounds/\n　・Arena_Background.png\n\n大事なポイント：チームロゴは「チーム名＋Logo.png」の形でファイル名を統一します（TokyoTeamLogo.png / OsakaTeamLogo.png …）。こうしておくと、⑤で Widget の値（TokyoTeam / OsakaTeam …）を変えるだけで、対応するファイルへ自動で切り替わります。\n\n✅ 確認：Images/Teams などのフォルダに、命名規則どおりのファイルが並んでいる。",
    "tip": "フォルダ名・ファイル名は半角英数字で統一するとパス指定でトラブりにくいです。ファイル名の付け方（値＋固定語）を先に決めておくと、後の自動切り替え（⑤）がそのままハマります。",
    "tip_en": "Keep folder and file names in single-byte alphanumerics to avoid path trouble. Decide the file-naming scheme (value + fixed word) first, and the automatic switching in step 5 falls right into place.",
    "h_en": "① Organize the asset files",
    "body_en": "First, organize the images you'll swap in a place that's easy to reference later. Create an \"Images\" folder inside the project folder, split subfolders by purpose, and prepare files like:\n\n[Example folders and files]\nImages/Teams/\n  - TokyoTeamLogo.png\n  - OsakaTeamLogo.png\n  - NagoyaTeamLogo.png\nImages/Players/\n  - Player_01_Photo.png\n  - Player_02_Photo.png\nImages/Sponsors/\n  - Sponsor_Main.png\nImages/Backgrounds/\n  - Arena_Background.png\n\nKey point: unify team logo filenames as \"team name + Logo.png\" (TokyoTeamLogo.png / OsakaTeamLogo.png …). Then in step ⑤, changing the Widget value (TokyoTeam / OsakaTeam …) automatically switches to the matching file.\n\n✅ Check: Folders like Images/Teams contain files following the naming rule.",
    "img": "v5_92_006.jpg"
   },
   {
    "h": "② 画像を表示するオブジェクトを用意する",
    "body": "画像を映すためのオブジェクトを置きます。\n① Object Library の Primitives > Quad をSceneにドラッグ（チームロゴやスポンサー画像は四角い面のQuadが分かりやすい）\n② Object Managerで「HomeLogo」など役割が分かる名前を付ける\nすでにロゴ枠などがある場合はそれを使ってOK。\n\n✅ 確認：Quadが置かれ、HomeLogoなど役割が分かる名前が付いている。",
    "tip": "「画像を貼る面」を用意するイメージ。まだ固定の画像が入っていても大丈夫です（次で動的に切り替えます）。",
    "tip_en": "Think of it as preparing the surface the image is pasted on. A fixed image is fine for now (we make it dynamic next).",
    "h_en": "② Prepare the object that displays the image",
    "body_en": "Place an object to show the image.\n① Drag Primitives > Quad from the Object Library into the Scene (a Quad works well for team logos and sponsor images)\n② Name it by role in the Object Manager, e.g. \"HomeLogo\"\nIf you already have a logo frame, use that.\n\n✅ Check: A Quad is placed with a role-revealing name like HomeLogo.",
    "img": "v5_92_007.jpg"
   },
   {
    "h": "③ マテリアルを Dynamic Material に切り替える",
    "body": "画像を出したいオブジェクトを選択し、Object Inspector（設定パネル）を開きます。「DataLinq」タブへ移動し、「Select Material Source」で「Dynamic Material」を選びます。これで、このオブジェクトの画像が『固定』ではなく『後から指定して差し替えられる』状態になります。\n\n✅ 確認：DataLinqタブの Select Material Source が Dynamic Material になっている。",
    "img": "v5_92_002.jpg",
    "tip": "Dynamic Material＝『表示する画像を、パスやデータで動的に決められるマテリアル』。ここが画像差し替えの心臓部です。",
    "tip_en": "Dynamic Material = a material whose displayed image is decided dynamically by a path or data. This is the heart of image swapping.",
    "h_en": "③ Switch the material to Dynamic Material",
    "body_en": "Select the object, open the Object Inspector, go to the \"DataLinq\" tab, and set \"Select Material Source\" to \"Dynamic Material\". The object's image is now assignable later instead of fixed.\n\n✅ Check: Select Material Source on the DataLinq tab shows Dynamic Material."
   },
   {
    "h": "④ Material Path で表示する画像を指定する",
    "body": "Dynamic Material Properties の中の「Material Path」に、表示したい画像ファイルの場所（パス）を入力します。プロジェクトフォルダからの相対パスで書くのが基本です。\n記入例：\n・チームロゴ → Images/Teams/TokyoTeamLogo.png\n・選手写真 → Images/Players/Player_01_Photo.png\n・スポンサー → Images/Sponsors/Sponsor_Main.png\n・背景 → Images/Backgrounds/Arena_Background.png\nここで指定したファイルが、そのオブジェクトに表示されます。\n\n【重要：編集画面（Layout）は市松模様でOK。送出側で表示される】\n編集中の Layout ビューでは Dynamic Material はプレビューされず、青と黄色の市松模様（プレースホルダー）が表示されます。これは正常な挙動で、パスが間違っているわけではありません。実際の画像は送出（シーケンサー／Take＝オンエア）側で正しく表示されます。まずは Sequence で表示を確認してください。\n\n【送出（Sequence）側でも画像が出ないときだけ、パスを見直す】\nSequence でも市松のまま／画像が出ない場合は、パスが解決できていません。次を確認します：\n・パスの前後に \" （ダブルクォート）が付いていないか。「パスのコピー」で貼り付けると \"C:/…/TokyoTeamLogo.png\" のように付くことがあり、残っていると解決できません。必ず削除。\n・区切りが ¥ ではなく / になっているか。\n・フォルダ名・ファイル名に日本語や全角が混じっていないか（半角英数字が安全）。\n・指定したファイルが実際にその場所にあるか、名前・拡張子（大文字小文字含む）が一致しているか。\n・相対パスの場合、プロジェクトを保存し、Images フォルダが保存先プロジェクトの下にあるか。\n（編集画面で位置やサイズを合わせたいときは、作業中だけ Static Material に同じ画像を割り当て、送出前に Dynamic Material へ戻すと確認しやすいです。）\n\n【パスをコピーする方法（Windows）】\n・エクスプローラーで対象ファイルを Shift＋右クリック →「パスのコピー」を選ぶ。\n・フォルダのパスだけ欲しいときは、アドレスバーをクリックしてコピー。\nコピーされるのは絶対パスです。Material Path を相対にしたいときは、プロジェクトフォルダより下の部分（例：Images/Teams/…）だけを残して貼り付けます。区切りは / でOKです。\n・重要：「パスのコピー」で貼り付けると、パスの前後に \" （ダブルクォート）が付くことがあります（例：\"C:/…/TokyoTeamLogo.png\"）。この \" は必ず削除してください。残っているとパスを解決できず、市松模様のままになります。\n\n✅ 確認：Material Pathに直書きしたパスでロゴが表示される（市松模様のままなら「\"」や誤字を疑う）。",
    "img": "v5_92_003.jpg",
    "tip": "絶対パス（D:/… など）を使う場合は、本番機でも同じパスで解決できるか必ず確認を。相対パスの方が別PCへ移しても崩れにくく安全です。",
    "tip_en": "If you use absolute paths (D:/…), always confirm the same path resolves on the production machine. Relative paths survive moving to another PC and are safer.",
    "h_en": "④ Specify the image with Material Path",
    "body_en": "In Dynamic Material Properties, enter the image file's location (path) into \"Material Path\". Relative to the project folder is the norm.\nExamples:\n- Team logo → Images/Teams/TokyoTeamLogo.png\n- Player photo → Images/Players/Player_01_Photo.png\n- Sponsor → Images/Sponsors/Sponsor_Main.png\n- Background → Images/Backgrounds/Arena_Background.png\nThe file specified here is what the object displays.\n\n[Important: a checkerboard in the Layout view is OK — it displays on the playout side]\nIn the Layout view, Dynamic Material is not previewed; you see a blue-and-yellow checkerboard placeholder. This is normal and does not mean the path is wrong. The real image displays on the playout side (Sequencer / Take = on air). Check the display via the Sequence first.\n\n[Only if the image is also missing on the Sequence side, re-check the path]\nIf it stays checkerboard on the Sequence too, the path isn't resolving. Check:\n- Are there double quotes around the path? \"Copy as path\" pastes like \"C:/…/TokyoTeamLogo.png\" — the quotes must be deleted.\n- Are separators / rather than ¥?\n- Any Japanese or full-width characters in folder/file names? (half-width alphanumerics are safe)\n- Does the file actually exist there, with matching name and extension (including case)?\n- For relative paths: is the project saved, and is the Images folder under the saved project?\n(To position/size in the editor, temporarily assign the same image as a Static Material while working, then switch back to Dynamic Material before playout.)\n\n[How to copy a path (Windows)]\n- Shift + right-click the file in Explorer → \"Copy as path\".\n- For just the folder path, click the address bar and copy.\nWhat you copy is an absolute path. For a relative Material Path, keep only the part below the project folder (e.g. Images/Teams/…). \"/\" separators are fine.\n- Important: \"Copy as path\" may add quotes around the path (e.g. \"C:/…/TokyoTeamLogo.png\"). Always delete them — if they remain, the path won't resolve and you'll keep the checkerboard.\n\n✅ Check: The logo displays from a hand-typed path in Material Path (if the checkerboard persists, suspect quotes or typos)."
   },
   {
    "h": "⑤ Widget（Text List）の値でファイル名を切り替える（具体的な書き方）",
    "body": "ここが自動切り替えの肝です。まず切り替え用の Widget を作ります。\nDisplay メニュー → Widgets パネルの『New Widget』→『Text List』を選びます（＝テキストを切り替えられるウィジェット。時刻なら Clock Timer、数値なら Counter）。\nできた『TextList1』は、分かりやすい名前（例：TeamNameForFile）に変更しておきます。\n\n次に Widget Properties（プロパティ）を開き、『Add』で切り替えたい値を登録します。\n例：TokyoTeam / OsakaTeam / NagoyaTeam …\n※『Allow manual entry of text』にチェックすると、一覧に無い値もその場で手入力できます。\n\nそして Material Path のファイル名部分に、この Widget を差し込むマクロ @W:ウィジェット名@ を書きます。\n記入例：\nImages/Teams/@W:TeamNameForFile@Logo.png\n\n【手入力しない方法：右クリックで挿入】\nマクロは手で打たなくてもOKです。Material Path の入力欄を右クリック →『Insert Lookup』→『Widgets』→ 作成した Widget名（例：TeamNameForFile）を選ぶと、@W:TeamNameForFile@ が自動で挿入されます。\n同じ右クリックメニューから『Published Text Objects』『All Text Objects』を選べば、テキストオブジェクトの値も同じように差し込めます。打ち間違い（スペルミス）を防げるので、こちらが確実です。\n\n@W:TeamNameForFile@ の部分が、いま選ばれている値に置き換わります。\n・選択が TokyoTeam のとき → Images/Teams/TokyoTeamLogo.png\n・OsakaTeam に切り替えると → Images/Teams/OsakaTeamLogo.png\nWidgets パネルのドロップダウンや Prev / Next で値を切り替えると、表示ロゴが自動で入れ替わります。\n\n✅ 確認：Widgetの値を切り替えると、ロゴが自動で入れ替わる。",
    "img": "v5_92_004.jpg",
    "tip": "値の種類で使うWidgetが違います：文字（チーム名など）＝Text List、数値カウント＝Counter、時刻＝Clock Timer。コツはファイル名を『値＋固定語』で統一すること（TokyoTeamLogo.png / OsakaTeamLogo.png…）。外部データで切り替えるなら @W:名前@ の代わりに %DataLinqキー名% を使います。",
    "tip_en": "The Widget depends on the value type: text (team names etc.) = Text List, numeric counts = Counter, time = Clock Timer. The trick is unified file names of 'value + fixed word' (TokyoTeamLogo.png / OsakaTeamLogo.png…). To switch via external data, use %DataLinqKeyName% instead of @W:Name@.",
    "h_en": "⑤ Switch the filename via a Widget (Text List) — exact syntax",
    "body_en": "This is the heart of auto-switching. First create the switching Widget.\nDisplay menu → Widgets panel → \"New Widget\" → \"Text List\" (a widget whose text you can switch; use Clock Timer for time, Counter for numbers).\nRename \"TextList1\" to something clear (e.g. TeamNameForFile).\n\nNext, open Widget Properties and register the values with \"Add\".\nExample: TokyoTeam / OsakaTeam / NagoyaTeam …\n※ Checking \"Allow manual entry of text\" lets you type values not in the list.\n\nThen write the macro @W:widgetname@ into the filename part of the Material Path.\nExample:\nImages/Teams/@W:TeamNameForFile@Logo.png\n\n[No hand-typing: insert via right-click]\nYou don't have to type the macro. Right-click in the Material Path field → \"Insert Lookup\" → \"Widgets\" → pick your Widget (e.g. TeamNameForFile) and @W:TeamNameForFile@ is inserted automatically.\nThe same menu offers \"Published Text Objects\" / \"All Text Objects\" to insert text-object values. This avoids typos and is the reliable way.\n\nThe @W:TeamNameForFile@ portion is replaced by the currently selected value:\n- With TokyoTeam selected → Images/Teams/TokyoTeamLogo.png\n- Switch to OsakaTeam → Images/Teams/OsakaTeamLogo.png\nSwitching the value via the Widgets panel dropdown or Prev / Next swaps the displayed logo automatically.\n\n✅ Check: Switching the Widget value swaps the logo automatically."
   },
   {
    "h": "⑥ 本番前に確認する",
    "body": "想定するすべての画像で、パスが正しく解決できて画像が表示されるかを確認します。特に次の3点をチェック：\n・相対パスが別PC（本番機）でも通るか（保存場所や共有ドライブの割り当て違いに注意）\n・Widget／データの値を変えたら、本当に画像が切り替わるか\n・指定した画像が見つからない（空・欠番）ときに大きく崩れないか\nリハーサルで実際に何パターンか切り替えてみると安心です。",
    "img": "v5_92_005.jpg",
    "tip": "「本番機で画像が出ない」の多くはパスの解決ミス。素材はプロジェクトに同梱し、相対パスで指定しておくと事故が減ります。素材の置き場所が毎回変わる現場では file path 指定は慎重に。",
    "tip_en": "Most 'image missing on the production machine' cases are path-resolution mistakes. Bundle assets in the project and use relative paths to reduce accidents. Where asset locations change per venue, use file paths with caution.",
    "h_en": "⑥ Check before the show",
    "body_en": "Confirm every expected image resolves and displays. Three checks in particular:\n- Do relative paths work on another PC (the playout machine)? Watch for different save locations or drive mappings\n- Does changing the Widget/data value really switch the image?\n- When a specified image is missing (empty/gap), does the layout avoid major breakage?\nActually switching several patterns in rehearsal is reassuring."
   }
  ],
  "checklist": [
   "相対パスで、別のPC（本番機）でも画像が表示される",
   "Widget（@W:名前@）またはDataLinqキー（%キー名%）の値を変えるだけで画像が切り替わる",
   "ファイル名を『値＋固定語』で統一してある（TokyoTeamLogo.png など）",
   "絶対パスを使う場合、本番機でも同じパスで解決できることを確認した",
   "指定した画像が無いとき（空・欠番）に表示が大きく崩れない",
   "対戦カード・出演者の差し替えを、手作業なしで回せる"
  ],
  "title_en": "Swap Images with DataLinq",
  "subtitle_en": "Dynamic Material and Material Path (auto-swapping images and logos)",
  "goal_en": "Build a template that switches team logos, player photos, and sponsor assets without pasting images by hand each time. The displayed image is decided by its file location (path), and changing a Widget or data value swaps in a different image. When the matchup or lineup changes, there's no manual repasting.",
  "overview_en": "The idea is simple: make the object's look a Dynamic Material instead of a fixed image, and specify the image by path or macro. Steps: ① organize assets → ② prepare the display object → ③ switch to Dynamic Material → ④ specify the image in Material Path → ⑤ switch via Widget/data values (using the @W:name@ macro) → ⑥ pre-show checks. The biggest point: can the path resolve to the same place on the playout machine?",
  "checklist_en": [
   "With relative paths, images display on another PC (the playout machine)",
   "Changing just the Widget (@W:name@) or DataLinq key (%keyname%) value switches the image",
   "Filenames are unified as \"value + fixed word\" (e.g. TokyoTeamLogo.png)",
   "If using absolute paths, confirmed the same path resolves on the playout machine",
   "Missing images (empty/gap) don't badly break the display",
   "Matchup/lineup swaps run without manual work"
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
  "goal": "12:00から00:00へ向かってカウントダウンする簡易ゲームクロック。Text Objectは表示先で、時間の値はClock Timer Widgetが持つ。Start / Stop / ResetをManualで確実に操作でき、Online・再Takeでも意図しないResetや再Startが起きないことを確認する。作例：Clock_TXT（表示）＋Clock Timer Widget（開始 12:00、Count Down、Manual の Start/Stop/Reset）。",
  "goalImg": "v4_92_001.jpg",
  "overview": "時計の作り方をまず3つ（簡易＝Clock Timer Widget／演出連動＝Visual Logic／公式時計＝DataLinq）に切り分け、ここでは最もシンプルなClock Timer Widgetで作る。器（Text Object）を置く→Widgetで時間を作る→つなぐ→Manualで動作確認、の順。",
  "steps": [
   {
    "h": "作り方を3つに切り分ける",
    "body": "時計・タイマー表示は目的で道具が変わる。\n① シンプルなカウントダウン→Clock Timer Widget（今回はこれ）。\n② 残り時間で色を変えるなどの演出連動→Visual Logic。\n③ 外部スコアボード等の公式時計を表示→DataLinq。ここでは最も分かりやすいClock Timer Widgetで作る。Visual Logicを無理に最初から使わない。\n\n✅ 確認：「今回はClock Timer Widgetで作る」と方針を言える。",
    "img": "v4_92_002.jpg",
    "h_en": "Split the approaches into three",
    "body_en": "Clock/timer displays need different tools for different goals.\n① Simple countdown → Clock Timer Widget (this time).\n② Staging tied to remaining time (e.g. color changes) → Visual Logic.\n③ Displaying an official clock from an external scoreboard → DataLinq.\nHere we build with the clearest option, the Clock Timer Widget. Don't force Visual Logic from the start.\n\n✅ Check: You can state \"this build uses the Clock Timer Widget\"."
   },
   {
    "h": "テスト用Sceneを作る",
    "body": "① Scene Managerで新規Sceneを作成し、GameClock_Test など分かる名前を付ける\n② この段階では背景・装飾・ロゴ・スコアは入れない。まず確認したいのは見た目ではなく「時計が正しく表示され、Start / Stop / Resetできるか」\n\n✅ 確認：GameClock_Test という空のSceneができている。",
    "h_en": "Create a test Scene",
    "body_en": "① Create a new Scene in the Scene Manager with a clear name like GameClock_Test\n② No backgrounds, decorations, logos, or scores yet. What we verify first isn't looks but \"does the clock display correctly and Start / Stop / Reset?\"\n\n✅ Check: An empty Scene named GameClock_Test exists.",
    "img": "v4_92_010.jpg"
   },
   {
    "h": "表示先のText Objectを置く",
    "body": "① Object Library の Text をSceneにドラッグして1つ置き、仮で「12:00」と入れる（位置・サイズ・Font・Materialの確認用）\n② 名前は Clock_Text のように役割が分かる名前にする\n重要：この仮文字を打っただけでは動くタイマーにはならない。Text Objectは時間を作る部品ではなく、時間の値を表示する表示先。\n\n✅ 確認：Clock_Text に仮の「12:00」が表示されている（まだ動かなくてよい）。",
    "img": "v4_92_003.jpg",
    "h_en": "Place the display Text Object",
    "body_en": "① Drag one Text from the Object Library into the Scene and type a placeholder \"12:00\" (to check position, size, Font, Material)\n② Name it by role, e.g. Clock_Text\nImportant: typing the placeholder does not make a running timer. The Text Object isn't the part that creates time — it's the display for the time value.\n\n✅ Check: Clock_Text shows the placeholder \"12:00\" (it doesn't need to run yet)."
   },
   {
    "h": "Clock Timer Widgetを作る",
    "body": "メニューの Display > Widgets を開き、New Widget から Clock Timer を作る。名前は GameClock_Timer のように用途が分かる名前に（後でText Object側から選ぶときに効く）。Widgets画面は『Timerを作る場所』であり、同時に『Timerの状態を見て操作する場所』でもある。\n\n✅ 確認：Widgetsパネルに GameClock_Timer が並んでいる。",
    "tip": "Widgetが増えるとどのTimerをどのTextにつないだか分からなくなる。最初から用途の分かる名前を付けておく。",
    "tip_en": "As Widgets multiply you lose track of which Timer feeds which Text. Give purpose-revealing names from the start.",
    "h_en": "Create the Clock Timer Widget",
    "body_en": "Open Display > Widgets and create a Clock Timer via New Widget. Give it a purpose-revealing name like GameClock_Timer (it pays off when selecting from the Text Object later). The Widgets screen is both where you create Timers and where you monitor and operate them.\n\n✅ Check: GameClock_Timer appears in the Widgets panel.",
    "img": "v4_92_011.jpg"
   },
   {
    "h": "ModeをTimerにする",
    "body": "作ったClock Timer WidgetのPropertiesで Mode を Timer にする。Clock＝『今の時刻』を扱う考え方、Timer＝『任意の開始値から進める／戻す』考え方。12:00から00:00へ減らしたいのでTimerが中心。\n\n✅ 確認：Mode が Timer になっている。",
    "img": "v4_92_004.jpg",
    "h_en": "Set Mode to Timer",
    "body_en": "In the Clock Timer Widget's Properties set Mode to Timer. Clock = deals with the current time of day; Timer = advances/returns from an arbitrary start value. We want 12:00 down to 00:00, so Timer is the one.\n\n✅ Check: Mode is Timer."
   },
   {
    "h": "Start At / Stop At / Direction を決める",
    "body": "12分→0分のカウントダウンなら、Start At=12:00、Stop At=00:00、Direction=Down。暗記すべきは設定名ではなく『どこから始まる／どこで止まる／上がるか下がるか』の3つ。入力形式や項目名はバージョン・画面で異なるので実機で確認する。\n\n✅ 確認：Start At=12:00・Stop At=00:00・Direction=Down になっている。",
    "img": "v4_92_005.jpg",
    "tip": "この3つを間違えると、表示形式が合っていてもタイマーとして使いにくくなる。",
    "tip_en": "Get these three wrong and, even with the right display format, the timer becomes hard to use.",
    "h_en": "Decide Start At / Stop At / Direction",
    "body_en": "For a 12-minute countdown: Start At = 12:00, Stop At = 00:00, Direction = Down. What to internalize isn't the setting names but the three ideas: where it starts, where it stops, up or down. Input formats and item names vary by version/screen — verify on the machine.\n\n✅ Check: Start At = 12:00, Stop At = 00:00, Direction = Down."
   },
   {
    "h": "Formatを決める（まずはNN:SS）",
    "body": "FormatはTimerの値をどんな文字列で出すかの設定。NN:SS / HH:NN:SS / NN:SS.ZZZ などが扱える。簡易ゲームクロックは NN:SS（例 12:00 / 05:30 / 00:10）が分かりやすい。小数表示（.ZZZ）は桁が増え、Fontによっては数字の幅が揃わず揺れて見えるので、最初はNN:SSが安全。\n\n✅ 確認：表示が NN:SS 形式になっている。",
    "img": "v4_92_006.jpg",
    "h_en": "Decide the Format (start with NN:SS)",
    "body_en": "Format decides the string the Timer value becomes: NN:SS / HH:NN:SS / NN:SS.ZZZ etc. For a simple game clock, NN:SS (e.g. 12:00 / 05:30 / 00:10) is clearest. Decimals (.ZZZ) add digits and can jitter if the Font's digits aren't monospaced, so NN:SS is the safe start.\n\n✅ Check: The display is in NN:SS format."
   },
   {
    "h": "Start / Stop / Reset を Manual にする",
    "body": "最初の作例では Start / Stop / Reset の Method を Manual にする（Operatorが明示的に操作）。When Onlineにすると出した瞬間に動き出し、原因の切り分けがしにくい。注意：『Manualに設定する』ことと『実際にStartする』ことは別。StartはあとでWidget側の操作で実行する。Ctrl+1〜9などショートカット割り当てはKeyboard Mappingと競合しないか実機で確認。\n\n✅ 確認：Start / Stop / Reset の Method がすべて Manual になっている。",
    "img": "v4_92_007.jpg",
    "h_en": "Set Start / Stop / Reset to Manual",
    "body_en": "For the first build set the Method for Start / Stop / Reset to Manual (the operator acts explicitly). When Online makes it run the moment it's taken, isolating causes gets hard. Note: setting Manual and actually pressing Start are different things — Start comes later from the Widget side. If assigning shortcuts like Ctrl+1–9, verify they don't clash with Keyboard Mapping.\n\n✅ Check: Start / Stop / Reset Methods are all Manual."
   },
   {
    "h": "Text ObjectのData SourceにWidgetをつなぐ",
    "body": "Clock_Textを選び、Text Objectの Data Source タブを開く。\nData SourceとしてWidgetを選び、一覧から GameClock_Timer を選ぶ。これでClock_Textにタイマーの値が表示される。\n直接「12:00」と打ちっぱなしにしない（それは固定表示）。\n表示されないときの確認順：\n・対象のTextを選択しているか\n・Data SourceでWidgetを選んだか\n・正しいWidget（GameClock_Timer）を指定したか\n・Formatは意図通りか\n・Font／Material／位置に問題はないか\n\n✅ 確認：Clock_Text にWidgetの値（12:00）が表示されている。",
    "img": "v4_92_008.jpg",
    "h_en": "Connect the Widget to the Text Object's Data Source",
    "body_en": "Select Clock_Text and open the Text Object's Data Source tab.\nChoose Widget as the Data Source and pick GameClock_Timer from the list. Clock_Text now shows the timer value.\nDon't just leave a typed \"12:00\" (that's a static display).\nIf nothing shows, check in order:\n- Is the right Text selected?\n- Did you choose Widget in Data Source?\n- Did you pick the right Widget (GameClock_Timer)?\n- Is the Format as intended?\n- Any Font / Material / position issues?\n\n✅ Check: Clock_Text displays the Widget's value (12:00)."
   },
   {
    "h": "Main Viewportで表示を確認する",
    "body": "接続できたらMain Viewportで値が出ているか確認。ここで見るのはデザインではなく『Widgetの値が表示されているか／Formatが意図通りか／文字が範囲に収まるか』。動きが見えないときは Viewport上部の Show or Hide Continuous Animations and Other Effects などの表示更新状態も確認。表示されている＝Startしている、ではない点に注意。\n\n✅ 確認：Main Viewportで値とFormatが意図通りに見えている。",
    "h_en": "Verify the display in the Main Viewport",
    "body_en": "Once connected, confirm the value shows in the Main Viewport. What you're checking isn't design: is the Widget's value displayed / is the Format right / does the text fit? If motion isn't visible, also check display-refresh states like \"Show or Hide Continuous Animations and Other Effects\" at the top of the Viewport. Note: displayed ≠ started.\n\n✅ Check: Value and Format look right in the Main Viewport.",
    "img": "v4_92_012.jpg"
   },
   {
    "h": "Widget側のManual操作でStart→Stop→Reset",
    "body": "Widget側の操作でStartし、12:00 → 11:59 → 11:58 と減れば表示接続は成功。\n動かないときは、Text Objectのデザインより先に次を確認：\n・WidgetがStartしているか\n・MethodがManualになっているか\n・Start操作を実行したか\n・Start At・Directionが意図通りか\n次にStopで保持、Resetで開始値へ戻るかを確認する。\nResetは強力（本番中の誤操作で意図しない値に戻る）。「いつ／誰がResetしてよいか」「自動Reset（Reset on timer 等）が有効になっていないか」まで確認する。\n\n✅ 確認：Startで減り始め、Stopで止まり、Resetで12:00に戻る。",
    "h_en": "Manual Start → Stop → Reset from the Widget side",
    "body_en": "Start from the Widget side; if it counts 12:00 → 11:59 → 11:58, the display connection works.\nIf it doesn't move, check these before touching the Text Object's design:\n- Has the Widget been started?\n- Is Method set to Manual?\n- Did you actually run Start?\n- Are Start At / Direction as intended?\nThen confirm Stop holds and Reset returns to the start value.\nReset is powerful (a mid-show mistake can jump the value back). Confirm who may Reset and when, and whether any auto-Reset (Reset on timer, etc.) is enabled.\n\n✅ Check: Start counts down, Stop holds, Reset returns to 12:00.",
    "img": "v4_92_013.jpg"
   },
   {
    "h": "OnlineにしてTake/Offline/再Takeを確認する",
    "body": "Layoutで確認できたらSceneをOnlineにして、送出時の挙動を見る。Main Viewportで動いても、送出時に同じとは限らない。\n確認すること：\n・Onlineにしたとき時計は止まっているか\n・Manual Startまで動かないか\n・Offlineで止まる・保持・Resetのどれになるか\n・再Take時に意図しないReset・再Startが起きないか\n再Take時の値保持/ResetはScene属性やSequencer・Widgetの設定に依存するので必ず実機で確認し、Operatorが説明できる状態にしておく。",
    "img": "v4_92_009.jpg",
    "h_en": "Go Online and verify Take/Offline/re-Take",
    "body_en": "Once Layout checks out, put the Scene Online and watch playout behavior. Working in the Main Viewport doesn't guarantee the same on air.\nConfirm:\n- Is the clock stopped when it goes Online?\n- Does it stay stopped until Manual Start?\n- On Offline: stop, hold, or Reset — which?\n- On re-Take: any unintended Reset or re-Start?\nValue retention/Reset on re-Take depends on Scene attributes and Sequencer/Widget settings — always verify on the machine so the operator can explain it."
   }
  ],
  "checklist": [
   "3つの作り方のうち、簡易＝Clock Timer Widgetを選べている",
   "Text Objectは表示先、時間の値はClock Timer Widgetが持つ、と分けて作っている",
   "Start At / Stop At / Direction が意図通り（どこから・どこで止まる・増減）",
   "Manual設定と実際のStart操作を混同していない（表示≠Start）",
   "Reset のタイミングと権限、自動Resetの有無を確認した",
   "Online・Offline・再Takeで意図しないReset/再Startが起きないことを確認した"
  ],
  "title_en": "Build a Simple Game Clock",
  "subtitle_en": "Countdown display with a Clock Timer Widget",
  "goal_en": "A simple game clock counting down from 12:00 to 00:00. The Text Object is the display; the time value lives in the Clock Timer Widget. Start / Stop / Reset work reliably in Manual, and Online / re-Take cause no unintended Reset or re-Start.",
  "overview_en": "First split clock-building into three approaches (simple = Clock Timer Widget / staging-linked = Visual Logic / official clock = DataLinq); here we use the simplest, the Clock Timer Widget. Order: place the container (Text Object) → create the time in a Widget → connect → verify in Manual.",
  "checklist_en": [
   "Of the three approaches, you chose simple = Clock Timer Widget",
   "Built with the Text Object as display and the time value in the Clock Timer Widget",
   "Start At / Stop At / Direction are as intended (from where, stops where, up or down)",
   "Not conflating the Manual setting with actually pressing Start (displayed ≠ started)",
   "Confirmed Reset timing and authority, and any auto-Reset",
   "Confirmed no unintended Reset/re-Start on Online, Offline, or re-Take"
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
  "goal": "外部の表（CSV/Excel）から選手名・スコア・チーム情報をText Objectへ流し込み、表を書き換えるだけで表示が変わる状態を作る。データソースは『誰が編集し、どう壊れるか』で選び、失敗時の見え方まで想定する。作例：players.csv（列 Name/Score/Team）を DataLinq で読み、Key（例 Team=Home の行）で対象行を選び、各 Text の DataLinq タブで列にバインド。UTF-8 保存・再Takeで反映を確認。",
  "goalImg": "v5_93_001.jpg",
  "overview": "DataLinqの共通構造（データソース→キー→表示先）を押さえ、まずCSVで動かす。編集頻度が高いならExcel、構造化・外部連携ならJSON。仕上げにWidgets（Text List等）で切り替えも足せる。同梱の teams.csv / names_and_titles.csv で試せる。",
  "steps": [
   {
    "h": "DataLinqの共通構造を押さえる",
    "body": "DataLinqは『外部データを取り込み→キー（列や項目）で参照→Text ObjectやMaterialに表示』という共通構造。形式（CSV/Excel/JSON）が違っても骨格は同じ。まず『何の値を、どのキーで、どこに出すか』を決める。\n\n✅ 確認：「何の値を・どのキーで・どこに出すか」を言葉にできる。",
    "img": "v5_93_002.jpg",
    "h_en": "Grasp DataLinq's common structure",
    "body_en": "DataLinq's common structure: ingest external data → reference by key (column/field) → display on a Text Object or Material. The skeleton is the same across CSV/Excel/JSON. First decide what value, by which key, goes where.\n\n✅ Check: You can say \"what value, by which key, goes where\"."
   },
   {
    "h": "まずCSVで動かす",
    "body": "① XPression DataLinq Server で Add DataLinq Source → Text DataLinq Source を追加（CSV＝区切り文字付きテキストはこれ。一覧に実在確認済み）\n② File Pathに teams.csv を指定し、Encoding（UTF-8）・区切り文字・ヘッダーの扱いを確認\n③ XPression側：Text Objectの Data Source タブ → DataLinq を選択 → Set → Sourceを選び Browse → 表から表示したいセルを選ぶ（Column=列番号／Row=行番号）\nまず1件表示して、文字化け・列ずれがないか確認する。\n\n✅ 確認：CSVの1件目（Row=2）のチーム名がText Objectに表示された。",
    "img": "v5_93_003.jpg",
    "tip": "CSVは半角英数字の列名・UTF-8がトラブりにくい。1行目（ヘッダー）がキーになる。",
    "tip_en": "CSV is least troublesome with single-byte alphanumeric column names and UTF-8. The first (header) row becomes the keys.",
    "h_en": "Get CSV working first",
    "body_en": "① In XPression DataLinq Server, Add DataLinq Source → Text DataLinq Source (this is the one for CSV = delimited text; confirmed present in the list)\n② Point File Path at teams.csv and confirm Encoding (UTF-8), delimiter, and header handling\n③ On the XPression side: Text Object's Data Source tab → choose DataLinq → Set → pick the Source, Browse → choose the cell to display from the table (Column = column number / Row = row number)\nDisplay one item first and check for mojibake or column shifts.\n\n✅ Check: The first CSV item's team name (Row=2) shows in the Text Object."
   },
   {
    "h": "行を切り替えて表示を変える",
    "body": "読み込んだ表の「どの行を表示するか」を切り替えると、名前やスコアが差し替わる。\n【実機確認済みの行番号ルール】CSVでは Set DataLinq Properties の Row＝行番号、Column＝列番号。ただし1行目はヘッダー行（TeamName等の見出し）としてカウントされるため、データ1件目は Row=2 になる（例：Row=2でTokyoTeam、Row=3でOsakaTeam）。JSONの players<2>（ヘッダー概念なし）とは数え方が違う点に注意。\nローワーサードなら1件ずつ、スコアボードならHome/Awayの2件を行違いで割り当てる。表（CSV）側を書き換えて再読み込みし、表示が追従するか確認する。\n\n✅ 確認：Rowを2→3に変えると表示が次のチーム（人）に切り替わる。CSVを書き換えて再読込すると追従する。",
    "tip": "行の切り替えを運用で楽にしたいときは、JSONハンズオンと同じDataLinq Key方式（Row欄に%キー名%）が使える。",
    "tip_en": "To make row switching easier in operation, the same DataLinq Key method as the JSON hands-on (%KeyName% in the Row field) works here too.",
    "h_en": "Switch rows to change the display",
    "body_en": "Switching which row displays swaps names and scores.\n[Machine-verified row numbering] For CSV, in Set DataLinq Properties Row = row number, Column = column number. The first line counts as the header row (TeamName etc.), so the first data item is Row=2 (e.g. Row=2 is TokyoTeam, Row=3 is OsakaTeam). Note this differs from JSON's players<2> (no header concept).\nFor a lower third assign one item at a time; for a scoreboard assign Home/Away to two different rows. Edit the CSV, reload, and confirm the display follows.\n\n✅ Check: Changing Row 2→3 switches to the next team (person). Editing and reloading the CSV updates the display.",
    "img": "v5_93_008.jpg"
   },
   {
    "h": "編集しやすさが要るならExcel、構造化ならJSON",
    "body": "現場担当者が頻繁に手編集するならExcelが選ばれやすい（ただし、どのシート・範囲・保存形式を読むかの読み取り方式を実機で確認）。項目が入れ子・外部システム連携ならJSON。断定より『現場で確認すべき観点』で選ぶ。\n\n✅ 確認：自分の現場ならどれを選ぶか、理由付きで説明できる。",
    "img": "v5_93_004.jpg",
    "h_en": "Excel if editability matters, JSON if structured",
    "body_en": "If on-site staff frequently hand-edit, Excel is the likely pick (but verify on the machine which sheet/range/save format gets read). For nested fields or external system integration, JSON. Choose by what needs checking on site, not by dogma.\n\n✅ Check: You can explain which you'd pick for your site, with reasons."
   },
   {
    "h": "本番挙動（更新・失敗時）を決める",
    "body": "Live Update（自動更新）は便利だが全項目で使うものではない。Poll every（取得間隔）は短ければよいわけではない。Return Empty on Failure（失敗時に空を返す）で、データが取れないときの見え方が決まる。取れないとき前の値が残るのか空になるのかを想定して選ぶ。\n\n✅ 確認：データを読めなくしたとき（ファイル名変更など）の表示が想定どおり（空／前回値）。",
    "img": "v5_93_005.jpg",
    "tip": "『空データ時にどう見えるか』を必ず一度作って確認。Prepend/Appendを使う場合は空データ時の挙動に注意。",
    "tip_en": "Always build and check 'how it looks with empty data' once. If you use Prepend/Append, watch their behavior with empty data.",
    "h_en": "Decide live behavior (updates and failures)",
    "body_en": "Live Update is handy but not for every item. A shorter Poll every isn't automatically better. Return Empty on Failure decides what shows when data can't be fetched. Anticipate whether a failure leaves the previous value or goes blank, and choose.\n\n✅ Check: Breaking the data (e.g. renaming the file) shows the expected result (blank / previous value)."
   },
   {
    "h": "Widgetsで切り替えも足す（任意）",
    "body": "手入力を減らす仕上げとしてWidgetsが使える：\n① Display > Widgets を開き、New Widget から作る：Text List（選択肢の切替）／Counter（スコアの増減）／Clock Timer（時刻・タイマー）\n② Widgetは作っただけでは表示に出ない。Text Objectの Data Source タブ → Widget を選んで割り当てて初めて効く\nDataLinq（外部データ）とWidget（現場操作の値）は分けて考える。\n\n✅ 確認：Widgetの値がText Objectに表示され、切り替えで変わる。",
    "img": "v5_93_006.jpg",
    "h_en": "Add switching with Widgets (optional)",
    "body_en": "Widgets finish the job of reducing manual entry:\n① Open Display > Widgets and create via New Widget: Text List (switch choices) / Counter (score up/down) / Clock Timer (time)\n② A Widget alone shows nothing. It only takes effect once assigned via the Text Object's Data Source tab → Widget\nKeep DataLinq (external data) and Widgets (operator-controlled values) conceptually separate.\n\n✅ Check: The Widget's value shows in the Text Object and changes when switched."
   },
   {
    "h": "本番前に確認する",
    "body": "データソースは『誰が編集し、どう壊れるか』で選ぶ。確認：想定する全データで正しく表示されるか／文字数が多い行でも崩れないか／データが取れない・空・欠番のときに大きく破綻しないか／編集ルール（列を消さない等）を担当者が守れるか。",
    "img": "v5_93_007.jpg",
    "h_en": "Check before the show",
    "body_en": "Choose the data source by who edits it and how it breaks. Confirm: does every expected dataset display correctly / do long rows avoid breakage / do missing, empty, or gap data avoid major breakage / can the staff follow the editing rules (don't delete columns, etc.)?"
   }
  ],
  "checklist": [
   "『何の値を・どのキーで・どこに出すか』を先に決めている",
   "CSVで1件表示→行切り替えで差し替わることを確認した",
   "形式（CSV/Excel/JSON）を『編集頻度・構造・連携』で選べている",
   "Live Update / Poll every / Return Empty on Failure の挙動を決めた",
   "空データ・欠番時の見え方を確認した",
   "Widgetを使う場合、Data Sourceへ割り当てて表示に反映している"
  ],
  "title_en": "Feed Scores and Names from CSV / Excel",
  "subtitle_en": "Reducing manual entry with DataLinq and Widgets",
  "goal_en": "Feed player names, scores, and team info from an external table (CSV/Excel) into Text Objects, so editing the table changes the display. Choose the data source by who edits it and how it breaks, and anticipate what failure looks like.",
  "overview_en": "Grasp DataLinq's common structure (data source → key → display target), then get CSV working first. Excel if editing frequency is high; JSON for structured/external integration. Finish with Widgets (Text List etc.) for switching. Try it with the bundled teams.csv / names_and_titles.csv.",
  "checklist_en": [
   "Decided \"what value, by which key, goes where\" first",
   "Confirmed one CSV item displays, then row switching swaps it",
   "Chose the format (CSV/Excel/JSON) by editing frequency, structure, and integration",
   "Decided Live Update / Poll every / Return Empty on Failure behavior",
   "Confirmed how empty data and gaps look",
   "If using Widgets, assigned them via Data Source so they show"
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
  "goal": "文字が少しずつずれて登場する見出し。設定を作る→Scene Director上の対象へ配置→再生して確認、の3ステップで、Timing Offsetsで『文字ごと／単語ごと／行ごと』のずれを設計する。差し替わっても成立する演出にする。作例：見出しText（Headline_TXT）を左から1文字ずつ。Track=Position.X を -120→0、Total Duration 150、Character offset 3フレーム、30fps。",
  "goalImg": "v3_90_001.jpg",
  "overview": "Stagger Animationは『きれいに作る』だけでなく『情報が差し替わっても成立する』演出を設計する道具。Track（何を動かすか）とKeyframe（動きの形）とTiming Offsets（ずれの単位）を分けて考える。",
  "steps": [
   {
    "h": "3ステップの流れを押さえる",
    "body": "Stagger Animationは①アニメーションの設定を作る ②その設定をScene Director上の対象の行へ配置する ③再生して見え方を確認する、の3つ。\n設定は右ドックの Stagger Animations パネル（New…／Edit…）で作る（実機確認済み）。\n\n✅ 確認：「①設定を作る→②配置する→③再生する」の3ステップを言える。",
    "img": "v3_90_002.jpg",
    "h_en": "Grasp the three-step flow",
    "body_en": "Stagger Animation is ① create the animation settings ② place those settings onto the target's row in the Scene Director ③ play and check how it looks.\nSettings are made in the right-dock Stagger Animations panel (New… / Edit…) (machine-verified).\n\n✅ Check: You can recite \"① create → ② place → ③ play\"."
   },
   {
    "h": "対象と名前を決める",
    "body": "動かすText ObjectをSceneに置く。オブジェクトは作った時点でScene Directorに行（トラック）が自動で用意されるので、手動で追加する必要はない（実機確認済み）。手動でやるのは、作ったStagger Animationを対象Textの行に配置するほう。\nStagger AnimationのNameとDescriptionは現場運用のために使う（後から見て何の動きか分かるように）。リアルタイムでは、きれいさだけでなく「あとから見ても分かる状態」が大事。\n\n✅ 確認：Scene Directorに対象Textの行があり、Stagger AnimationのName/Descriptionで用途が分かる。",
    "img": "v3_90_003.jpg",
    "h_en": "Decide the target and names",
    "body_en": "Place the Text Object to animate. Creating an object automatically gives it a row (track) in the Scene Director — no manual adding needed (machine-verified). What is manual is placing your Stagger Animation onto the target Text's row.\nUse the Stagger Animation's Name and Description for operations (so it's clear later what the motion is). In live graphics, being understandable later matters as much as looking good.\n\n✅ Check: The Scene Director has the target Text's row, and the Stagger Animation's Name/Description reveal its purpose."
   },
   {
    "h": "Trackで『何を動かすか』を決める",
    "body": "① Stagger Animations パネルで New… → できた StaggerAnimation1 を選んで Edit…\n② Edit Stagger Animation の Tracks で、動かすプロパティを追加（実機例 Position.X。登場演出なら Alpha＋Position が定番）\n動かす対象のプロパティだけTrackを持たせる。\n\n✅ 確認：Tracksに意図したプロパティ（例 Position.X）だけが並んでいる。",
    "img": "v3_90_004.jpg",
    "h_en": "Decide what moves with Tracks",
    "body_en": "① In the Stagger Animations panel: New… → select the created StaggerAnimation1 → Edit…\n② In Edit Stagger Animation's Tracks, add the properties to animate (verified example: Position.X; for entrances, Alpha + Position is the classic)\nGive Tracks only to the properties you'll move.\n\n✅ Check: Tracks contains only the intended properties (e.g. Position.X)."
   },
   {
    "h": "Keyframeで動きの形を作る",
    "body": "① 同じ Edit Stagger Animation の Track Animation で、変化のカーブを作る（作例：frame 0 で Position.X=-120、終わりで Position.X=0 のキーフレーム。Alpha も 0→255 を足すと登場が締まる）\n② Total Duration の Frames が全体尺（実機例 150）。1文字ぶんの変化の長さ（Clip Length）と全体尺は分けて考える\n尺を変えたら Recalculate Keyframe Positions で位置ずれがないか確認。\n\n✅ 確認：再生すると1つの塊として -120→0 に動く（まだ、ずれ無しでOK）。",
    "img": "v3_90_005.jpg",
    "tip": "Track Controlsは作業中の事故（誤って別Trackを動かす等）を減らすために使う。",
    "tip_en": "Track Controls exist to reduce mid-work accidents (like moving the wrong Track by mistake).",
    "h_en": "Shape the motion with Keyframes",
    "body_en": "① In the same Edit Stagger Animation's Track Animation, build the change curve (example: at frame 0 Position.X=-120, at the end Position.X=0; adding Alpha 0→255 makes the entrance crisper)\n② Total Duration's Frames is the overall length (verified example: 150). Think of one character's change length (Clip Length) separately from the overall length\nAfter changing the length, use Recalculate Keyframe Positions and confirm nothing shifted.\n\n✅ Check: Playing moves everything as one block from -120→0 (no offsets yet is fine)."
   },
   {
    "h": "Timing Offsetsでずれを作る（ここが中心）",
    "body": "① 同ダイアログの Timing Offsets に、ずらすフレーム数を入れる（実機例：Character 3.00／Word 6.00／Line 15.00／Paragraph 30.00）\n② Pivots の Mode（実機例 Baseline Center）は、ScaleやRotationを使うときの中心\n③ できたStagger Animationを、Scene Director の対象Textの行へドラッグして配置する\n日本語見出しなら Character か Word のずれが読みやすいことが多い。\n\n✅ 確認：Character／Word単位で文字が順番に出てくる。",
    "img": "v3_90_006.jpg",
    "h_en": "Create the offsets with Timing Offsets (the heart of it)",
    "body_en": "① In the same dialog's Timing Offsets, enter the offset frames (verified example: Character 3.00 / Word 6.00 / Line 15.00 / Paragraph 30.00)\n② Pivots' Mode (verified example: Baseline Center) is the center used by Scale and Rotation\n③ Drag the finished Stagger Animation onto the target Text's row in the Scene Director\nFor Japanese headlines, Character or Word offsets usually read best.\n\n✅ Check: Characters appear in sequence per Character/Word."
   },
   {
    "h": "再生して読めるか確認する",
    "body": "① Scene Director の再生（または再生ヘッドのドラッグ）でプレビューを確認\n② 「演出として気持ちよいか」だけでなく「読めるか」を見る。速すぎると文字が追えない\n③ Template Linksで文字を差し替え、長い名前・短い名前でも破綻しないか確認\n\n✅ 確認：再生途中でも文字が読め、差し替えても崩れない。",
    "h_en": "Play and confirm readability",
    "body_en": "① Preview via Scene Director playback (or dragging the playhead)\n② Judge not just \"does it feel good\" but \"can it be read\". Too fast and the eye can't follow\n③ Swap the text via Template Links and confirm long and short names both hold up\n\n✅ Check: Text is readable mid-playback and survives swaps.",
    "img": "v3_90_007.jpg"
   }
  ],
  "checklist": [
   "設定を作る→対象へ配置→再生確認、の3ステップで進めた",
   "Name / Description を後から分かるように付けた",
   "動かすTrack（Alpha/Position等）を必要な分だけ持たせた",
   "Clip LengthとTotal Durationを分けて考え、尺変更後に再計算で確認した",
   "Timing Offsetsのずれ単位（Character/Word/Line/Paragraph）を選んだ",
   "文字数が変わっても読める速度・崩れないことを確認した"
  ],
  "title_en": "Headline Reveals One Character at a Time with Stagger",
  "subtitle_en": "Text staging that stays readable on air",
  "goal_en": "A headline whose characters enter slightly offset. Three steps — create the settings → place onto the target in the Scene Director → play and check — designing per-character/word/line offsets with Timing Offsets. The staging must survive text swaps.",
  "overview_en": "Stagger Animation is a tool for designing staging that survives content swaps, not just for looking pretty. Think in three parts: Track (what moves), Keyframe (the shape of the motion), Timing Offsets (the unit of offset).",
  "checklist_en": [
   "Proceeded in three steps: create settings → place on target → play and check",
   "Gave Name / Description that make sense later",
   "Gave Tracks only to what needs moving (Alpha/Position etc.)",
   "Kept Clip Length and Total Duration separate; recalculated after length changes",
   "Chose the Timing Offsets unit (Character/Word/Line/Paragraph)",
   "Confirmed readable speed and no breakage across text lengths"
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
  "goal": "スタッフ名・役職が縦に流れるエンドロール。『どう動かすか』より『どう直すか・どう運用するか』を先に決め、Global Marginsで安全に見える範囲を保ち、Loopの止め方まで設計する。作例：Scene Group『EndRoll_Staff』に子Scene 3枚（タイトル→スタッフ一覧→締め）、Effect=Roll・Direction=Bottom To Top・Speed 2.000、Global Marginsで端を確保、Blank Page on Start/End＋Loopの止め方まで。",
  "goalImg": "v3_92_001.jpg",
  "overview": "Roll/Crawlは『動き』ではなく『運用』で考える。Scene Groupから作る（デザインのまとまり優先）かSequence側で作る（変更が多い運用向き）かをまず選ぶ。ここではScene Groupで縦Rollを作り、Direction・速度・余白・開始終了の空白・Loopを整える。",
  "steps": [
   {
    "h": "用途を先に決める",
    "body": "Scene Groupを作る前に『何を、どう流すか』を決める。スタッフロールならスタッフ名・役職を表示するSceneをまとめる。スポンサーRollならロゴ入りSceneをまとめる。地味だがここが一番大事。作るときは『どう動かすか』より『どう直すか（本番前の修正・別担当・再利用）』を先に考える。\n\n✅ 確認：何を・どの順で流すかが決まっている。",
    "img": "v3_92_002.jpg",
    "h_en": "Decide the purpose first",
    "body_en": "Before creating a Scene Group, decide what flows and how. For a staff roll, group the Scenes showing names and titles. For a sponsor Roll, group the logo Scenes. Unglamorous, but this matters most. Think how it will be fixed (pre-show edits, other staff, reuse) before how it moves.\n\n✅ Check: What flows, in what order, is decided."
   },
   {
    "h": "Scene GroupとSequenceのどちらで作るか選ぶ",
    "body": "Scene Group＝デザインのまとまりを優先、テンプレート構造に近い場所で管理。Sequence側（Take Item Group）＝内容変更が多い運用向き、送出の並びで管理。今回はScene Groupで作る。どちらでも『あとから直す人が理解できる構造』にする。\n\n✅ 確認：Scene Groupで作る理由を言える。",
    "img": "v3_92_003.jpg",
    "h_en": "Choose Scene Group or Sequence",
    "body_en": "Scene Group = design cohesion first, managed close to the template structure. Sequence side (Take Item Group) = suits frequent content changes, managed in playout order. We use a Scene Group this time. Either way, build a structure the next person can understand.\n\n✅ Check: You can state why you chose the Scene Group."
   },
   {
    "h": "Scene Groupを作り、中に「ページ」を積む",
    "body": "ロールの実体は「Scene Groupの中に積んだ子Scene」で作る（実機確認済みの構造）。\n① Scene ManagerでScene Groupを新規作成し、EndRoll_Staff のように後から見て分かる名前を付ける\n② そのグループの中に子Sceneを追加していく。子Scene1枚＝ロールの1ページ。Scene Managerで上から並んだ順番どおりに流れていく\n（例：1枚目=タイトルページ、2枚目=スタッフ名一覧、3枚目=スポンサー/締めページ）\n③ 各ページの中身は普通のSceneと同じ作り方（Textを置いて名前・役職を並べる）。1ページの高さ=Sceneの高さなので、長いスタッフ一覧はページを分けて積む\n④ 設定はグループ側に集約されている：Scene Groupを選択 → Object Inspectorの「Scene Group」タブが、Roll化・速度・余白・ループすべての入口\n\n✅ 確認：Scene ManagerでEndRoll_Staffの下に子Sceneがぶら下がり、順番が意図どおりに並んでいる。",
    "img": "v3_92_010.jpg",
    "tip": "グループ名が曖昧だと、修正・再利用の段階で誰も触れなくなる。ページの並び替えはScene Manager上の順番で決まる。",
    "tip_en": "Vague group names mean nobody can touch it at fix or reuse time. Page order is decided by the order in the Scene Manager.",
    "h_en": "Create the Scene Group and stack \"pages\" inside",
    "body_en": "The roll's substance is child Scenes stacked inside a Scene Group (machine-verified structure).\n① Create a Scene Group in the Scene Manager with a name that reads later, like EndRoll_Staff\n② Add child Scenes inside the group. One child Scene = one page of the roll. They flow in the top-down order shown in the Scene Manager\n(e.g. page 1 = title page, page 2 = staff list, page 3 = sponsors/closing page)\n③ Build each page like a normal Scene (place Text with names and titles). One page's height = the Scene height, so split long staff lists across pages\n④ Settings are centralized on the group: select the Scene Group → the Object Inspector's \"Scene Group\" tab is the entrance to Roll conversion, speed, margins, and looping\n\n✅ Check: Child Scenes hang under EndRoll_Staff in the Scene Manager, ordered as intended."
   },
   {
    "h": "EffectでRoll（縦）かCrawl（横）を選ぶ",
    "body": "Scene Groupを選択し、Object Inspectorの Scene Group タブ → Group欄で設定する（実機確認済み）：\n・Effect：Roll（縦に流す）／Crawl（横に流す）。スタッフロールはRoll\n・Direction：Bottom To Top（下から上へ＝視線の流れ）\n\n✅ 確認：Effect=Roll・Direction=Bottom To Top になっている。",
    "img": "v3_92_005.jpg",
    "h_en": "Choose Roll (vertical) or Crawl (horizontal) with Effect",
    "body_en": "Select the Scene Group and set it in the Object Inspector's Scene Group tab → Group section (machine-verified):\n- Effect: Roll (vertical) / Crawl (horizontal). A staff roll is Roll\n- Direction: Bottom To Top (following the eye)\n\n✅ Check: Effect = Roll, Direction = Bottom To Top."
   },
   {
    "h": "Duration（速度・時間感）を決める",
    "body": "手順3で開いた Scene Group タブの Duration 欄で決める（実機確認済み：Speed／Seconds／Framesのラジオ選択）：\n① まず Speed（実機例 2.000）で大きな見え方を作る\n② 秒数で管理したいなら Seconds、最後の詰めは Frames\n速すぎると読めず、遅すぎると間延びする。読みやすさ優先で。\n\n✅ 確認：最後まで読める速度になっている。",
    "tip": "最初はSpeed/Secondsでざっくり、そのあとFramesで微調整。",
    "tip_en": "Rough it in with Speed/Seconds first, then fine-tune with Frames.",
    "img": "v3_92_008.jpg",
    "h_en": "Decide Duration (speed / time feel)",
    "body_en": "Set it in the Duration section of the Scene Group tab from step 3 (machine-verified: radio choice of Speed / Seconds / Frames):\n① First shape the overall feel with Speed (verified example 2.000)\n② Use Seconds to manage by duration; fine-tune with Frames\nToo fast can't be read; too slow drags. Readability first.\n\n✅ Check: The speed lets you read to the end."
   },
   {
    "h": "Global Marginsで安全な範囲を保つ",
    "body": "同じ Scene Group タブの Global Margins 欄（Top／Bottom／Left／Right）で、画面端に対して安全に見える範囲を作る。\nテロップが端で切れたり、はみ出したりしないための運用上の設定。\n\n✅ 確認：画面端で文字が切れず、安全な範囲に収まっている。",
    "img": "v3_92_006.jpg",
    "h_en": "Keep a safe area with Global Margins",
    "body_en": "In the same Scene Group tab's Global Margins section (Top / Bottom / Left / Right), create a range that stays safe against the screen edges.\nAn operational setting so straps don't clip or bleed at the edges.\n\n✅ Check: No text clips at the edges; everything stays in the safe range."
   },
   {
    "h": "開始・終了の空白とLoopを設計する",
    "body": "同じ Scene Group タブで設定する（実機確認済みの欄構成）：\n① Header / Footer 欄：Blank Page on Start / Blank Page on End にチェック（いきなり文字が入る／唐突に切れるのを防ぐ）\n② Loop 欄：Enable Looping と Number of shows per scene。Loopは便利だが「本番でどう止めるか」を決めてから使う\n③ Start / Stop 欄：Ease In / Out（Frames）は気持ちよさより読みやすさで判断\n\n✅ 確認：開始・終了が唐突でなく、Loopの止め方が決まっている。",
    "img": "v3_92_009.jpg",
    "h_en": "Design leading/trailing blanks and the Loop",
    "body_en": "Set in the same Scene Group tab (machine-verified layout):\n① Header / Footer section: check Blank Page on Start / Blank Page on End (prevents text starting abruptly or cutting off suddenly)\n② Loop section: Enable Looping and Number of shows per scene. Loop is handy, but decide how to stop it live before using it\n③ Start / Stop section: judge Ease In / Out (Frames) by readability, not by feel\n\n✅ Check: Start and end aren't abrupt, and the Loop's stop is decided."
   },
   {
    "h": "本番前に確認する",
    "body": "確認：最後まで読める速度か／端で切れず安全範囲に収まるか／開始と終了が唐突でないか／Loopする場合に意図通り止められるか／Per Scene Lightingなどで見え方が変わらないか。差し替え（名前追加）しても崩れないかも見る。",
    "img": "v3_92_007.jpg",
    "h_en": "Check before the show",
    "body_en": "Confirm: readable speed to the end / nothing clips at edges and stays in the safe range / start and end aren't abrupt / if looping, it can be stopped as intended / Per Scene Lighting etc. doesn't change the look. Also confirm swaps (added names) don't break it."
   }
  ],
  "checklist": [
   "『どう動かすか』より『どう直すか・運用するか』を先に決めた",
   "Scene GroupとSequenceのどちらで作るか選び、理由が説明できる",
   "後から分かる名前を付けた",
   "速度は読みやすさ優先（Speed/Seconds→Framesで調整）",
   "Global Marginsで端で切れない",
   "Loopの止め方・開始終了の空白まで設計した"
  ],
  "title_en": "Build a Staff Roll (Roll)",
  "subtitle_en": "Designing Roll/Crawl with a Scene Group",
  "goal_en": "An end roll where staff names and titles scroll vertically. Decide how it will be fixed and operated before how it moves, keep a safe visible area with Global Margins, and design how the Loop stops. Example: a Scene Group 'EndRoll_Staff' with 3 child Scenes (title → staff list → closing), Effect=Roll, Direction=Bottom To Top, Speed 2.000, Global Margins for the safe area, Blank Page on Start/End, and a defined Loop stop.",
  "overview_en": "Think of Roll/Crawl as operations, not motion. First choose whether to build from a Scene Group (design cohesion first) or on the Sequence side (suits frequent changes). Here we build a vertical Roll with a Scene Group and tune Direction, speed, margins, leading/trailing blanks, and Loop.",
  "checklist_en": [
   "Decided how to fix/operate before how to move",
   "Chose Scene Group vs. Sequence and can explain why",
   "Used names that read later",
   "Speed prioritizes readability (Speed/Seconds → Frames)",
   "Global Margins prevent edge clipping",
   "Designed the Loop's stop and the leading/trailing blanks"
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
  "goal": "四角い表示範囲（ワイプ／切り抜き）を作り、その範囲を動かせるようにする。『消す』ではなく『見せる範囲を決める』考え方で、本番で調整が要る値だけをPublishして運用を壊さない。作例：背景動画に合わせてテキストをリビール。対象を Layer Object にまとめ、Blending=Alpha Mask のマテリアルを適用した Quad を Scene Director で frame 0→15、Position.X=-800→0 に動かす（Ctrl+K）。単純な矩形／端フェードなら Box Mask エフェクト（Left/Right Edge＋Feather）が最短。",
  "goalImg": "v2_91_001.jpg",
  "overview": "Maskは消す機能ではなく『見せる範囲を決める』考え方。『Box Mask』オブジェクトは無いが、Box Mask エフェクト（Effect＞Left/Right Edge＋Feather）はあり、単純な矩形／端フェードはこれが最短（Gradient の淵透明もこれ＝Gradient 単体では不可）。形状・アニメで抜くときは Material の Blending＝Alpha Mask を Quad に割り当てる。対象をLayer Objectでまとめる→Alpha Maskマテリアルを作りQuadに割り当てる→Scene Directorでキーフレーム（Ctrl+K）→Animation Controllerで補間をTCB Spline化して動きを合わせる→必要ならFeather（子Quad）で境界をぼかす→調整が要る値だけSequencerにPublish、の順。",
  "steps": [
   {
    "h": "Maskの考え方を押さえる",
    "body": "Maskは『消す』のではなく『見せる範囲を決める』。何を見せて何を隠すかを先に決めてから作ると迷わない。使う前に『どの範囲を、いつ、どう見せたいか』を確認する。\n\n✅ 確認：見せる範囲と隠す範囲を言葉にできる。",
    "img": "v2_91_002.jpg",
    "h_en": "Grasp the Mask mindset",
    "body_en": "A Mask decides what's shown, it doesn't erase. Decide what to show and what to hide before building and you won't get lost. Before using it, confirm which area, when, and how it should show.\n\n✅ Check: You can put the visible and hidden areas into words."
   },
   {
    "h": "Layer Objectで対象をまとめる",
    "body": "① Object Library の Layers > Layer Object をSceneに追加\n② マスクを効かせたいObjectたちを、Object Manager上でLayer Objectの子になる位置へドラッグ\nLayerはMaskの効き先を区切る単位（公式ヘルプ確認済み：あるLayerの中だけをマスクし、他のオブジェクトやLayerに影響させない）。\n※Layer Objectは Transform を持たない。まとめた範囲ごと位置・スケールを動かしたいときは Group に格納する（GroupはTransformを持つ）。\n\n✅ 確認：対象がまとまっている（動かすならTransformを持つGroupに入れている）。",
    "img": "v2_91_003.jpg",
    "tip": "Layer ObjectはTransformを持たないので、まとめて動かすならGroupに格納する。※Groupにする前にGroupの各Pos（X/Y/Z）を0に設定してから子を格納すると、位置がずれない。",
    "tip_en": "A Layer Object has no Transform, so nest it in a Group to move it as a whole. Set the Group's Pos (X/Y/Z) to 0 before nesting the children so nothing shifts.",
    "h_en": "Group the targets with a Layer / Group",
    "body_en": "① Add Layers > Layer Object from the Object Library to the Scene\n② Drag the objects to be masked so they become children of the Layer Object in the Object Manager\nThe Layer delimits where the Mask applies (confirmed in official help: mask only within one Layer without affecting other objects or Layers).\nNote: a Layer Object has no Transform. To move/scale the grouped area as a whole, put it inside a Group (a Group has a Transform).\n\n✅ Check: Targets are grouped (inside a Group with a Transform if they need to move)."
   },
   {
    "h": "マスクは Box Mask エフェクト か Alpha Mask マテリアルで作る",
    "body": "XPression に『Box Mask』という“オブジェクト”は無いが、“Box Mask エフェクト”（対象の Effect プロパティから追加）はある。用途で使い分ける：\n・単純な矩形マスクや端フェード（例：Gradient の淵だけを透明にする）＝ Box Mask エフェクト（Effect＞Left/Right（Top/Bottom）Edge で範囲を絞り、Feather で端を透明化）が最短。Gradient 単体では淵を透明にできない\n・形状で抜く／アニメでリビールする＝マスクを Material で作って Quad に割り当てる（以降この手順）\n① Material を新規作成し、Blending オプションを『Alpha Mask』に変更する\n② Quad を作成してこのマテリアルを適用し、マスクしたいテキスト等を覆うサイズにする。この Quad も（対象と同じ）Layer Object の中に入れる\n③ ※テキストがマスクで隠れてしまう場合は、テキストのレンダリング優先度（Rendering Priority）を『Normal』に変更する\n\n✅ 確認：目的に合わせて Box Mask エフェクト／Alpha Mask を選び、見せたい範囲だけが見えている。",
    "img": "v2_91_004.jpg",
    "tip": "矩形・端フェードは Box Mask エフェクト（Left/Right Edge＋Feather）が最短。Gradient の淵だけを透明にするのも Box Mask（Gradient 単体では不可）。形状/アニメ抜きは Material の Blending=Alpha Mask。テキストが隠れたら Rendering Priority を Normal に。",
    "tip_en": "For rectangles and edge fades, the Box Mask effect (Left/Right Edge + Feather) is quickest — including making only a Gradient's edges transparent (a Gradient alone can't). For shaped/animated cutouts, use a Material with Blending = Alpha Mask. If text disappears, set Rendering Priority to Normal.",
    "h_en": "Build the mask as a Box Mask effect or an Alpha Mask material",
    "body_en": "XPression has no \"Box Mask\" *object*, but a *Box Mask effect* does exist (added on the target's Effect property). Choose by use:\n・For a simple rectangular mask or edge fade (e.g. making only a Gradient's edges transparent) = the Box Mask effect (Effect > Left/Right (Top/Bottom) Edge to narrow the range, Feather to fade the edges) is quickest. A Gradient alone can't make its edges transparent\n・For shaped cutouts or animated reveals = build the mask as a Material and assign it to a Quad (steps below)\n① Create a new Material and change its Blending option to \"Alpha Mask\"\n② Create a Quad, apply this material, and size it to cover the text (etc.). Put this Quad inside the same Layer Object as the target\n③ Note: if the text gets hidden by the mask, change the text's Rendering Priority to \"Normal\"\n\n✅ Check: You picked Box Mask effect vs Alpha Mask by purpose, and only the intended area shows."
   },
   {
    "h": "Animation Controller でキーフレームを打ち、補間を整える",
    "body": "① キーフレーム（Ctrl+K）は Animation Controller に打つ（画面下部のタイムライン）。Scene Director を新規作成すると Track 1 に既定の Animation Controller が1つある。2つ目以降は空トラックを Add Track し、右クリック→Add Clip > Animation Controller で載せる\n② Ctrl+K の前に、再生スライダー（Playout Slider）を目的のフレームへ。0フレームで Quad を初期位置に置き Ctrl+K → スライダーを進めて移動させ再度 Ctrl+K\n③ 直線補間だと滑らかな背景とズレる。Animation Controller で補間を『TCB Spline』にし、Tension で背景にカーブを合わせる\n\n✅ 確認：スライダー位置を確認しながらキーを打ち、プレビューで動画とズレなく動く。",
    "img": "v2_91_005.jpg",
    "tip": "キーフレームは Animation Controller に Ctrl+K。打つ前に再生スライダーの位置を確認。イージングは TCB Spline＋Tension。★『矢印が伸びる』等の“境界を切る”表現は、Quad の X座標移動より Quad に Box Mask エフェクトを掛けて Right Edge をアニメする方が滑らかな場合がある。",
    "tip_en": "Keyframe on the Animation Controller with Ctrl+K. Check the playout slider position first. Ease with TCB Spline + Tension. ★For a 'cutting' effect like an extending arrow, animating a Box Mask effect's Right Edge on the Quad can be smoother than moving the Quad's X.",
    "h_en": "Keyframe on the Animation Controller and refine interpolation",
    "body_en": "① Keyframes (Ctrl+K) go on the Animation Controller (the timeline at the bottom). A newly created Scene Director already has one default Animation Controller on Track 1. For more, Add Track (empty) and right-click → Add Clip > Animation Controller\n② Before Ctrl+K, move the Playout Slider to the target frame. Place the Quad at its start position at frame 0 and Ctrl+K → advance the slider, move the Quad, and Ctrl+K again\n③ Linear interpolation drifts from the smooth background. Set interpolation to \"TCB Spline\" on the Animation Controller and use Tension to match the curve\n\n✅ Check: Keyframe while watching the slider position; in the preview it moves in step with the video."
   },
   {
    "h": "Feather（境界のぼかし）を子Quadで足す",
    "body": "境界を柔らかく出したいとき（フェザー）：\n① 別の Alpha Mask マテリアルを作り、両端のアルファを0（透明）にした Gradient（グラデーション）を設定する\n② これを新しい Quad に適用し、メインマスクQuadの『子オブジェクト』として配置する\n③ 子にすると親マスクの動きに自動追従しながら、境界が柔らかく（フェザー）出現する\n\n✅ 確認：境界がぼけて、親マスクの動きに追従している。",
    "img": "v2_91_008.jpg",
    "tip": "Featherは『別のAlpha Mask＋両端アルファ0のGradient』を子Quadに。親子にすると動きを継承できる。",
    "tip_en": "Feather = a second Alpha Mask with a both-ends-alpha-0 Gradient on a child Quad. Parenting inherits the motion.",
    "h_en": "Add a feather (soft edge) with a child Quad",
    "body_en": "For a soft edge (feather):\n① Create another Alpha Mask material and set a Gradient with both ends at alpha 0 (transparent)\n② Apply it to a new Quad and place it as a child object of the main mask Quad\n③ As a child it auto-follows the parent mask's motion while softening the boundary (feather)\n\n✅ Check: The edge is soft and follows the parent mask's motion."
   },
   {
    "h": "調整が要る値だけPublishする",
    "body": "① 本番で調整する値だけを、対象オブジェクトの Template Links タブでチェックして公開する\n② 公開した値はSequencerのTake Inspectorに並ぶ。運用者が意味を理解できる名前にしておく\n判断基準：本番中に本当に調整するか／制作用の値を残していないか／触ってはいけない値まで公開していないか／初期値に戻せるか\n\n✅ 確認：Publishした値だけがTake Inspectorに出て、意味が分かる名前になっている。",
    "img": "v2_91_006.jpg",
    "h_en": "Publish only the values that need adjustment",
    "body_en": "① Check only the values adjusted during the show on the target object's Template Links tab to publish them\n② Published values appear in the Sequencer's Take Inspector. Name them so operators understand them\nCriteria: will it really be adjusted live / any leftover build-time values / any values published that must not be touched / can defaults be restored\n\n✅ Check: Only published values appear in the Take Inspector, with understandable names."
   },
   {
    "h": "本番前チェックと切り分け",
    "body": "確認：見せたい範囲だけが見え、隠したいものが隠れているか／範囲を動かしたとき破綻しないか／Publishした値が運用者に分かるか。うまくいかないときは、Layer構成・Mask種別・重なり順の順で切り分ける。",
    "img": "v2_91_007.jpg",
    "h_en": "Pre-show checks and isolation",
    "body_en": "Confirm: only the intended area shows and the rest hides / moving the area doesn't break anything / operators understand the published values. When it misbehaves, isolate in this order: Layer structure → Mask type → stacking order."
   }
  ],
  "checklist": [
   "『消す』ではなく『見せる範囲を決める』で設計している",
   "対象をLayer Objectでまとめた（動かすならTransformを持つGroup）",
   "Alpha Maskマテリアル（Blending=Alpha Mask）を作りQuadに割り当てた",
   "Scene Directorでキーフレーム（Ctrl+K）、Animation Controllerで補間をTCB Splineに整えた",
   "必要ならFeather（子Quad＋両端アルファ0のGradient）で境界をぼかした",
   "本番で調整する値だけをPublishし、触らせたくない値は隠した",
   "初期値へ戻せる／項目名が運用者に分かる"
  ],
  "title_en": "Create a Visible Area with Mask",
  "subtitle_en": "Designing what to hide, cut out, and show",
  "goal_en": "Create a rectangular display area (wipe / cutout) and make it movable. Think \"decide what's visible\" rather than \"erase\", and Publish only the values that need live adjustment so operations don't break. Example: reveal text in sync with a background video — group the target in a Layer Object, apply a Blending = Alpha Mask material to a Quad, and animate it in the Scene Director frame 0→15, Position.X = -800→0 (Ctrl+K). For a simple rectangle or edge fade, the Box Mask effect (Left/Right Edge + Feather) is quickest.",
  "overview_en": "Mask isn't an eraser — it decides the visible area. There's no \"Box Mask\" object, but a Box Mask effect exists (Effect > Left/Right Edge + Feather) and is quickest for a simple rectangle or edge fade (including making a Gradient's edges transparent — a Gradient alone can't). For shaped/animated cutouts, assign a Material with Blending = Alpha Mask to a Quad. Order: group with a Layer Object → build an Alpha Mask material and assign it to a Quad → keyframe in the Scene Director (Ctrl+K) → set the Animation Controller interpolation to TCB Spline to match the motion → optionally feather the edge with a child Quad → Publish only the values needing adjustment to the Sequencer.",
  "checklist_en": [
   "Designed as \"decide the visible area\", not \"erase\"",
   "Grouped the targets with a Layer Object (a Group with a Transform if it must move)",
   "Built an Alpha Mask material (Blending = Alpha Mask) and assigned it to a Quad",
   "Keyframed in the Scene Director (Ctrl+K); set interpolation to TCB Spline in the Animation Controller",
   "Feathered the edge with a child Quad (a second Alpha Mask + both-ends-alpha-0 Gradient) if needed",
   "Published only live-adjusted values; hid untouchable ones",
   "Defaults are restorable / item names make sense to operators"
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
  "goal": "文字が載る部分を少し暗くした『読ませるための座布団』や、端に向かって透明にして映像になじむパネルを作る。派手さではなく、コントロールできる色面を目的から設計する。作例：ローワーサードの座布団。Material Editor＞Add Shader＞Gradient で上2色を明・下2色を暗（下側アルファ高め）にし、文字の下を濃く。両端だけ透明にしたいときは Box Mask エフェクト（Left/Right Edge＋Feather）を併用（Gradient 単体では不可）。",
  "goalImg": "v2_92_001.jpg",
  "overview": "Gradientは4色のリニアグラデーション（透明度も扱える）。『きれいな背景』ではなく『情報が読みやすい色面』として使う。目的を決める→文字の載る場所を先に置く→色と透明度に役割を持たせる→少しずつ調整、の順。※4色＝四隅のみなので『片側フェード』は可だが『両端透明（中央濃・淵だけ透明）』は1つのGradientでは不可→Box Mask エフェクト（Effect＞Left/Right Edge＋Feather）を併用する。",
  "steps": [
   {
    "h": "目的を先に決める",
    "body": "Gradientは4色のリニアグラデーションで、透明度も含められる。作る前に目的を決める：上を少し明るく下を暗く／文字の後ろだけ暗くして読みやすい座布団／端に向かって透明にして映像になじませる、など。『きれいな背景』とだけ考えない。\n\n✅ 確認：この色面の目的（なじませ／文字の座布団など）を言える。",
    "img": "v2_92_002.jpg",
    "h_en": "Decide the purpose first",
    "body_en": "Gradient is a four-color linear gradient, opacity included. Decide the purpose before building: brighter top and darker bottom / a dark cushion only behind text for readability / fading to transparent toward the edge to blend into video, etc. Don't think of it as just a pretty background.\n\n✅ Check: You can state this color field's purpose (blending / text cushion, etc.)."
   },
   {
    "h": "情報が載る場所を先に置く",
    "body": "色より先に、文字や数字が載る位置を決める。仮の文字を先に置いてから色面を作ると、あとで読みにくくならない。位置が決まらないまま色を作ると、文字を載せたとき破綻しやすい。\n\n✅ 確認：仮の文字が置かれ、載る位置が決まっている。",
    "img": "v2_92_003.jpg",
    "h_en": "Place the information first",
    "body_en": "Before the colors, decide where text and numbers go. Place placeholder text first, then build the color field, and it won't turn unreadable later. Colors made before the layout tend to break once text lands.\n\n✅ Check: Placeholder text is placed and its position decided."
   },
   {
    "h": "4色で役割を持たせる",
    "body": "① Material Editor で新規Materialを作り、Add Shader > Gradient を選ぶ（メニュー実在確認済み）\n② 4色（四隅）それぞれに役割を持たせて色を設定する：上2色を明るく・下2色を暗く（縦方向の変化だけ作る）／片側だけ暗くして文字置き場を作る、など\n派手にするためではなく、明るさ・色味の変化に役割を持たせるのが目的。\n\n✅ 確認：4色それぞれの役割を説明できる。",
    "img": "v2_92_004.jpg",
    "h_en": "Give the four colors roles",
    "body_en": "① Create a new Material in the Material Editor and choose Add Shader > Gradient (menu confirmed to exist)\n② Set each of the four corner colors with a role: two top colors bright, two bottom dark (variation in one direction only) / darken one side as a text area, etc.\nThe aim is giving brightness and hue changes a role, not making it flashy.\n\n✅ Check: You can explain each corner's role."
   },
   {
    "h": "透明度で『なじませる』と『読ませる』を両立（両端透明は Box Mask）",
    "body": "① 各コーナーの色のアルファ（透明度）を調整する：外側の色だけアルファを下げて映像になじませる／文字が載る部分は不透明寄りを保つ\n② 角1か所だけ透明度を変えて抜け感を作る、という使い方もできる\n③ ★4色リニアの限界：透明度は四隅にしか置けない。『片側だけ透明』はできるが、『中央だけ濃く両端を透明（透明→不透明→透明の3段階）』は1つの Gradient では作れない\n④ 両端（淵）を透明にしたいときは Box Mask エフェクトを併用する：対象（Quad/Slab等）の Effect プロパティに Box Mask を追加 → Left/Right（またはTop/Bottom）Edge で表示範囲を中央に絞り、Feather を大きくして端を滑らかに透明化。複数まとめるなら Layer Object に Box Mask。アルファ付きPNG（両端透明のグラデ）を Texture Material で読む手もある（Alpha Channel Interpretation を確認）\n\n✅ 確認：端はなじみ、文字の下は読める濃さ。両端透明が要るときは Box Mask を併用している。",
    "img": "v2_92_005.jpg",
    "tip": "★Gradient だけでは『両端透明（中央濃・淵だけ透明）』は作れない（4色＝四隅のみ）。両端フェードは Box Mask エフェクト（Left/Right Edge＋Feather）が現場の定石。",
    "tip_en": "★A Gradient alone can't do 'both ends transparent, center opaque' (4 colors = corners only). Fade both edges with the Box Mask effect (Left/Right Edge + Feather).",
    "h_en": "Balance \"blending\" and \"reading\" with opacity (both ends transparent = Box Mask)",
    "body_en": "① Adjust each corner color's alpha: lower only the outer colors to blend into video / keep the text area near-opaque\n② You can also lower just one corner's opacity for an airy touch\n③ ★Limit of the 4-color linear gradient: alpha lives only at the four corners. 'Fade one side' works, but 'center opaque with both ends transparent (transparent→opaque→transparent, 3 stages)' can't be made in a single Gradient\n④ To make both edges transparent, combine the Box Mask effect: add Box Mask on the target's (Quad/Slab, etc.) Effect property → narrow the visible range with Left/Right (or Top/Bottom) Edge, and raise Feather to fade the edges smoothly. For several objects at once, put a Box Mask on a Layer Object. You can also load an alpha PNG (a gradient transparent at both ends) as a Texture Material (check Alpha Channel Interpretation)\n\n✅ Check: Edges blend and the text stays readable; use Box Mask when both ends must be transparent."
   },
   {
    "h": "少しずつ変えて確認する",
    "body": "設定は少しずつ変える。派手に作るより、コントロールできる状態で作るのが大事。ローワーサードなら文字の下を暗く、スコア表示なら数字が読める濃さ、チームカラーは強すぎない範囲でなじませる。\n\n✅ 確認：実際に文字を載せた状態で読める。",
    "img": "v2_92_006.jpg",
    "h_en": "Change little by little and verify",
    "body_en": "Adjust in small steps. Controllability beats flash. Lower thirds: darker under the text. Score displays: dense enough that digits read. Team colors: blended, not overpowering.\n\n✅ Check: It reads with actual text on it."
   }
  ],
  "checklist": [
   "作る前に目的（読ませる/なじませる）を決めた",
   "文字・数字の載る場所を先に置いてから色を作った",
   "4色に役割を持たせた（変化の方向を絞った）",
   "透明度で『なじませる』と『読ませる』を両立できている",
   "両端透明が必要なときは Box Mask エフェクトを併用した（Gradient だけでは不可）",
   "文字の下が読める濃さになっている",
   "派手さより、コントロールできる色面になっている"
  ],
  "title_en": "Build Readable Color Fields with Gradient",
  "subtitle_en": "Designing usable color fields, not decoration",
  "goal_en": "Build a \"reading cushion\" that slightly darkens the area under text, or a panel fading to transparent at the edge to blend with video. Design controllable color fields from the purpose, not for flash. Example: a lower-third cushion — in Material Editor > Add Shader > Gradient, make the two top colors light and the two bottom dark (higher bottom alpha) so it's denser under the text. To make only both ends transparent, combine the Box Mask effect (Left/Right Edge + Feather); a Gradient alone can't.",
  "overview_en": "Gradient is a four-color linear gradient (with opacity). Use it as a color field that keeps information readable, not a pretty background. Order: decide the purpose → place the text area first → give colors and opacity roles → adjust in small steps. Note: 4 colors = corners only, so 'fade one side' works but 'both ends transparent (center opaque)' can't be done in one Gradient → combine the Box Mask effect (Effect > Left/Right Edge + Feather).",
  "checklist_en": [
   "Decided the purpose (read / blend) before building",
   "Placed the text/number areas before the colors",
   "Gave the four colors roles (constrained the direction of change)",
   "Opacity balances blending and readability",
   "Used the Box Mask effect when both ends must be transparent (a Gradient alone can't)",
   "The area under text is dense enough to read",
   "The result is a controllable color field, not a flashy one"
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
  "goal": "現在時刻の表示と、試合・イベント開始までのカウントダウンを作る。時間を『文字』ではなく『変化する情報』として扱い、目標時刻を作って現在時刻との差を出し、見やすい文字列に整える。作例（VLは Timers/Counters）：現在時刻＝Clock→Format Date Time→Text。カウントダウン＝Clock と Encode Date Time（目標時刻）を Time Delta に入れ、Hours/Minutes/Seconds を Format Date Time で整形して Text へ。",
  "goalImg": "v4_93_001.jpg",
  "overview": "Clockだけで済む場面（現在時刻をそのまま出す）と、Date Timeブロックが要る場面（目標時刻との差＝カウントダウン等）を切り分ける。Clockで現在時刻→Encode Date Timeで目標時刻→Time Deltaで差→Format Date Timeで整える、が基本の流れ。",
  "steps": [
   {
    "h": "時間を『変化する情報』として捉える",
    "body": "実務の時間表示（開始時刻・開始日・カウントダウン・曜日・一定時刻での切替）は『時間が変化する』前提で作る。完成した1枚の絵ではなく、値が変わっても成立する仕組みを作る。\n\n✅ 確認：作る表示が「変化する情報」であることを説明できる。",
    "img": "v4_93_002.jpg",
    "h_en": "See time as changing information",
    "body_en": "Practical time displays (start time, start date, countdowns, weekday, switching at a set time) assume time changes. Build a mechanism that holds as values change — not a finished still image.\n\n✅ Check: You can explain that this display is \"changing information\"."
   },
   {
    "h": "ClockかDate Timeブロックかを切り分ける",
    "body": "現在時刻や日付をそのまま出すだけなら Clock で足りる。「目標時刻との差（カウントダウン）」「日時を分解して曜日を出す」「指定した年月日から日時を作る」には Date Time系ブロックが要る。\nどちらもVisual Logic Editorの Timers/Counters カテゴリにある（Clock・Encode/Decode Date Time・Time Delta・Format Date Time などの Date Time 系ブロックはここ。実機のブロック一覧で確認済み）。\n\n✅ 確認：Clockだけで足りるか、Date Time系ブロックが要るか判断できた。",
    "img": "v4_93_003.jpg",
    "h_en": "Clock or Date Time blocks — decide which",
    "body_en": "If you just show the current time or date, Clock suffices. For \"difference from a target time (countdown)\", \"decomposing a datetime to get the weekday\", or \"building a datetime from a given date\", you need the Date Time blocks.\nBoth live in the Visual Logic Editor under Timers/Counters (Clock and the Date Time blocks — Encode/Decode Date Time, Time Delta, Format Date Time — are here; confirmed in the machine's block list).\n\n✅ Check: You decided whether Clock is enough or Date Time blocks are needed."
   },
   {
    "h": "現在時刻をそのまま出す（Clock）",
    "body": "① SceneのVisual Logic Editorを開く\n② Timers/Counters から Clock をドラッグ（Clock は Function Blocks ではなく Timers/Counters にある）\n③ Clockの出力 → Format Date Time（表示用の文字列に整形）→ 表示用Textの Text に接続\n④ 時・分・秒のうち必要な桁だけ出す書式にする\n\n✅ 確認：現在時刻がTextに表示され、秒が進んでいる。",
    "img": "v4_93_004.jpg",
    "h_en": "Show the current time as-is (Clock)",
    "body_en": "① Open the Scene's Visual Logic Editor\n② Drag Clock from Timers/Counters (Clock is under Timers/Counters, not Function Blocks)\n③ Clock output → Format Date Time (shape into a display string) → the display Text's Text\n④ Use a format showing only the digits you need (hours/minutes/seconds)\n\n✅ Check: The current time shows in the Text and the seconds advance."
   },
   {
    "h": "目標時刻を作る（Encode Date Time）",
    "body": "① Timers/Counters の Encode Date Time をドラッグ\n② 年・月・日・時・分・秒を入力（Math の Value ブロックで与える）して、試合開始時刻などの目標日時を組み立てる\n\n✅ 確認：Encode Date Timeから目標日時が出力されている。",
    "img": "v4_93_005.jpg",
    "tip": "月末±1か月のような境界（1/31の1か月後など）は期待通りになるか実機で確認。",
    "tip_en": "Check that boundary cases like end-of-month ±1 month (e.g. one month after 1/31) behave as expected on the real system.",
    "h_en": "Build the target time (Encode Date Time)",
    "body_en": "① Drag Encode Date Time (Timers/Counters)\n② Enter year/month/day/hour/minute/second (fed by Value blocks from Math) to assemble the target datetime, e.g. the game start\n\n✅ Check: Encode Date Time outputs the target datetime."
   },
   {
    "h": "差を計算して残り時間を出す（Time Delta）",
    "body": "① Timers/Counters の Time Delta をドラッグ\n② Clock（現在時刻）と Encode Date Time（目標時刻）を Time Delta に接続して差を計算\n③ 出力の Days／Hours／Minutes／Seconds を使って残り時間を表示につなぐ\n\n✅ 確認：残り時間（目標−現在）が表示され、1秒ごとに減っていく。",
    "img": "v4_93_006.jpg",
    "h_en": "Compute the difference for time remaining (Time Delta)",
    "body_en": "① Drag Time Delta (Timers/Counters)\n② Wire Clock (now) and Encode Date Time (target) into Time Delta to compute the difference\n③ Use the Days / Hours / Minutes / Seconds outputs to display the remaining time\n\n✅ Check: The remaining time (target − now) displays and decreases each second."
   },
   {
    "h": "表示用に整える（Format Date Time）",
    "body": "① Format Date Time で表示用の文字列に整える。曜日が要るなら Day of the Week で取り出す\n② 桁数が変わると幅が動くので、Text Objectの幅と揃えを確認（数字はFontのMonospace Numbersが安定）\n\n✅ 確認：表示形式が意図どおりで、桁が変わっても幅が崩れない。",
    "img": "v4_93_007.jpg",
    "h_en": "Shape it for display (Format Date Time)",
    "body_en": "① Shape the display string with Format Date Time. If you need the weekday, extract it with Day of the Week\n② Width moves as digit counts change, so check the Text Object's width and alignment (the Font's Monospace Numbers setting stabilizes digits)\n\n✅ Check: The format is as intended and width holds as digits change."
   },
   {
    "h": "本番前に確認する",
    "body": "確認：現在時刻が正しく更新されるか／カウントダウンが0に近づくときの表示が破綻しないか／桁数が変わっても揃うか／タイムゾーンや基準時刻が意図通りか。値が変化し続ける前提で、しばらく置いて確認する。",
    "img": "v4_93_008.jpg",
    "h_en": "Check before the show",
    "body_en": "Confirm: the current time updates correctly / the display holds as the countdown nears zero / alignment holds as digit counts change / time zone and reference time are as intended. Since values keep changing, leave it running for a while and observe."
   }
  ],
  "checklist": [
   "時間を『変化する情報』として扱っている",
   "Clockで足りるか、Date Timeブロックが要るかを切り分けた",
   "Encode Date Timeで目標時刻を作れた",
   "Time Deltaで差を出し、残り時間を表示できた",
   "Format Date Timeで見やすく整え、桁揺れを確認した",
   "しばらく動かして更新・境界の破綻がないことを確認した"
  ],
  "title_en": "Show the Current Time and a Countdown",
  "subtitle_en": "Treating time as changing information with Date Time",
  "goal_en": "Build a current-time display and a countdown to a game/event start. Treat time as changing information rather than text: build a target time, compute the difference from now, and format it into a readable string.",
  "overview_en": "Separate cases where Clock alone suffices (showing the current time as-is) from cases needing Date Time blocks (difference from a target = countdowns etc.). The basic flow: Clock for now → Encode Date Time for the target → Time Delta for the difference → Format Date Time to present it.",
  "checklist_en": [
   "Treating time as changing information",
   "Decided whether Clock suffices or Date Time blocks are needed",
   "Built the target time with Encode Date Time",
   "Computed the difference with Time Delta and displayed the remaining time",
   "Shaped it with Format Date Time and checked digit jitter",
   "Ran it a while and confirmed no update/boundary breakage"
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
  "goal": "別Sceneで作った情報表示（スコアや選手カード）を、演出Scene内のQuad＝仮想モニターに貼って表示する。素材Scene側を直すと演出側にも反映される「Sceneの部品化」を体験する。作例：素材 Scene『SRC_ScorePanel』を作り、Material Editor で Render View マテリアルを新規作成→参照 Scene に SRC_ScorePanel を指定→そのマテリアルを演出 Scene の Quad（VirtualMonitor）に割り当て。素材側を直すと Quad に即反映。",
  "overview": "「素材Sceneを用意」「貼り先のQuadを置く」「Render View Shaderを追加」「Resolutionを決める」「収まりを調整」「更新と参照関係を確認」の順で進めます。",
  "steps": [
   {
    "h": "素材になる情報Sceneを用意する",
    "body": "表示したい情報（例：スコア表示や選手カード）を、独立したSceneとして作る。名前は SRC_ScorePanel のように「部品」であることが分かる名前にする。文字が読める大きさで作り、背景は透過か単色にしておくと、貼ったときに扱いやすい。\n\n✅ 確認：素材Sceneが単体で正しく表示される。演出側のSceneと同じ名前にしない（同名だとどちらが素材か分からなくなる。例：素材=SRC_ScorePanel／演出=RV_Monitor）。",
    "h_en": "Prepare the source info Scene",
    "body_en": "Build the information to show (e.g. a score panel or player card) as an independent Scene. Name it so it reads as a component, like SRC_ScorePanel. Build at a readable size, with a transparent or solid background for easy pasting.\n\n✅ Check: The source Scene displays correctly on its own. Don't give it the same name as the staging Scene (same names hide which is the source; e.g. source = SRC_ScorePanel / staging = RV_Monitor)."
   },
   {
    "h": "演出Scene側に貼り先のQuadを置く",
    "body": "① Object Library の Primitives > Quad を演出Sceneにドラッグ\n② Object Managerで Monitor_Main など役割が分かる名前を付ける\n③ 少し角度を付けて置くと「画面の中のモニター」らしく見える\n\n✅ 確認：Quadが意図した位置・角度で置かれている。",
    "h_en": "Place the target Quad in the staging Scene",
    "body_en": "① Drag Primitives > Quad from the Object Library into the staging Scene\n② Name it by role in the Object Manager, e.g. Monitor_Main\n③ A slight angle makes it look like a monitor within the picture\n\n✅ Check: The Quad sits at the intended position and angle."
   },
   {
    "h": "MaterialにRender View Shaderを追加する",
    "body": "Material Editorで新しいMaterialを作り、Add Shader > Render View を選ぶ。Scene / Camera Source で素材Sceneと使用するカメラを指定し、このMaterialをQuadに割り当てる。\n\n✅ 確認：Quadの面に素材Sceneの絵が表示される。",
    "tip": "表示されないときは、素材Sceneの指定→カメラの指定→Materialの割り当て先、の順に確認する。素材側のCameraはOrtho Cameraを選ぶと、パネルの文字が歪まず「読ませる画面」になる（第3巻のCamera選びの実践）。",
    "tip_en": "When nothing shows, check in order: the source Scene assignment → the camera assignment → where the Material is applied. Choosing an Ortho Camera on the source side keeps panel text undistorted — a 'screen meant to be read' (Vol. 3's camera choice in practice).",
    "img": "v2_90_002.jpg",
    "h_en": "Add a Render View Shader to the Material",
    "body_en": "Create a new Material in the Material Editor and choose Add Shader > Render View. Specify the source Scene and camera in Scene / Camera Source, then assign this Material to the Quad.\n\n✅ Check: The source Scene's picture appears on the Quad's face."
   },
   {
    "h": "Resolutionを使うサイズから決める",
    "body": "Render ViewのResolution（Width / Height）を、最終的に画面でどの大きさに見えるかから決める。実機での目安（1920×1080のパネルを大画面LEDに貼った場合）：100×100＝明確にぼけて読めない／480×270＝やや甘い／1920×1080＝鮮明。高すぎると描画負荷、低すぎると文字がぼける。\n\n✅ 確認：一度100×100まで落としてぼけを体感し、文字が読める解像度に戻す。",
    "img": "v2_90_003.jpg",
    "h_en": "Decide Resolution from the displayed size",
    "body_en": "Decide the Render View's Resolution (Width / Height) from how large it finally appears on screen. Machine-tested reference (a 1920×1080 panel pasted onto a large LED): 100×100 = clearly blurred, unreadable / 480×270 = a bit soft / 1920×1080 = sharp. Too high costs render load; too low blurs text.\n\n✅ Check: Drop it to 100×100 once to feel the blur, then return to a readable resolution."
   },
   {
    "h": "Texture Coordinatesで収まりを調整する",
    "body": "貼った絵の位置・スケールをTexture Coordinatesで整え、パネルからのはみ出しや余白を調整する。\n\n✅ 確認：素材の端がQuadに正しく収まっている。",
    "img": "v2_90_004.jpg",
    "h_en": "Adjust the fit with Texture Coordinates",
    "body_en": "Tidy the pasted picture's position and scale with Texture Coordinates, adjusting overflow and margins against the panel.\n\n✅ Check: The source's edges sit correctly within the Quad."
   },
   {
    "h": "更新と参照関係を確認する",
    "body": "素材Scene側の文字や色を変更し、演出Scene側の仮想モニターに反映されることを確認する。\n【実機確認済み】素材Sceneをリネームしても、Render View MaterialのScene参照は自動で追従する（名前の文字列ではなく内部参照。リネームで壊れない）。ただし削除は別なので、素材Sceneを消す前は使用先を必ず確認する。\n最後に「どのSceneが、どのMaterialで、どのObjectに使われているか」を説明できる状態にしておく。\n\n✅ 確認：素材側の変更が仮想モニターに反映される。リネームしても表示が維持される。",
    "tip": "Render Viewの多用は参照関係を複雑にする。「部品化する理由」を言えるものだけに使う。",
    "tip_en": "Heavy use of Render View complicates the reference graph. Use it only where you can state the reason for making something a component.",
    "h_en": "Verify updates and the reference graph",
    "body_en": "Change text or colors in the source Scene and confirm the staging Scene's virtual monitor updates.\n[Machine-verified] Renaming the source Scene keeps the Render View Material's Scene reference intact (an internal reference, not the name string — renames don't break it). Deletion is different: always check usages before deleting a source Scene.\nFinally, be able to explain which Scene is used by which Material on which Object.\n\n✅ Check: Source-side changes appear on the virtual monitor. Renaming keeps the display."
   }
  ],
  "checklist": [
   "素材SceneとMaterialに「部品」と分かる名前が付いているか",
   "Resolutionが使うサイズに合っているか（過剰・不足なし）",
   "貼った状態で文字が読めるか",
   "演出Scene全体の負荷に問題がないか",
   "本番中に触る値と制作時に固定する値が分かれているか",
   "素材Sceneを消したり改名したときの影響範囲を把握しているか"
  ],
  "goalImg": "v2_90_001.jpg",
  "title_en": "Build a Virtual Monitor with Render View",
  "subtitle_en": "Turning a Scene into an asset inside your staging",
  "goal_en": "Paste an info display built in another Scene (score or player card) onto a Quad — a virtual monitor — inside a staging Scene. Experience \"Scene as a component\": fixing the source Scene updates the staging side too.",
  "overview_en": "Proceed in order: prepare the source Scene → place the target Quad → add the Render View Shader → decide the Resolution → adjust the fit → verify updates and the reference graph.",
  "checklist_en": [
   "The source Scene and Material have component-revealing names",
   "Resolution matches the displayed size (no excess, no shortfall)",
   "Text is readable in the pasted state",
   "The staging Scene's overall load is acceptable",
   "Live-adjusted values are separated from build-time fixed ones",
   "You know the impact range of deleting or renaming the source Scene"
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
  "goal": "選手リストのJSONをDataLinqで読み込み、選手名・背番号・ポジションをTextに表示する。さらにDataLinq Keyを使って「キーを1つ変えると行全体（名前・番号・ポジション）が連動して切り替わる」現場運用の形まで作る。素材は 13_JSON_PlayerList フォルダの players.json 一式を使用。作例：players.json を DataLinq に追加し Table Presets で読み込み、行は players<N>（例 players0）で指定、Name/Number/Position を各 Text にバインド。Key を1つ変えると行全体が連動。JSONはUTF-8保存・再Takeで反映。",
  "overview": "「JSONを用意」「DataLinq ServerでSource追加（Encoding=UTF-8が重要）」「ツリーからTextに割り当て」「Table Presets（任意）」「DataLinq Keyで行連動」「Sequencer/外部からKey変更」「更新確認」「壊れたデータ確認」の順です。",
  "steps": [
   {
    "h": "サンプルJSONを用意する",
    "body": "素材フォルダ 13_JSON_PlayerList の players.json を使う（UTF-8・BOMなし）。構造は team > players[] > name / name_en / number / position。6人目はわざと超長い名前にしてあり、幅崩れの確認に使える。\n\n✅ 確認：エディタで開けて、構造（players配列の中に選手オブジェクト）を説明できる。",
    "h_en": "Prepare the sample JSON",
    "body_en": "Use players.json from the 13_JSON_PlayerList assets (UTF-8, no BOM). Structure: team > players[] > name / name_en / number / position. Player 6 deliberately has an extra-long name for width-breakage checks.\n\n✅ Check: You can open it in an editor and explain the structure (player objects inside a players array)."
   },
   {
    "h": "DataLinq ServerでJSON Sourceを追加する",
    "body": "XPression DataLinq Server（XPression本体とは別ウィンドウ）で Add DataLinq Source →一覧から「JSON DataLinq Source」（Provides access to JSON data files）を選びOK。\nJSON Linq - Configuration で：\n・File Path：players.json を指定\n・Encoding：ASCII（既定）→ UTF-8 に必ず変更（ASCIIのままだと日本語が文字化けする）\n・更新方式：ローカルファイルなら Wait for file change events（画面注記どおりネットワークドライブでは非推奨）、または Poll every 秒指定\n\n✅ 確認：Sourceがエラーなく追加され、EncodingがUTF-8になっている。",
    "tip": "Enable Loggingを入れておくと、後でトラブルを追いやすい。",
    "tip_en": "Turning on Enable Logging makes trouble easier to trace later.",
    "img": "v5_90_002.jpg",
    "h_en": "Add a JSON Source in DataLinq Server",
    "body_en": "In XPression DataLinq Server (a separate window from XPression), Add DataLinq Source → choose \"JSON DataLinq Source\" (Provides access to JSON data files) → OK.\nIn JSON Linq - Configuration:\n- File Path: point at players.json\n- Encoding: ASCII (default) → must change to UTF-8 (ASCII garbles Japanese)\n- Update method: for local files Wait for file change events (per the on-screen note, not recommended on network drives), or Poll every N seconds\n\n✅ Check: The Source adds without error and Encoding is UTF-8."
   },
   {
    "h": "Table Presetsで「表（ファイル）」を登録する",
    "body": "Textに割り当てる前に先にやっておく（後の行連動でTable指定が正しくないと動かないため実質必須）。Table Presetsは「JSON内の階層を指定する」ものではなく、複数のJSONファイルをName＋File Pathで登録しておき、データ参照時のTable一覧で切り替えられるようにする仕組み（設定画面の説明にも「browsing for dataのTablesドロップダウンに出るTableの一覧」とある）。\n手順：\n① Settingsタブで Enable Table Presets にチェック → Table Presets タブを開く\n② Add → Name列に名前、File Path列の「…」でJSONファイルを指定\n③ 同梱サンプルなら次の4つを登録する（→の右はファイル名。File Pathには「…」で選んだ絶対パスが入る。相対パスは前提にしない）：\nPlayers_Player → players.json\nPlayers_Short → players_short.json\nPlayers_MissingName → players_missing_name.json\nPlayers_Empty → players_empty.json\n「共通プレフィックス（Players_）＋差分名」で揃えるのがコツ。あとでKeyによるTable切替（手順5の発展）が綺麗に組める。\n④ OKで保存 → TextのBrowse（Select DataLinq Field）のTable一覧に4つが並び、選ぶだけで参照ファイルが切り替わる\n\n✅ 確認：TableをPlayers_Emptyに切り替えると表示が空になり、Players_Playerに戻すと選手が復帰する。",
    "tip": "Name列だけ入れてFile Pathが空だと機能しない。File Pathは絶対パスになるため、別PCへ移すと崩れる。本番では全マシン共通の固定フォルダ（例 C:\\XPression_Data\\）にデータを置いて、そのパスで登録するのが定石（第6巻「納品で崩れない」参照）。",
    "tip_en": "Entering only Name with an empty File Path does nothing. File Path becomes an absolute path, so it breaks when moved to another PC. In production, the standard practice is a fixed folder shared by all machines (e.g. C:\\XPression_Data\\) and registering that path (see Vol. 6, 'Surviving Delivery').",
    "img": "v5_90_003.jpg",
    "h_en": "Register \"tables (files)\" with Table Presets",
    "body_en": "Do this before assigning to Text (later row sync fails if the Table isn't set correctly, so it's effectively required). Table Presets don't specify a hierarchy inside the JSON; they register multiple JSON files by Name + File Path so the Table list can switch between them when browsing data (the settings screen says they appear in the Tables dropdown when browsing for data).\nSteps:\n① On the Settings tab check Enable Table Presets → open the Table Presets tab\n② Add → name in the Name column, choose the JSON via \"…\" in File Path\n③ For the bundled samples register these four (filename on the right; File Path receives the absolute path picked via \"…\" — don't count on relative paths):\nPlayers_Player → players.json\nPlayers_Short → players_short.json\nPlayers_MissingName → players_missing_name.json\nPlayers_Empty → players_empty.json\nThe trick is \"common prefix (Players_) + variant name\" — it makes Key-driven Table switching (step 5's extension) clean later.\n④ OK to save → the four appear in the Table list of the Text's Browse (Select DataLinq Field); picking one switches the source file\n\n✅ Check: Switching the Table to Players_Empty blanks the display; back to Players_Player restores the players."
   },
   {
    "h": "Textに割り当てる（Tableを選んでツリーから指定）",
    "body": "XPression側で選手名用のText Objectを選び、Object Inspectorの Data Source タブ → DataLinq を選択 → Set。\nSet DataLinq Properties で Enabled にチェック → DataLinq一覧からこのJSONソースを選び → Browse。\nSelect DataLinq Field で、まず Table のドロップダウンで Players を選び、ツリーで players の中の name を選ぶ（上部Selectionに Column: players / Row: name / Table: Players と表示される）→ OK。\n背番号用Textには number、ポジション用には position を同様に割り当てる。\n\n✅ 確認：「佐藤 大輝」「1」「GK」が文字化けせずに表示され、Table欄がPlayersになっている。",
    "tip": "化けたときは手順2のEncoding（UTF-8か）を最初に疑う。Tableが違うと後のKey連動が動かないので、ここで必ず確認。",
    "tip_en": "If text is garbled, suspect step 2's Encoding (UTF-8?) first. A wrong Table breaks the later Key linkage, so verify it here.",
    "img": "v5_90_005.jpg",
    "h_en": "Assign to Text (pick the Table, then choose from the tree)",
    "body_en": "On the XPression side select the player-name Text Object, Object Inspector's Data Source tab → choose DataLinq → Set.\nIn Set DataLinq Properties check Enabled → pick this JSON source from the DataLinq list → Browse.\nIn Select DataLinq Field, first pick Players in the Table dropdown, then choose name inside players in the tree (the Selection at top shows Column: players / Row: name / Table: Players) → OK.\nAssign number to the number Text and position to the position Text the same way.\n\n✅ Check: \"佐藤 大輝\", \"1\", \"GK\" display without mojibake and the Table field says Players."
   },
   {
    "h": "DataLinq Keyで行をまとめて切り替える（ここが肝・実機検証済み）",
    "body": "目的：キーを1つ変えるだけで、名前・背番号・ポジションが同じ選手の行にそろって切り替わる。\n【確定事項（実機検証済み）】行指定は山かっこ＋1始まりの行番号（2人目＝players<2>）。値検索の書式（players<number=7>など）は通らない。players<%PlayerNo%> が正解。Table欄が正しく（Players）設定されていないと動かない。\n① Object ManagerでSceneを選択 → Object Inspectorの DataLinq Keys タブ → Add。Name に PlayerNo（Published にチェック、Value に初期値 2）。\n② 各Text（name / number / position）の Set DataLinq Properties を開き、Column欄を players<%PlayerNo%> にする（%で囲む）。RowとTableはそのまま。\n③ KeyのValueを変えて反映を確認する。反映タイミングは：プレビュー＝即時／オンエア中のScene＝一度Offlineにして再TAKEした時（テキスト差し替えと同じ鉄則）。\n\n✅ 確認：Key値を2→3に変えると、プレビューが即時に高橋 悠人／11／FWへ連動して切り替わる。オンエア反映は再TAKEで。",
    "tip": "範囲外の行番号（例 99）の挙動はWrap Indicesの設定で変わる（ON＝有効な行に巻き戻る／OFF＝欠損扱い）。【発展・実機検証済み】Table欄を Players_%TeamTable% の形にし、DataLinq Keysに TeamTable（値は Player / Short / Empty などの差分だけ）を追加すると、参照ファイルもKeyで切り替えられる。行のPlayerNoと合わせ、Key2つで「どの表の何行目」を完全制御できる。",
    "tip_en": "Out-of-range row numbers (e.g. 99) behave per the Wrap Indices setting (ON = wraps to a valid row / OFF = treated as missing). [Advanced, machine-verified] Make the Table field Players_%TeamTable% and add a TeamTable DataLinq Key (values like Player / Short / Empty), and the referenced file also switches by Key. Combined with the row's PlayerNo, two Keys fully control 'which table, which row'.",
    "img": "v5_90_004.jpg",
    "h_en": "Switch whole rows with a DataLinq Key (the heart — machine-verified)",
    "body_en": "Goal: change one key and the name, number, and position all switch to the same player's row together.\n[Confirmed on the machine] Row addressing is angle brackets + 1-based row number (2nd player = players<2>). Value-search syntax (players<number=7> etc.) does NOT work. players<%PlayerNo%> is the correct form. It won't work unless the Table field is correctly set (Players).\n① Select the Scene in the Object Manager → Object Inspector's DataLinq Keys tab → Add. Name: PlayerNo (check Published, initial Value 2).\n② Open each Text's (name / number / position) Set DataLinq Properties and set the Column field to players<%PlayerNo%> (wrapped in %). Row and Table stay as-is.\n③ Change the Key's Value and confirm. Timing: preview = immediate / an on-air Scene = after taking it Offline and re-TAKE (same iron rule as text swaps).\n\n✅ Check: Changing the Key 2→3 switches the preview immediately to 高橋 悠人 / 11 / FW in sync. On-air updates on re-TAKE."
   },
   {
    "h": "Sequencerと外部（RossTalk）からKeyを変える",
    "body": "PublishedにしたKeyはSequencer（Take InspectorのTemplate Data）に公開され、オペレーターはそこに行番号を入れるだけで選手が切り替わる。\n外部制御からはRossTalkの DATALINQKEY コマンドで同じことができる。\n書式：DATALINQKEY [takeid]:[キー名]:[値]\n\n実機検証済みの確実なシーケンス（Take ID 0002 を3行目の選手＝高橋 悠人に差し替えて送出）：\nDATALINQKEY 0002:PlayerNo:3　←①中身を高橋に差し替える\nCUE 0002　←②新しい値でTake Itemをキュー（積み込み）\n（200ms程度待つ）　←③キュー完了を待つ\nTAKE 2　←④画面に出す（送出）\n\n値を変えた直後にいきなりTAKEすると反映が間に合わないことがあるため、CUEと短いPauseを挟むのが確実。キー名は公開した名前と完全一致させる。\n\n✅ 確認：Take InspectorでKey値を変えると表示が切り替わる。上のシーケンスを外部から送ると、新しい選手で確実に送出される。",
    "tip": "Keyの値はTake Item単位で保持される。同じSceneから複数のTake Itemを作れば、選手A用・B用として別々の行番号を持たせられる（外部システム連携の放送定番構成）。Stream Deck系ツール（Companion等）ならこの4手順を1ボタンに登録できる。",
    "tip_en": "Key values are held per Take Item. Create several Take Items from the same Scene to give player A and player B separate row numbers (a standard broadcast setup for external-system integration). Stream Deck-style tools (Companion etc.) can put these 4 steps on one button.",
    "img": "v5_91_003.jpg",
    "h_en": "Change the Key from the Sequencer and externally (RossTalk)",
    "body_en": "A Published Key appears in the Sequencer (Take Inspector's Template Data); the operator just types a row number to switch players.\nExternally, RossTalk's DATALINQKEY command does the same.\nSyntax: DATALINQKEY [takeid]:[keyname]:[value]\n\nMachine-verified reliable sequence (switch Take ID 0002 to the row-3 player 高橋 悠人 and play out):\nDATALINQKEY 0002:PlayerNo:3　← ① swap the content to 高橋\nCUE 0002　← ② cue the Take Item with the new value (staging)\n(wait ~200 ms)　← ③ wait for the cue to complete\nTAKE 2　← ④ put it on screen (playout)\n\nTAKE immediately after changing the value can miss the update, so inserting CUE plus a short pause is the reliable way. The key name must exactly match the published name.\n\n✅ Check: Changing the Key in the Take Inspector switches the display. Sending the sequence externally plays out the new player reliably."
   },
   {
    "h": "データ更新を確認する",
    "body": "players.json の値（名前や背番号）を書き換えて保存し、表示への反映を確認する。反映されないときは手順2の更新方式（Wait for file change events / Poll every）を確認する。\n\n✅ 確認：保存後、想定したタイミングで表示が変わる。",
    "h_en": "Verify data updates",
    "body_en": "Edit values in players.json (names or numbers), save, and confirm the display updates. If not, revisit step 2's update method (Wait for file change events / Poll every).\n\n✅ Check: After saving, the display changes at the expected timing."
   },
   {
    "h": "壊れたデータで挙動を見る（Return Empty on Failureが鍵）",
    "body": "手順3でTable Presetsに登録した Players_Short（選手が減った）／Players_MissingName（nameが無い選手）／Players_Empty（空配列）にTableを切り替えて、表示を確認する。\n【実機で確認された危険な挙動】各Textの Return Empty on Failure がOFFのままだと、行やデータが見つからないとき、Keyに入れた数字など意図しない値がそのまま画面に出る。\n対策：DataLinqリンクした各Textの Set DataLinq Properties で Return Empty on Failure にチェック（ON）→ 欠損時は空欄になる。\nWrap Indicesとの関係も整理しておく：ON＝範囲外の行番号を有効な行に巻き戻す（何かしら表示される）／OFF＝範囲外は欠損扱い。「絶対に間違った選手を出したくない」ならWrap Indices OFF＋Return Empty ONの組み合わせが安全側。\n\n✅ 確認：Return Empty on Failure をONにすると、欠損時に変な値ではなく空欄になる。",
    "tip": "空欄になったときにレイアウトが破綻しないか（座布団だけ残る等）も見ておく。原因調査には Enable Logging / Data Logger を使う。",
    "tip_en": "Also check the layout doesn't break when fields are empty (an orphaned backing plate, etc.). Use Enable Logging / Data Logger to investigate.",
    "h_en": "Watch behavior with broken data (Return Empty on Failure is the key)",
    "body_en": "Switch the Table to the presets registered in step 3 — Players_Short (fewer players) / Players_MissingName (a player without name) / Players_Empty (empty array) — and watch the display.\n[Dangerous behavior confirmed on the machine] With each Text's Return Empty on Failure left OFF, when a row or field is missing, unintended values — like the number typed into the Key — appear on screen as-is.\nFix: in each DataLinq-linked Text's Set DataLinq Properties, check Return Empty on Failure (ON) → missing data shows blank.\nAlso sort out Wrap Indices: ON = out-of-range row numbers wrap back to valid rows (something always shows) / OFF = out-of-range counts as missing. If you must never show the wrong player, Wrap Indices OFF + Return Empty ON is the safe combination.\n\n✅ Check: With Return Empty on Failure ON, missing data shows blank instead of odd values."
   }
  ],
  "checklist": [
   "EncodingがUTF-8になっているか（既定ASCIIのままにしない）",
   "DataLinq Key名（PlayerNo等）が意味の分かる名前でPublishされているか",
   "Table Presets（Name＋File Path）の切替がTable一覧で機能するか",
   "空データ・項目欠落時の表示を確認したか",
   "更新方式（file change / Poll）を本番機で確認したか",
   "項目名や階層の変更ルールを外部システム側と合意しているか"
  ],
  "goalImg": "v5_90_001.jpg",
  "title_en": "Cycle a Player List with JSON",
  "subtitle_en": "Treating hierarchical data as tables with Table Presets",
  "goal_en": "Load a player-list JSON via DataLinq and display player name, number, and position in Text. Then use a DataLinq Key so changing one key switches the whole row (name, number, position) together — the real operational pattern. Uses the players.json set in the 13_JSON_PlayerList folder.",
  "overview_en": "Order: prepare the JSON → add the Source in DataLinq Server (Encoding=UTF-8 is critical) → assign from the tree to Text → Table Presets (optional) → row sync with a DataLinq Key → change the Key from the Sequencer/outside → verify updates → verify broken data.",
  "checklist_en": [
   "Encoding is UTF-8 (not left at the ASCII default)",
   "The DataLinq Key name (PlayerNo etc.) is meaningful and Published",
   "Table Presets (Name + File Path) switching works in the Table list",
   "Checked the display with empty data and missing fields",
   "Verified the update method (file change / Poll) on the playout machine",
   "Agreed with the external system on rules for renaming fields or changing hierarchy"
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
  "goal": "Smart GPI / RossTalkをTCPで受けられるようにし、外部からTAKE / SEQI / SEQOなどのコマンドでTake Itemを出し入れする。外部制御の基本動作と消し方の違いを体験する。作例：同一PC（localhost）で RossTalk リスナーを有効化（ポート確認）→Take Item を用意→TCP接続→『TAKE 1』でオンエア→SEQI/SEQO で入替→SEQO/LAYEROFF で片付け。コマンドは CR/LF 終端。14_RossTalk の DashBoard サンプル(.grid)で送信可。",
  "overview": "「受け口を有効化」「Take Itemを用意」「TCPで接続」「TAKEで出す」「SEQI/SEQOを試す」「片付け系コマンド」「GPIコマンド（任意）」の順です。※同一PC（localhost）でも検証可。素材フォルダ 14_RossTalk に実機検証済みのDashBoardサンプルパネル（.grid）を同梱しています。",
  "steps": [
   {
    "h": "Hardware SetupでRossTalkを有効化する",
    "body": "メニューの Edit → Hardware Setup を開き、「GPI / Tally Boards」タブで Add → Brand一覧から Smart GPI / RossTalk を選ぶ（一覧にはPBus / Serial GPI (CTS/DSR) / TSL Tallyも並ぶ）。\nSmart GPI / RossTalk Setup で State を Enabled、Mode を TCP にし、Incoming Network Settings の TCP Port（例 7788）を控える。設定後、一覧の State が Active になればOK。\n\n✅ 確認：State=Active・Mode=TCP・ポート番号をメモした。",
    "tip": "本番機ではWindowsファイアウォールの受信許可も確認する。Keyboard / GPI Mappingも同じEditメニューにある。",
    "tip_en": "On the production machine, also check Windows Firewall inbound permission. Keyboard / GPI Mapping lives in the same Edit menu.",
    "img": "v5_91_001.jpg",
    "h_en": "Enable RossTalk in Hardware Setup",
    "body_en": "Open Edit → Hardware Setup, and on the \"GPI / Tally Boards\" tab, Add → choose Smart GPI / RossTalk from the Brand list (the list also shows PBus / Serial GPI (CTS/DSR) / TSL Tally).\nIn Smart GPI / RossTalk Setup set State to Enabled, Mode to TCP, and note the TCP Port under Incoming Network Settings (e.g. 7788). When the list shows State Active, you're set.\n\n✅ Check: State=Active, Mode=TCP, port number noted."
   },
   {
    "h": "送出対象のTake Itemを用意する",
    "body": "① SequencerにテストSceneをドラッグしてTake Item化する\n② Take ID列で番号を確認・設定（例 0002）。出し先のフレームバッファとレイヤーも確認\n③ まず手動のTake（テンキー＋）で正しく出ることを確かめておく（外部制御の前に手動で動くこと）\n\n✅ 確認：手動のTake（テンキー＋）で正しく出る状態になっている。",
    "h_en": "Prepare the target Take Item",
    "body_en": "① Drag a test Scene into the Sequencer to make a Take Item\n② Confirm/set the number in the Take ID column (e.g. 0002). Also confirm the destination framebuffer and layer\n③ First confirm it plays correctly with a manual Take (numpad +) — manual must work before external control\n\n✅ Check: A manual Take (numpad +) plays it correctly."
   },
   {
    "h": "外部からTCP接続する（DashBoardが実戦的）",
    "body": "送信側はRoss公式の無料ツール DashBoard のCustomPanelが実戦的：ボタンを作り、TaskにRossTalkを選ぶ→Connection=Custom、Host=XPressionのIPアドレス（同一PCならlocalhost）、Port=手順1のポート番号。CommandはドロップダウンにTAKE / CUE / SEQI…が用意されており、Take IDなどを入れるだけ。\nターミナルソフト（PuTTYのRaw接続等）で直接コマンドを打つ方法もある（その場合はCR/LF終端に注意）。\n\n✅ 確認：ボタン実行（または接続）がエラーなく通る。",
    "tip": "DashBoardならPause（待ち時間）もタスクとして挟めるので、「DATALINQKEY→CUE→Pause 200ms→TAKE」のような複数コマンドを1ボタンに登録できる。素材フォルダ 14_RossTalk の検証済みサンプルパネルを開けば、Host/Portを直すだけで全ボタンを試せる。",
    "tip_en": "DashBoard can insert Pause (wait) tasks, so a multi-command sequence like 'DATALINQKEY → CUE → Pause 200ms → TAKE' fits on one button. Open the verified sample panel in the 14_RossTalk folder — fix Host/Port and every button is ready to try.",
    "img": "v5_91_002.jpg",
    "h_en": "Connect over TCP from outside (DashBoard is the practical way)",
    "body_en": "On the sending side, a CustomPanel in Ross's free DashBoard is practical: create a button, choose RossTalk as the Task → Connection=Custom, Host=XPression's IP address (localhost on the same PC), Port=the port from step 1. Command is a dropdown with TAKE / CUE / SEQI… ready — just fill in the Take ID.\nYou can also type commands directly from a terminal (PuTTY raw connection etc.; mind the CR/LF line endings).\n\n✅ Check: The button run (or connection) goes through without error."
   },
   {
    "h": "TAKEで出す",
    "body": "「TAKE 1」または「TAKE 1:0:7」（TakeID:フレームバッファ:レイヤー）を送信し、オンエアされることを確認する。TAKEはSequencerのフォーカス（選択行）が動かないのが特徴。\n\n✅ 確認：コマンド送信でSceneが出て、Sequencerの選択行は動かない。",
    "h_en": "Put it up with TAKE",
    "body_en": "Send \"TAKE 1\" or \"TAKE 1:0:7\" (TakeID:framebuffer:layer) and confirm it goes on air. TAKE's trait: the Sequencer's focus (selected row) doesn't move.\n\n✅ Check: The command puts the Scene up and the Sequencer selection stays put."
   },
   {
    "h": "SEQIとSEQOを試す",
    "body": "SEQI 1（テンプレ定義の出力先に出る。フォーカスがその項目へ移動）と、SEQO 1（そのTake IDを下げる）を送信して、TAKEとの違いを確認する。\n\n✅ 確認：SEQIでは選択行が移動し、SEQOで消える。",
    "h_en": "Try SEQI and SEQO",
    "body_en": "Send SEQI 1 (plays to the template-defined output; focus moves to that item) and SEQO 1 (takes that Take ID down), and compare with TAKE.\n\n✅ Check: SEQI moves the selected row; SEQO removes it."
   },
   {
    "h": "片付け系コマンドを確認する",
    "body": "LAYEROFF 0000:7（そのレイヤーのSceneをOutトランジションで下げる）、CLFB 0000（フレームバッファをクリア）、CLRA（全フレームバッファをクリア）を試し、消え方の違いを見る。\n\n✅ 確認：LAYEROFFはOutの動きで消え、CLFB / CLRAは即座にクリアされる。",
    "tip": "CLRAは全部消える強いコマンド。本番での使いどころ（使わないという判断も含めて）を決めておく。",
    "tip_en": "CLRA is a powerful clear-everything command. Decide its place in your show (including the option of never using it).",
    "h_en": "Check the cleanup commands",
    "body_en": "Try LAYEROFF 0000:7 (takes the layer's Scene down with its Out transition), CLFB 0000 (clears the framebuffer), and CLRA (clears all framebuffers), and compare how they leave.\n\n✅ Check: LAYEROFF leaves with the Out motion; CLFB / CLRA clear instantly."
   },
   {
    "h": "GPIコマンドで機能を呼ぶ（任意・物理機器は不要）",
    "body": "RossTalkの「GPI 1」はソフト的にGPI入力を叩くシミュレートコマンドで、物理的なGPI機器は不要。\n① Edit → Keyboard / GPI Mapping で、シミュレートGPI入力1に機能（例：Sequencerの選択を進める）を割り当てる\n② DashBoardのRossTalkタスク（またはターミナル）から GPI 1 を送信\n\n✅ 確認：GPIコマンドで、割り当てた機能が実行される。",
    "img": "v5_91_004.jpg",
    "h_en": "Call functions with the GPI command (optional — no physical gear needed)",
    "body_en": "RossTalk's \"GPI 1\" is a simulate command that fires a GPI input in software — no physical GPI hardware needed.\n① In Edit → Keyboard / GPI Mapping, assign a function to simulated GPI input 1 (e.g. advance the Sequencer selection)\n② Send GPI 1 from the DashBoard RossTalk task (or a terminal)\n\n✅ Check: The GPI command runs the assigned function."
   }
  ],
  "checklist": [
   "ポート番号とファイアウォールを本番機で確認したか",
   "コマンドのCR/LF終端を送信側が守っているか",
   "Take IDの付番ルール（範囲で意味を持たせる）が決まっているか",
   "TAKEとSEQIのフォーカス挙動の違いを運用者が説明できるか",
   "本番中に接続が切れたことに気づける手順があるか",
   "誤送信時のリカバリ（SEQO / LAYEROFF）を確認したか"
  ],
  "goalImg": "v5_91_003.jpg",
  "title_en": "Take from Outside with RossTalk",
  "subtitle_en": "A TCP taste of external control",
  "goal_en": "Enable Smart GPI / RossTalk over TCP and take Take Items on/off from outside with TAKE / SEQI / SEQO and friends. Experience the basics of external control and the differences in how things are removed.",
  "overview_en": "Order: enable the listener → prepare a Take Item → connect over TCP → put it up with TAKE → try SEQI/SEQO → cleanup commands → GPI command (optional). ※ Works on the same PC (localhost). The 14_RossTalk asset folder includes a machine-verified DashBoard sample panel (.grid).",
  "checklist_en": [
   "Verified the port number and firewall on the playout machine",
   "The sender honors CR/LF command termination",
   "Take ID numbering rules (ranges with meaning) are decided",
   "Operators can explain the focus difference between TAKE and SEQI",
   "There's a procedure to notice a dropped connection mid-show",
   "Verified recovery from missends (SEQO / LAYEROFF)"
  ]
 },
 {
  "id": "script-01-textcopy",
  "title": "Script 01｜別テキストの値をコピー",
  "title_en": "Script 01 | Copy another text object's value",
  "subtitle": "OnSetTextで別のテキストへ自動反映（Cookbook Script（シーン内）より）",
  "subtitle_en": "Auto-mirror text with OnSetText (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "コピー元テキスト（Score1Src）の文字を変えると、表示用テキスト（Score1）が自動で同じ文字になる。スクリプトの基本「名前で探して値を代入」を体験する。",
  "goal_en": "When you change the source text (Score1Src), the display text (Score1) automatically shows the same value. Learn the script basics: find by name, assign a value.",
  "overview": "流れ：Score1Src の文字が変わる → OnSetText が発火 → GetObjectByName で両方を取得 → old.text = data.text で代入。",
  "overview_en": "Flow: Score1Src changes → OnSetText fires → grab both objects with GetObjectByName → assign old.text = data.text.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 01_TextCopy】\n・Text「Score1」（表示用）\n・Text「Score1Src」（コピー元・初期値 例 ABC）",
    "body_en": "[Scene 01_TextCopy]\n・Text \"Score1\" (display)\n・Text \"Score1Src\" (copy source; initial value e.g. ABC)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Score1Src の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Score1Src\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim old as xpTextObject\ndim data as xpTextObject\nScene.GetObjectByName(\"Score1\", old)\nScene.GetObjectByName(\"Score1Src\", data)\nold.text = data.text\n```\nGetObjectByName は「名前→変数」の橋渡し。型は xpTextObject（テキスト用）で宣言する。",
    "body_en": "```\ndim old as xpTextObject\ndim data as xpTextObject\nScene.GetObjectByName(\"Score1\", old)\nScene.GetObjectByName(\"Score1Src\", data)\nold.text = data.text\n```\nGetObjectByName bridges a name to a variable. Declare the type as xpTextObject for text objects."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Score1Src の文字を変更\n✅ Score1 が Score1Src と同じ文字になる",
    "body_en": "[Trigger]\n・Change the text of Score1Src\n✅ Score1 shows the same text as Score1Src"
   }
  ],
  "checklist": [
   "オブジェクト名がコードと1文字も違わない",
   "OnSetText（Score1Src側）に貼った"
  ],
  "checklist_en": [
   "Object names match the code exactly",
   "Script is on Score1Src's OnSetText"
  ]
 },
 {
  "id": "script-02-counterset",
  "title": "Script 02｜カウンターを初期化/リセット（value=）",
  "title_en": "Script 02 | Initialize / reset a Counter (value=)",
  "subtitle": "OnOnlineで一度だけ値を合わせる（Cookbook Script（シーン内）より）",
  "subtitle_en": "Set the value once on OnOnline (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "TAKE（オンライン化）の瞬間にカウンターが 0 に初期化される。「一度だけ走る初期化」の定番パターン。",
  "goal_en": "The counter resets to 0 the moment you TAKE the scene online — the standard 'run-once initialization' pattern.",
  "overview": "流れ：TAKE → OnOnline が発火 → Self.Project.GetWidgetByName でウィジェット取得 → Value = 0。",
  "overview_en": "Flow: TAKE → OnOnline fires → get the widget via Self.Project.GetWidgetByName → Value = 0.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 02_CounterSet】\n・Counterウィジェット「Counter1」（値を表示テキストに連携）",
    "body_en": "[Scene 02_CounterSet]\n・Counter widget \"Counter1\" (linked to a display text)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim counter as xpCounterWidget\nSelf.Project.GetWidgetByName(\"Counter1\", counter)\ncounter.Value = 0\n```\nウィジェットは GetObjectByName ではなく Self.Project.GetWidgetByName で取得する（実機検証済み）。",
    "body_en": "```\ndim counter as xpCounterWidget\nSelf.Project.GetWidgetByName(\"Counter1\", counter)\ncounter.Value = 0\n```\nWidgets are fetched with Self.Project.GetWidgetByName, not GetObjectByName (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・オフライン→オンラインで TAKE\n✅ Counter1 が 0 に初期化される",
    "body_en": "[Trigger]\n・TAKE the scene from offline to online\n✅ Counter1 resets to 0",
    "tip": "Value=（固定値代入）は初期化・リセット・値合わせ用。OnSetText に置くと変わるたびに戻ってしまう。本番中の増減は別トリガーで Up / Down / Reset（→ Script 19）。",
    "tip_en": "Value= (direct assignment) is for init/reset. Don't put it on OnSetText or it snaps back every change. For live +/- use Up / Down / Reset on a separate trigger (see Script 19)."
   }
  ],
  "checklist": [
   "Counterウィジェットを作成し表示テキストにリンク済み",
   "OnOnline（Scene側・Self.）に貼った"
  ],
  "checklist_en": [
   "Counter widget created and linked to a display text",
   "Script is on the Scene's OnOnline (Self.)"
  ]
 },
 {
  "id": "script-03-showhide",
  "title": "Script 03｜文字の有無で表示/非表示を切り替え",
  "title_en": "Script 03 | Show/hide by whether text is empty",
  "subtitle": "Len(Text)>0 で visible を制御（Cookbook Script（シーン内）より）",
  "subtitle_en": "Control visible with Len(Text)>0 (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "Main に文字が入っていれば Mark1 が表示、空にすれば非表示。データの有無でパーツを自動で出し入れする基本形。",
  "goal_en": "Mark1 appears when Main has text and hides when it's empty — the basic pattern for auto-toggling parts based on data.",
  "overview": "流れ：Main の文字が変わる → OnSetText 発火 → Len(Text) で空判定 → mark.visible を True/False。",
  "overview_en": "Flow: Main changes → OnSetText fires → check emptiness with Len(Text) → set mark.visible True/False.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 03_ShowHide】\n・表示物「Mark1」（Quad/テキスト）\n・Text「Main」（発火用）",
    "body_en": "[Scene 03_ShowHide]\n・Any visible object \"Mark1\" (Quad or text)\n・Text \"Main\" (trigger)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Main の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Main\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim mark as xpBaseObject\nScene.GetObjectByName(\"Mark1\", mark)\nif Len(Text) > 0 then\n  mark.visible = True\nelse\n  mark.visible = False\nend if\n```\nText はこのイベントに渡される「今の文字」。汎用オブジェクトは xpBaseObject で受ける。",
    "body_en": "```\ndim mark as xpBaseObject\nScene.GetObjectByName(\"Mark1\", mark)\nif Len(Text) > 0 then\n  mark.visible = True\nelse\n  mark.visible = False\nend if\n```\nText is the current string passed into this event. Generic objects are declared as xpBaseObject."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Main に文字入力／空にする\n✅ 文字あり→Mark1 表示\n✅ 空→Mark1 非表示",
    "body_en": "[Trigger]\n・Type into Main / clear it\n✅ With text → Mark1 visible\n✅ Empty → Mark1 hidden"
   }
  ],
  "checklist": [
   "Mark1 の名前が一致",
   "空文字にしたとき消えることも確認した"
  ],
  "checklist_en": [
   "Mark1 name matches",
   "Verified it hides when the text is cleared"
  ]
 },
 {
  "id": "script-04-loopshow",
  "title": "Script 04｜複数オブジェクトをループで表示/非表示",
  "title_en": "Script 04 | Loop over objects to sync visibility",
  "subtitle": "For＋連番名で何個でも一括処理（Cookbook Script（シーン内）より）",
  "subtitle_en": "For + numbered names to batch any count (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 15,
  "goal": "Row1〜7 の表示状態に Mark1〜7 が連動する。For ループ＋連番名（\"Row\" & i）で、対象が何個あっても同じ数行で処理できる。",
  "goal_en": "Mark1–7 follow the visibility of Row1–7. With a For loop and numbered names (\"Row\" & i) the same few lines handle any number of objects.",
  "overview": "流れ：TAKE → OnOnline 発火 → For i=1 to 7 で Row/Mark を順に取得 → Row の visible を Mark にコピー。",
  "overview_en": "Flow: TAKE → OnOnline fires → For i=1 to 7 fetches each Row/Mark → copy Row's visible to Mark.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 04_LoopShow】\n・Text「Row1」〜「Row7」（確認前に一部を非表示に＝目玉アイコンをオフ。例 Row5〜7）\n・表示物「Mark1」〜「Mark7」",
    "body_en": "[Scene 04_LoopShow]\n・Text \"Row1\"–\"Row7\" (hide a few via the eye icon before testing, e.g. Row5–7)\n・Objects \"Mark1\"–\"Mark7\"",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\nDim rowObj(7) as xpBaseObject\nDim markObj(7) as xpBaseObject\nDim i as Integer\nFor i = 1 to 7\n  Self.GetObjectByName(\"Row\" & i, rowObj(i))\n  Self.GetObjectByName(\"Mark\" & i, markObj(i))\n  if rowObj(i).visible = false then\n    markObj(i).visible = false\n  else if rowObj(i).visible = true then\n    markObj(i).visible = true\n  end if\nNext i\n```\n「文字の空/有無」ではなく各 Row の visible（表示on/off）に Mark を連動させるレシピ。",
    "body_en": "```\nDim rowObj(7) as xpBaseObject\nDim markObj(7) as xpBaseObject\nDim i as Integer\nFor i = 1 to 7\n  Self.GetObjectByName(\"Row\" & i, rowObj(i))\n  Self.GetObjectByName(\"Mark\" & i, markObj(i))\n  if rowObj(i).visible = false then\n    markObj(i).visible = false\n  else if rowObj(i).visible = true then\n    markObj(i).visible = true\n  end if\nNext i\n```\nThis recipe syncs Marks to each Row's visible flag (on/off), not to whether text is empty."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・一部の Row を非表示（目玉オフ）にして オフライン→オンラインで TAKE\n✅ 非表示にした Row の Mark も消える\n✅ 表示のままの Row は Mark も表示",
    "body_en": "[Trigger]\n・Hide some Rows (eye icon off), then TAKE from offline to online\n✅ Marks of hidden Rows disappear too\n✅ Marks of visible Rows stay visible",
    "tip": "全部表示のままだと変化が見えない。確認時は必ず一部の Row を非表示にしてから TAKE。部品が多ければまず For i=1 to 3・Row1-3/Mark1-3 で軽く試すのも可。",
    "tip_en": "If everything stays visible you'll see no change — hide some Rows before TAKE. With many parts, start small: For i=1 to 3 with Row1-3/Mark1-3."
   }
  ],
  "checklist": [
   "Row/Mark とも 1〜7 の連番名",
   "一部の Row を非表示にしてから TAKE した"
  ],
  "checklist_en": [
   "Rows and Marks numbered 1–7",
   "Hid some Rows before TAKE"
  ]
 },
 {
  "id": "script-05-widthmove",
  "title": "Script 05｜テキスト幅に合わせて隣を移動",
  "title_en": "Script 05 | Move a neighbor to match text width",
  "subtitle": "GetTextWidthS で右端に追従（Cookbook Script（シーン内）より）",
  "subtitle_en": "Follow the right edge with GetTextWidthS (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "Main の文字数を変えると、区切り記号（Divider）が常に Main の右端＋余白の位置へ移動する。名前と数字の間の「/」などを自動整列させる定番。",
  "goal_en": "As Main's text length changes, the Divider always moves to Main's right edge plus a margin — the classic way to auto-align separators like \"/\".",
  "overview": "流れ：Main の文字が変わる → OnSetText 発火 → GetTextWidthS(Text) で幅を測る → PosX に加算して配置。",
  "overview_en": "Flow: Main changes → OnSetText fires → measure width with GetTextWidthS(Text) → position by adding to PosX.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 05_WidthMove】\n・Text「Main」（発火用・幅の基準）\n・Text「Divider」（追従・例 /）",
    "body_en": "[Scene 05_WidthMove]\n・Text \"Main\" (trigger; width reference)\n・Text \"Divider\" (follower, e.g. \"/\")",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Main の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Main\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\nDim Mask as xpTextObject\nDim Spacing as Integer\nScene.GetObjectByName(\"Divider\", Mask)\nSpacing = 20\nMask.PosX = Self.PosX + Self.GetTextWidthS(Text) + Spacing\n\n```\nオブジェクトイベント内の Self. は「イベントが付いている自分自身」（ここでは Main）。Self.PosX ＝ Main の位置、GetTextWidthS(Text) ＝ 今の文字の幅（実機検証済み）。",
    "body_en": "```\nDim Mask as xpTextObject\nDim Spacing as Integer\nScene.GetObjectByName(\"Divider\", Mask)\nSpacing = 20\nMask.PosX = Self.PosX + Self.GetTextWidthS(Text) + Spacing\n\n```\nInside an object event, Self. is the object the event belongs to (Main here). Self.PosX = Main's position; GetTextWidthS(Text) = current text width (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Main の文字数を変える\n✅ Divider が Main の右端（文字幅＋余白）へ移動",
    "body_en": "[Trigger]\n・Change the length of Main's text\n✅ Divider moves to Main's right edge (width + spacing)"
   }
  ],
  "checklist": [
   "Spacing の値で余白を調整できる",
   "文字を長く/短くして両方試した"
  ],
  "checklist_en": [
   "Adjusted the margin via Spacing",
   "Tested with longer and shorter text"
  ]
 },
 {
  "id": "script-06-barscale",
  "title": "Script 06｜値に応じてバーを伸縮（scaleX）",
  "title_en": "Script 06 | Scale a bar by value (scaleX)",
  "subtitle": "支持率バー・音量メーターの基本（Cookbook Script（シーン内）より）",
  "subtitle_en": "Basis for rating bars and meters (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "Value に 0〜100 の数値を入れると、Bar1 の横幅がその割合に伸縮する。数値→見た目の変換の最小例。",
  "goal_en": "Enter 0–100 into Value and Bar1's width scales to that percentage — the smallest number-to-visual example.",
  "overview": "流れ：Value の文字が変わる → OnSetText 発火 → text / 100 を scaleX に代入。",
  "overview_en": "Flow: Value changes → OnSetText fires → assign text / 100 to scaleX.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 06_BarScale】\n・Quad「Bar1」（バー）\n・Text「Value」（発火用・数値 例 50）",
    "body_en": "[Scene 06_BarScale]\n・Quad \"Bar1\" (the bar)\n・Text \"Value\" (trigger; a number, e.g. 50)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Value の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Value\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim bar as xpBaseObject\nScene.GetObjectByName(\"Bar1\", bar)\nbar.scaleX = text / 100\n```\ntext（文字）がそのまま数値として割り算に使える。scaleX=1 が原寸、0.5 が半分。",
    "body_en": "```\ndim bar as xpBaseObject\nScene.GetObjectByName(\"Bar1\", bar)\nbar.scaleX = text / 100\n```\ntext is used directly as a number in the division. scaleX=1 is full size, 0.5 is half."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Value に数値を入力（0〜100）\n✅ Bar1 の横幅が value% に伸縮",
    "body_en": "[Trigger]\n・Enter a number (0–100) into Value\n✅ Bar1's width scales to value%",
    "tip": "Bar1 は左端基準にすると見やすい（ピボット/位置を調整）。",
    "tip_en": "Anchor Bar1 at its left edge (adjust pivot/position) for a natural grow direction."
   }
  ],
  "checklist": [
   "0 と 100 の両端で確認した",
   "バーの基準点（伸びる方向）を調整した"
  ],
  "checklist_en": [
   "Tested at both 0 and 100",
   "Adjusted the bar's anchor (grow direction)"
  ]
 },
 {
  "id": "script-07-piechart",
  "title": "Script 07｜値から円グラフ/扇形を角度で描画",
  "title_en": "Script 07 | Draw a pie chart from values via angles",
  "subtitle": "StartAngle-EndAngle で比率を扇形に（Cookbook Script（シーン内）より）",
  "subtitle_en": "Slices from ratios with StartAngle–EndAngle (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 20,
  "goal": "Num 1〜6 の数値の比率どおりに、重ねたシリンダーが扇形に分割され円グラフになる。1つの数字を変えると全体が自動で再配分される。",
  "goal_en": "Stacked cylinders split into pie slices matching the ratio of Num 1–6. Change one number and the whole chart redistributes automatically.",
  "overview": "流れ：Num の値が変わる → OnSetText 発火 → 1周目のループで合計を計算 → 2周目で各 Slice の StartAngle/EndAngle を割り当て。",
  "overview_en": "Flow: a Num changes → OnSetText fires → first loop totals the values → second loop assigns each Slice's StartAngle/EndAngle.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 07_PieChart】\n・シリンダー「Slice 1」〜「Slice 6」（同位置に重ねる）\n・Text「Num 1」〜「Num 6」（数値 例 30/50/20）",
    "body_en": "[Scene 07_PieChart]\n・Cylinders \"Slice 1\"–\"Slice 6\" (stacked at the same position)\n・Text \"Num 1\"–\"Num 6\" (numbers, e.g. 30/50/20)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・「Num 1」の OnSetText（どれか1つ）\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of \"Num 1\" (any one of them)\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\nDim i as Integer\nDim sliceNum as xpTextObject\nDim sliceShape as xpCylinderObject\nDim LastEndAngle as Single\nDim Total as Long\nTotal = 0\nLastEndAngle = 0\nFor i = 1 to 6\n  Scene.GetObjectByName(\"Num \" & i, sliceNum)\n  Total = Total + sliceNum.Text\nNext i\nFor i = 1 to 6\n  Scene.GetObjectByName(\"Slice \" & i, sliceShape)\n  Scene.GetObjectByName(\"Num \" & i, sliceNum)\n  If sliceNum.Text > 0 then\n    sliceShape.StartAngle = LastEndAngle\n    sliceShape.EndAngle = ((sliceNum.Text / Total) * 360) + LastEndAngle\n    LastEndAngle = sliceShape.EndAngle\n    sliceShape.Visible = true\n  End if\nNext i\n```\n合計を100%として 値÷合計×360° で各扇形の角度が決まる。合計が100である必要はない（30/50/20 でも 3/5/2 でも同じ円）。使わない枠は Num を 0 にすれば自動でスキップ＆非表示。",
    "body_en": "```\nDim i as Integer\nDim sliceNum as xpTextObject\nDim sliceShape as xpCylinderObject\nDim LastEndAngle as Single\nDim Total as Long\nTotal = 0\nLastEndAngle = 0\nFor i = 1 to 6\n  Scene.GetObjectByName(\"Num \" & i, sliceNum)\n  Total = Total + sliceNum.Text\nNext i\nFor i = 1 to 6\n  Scene.GetObjectByName(\"Slice \" & i, sliceShape)\n  Scene.GetObjectByName(\"Num \" & i, sliceNum)\n  If sliceNum.Text > 0 then\n    sliceShape.StartAngle = LastEndAngle\n    sliceShape.EndAngle = ((sliceNum.Text / Total) * 360) + LastEndAngle\n    LastEndAngle = sliceShape.EndAngle\n    sliceShape.Visible = true\n  End if\nNext i\n```\nEach slice gets value ÷ total × 360°, with the sum treated as 100% — the sum doesn't have to be 100 (30/50/20 and 3/5/2 draw the same pie). Set unused Nums to 0 to auto-skip them."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Num の値を変更\n✅ 各シリンダーが比率の扇形＝重ねて円グラフになる",
    "body_en": "[Trigger]\n・Change any Num value\n✅ Cylinders form ratio slices — a pie chart when stacked",
    "tip": "小数を使うなら Dim Total as Long を Single（または Double）に（Long は整数で小数点以下が切られる）。各 Slice のマテリアル色を変えると見やすい。枠を増やすなら両ループの範囲と Num/Slice の個数を揃える。",
    "tip_en": "For decimals, change Dim Total as Long to Single (or Double) — Long truncates. Color each Slice differently for readability. To add slots, extend both loop ranges and the Num/Slice counts."
   }
  ],
  "checklist": [
   "Slice は同位置に重ねた",
   "名前は「Num 1」「Slice 1」＝半角スペース入り",
   "比率を変えて再配分を確認した"
  ],
  "checklist_en": [
   "Slices are stacked at the same position",
   "Names include the space: \"Num 1\", \"Slice 1\"",
   "Changed a ratio and watched it redistribute"
  ]
 },
 {
  "id": "script-08-movieplay",
  "title": "Script 08｜マテリアル動画を再生 / 一時停止",
  "title_en": "Script 08 | Play / pause a material video",
  "subtitle": "playrange と pause（Cookbook Script（シーン内）より）",
  "subtitle_en": "playrange and pause (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 10,
  "goal": "PlayTrigger に文字を入れると VideoBox の動画マテリアルが頭から再生される。コメントを外せば一時停止も試せる。",
  "goal_en": "Typing into PlayTrigger plays VideoBox's video material from the start. Uncomment one line to try pausing too.",
  "overview": "流れ：PlayTrigger の文字が変わる → OnSetText 発火 → GetMaterial(0, mat) → mat.playrange(0, mat.duration)。",
  "overview_en": "Flow: PlayTrigger changes → OnSetText fires → GetMaterial(0, mat) → mat.playrange(0, mat.duration).",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 08_MoviePlay】\n・Quad「VideoBox」（動画マテリアルを割当）\n・Text「PlayTrigger」（発火用）",
    "body_en": "[Scene 08_MoviePlay]\n・Quad \"VideoBox\" (with a video material)\n・Text \"PlayTrigger\" (trigger)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・PlayTrigger の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of PlayTrigger\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim obj as xpBaseObject\ndim mat as xpMaterial\nScene.GetObjectByName(\"VideoBox\", obj)\nobj.GetMaterial(0, mat)\nmat.playrange(0, mat.duration)\n' mat.pause   ' 一時停止\n```\nGetMaterial(0, mat) はオブジェクトの1枚目のマテリアルを取得。playrange(開始, 終了) で範囲再生、mat.duration で全長（実機検証済み）。",
    "body_en": "```\ndim obj as xpBaseObject\ndim mat as xpMaterial\nScene.GetObjectByName(\"VideoBox\", obj)\nobj.GetMaterial(0, mat)\nmat.playrange(0, mat.duration)\n' mat.pause   ' 一時停止\n```\nGetMaterial(0, mat) grabs the object's first material. playrange(start, end) plays a range; mat.duration is the full length (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・PlayTrigger に入力\n✅ VideoBox の動画が再生（' mat.pause の行を有効化すれば停止）",
    "body_en": "[Trigger]\n・Type into PlayTrigger\n✅ VideoBox's video plays (enable the ' mat.pause line to pause)",
    "tip": "マテリアルは動画クリップ（Duration付き）にする。動画素材が無ければこのレシピは省略可。",
    "tip_en": "Use a video clip material (one with Duration). Skip this recipe if you have no video asset."
   }
  ],
  "checklist": [
   "VideoBox に動画マテリアルを割当済み",
   "再生を確認した"
  ],
  "checklist_en": [
   "VideoBox has a video material assigned",
   "Confirmed playback"
  ]
 },
 {
  "id": "script-09-logoswap",
  "title": "Script 09｜画像をファイルパスで差し替え（ロゴ自動差替）",
  "title_en": "Script 09 | Swap an image by file path (auto logo swap)",
  "subtitle": "★SetDynamicMaterialPath の正しい代替（Cookbook Script（シーン内）より）",
  "subtitle_en": "★The correct alternative to SetDynamicMaterialPath (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 20,
  "goal": "TeamName の文字（例 OsakaTeamLogo）に対応する画像ファイル（OsakaTeamLogo.png）へ、TAKE の瞬間に TeamLogo の画像が差し替わる。チームロゴの自動切替の定番。",
  "goal_en": "On TAKE, TeamLogo's image swaps to the file matching TeamName's text (e.g. OsakaTeamLogo → OsakaTeamLogo.png) — the classic auto team-logo switch.",
  "overview": "流れ：TAKE → OnOnline 発火 → TeamName からファイルパスを組み立て → GetMaterial → GetShader → SetFileName(パス)。",
  "overview_en": "Flow: TAKE → OnOnline fires → build the file path from TeamName → GetMaterial → GetShader → SetFileName(path).",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 09_LogoSwap】\n・Text「TeamName」（ファイル名の頭＝拡張子を除いた名前。例 OsakaTeamLogo）\n・Quad「TeamLogo」（画像マテリアル）\n・画像を ProjectPath\\Images\\Logos\\ に置く（例 OsakaTeamLogo.png / TokyoTeamLogo.png）",
    "body_en": "[Scene 09_LogoSwap]\n・Text \"TeamName\" (file name without extension, e.g. OsakaTeamLogo)\n・Quad \"TeamLogo\" (image material)\n・Put images in ProjectPath\\Images\\Logos\\ (e.g. OsakaTeamLogo.png / TokyoTeamLogo.png)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim team as xpTextObject\ndim logo as xpBaseObject\ndim mat as xpMaterial\ndim shader as xpBaseShader\ndim FilePath as String\nSelf.GetObjectByName(\"TeamName\", team)\nFilePath = Engine.ProjectPath & \"Images\\Logos\\\" & team.Text & \".png\"\nSelf.GetObjectByName(\"TeamLogo\", logo)\nlogo.GetMaterial(0, mat)\nmat.GetShader(0, shader)\nshader.SetFileName(FilePath)\n```\nパス組み立て行が最大のエラー源。Engine.ProjectPath は末尾に \\ が付く（未保存だと空！）。\"Images\\Logos\\\" は先頭 \\ なし・末尾 \\ あり。team.Text は1文字違えば別ファイル。拡張子は実ファイルと一致させる。4つを繋いだ文字列＝実ファイルのフルパスと完全一致が必須。",
    "body_en": "```\ndim team as xpTextObject\ndim logo as xpBaseObject\ndim mat as xpMaterial\ndim shader as xpBaseShader\ndim FilePath as String\nSelf.GetObjectByName(\"TeamName\", team)\nFilePath = Engine.ProjectPath & \"Images\\Logos\\\" & team.Text & \".png\"\nSelf.GetObjectByName(\"TeamLogo\", logo)\nlogo.GetMaterial(0, mat)\nmat.GetShader(0, shader)\nshader.SetFileName(FilePath)\n```\nThe path-building line causes most errors. Engine.ProjectPath ends with \\ (and is EMPTY if the project is unsaved!). \"Images\\Logos\\\" has no leading \\ but needs the trailing \\. team.Text must match to the character; the extension must match the real file. The joined string must equal the real full path exactly."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ TeamName の値のファイル（<TeamName>.png）に差し替わる\n✅ TeamName を TokyoTeamLogo に変えれば TokyoTeamLogo.png に切替",
    "body_en": "[Trigger]\n・TAKE\n✅ The image swaps to <TeamName>.png\n✅ Change TeamName to TokyoTeamLogo and it switches to TokyoTeamLogo.png",
    "tip": "うまく動かない時は一時的に MsgBox(FilePath) を挟むと組み立てたフルパスがポップアップで見える。SetFileName は存在しないパスでも無反応（黙って失敗）なので、これで突合するのが確実。よくある失敗＝TeamName に OsakaTeamLogo を入れつつコードでも & \"TeamLogo.png\" を足して二重になるパターン。",
    "tip_en": "If it doesn't work, temporarily add MsgBox(FilePath) to pop up the built path and compare with the real file — SetFileName silently does nothing for a missing path. Common bug: TeamName holds OsakaTeamLogo AND the code appends \"TeamLogo.png\", doubling the name."
   }
  ],
  "checklist": [
   "プロジェクトを保存した（未保存だと ProjectPath が空）",
   "画像の拡張子とコードの拡張子が一致",
   "この差し替えは共有マテリアルに残る→確認後は元に戻す"
  ],
  "checklist_en": [
   "Project is saved (ProjectPath is empty otherwise)",
   "Image extension matches the code",
   "The swap persists on the shared material — restore it after testing"
  ]
 },
 {
  "id": "script-10-materialswap",
  "title": "Script 10｜マテリアルごと差し替え（プリセット切替）",
  "title_en": "Script 10 | Swap the whole material (preset switch)",
  "subtitle": "GetMaterialByName＋SetMaterial＝オブジェクト個別（Cookbook Script（シーン内）より）",
  "subtitle_en": "GetMaterialByName + SetMaterial = per-object (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 15,
  "goal": "Style にマテリアル名を入力すると、Picture のマテリアルが丸ごとその名前のものに切り替わる。Script 09（テクスチャ差替・共有反映）と違い、こちらはオブジェクト個別に効く。",
  "goal_en": "Type a material name into Style and Picture's material swaps to it entirely. Unlike Script 09 (texture swap, shared), this applies per object.",
  "overview": "流れ：Style の文字が変わる → OnSetText 発火 → Engine.GetMaterialByName(名前, mat) → image.SetMaterial(0, mat)。",
  "overview_en": "Flow: Style changes → OnSetText fires → Engine.GetMaterialByName(name, mat) → image.SetMaterial(0, mat).",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 10_MaterialSwap】\n・Quad「Picture」\n・Text「Style」（発火用・マテリアル名）\n・切替先のマテリアルを複数用意して名前を付けておく",
    "body_en": "[Scene 10_MaterialSwap]\n・Quad \"Picture\"\n・Text \"Style\" (trigger; a material name)\n・Several target materials, each named",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Style の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Style\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim image as xpBaseObject\ndim mat as xpMaterial\nif text <> \"CUSTOM\" and text <> \"NONE\" then\n  Scene.GetObjectByName(\"Picture\", image)\n  Engine.GetMaterialByName(text, mat)\n  image.SetMaterial(0, mat)\nend if\n```\nEngine.GetMaterialByName はプロジェクト内のマテリアルを名前で取得。SetMaterial(0, mat) で1枚目を差し替える（実機検証済み・公式サンプル準拠）。",
    "body_en": "```\ndim image as xpBaseObject\ndim mat as xpMaterial\nif text <> \"CUSTOM\" and text <> \"NONE\" then\n  Scene.GetObjectByName(\"Picture\", image)\n  Engine.GetMaterialByName(text, mat)\n  image.SetMaterial(0, mat)\nend if\n```\nEngine.GetMaterialByName fetches a project material by name; SetMaterial(0, mat) replaces the first slot (machine-verified, per official samples)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Style にマテリアル名を入力（CUSTOM/NONE 以外）\n✅ Picture のマテリアルが入力名のものに切替",
    "body_en": "[Trigger]\n・Enter a material name into Style (not CUSTOM/NONE)\n✅ Picture's material switches to the named one"
   }
  ],
  "checklist": [
   "切替先マテリアルに名前を付けた",
   "存在しない名前を入れた時の挙動も確認した"
  ],
  "checklist_en": [
   "Target materials are named",
   "Checked behavior with a non-existent name too"
  ]
 },
 {
  "id": "script-11-tracktoggle",
  "title": "Script 11｜SceneDirector のトラックを ON/OFF",
  "title_en": "Script 11 | Toggle a SceneDirector track ON/OFF",
  "subtitle": "GetTrackByName＋Enabled（Cookbook Script（シーン内）より）",
  "subtitle_en": "GetTrackByName + Enabled (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 10,
  "goal": "Toggle に Y/N を入れると、SceneDirector の特定トラック（Track1）が有効/無効になる。演出の一部だけ止めたい時の定番。",
  "goal_en": "Enter Y/N into Toggle to enable/disable a specific SceneDirector track (Track1) — the go-to for muting part of an animation.",
  "overview": "流れ：Toggle の文字が変わる → OnSetText 発火 → Scene.SceneDirector → GetTrackByName → trk.Enabled = true/false。",
  "overview_en": "Flow: Toggle changes → OnSetText fires → Scene.SceneDirector → GetTrackByName → trk.Enabled = true/false.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 11_TrackToggle】\n・アニメを載せた SceneDirector（トラック名「Track1」）\n・Text「Toggle」（発火用）",
    "body_en": "[Scene 11_TrackToggle]\n・A SceneDirector with animation (track named \"Track1\")\n・Text \"Toggle\" (trigger)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Toggle の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Toggle\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\nDim director as xpSceneDirector\ndim trk as xpSceneDirectorTrack\ndirector = Scene.SceneDirector\ndirector.GetTrackByName(\"Track1\", trk)\nif text = \"Y\" then\n  trk.Enabled = true\nend if\nif text = \"N\" then\n  trk.Enabled = false\nend if\n```\nScene.SceneDirector は既定（メイン）のディレクター。トラック名は SceneDirector パネルで「Track1」に揃える。",
    "body_en": "```\nDim director as xpSceneDirector\ndim trk as xpSceneDirectorTrack\ndirector = Scene.SceneDirector\ndirector.GetTrackByName(\"Track1\", trk)\nif text = \"Y\" then\n  trk.Enabled = true\nend if\nif text = \"N\" then\n  trk.Enabled = false\nend if\n```\nScene.SceneDirector is the default (main) director. Name the track \"Track1\" in the SceneDirector panel."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Toggle に Y / N を入力\n✅ Y→そのトラック有効、N→無効（次の再生で反映）",
    "body_en": "[Trigger]\n・Enter Y / N into Toggle\n✅ Y enables the track, N disables it (applies on next playback)"
   }
  ],
  "checklist": [
   "トラック名を Track1 にした",
   "無効化が次の再生で反映されることを確認した"
  ],
  "checklist_en": [
   "Track renamed to Track1",
   "Confirmed the change applies on the next playback"
  ]
 },
 {
  "id": "script-12-directorplay",
  "title": "Script 12｜SceneDirector を位置指定で頭出し / 再生",
  "title_en": "Script 12 | Cue / play a SceneDirector by position",
  "subtitle": "Position で静止、Play で再生（Cookbook Script（シーン内）より）",
  "subtitle_en": "Freeze with Position, run with Play (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 10,
  "goal": "TAKE すると名前付きディレクター（MainDirector）がフレーム30の状態で頭出し（静止表示）される。コメントを外せば頭から再生。",
  "goal_en": "On TAKE, the named director (MainDirector) cues to frame 30 (frozen). Uncomment one line to play from the start.",
  "overview": "流れ：TAKE → OnOnline 発火 → GetSceneDirectorByName → dir.Position = 30（' dir.Play で再生）。",
  "overview_en": "Flow: TAKE → OnOnline fires → GetSceneDirectorByName → dir.Position = 30 (' dir.Play to run).",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 12_DirectorPlay】\n・アニメ付き SceneDirector（名前「MainDirector」・対象に移動アニメ等）",
    "body_en": "[Scene 12_DirectorPlay]\n・A SceneDirector named \"MainDirector\" with some animation",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim dir as xpSceneDirector\nSelf.GetSceneDirectorByName(\"MainDirector\", dir)\ndir.Position = 30\n' dir.Play   ' 頭から再生（名前付きは自動再生されない）\n```\n既定（メイン）のディレクターは TAKE で自動再生されるので、単純な「再生」はスクリプト不要。スクリプトが活きるのは ①Position で頭出し/静止 ②名前付き（サブ）ディレクターの再生（自動では動かない）③別レイヤー操作。",
    "body_en": "```\ndim dir as xpSceneDirector\nSelf.GetSceneDirectorByName(\"MainDirector\", dir)\ndir.Position = 30\n' dir.Play   ' 頭から再生（名前付きは自動再生されない）\n```\nThe default (main) director auto-plays on TAKE, so plain playback needs no script. Scripts shine for: (1) cueing/freezing with Position, (2) playing named (sub) directors that never auto-play, (3) driving other layers."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ MainDirector がフレーム30の状態で静止表示\n✅ dir.Play を有効化すれば頭から再生",
    "body_en": "[Trigger]\n・TAKE\n✅ MainDirector freezes at frame 30\n✅ Enabling dir.Play runs it from the start"
   }
  ],
  "checklist": [
   "SceneDirector に名前 MainDirector を付けた",
   "Position（実機検証済み）とPlayの違いを両方試した"
  ],
  "checklist_en": [
   "SceneDirector is named MainDirector",
   "Tried both Position (machine-verified) and Play"
  ]
 },
 {
  "id": "script-12b-playstop",
  "title": "Script 12b｜SceneDirector を Y/N で再生 / 先頭で停止",
  "title_en": "Script 12b | Play / hold-at-start a SceneDirector via Y/N",
  "subtitle": "Stop＋Position=0 で「最初のフレームで止める」（Cookbook Script（シーン内）より）",
  "subtitle_en": "Stop + Position=0 to freeze on frame one (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 10,
  "goal": "ModeText を Y にして TAKE するとアニメ再生、N なら最初のフレームで静止。1つのシーンを「動きあり/なし」で使い分けられる。",
  "goal_en": "TAKE with ModeText = Y and the animation plays; with N it holds on the first frame. One scene, two behaviors.",
  "overview": "流れ：TAKE → OnOnline 発火 → ModeText を読む → Y なら dir.Play、N なら dir.Stop＋dir.Position = 0。",
  "overview_en": "Flow: TAKE → OnOnline fires → read ModeText → Y: dir.Play / N: dir.Stop + dir.Position = 0.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 12b_DirectorPlayStop】\n・アニメ付き SceneDirector（既定のディレクター）\n・Text「ModeText」（値 Y か N）",
    "body_en": "[Scene 12b_DirectorPlayStop]\n・A SceneDirector with animation (the default one)\n・Text \"ModeText\" (value Y or N)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim dir as xpSceneDirector\ndim m as xpTextObject\nSelf.GetObjectByName(\"ModeText\", m)\ndir = Self.SceneDirector\nif m.Text = \"Y\" then\n  dir.Play\nend if\nif m.Text = \"N\" then\n  dir.Stop\n  dir.Position = 0\nend if\n```\nN 側は Stop（TAKE の自動再生を確実に止める）＋ Position = 0（先頭へ）のセット。トラック単位で ON/OFF したい時は Script 11 を使う。",
    "body_en": "```\ndim dir as xpSceneDirector\ndim m as xpTextObject\nSelf.GetObjectByName(\"ModeText\", m)\ndir = Self.SceneDirector\nif m.Text = \"Y\" then\n  dir.Play\nend if\nif m.Text = \"N\" then\n  dir.Stop\n  dir.Position = 0\nend if\n```\nThe N branch pairs Stop (kills the TAKE auto-play) with Position = 0 (rewind). For per-track control use Script 11."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・ModeText を Y/N にして TAKE\n✅ Y＝アニメ再生\n✅ N＝最初のフレームで静止",
    "body_en": "[Trigger]\n・Set ModeText to Y or N, then TAKE\n✅ Y = animation plays\n✅ N = frozen on the first frame"
   }
  ],
  "checklist": [
   "Y/N 両方で TAKE して確認した"
  ],
  "checklist_en": [
   "Tested TAKE with both Y and N"
  ]
 },
 {
  "id": "script-12c-scoreflash",
  "title": "Script 12c｜スコア更新でハイライトを再生（毎回）",
  "title_en": "Script 12c | Play a highlight on every score update",
  "subtitle": "サブディレクター＋PlayRange で毎回先頭から（Cookbook Script（シーン内）より）",
  "subtitle_en": "Sub-director + PlayRange, always from the top (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 15,
  "goal": "Score の文字を変えるたびに、点滅/拡大などの演出（ScoreFlash）が先頭から再生される。得点演出の基本形。",
  "goal_en": "Every change to Score replays the ScoreFlash effect (blink/zoom) from the top — the basic score-highlight pattern.",
  "overview": "流れ：Score の文字が変わる → OnSetText 発火 → GetSceneDirectorByName → PlayRange(0, dir.Length)。",
  "overview_en": "Flow: Score changes → OnSetText fires → GetSceneDirectorByName → PlayRange(0, dir.Length).",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 12c_ScoreFlash】\n・名前付き SceneDirector「ScoreFlash」（点滅/拡大などの演出アニメを載せる）\n・Text「Score」（スコア表示・発火用）",
    "body_en": "[Scene 12c_ScoreFlash]\n・A named SceneDirector \"ScoreFlash\" carrying the effect animation\n・Text \"Score\" (display & trigger)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Score の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Score\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim dir as xpSceneDirector = Nothing\nScene.GetSceneDirectorByName(\"ScoreFlash\", dir)\ndir.PlayRange(0, dir.Length)\n```\n再生するのは名前付きサブディレクター（メインは TAKE で自動再生される側なので別立て）。PlayRange(0, dir.Length) なら毎回先頭から確実に再生される（dir.Play だけだと前回の終端で止まって2回目が動かないことがある）。",
    "body_en": "```\ndim dir as xpSceneDirector = Nothing\nScene.GetSceneDirectorByName(\"ScoreFlash\", dir)\ndir.PlayRange(0, dir.Length)\n```\nDrive a named sub-director (the main one is the auto-play-on-TAKE side). PlayRange(0, dir.Length) reliably replays from the top — plain dir.Play can stall at the previous end and skip the second run."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Score のテキストを変える\n✅ 変えるたびに ScoreFlash の演出が先頭から再生",
    "body_en": "[Trigger]\n・Change Score's text\n✅ Each change replays ScoreFlash from the top",
    "tip": "構成メソッド（GetSceneDirectorByName / PlayRange / Length）は実機検証済み。通し確認を推奨。",
    "tip_en": "The methods used (GetSceneDirectorByName / PlayRange / Length) are machine-verified; run an end-to-end check."
   }
  ],
  "checklist": [
   "演出アニメはサブディレクター ScoreFlash 側に載せた",
   "連続で2回変えても毎回再生されることを確認した"
  ],
  "checklist_en": [
   "Effect animation lives on the ScoreFlash sub-director",
   "Confirmed it replays on two rapid changes"
  ]
 },
 {
  "id": "script-12d-scoreflashup",
  "title": "Script 12d｜スコアが増えた時だけ演出を再生",
  "title_en": "Script 12d | Play the effect only when the score increases",
  "subtitle": "隠しテキストで前回値と比較（Cookbook Script（シーン内）より）",
  "subtitle_en": "Compare with a hidden previous-value text (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 15,
  "goal": "Score が増えた時だけ ScoreFlash が再生され、同じ値や減少では何も起きない。「前回値の記憶」をスクリプトで実現する。",
  "goal_en": "ScoreFlash plays only when Score goes up; same value or a decrease does nothing. Demonstrates remembering the previous value.",
  "overview": "流れ：Score の文字が変わる → OnSetText 発火 → PrevScore と比較 → 増加時のみ PlayRange → PrevScore を更新。",
  "overview_en": "Flow: Score changes → OnSetText fires → compare with PrevScore → PlayRange only on increase → update PrevScore.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 12d_ScoreFlashUp】\n・名前付き SceneDirector「ScoreFlash」（演出アニメ）\n・Text「Score」（スコア・発火用）\n・Text「PrevScore」（画面に映らない隠しテキスト・前回値の記憶用）",
    "body_en": "[Scene 12d_ScoreFlashUp]\n・Named SceneDirector \"ScoreFlash\" (effect animation)\n・Text \"Score\" (score & trigger)\n・Text \"PrevScore\" (hidden off-screen text storing the previous value)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Score の OnSetText\nオブジェクトのイベント（OnSetText）の中では、シーンを Scene. で参照する。このテキストの内容が変わるたびに走る。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnSetText of Score\nInside an object event (OnSetText), refer to the scene as Scene. It runs every time this text's content changes."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim prev as xpTextObject = Nothing\ndim dir as xpSceneDirector = Nothing\nScene.GetObjectByName(\"PrevScore\", prev)\nif Val(Text) > Val(prev.Text) then\n  Scene.GetSceneDirectorByName(\"ScoreFlash\", dir)\n  dir.PlayRange(0, dir.Length)\nend if\nprev.Text = Text\n```\nスクリプトは前回値を覚えられないので、隠しテキスト PrevScore に保存して比較する。Val() で文字を数値化して大小比較。",
    "body_en": "```\ndim prev as xpTextObject = Nothing\ndim dir as xpSceneDirector = Nothing\nScene.GetObjectByName(\"PrevScore\", prev)\nif Val(Text) > Val(prev.Text) then\n  Scene.GetSceneDirectorByName(\"ScoreFlash\", dir)\n  dir.PlayRange(0, dir.Length)\nend if\nprev.Text = Text\n```\nScripts can't remember state, so the hidden PrevScore text stores the last value. Val() converts text to numbers for the comparison."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・Score を増やす/減らす\n✅ 増えた時だけ ScoreFlash が再生\n✅ 同じ値/減少では再生されない",
    "body_en": "[Trigger]\n・Increase / decrease Score\n✅ ScoreFlash plays only on an increase\n✅ Nothing happens on same value / decrease",
    "tip": "Val は VB標準関数（ここでは実機未検証・他メソッドは検証済み）。実機での通し確認を推奨。",
    "tip_en": "Val is a standard VB function (not machine-verified here; the other methods are). Recommend an end-to-end check on hardware."
   }
  ],
  "checklist": [
   "PrevScore は画面外/非表示に配置した",
   "増加・同値・減少の3パターンを試した"
  ],
  "checklist_en": [
   "PrevScore is placed off-screen / hidden",
   "Tested increase, same value, and decrease"
  ]
 },
 {
  "id": "script-13-animcontroller",
  "title": "Script 13｜AnimController を範囲再生",
  "title_en": "Script 13 | Play ranges on an AnimController",
  "subtitle": "PlayRange(開始,終了) をモードで切替（Cookbook Script（シーン内）より）",
  "subtitle_en": "Switch PlayRange(start,end) by mode (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "上級",
  "minutes": 15,
  "goal": "ModeText の値（0/1）に応じて、PlayCtrl のアニメが 0〜30 または 30〜60 の範囲で再生される。IN/OUT アニメの切替などに使える。",
  "goal_en": "Depending on ModeText (0/1), PlayCtrl plays frames 0–30 or 30–60 — useful for switching IN/OUT animations.",
  "overview": "流れ：TAKE → OnOnline 発火 → GetAnimControllerByName → ModeText の値で PlayRange の範囲を分岐。",
  "overview_en": "Flow: TAKE → OnOnline fires → GetAnimControllerByName → branch the PlayRange by ModeText.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 13_AnimController】\n・AnimController「PlayCtrl」（アニメを載せる）\n・Text「ModeText」（値 0 か 1）",
    "body_en": "[Scene 13_AnimController]\n・AnimController \"PlayCtrl\" (carrying the animation)\n・Text \"ModeText\" (value 0 or 1)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim ModeTxt as xpTextObject\ndim Anim as xpAnimController\nSelf.GetObjectByName(\"ModeText\", ModeTxt)\nSelf.GetAnimControllerByName(\"PlayCtrl\", Anim)\nif ModeTxt.Text = \"0\" then\n  Anim.PlayRange(0, 30)\nend if\nif ModeTxt.Text = \"1\" then\n  Anim.PlayRange(30, 60)\nend if\n```\n★最重要ハマりどころ：AnimController は SceneDirector のトラックに入れない（独立した AnimController として持つ）。トラックに置くと SceneDirector 側が最初から最後まで自動再生してしまい、スクリプトの PlayRange が効かない。",
    "body_en": "```\ndim ModeTxt as xpTextObject\ndim Anim as xpAnimController\nSelf.GetObjectByName(\"ModeText\", ModeTxt)\nSelf.GetAnimControllerByName(\"PlayCtrl\", Anim)\nif ModeTxt.Text = \"0\" then\n  Anim.PlayRange(0, 30)\nend if\nif ModeTxt.Text = \"1\" then\n  Anim.PlayRange(30, 60)\nend if\n```\n★Top pitfall: do NOT put the AnimController on a SceneDirector track — the director then auto-plays it end-to-end and your PlayRange has no effect. Keep it as an independent AnimController."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ ModeText=0→0〜30再生\n✅ ModeText=1→30〜60再生",
    "body_en": "[Trigger]\n・TAKE\n✅ ModeText=0 → plays 0–30\n✅ ModeText=1 → plays 30–60"
   }
  ],
  "checklist": [
   "アニメは PlayCtrl（AnimController）側・トラックには載せていない",
   "0/1 両方の範囲を確認した"
  ],
  "checklist_en": [
   "Animation lives on PlayCtrl, not on a director track",
   "Verified both ranges (0/1)"
  ]
 },
 {
  "id": "script-14-otherlayer",
  "title": "Script 14｜別レイヤー/別シーンのアニメを操作",
  "title_en": "Script 14 | Drive animation in another layer/scene",
  "subtitle": "GetOutputFramebuffer→GetSceneOnLayer（Cookbook Script（シーン内）より）",
  "subtitle_en": "GetOutputFramebuffer → GetSceneOnLayer (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "上級",
  "minutes": 20,
  "goal": "このシーンを TAKE すると、別レイヤーでオンライン中のシーン「BUG」の AnimController（SubAnim）が 50→0 で再生される。ローワーサードからバグ（ロゴ）を退場させる等の連携に。",
  "goal_en": "TAKE this scene and it plays SubAnim (50→0) inside scene \"BUG\" running on another layer — e.g. a lower third dismissing an on-air bug/logo.",
  "overview": "流れ：TAKE → OnOnline 発火 → GetOutputFramebuffer(0) → GetSceneOnLayer(1) で別シーンを取得 → その AnimController を playrange。",
  "overview_en": "Flow: TAKE → OnOnline fires → GetOutputFramebuffer(0) → GetSceneOnLayer(1) fetches the other scene → playrange its AnimController.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 14_OtherLayer】\n・別シーン「BUG」：オブジェクトを AnimController「SubAnim」でアニメ\n・このシーン：スクリプトのみ",
    "body_en": "[Scene 14_OtherLayer]\n・Another scene \"BUG\": an object animated by AnimController \"SubAnim\"\n・This scene: script only",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・このシーンの OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of this scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim otherScene as xpScene\ndim anim as xpAnimController\ndim Channel as xpOutputFramebuffer\nEngine.GetOutputFramebuffer(0, Channel)\nChannel.GetSceneOnLayer(1, otherScene)\notherScene.GetAnimControllerByName(\"SubAnim\", anim)\nanim.playrange(50, 0)\n```\nGetSceneOnLayer(1, …) は fb0 の layer1 に載っているシーンを取得。playrange(50, 0) のように逆順再生（アウト）も可能（実機検証済み）。",
    "body_en": "```\ndim otherScene as xpScene\ndim anim as xpAnimController\ndim Channel as xpOutputFramebuffer\nEngine.GetOutputFramebuffer(0, Channel)\nChannel.GetSceneOnLayer(1, otherScene)\notherScene.GetAnimControllerByName(\"SubAnim\", anim)\nanim.playrange(50, 0)\n```\nGetSceneOnLayer(1, …) grabs whatever scene sits on fb0/layer1. Reverse playback like playrange(50, 0) works for outs (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・BUG を fb0/layer1 にオンライン（静止）→ このシーンを別レイヤーに TAKE\n✅ layer1 の BUG の SubAnim が 50→0 で再生",
    "body_en": "[Trigger]\n・Put BUG online on fb0/layer1 (static) → TAKE this scene on another layer\n✅ BUG's SubAnim on layer1 plays 50→0",
    "tip": "★BUG のアニメは AnimController「SubAnim」に載せ、SceneDirector のトラックには入れない（Script 13 と同じハマりどころ）。BUG は再生せずオンラインまで。",
    "tip_en": "★Keep BUG's animation on AnimController \"SubAnim\", never on a director track (same pitfall as Script 13). Bring BUG online without playing it."
   }
  ],
  "checklist": [
   "BUG は fb0/layer1・このシーンは別レイヤー",
   "SubAnim はトラック外の独立 AnimController"
  ],
  "checklist_en": [
   "BUG on fb0/layer1; this scene on another layer",
   "SubAnim is an independent AnimController, not on a track"
  ]
 },
 {
  "id": "script-15-deleteobjects",
  "title": "Script 15｜（上級）オブジェクトを動的に削除",
  "title_en": "Script 15 | (Advanced) Delete objects dynamically",
  "subtitle": "ObjectExistsByName＋While で連番を一掃（Cookbook Script（シーン内）より）",
  "subtitle_en": "Sweep numbered objects with ObjectExistsByName + While (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "上級",
  "minutes": 15,
  "goal": "TAKE すると TempShape2→3→4 が連続で削除され全部消える。存在チェックしながら連番オブジェクトを一括処理するパターン。",
  "goal_en": "On TAKE, TempShape2→3→4 are deleted in sequence until none remain — batch-processing numbered objects with an existence check.",
  "overview": "流れ：TAKE → OnOnline 発火 → While ObjectExistsByName で存在する限り → GetObjectByName → DeleteObject → 次の連番名を組み立て。",
  "overview_en": "Flow: TAKE → OnOnline fires → While ObjectExistsByName keeps looping → GetObjectByName → DeleteObject → build the next numbered name.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 15_DeleteObjects】\n・Quad「TempShape2」「TempShape3」「TempShape4」",
    "body_en": "[Scene 15_DeleteObjects]\n・Quads \"TempShape2\", \"TempShape3\", \"TempShape4\"",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\nDim obj As xpBaseObject = Nothing\nDim n As Integer\nDim str As String\nn = 2\nstr = \"TempShape\" & n\nWhile Self.ObjectExistsByName(str)\n  Self.GetObjectByName(str, obj)\n  Self.DeleteObject(obj)\n  n = n + 1\n  str = \"TempShape\" & n\nEnd While\n```\n★ハマりどころ：ループ内で n = n + 1 と str の組み立て直しを忘れると、TempShape2 だけ消えて無限に同名を探し続ける/止まる。連番名にしておくのが前提（実機検証済み：ObjectExistsByName / DeleteObject）。",
    "body_en": "```\nDim obj As xpBaseObject = Nothing\nDim n As Integer\nDim str As String\nn = 2\nstr = \"TempShape\" & n\nWhile Self.ObjectExistsByName(str)\n  Self.GetObjectByName(str, obj)\n  Self.DeleteObject(obj)\n  n = n + 1\n  str = \"TempShape\" & n\nEnd While\n```\n★Pitfall: forget the n = n + 1 and str rebuild inside the loop and only TempShape2 dies (or it stalls). Requires numbered names. (ObjectExistsByName / DeleteObject machine-verified.)"
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ TempShape2 → 3 → 4 と連続で削除され、全部消える",
    "body_en": "[Trigger]\n・TAKE\n✅ TempShape2 → 3 → 4 are deleted one after another until gone"
   }
  ],
  "checklist": [
   "3つとも連番名（TempShape2/3/4）",
   "削除は取り消せない→本番シーンでは慎重に"
  ],
  "checklist_en": [
   "All three use numbered names (TempShape2/3/4)",
   "Deletion is irreversible — be careful in production scenes"
  ]
 },
 {
  "id": "script-16-transform",
  "title": "Script 16｜オブジェクトを移動・回転・拡縮・不透明に",
  "title_en": "Script 16 | Move, rotate, scale, and fade an object",
  "subtitle": "SetPosXYZ / SetRotXYZ / SetScaleXYZ / Alpha（Cookbook Script（シーン内）より）",
  "subtitle_en": "SetPosXYZ / SetRotXYZ / SetScaleXYZ / Alpha (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "TAKE すると Object1 が中心から右へ300移動・45°回転・0.5倍・不透明度50%になる。変形4点セットの基本操作。",
  "goal_en": "On TAKE, Object1 moves 300 right of center, rotates 45°, scales to 0.5, and fades to 50% — the four basic transforms.",
  "overview": "流れ：TAKE → OnOnline 発火 → GetObjectByName → SetPosXYZ / SetRotXYZ / SetScaleXYZ / Alpha を順に適用。",
  "overview_en": "Flow: TAKE → OnOnline fires → GetObjectByName → apply SetPosXYZ / SetRotXYZ / SetScaleXYZ / Alpha in turn.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 16_Transform】\n・何か1つ「Object1」（Quad等）",
    "body_en": "[Scene 16_Transform]\n・Any single object \"Object1\" (a Quad, etc.)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim obj as xpBaseObject = Nothing\nSelf.GetObjectByName(\"Object1\", obj)\nobj.SetPosXYZ(1260, 540, 0)\nobj.SetRotXYZ(0, 0, 45)\nobj.SetScaleXYZ(0.5, 0.5, 1)\nobj.Alpha = 50\n```\n★座標の考え方：SetPosXYZ は絶対座標で、1080p では中心が (960, 540)。X=1260 は中心から右へ300、X=660 なら左へ300。SetPosXYZ(200,0,0) のような小さい値だと左上の隅へ飛ぶので注意。Alpha は 0〜100（実機検証済み）。",
    "body_en": "```\ndim obj as xpBaseObject = Nothing\nSelf.GetObjectByName(\"Object1\", obj)\nobj.SetPosXYZ(1260, 540, 0)\nobj.SetRotXYZ(0, 0, 45)\nobj.SetScaleXYZ(0.5, 0.5, 1)\nobj.Alpha = 50\n```\n★Coordinates: SetPosXYZ is absolute; at 1080p the center is (960, 540). X=1260 is 300 right of center, X=660 is 300 left. Small values like SetPosXYZ(200,0,0) fling the object to the top-left. Alpha runs 0–100 (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ 中心から右へ300移動＋45°回転＋0.5倍＋不透明度50%",
    "body_en": "[Trigger]\n・TAKE\n✅ Moved 300 right of center + 45° rotation + 0.5× scale + 50% alpha"
   }
  ],
  "checklist": [
   "中心 (960,540) を基準に座標を考えた",
   "4つの効果がすべて見えた"
  ],
  "checklist_en": [
   "Thought in terms of the (960,540) center",
   "Saw all four effects"
  ]
 },
 {
  "id": "script-17-materialcolor",
  "title": "Script 17｜マテリアルの色を変える（Diffuse/Emissive）",
  "title_en": "Script 17 | Change material colors (Diffuse/Emissive)",
  "subtitle": "ColorX.Update は必ず4引数(R,G,B,A)（Cookbook Script（シーン内）より）",
  "subtitle_en": "ColorX.Update always takes 4 args (R,G,B,A) (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "TAKE すると対象マテリアルの拡散色が赤・発光色が青になり、合成で紫っぽく見える。色をスクリプトで動的に変える基本。",
  "goal_en": "On TAKE the material's diffuse turns red and emissive turns blue, blending to purple — the basics of scripted color changes.",
  "overview": "流れ：TAKE → OnOnline 発火 → Engine.GetMaterialByName → ColorDiffuse.Update / ColorEmissive.Update。",
  "overview_en": "Flow: TAKE → OnOnline fires → Engine.GetMaterialByName → ColorDiffuse.Update / ColorEmissive.Update.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 17_MaterialColor】\n・マテリアル「EmissiveMaterial1」を持つオブジェクト",
    "body_en": "[Scene 17_MaterialColor]\n・An object using material \"EmissiveMaterial1\"",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim mat as xpMaterial = Nothing\nEngine.GetMaterialByName(\"EmissiveMaterial1\", mat)\nmat.ColorDiffuse.Update(255, 0, 0, 255)\nmat.ColorEmissive.Update(0, 0, 255, 255)   ' 発光色\n```\n★Update は必ず4引数 (R,G,B,A)。.R= の個別代入や無引数 Update は効かない（実機検証済み）。",
    "body_en": "```\ndim mat as xpMaterial = Nothing\nEngine.GetMaterialByName(\"EmissiveMaterial1\", mat)\nmat.ColorDiffuse.Update(255, 0, 0, 255)\nmat.ColorEmissive.Update(0, 0, 255, 255)   ' 発光色\n```\n★Update must get all four args (R,G,B,A) — assigning .R= individually or calling Update with no args does nothing (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ 拡散(赤)＋発光(青)が両方かかり紫っぽく見える",
    "body_en": "[Trigger]\n・TAKE\n✅ Diffuse (red) + emissive (blue) blend to a purple look",
    "tip": "色は共有マテリアルに残る→確認後は白/黒に戻しておく。",
    "tip_en": "Colors persist on the shared material — restore white/black after testing."
   }
  ],
  "checklist": [
   "Update を4引数で書いた",
   "確認後にマテリアル色を元へ戻した"
  ],
  "checklist_en": [
   "Update written with 4 args",
   "Restored the material color after testing"
  ]
 },
 {
  "id": "script-18-setline",
  "title": "Script 18｜複数行テキストの指定行だけ書き換え（SetLine）",
  "title_en": "Script 18 | Rewrite specific lines of multi-line text (SetLine)",
  "subtitle": "★index は0始まり（Cookbook Script（シーン内）より）",
  "subtitle_en": "★Indexes start at 0 (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "初級",
  "minutes": 10,
  "goal": "TAKE すると4行テキストの2行目が「XXX」、4行目が「change」に変わる。行単位の部分更新でリスト表示を効率化。",
  "goal_en": "On TAKE, line 2 of a 4-line text becomes \"XXX\" and line 4 becomes \"change\" — efficient per-line updates for lists.",
  "overview": "流れ：TAKE → OnOnline 発火 → GetObjectByName → SetLine(行index, 文字)。",
  "overview_en": "Flow: TAKE → OnOnline fires → GetObjectByName → SetLine(lineIndex, text).",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 18_SetLine】\n・複数行テキスト「Text1」（4行以上）",
    "body_en": "[Scene 18_SetLine]\n・Multi-line text \"Text1\" (4+ lines)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim txt as xpTextObject = Nothing\nSelf.GetObjectByName(\"Text1\", txt)\ntxt.SetLine(1, \"XXX\")\ntxt.SetLine(3, \"change\")\n```\n★SetLine は0始まり：index 1＝2行目、index 3＝4行目（実機検証済み）。テキストは対象の行数分（この例では4行以上）用意する。",
    "body_en": "```\ndim txt as xpTextObject = Nothing\nSelf.GetObjectByName(\"Text1\", txt)\ntxt.SetLine(1, \"XXX\")\ntxt.SetLine(3, \"change\")\n```\n★SetLine is zero-based: index 1 = line 2, index 3 = line 4 (machine-verified). The text needs at least that many lines (4+ here)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ 2行目が XXX、4行目が change に変わる",
    "body_en": "[Trigger]\n・TAKE\n✅ Line 2 becomes XXX, line 4 becomes change"
   }
  ],
  "checklist": [
   "Text1 は4行以上",
   "0始まりの行番号を理解した"
  ],
  "checklist_en": [
   "Text1 has 4+ lines",
   "Understood zero-based line indexes"
  ]
 },
 {
  "id": "script-19-widgets",
  "title": "Script 19｜カウンター/タイマー ウィジェットを操作",
  "title_en": "Script 19 | Drive Counter / Timer widgets",
  "subtitle": "Up・Down・Reset・Start・Stop（Cookbook Script（シーン内）より）",
  "subtitle_en": "Up, Down, Reset, Start, Stop (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
  "cb": "scriptScene",
  "level": "中級",
  "minutes": 15,
  "goal": "TAKE すると Counter1 が 11（10を代入してから Up で+1）になり、Timer1 が計時を開始する。ウィジェット操作の全体像をつかむ。",
  "goal_en": "On TAKE, Counter1 shows 11 (set to 10, then Up adds 1) and Timer1 starts counting — an overview of widget control.",
  "overview": "流れ：TAKE → OnOnline 発火 → Self.Project.GetWidgetByName で各ウィジェット取得 → Value=/Up/Start を実行。",
  "overview_en": "Flow: TAKE → OnOnline fires → fetch each widget via Self.Project.GetWidgetByName → run Value=/Up/Start.",
  "steps": [
   {
    "h": "部品を置いて名前を付ける",
    "h_en": "Place the parts and name them",
    "body": "【シーン 19_Widgets】\n・Counterウィジェット「Counter1」\n・Timerウィジェット「Timer1」（各々表示テキストに連携）",
    "body_en": "[Scene 19_Widgets]\n・Counter widget \"Counter1\"\n・Timer widget \"Timer1\" (each linked to a display text)",
    "tip": "名前はスクリプトが検索するキー。1文字も違わず付ける（空白・全角/半角に注意）。",
    "tip_en": "Scripts find objects by name — match it to the letter (watch spaces and full/half-width characters)."
   },
   {
    "h": "スクリプトを書く場所",
    "h_en": "Where the script goes",
    "body": "対象を右クリック → Edit Script Events…（Shift+Ctrl+E）→ 次のイベントの Sub…End Sub 内に貼る：\n・Scene の OnOnline\nScene のイベント（OnOnline）の中では、自分のシーンを Self. で参照する（Scene 変数は存在しない）。TAKE（オフライン→オンライン）の瞬間に一度だけ走り、編集画面では動かない。",
    "body_en": "Right-click the target → Edit Script Events… (Shift+Ctrl+E) → paste inside the Sub…End Sub of:\n・OnOnline of the Scene\nInside a Scene event (OnOnline), refer to your own scene as Self. (there is no Scene variable). It runs once at TAKE (offline to online) and never in the edit screen."
   },
   {
    "h": "スクリプトを貼る",
    "h_en": "Paste the script",
    "body": "```\ndim cnt as xpCounterWidget = Nothing\nSelf.Project.GetWidgetByName(\"Counter1\", cnt)\ncnt.Value = 10\ncnt.Up\n\ndim tm as xpClockTimerWidget = Nothing\nSelf.Project.GetWidgetByName(\"Timer1\", tm)\ntm.Start\n```\n操作一覧：Counter＝Up(+1)/Down(−1)/Reset(ResetValueへ)/Value=n（直接設定）。Timer＝Start(開始・停止後は続きから)/Stop(停止＝ポーズ)/Reset(StartAtへ)。Timer に Pause は無く、Stop が一時停止に相当（実機検証済み）。",
    "body_en": "```\ndim cnt as xpCounterWidget = Nothing\nSelf.Project.GetWidgetByName(\"Counter1\", cnt)\ncnt.Value = 10\ncnt.Up\n\ndim tm as xpClockTimerWidget = Nothing\nSelf.Project.GetWidgetByName(\"Timer1\", tm)\ntm.Start\n```\nCheat sheet — Counter: Up (+1), Down (−1), Reset (to ResetValue), Value=n (direct). Timer: Start (resumes after a stop), Stop (= pause), Reset (to StartAt). There is no Pause method; Stop is the pause (machine-verified)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "【発火】\n・TAKE\n✅ Counter1 が 11（10＋Up）\n✅ Timer1 が開始",
    "body_en": "[Trigger]\n・TAKE\n✅ Counter1 shows 11 (10 + Up)\n✅ Timer1 starts",
    "tip": "型に注意：Counter は xpCounterWidget、Timer は xpClockTimerWidget。取得はどちらも Self.Project.GetWidgetByName（Sceneイベント内）。",
    "tip_en": "Mind the types: xpCounterWidget for counters, xpClockTimerWidget for timers. Both are fetched via Self.Project.GetWidgetByName (inside Scene events)."
   }
  ],
  "checklist": [
   "両ウィジェットを表示テキストにリンクした",
   "Stop→Start で続きから再開することも試した"
  ],
  "checklist_en": [
   "Both widgets linked to display texts",
   "Tried Stop → Start resuming from where it paused"
  ]
 },
 {
  "id": "vl-01-trim-trailing-characters-show",
  "title": "VL 01｜文字列の右端の余分な文字を消す（左からN桁だけ表示）",
  "title_en": "VL 01 | Trim trailing characters (show only N from the left)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "右端の余分な文字（例 f）が消え、左からN桁（245）だけが表示される。",
  "goal_en": "The trailing junk (e.g. an 'f') is dropped, leaving only the left N characters (245).",
  "overview": "流れ：元テキスト → Value → Left String → 表示テキスト",
  "overview_en": "Flow: source text → Value → Left String → 表示テキスト",
  "svg": "<svg viewBox=\"0 0 606 98\" width=\"606\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv01j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv01j)\"/><path d=\"M158,87 C191,87 191,65 224,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv01j)\"/><path d=\"M382,51 C415,51 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv01j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text_DB .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 3</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,40 L224.5,27 Q224.5,22.5 229,22.5 L377,22.5 Q381.5,22.5 381.5,27 L381.5,40 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Length</text><circle cx=\"382\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text1 .Text</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 01】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 元テキスト（Text_DB の Text 例 245f）\n・[Math] Value（残す桁数 例 3）\n・[Strings] Left String（In / Length → Out）\n・[Object] 表示テキスト（Text1 の Text）",
    "body_en": "[VL recipe 01]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] source text（Text_DB の Text 例 245f）\n・[Math] Value（残すdigits数 例 3）\n・[Strings] Left String（In / Length → Out）\n・[Object] 表示テキスト（Text1 の Text）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・元テキスト（Text_DB 例 245f）を Left String の In に接続\n・Value（残す桁数 例 3）を Left String の Length に接続\n・Left String の Out を表示テキスト（Text1）へ接続",
    "body_en": "・Connect the source text (Text_DB, e.g. 245f) to Left String's In\n・Connect a Value (characters to keep, e.g. 3) to Left String's Length\n・Connect Left String's Out to the display text (Text1)",
    "tip": "DBの値の末尾に不要文字が付く場合の定番。桁数はデータ書式に合わせる。実機の Value はマテリアルではなく Math の Value ブロック。",
    "tip_en": "Common when a DB value has junk appended. Match the length to your data format."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 右端の余分な文字（例 f）が消え、左からN桁（245）だけが表示される\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ The trailing junk (e.g. an 'f') is dropped, leaving only the left N characters (245)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-02-change-text-color-when",
  "title": "VL 02｜残り時間がしきい値以下で文字色を変える（例 残り5秒で赤）",
  "title_en": "VL 02 | Change text color when time drops below a threshold (e.g. red at 5s)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "String Selector の Output を対象マテリアル（Default Mat1）の Layer1.Colors.Diffuse へ接続 → 残り≤5秒で赤、それ以外は白。",
  "goal_en": "Connect String Selector's Output to the material's (Default Mat1) Layer1.Colors.Diffuse → red at ≤5s, white otherwise.",
  "overview": "流れ：残り時間テキスト → Value → Greater Than/Eq To → Color/ Color → String Selector → 対象マテリアルの Layer1.Colors.Diffuse",
  "overview_en": "Flow: 残り時間テキスト → Value → Greater Than/Eq To → Color/ Color → String Selector → targetマテリアルの Layer1.Colors.Diffuse",
  "svg": "<svg viewBox=\"0 0 830 214\" width=\"830\" height=\"214\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv02j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,109 224,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02j)\"/><path d=\"M158,87 C191,87 191,123 224,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02j)\"/><path d=\"M382,109 C415,109 415,102 448,102\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02j)\"/><path d=\"M158,145 C303,145 303,116 448,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02j)\"/><path d=\"M158,203 C303,203 303,130 448,130\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02j)\"/><path d=\"M606,102 C639,102 639,116 672,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text_DB .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 5</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"80\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,98 L224.5,85 Q224.5,80.5 229,80.5 L377,80.5 Q381.5,80.5 381.5,85 L381.5,98 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"93\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Greater Than/Eq To</text><circle cx=\"224\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&gt;=</text><circle cx=\"382\" cy=\"109\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color 通常</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color 赤</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"448\" y=\"73\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,91 L448.5,78 Q448.5,73.5 453,73.5 L601,73.5 Q605.5,73.5 605.5,78 L605.5,91 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"86\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Selector</text><circle cx=\"448\" cy=\"102\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"448\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"448\" cy=\"130\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"133\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"606\" cy=\"102\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"672\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,105 L672.5,92 Q672.5,87.5 677,87.5 L825,87.5 Q829.5,87.5 829.5,92 L829.5,105 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Default Mat1 .Layer1.Co…</text><circle cx=\"672\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 02】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 残り時間テキスト（Text_DB 例 8）→ Base\n・[Math] Value（しきい値 例 5）→ >=\n・[Logic] Greater Than/Eq To（残り≤しきい値の判定 0/1）\n・[Colors] Color（通常色 白）/ Color（警告色 赤）\n・[Selector] String Selector（Index で色を選ぶ）\n・[Object] 対象マテリアル（Default Mat1）の Layer1.Colors.Diffuse",
    "body_en": "[VL recipe 02]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] 残り時間テキスト（Text_DB 例 8）→ Base\n・[Math] Value（しきいValue 例 5）→ >=\n・[Logic] Greater Than/Eq To（残り≤しきいValueのjudge 0/1）\n・[Colors] Color（normal色 白）/ Color（warn色 red）\n・[Selector] String Selector（Index で色を選ぶ）\n・[Object] targetマテリアル（Default Mat1）の Layer1.Colors.Diffuse",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・残り時間テキスト（Text_DB）を Greater Than/Eq To の Base、しきい値の Value（例 5）を >= に接続。【なぜ比較ブロックか】“残りがしきい値以下か”を 0/1 の判定にするため（実機の値：残り>5→Out=0、残り≤5→Out=1）\n・Greater Than/Eq To の Out を String Selector の Index に接続。【なぜ String Selector か】番号(0/1)で“色”を選ぶブロックだから。色の候補を並べて添字で切り替えられる\n・String Selector の [0]=通常色（白）、[1]=警告色（赤）を Color ブロックで割り当てる。【なぜ Color ブロックか】切り替えたい色そのものを候補として置くため",
    "body_en": "・Feed the remaining-time text (Text_DB) into Greater Than/Eq To's Base and the threshold Value (e.g. 5) into >=. [Why a comparator] to turn 'is remaining ≤ threshold' into 0/1 (on hardware: remaining>5→Out=0, remaining≤5→Out=1)\n・Connect Greater Than/Eq To's Out to String Selector's Index. [Why String Selector] it picks a color by number (0/1) — lay out candidate colors and switch by index\n・Assign [0]=normal color (white), [1]=warning color (red) with Color blocks. [Why Color blocks] to hold the actual colors to switch between",
    "tip": "要は『しきい値判定(0/1)→ String Selector で色を選ぶ』。しきい値は Value、色は Color ブロックで持ち、比較の Out を Index にするだけ。文字色に見えるが実体はマテリアルの Diffuse を切替。色は IntColor(0-255)/FloatColor(0-1) を候補にしてもよい。",
    "tip_en": "At heart: threshold judgment (0/1) → String Selector picks the color. Threshold in a Value, colors in Color blocks, and feed the comparator's Out as the Index. It looks like text color but it's the material's Diffuse. Colors can also be IntColor (0-255) / FloatColor (0-1) candidates."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ String Selector の Output を対象マテリアル（Default Mat1）の Layer1.Colors.Diffuse へ接続 → 残り≤5秒で赤、それ以外は白\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect String Selector's Output to the material's (Default Mat1) Layer1.Colors.Diffuse → red at ≤5s, white otherwise\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 214\" width=\"830\" height=\"214\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv02e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,109 224,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02e)\"/><path d=\"M158,87 C191,87 191,123 224,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02e)\"/><path d=\"M382,109 C415,109 415,102 448,102\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02e)\"/><path d=\"M158,145 C303,145 303,116 448,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02e)\"/><path d=\"M158,203 C303,203 303,130 448,130\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02e)\"/><path d=\"M606,102 C639,102 639,116 672,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv02e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text_DB .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 5</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"80\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,98 L224.5,85 Q224.5,80.5 229,80.5 L377,80.5 Q381.5,80.5 381.5,85 L381.5,98 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"93\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Greater Than/Eq To</text><circle cx=\"224\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&gt;=</text><circle cx=\"382\" cy=\"109\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color normal</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color red</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"448\" y=\"73\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,91 L448.5,78 Q448.5,73.5 453,73.5 L601,73.5 Q605.5,73.5 605.5,78 L605.5,91 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"86\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Selector</text><circle cx=\"448\" cy=\"102\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"448\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"448\" cy=\"130\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"133\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"606\" cy=\"102\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"672\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,105 L672.5,92 Q672.5,87.5 677,87.5 L825,87.5 Q829.5,87.5 829.5,92 L829.5,105 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Default Mat1 .Layer1.Co…</text><circle cx=\"672\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-03-map-a-numeric-code",
  "title": "VL 03｜数値コードを任意の表示ラベルに変換する（Quarter→1Q/2Q/OT…）",
  "title_en": "VL 03 | Map a numeric code to any display label (Quarter → 1Q/2Q/OT…)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "序数変換（1→1ST, 2→2ND…）も同じ“対応表”でOK（[1]=1ST, [2]=2ND… を並べるだけ）。実物が大規模（70ブロック超）でも本質は同じで、少数から作り足せる。",
  "goal_en": "Q_DB=1 → picks [1]=1Q, so Q shows '1Q'. Add slots ([5]…) as more cases appear.",
  "overview": "流れ：コードテキスト → Input Selector → String Value × → 表示テキスト",
  "overview_en": "Flow: コードテキスト → Input Selector → String Value × → 表示テキスト",
  "svg": "<svg viewBox=\"0 0 606 330\" width=\"606\" height=\"330\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv03j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,139 224,139\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><path d=\"M158,87 C191,87 191,153 224,153\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><path d=\"M158,145 C191,145 191,167 224,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><path d=\"M158,203 C191,203 191,181 224,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><path d=\"M158,261 C191,261 191,195 224,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><path d=\"M158,319 C191,319 191,209 224,209\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><path d=\"M382,139 C415,139 415,174 448,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv03j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Q_DB .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"110\" width=\"158\" height=\"110\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,128 L224.5,115 Q224.5,110.5 229,110.5 L377,110.5 Q381.5,110.5 381.5,115 L381.5,128 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"123\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"224\" cy=\"139\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"142\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"224\" cy=\"153\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"224\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"224\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[2]</text><circle cx=\"224\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[3]</text><circle cx=\"224\" cy=\"209\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"212\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[4]</text><circle cx=\"382\" cy=\"139\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"142\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value OP</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1Q</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 2Q</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 3Q</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 4Q</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"145\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,163 L448.5,150 Q448.5,145.5 453,145.5 L601,145.5 Q605.5,145.5 605.5,150 L605.5,163 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Q .Text</text><circle cx=\"448\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 03】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] コードテキスト（Q_DB 例 1）→ Index\n・[Selector] Input Selector（Index / [0]〜[5]）\n・[Strings] String Value ×（[0]OP, [1]1Q, [2]2Q, [3]3Q, [4]4Q）\n・[Object] 表示テキスト（Q .Text）",
    "body_en": "[VL recipe 03]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] コードテキスト（Q_DB 例 1）→ Index\n・[Selector] Input Selector（Index / [0]〜[5]）\n・[Strings] String Value ×（[0]OP, [1]1Q, [2]2Q, [3]3Q, [4]4Q）\n・[Object] 表示テキスト（Q .Text）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・コードテキスト（Q_DB 例 1）を Input Selector の Index に接続。【なぜ Input Selector か】“番号で候補から1つを選ぶ”専用ブロックなので、DBの数値コードをそのまま「何番目を出すか」に使えるから\n・[0]〜[4] に表示ラベルを String Value で割り当てる（[0]=OP, [1]=1Q, [2]=2Q, [3]=3Q, [4]=4Q）。【なぜ String Value か】固定の文字列（ラベル）を各スロットに置くため。これがコード→表示名の“対応表”になる\n・Input Selector の Output を表示テキスト Q.Text へ接続\n・Q_DB=1 → [1]=1Q が選ばれ、Q に「1Q」が出る。延長など候補が増えてもスロット（[5]…）を足すだけ",
    "body_en": "・Connect the code text (Q_DB, e.g. 1) to Input Selector's Index. [Why Input Selector] it's the block for 'pick one candidate by number', so a numeric DB code directly becomes 'which one to show'\n・Assign labels to [0]–[4] with String Value ([0]=OP, [1]=1Q, [2]=2Q, [3]=3Q, [4]=4Q). [Why String Value] it holds a fixed string (label) per slot — this is the code→label table\n・Connect Input Selector's Output to the display text Q.Text",
    "tip": "💡ネイティブ代替：ラベルはデータ側に持たせる／DataLinq のマッピングで解決できることが多い。 本質は“数値コード → 表示ラベルの対応表”を Input Selector で作ること（1Q/2Q… でも 1ST/2ND… の序数でも同型）。DBは 0/1/2… の素の数字で来るので、人が読めるラベルへ置き換えるのにこの形が最短。開始番号を変えたい時は Index Offset を使う。",
    "tip_en": "💡Native alt: often solvable by having the data carry the label, or via DataLinq mapping. At heart it's a 'numeric code → label' table built in Input Selector. The DB sends raw 0/1/2…, and this is the shortest way to turn that into a human-readable label. Use Index Offset to change the starting number."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 序数変換（1→1ST, 2→2ND…）も同じ“対応表”でOK（[1]=1ST, [2]=2ND… を並べるだけ）。実物が大規模（70ブロック超）でも本質は同じで、少数から作り足せる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Q_DB=1 → picks [1]=1Q, so Q shows '1Q'. Add slots ([5]…) as more cases appear\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-04-build-a-material-color",
  "title": "VL 04｜R/G/B別々のDB値からマテリアル色を組み立てる（CSVのRGB）",
  "title_en": "VL 04 | Build a material color from separate R/G/B DB values (CSV RGB)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "結果：DB（CSV）のRGBA どおりに素材色が決まる（例 10,100,255,255 → #FF0A64FF の青）。",
  "goal_en": "Result: the material color follows the DB (CSV) RGBA (e.g. 10,100,255,255 → #FF0A64FF, a blue).",
  "overview": "流れ：R / G / B / alpha の各 Text → IntColor → 対象マテリアルの Layer1.Colors.Diffuse",
  "overview_en": "Flow: R / G / B / alpha の各 Text → IntColor → targetマテリアルの Layer1.Colors.Diffuse",
  "svg": "<svg viewBox=\"0 0 606 214\" width=\"606\" height=\"214\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv04j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,95 224,95\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv04j)\"/><path d=\"M158,87 C191,87 191,109 224,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv04j)\"/><path d=\"M158,145 C191,145 191,123 224,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv04j)\"/><path d=\"M158,203 C191,203 191,137 224,137\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv04j)\"/><path d=\"M382,95 C415,95 415,116 448,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv04j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">R .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">G .Text</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">B .Text</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">alpha .Text</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"66\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,84 L224.5,71 Q224.5,66.5 229,66.5 L377,66.5 Q381.5,66.5 381.5,71 L381.5,84 Z\" fill=\"#DF4141\"/><text x=\"232\" y=\"79\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">IntColor</text><circle cx=\"224\" cy=\"95\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"98\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Red</text><circle cx=\"224\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Green</text><circle cx=\"224\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Blue</text><circle cx=\"224\" cy=\"137\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"140\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Alpha</text><circle cx=\"382\" cy=\"95\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"98\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"448\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,105 L448.5,92 Q448.5,87.5 453,87.5 L601,87.5 Q605.5,87.5 605.5,92 L605.5,105 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">CSV RGB .Layer1.Colors.…</text><circle cx=\"448\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 04】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] R / G / B / alpha の各 Text（DBのRGBA列 例 10/100/255/255）\n・[Colors] IntColor（Red / Green / Blue / Alpha → Color）\n・[Object] 対象マテリアル（CSV RGB）の Layer1.Colors.Diffuse",
    "body_en": "[VL recipe 04]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] R / G / B / alpha の各 Text（DBのRGBA列 例 10/100/255/255）\n・[Colors] IntColor（Red / Green / Blue / Alpha → Color）\n・[Object] targetマテリアル（CSV RGB）の Layer1.Colors.Diffuse",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・R / G / B / alpha の各テキスト（DBのRGBA列 例 10/100/255/255）を IntColor の Red / Green / Blue / Alpha に接続。【なぜ IntColor か】バラバラの数値（0〜255）を1つの“色”に組み立てる専用ブロックだから。DBが色を数値で持つケースをそのまま色へ変換できる\n・IntColor の Color 出力を対象マテリアルの Layer1.Colors.Diffuse（CSV RGB）へ接続。【なぜ Diffuse か】オブジェクトの“基本の面の色”がここだから",
    "body_en": "・Connect the R / G / B / alpha texts (DB RGBA columns, e.g. 10/100/255/255) to IntColor's Red / Green / Blue / Alpha. [Why IntColor] it assembles separate numbers (0–255) into one color — perfect when the DB stores color as numbers\n・Connect IntColor's Color output to the material's Layer1.Colors.Diffuse (CSV RGB). [Why Diffuse] that's the object's base surface color",
    "tip": "🔗ネイティブ併用：DataLinq で R/G/B を供給し VL の IntColor で1色化（RGB数値も同時に見せたい時に有利）。色を出すだけなら Dynamic Material 単体でも可。 【なぜ整数の IntColor か】DB/CSVの色が 0〜255 の整数で来る時はこれが素直。0〜1の小数で来るなら FloatColor を使う。R/G/B/Alpha を別々のテキストで受けて1色にまとめるのが要。",
    "tip_en": "🔗Hybrid: DataLinq supplies R/G/B and VL's IntColor merges them (handy when you also show the RGB numbers); color-only can be Dynamic Material alone. [Why integer IntColor] use it when the DB/CSV color arrives as 0–255 integers; use FloatColor for 0–1 values. The key is receiving R/G/B/Alpha as separate texts and merging them into one color."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 結果：DB（CSV）のRGBA どおりに素材色が決まる（例 10,100,255,255 → #FF0A64FF の青）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Result: the material color follows the DB (CSV) RGBA (e.g. 10,100,255,255 → #FF0A64FF, a blue)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-05-show-a-highlight-fill",
  "title": "VL 05｜出場中（InGame）の選手だけ白枠・塗りを出す",
  "title_en": "VL 05 | Show a highlight/fill only for in-game players (roster)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "出場中（フラグ=1）の選手だけ枠や塗りが表示される。",
  "goal_en": "Only in-game (flag=1) players get the frame/fill.",
  "overview": "流れ：選手のフラグ用テキスト → String Value → String Compare → 選手背景/枠の Visible",
  "overview_en": "Flow: 選手のflagテキスト → String Value → String Compare → 選手背景/枠の Visible",
  "svg": "<svg viewBox=\"0 0 606 98\" width=\"606\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv05j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,37 224,37\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv05j)\"/><path d=\"M158,87 C191,87 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv05j)\"/><path d=\"M382,37 C415,37 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv05j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PlayerBG_TEXT .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"8\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,26 L224.5,13 Q224.5,8.5 229,8.5 L377,8.5 Q381.5,8.5 381.5,13 L381.5,26 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"21\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"37\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"37\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"51\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"54\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"65\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"79\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"82\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PlayerBG .Visible</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 05】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 選手のフラグ用テキスト（PlayerBG_TEXT 例 1＝出場中）\n・[Strings] String Value（判定値 例 1）\n・[Strings] String Compare（Equal を使う）\n・[Object] 選手背景/枠の Visible（PlayerBG）",
    "body_en": "[VL recipe 05]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] 選手のflagテキスト（PlayerBG_TEXT 例 1＝出場中）\n・[Strings] String Value（judgeValue 例 1）\n・[Strings] String Compare（Equal を使う）\n・[Object] 選手背景/枠の Visible（PlayerBG）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・選手のフラグテキスト（PlayerBG_TEXT 例 1）を String Compare の String1、判定値の String Value（例 1）を String2 に接続。【なぜ String Compare か】“この選手が出場中か”を値の一致で判定するため。Equal 出力が 0/1 で返る\n・String Compare の Equal を、その選手の背景/枠の Visible へ接続。【なぜ Not が不要か】判定値を“表示したい状態（出場中=1）”にしているので、Equal=1 がそのまま「表示」になる（反転がいらない）\n・これを人数分（選手ごと）にコピー",
    "body_en": "・Feed the player's flag text (PlayerBG_TEXT, e.g. 1) into String Compare's String1 and the test value (String Value, e.g. 1) into String2. [Why String Compare] to judge 'is this player in-game' by matching a value; Equal returns 0/1\n・Connect String Compare's Equal to that player's background/frame Visible. [Why no Not] the test value IS the show-state (in-game=1), so Equal=1 directly means 'show' (no inversion)\n・Duplicate per player",
    "tip": "1選手ぶんを作って人数分コピーする作り。判定値はDBの出場フラグ書式（1 や IN 等）に合わせる。【Not不要のポイント】“表示したい値”と直接比較しているので Equal をそのまま Visible へ。逆に『空なら隠す』系は“隠したい値”と比較するので Not で反転が要る、という使い分け。",
    "tip_en": "Build one player and copy per player. Match the test value to your DB's in-game flag ('1', 'IN', etc.). [Why no Not] you compare against the show-value, so Equal → Visible directly; the 'hide when empty' recipe compares against the hide-value and thus needs Not — that's the difference."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 出場中（フラグ=1）の選手だけ枠や塗りが表示される\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Only in-game (flag=1) players get the frame/fill\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-06-turn-quarter-period-display",
  "title": "VL 06｜Quarter/Period表示をソートして任意情報にする（多段Input Selector）",
  "title_en": "VL 06 | Turn Quarter/Period display into any info, sorted (multi-stage Input Selector)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "結果：1〜4 → 1Q〜4Q、5 → OT、6 → 2OT、7 → 3OT。数値1つを段階的に振り分けて表示できる（候補が増えても段を足すだけ）。",
  "goal_en": "Result: 1–4 → 1Q–4Q, 5 → OT, 6 → 2OT, 7 → 3OT. One number is routed stage by stage (extend by adding stages).",
  "overview": "流れ：PIRIOD_DB → String Value ×4 → stage 1 Input Selector → Value 4 → Subtract → String Value ×3 → stage 2 Input Selector → Smaller Than → final Input Selector → PIRIOD_txt",
  "overview_en": "Flow: PIRIOD_DB → String Value ×4 → stage 1 Input Selector → Value 4 → Subtract → String Value ×3 → stage 2 Input Selector → Smaller Than → final Input Selector → PIRIOD_txt",
  "svg": "<svg viewBox=\"0 0 1054 504\" width=\"1054\" height=\"504\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv06j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,161 224,161\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,87 C191,87 191,175 224,175\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,145 C191,145 191,189 224,189\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,203 C191,203 191,203 224,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,261 C191,261 191,217 224,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,29 C191,29 191,275 224,275\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,319 C191,319 191,289 224,289\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M382,275 C415,275 415,240 448,240\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,377 C303,377 303,254 448,254\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,435 C303,435 303,268 448,268\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,493 C303,493 303,282 448,282\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,319 C191,319 191,347 224,347\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M158,29 C191,29 191,361 224,361\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M382,161 C527,161 527,247 672,247\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M606,240 C639,240 639,261 672,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M382,347 C527,347 527,275 672,275\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><path d=\"M830,247 C863,247 863,261 896,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PIRIOD_DB</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1Q</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 2Q</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 3Q</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 4Q</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"132\" width=\"158\" height=\"96\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,150 L224.5,137 Q224.5,132.5 229,132.5 L377,132.5 Q381.5,132.5 381.5,137 L381.5,150 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"145\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">stage 1 Input Selector</text><circle cx=\"224\" cy=\"161\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"164\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"175\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"178\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"189\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"192\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"382\" cy=\"161\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"164\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 4</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"246\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,264 L224.5,251 Q224.5,246.5 229,246.5 L377,246.5 Q381.5,246.5 381.5,251 L381.5,264 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"259\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"224\" cy=\"275\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"289\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"292\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">-</text><circle cx=\"382\" cy=\"275\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"348\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,366 L0.5,353 Q0.5,348.5 5,348.5 L153,348.5 Q157.5,348.5 157.5,353 L157.5,366 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"361\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value OT</text><circle cx=\"158\" cy=\"377\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"380\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"406\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,424 L0.5,411 Q0.5,406.5 5,406.5 L153,406.5 Q157.5,406.5 157.5,411 L157.5,424 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"419\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 2OT</text><circle cx=\"158\" cy=\"435\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"438\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"464\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,482 L0.5,469 Q0.5,464.5 5,464.5 L153,464.5 Q157.5,464.5 157.5,469 L157.5,482 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"477\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 3OT</text><circle cx=\"158\" cy=\"493\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"496\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"211\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,229 L448.5,216 Q448.5,211.5 453,211.5 L601,211.5 Q605.5,211.5 605.5,216 L605.5,229 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"224\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">stage 2 Input Selector</text><circle cx=\"448\" cy=\"240\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"243\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"254\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"257\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"268\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"271\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"282\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"285\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"240\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"243\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"318\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,336 L224.5,323 Q224.5,318.5 229,318.5 L377,318.5 Q381.5,318.5 381.5,323 L381.5,336 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"331\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Smaller Than</text><circle cx=\"224\" cy=\"347\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"350\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"361\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"364\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&lt;</text><circle cx=\"382\" cy=\"347\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"350\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"218\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,236 L672.5,223 Q672.5,218.5 677,218.5 L825,218.5 Q829.5,218.5 829.5,223 L829.5,236 Z\" fill=\"#FF8C00\"/><text x=\"680\" y=\"231\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">final Input Selector</text><circle cx=\"672\" cy=\"247\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"250\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"672\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"672\" cy=\"275\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"830\" cy=\"247\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"250\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,250 L896.5,237 Q896.5,232.5 901,232.5 L1049,232.5 Q1053.5,232.5 1053.5,237 L1053.5,250 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PIRIOD_txt</text><circle cx=\"896\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 06】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] PIRIOD_DB（元コード 数値 例3）\n・[Strings] String Value ×4（1Q/2Q/3Q/4Q）→ stage 1 の [1]〜[4]\n・[Selector] stage 1 Input Selector（通常クォーター）\n・[Math] Value 4\n・[Math] Subtract（PIRIOD_DB − 4 ＝ 延長用インデックス）\n・[Strings] String Value ×3（OT/2OT/3OT）→ stage 2 の [1]〜[3]\n・[Selector] stage 2 Input Selector（延長 OT系）\n・[Logic] Smaller Than（Base=Value4, < 側=PIRIOD_DB ＝ 4<period）\n・[Selector] final Input Selector（通常/延長を集約）\n・[Object] PIRIOD_txt（表示 Text）",
    "body_en": "[VL recipe 06]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] PIRIOD_DB（sourceコード 数Value 例3）\n・[Strings] String Value ×4（1Q/2Q/3Q/4Q）→ stage 1 の [1]〜[4]\n・[Selector] stage 1 Input Selector（normalクォーター）\n・[Math] Value 4\n・[Math] Subtract（PIRIOD_DB − 4 ＝ 延長用インデックス）\n・[Strings] String Value ×3（OT/2OT/3OT）→ stage 2 の [1]〜[3]\n・[Selector] stage 2 Input Selector（延長 OT系）\n・[Logic] Smaller Than（Base=Value4, < 側=PIRIOD_DB ＝ 4<period）\n・[Selector] final Input Selector（normal/延長を集約）\n・[Object] PIRIOD_txt（表示 Text）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【stage 1 Input Selector】の Index に PIRIOD_DB（数値）を接続し、[1]=1Q, [2]=2Q, [3]=3Q, [4]=4Q の String Value を割り当てる（[0]は空）\n・【stage 2 Input Selector】は延長用。Value(4) と Subtract で PIRIOD_DB−4 を計算して Index にし、[1]=OT, [2]=2OT, [3]=3OT の String Value を割り当てる\n・【Smaller Than】で 4 < PIRIOD_DB を判定（Base=Value4, < 側=PIRIOD_DB ＝ period が5以上＝延長か）。通常=0 / 延長=1 を返す\n・【final Input Selector】の Index に Smaller Than の結果を接続し、[0]=stage 1 の Output（通常）、[1]=stage 2 の Output（延長）を割り当てる\n・final の Output を PIRIOD_txt へ接続する",
    "body_en": "・Connect PIRIOD_DB (number) to the Stage-1 Input Selector's Index and assign String Values [1]=1Q, [2]=2Q, [3]=3Q, [4]=4Q ([0] is blank)\n・Stage-2 Input Selector handles overtime: compute PIRIOD_DB−4 with Value(4)+Subtract as its Index and assign String Values [1]=OT, [2]=2OT, [3]=3OT\n・With Smaller Than judge 4 < PIRIOD_DB (Base=Value 4, the < input = PIRIOD_DB — i.e. period ≥ 5 = overtime). Returns 0 for regular / 1 for overtime\n・Connect Smaller Than's result to the Final Input Selector's Index; assign [0]=Stage-1 Output (regular), [1]=Stage-2 Output (overtime)\n・Connect Final's Output to PIRIOD_txt",
    "tip": "多段の要は『通常=stage1／延長=stage2、Smaller Than で振り分けて final で集約』。ラベル（1Q・OT等）は String Value で各スロットに差し込む。stage 2 の Index は Subtract(period−4) の代わりに Input Selector の Index Offset=4 でも同じ。判定は Greater Than でも Smaller Than でも作れる（入力の当て方で同じ結果）。まず stage 1 だけ作って動かし、stage 2・final を足すと崩れにくい。",
    "tip_en": "The essence: Stage 1 for regular, Stage 2 for overtime, Smaller Than to route, Final to aggregate. Labels (1Q/OT…) are injected per slot via String Value. Stage 2's index can use Input Selector Index Offset=4 instead of Subtract. You can use Greater Than or Smaller Than — same result depending on how inputs are wired. Build Stage 1 alone first, then add Stage 2 and Final."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 結果：1〜4 → 1Q〜4Q、5 → OT、6 → 2OT、7 → 3OT。数値1つを段階的に振り分けて表示できる（候補が増えても段を足すだけ）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Result: 1–4 → 1Q–4Q, 5 → OT, 6 → 2OT, 7 → 3OT. One number is routed stage by stage (extend by adding stages)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 1054 504\" width=\"1054\" height=\"504\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv06e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,161 224,161\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,87 C191,87 191,175 224,175\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,145 C191,145 191,189 224,189\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,203 C191,203 191,203 224,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,261 C191,261 191,217 224,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,29 C191,29 191,275 224,275\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,319 C191,319 191,289 224,289\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M382,275 C415,275 415,240 448,240\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,377 C303,377 303,254 448,254\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,435 C303,435 303,268 448,268\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,493 C303,493 303,282 448,282\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,319 C191,319 191,347 224,347\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M158,29 C191,29 191,361 224,361\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M382,161 C527,161 527,247 672,247\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M606,240 C639,240 639,261 672,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M382,347 C527,347 527,275 672,275\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><path d=\"M830,247 C863,247 863,261 896,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv06e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PIRIOD_DB</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1Q</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 2Q</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 3Q</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 4Q</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"132\" width=\"158\" height=\"96\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,150 L224.5,137 Q224.5,132.5 229,132.5 L377,132.5 Q381.5,132.5 381.5,137 L381.5,150 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"145\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector stage 1</text><circle cx=\"224\" cy=\"161\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"164\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"175\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"178\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"189\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"192\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"224\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"382\" cy=\"161\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"164\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 4</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"246\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,264 L224.5,251 Q224.5,246.5 229,246.5 L377,246.5 Q381.5,246.5 381.5,251 L381.5,264 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"259\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"224\" cy=\"275\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"289\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"292\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">-</text><circle cx=\"382\" cy=\"275\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"348\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,366 L0.5,353 Q0.5,348.5 5,348.5 L153,348.5 Q157.5,348.5 157.5,353 L157.5,366 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"361\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value OT</text><circle cx=\"158\" cy=\"377\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"380\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"406\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,424 L0.5,411 Q0.5,406.5 5,406.5 L153,406.5 Q157.5,406.5 157.5,411 L157.5,424 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"419\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 2OT</text><circle cx=\"158\" cy=\"435\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"438\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"464\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,482 L0.5,469 Q0.5,464.5 5,464.5 L153,464.5 Q157.5,464.5 157.5,469 L157.5,482 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"477\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 3OT</text><circle cx=\"158\" cy=\"493\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"496\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"211\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,229 L448.5,216 Q448.5,211.5 453,211.5 L601,211.5 Q605.5,211.5 605.5,216 L605.5,229 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"224\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector final</text><circle cx=\"448\" cy=\"240\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"243\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"254\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"257\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"268\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"271\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"282\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"285\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"240\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"243\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"318\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,336 L224.5,323 Q224.5,318.5 229,318.5 L377,318.5 Q381.5,318.5 381.5,323 L381.5,336 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"331\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Smaller Than</text><circle cx=\"224\" cy=\"347\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"350\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"361\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"364\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&lt;</text><circle cx=\"382\" cy=\"347\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"350\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"218\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,236 L672.5,223 Q672.5,218.5 677,218.5 L825,218.5 Q829.5,218.5 829.5,223 L829.5,236 Z\" fill=\"#FF8C00\"/><text x=\"680\" y=\"231\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">final Input Selector</text><circle cx=\"672\" cy=\"247\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"250\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"672\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"672\" cy=\"275\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"830\" cy=\"247\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"250\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,250 L896.5,237 Q896.5,232.5 901,232.5 L1049,232.5 Q1053.5,232.5 1053.5,237 L1053.5,250 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PIRIOD_txt</text><circle cx=\"896\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-07-play-an-animation-video",
  "title": "VL 07｜得点更新時にアニメーション（動画マテリアル）を再生する【イベント】",
  "title_en": "VL 07 | Play an animation (video material) when the score updates — with optional Timer delay [event]",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "→ 更新でタイマーが起動し、End Time（例0.3秒）経過後に OnTimer が発火して動画が再生される。",
  "goal_en": "→ On update the timer starts, and after End Time (e.g. 0.3s) OnTimer fires and plays the video.",
  "overview": "流れ：スコアテキストの Events.OnSetText → 動画マテリアルの Layer1.Video.Play → Timer → quad の Layer1.Video.Play",
  "overview_en": "Flow: スコアテキストの Events.OnSetText → 動画マテリアルの Layer1.Video.Play → Timer → quad の Layer1.Video.Play",
  "svg": "<svg viewBox=\"0 0 606 126\" width=\"606\" height=\"126\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv07j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,72 C191,72 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv07j)\"/><path d=\"M158,72 C191,72 191,87 224,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv07j)\"/><path d=\"M382,87 C415,87 415,72 448,72\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv07j)\"/><rect x=\"0\" y=\"43\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,61 L0.5,48 Q0.5,43.5 5,43.5 L153,43.5 Q157.5,43.5 157.5,48 L157.5,61 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"56\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Score_DB .OnSetText</text><circle cx=\"158\" cy=\"72\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"75\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Score .Video.Play</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"224\" y=\"58\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,76 L224.5,63 Q224.5,58.5 229,58.5 L377,58.5 Q381.5,58.5 381.5,63 L381.5,76 Z\" fill=\"#1E8865\"/><text x=\"232\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Timer (delay timer)</text><circle cx=\"224\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Start</text><circle cx=\"224\" cy=\"101\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"104\" font-size=\"9\" fill=\"#20242c\">Stop</text><circle cx=\"224\" cy=\"115\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"118\" font-size=\"9\" fill=\"#20242c\">Reset</text><circle cx=\"382\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">OnTimer</text><rect x=\"448\" y=\"43\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,61 L448.5,48 Q448.5,43.5 453,43.5 L601,43.5 Q605.5,43.5 605.5,48 L605.5,61 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"56\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">quad 60f_ami_Video .Vid…</text><circle cx=\"448\" cy=\"72\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"75\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 07】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] スコアテキストの Events.OnSetText（Score_DB）\n・[Object] 動画マテリアルの Layer1.Video.Play（即時再生）\n・[Timer] Timer（delay timer / Start→OnTimer）\n・[Object] quad の Layer1.Video.Play（60f_ami_Video・ディレイ再生）",
    "body_en": "[VL recipe 07]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] スコアテキストの Events.OnSetText（Score_DB）\n・[Object] 動画マテリアルの Layer1.Video.Play（即時再生）\n・[Timer] Timer（delay timer / Start→OnTimer）\n・[Object] quad の Layer1.Video.Play（60f_ami_Video・ディレイ再生）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・再生したい動画を作り、対象マテリアルに Video として割り当てる（例：60f_ami_Video を quad に割り当て）\n・スコアテキストの Events.OnSetText を用意（対象TextをVLエディタにドラッグ）\n・【即時に出す場合】OnSetText の出力を、そのまま動画マテリアルの Layer1.Video.Play へ接続 → 更新の瞬間に再生される\n・【ディレイをかける場合】OnSetText の出力を Timer（delay timer）の Start に接続する\n・Timer の Properties：Start Time=00:00:00.000 ／ End Time=かけたいディレイ量（例 00:00:00.300）／ Direction=Up ／ Reset Mode=Reset on timer（End Time到達で自動リセットし次に備える）\n・Timer の OnTimer 出力を、対象の Layer1.Video.Play（quad の 60f_ami_Video 等）へ接続する",
    "body_en": "・Make the video to play and assign it as Video to the target material (e.g. 60f_ami_Video on a quad)\n・Create the score text's Events.OnSetText (drag the Text into the VL editor)\n・[Immediate] Connect OnSetText's output straight to the material's Layer1.Video.Play → plays the instant it updates\n・[Delayed] Connect OnSetText's output to the Timer (delay timer)'s Start input\n・Timer Properties: Start Time=00:00:00.000 / End Time=the delay (e.g. 00:00:00.300) / Direction=Up / Reset Mode=Reset on timer (auto-resets at End Time for the next update)\n・Connect the Timer's OnTimer output to the target's Layer1.Video.Play (e.g. the quad's 60f_ami_Video)",
    "tip": "Events.OnSetText は『値が更新された瞬間』のトリガー。VLに『待機』専用ブロックは無いが、Timer を中継すると『更新→End Time 経過後に実行』のディレイが作れる。要点は OnSetText→Timer.Start／Timer.OnTimer→Play／Reset Mode=Reset on timer。即時とディレイを別々につなげば、数字は即・演出は少し遅れて、と出し分けできる。Format(SSS)は表示桁の設定で、実ディレイ量は End Time。",
    "tip_en": "Events.OnSetText triggers the moment a value updates. VL has no dedicated 'wait' block, but relaying through a Timer gives a delay: update → after End Time → run. The keys are OnSetText→Timer.Start, Timer.OnTimer→Play, and Reset Mode=Reset on timer (auto-resets for the next update). Wire immediate and delayed separately to fire the number instantly and the effect slightly later. Format (SSS) is just display digits; the actual delay is End Time."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ → 更新でタイマーが起動し、End Time（例0.3秒）経過後に OnTimer が発火して動画が再生される\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ → On update the timer starts, and after End Time (e.g. 0.3s) OnTimer fires and plays the video\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-08-resize-a-quad-bar",
  "title": "VL 08｜カウントダウンに連動してQuad（バー）のサイズを変える",
  "title_en": "VL 08 | Resize a Quad (bar) driven by a countdown/count",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "現在値/最大値 に比例してバーが伸縮する（5/5=1 → フル）。",
  "goal_en": "The bar grows in proportion to current/max (5/5=1 → full).",
  "overview": "流れ：Count → Value → Divide → Multiply → Quad の Scale.Y",
  "overview_en": "Flow: Count → Value → Divide → Multiply → Quad の Scale.Y",
  "svg": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv08j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv08j)\"/><path d=\"M158,87 C191,87 191,65 224,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv08j)\"/><path d=\"M382,51 C415,51 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv08j)\"/><path d=\"M606,51 C639,51 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv08j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Count .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 5 (MAX)</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,40 L224.5,27 Q224.5,22.5 229,22.5 L377,22.5 Q381.5,22.5 381.5,27 L381.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Divide</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Divisor</text><circle cx=\"382\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"68\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Quad .Scale.Y</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 08】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] Count（現在値 Text 例5）\n・[Math] Value（最大値 MAX 例5）\n・[Math] Divide（Base÷Divisor で正規化）\n・[Math] Multiply（見た目の係数）\n・[Object] Quad の Scale.Y",
    "body_en": "[VL recipe 08]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] Count（現在Value Text 例5）\n・[Math] Value（最大Value MAX 例5）\n・[Math] Divide（Base÷Divisor で正規化）\n・[Math] Multiply（見た目の係数）\n・[Object] Quad の Scale.Y",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Count（現在値 例5）を Divide の Base、Value（最大値 MAX 例5）を Divisor に接続。【なぜ Divide か】現在値を最大値で割って 0〜1 に“正規化”するため。満タン=1・空=0 の割合になる\n・Divide の出力を Multiply に通し、Multiplier で係数をかける（例 ×1）。【なぜ Multiply か】0〜1 の割合を実際のスケール値/倍率に合わせて拡大するため（×1なら等倍）\n・結果を Quad の Scale.Y へ接続。【なぜ Scale.Y か】縦バーの“伸び”は縦スケールだから（横バーなら Scale.X）",
    "body_en": "・Connect Count (current, e.g. 5) to Divide's Base and a Value (MAX, e.g. 5) to Divisor. [Why Divide] to normalize current ÷ max into 0–1 (full=1, empty=0)\n・Pass Divide's output through Multiply with a Multiplier (e.g. ×1). [Why Multiply] to scale the 0–1 ratio to the real scale/size (×1 = 1:1)\n・Connect the result to Quad's Scale.Y. [Why Scale.Y] a vertical bar's growth is vertical scale (use Scale.X for horizontal)",
    "tip": "要は『現在値 ÷ 最大値 → 0〜1 に正規化 → スケールへ』。カウントダウンでも件数でも同じ形。横バーは Scale.X、位置で表すなら Position。Multiplier は見た目合わせの係数。",
    "tip_en": "At heart: current ÷ max → normalize to 0–1 → feed scale. Same shape for countdowns or counts. Use Scale.X for a horizontal bar, or Position to express it by position. The Multiplier is a look-matching factor."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 現在値/最大値 に比例してバーが伸縮する（5/5=1 → フル）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ The bar grows in proportion to current/max (5/5=1 → full)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-09-drop-the-decimals-for",
  "title": "VL 09｜小数点以下を消して整数表示にする（1.0→1）＋DataLinq設定",
  "title_en": "VL 09 | Drop the decimals for integer display (1.0 → 1) + DataLinq setup",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "結果：末尾の .0 が消えて整数表示になる（1.0 → 1）。",
  "goal_en": "Result: the trailing .0 is gone and it shows an integer (1.0 → 1).",
  "overview": "流れ：DataLinq → DB用テキスト → Value → Left String → 表示テキスト",
  "overview_en": "Flow: DataLinq → DB用テキスト → Value → Left String → 表示テキスト",
  "svg": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv09j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,58 224,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09j)\"/><path d=\"M382,58 C415,58 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09j)\"/><path d=\"M158,87 C303,87 303,65 448,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09j)\"/><path d=\"M606,51 C639,51 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">DataLinq (Data 1)</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Data 1</text><rect x=\"224\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,47 L224.5,34 Q224.5,29.5 229,29.5 L377,29.5 Q381.5,29.5 381.5,34 L381.5,47 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Point_DB .Text</text><circle cx=\"224\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"382\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"448\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Length</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Point_txt .Text</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 09】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Data Src] DataLinq（外部スコア Data 1）\n・[Object] DB用テキスト（Point_DB、非表示）\n・[Math] Value（残す桁数 例 1）\n・[Strings] Left String（In / Length → Out）\n・[Object] 表示テキスト（Point_txt）",
    "body_en": "[VL recipe 09]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Data Src] DataLinq（外部スコア Data 1）\n・[Object] DB用テキスト（Point_DB、非表示）\n・[Math] Value（残すdigits数 例 1）\n・[Strings] Left String（In / Length → Out）\n・[Object] 表示テキスト（Point_txt）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・DataLinq（外部スコア。例 Data 1）でDB用テキスト Point_DB に値を取り込む。【なぜ表示用とDB用の2枚か】加工は生値（Point_DB）に対して行い、DB用は非表示にして裏方にするため。表示側にはきれいな結果だけ出す\n・Point_DB を Left String の In、必要桁数を Value で Length に接続。【なぜ Left String か】“左からN文字だけ”取り出すブロックなので、末尾の .0 や余分を物理的に落とせる（例 1.0 → Length 1 → 1）\n・Left String の Out を表示テキスト Point_txt へ接続",
    "body_en": "・Bring the value into the DB text Point_DB via DataLinq (external score, e.g. Data 1). [Why two texts] do the processing on the raw value (Point_DB, hidden) and show only the clean result on the display text\n・Connect Point_DB to Left String's In and the character count to Length with a Value. [Why Left String] it takes 'only N chars from the left', physically dropping the trailing .0 (e.g. 1.0 → Length 1 → 1)\n・Connect Left String's Out to the display text Point_txt",
    "tip": "🔗ネイティブ併用：DataLinq が値を持ち込み、VL の Left String で末尾を整形する自然な併用。桁指定がデータ側でできるならそちらが楽。 【なぜ2テキスト構成か】DataLinq の生値をそのまま出すと 1.0 のように出るので、DB用（非表示）で受けて Left String で整形→表示用に出す、が定番。桁数（Length）はデータ書式に合わせる。",
    "tip_en": "🔗Hybrid: DataLinq brings the value in and VL's Left String trims the tail — a natural combo. If the source can format digits, do it there. [Why two texts] a raw DataLinq value shows as '1.0', so receive it on a hidden DB text, trim with Left String, and output to the display text. Match Length to your data format."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 結果：末尾の .0 が消えて整数表示になる（1.0 → 1）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Result: the trailing .0 is gone and it shows an integer (1.0 → 1)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv09e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,58 224,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09e)\"/><path d=\"M382,58 C415,58 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09e)\"/><path d=\"M158,87 C303,87 303,65 448,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09e)\"/><path d=\"M606,51 C639,51 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv09e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">DataLinq (Data 1)</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Data 1</text><rect x=\"224\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,47 L224.5,34 Q224.5,29.5 229,29.5 L377,29.5 Q381.5,29.5 381.5,34 L381.5,47 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Point_DB .Text</text><circle cx=\"224\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"382\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value digits</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"448\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Length</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Point_txt .Text</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-10-rotate-analog-clock-hands",
  "title": "VL 10｜アナログ時計の針を回す（Decode Date Time→回転）",
  "title_en": "VL 10 | Rotate analog clock hands (Decode Date Time → rotation)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "秒針：Seconds×6 を Multiply で出し、そのまま秒針の Rotation.Z（例 47秒 → 282）。",
  "goal_en": "Second hand: Multiply Seconds×6 → second hand's Rotation.Z (e.g. 47s → 282).",
  "overview": "流れ：Clock → Decode Date Time → Multiply → Multiply → Add → 時針/分針/秒針の Rotation.Z",
  "overview_en": "Flow: Clock → Decode Date Time → Multiply → Multiply → Add → 時針/分針/秒針の Rotation.Z",
  "svg": "<svg viewBox=\"0 0 1054 342\" width=\"1054\" height=\"342\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv10j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,166 C191,166 191,138 224,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M382,180 C415,180 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M382,194 C415,194 415,101 448,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M606,29 C639,29 639,108 672,108\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M606,101 C639,101 639,122 672,122\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M830,108 C863,108 863,151 896,151\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M382,194 C415,194 415,173 448,173\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M382,208 C415,208 415,245 448,245\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M606,173 C639,173 639,180 672,180\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M606,245 C639,245 639,194 672,194\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M830,180 C863,180 863,209 896,209\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M382,208 C415,208 415,317 448,317\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><path d=\"M606,317 C639,317 639,252 672,252\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv10j)\"/><rect x=\"0\" y=\"137\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,155 L0.5,142 Q0.5,137.5 5,137.5 L153,137.5 Q157.5,137.5 157.5,142 L157.5,155 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"150\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"166\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"169\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"180\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"183\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"194\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"197\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"109\" width=\"158\" height=\"124\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,127 L224.5,114 Q224.5,109.5 229,109.5 L377,109.5 Q381.5,109.5 381.5,114 L381.5,127 Z\" fill=\"#735099\"/><text x=\"232\" y=\"122\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Decode Date Time</text><circle cx=\"224\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"382\" cy=\"138\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"141\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Year</text><circle cx=\"382\" cy=\"152\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"155\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Month</text><circle cx=\"382\" cy=\"166\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"169\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Day</text><circle cx=\"382\" cy=\"180\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"183\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Hours</text><circle cx=\"382\" cy=\"194\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"197\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Minutes</text><circle cx=\"382\" cy=\"208\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"211\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Seconds</text><circle cx=\"382\" cy=\"222\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"225\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Milliseconds</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×30</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"43\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"46\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"72\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,90 L448.5,77 Q448.5,72.5 453,72.5 L601,72.5 Q605.5,72.5 605.5,77 L605.5,90 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×0.5</text><circle cx=\"448\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"115\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"118\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"79\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,97 L672.5,84 Q672.5,79.5 677,79.5 L825,79.5 Q829.5,79.5 829.5,84 L829.5,97 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"92\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add</text><circle cx=\"672\" cy=\"108\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"111\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"122\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"125\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"830\" cy=\"108\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"111\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"122\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,140 L896.5,127 Q896.5,122.5 901,122.5 L1049,122.5 Q1053.5,122.5 1053.5,127 L1053.5,140 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"135\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Hours .Rotation.Z</text><circle cx=\"896\" cy=\"151\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"154\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"144\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,162 L448.5,149 Q448.5,144.5 453,144.5 L601,144.5 Q605.5,144.5 605.5,149 L605.5,162 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"157\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×6</text><circle cx=\"448\" cy=\"173\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"176\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"187\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"190\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"173\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"176\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"216\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,234 L448.5,221 Q448.5,216.5 453,216.5 L601,216.5 Q605.5,216.5 605.5,221 L605.5,234 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"229\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×0.1</text><circle cx=\"448\" cy=\"245\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"248\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"259\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"262\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"245\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"248\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"151\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,169 L672.5,156 Q672.5,151.5 677,151.5 L825,151.5 Q829.5,151.5 829.5,156 L829.5,169 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"164\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add</text><circle cx=\"672\" cy=\"180\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"183\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"194\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"197\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"830\" cy=\"180\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"183\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"180\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,198 L896.5,185 Q896.5,180.5 901,180.5 L1049,180.5 Q1053.5,180.5 1053.5,185 L1053.5,198 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"193\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Minutes .Rotation.Z</text><circle cx=\"896\" cy=\"209\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"212\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"288\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,306 L448.5,293 Q448.5,288.5 453,288.5 L601,288.5 Q605.5,288.5 605.5,293 L605.5,306 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"301\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×6</text><circle cx=\"448\" cy=\"317\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"320\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"331\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"334\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"317\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"320\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"223\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,241 L672.5,228 Q672.5,223.5 677,223.5 L825,223.5 Q829.5,223.5 829.5,228 L829.5,241 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"236\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Sec .Rotation.Z</text><circle cx=\"672\" cy=\"252\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"255\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 10】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Timer] Clock\n・[Date Time] Decode Date Time（Hours/Minutes/Seconds を取り出す）\n・[Math] Multiply（時針×30・分針×6・秒針×6）\n・[Math] Multiply（端数 分×0.5・秒×0.1）\n・[Math] Add（端数を上位の針に合算）\n・[Object] 時針/分針/秒針の Rotation.Z",
    "body_en": "[VL recipe 10]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Timer] Clock\n・[Date Time] Decode Date Time（Hours/Minutes/Seconds を取り出す）\n・[Math] Multiply（時針×30・分針×6・秒針×6）\n・[Math] Multiply（端数 分×0.5・秒×0.1）\n・[Math] Add（端数を上位の針に合算）\n・[Object] 時針/分針/秒針の Rotation.Z",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Clock の Date Time を Decode Date Time に接続し、Hours/Minutes/Seconds を取り出す\n・時針：Hours×30 と Minutes×0.5 を Multiply で出し、Add で合算 → 時針の Rotation.Z（例 8時50分 → 240+25=265）\n・分針：Minutes×6 と Seconds×0.1 を Multiply で出し、Add で合算 → 分針の Rotation.Z（例 50分47秒 → 300+4.7=304.7）",
    "body_en": "・Connect Clock's Date Time to Decode Date Time and take Hours/Minutes/Seconds\n・Hour hand: Multiply Hours×30 and Minutes×0.5, sum with Add → hour hand's Rotation.Z (e.g. 8:50 → 240+25=265)\n・Minute hand: Multiply Minutes×6 and Seconds×0.1, sum with Add → minute hand's Rotation.Z (e.g. 50m47s → 300+4.7=304.7)",
    "tip": "1時間=30度・1分=6度・1秒=6度。上位の針に下位の端数を足す（時針に分×0.5、分針に秒×0.1）と連続的に動く。倍率は Multiply の Multiplier に定数で入れ、Base に Decode の出力（Hours/Minutes/Seconds）をつなぐ。",
    "tip_en": "1 hour = 30°, 1 minute = 6°, 1 second = 6°. Add the lower unit's fraction to the upper hand (minutes×0.5 to the hour hand, seconds×0.1 to the minute hand) for smooth motion. Put the factor in Multiply's Multiplier (constant) and wire Decode's output to Base."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 秒針：Seconds×6 を Multiply で出し、そのまま秒針の Rotation.Z（例 47秒 → 282）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Second hand: Multiply Seconds×6 → second hand's Rotation.Z (e.g. 47s → 282)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-11-show-a-lead-marker",
  "title": "VL 11｜リードしているチームに優勢マーカーを表示する",
  "title_en": "VL 11 | Show a lead marker for the leading team",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "【なぜ Visible か】“出す/隠す”の切替なので表示プロパティを使う。得点が多い側のマーカーだけ点灯する（同点は両方0で消える）。",
  "goal_en": "[Why Visible] it toggles show/hide, so use the visibility property. Only the higher side's marker lights (a tie makes both 0 → both hidden).",
  "overview": "流れ：HomeScore / AwayScore → Smaller Than → Greater Than → HOME READ / AWAY READ の Visible",
  "overview_en": "Flow: HomeScore / AwayScore → Smaller Than → Greater Than → HOME READ / AWAY READ の Visible",
  "svg": "<svg viewBox=\"0 0 606 126\" width=\"606\" height=\"126\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv11j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,43 C191,43 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv11j)\"/><path d=\"M158,101 C191,101 191,43 224,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv11j)\"/><path d=\"M158,43 C191,43 191,101 224,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv11j)\"/><path d=\"M158,101 C191,101 191,115 224,115\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv11j)\"/><path d=\"M382,29 C415,29 415,43 448,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv11j)\"/><path d=\"M382,101 C415,101 415,101 448,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv11j)\"/><rect x=\"0\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,32 L0.5,19 Q0.5,14.5 5,14.5 L153,14.5 Q157.5,14.5 157.5,19 L157.5,32 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HomeScore .Text</text><circle cx=\"158\" cy=\"43\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,90 L0.5,77 Q0.5,72.5 5,72.5 L153,72.5 Q157.5,72.5 157.5,77 L157.5,90 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AwayScore .Text</text><circle cx=\"158\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Smaller Than</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&lt;</text><circle cx=\"382\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"72\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,90 L224.5,77 Q224.5,72.5 229,72.5 L377,72.5 Q381.5,72.5 381.5,77 L381.5,90 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Greater Than</text><circle cx=\"224\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"115\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"118\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&gt;</text><circle cx=\"382\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,32 L448.5,19 Q448.5,14.5 453,14.5 L601,14.5 Q605.5,14.5 605.5,19 L605.5,32 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HOME READ .Visible</text><circle cx=\"448\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,90 L448.5,77 Q448.5,72.5 453,72.5 L601,72.5 Q605.5,72.5 605.5,77 L605.5,90 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AWAY READ .Visible</text><circle cx=\"448\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 11】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] HomeScore / AwayScore（Text）\n・[Logic] Smaller Than（ホーム優勢判定）\n・[Logic] Greater Than（アウェイ優勢判定）\n・[Object] HOME READ / AWAY READ の Visible",
    "body_en": "[VL recipe 11]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] HomeScore / AwayScore（Text）\n・[Logic] Smaller Than（ホーム優勢judge）\n・[Logic] Greater Than（アウェイ優勢judge）\n・[Object] HOME READ / AWAY READ の Visible",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・HomeScore と AwayScore を2つの比較ブロックに入れる。【なぜ Smaller/Greater Than か】“どちらが多いか”を 0/1 で判定するため。数値の大小だけで勝っている側が分かる\n・Smaller Than（Base=HomeScore, < 側=AwayScore ＝ Away<Home＝ホーム優勢）の Out を HOME READ の Visible へ\n・Greater Than（Base=HomeScore, > 側=AwayScore ＝ Away>Home＝アウェイ優勢）の Out を AWAY READ の Visible へ",
    "body_en": "・Feed HomeScore and AwayScore into two comparators. [Why Smaller/Greater Than] to judge 'which is higher' as 0/1 — the numeric comparison alone tells who leads\n・Smaller Than (Base=HomeScore, < input=AwayScore = Away<Home = Home leads) Out → HOME READ's Visible\n・Greater Than (Base=HomeScore, > input=AwayScore = Away>Home = Away leads) Out → AWAY READ's Visible",
    "tip": "表示の切替なので Visible を使う（色を変えるなら別レシピの Diffuse 版）。★実機は両方 Base=HomeScore・比較側=AwayScore で、Smaller Than→HOME READ、Greater Than→AWAY READ。比較ブロックの向きは Out=1 が『比較側 > Base』（Greater）／『比較側 < Base』（Smaller）＝実機検証済みの向き。同点だと両方 0 になり両マーカーが消えるので、同点表示を出したいなら Equal To を足す。英語名 Score Lead Visibility Switch。■実機確認済み（スクショ準拠：Home→両 Base、Away→両 比較側）。",
    "tip_en": "It toggles visibility, so use Visible (use the Diffuse version to change color instead). ★Hardware wires both with Base=HomeScore and compare side=AwayScore: Smaller Than→HOME READ, Greater Than→AWAY READ (block direction: Out=1 when 'compare side > Base' for Greater, '< Base' for Smaller — verified). On a tie both are 0 so both markers hide (add Equal To for a tie display). Named Score Lead Visibility Switch. ■Verified per screenshot (Home→both Base, Away→both compare inputs)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 【なぜ Visible か】“出す/隠す”の切替なので表示プロパティを使う。得点が多い側のマーカーだけ点灯する（同点は両方0で消える）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ [Why Visible] it toggles show/hide, so use the visibility property. Only the higher side's marker lights (a tie makes both 0 → both hidden)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-12-change-the-leading-team",
  "title": "VL 12｜リードしているチームのマーカー色を変える（FloatColor）",
  "title_en": "VL 12 | Change the leading team's marker color (FloatColor)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "AWAY 側は Greater Than → もう1つの Input Selector → FC_AWAY へ、と同じ形で対に組む。",
  "goal_en": "Mirror the AWAY side: Greater Than → another Input Selector → FC_AWAY.",
  "overview": "流れ：HomeScore / AwayScore → Smaller Than / Greater Than → Color/ Color → Input Selector → FC_HOME / FC_AWAY の Layer1.Colors.Diffuse",
  "overview_en": "Flow: HomeScore / AwayScore → Smaller Than / Greater Than → Color/ Color → Input Selector → FC_HOME / FC_AWAY の Layer1.Colors.Diffuse",
  "svg": "<svg viewBox=\"0 0 830 214\" width=\"830\" height=\"214\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv12j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,87 C191,87 191,109 224,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12j)\"/><path d=\"M158,29 C191,29 191,123 224,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12j)\"/><path d=\"M382,109 C415,109 415,95 448,95\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12j)\"/><path d=\"M158,145 C303,145 303,109 448,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12j)\"/><path d=\"M158,203 C303,203 303,123 448,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12j)\"/><path d=\"M606,95 C639,95 639,116 672,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HomeScore .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AwayScore .Text</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"80\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,98 L224.5,85 Q224.5,80.5 229,80.5 L377,80.5 Q381.5,80.5 381.5,85 L381.5,98 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"93\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Smaller Than</text><circle cx=\"224\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&lt;</text><circle cx=\"382\" cy=\"109\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color 通常</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color 優勢</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"448\" y=\"66\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,84 L448.5,71 Q448.5,66.5 453,66.5 L601,66.5 Q605.5,66.5 605.5,71 L605.5,84 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"79\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"448\" cy=\"95\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"98\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"448\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"448\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"448\" cy=\"137\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"140\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"606\" cy=\"95\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"98\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"672\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,105 L672.5,92 Q672.5,87.5 677,87.5 L825,87.5 Q829.5,87.5 829.5,92 L829.5,105 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">FC_HOME .Layer1.Colors.…</text><circle cx=\"672\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 12】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] HomeScore / AwayScore（Text）\n・[Logic] Smaller Than / Greater Than（優勢判定 0/1）\n・[Colors] Color（通常色）/ Color（優勢色）\n・[Selector] Input Selector（0/1 で色を選ぶ）\n・[Object] FC_HOME / FC_AWAY の Layer1.Colors.Diffuse",
    "body_en": "[VL recipe 12]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] HomeScore / AwayScore（Text）\n・[Logic] Smaller Than / Greater Than（優勢judge 0/1）\n・[Colors] Color（normal色）/ Color（優勢色）\n・[Selector] Input Selector（0/1 で色を選ぶ）\n・[Object] FC_HOME / FC_AWAY の Layer1.Colors.Diffuse",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・HomeScore/AwayScore を Smaller Than で比較し“ホーム優勢か（0/1）”を出す。【なぜ比較ブロックか】色を変える“きっかけ”＝どちらが勝っているかを 0/1 で作るため\n・その 0/1 を Input Selector の Index に接続し、[0]=通常色、[1]=優勢色（Color ブロック）を割り当てる。【なぜ Input Selector＋Color か】“状態で色を選ぶ”のが目的なので、番号で色を選べる Selector に候補 Color を並べるのが素直（FloatColor で作る必要はない）\n・Input Selector の Output を FC_HOME の Layer1.Colors.Diffuse へ接続 → 優勢なら優勢色（例 金 #FFFFD400）、そうでなければ通常色（白）",
    "body_en": "・Compare HomeScore/AwayScore with Smaller Than to get 'is Home leading' (0/1). [Why a comparator] to build the trigger for the color change — who's winning, as 0/1\n・Feed that 0/1 into Input Selector's Index; assign [0]=normal color, [1]=lead color (Color blocks). [Why Input Selector + Color] the goal is 'pick a color by state', so lay out candidate Colors in a Selector and pick by number (no FloatColor needed)\n・Connect Input Selector's Output to FC_HOME's Layer1.Colors.Diffuse → lead → lead color (e.g. gold #FFFFD400), else normal (white)",
    "tip": "【表示切替との違い】“出す/隠す”ではなく“色を変える”ので Visible ではなく Diffuse を切り替える。色は Input Selector で通常色/優勢色を番号で選ぶ方式（実機はここ）。タイトルは FloatColor だが、実機は Color ブロック＋Input Selector で色を差し替えている。",
    "tip_en": "[vs visibility] this changes the color (Diffuse), not show/hide, so switch Diffuse not Visible. Colors are picked by Input Selector between normal/lead (the real build). The title says FloatColor, but the real logic swaps colors with Color blocks + Input Selector."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ AWAY 側は Greater Than → もう1つの Input Selector → FC_AWAY へ、と同じ形で対に組む\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Mirror the AWAY side: Greater Than → another Input Selector → FC_AWAY\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 214\" width=\"830\" height=\"214\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv12e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,87 C191,87 191,109 224,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12e)\"/><path d=\"M158,29 C191,29 191,123 224,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12e)\"/><path d=\"M382,109 C415,109 415,95 448,95\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12e)\"/><path d=\"M158,145 C303,145 303,109 448,109\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12e)\"/><path d=\"M158,203 C303,203 303,123 448,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12e)\"/><path d=\"M606,95 C639,95 639,116 672,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv12e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HomeScore .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AwayScore .Text</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"80\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,98 L224.5,85 Q224.5,80.5 229,80.5 L377,80.5 Q381.5,80.5 381.5,85 L381.5,98 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"93\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Smaller Than</text><circle cx=\"224\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&lt;</text><circle cx=\"382\" cy=\"109\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color normal</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color 優勢</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"448\" y=\"66\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,84 L448.5,71 Q448.5,66.5 453,66.5 L601,66.5 Q605.5,66.5 605.5,71 L605.5,84 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"79\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"448\" cy=\"95\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"98\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"448\" cy=\"109\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"112\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"448\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"448\" cy=\"137\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"140\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"606\" cy=\"95\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"98\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"672\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,105 L672.5,92 Q672.5,87.5 677,87.5 L825,87.5 Q829.5,87.5 829.5,92 L829.5,105 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">FC_HOME .Layer1.Colors.…</text><circle cx=\"672\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-13-pick-a-material-color",
  "title": "VL 13｜チーム名でマテリアルの色を選ぶ（Team Material Color Selector）",
  "title_en": "VL 13 | Pick a material color by team name (Team Material Color Selector)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "Input Selector の Output を PICK_BG の Layer1.Colors.Diffuse へ接続 → チーム名に対応する色が出る（4チーム以上は Compare＋Multiply(×4…) と Color スロットを足すだけ）。",
  "goal_en": "Connect Input Selector's Output to PICK_BG's Layer1.Colors.Diffuse → the color for that team shows (add Compare+Multiply(×4…) and a Color slot for more teams).",
  "overview": "流れ：TEAM NAME → String Value＋ String Compare ×3 → Multiply＋ Add → Input Selector → Color → PICK_BG の Layer1.Colors.Diffuse",
  "overview_en": "Flow: TEAM NAME → String Value＋ String Compare ×3 → Multiply＋ Add → Input Selector → Color → PICK_BG の Layer1.Colors.Diffuse",
  "svg": "<svg viewBox=\"0 0 1278 446\" width=\"1278\" height=\"446\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv13j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,111 224,111\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,87 C191,87 191,125 224,125\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M382,111 C415,111 415,153 448,153\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,29 C191,29 191,211 224,211\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,145 C191,145 191,225 224,225\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M382,211 C415,211 415,225 448,225\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,29 C191,29 191,311 224,311\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,203 C191,203 191,325 224,325\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M382,311 C415,311 415,297 448,297\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,261 C415,261 415,211 672,211\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M606,153 C639,153 639,225 672,225\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M606,225 C639,225 639,225 672,225\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M606,297 C639,297 639,225 672,225\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M830,211 C863,211 863,204 896,204\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,319 C527,319 527,232 896,232\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,377 C527,377 527,246 896,246\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M158,435 C527,435 527,260 896,260\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><path d=\"M1054,204 C1087,204 1087,232 1120,232\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv13j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">TEAM NAME .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value TEAM A</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"82\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,100 L224.5,87 Q224.5,82.5 229,82.5 L377,82.5 Q381.5,82.5 381.5,87 L381.5,100 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"95\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"111\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"114\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"125\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"128\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"111\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"114\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"125\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"128\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"139\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"142\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"153\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"156\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"124\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,142 L448.5,129 Q448.5,124.5 453,124.5 L601,124.5 Q605.5,124.5 605.5,129 L605.5,142 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×1</text><circle cx=\"448\" cy=\"153\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"167\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"170\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value TEAM B</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"182\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,200 L224.5,187 Q224.5,182.5 229,182.5 L377,182.5 Q381.5,182.5 381.5,187 L381.5,200 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"195\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"211\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"214\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"225\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"228\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"211\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"214\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"225\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"228\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"239\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"242\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"253\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"256\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"196\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,214 L448.5,201 Q448.5,196.5 453,196.5 L601,196.5 Q605.5,196.5 605.5,201 L605.5,214 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"209\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×2</text><circle cx=\"448\" cy=\"225\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"228\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"239\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"242\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"225\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"228\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value TEAM C</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"282\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,300 L224.5,287 Q224.5,282.5 229,282.5 L377,282.5 Q381.5,282.5 381.5,287 L381.5,300 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"295\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"311\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"314\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"325\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"328\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"311\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"314\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"325\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"328\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"339\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"342\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"353\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"356\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"268\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,286 L448.5,273 Q448.5,268.5 453,268.5 L601,268.5 Q605.5,268.5 605.5,273 L605.5,286 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"281\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×3</text><circle cx=\"448\" cy=\"297\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"300\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"311\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"314\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"606\" cy=\"297\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"300\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"182\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,200 L672.5,187 Q672.5,182.5 677,182.5 L825,182.5 Q829.5,182.5 829.5,187 L829.5,200 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"195\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add</text><circle cx=\"672\" cy=\"211\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"214\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"225\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"228\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"672\" cy=\"239\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"242\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"672\" cy=\"253\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"256\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"830\" cy=\"211\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"214\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"175\" width=\"158\" height=\"96\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,193 L896.5,180 Q896.5,175.5 901,175.5 L1049,175.5 Q1053.5,175.5 1053.5,180 L1053.5,193 Z\" fill=\"#FF8C00\"/><text x=\"904\" y=\"188\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"896\" cy=\"204\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"207\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"896\" cy=\"218\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"221\" font-size=\"9\" fill=\"#20242c\">[0]</text><circle cx=\"896\" cy=\"232\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"235\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"896\" cy=\"246\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"249\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[2]</text><circle cx=\"896\" cy=\"260\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"263\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[3]</text><circle cx=\"1054\" cy=\"204\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"207\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color TEAM A</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"0\" y=\"348\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,366 L0.5,353 Q0.5,348.5 5,348.5 L153,348.5 Q157.5,348.5 157.5,353 L157.5,366 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"361\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color TEAM B</text><circle cx=\"158\" cy=\"377\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"380\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"0\" y=\"406\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,424 L0.5,411 Q0.5,406.5 5,406.5 L153,406.5 Q157.5,406.5 157.5,411 L157.5,424 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"419\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Color TEAM C</text><circle cx=\"158\" cy=\"435\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"438\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"1120\" y=\"203\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,221 L1120.5,208 Q1120.5,203.5 1125,203.5 L1273,203.5 Q1277.5,203.5 1277.5,208 L1277.5,221 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"216\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">PICK_BG .Layer1.Colors.…</text><circle cx=\"1120\" cy=\"232\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"235\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 13】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] TEAM NAME（Text）\n・[Strings] String Value（TEAM A/B/C）＋ String Compare ×3\n・[Math] Multiply（×1/×2/×3 で重み付け）＋ Add（合算＝index）\n・[Selector] Input Selector（index で色を選ぶ）\n・[Colors] Color（TEAM A/B/C の色）\n・[Object] PICK_BG の Layer1.Colors.Diffuse",
    "body_en": "[VL recipe 13]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] TEAM NAME（Text）\n・[Strings] String Value（TEAM A/B/C）＋ String Compare ×3\n・[Math] Multiply（×1/×2/×3 で重み付け）＋ Add（合算＝index）\n・[Selector] Input Selector（index で色を選ぶ）\n・[Colors] Color（TEAM A/B/C の色）\n・[Object] PICK_BG の Layer1.Colors.Diffuse",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・TEAM NAME を各チーム名の String Value と String Compare で判定（TEAM A/B/C）。【なぜ String Compare か】名前一致を 0/1 の数値にするため。一致した1つだけ Equal=1 になる\n・各 Equal を Multiply で重み付け（A=×1, B=×2, C=×3）し、Add でまとめる。【なぜ Multiply→Add でインデックス化するか】“どのチームか”を1つの番号に変換するため。A一致→1、B一致→2、C一致→3 という排他的な index が作れる（String Compare の Equal が数値なので掛け算・足し算できる）\n・その index を Input Selector の Index に接続。[1]=TEAM A色、[2]=TEAM B色、[3]=TEAM C色（Color ブロック）を割り当てる。【なぜ Input Selector＋Color か】番号で色を選ぶのが目的だから",
    "body_en": "・Judge TEAM NAME against each team's String Value with String Compare (TEAM A/B/C). [Why String Compare] to turn a name match into 0/1 — only the matching one is Equal=1\n・Weight each Equal with Multiply (A=×1, B=×2, C=×3) and sum with Add. [Why Multiply→Add to make an index] to turn 'which team' into one number: A→1, B→2, C→3 (String Compare's Equal is numeric, so it can be multiplied/added)\n・Feed that index into Input Selector's Index; assign [1]=TEAM A color, [2]=TEAM B, [3]=TEAM C (Color blocks). [Why Input Selector + Color] the goal is picking a color by number",
    "tip": "💡ネイティブ代替：Dynamic Material（色は #AARRGGBB や @マクロ@）でチーム別の色を出せる。 要は『名前判定（0/1）→ 重み付けして足す（インデックス化）→ Input Selector で色選択』。String Compare の Equal は数値なので Multiply/Add で index に変換できる、これが多チーム対応の肝。英語名 Team Material Color Selector。 グラフ/図形を面ごとに塗り分けたい時は、出口を Layer1.Colors.Diffuse の代わりに Faces.Face.Material にするだけ（ロジックは同じ）。",
    "tip_en": "💡Native alt: Dynamic Material (#AARRGGBB or @macro@) can set per-team color natively. At heart: name-judge (0/1) → weight and sum (make an index) → Input Selector picks the color. String Compare's Equal is numeric, so Multiply/Add can build the index — that's the key to handling many teams. Named Team Material Color Selector. To color a graph/shape per face, just target Faces.Face.Material instead of Layer1.Colors.Diffuse (same logic)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Input Selector の Output を PICK_BG の Layer1.Colors.Diffuse へ接続 → チーム名に対応する色が出る（4チーム以上は Compare＋Multiply(×4…) と Color スロットを足すだけ）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect Input Selector's Output to PICK_BG's Layer1.Colors.Diffuse → the color for that team shows (add Compare+Multiply(×4…) and a Color slot for more teams)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-14-control-bar-width-by",
  "title": "VL 14｜得点比率でバーの幅を制御する（Home Score Ratio Width）",
  "title_en": "VL 14 | Control bar width by score ratio (Home Score Ratio Width)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "選ばれた比率を Multiply で Value 1500 倍してバーの実寸に拡大し、HOME_BAR の Width へ。【なぜ ×1500 か】0〜1の比率を実際のバー幅（ピクセル）に合わせる係数（0-0→0.5→750）。",
  "goal_en": "Multiply the chosen ratio by Value 1500 to reach the bar's real size, into HOME_BAR's Width. [Why ×1500] a factor mapping the 0–1 ratio to real bar width in pixels (0-0 → 0.5 → 750).",
  "overview": "流れ：HomeScore / AwayScore → Add/ Divide → Equal To → Input Selector → Value 0.5 / Value 1500 / Multiply → HOME_BAR の Width",
  "overview_en": "Flow: HomeScore / AwayScore → Add/ Divide → Equal To → Input Selector → Value 0.5 / Value 1500 / Multiply → HOME_BAR の Width",
  "svg": "<svg viewBox=\"0 0 1278 272\" width=\"1278\" height=\"272\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv14j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,138 224,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M158,87 C191,87 191,152 224,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M158,29 C303,29 303,102 448,102\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M382,138 C415,138 415,116 448,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M382,138 C415,138 415,174 448,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M158,145 C303,145 303,188 448,188\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M606,174 C639,174 639,124 672,124\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M606,102 C639,102 639,138 672,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M158,203 C415,203 415,152 672,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M158,261 C527,261 527,138 896,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M830,124 C863,124 863,152 896,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><path d=\"M1054,138 C1087,138 1087,145 1120,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HomeScore .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AwayScore .Text</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"109\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,127 L224.5,114 Q224.5,109.5 229,109.5 L377,109.5 Q381.5,109.5 381.5,114 L381.5,127 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"122\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add</text><circle cx=\"224\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"382\" cy=\"138\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"73\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,91 L448.5,78 Q448.5,73.5 453,73.5 L601,73.5 Q605.5,73.5 605.5,78 L605.5,91 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"86\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Divide</text><circle cx=\"448\" cy=\"102\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Divisor</text><circle cx=\"606\" cy=\"102\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"145\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,163 L448.5,150 Q448.5,145.5 453,145.5 L601,145.5 Q605.5,145.5 605.5,150 L605.5,163 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Equal To</text><circle cx=\"448\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"188\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">==</text><circle cx=\"606\" cy=\"174\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"95\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,113 L672.5,100 Q672.5,95.5 677,95.5 L825,95.5 Q829.5,95.5 829.5,100 L829.5,113 Z\" fill=\"#FF8C00\"/><text x=\"680\" y=\"108\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"672\" cy=\"124\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"672\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"672\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"672\" cy=\"166\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"169\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"830\" cy=\"124\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0.5</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1500</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"109\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,127 L896.5,114 Q896.5,109.5 901,109.5 L1049,109.5 Q1053.5,109.5 1053.5,114 L1053.5,127 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"122\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"896\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"1054\" cy=\"138\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,134 L1120.5,121 Q1120.5,116.5 1125,116.5 L1273,116.5 Q1277.5,116.5 1277.5,121 L1277.5,134 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HOME_BAR .Width</text><circle cx=\"1120\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 14】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] HomeScore / AwayScore（Text）\n・[Math] Add（合計）/ Divide（Home÷合計＝比率）\n・[Logic] Equal To（合計==0 の判定）\n・[Selector] Input Selector（合計0なら0.5に逃がす）\n・[Math] Value 0.5 / Value 1500 / Multiply（×1500）\n・[Object] HOME_BAR の Width",
    "body_en": "[VL recipe 14]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] HomeScore / AwayScore（Text）\n・[Math] Add（total）/ Divide（Home÷total＝ratio）\n・[Logic] Equal To（total==0 のjudge）\n・[Selector] Input Selector（total0なら0.5に逃がす）\n・[Math] Value 0.5 / Value 1500 / Multiply（×1500）\n・[Object] HOME_BAR の Width",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Home + Away を Add で合計。【なぜ合計か】比率＝Home÷合計 を出すため、まず全体（分母）が要る\n・Home ÷ 合計 を Divide で計算し HOME の比率（0〜1）を出す。【なぜ Divide か】“全体に占める割合”を作るのが目的だから\n・【0除算対策】合計が0だと割り算が壊れるので、Equal To で『合計==0か』を判定し、Input Selector で [0]=Divide結果 か [1]=Value 0.5 を選ぶ。【なぜ Equal To＋Input Selector か】0の時だけ安全な既定値(0.5)へ逃がすため（試合前 0-0 でも半々表示になる）",
    "body_en": "・Add Home + Away for the total. [Why the total] the ratio = Home ÷ total, so you need the whole (denominator) first\n・Divide Home ÷ total for the HOME ratio (0–1). [Why Divide] to build 'share of the whole'\n・[Divide-by-zero guard] if total is 0 the division breaks, so judge 'total == 0' with Equal To and use Input Selector to pick [0]=Divide result or [1]=Value 0.5. [Why Equal To + Input Selector] to escape to a safe default (0.5) only when 0 (so pre-game 0-0 shows 50/50)",
    "tip": "必ず0除算対策を入れる（合計0→Equal To→Input Selectorで0.5）。入れないと 0-0 で幅が壊れる。係数(1500)はバーの実寸に合わせる。英語名 Home Score Ratio Width。",
    "tip_en": "Always add a divide-by-zero guard (total 0 → Equal To → Input Selector → 0.5). Without it 0-0 breaks the width. Tune the factor (1500) to the bar's size. Named Home Score Ratio Width."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 選ばれた比率を Multiply で Value 1500 倍してバーの実寸に拡大し、HOME_BAR の Width へ。【なぜ ×1500 か】0〜1の比率を実際のバー幅（ピクセル）に合わせる係数（0-0→0.5→750）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Multiply the chosen ratio by Value 1500 to reach the bar's real size, into HOME_BAR's Width. [Why ×1500] a factor mapping the 0–1 ratio to real bar width in pixels (0-0 → 0.5 → 750)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 1278 272\" width=\"1278\" height=\"272\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv14e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,138 224,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M158,87 C191,87 191,152 224,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M158,29 C303,29 303,102 448,102\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M382,138 C415,138 415,116 448,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M382,138 C415,138 415,174 448,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M158,145 C303,145 303,188 448,188\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M606,174 C639,174 639,124 672,124\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M606,102 C639,102 639,138 672,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M158,203 C415,203 415,152 672,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M158,261 C527,261 527,138 896,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M830,124 C863,124 863,152 896,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><path d=\"M1054,138 C1087,138 1087,145 1120,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv14e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HomeScore .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AwayScore .Text</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"109\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,127 L224.5,114 Q224.5,109.5 229,109.5 L377,109.5 Q381.5,109.5 381.5,114 L381.5,127 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"122\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add total</text><circle cx=\"224\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"382\" cy=\"138\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"73\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,91 L448.5,78 Q448.5,73.5 453,73.5 L601,73.5 Q605.5,73.5 605.5,78 L605.5,91 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"86\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Divide ratio</text><circle cx=\"448\" cy=\"102\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Divisor</text><circle cx=\"606\" cy=\"102\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"105\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"145\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,163 L448.5,150 Q448.5,145.5 453,145.5 L601,145.5 Q605.5,145.5 605.5,150 L605.5,163 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Equal To</text><circle cx=\"448\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"188\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">==</text><circle cx=\"606\" cy=\"174\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"95\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,113 L672.5,100 Q672.5,95.5 677,95.5 L825,95.5 Q829.5,95.5 829.5,100 L829.5,113 Z\" fill=\"#FF8C00\"/><text x=\"680\" y=\"108\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"672\" cy=\"124\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"672\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"672\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"672\" cy=\"166\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"169\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"830\" cy=\"124\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0.5</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1500</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"109\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,127 L896.5,114 Q896.5,109.5 901,109.5 L1049,109.5 Q1053.5,109.5 1053.5,114 L1053.5,127 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"122\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"896\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"1054\" cy=\"138\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,134 L1120.5,121 Q1120.5,116.5 1125,116.5 L1273,116.5 Q1277.5,116.5 1277.5,121 L1277.5,134 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HOME_BAR .Width</text><circle cx=\"1120\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-15-switch-game-clock-format",
  "title": "VL 15｜ゲームクロックを残り時間で表示形式切替（NN:SS ⇄ SS.ZZZ）",
  "title_en": "VL 15 | Switch game-clock format by remaining time (NN:SS ⇄ SS.ZZZ)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "Input Selector の Output を表示用 Time_Display へ。1分以上は NN:SS、1分未満は SS.ZZZ に自動で切り替わる。",
  "goal_en": "Connect Input Selector's Output to Time_Display. ≥1 min shows NN:SS, <1 min shows SS.ZZZ automatically.",
  "overview": "流れ：Timer_DB → Left String(2)＝先頭2桁 / Left String(5)＝NN:SS / Right String(6)＝SS.ZZZ → String Value(00) / String Compare → Input Selector → Time_Display",
  "overview_en": "Flow: Timer_DB → Left String(2)＝先頭2digits / Left String(5)＝NN:SS / Right String(6)＝SS.ZZZ → String Value(00) / String Compare → Input Selector → Time_Display",
  "svg": "<svg viewBox=\"0 0 1054 198\" width=\"1054\" height=\"198\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv15j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,65 C191,65 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M382,29 C415,29 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M158,151 C303,151 303,101 448,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M606,87 C639,87 639,87 672,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M158,79 C191,79 191,101 224,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M382,101 C527,101 527,101 672,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M158,79 C191,79 191,173 224,173\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M382,173 C527,173 527,115 672,115\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><path d=\"M830,87 C863,87 863,108 896,108\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv15j)\"/><rect x=\"0\" y=\"36\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,54 L0.5,41 Q0.5,36.5 5,36.5 L153,36.5 Q157.5,36.5 157.5,41 L157.5,54 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"49\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Timer_DB .Text</text><circle cx=\"0\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"68\" font-size=\"9\" fill=\"#20242c\">Start</text><circle cx=\"0\" cy=\"79\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"82\" font-size=\"9\" fill=\"#20242c\">Stop</text><circle cx=\"0\" cy=\"93\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"96\" font-size=\"9\" fill=\"#20242c\">Reset</text><circle cx=\"158\" cy=\"65\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"79\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"82\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">OnTimer</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String 2</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"43\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"46\" font-size=\"9\" fill=\"#20242c\">Length</text><circle cx=\"382\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"122\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,140 L0.5,127 Q0.5,122.5 5,122.5 L153,122.5 Q157.5,122.5 157.5,127 L157.5,140 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"135\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 00</text><circle cx=\"158\" cy=\"151\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"154\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"448\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"606\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"606\" cy=\"101\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"104\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"606\" cy=\"115\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"118\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"606\" cy=\"129\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"132\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"672\" y=\"58\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,76 L672.5,63 Q672.5,58.5 677,58.5 L825,58.5 Q829.5,58.5 829.5,63 L829.5,76 Z\" fill=\"#FF8C00\"/><text x=\"680\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"672\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"672\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"672\" cy=\"115\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"118\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"672\" cy=\"129\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"132\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"830\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"224\" y=\"72\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,90 L224.5,77 Q224.5,72.5 229,72.5 L377,72.5 Q381.5,72.5 381.5,77 L381.5,90 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String 5</text><circle cx=\"224\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"115\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"118\" font-size=\"9\" fill=\"#20242c\">Length</text><circle cx=\"382\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"144\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,162 L224.5,149 Q224.5,144.5 229,144.5 L377,144.5 Q381.5,144.5 381.5,149 L381.5,162 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"157\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Right String 6</text><circle cx=\"224\" cy=\"173\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"176\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"187\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"190\" font-size=\"9\" fill=\"#20242c\">Length</text><circle cx=\"382\" cy=\"173\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"176\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"79\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,97 L896.5,84 Q896.5,79.5 901,79.5 L1049,79.5 Q1053.5,79.5 1053.5,84 L1053.5,97 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"92\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Time_Display .Text</text><circle cx=\"896\" cy=\"108\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"111\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 15】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] Timer_DB（非表示・生データ NN:SS.ZZZ）\n・[Strings] Left String(2)＝先頭2桁 / Left String(5)＝NN:SS / Right String(6)＝SS.ZZZ\n・[Strings] String Value(00) / String Compare（分が00か）\n・[Selector] Input Selector（[0]通常 / [1]1分未満）\n・[Object] Time_Display（表示用）",
    "body_en": "[VL recipe 15]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] Timer_DB（非表示・生データ NN:SS.ZZZ）\n・[Strings] Left String(2)＝先頭2digits / Left String(5)＝NN:SS / Right String(6)＝SS.ZZZ\n・[Strings] String Value(00) / String Compare（分が00か）\n・[Selector] Input Selector（[0]normal / [1]1分未満）\n・[Object] Time_Display（表示用）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Timer Widget の Format を NN:SS.ZZZ にして Timer_DB（非表示・生データ）で受ける\n・【判定】Timer_DB の先頭2文字を Left String(2) で取り、String Compare で 00 と比較。【なぜ先頭2桁を見るか】“分が00＝1分未満か”を判定するため。Equal を Input Selector の Index へ（00以外=0 / 00=1）\n・【通常表示】Left String(5) で NN:SS を作り Input Selector の [0] へ。【なぜ Left String か】左5文字＝分:秒だけ取り出すから\n・【1分未満】Right String(6) で SS.ZZZ（秒.ミリ）を作り [1] へ。【なぜ Right String か】右6文字＝秒以下を取り出すから",
    "body_en": "・Set the Timer Widget Format to NN:SS.ZZZ and receive it in Timer_DB (hidden raw)\n・[Judge] take the first 2 chars with Left String(2) and compare to 00 with String Compare. [Why the first 2 digits] to judge 'minutes = 00 = under a minute'. Equal → Input Selector's Index (not 00 = 0 / 00 = 1)\n・[Normal] build NN:SS with Left String(5) → Input Selector [0]. [Why Left String] left 5 chars = minutes:seconds\n・[Under a minute] build SS.ZZZ with Right String(6) → [1]. [Why Right String] right 6 chars = seconds and below",
    "tip": "元Timer文字列が必ず NN:SS.ZZZ 形式である前提（分が2桁でないと桁がずれ判定が崩れる）。加工用の Timer_DB（非表示）と表示用 Time_Display の2枚構成。先頭2桁で“分が00か”を見るのがフォーマット切替の肝。",
    "tip_en": "Assumes the raw Timer string is always NN:SS.ZZZ (breaks if minutes aren't 2 digits). Use a hidden Timer_DB and a Time_Display. Checking the first 2 digits for 'minutes 00' is the crux of the format switch."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Input Selector の Output を表示用 Time_Display へ。1分以上は NN:SS、1分未満は SS.ZZZ に自動で切り替わる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect Input Selector's Output to Time_Display. ≥1 min shows NN:SS, <1 min shows SS.ZZZ automatically\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-16-show-something-when-text",
  "title": "VL 16｜テキストが特定の語（例 BONUS）と一致したら対応表示を出す",
  "title_en": "VL 16 | Show something when text equals a specific word (e.g. BONUS)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "テキストが BONUS と一致した時だけ（Equal=1）対象が表示される。Home/Away を対で組めば相互のボーナス表示になる。",
  "goal_en": "The target shows only when the text equals BONUS (Equal=1). Pair Home/Away for a mutual bonus indicator.",
  "overview": "流れ：判定テキスト → String Value → String Compare → Add → 対象の Visible",
  "overview_en": "Flow: judgeテキスト → String Value → String Compare → Add → targetの Visible",
  "svg": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv16j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,37 224,37\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16j)\"/><path d=\"M158,87 C191,87 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16j)\"/><path d=\"M382,37 C415,37 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16j)\"/><path d=\"M606,51 C639,51 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BONUS .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value BONUS</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"8\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,26 L224.5,13 Q224.5,8.5 229,8.5 L377,8.5 Q381.5,8.5 381.5,13 L381.5,26 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"21\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"37\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"37\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"51\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"54\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"65\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"79\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"82\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add（中継）</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"68\" font-size=\"9\" fill=\"#20242c\">+</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BONUS .Visible</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 16】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 判定テキスト（例 BONUS の Text）\n・[Strings] String Value（比較する語 例 BONUS）\n・[Strings] String Compare\n・[Math] Add（Equal を素通しで中継。+ は 0）\n・[Object] 対象の Visible（例 BONUS）",
    "body_en": "[VL recipe 16]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] judgeテキスト（例 BONUS の Text）\n・[Strings] String Value（比較する語 例 BONUS）\n・[Strings] String Compare\n・[Math] Add（Equal を素通しでrelay。+ は 0）\n・[Object] targetの Visible（例 BONUS）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・判定テキスト（BONUS）を String Compare の String1、比較する語の String Value（例 BONUS）を String2 に接続。【なぜ String Compare か】“その語と一致するか”を 0/1 で判定するため\n・String Compare の Equal を Add の Base に接続（+ は 0）。【なぜ Add を挟むか】Equal（0/1）を Visible へ渡すための“素通しの中継”。Add(Base＋0) は値をそのまま通すので、判定結果を Visible へ橋渡しできる\n・Add の Out を対象の Visible へ接続",
    "body_en": "・Feed the text (BONUS) into String Compare's String1 and the word to match (String Value, e.g. BONUS) into String2. [Why String Compare] to judge 'does it equal this word' as 0/1\n・Connect String Compare's Equal to Add's Base (+ is 0). [Why Add] a pass-through relay to feed Equal (0/1) into Visible — Add(Base+0) passes the value unchanged, bridging the result to Visible\n・Connect Add's Out to the target's Visible",
    "tip": "【なぜ Add 中継か】String Compare の Equal を直接つなげない配線でも、Add(＋0) の素通しで Visible に渡せる、という実機の橋渡しテク。逆に“隠したい”なら Add の代わりに Not で反転する（表示/非表示の作り分け）。",
    "tip_en": "[Why the Add relay] even where you can't wire Equal straight in, Add(+0) passes it through to Visible — a real bridging trick. To hide instead, use Not (invert) in place of Add."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ テキストが BONUS と一致した時だけ（Equal=1）対象が表示される。Home/Away を対で組めば相互のボーナス表示になる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ The target shows only when the text equals BONUS (Equal=1). Pair Home/Away for a mutual bonus indicator\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv16e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,37 224,37\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16e)\"/><path d=\"M158,87 C191,87 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16e)\"/><path d=\"M382,37 C415,37 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16e)\"/><path d=\"M606,51 C639,51 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv16e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BONUS .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value BONUS</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"8\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,26 L224.5,13 Q224.5,8.5 229,8.5 L377,8.5 Q381.5,8.5 381.5,13 L381.5,26 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"21\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"37\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"37\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"51\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"54\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"65\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"79\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"82\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add (relay)</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"68\" font-size=\"9\" fill=\"#20242c\">+</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BONUS .Visible</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-17-distribute-a-team-color",
  "title": "VL 17｜チームカラーを1つの色源から素材・フレア・数値表示へ一斉分配する",
  "title_en": "VL 17 | Distribute a team color from one source to materials, flares and readouts",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "色を変えたい時は IntColor だけ変える → ライト・素材・発光・文字がすべて同じ色に追従する。",
  "goal_en": "To recolor, change only the IntColor → light, material, glow and text all follow.",
  "overview": "流れ：R / G / B / alpha の各 Text → IntColor → SpotLight1 の Diffuse → DTC_BG の Diffuse / DTC_emissive の Emissive → DTC_Font の Diffuse・Emissive",
  "overview_en": "Flow: R / G / B / alpha の各 Text → IntColor → SpotLight1 の Diffuse → DTC_BG の Diffuse / DTC_emissive の Emissive → DTC_Font の Diffuse・Emissive",
  "svg": "<svg viewBox=\"0 0 606 272\" width=\"606\" height=\"272\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv17j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,58 C191,58 191,124 224,124\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M158,116 C191,116 191,138 224,138\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M158,174 C191,174 191,152 224,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M158,232 C191,232 191,166 224,166\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M382,124 C415,124 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M382,124 C415,124 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M382,124 C415,124 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M382,124 C415,124 415,203 448,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><path d=\"M382,124 C415,124 415,261 448,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv17j)\"/><rect x=\"0\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,47 L0.5,34 Q0.5,29.5 5,29.5 L153,29.5 Q157.5,29.5 157.5,34 L157.5,47 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">R .Text</text><circle cx=\"158\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,105 L0.5,92 Q0.5,87.5 5,87.5 L153,87.5 Q157.5,87.5 157.5,92 L157.5,105 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">G .Text</text><circle cx=\"158\" cy=\"116\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"145\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,163 L0.5,150 Q0.5,145.5 5,145.5 L153,145.5 Q157.5,145.5 157.5,150 L157.5,163 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">B .Text</text><circle cx=\"158\" cy=\"174\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"203\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,221 L0.5,208 Q0.5,203.5 5,203.5 L153,203.5 Q157.5,203.5 157.5,208 L157.5,221 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"216\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">alpha .Text</text><circle cx=\"158\" cy=\"232\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"235\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"95\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,113 L224.5,100 Q224.5,95.5 229,95.5 L377,95.5 Q381.5,95.5 381.5,100 L381.5,113 Z\" fill=\"#DF4141\"/><text x=\"232\" y=\"108\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">IntColor</text><circle cx=\"224\" cy=\"124\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Red</text><circle cx=\"224\" cy=\"138\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"141\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Green</text><circle cx=\"224\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Blue</text><circle cx=\"224\" cy=\"166\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"169\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Alpha</text><circle cx=\"382\" cy=\"124\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Color</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">SpotLight1 .Diffuse</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DTC_BG .Diffuse</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DTC_emissive .Emissive</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,192 L448.5,179 Q448.5,174.5 453,174.5 L601,174.5 Q605.5,174.5 605.5,179 L605.5,192 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DTC_Font .Diffuse</text><circle cx=\"448\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,250 L448.5,237 Q448.5,232.5 453,232.5 L601,232.5 Q605.5,232.5 605.5,237 L605.5,250 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DTC_Font .Emissive</text><circle cx=\"448\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 17】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] R / G / B / alpha の各 Text（例 100/255/50/100）\n・[Colors] IntColor（1つの色源）\n・[Object] SpotLight1 の Diffuse（ライトの照明色）\n・[Object] DTC_BG の Diffuse / DTC_emissive の Emissive（素材）\n・[Object] DTC_Font の Diffuse・Emissive（文字）",
    "body_en": "[VL recipe 17]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] R / G / B / alpha の各 Text（例 100/255/50/100）\n・[Colors] IntColor（1つの色源）\n・[Object] SpotLight1 の Diffuse（ライトの照明色）\n・[Object] DTC_BG の Diffuse / DTC_emissive の Emissive（素材）\n・[Object] DTC_Font の Diffuse・Emissive（文字）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・R/G/B/alpha のテキスト（例 100/255/50/100）を IntColor に入れて1つの色（Color）を作る。【なぜ1つの色源にまとめるか】“大もとの色”を1個だけにして、そこから配れば全部が必ず同じ色になるから（バラつき防止）\n・IntColor の Color 出力を複数の対象へ分岐接続。【なぜ分岐（1出力→多入力）か】同じ値を共有＝1か所直せば全部連動するため。対象例：SpotLight1 の Diffuse（ライト）、DTC_BG の Diffuse（背景素材）、DTC_emissive の Emissive（発光）、DTC_Font の Diffuse/Emissive（文字）",
    "body_en": "・Feed R/G/B/alpha texts (e.g. 100/255/50/100) into IntColor to make one color. [Why one source] keep the 'master color' single, so everything fed from it is guaranteed to match (no drift)\n・Branch IntColor's Color output to many targets. [Why fan-out] sharing one value means one change updates everything: SpotLight1 Diffuse (light), DTC_BG Diffuse (background), DTC_emissive Emissive (glow), DTC_Font Diffuse/Emissive (text)",
    "tip": "🔗ネイティブ併用：DataLinq でチーム色を1つの IntColor に入れ、VL で素材/フレア/ライト/数値表示へ一斉分配。多対象・多用途はVLが有利、単純な素材色だけなら Dynamic Material 単体でも可。 要は『1つの色源を多数の対象へ一斉に配る（データ共有）』。Diffuse＝面の色、Emissive＝発光、ライトの Diffuse＝照明色、と役割は違っても“同じ1色”で統一できる。色は IntColor 1か所で管理。実運用ではこの IntColor の R/G/B に DataLinq を入れて自動化することも多い。",
    "tip_en": "🔗Hybrid: feed the team color from DataLinq into one IntColor, then VL fans it out to materials/flares/light/readouts. VL wins for many diverse targets; a single material color can be Dynamic Material alone. At heart: distribute one color source to many targets (data sharing). Diffuse = surface color, Emissive = glow, a light's Diffuse = lighting color — different roles, one unified color. Manage color in the single IntColor. In practice the IntColor's R/G/B is often DataLinq-driven for automation."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 色を変えたい時は IntColor だけ変える → ライト・素材・発光・文字がすべて同じ色に追従する\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ To recolor, change only the IntColor → light, material, glow and text all follow\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-18-hide-an-element-automatically",
  "title": "VL 18｜データが空（\"-\"）のときだけ要素を自動で隠す",
  "title_en": "VL 18 | Hide an element automatically when data is empty ('-')",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "Not の出力を対象グループの Visible（例 GR_BONUS .Visible）へ接続 → \"-\"（空）なら非表示、値があれば表示。",
  "goal_en": "Connect Not's output to the group's Visible (e.g. GR_BONUS .Visible) → '-' (empty) hides, a value shows.",
  "overview": "流れ：判定元テキスト → String Value → String Compare → Not → 対象グループの Visible",
  "overview_en": "Flow: judgesource text → String Value → String Compare → Not → targetグループの Visible",
  "svg": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv18j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,37 224,37\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv18j)\"/><path d=\"M158,87 C191,87 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv18j)\"/><path d=\"M382,37 C415,37 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv18j)\"/><path d=\"M606,58 C639,58 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv18j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BONUS .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value -</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"8\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,26 L224.5,13 Q224.5,8.5 229,8.5 L377,8.5 Q381.5,8.5 381.5,13 L381.5,26 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"21\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"37\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"37\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"51\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"54\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"65\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"79\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"82\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"606\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">GR_BONUS .Visible</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 18】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 判定元テキスト（例 BONUS .Text）→ String1\n・[Strings] String Value（空の印。実データに合わせる 例 \"-\"）→ String2\n・[Strings] String Compare（Equal を使う）\n・[Logic] Not（結果を反転）\n・[Object] 対象グループの Visible（例 GR_BONUS .Visible）",
    "body_en": "[VL recipe 18]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] judgesource text（例 BONUS .Text）→ String1\n・[Strings] String Value（emptyの印。実データに合わせる 例 \"-\"）→ String2\n・[Strings] String Compare（Equal を使う）\n・[Logic] Not（結果を反転）\n・[Object] targetグループの Visible（例 GR_BONUS .Visible）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・判定したいテキスト（例 BONUS .Text）を String Compare の String1 に入力\n・String Value に“空を表す値”（実データに合わせる。例 \"-\"）を入れて String2 に接続\n・String Compare の Equal 出力を Not で反転する（Equal=1＝空の印と一致＝隠したい状態、なので反転が必要）",
    "body_en": "・Feed the text to judge (e.g. BONUS .Text) into String Compare's String1\n・Put the 'empty marker' (match your data, e.g. '-') in String Value and connect to String2\n・Invert String Compare's Equal output with Not (Equal=1 means it matched the empty marker = the hide state, so it must be flipped)",
    "tip": "【使いどころ】データ側が“空”を空文字ではなく - / N/A / 0 などのプレースホルダで送ってくる時に、その行だけ自動で隠す用途。スポーツのスコア/スタッツ系 DataLinq やフィードで多い（ボーナス・順位・残り時間・選手の付加情報など）。 【IsEmpty版との違い】本当に空文字（\"\"）なら IsEmpty→Not→Visible の方が簡単（String Compare も String Value も不要）。中身が - など何か入っている“見た目上の空”は IsEmpty では空と判定されないので、String Compare で - と一致するかを見る必要がある。 【Notが要る理由】Equal は“空の印と一致＝隠したい状態”で 1 になり、Visible（1＝表示）と逆。Not で反転する。String Value に入れる空の印は実データの表現に合わせる。",
    "tip_en": "[When to use] When the data source sends '-', 'N/A', '0' etc. as a placeholder for empty instead of a blank — common in sports score/stats DataLinq feeds (bonus, standings, remaining time, player extras). Hide just those rows automatically. [vs IsEmpty] If the field is truly empty (''), IsEmpty→Not→Visible is simpler (no String Compare / String Value). A '-' placeholder isn't seen as empty by IsEmpty, so you must String Compare against '-'. [Why Not] Equal is 1 when it matches the empty marker (= the hide state), the opposite of Visible (1 = show), so invert with Not. Match the empty marker in String Value to your real data."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Not の出力を対象グループの Visible（例 GR_BONUS .Visible）へ接続 → \"-\"（空）なら非表示、値があれば表示\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect Not's output to the group's Visible (e.g. GR_BONUS .Visible) → '-' (empty) hides, a value shows\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-19-auto-adjust-the-title",
  "title": "VL 19｜サブタイトルの有無でタイトルの位置を自動調整する",
  "title_en": "VL 19 | Auto-adjust the title position based on whether a subtitle exists",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "選ばれた値を TITLE の Position.Y へ接続してタイトルを上下に寄せる。",
  "goal_en": "Connect the chosen value to TITLE's Position.Y to move the title up/down.",
  "overview": "流れ：SUBTITLE の IsEmpty → Input Selector → Value/ Value＝2つのY位置 → TITLE の Position.Y",
  "overview_en": "Flow: SUBTITLE の IsEmpty → Input Selector → Value/ Value＝2つのYpos → TITLE の Position.Y",
  "svg": "<svg viewBox=\"0 0 606 156\" width=\"606\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv19j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,66 224,66\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv19j)\"/><path d=\"M158,87 C191,87 191,80 224,80\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv19j)\"/><path d=\"M158,145 C191,145 191,94 224,94\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv19j)\"/><path d=\"M382,66 C415,66 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv19j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">SUBTITLE .IsEmpty</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"37\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,55 L224.5,42 Q224.5,37.5 229,37.5 L377,37.5 Q381.5,37.5 381.5,42 L381.5,55 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"50\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"224\" cy=\"66\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"224\" cy=\"80\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"83\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"224\" cy=\"94\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"97\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"224\" cy=\"108\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"111\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"382\" cy=\"66\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 560</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 409</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">TITLE .Position.Y</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 19】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] SUBTITLE の IsEmpty（空かどうか 0/1）\n・[Selector] Input Selector\n・[Math] Value（560）/ Value（409）＝2つのY位置\n・[Object] TITLE の Position.Y",
    "body_en": "[VL recipe 19]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] SUBTITLE の IsEmpty（emptyかどうか 0/1）\n・[Selector] Input Selector\n・[Math] Value（560）/ Value（409）＝2つのYpos\n・[Object] TITLE の Position.Y",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・SUBTITLE の IsEmpty を Input Selector のインデックスに接続\n・Input Selector に2つの Value（例 Y=560 と 409）を用意\n・サブタイトルが空か否かで、対応する Y 位置が選ばれる",
    "body_en": "・Connect SUBTITLE's IsEmpty to Input Selector's index\n・Prepare two Values (e.g. Y = 560 and 409) in Input Selector\n・Depending on whether the subtitle is empty, the matching Y is chosen",
    "tip": "IsEmpty は『そのオブジェクトが空か』を 0/1 で返す。1行/2行レイアウトの出し分けに最適。",
    "tip_en": "IsEmpty returns 0/1 for 'is this object empty'. Ideal for 1-line vs 2-line layouts."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 選ばれた値を TITLE の Position.Y へ接続してタイトルを上下に寄せる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect the chosen value to TITLE's Position.Y to move the title up/down\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-20-hide-the-whole-headline",
  "title": "VL 20｜テキストが空なら見出しグループごと隠す",
  "title_en": "VL 20 | Hide the whole headline group when the text is empty",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "見出しが空なら IsEmpty=1 → Not で 0 になりグループごと非表示、値があれば表示。",
  "goal_en": "Empty headline → IsEmpty=1 → Not makes 0 → group hidden; otherwise shown.",
  "overview": "流れ：見出しテキストの IsEmpty → Not → 見出しグループの Visible",
  "overview_en": "Flow: 見出しテキストの IsEmpty → Not → 見出しグループの Visible",
  "svg": "<svg viewBox=\"0 0 606 44\" width=\"606\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv20j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv20j)\"/><path d=\"M382,31 C415,31 415,31 448,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv20j)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HEADLINE .IsEmpty</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,20 L448.5,7 Q448.5,2.5 453,2.5 L601,2.5 Q605.5,2.5 605.5,7 L605.5,20 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HEADLINE GRP .Visible</text><circle cx=\"448\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 20】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 見出しテキストの IsEmpty\n・[Logic] Not\n・[Object] 見出しグループの Visible",
    "body_en": "[VL recipe 20]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] 見出しテキストの IsEmpty\n・[Logic] Not\n・[Object] 見出しグループの Visible",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・見出しテキストオブジェクトの IsEmpty を Not に入力\n・Not の出力を見出しグループの Visible へ接続",
    "body_en": "・Feed the headline text's IsEmpty into Not\n・Connect Not's output to the headline group's Visible",
    "tip": "最頻出パターン（全プロジェクトで多数）。IsEmpty→Not→Visible が『データがある時だけ出す』の基本形。■実機確認済み（検証値）：Headline.IsEmpty→Not.In→GR_Headline.Visible。文字あり→IsEmpty=0→Not=1→表示、空→IsEmpty=1→Not=0→非表示。",
    "tip_en": "The most common pattern (used across all projects). IsEmpty→Not→Visible is the basic 'show only when data exists'."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 見出しが空なら IsEmpty=1 → Not で 0 になりグループごと非表示、値があれば表示\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Empty headline → IsEmpty=1 → Not makes 0 → group hidden; otherwise shown\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-21-switch-between-two-designs",
  "title": "VL 21｜フラグ文字列で2デザイン（通常/速報など）を切り替える",
  "title_en": "VL 21 | Switch between two designs (normal / breaking) via a flag string",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "1つのフラグで2系統の背景/スラントを排他表示できる。",
  "goal_en": "One flag exclusively shows one of two background/slant sets.",
  "overview": "流れ：フラグ用テキスト → String Value → String Compare → Not → 通常デザイン群 / 速報デザイン群の Visible",
  "overview_en": "Flow: flagテキスト → String Value → String Compare → Not → normalデザインset / breaking setの Visible",
  "svg": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv21j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,37 224,37\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21j)\"/><path d=\"M158,87 C191,87 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21j)\"/><path d=\"M382,37 C415,37 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21j)\"/><path d=\"M382,37 C415,37 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21j)\"/><path d=\"M606,29 C639,29 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">THEME flag .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"8\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,26 L224.5,13 Q224.5,8.5 229,8.5 L377,8.5 Q381.5,8.5 381.5,13 L381.5,26 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"21\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"37\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"37\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"51\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"54\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"65\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"79\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"82\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"606\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BREAKING群 .Visible</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">通常群 .Visible</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 21】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] フラグ用テキスト（例 THEME SELECT）\n・[Strings] String Value（一致させる値）\n・[Strings] String Compare\n・[Logic] Not\n・[Object] 通常デザイン群 / 速報デザイン群の Visible",
    "body_en": "[VL recipe 21]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] flagテキスト（例 THEME SELECT）\n・[Strings] String Value（一致させるValue）\n・[Strings] String Compare\n・[Logic] Not\n・[Object] normalデザインset / breaking setの Visible",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・フラグ用テキストを String Compare に入力し、String Value（例 1）と一致するか比較\n・一致結果を速報デザインの各オブジェクトの Visible へ接続（一致で表示）\n・同じ結果を Not で反転し、通常デザインの Visible へ接続（不一致で表示）",
    "body_en": "・Feed the flag text into String Compare and test if it matches a String Value (e.g. 1)\n・Connect the match result to each breaking-design object's Visible (shown on match)\n・Invert the same result with Not and connect to the normal-design Visible",
    "tip": "『通常⇔速報』のように排他で切り替える定番。Not で片方を自動的に逆へ回すのがコツ。■実機確認済み（検証値）：フラグ=1 が String Value=1 と一致→Equal=1→BREAKING set.Visible=1（表示）、Not=0→NOMAL set.Visible=0（非表示）。Equal を速報側へ直結、Not 経由で通常側へ。",
    "tip_en": "Standard exclusive switch like normal⇔breaking. The trick is using Not to flip one side automatically."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 1つのフラグで2系統の背景/スラントを排他表示できる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ One flag exclusively shows one of two background/slant sets\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv21e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,37 224,37\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21e)\"/><path d=\"M158,87 C191,87 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21e)\"/><path d=\"M382,37 C415,37 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21e)\"/><path d=\"M382,37 C415,37 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21e)\"/><path d=\"M606,29 C639,29 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv21e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">THEME flag .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"8\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,26 L224.5,13 Q224.5,8.5 229,8.5 L377,8.5 Q381.5,8.5 381.5,13 L381.5,26 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"21\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"37\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"37\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"40\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"51\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"54\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"65\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"68\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"79\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"82\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"606\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BREAKING set .Visible</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Normal set .Visible</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-22-show-only-filled-bullet",
  "title": "VL 22｜箇条書きを、テキストが入っている行だけ表示する",
  "title_en": "VL 22 | Show only filled bullet lines AND auto-close their spacing (variable-length list)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "行数分だけ Not・Multiply(ゲート)・Add(累積) を並べる。",
  "goal_en": "Line up one Not, one gate Multiply, and one accumulate Add per line.",
  "overview": "流れ：各行テキストの IsEmpty → Not → 各行の BoundingBox.HeightScaled → Multiply → Add → Multiply -1",
  "overview_en": "Flow: 各行テキストの IsEmpty → Not → 各行の BoundingBox.HeightScaled → Multiply → Add → Multiply -1",
  "svg": "<svg viewBox=\"0 0 1502 300\" width=\"1502\" height=\"300\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv22j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,43 C191,43 191,101 224,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M382,101 C415,101 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M158,101 C191,101 191,159 224,159\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M382,159 C415,159 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M158,159 C191,159 191,217 224,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M382,217 C415,217 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M158,217 C303,217 303,203 448,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M382,101 C415,101 415,217 448,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M158,275 C303,275 303,275 448,275\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M382,159 C415,159 415,289 448,289\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M606,203 C639,203 639,152 672,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M830,152 C863,152 863,188 896,188\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M1054,188 C1087,188 1087,195 1120,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M830,152 C863,152 863,116 896,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M606,275 C751,275 751,130 896,130\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M1054,116 C1087,116 1087,123 1120,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><path d=\"M1278,123 C1311,123 1311,159 1344,159\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22j)\"/><rect x=\"0\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,32 L0.5,19 Q0.5,14.5 5,14.5 L153,14.5 Q157.5,14.5 157.5,19 L157.5,32 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line1 .IsEmpty</text><circle cx=\"158\" cy=\"43\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,90 L224.5,77 Q224.5,72.5 229,72.5 L377,72.5 Q381.5,72.5 381.5,77 L381.5,90 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group1 .Visible</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,90 L0.5,77 Q0.5,72.5 5,72.5 L153,72.5 Q157.5,72.5 157.5,77 L157.5,90 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line2 .IsEmpty</text><circle cx=\"158\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"130\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,148 L224.5,135 Q224.5,130.5 229,130.5 L377,130.5 Q381.5,130.5 381.5,135 L381.5,148 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"143\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"159\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"159\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group2 .Visible</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"130\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,148 L0.5,135 Q0.5,130.5 5,130.5 L153,130.5 Q157.5,130.5 157.5,135 L157.5,148 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"143\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line3 .IsEmpty</text><circle cx=\"158\" cy=\"159\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"188\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,206 L224.5,193 Q224.5,188.5 229,188.5 L377,188.5 Q381.5,188.5 381.5,193 L381.5,206 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"201\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"217\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group3 .Visible</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"188\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,206 L0.5,193 Q0.5,188.5 5,188.5 L153,188.5 Q157.5,188.5 157.5,193 L157.5,206 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"201\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line1 .BBox.HeightScaled</text><circle cx=\"158\" cy=\"217\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"174\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,192 L448.5,179 Q448.5,174.5 453,174.5 L601,174.5 Q605.5,174.5 605.5,179 L605.5,192 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply 高さ×可視</text><circle cx=\"448\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"606\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"246\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,264 L0.5,251 Q0.5,246.5 5,246.5 L153,246.5 Q157.5,246.5 157.5,251 L157.5,264 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"259\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line2 .BBox.HeightScaled</text><circle cx=\"158\" cy=\"275\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"246\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,264 L448.5,251 Q448.5,246.5 453,246.5 L601,246.5 Q605.5,246.5 605.5,251 L605.5,264 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"259\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply 高さ×可視</text><circle cx=\"448\" cy=\"275\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"289\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"292\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"606\" cy=\"275\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"123\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,141 L672.5,128 Q672.5,123.5 677,123.5 L825,123.5 Q829.5,123.5 829.5,128 L829.5,141 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"136\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add 累積</text><circle cx=\"672\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"166\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"169\" font-size=\"9\" fill=\"#20242c\">+</text><circle cx=\"830\" cy=\"152\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"87\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,105 L896.5,92 Q896.5,87.5 901,87.5 L1049,87.5 Q1053.5,87.5 1053.5,92 L1053.5,105 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add 累積</text><circle cx=\"896\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"130\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"133\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"1054\" cy=\"116\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"159\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,177 L896.5,164 Q896.5,159.5 901,159.5 L1049,159.5 Q1053.5,159.5 1053.5,164 L1053.5,177 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"172\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply -1</text><circle cx=\"896\" cy=\"188\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"202\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"205\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"1054\" cy=\"188\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"94\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,112 L1120.5,99 Q1120.5,94.5 1125,94.5 L1273,94.5 Q1277.5,94.5 1277.5,99 L1277.5,112 Z\" fill=\"#5ABFB0\"/><text x=\"1128\" y=\"107\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply -1</text><circle cx=\"1120\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"1120\" cy=\"137\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"1129\" y=\"140\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"1278\" cy=\"123\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1269\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"166\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,184 L1120.5,171 Q1120.5,166.5 1125,166.5 L1273,166.5 Q1277.5,166.5 1277.5,171 L1277.5,184 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"179\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group2 .Position.Y</text><circle cx=\"1120\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1344\" y=\"130\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1344.5,148 L1344.5,135 Q1344.5,130.5 1349,130.5 L1497,130.5 Q1501.5,130.5 1501.5,135 L1501.5,148 Z\" fill=\"#8a93a6\"/><text x=\"1352\" y=\"143\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group3 .Position.Y</text><circle cx=\"1344\" cy=\"159\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1353\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 22】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 各行テキストの IsEmpty\n・[Logic] Not（行ごとに1つ）→ 各行グループの Visible（可視0/1）\n・[Object] 各行の BoundingBox.HeightScaled\n・[Math] Multiply（有効高＝高さ × その行の可視フラグ）\n・[Math] Add（上から累積：前段＋有効高〔＋行間〕）\n・[Math] Multiply -1（下向きに変換）→ 各行グループの Position.Y（行1は固定Y0）",
    "body_en": "[VL recipe 22]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] 各行テキストの IsEmpty\n・[Logic] Not（行ごとに1つ）→ 各行グループの Visible（可視0/1）\n・[Object] 各行の BoundingBox.HeightScaled\n・[Math] Multiply（有効高＝高さ × その行の可視フラグ）\n・[Math] Add（上から累積：前stage＋有効高〔＋行間〕）\n・[Math] Multiply -1（下向きに変換）→ 各行グループの Position.Y（行1は固定Y0）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【表示】各行テキストの IsEmpty を、その行用の Not に入力し、出力を各行グループの Visible へ接続。空行は IsEmpty=1→Not=0 で隠す＝“入っている行だけ残す”\n・【有効高を作る】各行の BoundingBox.HeightScaled を Multiply の Base、その行の Not 出力（可視0/1）を Multiplier に接続。空行は 高さ×0＝0 になり詰めに寄与しない。★ここが肝：Multiplier に定数1を入れると空行で穴が残る\n・【累積する】Add で上から積み上げる。行k の位置量＝自分より上の行の『有効高（＋行間）』の合計。行2 の Add は Base＝行1の有効高、行3 の Add は Base＝行2までの累積・＋に行2の有効高…と数珠つなぎにする\n・【位置へ】各 Add の出力を Multiply -1 で符号反転し、その行グループの Position.Y へ接続。行1（先頭）は Position.Y を固定（Y0＝アンカー）にして何もつながない\n・空行は消え、残った行が実際の高さに合わせて上から詰まる（可変長の箇条書きが自動整列）。行間を空けたいなら各 Add の空き + に行間ぶんの Value（定数）を足す",
    "body_en": "・[Show] feed each line text's IsEmpty into that line's Not and connect the output to each line group's Visible. An empty line is IsEmpty=1→Not=0, hiding it — keeping only filled lines\n・[Make effective height] connect each line's BoundingBox.HeightScaled to Multiply's Base and that line's Not output (visible 0/1) to Multiplier. An empty line becomes height×0=0 and adds nothing to the stacking. ★The key: a constant 1 in Multiplier leaves a gap on empty lines\n・[Accumulate] add from the top with Add. Line k's offset = the sum of 'effective height (+gap)' of the lines above it. Line 2's Add Base = line 1's effective height; line 3's Add Base = the running total through line 2, with line 2's effective height on + — chained\n・[To position] invert each Add output with Multiply -1 and connect to that line group's Position.Y. Line 1 (top) keeps a fixed Position.Y (Y0 = anchor) with nothing connected\n・Empty lines disappear and the rest close up from the top by real height (a variable-length list auto-aligns). For spacing, add a gap Value into each Add's free +",
    "tip": "『入っている行だけ表示（IsEmpty→Not→Visible）』＋『各行の有効高で詰める（高さ×可視→Add累積→×-1→Position.Y）』を1本に統合。★肝は各行の高さに“その行の可視フラグ（Not出力0/1）”を Multiply で掛けること（Multiplier に定数1だと空行で穴が残る）。位置は必ずこの計算側で作る（Visible=0 は他の行を動かさない）。行1は Position.Y を固定してアンカーにする。■実機確認済み（3行・全埋まりで Group2=-168／Group3=-336、Line1 を空にすると Group2 が先頭・Group3 が1行下へ詰まる）。※Y軸の向きにより Multiply -1 の符号は逆のこともある→1行で向きを先に確認。単純な箇条書きなら、入っている行だけ Concatenate で改行連結して1つの Text に入れる方が堅い（詰め計算が不要）。項目のコード/素材を基準と照合して一致だけ出すスタッツ表は『件数で出し入れ＋位置』レシピ（String Compare 照合駆動）。",
    "tip_en": "Combines 'show filled lines only (IsEmpty→Not→Visible)' with 'close by effective height (height×visible→Add accumulate→×-1→Position.Y)'. ★The key is multiplying each line's height by that line's visible flag (Not output 0/1) — a constant 1 in Multiplier leaves gaps on empty lines. Always build position on the calc side (Visible=0 never moves other lines). Keep line 1's Position.Y fixed as the anchor. ■Verified on hardware (3 lines all filled → Group2=-168 / Group3=-336; empty Line1 → Group2 goes to the top and Group3 closes up one line). Note: the Multiply -1 sign may need flipping depending on the Y axis — check direction with one line first. For a simple bullet list, concatenating only the filled lines into one Text (with newlines) is more robust (no spacing math). For a stats table that shows only matching items, use the 'show/hide by count + position' recipe (String Compare match-driven)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 行数分だけ Not・Multiply(ゲート)・Add(累積) を並べる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Line up one Not, one gate Multiply, and one accumulate Add per line\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 1502 300\" width=\"1502\" height=\"300\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv22e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,43 C191,43 191,101 224,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M382,101 C415,101 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M158,101 C191,101 191,159 224,159\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M382,159 C415,159 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M158,159 C191,159 191,217 224,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M382,217 C415,217 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M158,217 C303,217 303,203 448,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M382,101 C415,101 415,217 448,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M158,275 C303,275 303,275 448,275\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M382,159 C415,159 415,289 448,289\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M606,203 C639,203 639,152 672,152\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M830,152 C863,152 863,188 896,188\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M1054,188 C1087,188 1087,195 1120,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M830,152 C863,152 863,116 896,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M606,275 C751,275 751,130 896,130\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M1054,116 C1087,116 1087,123 1120,123\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><path d=\"M1278,123 C1311,123 1311,159 1344,159\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv22e)\"/><rect x=\"0\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,32 L0.5,19 Q0.5,14.5 5,14.5 L153,14.5 Q157.5,14.5 157.5,19 L157.5,32 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line1 .IsEmpty</text><circle cx=\"158\" cy=\"43\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,90 L224.5,77 Q224.5,72.5 229,72.5 L377,72.5 Q381.5,72.5 381.5,77 L381.5,90 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group1 .Visible</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,90 L0.5,77 Q0.5,72.5 5,72.5 L153,72.5 Q157.5,72.5 157.5,77 L157.5,90 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line2 .IsEmpty</text><circle cx=\"158\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"130\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,148 L224.5,135 Q224.5,130.5 229,130.5 L377,130.5 Q381.5,130.5 381.5,135 L381.5,148 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"143\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"159\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"159\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group2 .Visible</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"130\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,148 L0.5,135 Q0.5,130.5 5,130.5 L153,130.5 Q157.5,130.5 157.5,135 L157.5,148 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"143\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line3 .IsEmpty</text><circle cx=\"158\" cy=\"159\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"188\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,206 L224.5,193 Q224.5,188.5 229,188.5 L377,188.5 Q381.5,188.5 381.5,193 L381.5,206 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"201\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"217\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group3 .Visible</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"188\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,206 L0.5,193 Q0.5,188.5 5,188.5 L153,188.5 Q157.5,188.5 157.5,193 L157.5,206 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"201\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line1 .BBox.HeightScaled</text><circle cx=\"158\" cy=\"217\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"174\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,192 L448.5,179 Q448.5,174.5 453,174.5 L601,174.5 Q605.5,174.5 605.5,179 L605.5,192 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply H×vis</text><circle cx=\"448\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"606\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"246\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,264 L0.5,251 Q0.5,246.5 5,246.5 L153,246.5 Q157.5,246.5 157.5,251 L157.5,264 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"259\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Line2 .BBox.HeightScaled</text><circle cx=\"158\" cy=\"275\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"246\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,264 L448.5,251 Q448.5,246.5 453,246.5 L601,246.5 Q605.5,246.5 605.5,251 L605.5,264 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"259\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply H×vis</text><circle cx=\"448\" cy=\"275\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"289\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"292\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"606\" cy=\"275\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"278\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"123\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,141 L672.5,128 Q672.5,123.5 677,123.5 L825,123.5 Q829.5,123.5 829.5,128 L829.5,141 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"136\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add accumulate</text><circle cx=\"672\" cy=\"152\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"166\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"169\" font-size=\"9\" fill=\"#20242c\">+</text><circle cx=\"830\" cy=\"152\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"155\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"87\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,105 L896.5,92 Q896.5,87.5 901,87.5 L1049,87.5 Q1053.5,87.5 1053.5,92 L1053.5,105 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add accumulate</text><circle cx=\"896\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"130\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"133\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"1054\" cy=\"116\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"159\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,177 L896.5,164 Q896.5,159.5 901,159.5 L1049,159.5 Q1053.5,159.5 1053.5,164 L1053.5,177 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"172\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply -1</text><circle cx=\"896\" cy=\"188\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"202\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"205\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"1054\" cy=\"188\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"94\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,112 L1120.5,99 Q1120.5,94.5 1125,94.5 L1273,94.5 Q1277.5,94.5 1277.5,99 L1277.5,112 Z\" fill=\"#5ABFB0\"/><text x=\"1128\" y=\"107\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply -1</text><circle cx=\"1120\" cy=\"123\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"1120\" cy=\"137\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"1129\" y=\"140\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"1278\" cy=\"123\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1269\" y=\"126\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"166\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,184 L1120.5,171 Q1120.5,166.5 1125,166.5 L1273,166.5 Q1277.5,166.5 1277.5,171 L1277.5,184 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"179\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group2 .Position.Y</text><circle cx=\"1120\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1344\" y=\"130\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1344.5,148 L1344.5,135 Q1344.5,130.5 1349,130.5 L1497,130.5 Q1501.5,130.5 1501.5,135 L1501.5,148 Z\" fill=\"#8a93a6\"/><text x=\"1352\" y=\"143\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Group3 .Position.Y</text><circle cx=\"1344\" cy=\"159\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1353\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-23-automatically-strip-line-breaks",
  "title": "VL 23｜流し込みテキストから改行を自動で除去する",
  "title_en": "VL 23 | Automatically strip line breaks from incoming text",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "【CRLF は2段】データが CRLF なら Replace を2段（CR→空、LF→空）。New に半角スペースを入れれば詰めずに語間スペースにできる。",
  "goal_en": "[CRLF = two stages] if the data is CRLF, chain two Replaces (CR→empty, LF→empty). Put a space in New if you want a space between words instead of joining.",
  "overview": "流れ：元テキスト → 改行だけの隠しテキスト → Replace → 整形後テキスト",
  "overview_en": "Flow: source text → newlineだけの隠しテキスト → Replace → formattedテキスト",
  "svg": "<svg viewBox=\"0 0 606 98\" width=\"606\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv23j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,44 224,44\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv23j)\"/><path d=\"M158,87 C191,87 191,58 224,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv23j)\"/><path d=\"M382,44 C415,44 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv23j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">source .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">newline .Text（Enterのみ）</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"15\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,33 L224.5,20 Q224.5,15.5 229,15.5 L377,15.5 Q381.5,15.5 381.5,20 L381.5,33 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"28\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Replace</text><circle cx=\"224\" cy=\"44\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"47\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Old</text><circle cx=\"224\" cy=\"72\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"75\" font-size=\"9\" fill=\"#20242c\">New</text><circle cx=\"382\" cy=\"44\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"47\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">output .Text</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 23】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 元テキスト（複数行）\n・[Object] 改行だけの隠しテキスト（Enter を1回押しただけ）→ Replace の Old へ\n・[Strings] Replace（In=元テキスト, Old=改行, New=空）\n・[Object] 整形後テキスト（1行）",
    "body_en": "[VL recipe 23]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] source text（複数行）\n・[Object] newlineだけの隠しテキスト（Enter を1回押しただけ）→ Replace の Old へ\n・[Strings] Replace（In=source text, Old=newline, New=empty）\n・[Object] formattedテキスト（1行）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【改行の材料】改行だけを入れた“隠しテキストオブジェクト”を用意し、その中で実際に Enter を1回押す＝本物の改行文字が入る。【なぜ String Value の \"\\r\\n\" ではダメか】String Value は文字をそのまま持つので \"\\r\\n\" は4文字の文字列になり、実際の改行（CR/LF）と一致しない。本物の改行文字が必要\n・【置換】Replace の In に元テキスト、Old にその隠しテキスト（改行）、New は空にする\n・【出力】Replace の出力を表示用テキストへ。改行が消えて1行になる（例：John＋改行＋Smith → JohnSmith）\n・【Word Wrap では消せない】Word Wrap は“幅”で折り返すだけ。本物の改行文字は幅を広げても残るので Word Wrap では1行にできない。文字ごと消す Replace が必要",
    "body_en": "・[Newline source] make a hidden text object that contains only a line break — press Enter once inside it (a real newline character). [Why not \"\\r\\n\" in String Value] String Value keeps text literally, so \"\\r\\n\" becomes 4 literal characters and won't match the real newline (CR/LF); you need the actual character\n・[Replace] set Replace's In = source text, Old = that hidden newline text, New = empty\n・[Output] wire Replace's output to the display text; the newline is gone (e.g. John + newline + Smith → JohnSmith)\n・[Word Wrap can't do it] Word Wrap only wraps by width; a real newline character stays no matter how wide the box, so Word Wrap can't flatten it — you must remove the character with Replace",
    "tip": "★本物の改行文字は Word Wrap（幅の折返し）では消せない。文字ごと Replace で消す。String Value に \"\\r\\n\" と打っても4文字の文字列扱いで一致しないので、改行だけを入れた隠しテキスト（実際に Enter を押す）を作り、その .Text を Replace の Old に渡すのが確実。New=空なら詰めて連結、語間に空白が欲しければ New=半角スペース。CRLF なら CR→空・LF→空 の2段。■実機確認済み（source=John＋改行＋Smith → JohnSmith）。",
    "tip_en": "★A real newline character can't be removed by Word Wrap (width wrapping) — remove the character with Replace. Typing \"\\r\\n\" into String Value is taken as 4 literal characters and won't match, so make a hidden text object holding only a line break (actually press Enter) and feed its .Text into Replace's Old. New=empty joins the words; use a space in New for a gap. For CRLF, chain CR→empty then LF→empty. ■Verified (source = John + newline + Smith → JohnSmith)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 【CRLF は2段】データが CRLF なら Replace を2段（CR→空、LF→空）。New に半角スペースを入れれば詰めずに語間スペースにできる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ [CRLF = two stages] if the data is CRLF, chain two Replaces (CR→empty, LF→empty). Put a space in New if you want a space between words instead of joining\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 606 98\" width=\"606\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv23e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,44 224,44\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv23e)\"/><path d=\"M158,87 C191,87 191,58 224,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv23e)\"/><path d=\"M382,44 C415,44 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv23e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">source .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">newline .Text (Enter on…</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"15\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,33 L224.5,20 Q224.5,15.5 229,15.5 L377,15.5 Q381.5,15.5 381.5,20 L381.5,33 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"28\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Replace</text><circle cx=\"224\" cy=\"44\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"47\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Old</text><circle cx=\"224\" cy=\"72\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"75\" font-size=\"9\" fill=\"#20242c\">New</text><circle cx=\"382\" cy=\"44\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"47\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">output .Text</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-24-mirror-one-text-into",
  "title": "VL 24｜あるテキストを別のテキストへ丸写し（ミラー）する",
  "title_en": "VL 24 | Mirror one text into another (exact copy)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "元が変われば複製先も同じ内容に追従する。",
  "goal_en": "When the source changes, the copy follows.",
  "overview": "流れ：元テキスト → 複製先テキスト",
  "overview_en": "Flow: source text → copyテキスト",
  "svg": "<svg viewBox=\"0 0 382 44\" width=\"382\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv24j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv24j)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">元 .Text</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">複製先 .Text</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 24】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 元テキスト\n・[Object] 複製先テキスト",
    "body_en": "[VL recipe 24]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] source text\n・[Object] copyテキスト",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・元テキストオブジェクトの出力を、複製先テキストの入力へ接続するだけ",
    "body_en": "・Just connect the source text's output to the target text's input",
    "tip": "同じ内容を画面の別位置にも出す時の最短手（ブロック2つ・接続1本）。■実機確認済み（検証値）：source.Text→copy.Text の1本接続のみ。source を変えると copy が同内容に追従。",
    "tip_en": "The shortest way to show the same content elsewhere on screen (2 blocks, 1 wire)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 元が変われば複製先も同じ内容に追従する\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ When the source changes, the copy follows\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 382 44\" width=\"382\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv24e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv24e)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Source .Text</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Copy .Text</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-25-vertically-center-an-element",
  "title": "VL 25｜要素を自身の高さに合わせて縦センタリングする",
  "title_en": "VL 25 | Vertically center an element by its height",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "結果を対象の Position.Y へ接続。内容量（高さ）が変わっても中央位置を保つ（必要なら Pivot.Y も同様に足せる）。",
  "goal_en": "Connect the result to the object's Position.Y; it stays centered as the content height changes (add Pivot.Y the same way if needed).",
  "overview": "流れ：対象の BoundingBox.Height → Divide → Value＋ Offset → 対象の Position.Y",
  "overview_en": "Flow: targetの BoundingBox.Height → Divide → Value＋ Offset → targetの Position.Y",
  "svg": "<svg viewBox=\"0 0 830 98\" width=\"830\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv25j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv25j)\"/><path d=\"M382,51 C415,51 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv25j)\"/><path d=\"M158,87 C303,87 303,65 448,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv25j)\"/><path d=\"M606,51 C639,51 639,58 672,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv25j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text1 BBox.Height</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,40 L224.5,27 Q224.5,22.5 229,22.5 L377,22.5 Q381.5,22.5 381.5,27 L381.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Divide /2</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"68\" font-size=\"9\" fill=\"#20242c\">Divisor</text><circle cx=\"382\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 400</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Offset</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,47 L672.5,34 Q672.5,29.5 677,29.5 L825,29.5 Q829.5,29.5 829.5,34 L829.5,47 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text1 .Position.Y</text><circle cx=\"672\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 25】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 対象の BoundingBox.Height\n・[Math] Divide（/2）\n・[Math] Value（基準位置 例400）＋ Offset\n・[Object] 対象の Position.Y",
    "body_en": "[VL recipe 25]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] targetの BoundingBox.Height\n・[Math] Divide（/2）\n・[Math] Value（基準pos 例400）＋ Offset\n・[Object] targetの Position.Y",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・対象オブジェクトの BoundingBox.Height を取得し、Divide で 1/2 にする\n・基準位置の Value（例 400）を Offset で足す（＝基準＋高さ÷2）",
    "body_en": "・Get the object's BoundingBox.Height and halve it with Divide\n・Add the base-position Value (e.g. 400) with Offset (= base + height/2)",
    "tip": "可変長の引用・コメントを常に一定位置（中央など）に置きたい時に。基準位置は Value で与え、そこへ 高さ÷2 を足すのがポイント。横方向は BoundingBox.Width で同様に。■実機確認済み：BoundingBox.Height=168 → Divide/2=84 → Offset＋400=484 → Position.Y=484（実機は Position.Y のみ。Pivot.Y は使っていない）。",
    "tip_en": "For keeping variable-length quotes/comments at a fixed (e.g. centered) position. Give the base position as a Value and add height/2 to it. Do the same horizontally with BoundingBox.Width. ■Verified: BoundingBox.Height=168 → Divide/2=84 → Offset+400=484 → Position.Y=484 (the real scene uses Position.Y only; Pivot.Y is not used)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 結果を対象の Position.Y へ接続。内容量（高さ）が変わっても中央位置を保つ（必要なら Pivot.Y も同様に足せる）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect the result to the object's Position.Y; it stays centered as the content height changes (add Pivot.Y the same way if needed)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-26-compute-pie-chart-angles",
  "title": "VL 26｜値から円グラフの角度（Start/End Angle）を計算する",
  "title_en": "VL 26 | Compute pie-chart angles (Start/End Angle) from values",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "複数項目や StartAngle に広げる時は、前の項目までの累積角を Add で足して各扇形の開始角にする。",
  "goal_en": "To extend to multiple slices or StartAngle, add the cumulative angle of prior items with Add for each slice's start.",
  "overview": "流れ：Value → Add → Value → Divide → Multiply → EndAngle / StartAngle",
  "overview_en": "Flow: Value → Add → Value → Divide → Multiply → EndAngle / StartAngle",
  "svg": "<svg viewBox=\"0 0 1054 98\" width=\"1054\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv26j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26j)\"/><path d=\"M382,51 C415,51 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26j)\"/><path d=\"M158,87 C303,87 303,65 448,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26j)\"/><path d=\"M606,51 C639,51 639,51 672,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26j)\"/><path d=\"M830,51 C863,51 863,29 896,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26j)\"/><path d=\"M830,51 C863,51 863,87 896,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 27 (値)</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,40 L224.5,27 Q224.5,22.5 229,22.5 L377,22.5 Q381.5,22.5 381.5,27 L381.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"68\" font-size=\"9\" fill=\"#20242c\">+</text><circle cx=\"382\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 100 (合計)</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Divide</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Divisor</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,40 L672.5,27 Q672.5,22.5 677,22.5 L825,22.5 Q829.5,22.5 829.5,27 L829.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×360</text><circle cx=\"672\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"68\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"830\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,18 L896.5,5 Q896.5,0.5 901,0.5 L1049,0.5 Q1053.5,0.5 1053.5,5 L1053.5,18 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">EndAngle</text><circle cx=\"896\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"896\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,76 L896.5,63 Q896.5,58.5 901,58.5 L1049,58.5 Q1053.5,58.5 1053.5,63 L1053.5,76 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">StartAngle</text><circle cx=\"896\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 26】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Math] Value（項目の値 例27）\n・[Math] Add（値の中継。+ は 0）\n・[Math] Value（合計 例100）\n・[Math] Divide（Base / Divisor）\n・[Math] Multiply（Base × Multiplier=360）\n・[Object] EndAngle / StartAngle（累積角）",
    "body_en": "[VL recipe 26]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Math] Value（項目のValue 例27）\n・[Math] Add（Valueのrelay。+ は 0）\n・[Math] Value（total 例100）\n・[Math] Divide（Base / Divisor）\n・[Math] Multiply（Base × Multiplier=360）\n・[Object] EndAngle / StartAngle（累積角）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・項目の値（Value 例27）を Add の Base に入れる（Add は中継。+ は 0 なので Out=27）\n・Add の Out を Divide の Base、合計値（Value 例100）を Divide の Divisor に接続（27÷100=0.27）\n・Divide の Out を Multiply の Base に入れ、Multiplier に 360 を設定（0.27×360=97.2）\n・Multiply の Out を EndAngle（および次スライスの StartAngle）へ接続（扇形が97.2°まで描かれる）",
    "body_en": "・Put the item value (Value, e.g. 27) into Add's Base (Add is a relay; + is 0, so Out=27)\n・Connect Add's Out to Divide's Base and the total (Value, e.g. 100) to Divide's Divisor (27÷100=0.27)\n・Feed Divide's Out into Multiply's Base and set Multiplier to 360 (0.27×360=97.2)\n・Connect Multiply's Out to EndAngle (and the next slice's StartAngle) (the slice is drawn to 97.2°)",
    "tip": "実機は 値→Add→Divide(÷合計)→Multiply(×360)→EndAngle/StartAngle。Multiply の 360 は Multiplier に直接入力する定数。項目を増やすと累積角で StartAngle も作れる。棒グラフなら EndAngle を幅/高さに置換。■実機確認済み（27/100 → 0.27 → 97.2°）。",
    "tip_en": "On hardware: value → Add → Divide (÷ total) → Multiply (× 360) → EndAngle. The 360 is a constant typed into Multiplier. Add more items to build StartAngle from the cumulative angle. For a bar chart, use width/height instead of EndAngle."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 複数項目や StartAngle に広げる時は、前の項目までの累積角を Add で足して各扇形の開始角にする\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ To extend to multiple slices or StartAngle, add the cumulative angle of prior items with Add for each slice's start\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 1054 98\" width=\"1054\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv26e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26e)\"/><path d=\"M382,51 C415,51 415,51 448,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26e)\"/><path d=\"M158,87 C303,87 303,65 448,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26e)\"/><path d=\"M606,51 C639,51 639,51 672,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26e)\"/><path d=\"M830,51 C863,51 863,29 896,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26e)\"/><path d=\"M830,51 C863,51 863,87 896,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv26e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 27 (Value)</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,40 L224.5,27 Q224.5,22.5 229,22.5 L377,22.5 Q381.5,22.5 381.5,27 L381.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"232\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"68\" font-size=\"9\" fill=\"#20242c\">+</text><circle cx=\"382\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 100 (total)</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,40 L448.5,27 Q448.5,22.5 453,22.5 L601,22.5 Q605.5,22.5 605.5,27 L605.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Divide ratio</text><circle cx=\"448\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Divisor</text><circle cx=\"606\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,40 L672.5,27 Q672.5,22.5 677,22.5 L825,22.5 Q829.5,22.5 829.5,27 L829.5,40 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×360</text><circle cx=\"672\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"65\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"68\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"830\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,18 L896.5,5 Q896.5,0.5 901,0.5 L1049,0.5 Q1053.5,0.5 1053.5,5 L1053.5,18 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">EndAngle</text><circle cx=\"896\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"896\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,76 L896.5,63 Q896.5,58.5 901,58.5 L1049,58.5 Q1053.5,58.5 1053.5,63 L1053.5,76 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">StartAngle</text><circle cx=\"896\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-27-show-only-the-indicator",
  "title": "VL 27｜状態値（所有権・攻守など）に一致するインジケータだけ表示する",
  "title_en": "VL 27 | Show only the indicator matching a state value (possession, etc.)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "→ 現在の状態に一致する矢印/枠だけが点灯。3状態以上も同じ要領で増やす。どの値にも一致しなければ全インジケータが消える（＝該当なし表示）。",
  "goal_en": "→ only the arrow/frame matching the current state lights up. Extend the same way for 3+ states. If nothing matches, all indicators hide (a 'none' state).",
  "overview": "流れ：状態テキスト → String Value/ String Value → String Compare ×状態数 → 各インジケータの Visibleへ直結",
  "overview_en": "Flow: 状態テキスト → String Value/ String Value → String Compare ×状態数 → 各インジケータの Visibleへ直結",
  "svg": "<svg viewBox=\"0 0 606 182\" width=\"606\" height=\"182\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv27j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,42 C191,42 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv27j)\"/><path d=\"M158,100 C191,100 191,43 224,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv27j)\"/><path d=\"M382,29 C415,29 415,71 448,71\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv27j)\"/><path d=\"M158,42 C191,42 191,129 224,129\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv27j)\"/><path d=\"M158,158 C191,158 191,143 224,143\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv27j)\"/><path d=\"M382,129 C415,129 415,129 448,129\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv27j)\"/><rect x=\"0\" y=\"13\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,31 L0.5,18 Q0.5,13.5 5,13.5 L153,13.5 Q157.5,13.5 157.5,18 L157.5,31 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"26\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">POS_txt .Text</text><circle cx=\"158\" cy=\"42\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"45\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"71\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,89 L0.5,76 Q0.5,71.5 5,71.5 L153,71.5 Q157.5,71.5 157.5,76 L157.5,89 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"84\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value Visitor</text><circle cx=\"158\" cy=\"100\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"103\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare Visitor</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"43\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"46\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"57\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"60\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"71\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"74\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"42\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,60 L448.5,47 Q448.5,42.5 453,42.5 L601,42.5 Q605.5,42.5 605.5,47 L605.5,60 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"55\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">VISITOR POS .Visible</text><circle cx=\"448\" cy=\"71\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"74\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"129\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,147 L0.5,134 Q0.5,129.5 5,129.5 L153,129.5 Q157.5,129.5 157.5,134 L157.5,147 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"142\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value Home</text><circle cx=\"158\" cy=\"158\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"161\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"100\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,118 L224.5,105 Q224.5,100.5 229,100.5 L377,100.5 Q381.5,100.5 381.5,105 L381.5,118 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"113\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare Home</text><circle cx=\"224\" cy=\"129\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"132\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"143\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"146\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"129\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"132\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"143\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"146\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"157\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"160\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"171\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"174\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"100\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,118 L448.5,105 Q448.5,100.5 453,100.5 L601,100.5 Q605.5,100.5 605.5,105 L605.5,118 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"113\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HOME POS .Visible</text><circle cx=\"448\" cy=\"129\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"132\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 27】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 状態テキスト（例 POS_txt .Text＝Home/Visitor）→ 各 String Compare の String1\n・[Strings] String Value（Home）/ String Value（Visitor）→ 各 String2\n・[Strings] String Compare ×状態数（Equal 出力を使う）\n・[Object] 各インジケータの Visible（VISITOR POS / HOME POS）へ直結",
    "body_en": "[VL recipe 27]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] 状態テキスト（例 POS_txt .Text＝Home/Visitor）→ 各 String Compare の String1\n・[Strings] String Value（Home）/ String Value（Visitor）→ 各 String2\n・[Strings] String Compare ×状態数（Equal 出力を使う）\n・[Object] 各インジケータの Visible（VISITOR POS / HOME POS）へ直結",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【判定元】状態テキスト（例 POS_txt .Text＝Home/Visitor）を、各 String Compare の String1 に入れる\n・【状態の値】各状態の値を String Value で用意（\"Home\"／\"Visitor\"）し、それぞれ String2 へ。String Compare の Equal 出力で一致を判定（Equal=1＝一致）\n・【表示】各 Equal 出力を、その状態のインジケータの Visible へ直結する。※このケースは Add 中継は不要（実機確認済み。ブロックや接続先によっては Add 中継が要る場合もある）",
    "body_en": "・[Source] feed the state text (e.g. POS_txt .Text = Home/Visitor) into each String Compare's String1\n・[State value] set each state's value with String Value (\"Home\" / \"Visitor\") into String2; judge with the String Compare Equal output (Equal=1 = match)\n・[Show] wire each Equal output straight to that state's indicator Visible. Note: no Add relay needed here (verified; some blocks/targets may still need one)",
    "tip": "状態ごとに String Compare を1つ並べ、Equal 出力を各インジケータの Visible へ直結する（Add 中継なしでOK＝実機確認済み）。String Value に各状態の値を入れる。3状態以上も同じ要領。どの値にも一致しなければ全部消える。String Compare は大文字小文字・前後空白に敏感なので状態値の表記をデータに合わせる。■実機確認済み（POS_txt=\"Visitor\" → VISITOR POS=1 / HOME POS=0）。",
    "tip_en": "Line up one String Compare per state and wire its Equal output straight to each indicator's Visible (no Add relay needed — verified). Put each state's value in String Value. Extend the same way for 3+ states; if nothing matches, all hide. String Compare is case/whitespace sensitive, so match the state text to your data. ■Verified (POS_txt=\"Visitor\" → VISITOR POS=1 / HOME POS=0)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ → 現在の状態に一致する矢印/枠だけが点灯。3状態以上も同じ要領で増やす。どの値にも一致しなければ全インジケータが消える（＝該当なし表示）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ → only the arrow/frame matching the current state lights up. Extend the same way for 3+ states. If nothing matches, all indicators hide (a 'none' state)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-28-control-visibility-when-any",
  "title": "VL 28｜複数の値のいずれかに一致したら表示を制御する（OR）",
  "title_en": "VL 28 | Control visibility when any of several values matches (OR)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "『試合終了系のいずれか』なら時計を隠す、といった複合条件になる。",
  "goal_en": "Gives a compound condition like 'hide the clock if any of the final states'.",
  "overview": "流れ：判定テキスト → String Value → String Compare → Or → Not → 対象の Visible",
  "overview_en": "Flow: judgeテキスト → String Value → String Compare → Or → Not → targetの Visible",
  "svg": "<svg viewBox=\"0 0 1054 282\" width=\"1054\" height=\"282\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv28j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,63 C191,63 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M158,121 C191,121 191,43 224,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M158,63 C191,63 191,129 224,129\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M158,179 C191,179 191,143 224,143\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M158,63 C191,63 191,229 224,229\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M158,237 C191,237 191,243 224,243\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M382,29 C415,29 415,136 448,136\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M382,129 C415,129 415,150 448,150\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M382,229 C415,229 415,150 448,150\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M606,136 C639,136 639,150 672,150\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><path d=\"M830,150 C863,150 863,150 896,150\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv28j)\"/><rect x=\"0\" y=\"34\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,52 L0.5,39 Q0.5,34.5 5,34.5 L153,34.5 Q157.5,34.5 157.5,39 L157.5,52 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"47\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">QTR .Text</text><circle cx=\"158\" cy=\"63\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"66\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"92\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,110 L0.5,97 Q0.5,92.5 5,92.5 L153,92.5 Q157.5,92.5 157.5,97 L157.5,110 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"105\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value F</text><circle cx=\"158\" cy=\"121\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"124\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"150\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,168 L0.5,155 Q0.5,150.5 5,150.5 L153,150.5 Q157.5,150.5 157.5,155 L157.5,168 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"163\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value F/OT</text><circle cx=\"158\" cy=\"179\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"182\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"208\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,226 L0.5,213 Q0.5,208.5 5,208.5 L153,208.5 Q157.5,208.5 157.5,213 L157.5,226 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"221\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value FINAL</text><circle cx=\"158\" cy=\"237\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"240\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"43\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"46\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"57\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"60\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"71\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"74\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"224\" y=\"100\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,118 L224.5,105 Q224.5,100.5 229,100.5 L377,100.5 Q381.5,100.5 381.5,105 L381.5,118 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"113\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"129\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"132\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"143\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"146\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"129\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"132\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"143\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"146\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"157\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"160\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"171\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"174\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"224\" y=\"200\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,218 L224.5,205 Q224.5,200.5 229,200.5 L377,200.5 Q381.5,200.5 381.5,205 L381.5,218 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"213\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare</text><circle cx=\"224\" cy=\"229\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"232\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"243\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"246\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"229\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"232\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"243\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"246\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"257\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"260\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"271\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"274\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"107\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,125 L448.5,112 Q448.5,107.5 453,107.5 L601,107.5 Q605.5,107.5 605.5,112 L605.5,125 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"120\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Or</text><circle cx=\"448\" cy=\"136\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"139\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"150\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"153\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Or</text><circle cx=\"448\" cy=\"164\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"167\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"606\" cy=\"136\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"139\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"121\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,139 L672.5,126 Q672.5,121.5 677,121.5 L825,121.5 Q829.5,121.5 829.5,126 L829.5,139 Z\" fill=\"#8288DD\"/><text x=\"680\" y=\"134\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"672\" cy=\"150\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"153\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"830\" cy=\"150\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"153\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"121\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,139 L896.5,126 Q896.5,121.5 901,121.5 L1049,121.5 Q1053.5,121.5 1053.5,126 L1053.5,139 Z\" fill=\"#8a93a6\"/><text x=\"904\" y=\"134\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">CLOCK .Visible</text><circle cx=\"896\" cy=\"150\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"153\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 28】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 判定テキスト（例 QTR）\n・[Strings] String Value（F / F/OT / FINAL）\n・[Strings] String Compare（値ごと）\n・[Logic] Or\n・[Logic] Not\n・[Object] 対象の Visible（例 CLOCK）",
    "body_en": "[VL recipe 28]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] judgeテキスト（例 QTR）\n・[Strings] String Value（F / F/OT / FINAL）\n・[Strings] String Compare（Valueごと）\n・[Logic] Or\n・[Logic] Not\n・[Object] targetの Visible（例 CLOCK）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・判定テキストを複数の String Compare に入れ、それぞれ別の値（F・F/OT・FINAL）と比較\n・各比較結果を Or に集約（どれか1つでも一致で真）\n・Or の出力を Not で反転し、対象（時計など）の Visible へ",
    "body_en": "・Feed the text into several String Compares, each against a different value (F, F/OT, FINAL)\n・Aggregate the results into Or (true if any one matches)\n・Invert Or's output with Not into the target's Visible (e.g. a clock)",
    "tip": "Or＝いずれか一致、And＝全て一致。分岐の数だけ String Compare を用意して Or/And にまとめる。■実機確認済み（検証値）：判定テキスト→各 String Compare.String1、比較値の String Value→String2、Equal→Or（Base/Or/Or）。Or.Out→Not.In→対象.Visible。実機は QTR を OP/HALF TIME/FINAL と比較し、いずれも不一致（例 2Q）なら Or=0→Not=1 で対象を表示。",
    "tip_en": "Or = any match, And = all match. Prepare one String Compare per branch and combine with Or/And."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 『試合終了系のいずれか』なら時計を隠す、といった複合条件になる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Gives a compound condition like 'hide the clock if any of the final states'\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-29-change-title-scale-1",
  "title": "VL 29｜サブ要素の有無でタイトルのスケール（1行/2行）を変える",
  "title_en": "VL 29 | Change title scale (1-line/2-line) by whether a sub-element exists",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "サブタイトルの有無で選ばれたスケールを TITLE の Scale.X / Scale.Y へ接続。",
  "goal_en": "Connect the chosen scale to TITLE's Scale.X / Scale.Y by subtitle presence.",
  "overview": "流れ：SUBTITLE の IsEmpty → Input Selector → Value → TITLE の Scale.X / Scale.Y",
  "overview_en": "Flow: SUBTITLE の IsEmpty → Input Selector → Value → TITLE の Scale.X / Scale.Y",
  "svg": "<svg viewBox=\"0 0 606 156\" width=\"606\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv29j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,66 224,66\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv29j)\"/><path d=\"M158,87 C191,87 191,80 224,80\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv29j)\"/><path d=\"M158,145 C191,145 191,94 224,94\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv29j)\"/><path d=\"M382,66 C415,66 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv29j)\"/><path d=\"M382,66 C415,66 415,116 448,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv29j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">SUBTITLE .IsEmpty</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"37\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,55 L224.5,42 Q224.5,37.5 229,37.5 L377,37.5 Q381.5,37.5 381.5,42 L381.5,55 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"50\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"224\" cy=\"66\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"224\" cy=\"80\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"83\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"224\" cy=\"94\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"97\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"224\" cy=\"108\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"111\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"382\" cy=\"66\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1.0</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1.5</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">TITLE .Scale.X</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,105 L448.5,92 Q448.5,87.5 453,87.5 L601,87.5 Q605.5,87.5 605.5,92 L605.5,105 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">TITLE .Scale.Y</text><circle cx=\"448\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 29】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] SUBTITLE の IsEmpty\n・[Selector] Input Selector\n・[Math] Value（例 1.0 / 1.5）\n・[Object] TITLE の Scale.X / Scale.Y",
    "body_en": "[VL recipe 29]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] SUBTITLE の IsEmpty\n・[Selector] Input Selector\n・[Math] Value（例 1.0 / 1.5）\n・[Object] TITLE の Scale.X / Scale.Y",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・SUBTITLE の IsEmpty を Input Selector のインデックスに接続\n・2つの Value（1行用と2行用のスケール、例 1.0 と 1.5）を用意",
    "body_en": "・Connect SUBTITLE's IsEmpty to Input Selector's index\n・Prepare two Values (1-line and 2-line scale, e.g. 1.0 and 1.5)",
    "tip": "位置調整レシピと組み合わせると、1行/2行で見栄えが破綻しない。倍率は素材に合わせて調整。",
    "tip_en": "Combine with the position recipe so 1/2-line layouts don't break. Tune the factor to your asset."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ サブタイトルの有無で選ばれたスケールを TITLE の Scale.X / Scale.Y へ接続\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect the chosen scale to TITLE's Scale.X / Scale.Y by subtitle presence\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-30-show-hide-stat-items",
  "title": "VL 30｜件数に応じて統計項目をまとめて出し入れする",
  "title_en": "VL 30 | Show/hide stat items by count AND auto-tighten their position (variable-length stats)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "→ 途中欠場でも下の選手が上へ詰まり隙間が消える。登録順や欠場の位置に関係なく整う。",
  "goal_en": "→ a mid-roster absence pulls the lower players up and the gap closes, regardless of order or where the absence is.",
  "overview": "流れ：選手名スロット ×15 → 各スロットの IsEmpty → Value／ Value → Add → Multiply → Subtract → Add",
  "overview_en": "Flow: Player nameスロット ×15 → 各スロットの IsEmpty → Value／ Value → Add → Multiply → Subtract → Add",
  "svg": "<svg viewBox=\"0 0 1278 644\" width=\"1278\" height=\"644\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv30j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,157 C191,157 191,215 224,215\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,215 C415,215 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,215 C191,215 191,273 224,273\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,273 C415,273 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,273 C191,273 191,331 224,331\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,331 C415,331 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,331 C191,331 191,389 224,389\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,389 C415,389 415,203 448,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,389 C191,389 191,447 224,447\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,447 C415,447 415,261 448,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,215 C415,215 415,319 448,319\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,273 C415,273 415,333 448,333\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,215 C415,215 415,391 448,391\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,273 C415,273 415,405 448,405\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,331 C415,331 415,419 448,419\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,215 C415,215 415,477 448,477\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,273 C415,273 415,491 448,491\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,331 C415,331 415,505 448,505\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,389 C415,389 415,519 448,519\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,215 C415,215 415,577 448,577\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,273 C415,273 415,591 448,591\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,331 C415,331 415,605 448,605\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,389 C415,389 415,619 448,619\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M382,447 C415,447 415,633 448,633\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M606,319 C639,319 639,216 672,216\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,447 C415,447 415,230 672,230\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M606,391 C639,391 639,288 672,288\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,447 C415,447 415,302 672,302\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M606,477 C639,477 639,360 672,360\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,447 C415,447 415,374 672,374\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M606,577 C639,577 639,432 672,432\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,447 C415,447 415,446 672,446\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,505 C527,505 527,188 896,188\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M830,216 C863,216 863,216 896,216\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,505 C527,505 527,274 896,274\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M830,288 C863,288 863,302 896,302\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,505 C527,505 527,360 896,360\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M830,360 C863,360 863,388 896,388\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M158,505 C527,505 527,446 896,446\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M830,432 C863,432 863,474 896,474\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M1054,188 C1087,188 1087,244 1120,244\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M1054,274 C1087,274 1087,302 1120,302\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M1054,360 C1087,360 1087,360 1120,360\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><path d=\"M1054,446 C1087,446 1087,418 1120,418\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30j)\"/><rect x=\"0\" y=\"128\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,146 L0.5,133 Q0.5,128.5 5,128.5 L153,128.5 Q157.5,128.5 157.5,133 L157.5,146 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"141\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">KEN IsEmpty</text><circle cx=\"158\" cy=\"157\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"160\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"186\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,204 L224.5,191 Q224.5,186.5 229,186.5 L377,186.5 Q381.5,186.5 381.5,191 L381.5,204 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"199\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(KEN)</text><circle cx=\"224\" cy=\"215\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"218\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"215\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"218\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">KEN .Visible</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"186\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,204 L0.5,191 Q0.5,186.5 5,186.5 L153,186.5 Q157.5,186.5 157.5,191 L157.5,204 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"199\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BEN IsEmpty</text><circle cx=\"158\" cy=\"215\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"218\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"244\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,262 L224.5,249 Q224.5,244.5 229,244.5 L377,244.5 Q381.5,244.5 381.5,249 L381.5,262 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"257\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(BEN)</text><circle cx=\"224\" cy=\"273\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"276\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"273\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"276\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BEN .Visible</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"244\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,262 L0.5,249 Q0.5,244.5 5,244.5 L153,244.5 Q157.5,244.5 157.5,249 L157.5,262 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"257\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DAN IsEmpty</text><circle cx=\"158\" cy=\"273\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"276\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"302\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,320 L224.5,307 Q224.5,302.5 229,302.5 L377,302.5 Q381.5,302.5 381.5,307 L381.5,320 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"315\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(DAN)</text><circle cx=\"224\" cy=\"331\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"334\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"331\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"334\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DAN .Visible</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"302\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,320 L0.5,307 Q0.5,302.5 5,302.5 L153,302.5 Q157.5,302.5 157.5,307 L157.5,320 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"315\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AAA IsEmpty</text><circle cx=\"158\" cy=\"331\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"334\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"360\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,378 L224.5,365 Q224.5,360.5 229,360.5 L377,360.5 Q381.5,360.5 381.5,365 L381.5,378 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"373\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(AAA)</text><circle cx=\"224\" cy=\"389\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"392\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"389\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"392\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,192 L448.5,179 Q448.5,174.5 453,174.5 L601,174.5 Q605.5,174.5 605.5,179 L605.5,192 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AAA .Visible</text><circle cx=\"448\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"360\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,378 L0.5,365 Q0.5,360.5 5,360.5 L153,360.5 Q157.5,360.5 157.5,365 L157.5,378 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"373\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BBB IsEmpty</text><circle cx=\"158\" cy=\"389\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"392\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"418\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,436 L224.5,423 Q224.5,418.5 229,418.5 L377,418.5 Q381.5,418.5 381.5,423 L381.5,436 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"431\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(BBB)</text><circle cx=\"224\" cy=\"447\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"450\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"447\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"450\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,250 L448.5,237 Q448.5,232.5 453,232.5 L601,232.5 Q605.5,232.5 605.5,237 L605.5,250 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BBB .Visible</text><circle cx=\"448\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"290\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,308 L448.5,295 Q448.5,290.5 453,290.5 L601,290.5 Q605.5,290.5 605.5,295 L605.5,308 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add 順位BEN</text><circle cx=\"448\" cy=\"319\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"333\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"336\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"606\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"362\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,380 L448.5,367 Q448.5,362.5 453,362.5 L601,362.5 Q605.5,362.5 605.5,367 L605.5,380 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"375\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add 順位DAN</text><circle cx=\"448\" cy=\"391\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"394\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"405\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"408\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"448\" cy=\"419\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"422\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"391\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"394\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"448\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,466 L448.5,453 Q448.5,448.5 453,448.5 L601,448.5 Q605.5,448.5 605.5,453 L605.5,466 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"461\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add 順位AAA</text><circle cx=\"448\" cy=\"477\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"480\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"491\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"494\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"448\" cy=\"505\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"508\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"519\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"522\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"477\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"480\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"548\" width=\"158\" height=\"96\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,566 L448.5,553 Q448.5,548.5 453,548.5 L601,548.5 Q605.5,548.5 605.5,553 L605.5,566 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"561\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add 順位BBB</text><circle cx=\"448\" cy=\"577\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"580\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"591\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"594\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"448\" cy=\"605\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"608\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"619\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"622\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"633\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"636\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"577\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"580\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"187\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,205 L672.5,192 Q672.5,187.5 677,187.5 L825,187.5 Q829.5,187.5 829.5,192 L829.5,205 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"200\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"216\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"219\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"230\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"233\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"216\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"219\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"259\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,277 L672.5,264 Q672.5,259.5 677,259.5 L825,259.5 Q829.5,259.5 829.5,264 L829.5,277 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"272\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"288\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"291\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"302\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"305\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"288\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"291\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"331\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,349 L672.5,336 Q672.5,331.5 677,331.5 L825,331.5 Q829.5,331.5 829.5,336 L829.5,349 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"344\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"360\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"374\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"377\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"360\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"403\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,421 L672.5,408 Q672.5,403.5 677,403.5 L825,403.5 Q829.5,403.5 829.5,408 L829.5,421 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"416\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"432\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"435\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"446\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"449\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"432\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"435\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"159\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,177 L896.5,164 Q896.5,159.5 901,159.5 L1049,159.5 Q1053.5,159.5 1053.5,164 L1053.5,177 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"172\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"188\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"202\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"205\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"216\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"219\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"188\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"245\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,263 L896.5,250 Q896.5,245.5 901,245.5 L1049,245.5 Q1053.5,245.5 1053.5,250 L1053.5,263 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"258\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"274\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"277\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"288\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"291\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"302\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"305\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"274\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"277\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"331\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,349 L896.5,336 Q896.5,331.5 901,331.5 L1049,331.5 Q1053.5,331.5 1053.5,336 L1053.5,349 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"344\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"360\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"374\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"377\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"388\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"391\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"360\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"417\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,435 L896.5,422 Q896.5,417.5 901,417.5 L1049,417.5 Q1053.5,417.5 1053.5,422 L1053.5,435 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"430\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"446\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"449\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"460\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"463\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"474\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"477\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"446\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"449\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"215\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,233 L1120.5,220 Q1120.5,215.5 1125,215.5 L1273,215.5 Q1277.5,215.5 1277.5,220 L1277.5,233 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"228\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BEN .Position.Y=702</text><circle cx=\"1120\" cy=\"244\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"247\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1120\" y=\"273\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,291 L1120.5,278 Q1120.5,273.5 1125,273.5 L1273,273.5 Q1277.5,273.5 1277.5,278 L1277.5,291 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"286\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DAN .Position.Y=503</text><circle cx=\"1120\" cy=\"302\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"305\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1120\" y=\"331\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,349 L1120.5,336 Q1120.5,331.5 1125,331.5 L1273,331.5 Q1277.5,331.5 1277.5,336 L1277.5,349 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"344\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AAA .Position.Y=304</text><circle cx=\"1120\" cy=\"360\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1120\" y=\"389\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,407 L1120.5,394 Q1120.5,389.5 1125,389.5 L1273,389.5 Q1277.5,389.5 1277.5,394 L1277.5,407 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"402\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BBB .Position.Y=105</text><circle cx=\"1120\" cy=\"418\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"421\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"418\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,436 L0.5,423 Q0.5,418.5 5,418.5 L153,418.5 Q157.5,418.5 157.5,423 L157.5,436 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"431\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 行高=199</text><circle cx=\"158\" cy=\"447\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"450\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"476\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,494 L0.5,481 Q0.5,476.5 5,476.5 L153,476.5 Q157.5,476.5 157.5,481 L157.5,494 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"489\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 上端Y=1100</text><circle cx=\"158\" cy=\"505\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"508\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 30】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 選手名スロット ×15（.Text。空＝欠場／名前あり＝出場）\n・[Object] 各スロットの IsEmpty → logic: Not（出場=1）→ Visible（出場だけ表示）\n・[Math] Value（上端Y＝リストの縦基準）／ Value（行高＝1行の縦ピッチ）\n・[Math] Add（上から自分までの Not を累積＝上からの出場順位）\n・[Math] Multiply（順位 × 行高＝上端からの下げ量）\n・[Math] Subtract（上端Y − 下げ量）→ そのスロットの Position.Y（上端固定・隙間なく整列）\n・[Math] Add（15の Not を合算＝出場人数。任意）",
    "body_en": "[VL recipe 30]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] Player nameスロット ×15（.Text。empty＝欠場／名前あり＝出場）\n・[Object] 各スロットの IsEmpty → logic: Not（出場=1）→ Visible（出場だけ表示）\n・[Math] Value（上端Y＝リストの縦基準）／ Value（行高＝1行の縦ピッチ）\n・[Math] Add（上から自分までの Not を累積＝上からの出場Rank）\n・[Math] Multiply（Rank × 行高＝上端からの下げ量）\n・[Math] Subtract（上端Y − 下げ量）→ そのスロットの Position.Y（上端固定・隙間なく整列）\n・[Math] Add（15の Not を合算＝出場人数。任意）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【入力】選手名の TEXT スロットを15個用意する（登録15名）。出場者はその名前が入り、欠場者は空になる（渡ってくる情報は選手名だけ）\n・【出し入れ】各スロットの IsEmpty を logic:Not に通し、結果を同じスロットの Visible へ直結する（名前あり=表示／空=非表示）→ 出場者だけ表示。【なぜ IsEmpty か】渡るのは名前だけなので“空か入か”で出場判定でき、選手名リテラルを一切持たなくてよい＝15人でもメンバー変更でも保守箇所ゼロで最少エラー\n・【自動整列】各スロットの Position.Y を『上端Y −（上からの出場順位 × 行高）』で決める。上端Y はリストの縦基準（math:Value）。『上からの出場順位』は、上から自分までの Not を math:Add で累積する（KEN=Not(KEN)、BEN=Not(KEN)+Not(BEN)…＝自分を含む）。順位 × 行高（Multiply）を math:Subtract で上端Y から引き、その結果を Position.Y へ。【なぜ上端から引くか】XPression は Y が大きいほど上。上端を固定して“順位の分だけ下げる”ことで最上段から下へ隙間なく積む。欠場者が出ると下の選手の順位が繰り上がり、自動で上へ詰まる。（順位は自分を含む＝最上段が1になるので、最上行は 上端Y − 行高 に出る。最上段を上端Yちょうどに置きたければ自分を含めない累積にする）\n・【よくある失敗＝隙間の原因】Multiply（順位×行高）を Position.Y に直結すると、下端基準で上へ積む形になり、途中の選手が消えたとき上の選手はそのまま・下の選手が下へずれて“上側に”隙間ができる。必ず『上端Y − 順位×行高』にする（＝Subtract を1段挟む）\n・【人数】15の Not を別の math:Add で合算＝出場人数。背景枠の高さや『出場◯名』表示に使える（任意）",
    "body_en": "・[Inputs] prepare 15 player-name TEXT slots (a 15-player roster). Playing players carry a name; absent players are empty (only the player name is fed in)\n・[Show/hide] pass each slot's IsEmpty through logic:Not and wire the result straight to that slot's Visible (has name → show / empty → hide) → only playing players show. [Why IsEmpty] since only the name is fed in, 'empty vs filled' decides who plays, so you hold no player-name literals — zero maintenance and the fewest errors\n・[Auto-align] set each slot's Position.Y = 'top Y − (playing rank from the top × row height)'. Top Y is the list's vertical anchor (math:Value). Build the 'rank' by running-summing the Nots from the top down to and including this slot with math:Add (KEN=Not(KEN), BEN=Not(KEN)+Not(BEN) …). Multiply the rank by row height and SUBTRACT from top Y (math:Subtract), then feed Position.Y. [Why subtract from the top] in XPression a larger Y is higher, so anchoring the top and 'dropping by the rank' packs from the top down; when someone is absent the players below move up one rank and the gap closes. (Because the rank includes the slot itself, the top row = top Y − row height; to place the top row exactly at top Y, use a running sum that excludes the slot itself.)\n・[Common mistake = the gap] wiring Multiply(rank × row height) straight to Position.Y stacks upward from the bottom, so removing a mid-list player leaves the top player put and slides the lower ones down — opening a gap ABOVE. Always use 'top Y − rank × row height' (i.e. insert one Subtract)\n・[Count] sum the 15 Nots with a separate math:Add = number playing (box height / 'N playing' readout, optional)",
    "tip": "★隙間の原因：位置を『順位×行高』のまま Position.Y に直結していた＝下端基準で上へ積む形。これだと途中の選手が消えたとき上の選手はそのまま・下の選手が下へずれるので“間”ではなく上側に隙間ができる。正しくは『上端Y −（上からの出場順位 × 行高）』（Subtract を1段追加）。XPression は Y が大きいほど上なので、上端を固定して“順位分だけ下げる”と最上段から詰まる。『順位』は上から自分までの Not を累積（running total・自分を含む／各スロット＝1つ上の累積＋自分の Not）。渡るのは選手名だけなので出場判定は IsEmpty（空/入）で行い、選手名リテラルは0個＝15人でもメンバー変更でも配線不変。名前が2行に折り返すなど行高が可変なら、行高固定でなく上の各行の BoundingBox.Height を累積する（既存『各行の高さで詰める』参照）。■基準値の目安（Scene 1920×1080・Arial）：行高はフォントサイズとほぼ等倍〜×1.2（検証：フォント200 → 行高199）。ただし最優先は『最大人数が画面に収まる』こと＝最大人数 × 行高 ≦ 約1000（1080から上下マージンを引いた実用域）。目安は 5人→行高≈200(フォント200)／11人→≈90(フォント80)／15人→≈66(フォント60)。15人でフォント200は入りきらないので縮める。上端Y はリストの縦基準（上げれば全体が上、下げれば下がる）。検証値：上端Y=1100・行高199 で最上行≈901（実測オブジェクトは KEN=900）。縦位置は上端Yで合わせる。■実機の並び：全員 X POS=960（画面中央）で固定、KEN(最上段)は基準位置に固定（Y=900）、BEN/DAN/AAA/BBB の Y のみ VL で算出する。上の wire は実機5人ぶんの全結線（KEN の Not も各 Add に入る／削っていない）。",
    "tip_en": "★Cause of the gap: Position.Y was fed 'rank × row height' directly = stacking upward from the bottom. Removing a mid-list player then keeps the top player put and slides the lower ones down, so a gap opens ABOVE rather than closing. Correct is 'top Y − (rank × row height)' (add one Subtract). Since a larger Y is higher in XPression, anchor the top and 'drop by the rank' to pack from the top. 'Rank' is the running total of the Nots from the top down to and including the slot (each slot = the slot above's total + its own Not). Only the name is fed in, so judge play with IsEmpty (no name literals — wiring unchanged for 15 players or roster changes). If names wrap to two lines (variable row height), sum each upper row's BoundingBox.Height instead of a fixed row height (see 'close by line height'). ■Reference values (Scene 1920×1080, Arial): row height ≈ font size to ×1.2 (verified: font 200 → row height 199). Priority is that the max roster fits: max players × row height ≤ ~1000 (1080 minus top/bottom margins). Rough guide: 5 → ~200 (font 200) / 11 → ~90 (font 80) / 15 → ~66 (font 60); font 200 won't fit 15. Top Y is the list's vertical anchor (raise it to move all up). Verified: top Y=1100, row height 199 → top row ≈901."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ → 途中欠場でも下の選手が上へ詰まり隙間が消える。登録順や欠場の位置に関係なく整う\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ → a mid-roster absence pulls the lower players up and the gap closes, regardless of order or where the absence is\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 1278 644\" width=\"1278\" height=\"644\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv30e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,157 C191,157 191,215 224,215\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,215 C415,215 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,215 C191,215 191,273 224,273\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,273 C415,273 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,273 C191,273 191,331 224,331\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,331 C415,331 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,331 C191,331 191,389 224,389\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,389 C415,389 415,203 448,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,389 C191,389 191,447 224,447\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,447 C415,447 415,261 448,261\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,215 C415,215 415,319 448,319\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,273 C415,273 415,333 448,333\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,215 C415,215 415,391 448,391\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,273 C415,273 415,405 448,405\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,331 C415,331 415,419 448,419\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,215 C415,215 415,477 448,477\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,273 C415,273 415,491 448,491\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,331 C415,331 415,505 448,505\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,389 C415,389 415,519 448,519\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,215 C415,215 415,577 448,577\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,273 C415,273 415,591 448,591\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,331 C415,331 415,605 448,605\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,389 C415,389 415,619 448,619\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M382,447 C415,447 415,633 448,633\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M606,319 C639,319 639,216 672,216\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,447 C415,447 415,230 672,230\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M606,391 C639,391 639,288 672,288\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,447 C415,447 415,302 672,302\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M606,477 C639,477 639,360 672,360\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,447 C415,447 415,374 672,374\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M606,577 C639,577 639,432 672,432\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,447 C415,447 415,446 672,446\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,505 C527,505 527,188 896,188\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M830,216 C863,216 863,216 896,216\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,505 C527,505 527,274 896,274\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M830,288 C863,288 863,302 896,302\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,505 C527,505 527,360 896,360\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M830,360 C863,360 863,388 896,388\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M158,505 C527,505 527,446 896,446\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M830,432 C863,432 863,474 896,474\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M1054,188 C1087,188 1087,244 1120,244\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M1054,274 C1087,274 1087,302 1120,302\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M1054,360 C1087,360 1087,360 1120,360\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><path d=\"M1054,446 C1087,446 1087,418 1120,418\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv30e)\"/><rect x=\"0\" y=\"128\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,146 L0.5,133 Q0.5,128.5 5,128.5 L153,128.5 Q157.5,128.5 157.5,133 L157.5,146 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"141\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">KEN IsEmpty</text><circle cx=\"158\" cy=\"157\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"160\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"186\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,204 L224.5,191 Q224.5,186.5 229,186.5 L377,186.5 Q381.5,186.5 381.5,191 L381.5,204 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"199\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(KEN)</text><circle cx=\"224\" cy=\"215\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"218\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"215\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"218\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">KEN .Visible</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"186\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,204 L0.5,191 Q0.5,186.5 5,186.5 L153,186.5 Q157.5,186.5 157.5,191 L157.5,204 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"199\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BEN IsEmpty</text><circle cx=\"158\" cy=\"215\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"218\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"244\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,262 L224.5,249 Q224.5,244.5 229,244.5 L377,244.5 Q381.5,244.5 381.5,249 L381.5,262 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"257\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(BEN)</text><circle cx=\"224\" cy=\"273\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"276\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"273\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"276\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BEN .Visible</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"244\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,262 L0.5,249 Q0.5,244.5 5,244.5 L153,244.5 Q157.5,244.5 157.5,249 L157.5,262 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"257\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DAN IsEmpty</text><circle cx=\"158\" cy=\"273\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"276\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"302\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,320 L224.5,307 Q224.5,302.5 229,302.5 L377,302.5 Q381.5,302.5 381.5,307 L381.5,320 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"315\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(DAN)</text><circle cx=\"224\" cy=\"331\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"334\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"331\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"334\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DAN .Visible</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"302\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,320 L0.5,307 Q0.5,302.5 5,302.5 L153,302.5 Q157.5,302.5 157.5,307 L157.5,320 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"315\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AAA IsEmpty</text><circle cx=\"158\" cy=\"331\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"334\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"360\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,378 L224.5,365 Q224.5,360.5 229,360.5 L377,360.5 Q381.5,360.5 381.5,365 L381.5,378 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"373\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(AAA)</text><circle cx=\"224\" cy=\"389\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"392\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"389\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"392\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,192 L448.5,179 Q448.5,174.5 453,174.5 L601,174.5 Q605.5,174.5 605.5,179 L605.5,192 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AAA .Visible</text><circle cx=\"448\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"360\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,378 L0.5,365 Q0.5,360.5 5,360.5 L153,360.5 Q157.5,360.5 157.5,365 L157.5,378 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"373\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BBB IsEmpty</text><circle cx=\"158\" cy=\"389\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"392\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"418\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,436 L224.5,423 Q224.5,418.5 229,418.5 L377,418.5 Q381.5,418.5 381.5,423 L381.5,436 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"431\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not(BBB)</text><circle cx=\"224\" cy=\"447\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"450\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"447\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"450\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,250 L448.5,237 Q448.5,232.5 453,232.5 L601,232.5 Q605.5,232.5 605.5,237 L605.5,250 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BBB .Visible</text><circle cx=\"448\" cy=\"261\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"290\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,308 L448.5,295 Q448.5,290.5 453,290.5 L601,290.5 Q605.5,290.5 605.5,295 L605.5,308 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add rank BEN</text><circle cx=\"448\" cy=\"319\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"333\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"336\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"606\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"362\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,380 L448.5,367 Q448.5,362.5 453,362.5 L601,362.5 Q605.5,362.5 605.5,367 L605.5,380 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"375\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add rank DAN</text><circle cx=\"448\" cy=\"391\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"394\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"405\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"408\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"448\" cy=\"419\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"422\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"391\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"394\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"448\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,466 L448.5,453 Q448.5,448.5 453,448.5 L601,448.5 Q605.5,448.5 605.5,453 L605.5,466 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"461\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add rank AAA</text><circle cx=\"448\" cy=\"477\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"480\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"491\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"494\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"448\" cy=\"505\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"508\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"519\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"522\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"477\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"480\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"548\" width=\"158\" height=\"96\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,566 L448.5,553 Q448.5,548.5 453,548.5 L601,548.5 Q605.5,548.5 605.5,553 L605.5,566 Z\" fill=\"#5ABFB0\"/><text x=\"456\" y=\"561\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add rank BBB</text><circle cx=\"448\" cy=\"577\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"580\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"591\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"594\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"448\" cy=\"605\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"608\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"619\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"622\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"448\" cy=\"633\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"636\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><circle cx=\"606\" cy=\"577\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"580\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"187\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,205 L672.5,192 Q672.5,187.5 677,187.5 L825,187.5 Q829.5,187.5 829.5,192 L829.5,205 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"200\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"216\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"219\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"230\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"233\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"216\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"219\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"259\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,277 L672.5,264 Q672.5,259.5 677,259.5 L825,259.5 Q829.5,259.5 829.5,264 L829.5,277 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"272\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"288\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"291\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"302\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"305\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"288\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"291\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"331\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,349 L672.5,336 Q672.5,331.5 677,331.5 L825,331.5 Q829.5,331.5 829.5,336 L829.5,349 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"344\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"360\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"374\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"377\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"360\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"403\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,421 L672.5,408 Q672.5,403.5 677,403.5 L825,403.5 Q829.5,403.5 829.5,408 L829.5,421 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"416\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply</text><circle cx=\"672\" cy=\"432\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"435\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"446\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"449\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Multiplier</text><circle cx=\"830\" cy=\"432\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"435\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"159\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,177 L896.5,164 Q896.5,159.5 901,159.5 L1049,159.5 Q1053.5,159.5 1053.5,164 L1053.5,177 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"172\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"188\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"202\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"205\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"216\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"219\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"188\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"191\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"245\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,263 L896.5,250 Q896.5,245.5 901,245.5 L1049,245.5 Q1053.5,245.5 1053.5,250 L1053.5,263 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"258\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"274\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"277\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"288\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"291\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"302\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"305\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"274\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"277\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"331\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,349 L896.5,336 Q896.5,331.5 901,331.5 L1049,331.5 Q1053.5,331.5 1053.5,336 L1053.5,349 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"344\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"360\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"374\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"377\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"388\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"391\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"360\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"417\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,435 L896.5,422 Q896.5,417.5 901,417.5 L1049,417.5 Q1053.5,417.5 1053.5,422 L1053.5,435 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"430\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Subtract</text><circle cx=\"896\" cy=\"446\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"449\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"460\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"905\" y=\"463\" font-size=\"9\" fill=\"#20242c\">-</text><circle cx=\"896\" cy=\"474\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"477\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">−</text><circle cx=\"1054\" cy=\"446\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"449\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"215\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,233 L1120.5,220 Q1120.5,215.5 1125,215.5 L1273,215.5 Q1277.5,215.5 1277.5,220 L1277.5,233 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"228\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BEN .Position.Y=702</text><circle cx=\"1120\" cy=\"244\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"247\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1120\" y=\"273\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,291 L1120.5,278 Q1120.5,273.5 1125,273.5 L1273,273.5 Q1277.5,273.5 1277.5,278 L1277.5,291 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"286\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">DAN .Position.Y=503</text><circle cx=\"1120\" cy=\"302\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"305\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1120\" y=\"331\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,349 L1120.5,336 Q1120.5,331.5 1125,331.5 L1273,331.5 Q1277.5,331.5 1277.5,336 L1277.5,349 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"344\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AAA .Position.Y=304</text><circle cx=\"1120\" cy=\"360\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"363\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"1120\" y=\"389\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,407 L1120.5,394 Q1120.5,389.5 1125,389.5 L1273,389.5 Q1277.5,389.5 1277.5,394 L1277.5,407 Z\" fill=\"#8a93a6\"/><text x=\"1128\" y=\"402\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">BBB .Position.Y=105</text><circle cx=\"1120\" cy=\"418\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"421\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"418\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,436 L0.5,423 Q0.5,418.5 5,418.5 L153,418.5 Q157.5,418.5 157.5,423 L157.5,436 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"431\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value row height=199</text><circle cx=\"158\" cy=\"447\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"450\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"476\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,494 L0.5,481 Q0.5,476.5 5,476.5 L153,476.5 Q157.5,476.5 157.5,481 L157.5,494 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"489\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value top Y=1100</text><circle cx=\"158\" cy=\"505\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"508\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text></svg>"
 },
 {
  "id": "vl-31-judge-up-down-e",
  "title": "VL 31｜文字列の一部で上下（株価など）を判定して色・素材を変える",
  "title_en": "VL 31 | Judge up/down (e.g. stocks) from part of a string and change color/material",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "【適用】選ばれた色を対象マテリアルの Layer1.Colors.Diffuse へ入れる → 値の符号で色が3段階に変わる。",
  "goal_en": "[Apply] feed the chosen color to the target material's Layer1.Colors.Diffuse → the color shifts across three states by sign.",
  "overview": "流れ：元文字列 → Left String → String Value \"-\" ＋ str: String Compare → String Value＋ str: String Compare → Multiply＋ math: Add＝インデックス 0/1/2 → Input Selector → Color ×3 → 対象マテリアルの Layer1.Colors.Diffuse",
  "overview_en": "Flow: source string → Left String → String Value \"-\" ＋ str: String Compare → String Value＋ str: String Compare → Multiply＋ math: Add＝インデックス 0/1/2 → Input Selector → Color ×3 → targetマテリアルの Layer1.Colors.Diffuse",
  "svg": "<svg viewBox=\"0 0 1502 330\" width=\"1502\" height=\"330\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv31j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,117 224,117\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M382,117 C415,117 415,153 448,153\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M158,87 C303,87 303,167 448,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M158,29 C191,29 191,189 224,189\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M158,145 C191,145 191,203 224,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M606,153 C639,153 639,167 672,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M830,167 C863,167 863,167 896,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M382,189 C639,189 639,181 896,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M1054,167 C1087,167 1087,153 1120,153\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M158,203 C639,203 639,167 1120,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M158,261 C639,261 639,181 1120,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M158,319 C639,319 639,195 1120,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><path d=\"M1278,153 C1311,153 1311,174 1344,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">±値 .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"88\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,106 L224.5,93 Q224.5,88.5 229,88.5 L377,88.5 Q381.5,88.5 381.5,93 L381.5,106 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"101\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String(1)</text><circle cx=\"224\" cy=\"117\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"120\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"131\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"134\" font-size=\"9\" fill=\"#20242c\">Length</text><circle cx=\"382\" cy=\"117\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"120\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value &quot;-&quot;</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"124\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,142 L448.5,129 Q448.5,124.5 453,124.5 L601,124.5 Q605.5,124.5 605.5,129 L605.5,142 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare 下げ</text><circle cx=\"448\" cy=\"153\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"448\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"606\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"606\" cy=\"167\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"170\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"606\" cy=\"181\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"184\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"606\" cy=\"195\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"198\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value &quot;0.0%&quot;</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"160\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,178 L224.5,165 Q224.5,160.5 229,160.5 L377,160.5 Q381.5,160.5 381.5,165 L381.5,178 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"173\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare 中立</text><circle cx=\"224\" cy=\"189\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"192\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"189\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"192\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"203\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"206\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"217\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"220\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"231\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"234\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"672\" y=\"138\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,156 L672.5,143 Q672.5,138.5 677,138.5 L825,138.5 Q829.5,138.5 829.5,143 L829.5,156 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"151\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×2</text><circle cx=\"672\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"181\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"184\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"830\" cy=\"167\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"138\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,156 L896.5,143 Q896.5,138.5 901,138.5 L1049,138.5 Q1053.5,138.5 1053.5,143 L1053.5,156 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"151\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add index</text><circle cx=\"896\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"1054\" cy=\"167\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"124\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,142 L1120.5,129 Q1120.5,124.5 1125,124.5 L1273,124.5 Q1277.5,124.5 1277.5,129 L1277.5,142 Z\" fill=\"#FF8C00\"/><text x=\"1128\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"1120\" cy=\"153\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"1120\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"1120\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"1120\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[2]</text><circle cx=\"1278\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1269\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">上げ 緑</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">中立 グレー</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">下げ 赤</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1344\" y=\"145\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1344.5,163 L1344.5,150 Q1344.5,145.5 1349,145.5 L1497,145.5 Q1501.5,145.5 1501.5,150 L1501.5,163 Z\" fill=\"#8a93a6\"/><text x=\"1352\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Material Diffuse</text><circle cx=\"1344\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1353\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 31】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 元文字列（例 -0.5% / 1.2% / 0.0%）\n・[Strings] Left String（先頭1文字を抽出）\n・[Strings] String Value \"-\" ＋ str: String Compare（下げ判定 isDown）\n・[Strings] String Value（ゼロ表記 例 \"0.0%\"）＋ str: String Compare（中立判定 isFlat）\n・[Math] Multiply（isDown×2）＋ math: Add（＋isFlat）＝インデックス 0/1/2\n・[Selector] Input Selector（[0]=上げ緑 [1]=中立グレー [2]=下げ赤）\n・[Colors] Color ×3（上げ/中立/下げ）\n・[Object] 対象マテリアルの Layer1.Colors.Diffuse",
    "body_en": "[VL recipe 31]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] source string（例 -0.5% / 1.2% / 0.0%）\n・[Strings] Left String（先頭1文字を抽出）\n・[Strings] String Value \"-\" ＋ str: String Compare（下げjudge isDown）\n・[Strings] String Value（ゼロ表記 例 \"0.0%\"）＋ str: String Compare（中立judge isFlat）\n・[Math] Multiply（isDown×2）＋ math: Add（＋isFlat）＝インデックス 0/1/2\n・[Selector] Input Selector（[0]=上げ緑 [1]=中立グレー [2]=下げred）\n・[Colors] Color ×3（上げ/中立/下げ）\n・[Object] targetマテリアルの Layer1.Colors.Diffuse",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【先頭抽出】元文字列の先頭1文字を str:Left String（Length=1 をプロパティに直接入力）で取り出す。【なぜ Left String か】判定に使う符号は先頭にあり、先頭1文字なら Mid String より Left String が確実（開始位置のズレが出ない）。※Length に文字列を繋がないこと\n・【下げ判定】先頭文字を str:String Value \"-\" と str:String Compare で比べ、その Equal 出力＝1（下げ）を得る＝isDown。※必ず Equal 出力を使う（Greater/Less を繋ぐと \"-\"=\"-\" でも 0 になる）。【なぜ \"-\" 判定か】株価は下げを必ず \"-\" で出す一方、上げは \"+\" 無し（\"1.2%\"）のことが多い。\"+\" を探すと上げを取りこぼすので、\"-\" だけを確実に拾い残りを上げ扱いにするのが堅牢\n・【中立判定】元文字列を str:String Compare でゼロ表記（例 \"0.0%\"）と比べ、その Equal 出力＝1（変わらず）を得る＝isFlat。【なぜ別途か】0 は \"-\" が付かず下げ判定に入らないので、中立を独立に検出して3値化する。ゼロ表記は実機のデータ書式に合わせる\n・【インデックス化】isDown を math:Multiply で ×2 し、math:Add で isFlat を足す＝インデックス。下げ=2／中立=1／上げ=0（3つは排他）。【なぜ Multiply+Add か】排他な2つの真偽を1本の 0/1/2 に畳み込み、1入力で3択セレクタを回すため\n・【色選択】インデックスで sel:Input Selector を引き、[0]=上げ色（緑）／[1]=中立色（グレー）／[2]=下げ色（赤）の color を選ぶ",
    "body_en": "・[First char] take the first character with str:Left String (length 1). [Why Left String] the sign is at the front, and for a single leading char Left String is safer than Mid String (no start-offset drift)\n・[Down test] compare the first char to str:String Value \"-\" with str:String Compare → 1 on match = isDown. [Why test \"-\"] stocks always mark a drop with \"-\", while a rise often has no \"+\" (\"1.2%\"). Searching for \"+\" misses rises, so reliably catch \"-\" only and treat the rest as up\n・[Flat test] compare the source string to the zero form (e.g. \"0.0%\") with str:String Compare → 1 = isFlat. [Why separate] zero has no \"-\", so the down test won't catch it; detect flat independently to get three states. Match the zero form to your data\n・[Index] Multiply isDown by 2 and Add isFlat = the index. down=2 / flat=1 / up=0 (mutually exclusive). [Why Multiply+Add] fold two exclusive booleans into one 0/1/2 to drive a 3-way selector from a single input\n・[Pick color] use the index on sel:Input Selector: [0]=up (green) / [1]=flat (gray) / [2]=down (red)",
    "tip": "判定は \"-\" 基準が堅牢：上げは \"+\" が付かないことが多いので、下げ（先頭 \"-\"）だけ確実に拾い残りを上げにする。先頭符号は Left String(1) で取る（Mid String は開始位置ズレの元）。中立(±0)は \"-\" が付かず下げに入らないので、ゼロ表記との String Compare で独立に検出し、isDown×2＋isFlat で 0/1/2 のインデックスに畳む（下げ2／中立1／上げ0、排他）。色は Input Selector で3択 → Layer1.Colors.Diffuse。★String Compare は必ず Equal 出力を使う（Greater/Less を繋ぐと常に0＝下げが上げ色になる）。Multiply の Base は isDown(Equal) に接続、Left String の Length は 1 を直接入力（文字列を繋がない）。String Compare は大文字小文字・前後空白に敏感。ゼロ表記（\"0.0%\" 等）と符号位置は実機データ書式に合わせる。色でなく素材ごと差し替えたいなら Input Selector の入力を Color からマテリアルに替える。■実機（『STOCK CLR』）のゼロ表記・対象プロパティで確定。",
    "tip_en": "Testing \"-\" is the robust choice: a rise often has no \"+\", so catch the drop (leading \"-\") reliably and treat the rest as up. Take the leading sign with Left String(1) (Mid String invites start-offset drift). Flat (±0) has no \"-\" and won't fall into the down test, so detect it independently with a String Compare against the zero form, then fold isDown×2 + isFlat into a 0/1/2 index (down 2 / flat 1 / up 0, exclusive). Pick the color with Input Selector → Layer1.Colors.Diffuse. ★Use the String Compare Equal output (wiring Greater/Less makes it always 0, so a drop shows the up color). Wire Multiply's Base from isDown (Equal), and type 1 into Left String's Length (don't wire a string into it). String Compare is case/whitespace sensitive. Match the zero form (\"0.0%\" etc.) and sign position to your data. To swap whole materials instead of a color, feed materials (not Colors) into the Input Selector. ■Zero form and target property to be finalized against the real project ('STOCK CLR')."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 【適用】選ばれた色を対象マテリアルの Layer1.Colors.Diffuse へ入れる → 値の符号で色が3段階に変わる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ [Apply] feed the chosen color to the target material's Layer1.Colors.Diffuse → the color shifts across three states by sign\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 1502 330\" width=\"1502\" height=\"330\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv31e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,117 224,117\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M382,117 C415,117 415,153 448,153\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M158,87 C303,87 303,167 448,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M158,29 C191,29 191,189 224,189\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M158,145 C191,145 191,203 224,203\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M606,153 C639,153 639,167 672,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M830,167 C863,167 863,167 896,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M382,189 C639,189 639,181 896,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M1054,167 C1087,167 1087,153 1120,153\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M158,203 C639,203 639,167 1120,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M158,261 C639,261 639,181 1120,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M158,319 C639,319 639,195 1120,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><path d=\"M1278,153 C1311,153 1311,174 1344,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv31e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">±value .Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"88\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,106 L224.5,93 Q224.5,88.5 229,88.5 L377,88.5 Q381.5,88.5 381.5,93 L381.5,106 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"101\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Left String(1)</text><circle cx=\"224\" cy=\"117\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"120\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"224\" cy=\"131\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"134\" font-size=\"9\" fill=\"#20242c\">Length</text><circle cx=\"382\" cy=\"117\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"120\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value &quot;-&quot;</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"124\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,142 L448.5,129 Q448.5,124.5 453,124.5 L601,124.5 Q605.5,124.5 605.5,129 L605.5,142 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare down</text><circle cx=\"448\" cy=\"153\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"448\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"606\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"606\" cy=\"167\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"170\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"606\" cy=\"181\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"184\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"606\" cy=\"195\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"198\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value &quot;0.0%&quot;</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"160\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,178 L224.5,165 Q224.5,160.5 229,160.5 L377,160.5 Q381.5,160.5 381.5,165 L381.5,178 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"173\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Compare flat</text><circle cx=\"224\" cy=\"189\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"192\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String1</text><circle cx=\"224\" cy=\"203\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">String2</text><circle cx=\"382\" cy=\"189\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"192\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"203\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"206\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"217\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"220\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"231\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"234\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"672\" y=\"138\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,156 L672.5,143 Q672.5,138.5 677,138.5 L825,138.5 Q829.5,138.5 829.5,143 L829.5,156 Z\" fill=\"#5ABFB0\"/><text x=\"680\" y=\"151\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Multiply ×2</text><circle cx=\"672\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"672\" cy=\"181\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"681\" y=\"184\" font-size=\"9\" fill=\"#20242c\">Multiplier</text><circle cx=\"830\" cy=\"167\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"821\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"896\" y=\"138\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M896.5,156 L896.5,143 Q896.5,138.5 901,138.5 L1049,138.5 Q1053.5,138.5 1053.5,143 L1053.5,156 Z\" fill=\"#5ABFB0\"/><text x=\"904\" y=\"151\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Add index</text><circle cx=\"896\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"896\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"905\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"1054\" cy=\"167\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1045\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1120\" y=\"124\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1120.5,142 L1120.5,129 Q1120.5,124.5 1125,124.5 L1273,124.5 Q1277.5,124.5 1277.5,129 L1277.5,142 Z\" fill=\"#FF8C00\"/><text x=\"1128\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"1120\" cy=\"153\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"1120\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"1120\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"1120\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1129\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[2]</text><circle cx=\"1278\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1269\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Up green</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Flat gray</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#DF4141\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Down red</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"1344\" y=\"145\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M1344.5,163 L1344.5,150 Q1344.5,145.5 1349,145.5 L1497,145.5 Q1501.5,145.5 1501.5,150 L1501.5,163 Z\" fill=\"#8a93a6\"/><text x=\"1352\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Material Diffuse</text><circle cx=\"1344\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"1353\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-32-show-an-object-only",
  "title": "VL 32｜ある値が基準以上のときだけオブジェクトを表示する",
  "title_en": "VL 32 | Show an object only when a value is at or above a threshold",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "Out=1 は『>= 入力 ≥ Base（＝値 ≥ しきい値）』のとき（実機：3.0≥2.0 で Out=1 → 表示）。値がしきい値未満なら Out=0 で非表示。",
  "goal_en": "Out=1 when '>= input >= Base' (value >= threshold); on hardware 3.0>=2.0 → Out=1 → shown. Below threshold → Out=0 → hidden.",
  "overview": "流れ：Value → Value → Greater Than / Equal To → Quad1 の Visible",
  "overview_en": "Flow: Value → Value → Greater Than / Equal To → Quad1 の Visible",
  "svg": "<svg viewBox=\"0 0 606 98\" width=\"606\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv32j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,51 224,51\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv32j)\"/><path d=\"M158,87 C191,87 191,65 224,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv32j)\"/><path d=\"M382,51 C415,51 415,58 448,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv32j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 2.0</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 3.0</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"22\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,40 L224.5,27 Q224.5,22.5 229,22.5 L377,22.5 Q381.5,22.5 381.5,27 L381.5,40 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"35\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Greater Than/Eq To</text><circle cx=\"224\" cy=\"51\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&gt;=</text><circle cx=\"382\" cy=\"51\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"54\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,47 L448.5,34 Q448.5,29.5 453,29.5 L601,29.5 Q605.5,29.5 605.5,34 L605.5,47 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Quad1 .Visible</text><circle cx=\"448\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 32】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Math] Value（しきい値 Base 例 2.0）\n・[Math] Value（判定する値 >= 例 3.0）\n・[Logic] Greater Than / Equal To\n・[Object] Quad1 の Visible",
    "body_en": "[VL recipe 32]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Math] Value（しきいValue Base 例 2.0）\n・[Math] Value（judgeするValue >= 例 3.0）\n・[Logic] Greater Than / Equal To\n・[Object] Quad1 の Visible",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Math の Value ブロックを2つ置き、片方にしきい値(例2.0)、もう片方に判定する値(例3.0)を入れる\n・しきい値の Value を Greater Than/Equal To の Base 入力へ接続\n・判定する値の Value を >= 入力へ接続\n・Greater Than/Equal To の出力を Quad1 の Visible へ接続",
    "body_en": "・Place two Math Value blocks; put the threshold (e.g. 2.0) in one and the value to test (e.g. 3.0) in the other\n・Connect the threshold Value to Greater Than/Equal To's Base input\n・Connect the value-to-test to the >= input\n・Connect Greater Than/Equal To's output to Quad1's Visible",
    "tip": "出力先ブロックはロジックの結果に応じて『実行される/されない』が決まる。値はプロパティ欄に直接入力してもよい。■実機確認済み（検証値・要注意）：Greater Than/Eq To は『>= 入力 ≥ Base』で Out=1。実機 Base=2.0・>=側=3.0 → 3.0≥2.0 で Out=1→Quad1 表示（旧記述『2.0>=3.0 は偽→非表示』は判定方向の誤りを訂正）。",
    "tip_en": "The target block runs or not depending on the logic result. You can also type values directly in the Properties."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Out=1 は『>= 入力 ≥ Base（＝値 ≥ しきい値）』のとき（実機：3.0≥2.0 で Out=1 → 表示）。値がしきい値未満なら Out=0 で非表示\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Out=1 when '>= input >= Base' (value >= threshold); on hardware 3.0>=2.0 → Out=1 → shown. Below threshold → Out=0 → hidden\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-33-show-time-and-date",
  "title": "VL 33｜時刻・日付をテキストに表示する",
  "title_en": "VL 33 | Show time and date on text",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "Clock の日付出力を日付用テキストオブジェクトへ接続。",
  "goal_en": "Connect Clock's date output to the date text object.",
  "overview": "流れ：Clock → Text → Text",
  "overview_en": "Flow: Clock → Text → Text",
  "svg": "<svg viewBox=\"0 0 382 98\" width=\"382\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv33j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,58 C191,58 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv33j)\"/><path d=\"M158,72 C191,72 191,87 224,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv33j)\"/><rect x=\"0\" y=\"15\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,33 L0.5,20 Q0.5,15.5 5,15.5 L153,15.5 Q157.5,15.5 157.5,20 L157.5,33 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"28\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"44\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"47\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"72\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"75\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">時刻 Text</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"224\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,76 L224.5,63 Q224.5,58.5 229,58.5 L377,58.5 Q381.5,58.5 381.5,63 L381.5,76 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">日付 Text</text><circle cx=\"224\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 33】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Timer] Clock（Time / Date 出力）\n・[Object] Text（時刻用）\n・[Object] Text（日付用）",
    "body_en": "[VL recipe 33]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Timer] Clock（Time / Date 出力）\n・[Object] Text（Time用）\n・[Object] Text（Date用）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Clock ブロックを置き、Time Format / Date Format / Date Time Format で表示形式を選ぶ\n・Clock の時刻出力を時刻用テキストオブジェクトへ接続",
    "body_en": "・Place a Clock block and pick the format with Time Format / Date Format / Date Time Format\n・Connect Clock's time output to the time text object",
    "tip": "💡ネイティブ代替：Clock ウィジェットで時刻・日付を出せる（VL不要）。 時刻と日付は別々の出力。表示書式は Format リストから選択（例 HH:NN:SS / DD-MM-YY / MMM/DD/YYYY HH:NN:SS）。12時間表記も Format=「HH:NN:SS AM/PM」を選ぶだけ（VL不要）。Date Sep・Time Sep で区切り、Time Offset で時差補正もできる。■実機確認済み（検証値）：Clock.Time→時刻テキスト（例 16:02）、Clock.Date→日付テキスト（例 07/07/2026）。Format Date Time を挟まず Clock の Time/Date 出力を直結。",
    "tip_en": "💡Native alt: the Clock widget shows time/date natively (no VL). Pick the format from the Format list (e.g. HH:NN:SS / DD-MM-YY / MMM/DD/YYYY HH:NN:SS); 12-hour is just Format=\"HH:NN:SS AM/PM\". Date Sep / Time Sep set separators and Time Offset shifts the timezone. Time and date are separate outputs. Pick the display format from each Format list."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Clock の日付出力を日付用テキストオブジェクトへ接続\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect Clock's date output to the date text object\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 382 98\" width=\"382\" height=\"98\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv33e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,58 C191,58 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv33e)\"/><path d=\"M158,72 C191,72 191,87 224,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv33e)\"/><rect x=\"0\" y=\"15\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,33 L0.5,20 Q0.5,15.5 5,15.5 L153,15.5 Q157.5,15.5 157.5,20 L157.5,33 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"28\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"44\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"47\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"72\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"75\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Time Text</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"224\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,76 L224.5,63 Q224.5,58.5 229,58.5 L377,58.5 Q381.5,58.5 381.5,63 L381.5,76 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Date Text</text><circle cx=\"224\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-34-continuously-animate-an-object",
  "title": "VL 34｜オブジェクトを連続アニメーションさせる（波形）",
  "title_en": "VL 34 | Continuously animate an object (waveform)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "Clock 入力に可変値を入れると位相の進み方を外部制御できる（未接続ならシーン時間で自動進行）。",
  "goal_en": "Feed a changing value into the Clock input to drive the phase externally (if unconnected it advances on scene time).",
  "overview": "流れ：ON/OFF → Value → Waveform → 対象の Rotation.X / Y / Z など",
  "overview_en": "Flow: ON/OFF → Value → Waveform → targetの Rotation.X / Y / Z など",
  "svg": "<svg viewBox=\"0 0 606 156\" width=\"606\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv34j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,58 C191,58 191,38 224,38\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv34j)\"/><path d=\"M158,116 C191,116 191,52 224,52\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv34j)\"/><path d=\"M382,38 C415,38 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv34j)\"/><path d=\"M382,38 C415,38 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv34j)\"/><path d=\"M382,38 C415,38 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv34j)\"/><rect x=\"0\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,47 L0.5,34 Q0.5,29.5 5,29.5 L153,29.5 Q157.5,29.5 157.5,34 L157.5,47 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">ON/OFF .Text</text><circle cx=\"158\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,105 L0.5,92 Q0.5,87.5 5,87.5 L153,87.5 Q157.5,87.5 157.5,92 L157.5,105 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 180</text><circle cx=\"158\" cy=\"116\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"9\" width=\"158\" height=\"138\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,27 L224.5,14 Q224.5,9.5 229,9.5 L377,9.5 Q381.5,9.5 381.5,14 L381.5,27 Z\" fill=\"#507399\"/><text x=\"232\" y=\"22\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Waveform</text><circle cx=\"224\" cy=\"38\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"41\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Enabled</text><circle cx=\"224\" cy=\"52\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"55\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Amplitude</text><circle cx=\"224\" cy=\"66\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"69\" font-size=\"9\" fill=\"#20242c\">Scale</text><circle cx=\"224\" cy=\"80\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"83\" font-size=\"9\" fill=\"#20242c\">AmpOffset</text><circle cx=\"224\" cy=\"94\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"97\" font-size=\"9\" fill=\"#20242c\">PhaOffset</text><circle cx=\"224\" cy=\"108\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"111\" font-size=\"9\" fill=\"#20242c\">Cycle</text><circle cx=\"224\" cy=\"122\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"125\" font-size=\"9\" fill=\"#20242c\">Pause</text><circle cx=\"224\" cy=\"136\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"139\" font-size=\"9\" fill=\"#20242c\">Clock</text><circle cx=\"382\" cy=\"38\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"41\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Cube1 .Rotation.X</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Cube1 .Rotation.Y</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Cube1 .Rotation.Z</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 34】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] ON/OFF（Enabled へ 1 で有効化）\n・[Math] Value（Amplitude 例180）\n・[Generator] Waveform（Enabled / Amplitude / Cycle …）\n・[Object] 対象の Rotation.X / Y / Z など",
    "body_en": "[VL recipe 34]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] ON/OFF（Enabled へ 1 で有効化）\n・[Math] Value（Amplitude 例180）\n・[Generator] Waveform（Enabled / Amplitude / Cycle …）\n・[Object] targetの Rotation.X / Y / Z など",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Waveform ブロックを置き、Shape を選ぶ（Sine / Cosine / Triangle / Square / Sawtooth / Random）\n・Enabled 入力に ON/OFF（1）を接続してアニメを有効化\n・Amplitude（動きの大きさ。例 180）を Value で入れる。速さは Cycle で調整\n・Waveform の Out を動かしたいパラメータ（例 Cube1 の Rotation.X / Y / Z）へ接続（複数OK）",
    "body_en": "・Place a Waveform block and pick a Shape (Sine / Cosine / Triangle / Square / Sawtooth / Random)\n・Connect an ON/OFF (1) to the Enabled input to enable the animation\n・Set the motion size with a Value into Amplitude (e.g. 180); set speed with Cycle\n・Connect the Waveform Out to the parameter(s) to move, e.g. Cube1's Rotation.X / Y / Z (several OK)",
    "tip": "Enabled は on/off（1で動く）。Amplitude が振れ幅、Cycle が周期（速さ）。Out を Rotation や Position に繋ぐと連続的に揺れる/回る。Clock 入力に可変値を入れると位相を外部制御でき、未接続ならシーン時間で自動進行。Shape で波形（Sine/Triangle 等）を選ぶ。■実機確認済み（ON/OFF=1・Amplitude=180 → Cube1 Rotation.X/Y/Z）。",
    "tip_en": "Enabled is on/off (1 = running). Amplitude is the swing size, Cycle the period (speed). Wire Out to Rotation or Position to sway/rotate continuously. A changing value on the Clock input drives the phase; unconnected, it advances on scene time. Pick the waveform (Sine/Triangle etc.) with Shape. ■Verified (ON/OFF=1, Amplitude=180 → Cube1 Rotation.X/Y/Z)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Clock 入力に可変値を入れると位相の進み方を外部制御できる（未接続ならシーン時間で自動進行）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Feed a changing value into the Clock input to drive the phase externally (if unconnected it advances on scene time)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-35-auto-sort-a-sports",
  "title": "VL 35｜スポーツの順位表を数値で自動並べ替えする",
  "title_en": "VL 35 | Auto-sort a sports standings table by number",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "上級",
  "minutes": 20,
  "goal": "→ 勝点が変わると①の並びが変わり、Order 出力経由で②にも伝わって、点数・名前が一括で並び替わる。",
  "goal_en": "→ change the points and #1 re-orders; via the Order output #2 follows, re-sorting points and names together.",
  "overview": "流れ：DataLinq ×N → Sort Selector①：In 1〜In N＝各チームの勝点 → Sort Selector②：Order＝①の Order 出力／In 1〜In N＝各チーム名 → 順位表示 Text",
  "overview_en": "Flow: DataLinq ×N → Sort Selector①：In 1〜In N＝各チームの勝点 → Sort Selector②：Order＝①の Order 出力／In 1〜In N＝各チーム名 → Rank表示 Text",
  "svg": "<svg viewBox=\"0 0 830 330\" width=\"830\" height=\"330\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv35j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,167 224,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M158,87 C191,87 191,181 224,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M158,145 C191,145 191,195 224,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M382,167 C415,167 415,66 448,66\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M382,181 C415,181 415,124 448,124\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M382,195 C415,195 415,182 448,182\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M382,153 C415,153 415,240 448,240\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M158,203 C303,203 303,254 448,254\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M158,261 C303,261 303,268 448,268\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M158,319 C303,319 303,282 448,282\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M606,254 C639,254 639,116 672,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M606,268 C639,268 639,174 672,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><path d=\"M606,282 C639,282 639,232 672,232\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">勝点A=6</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">勝点B=9</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">勝点C=3</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"124\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,142 L224.5,129 Q224.5,124.5 229,124.5 L377,124.5 Q381.5,124.5 381.5,129 L381.5,142 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Sort Selector 点数</text><circle cx=\"224\" cy=\"153\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"156\" font-size=\"9\" fill=\"#20242c\">Order</text><circle cx=\"224\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 1</text><circle cx=\"224\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 2</text><circle cx=\"224\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 3</text><circle cx=\"382\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Order</text><circle cx=\"382\" cy=\"167\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 1</text><circle cx=\"382\" cy=\"181\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 2</text><circle cx=\"382\" cy=\"195\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 3</text><rect x=\"448\" y=\"37\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,55 L448.5,42 Q448.5,37.5 453,37.5 L601,37.5 Q605.5,37.5 605.5,42 L605.5,55 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"50\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO1 点数</text><circle cx=\"448\" cy=\"66\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"95\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,113 L448.5,100 Q448.5,95.5 453,95.5 L601,95.5 Q605.5,95.5 605.5,100 L605.5,113 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"108\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO2 点数</text><circle cx=\"448\" cy=\"124\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"153\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,171 L448.5,158 Q448.5,153.5 453,153.5 L601,153.5 Q605.5,153.5 605.5,158 L605.5,171 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"166\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO3 点数</text><circle cx=\"448\" cy=\"182\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"185\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">名前A=Anchors</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">名前B=Bolts</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">名前C=Comets</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"211\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,229 L448.5,216 Q448.5,211.5 453,211.5 L601,211.5 Q605.5,211.5 605.5,216 L605.5,229 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"224\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Sort Selector 名前</text><circle cx=\"448\" cy=\"240\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"243\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Order</text><circle cx=\"448\" cy=\"254\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"257\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 1</text><circle cx=\"448\" cy=\"268\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"271\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 2</text><circle cx=\"448\" cy=\"282\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"285\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 3</text><circle cx=\"606\" cy=\"240\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"243\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Order</text><circle cx=\"606\" cy=\"254\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"257\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 1</text><circle cx=\"606\" cy=\"268\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"271\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 2</text><circle cx=\"606\" cy=\"282\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"285\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 3</text><rect x=\"672\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,105 L672.5,92 Q672.5,87.5 677,87.5 L825,87.5 Q829.5,87.5 829.5,92 L829.5,105 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO1 名前</text><circle cx=\"672\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"672\" y=\"145\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,163 L672.5,150 Q672.5,145.5 677,145.5 L825,145.5 Q829.5,145.5 829.5,150 L829.5,163 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO2 名前</text><circle cx=\"672\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"672\" y=\"203\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,221 L672.5,208 Q672.5,203.5 677,203.5 L825,203.5 Q829.5,203.5 829.5,208 L829.5,221 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"216\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO3 名前</text><circle cx=\"672\" cy=\"232\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"235\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 35】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Data Src] DataLinq ×N（各チームの勝点・チーム名を1チーム1値で）\n・[Selector] Sort Selector①（点数用）：In 1〜In N＝各チームの勝点 → Out 1〜Out N＝順位別の点数\n・[Selector] Sort Selector②（名前用）：Order＝①の Order 出力／In 1〜In N＝各チーム名 → Out 1〜Out N＝順位別の名前\n・[Object] 順位表示 Text（NO1〜 の点数／名前）",
    "body_en": "[VL recipe 35]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Data Src] DataLinq ×N（各チームの勝点・チーム名を1チーム1Valueで）\n・[Selector] Sort Selector①（点数用）：In 1〜In N＝各チームの勝点 → Out 1〜Out N＝Rank別の点数\n・[Selector] Sort Selector②（名前用）：Order＝①の Order 出力／In 1〜In N＝各チーム名 → Out 1〜Out N＝Rank別の名前\n・[Object] Rank表示 Text（NO1〜 の点数／名前）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【入力】各チームの勝点・チーム名を DataLinq で用意する（1チーム＝1値。3チームなら勝点3つ・名前3つ）\n・【点数ソート】Sort Selector①（点数用）の In 1〜In N に各チームの勝点を入れる。Direction=Descending。Out 1〜Out N＝順位別の点数（Out 1＝1位）。NO1〜 の点数テキストへ別々に繋ぐ\n・【並び順を渡す】①の『Order 出力』を Sort Selector②（名前用）の『Order 入力』へ接続する。これで②は①と同じ並び順を使う。【なぜ2つ目が要るか】Sort Selector は In 1〜In N を1つの属性として並べ替える（Out N＝順位N）。点数と名前は別属性なので、名前を点数順に並べるには②に名前を入れ、順序を①から受け取る\n・【名前ソート】②の In 1〜In N に各チーム名を入れる。Out 1〜Out N＝点数順に並んだ名前。NO1〜 の名前テキストへ別々に繋ぐ",
    "body_en": "・[Inputs] prepare each team's points and name with DataLinq (one value per team; 3 teams = 3 points + 3 names)\n・[Sort points] feed each team's points into Sort Selector #1 (points) In 1..In N. Direction=Descending. Out 1..Out N = points by rank (Out 1 = 1st). Wire each to a separate NO# points text\n・[Pass the order] connect #1's 'Order output' to Sort Selector #2 (names) 'Order input'. #2 then uses the same order. [Why a 2nd selector] a Sort Selector reorders In 1..In N as one attribute (Out N = rank N). Points and names are different attributes, so to rank names by points put names in #2 and take the order from #1\n・[Sort names] feed each team's name into #2's In 1..In N. Out 1..Out N = names in points order. Wire each to a separate NO# name text",
    "tip": "★Sort Selector は『各 In N＝1エントリ（チーム）、Out N＝順位N』。1本の出力を複数行に配ると全部同じ値になるので、Out 1→1位・Out 2→2位…と別々に繋ぐ。表示する属性（点数・名前・ロゴ…）ごとに Sort Selector を1つ用意し、2つ目以降は①の『Order 出力』を『Order 入力』で受けて同じ並び順を共有する。Direction で昇順/降順（順位表は Descending）。同点タイブレークは Order のキー設計で。チーム数の増減は In/Out と表示オブジェクトを増減（表示は最大数ぶん用意）。■検証：standings_5team.csv（Anchors6/Bolts9/Comets3/Dragons7/Eagles1）で実機確認済み。",
    "tip_en": "★A Sort Selector treats 'each In N = one entry (team), Out N = rank N'. Wiring one output to many rows makes them all the same, so connect Out 1→1st, Out 2→2nd, … separately. Use one Sort Selector per displayed attribute (points, name, logo…); the 2nd and later take #1's 'Order output' into their 'Order input' to share the same ordering. Direction sets asc/desc (standings = Descending). Tie-breaks via the Order key design. Grow/shrink the roster by adding/removing In/Out and display objects (lay out the max count). ■Verified on-air with standings_5team.csv (Anchors6/Bolts9/Comets3/Dragons7/Eagles1)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ → 勝点が変わると①の並びが変わり、Order 出力経由で②にも伝わって、点数・名前が一括で並び替わる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ → change the points and #1 re-orders; via the Order output #2 follows, re-sorting points and names together\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 330\" width=\"830\" height=\"330\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv35e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,167 224,167\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M158,87 C191,87 191,181 224,181\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M158,145 C191,145 191,195 224,195\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M382,167 C415,167 415,66 448,66\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M382,181 C415,181 415,124 448,124\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M382,195 C415,195 415,182 448,182\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M382,153 C415,153 415,240 448,240\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M158,203 C303,203 303,254 448,254\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M158,261 C303,261 303,268 448,268\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M158,319 C303,319 303,282 448,282\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M606,254 C639,254 639,116 672,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M606,268 C639,268 639,174 672,174\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><path d=\"M606,282 C639,282 639,232 672,232\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv35e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Pts A=6</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Pts B=9</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Pts C=3</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"124\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,142 L224.5,129 Q224.5,124.5 229,124.5 L377,124.5 Q381.5,124.5 381.5,129 L381.5,142 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"137\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Sort Selector (pts)</text><circle cx=\"224\" cy=\"153\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"156\" font-size=\"9\" fill=\"#20242c\">Order</text><circle cx=\"224\" cy=\"167\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 1</text><circle cx=\"224\" cy=\"181\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 2</text><circle cx=\"224\" cy=\"195\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 3</text><circle cx=\"382\" cy=\"153\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"156\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Order</text><circle cx=\"382\" cy=\"167\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"170\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 1</text><circle cx=\"382\" cy=\"181\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"184\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 2</text><circle cx=\"382\" cy=\"195\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"198\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 3</text><rect x=\"448\" y=\"37\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,55 L448.5,42 Q448.5,37.5 453,37.5 L601,37.5 Q605.5,37.5 605.5,42 L605.5,55 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"50\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO1 pts</text><circle cx=\"448\" cy=\"66\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"95\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,113 L448.5,100 Q448.5,95.5 453,95.5 L601,95.5 Q605.5,95.5 605.5,100 L605.5,113 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"108\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO2 pts</text><circle cx=\"448\" cy=\"124\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"127\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"153\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,171 L448.5,158 Q448.5,153.5 453,153.5 L601,153.5 Q605.5,153.5 605.5,158 L605.5,171 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"166\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO3 pts</text><circle cx=\"448\" cy=\"182\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"185\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Name A=Anchors</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Name B=Bolts</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"290\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,308 L0.5,295 Q0.5,290.5 5,290.5 L153,290.5 Q157.5,290.5 157.5,295 L157.5,308 Z\" fill=\"#7BE1CB\"/><text x=\"8\" y=\"303\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Name C=Comets</text><circle cx=\"158\" cy=\"319\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"322\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"211\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,229 L448.5,216 Q448.5,211.5 453,211.5 L601,211.5 Q605.5,211.5 605.5,216 L605.5,229 Z\" fill=\"#FF8C00\"/><text x=\"456\" y=\"224\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Sort Selector (names)</text><circle cx=\"448\" cy=\"240\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"243\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Order</text><circle cx=\"448\" cy=\"254\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"257\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 1</text><circle cx=\"448\" cy=\"268\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"271\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 2</text><circle cx=\"448\" cy=\"282\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"285\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In 3</text><circle cx=\"606\" cy=\"240\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"243\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Order</text><circle cx=\"606\" cy=\"254\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"257\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 1</text><circle cx=\"606\" cy=\"268\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"271\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 2</text><circle cx=\"606\" cy=\"282\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"285\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out 3</text><rect x=\"672\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,105 L672.5,92 Q672.5,87.5 677,87.5 L825,87.5 Q829.5,87.5 829.5,92 L829.5,105 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO1 name</text><circle cx=\"672\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"672\" y=\"145\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,163 L672.5,150 Q672.5,145.5 677,145.5 L825,145.5 Q829.5,145.5 829.5,150 L829.5,163 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"158\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO2 name</text><circle cx=\"672\" cy=\"174\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"177\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"672\" y=\"203\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,221 L672.5,208 Q672.5,203.5 677,203.5 L825,203.5 Q829.5,203.5 829.5,208 L829.5,221 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"216\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">NO3 name</text><circle cx=\"672\" cy=\"232\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"235\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-36-inject-a-value-by",
  "title": "VL 36｜インデックス（背番号など）で値を差し込む",
  "title_en": "VL 36 | Inject a value by index (e.g. jersey number)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "オフセット基準で対応する入力値が選ばれ、出力される（offset10・Value12 なら12番の入力）。",
  "goal_en": "The matching input is picked from the offset base and output (offset 10 + Value 12 → input #12).",
  "overview": "流れ：Input Selector → Value → 出力先テキスト",
  "overview_en": "Flow: Input Selector → Value → 出力先テキスト",
  "svg": "<svg viewBox=\"0 0 606 156\" width=\"606\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv36j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,66 224,66\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv36j)\"/><path d=\"M158,87 C191,87 191,80 224,80\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv36j)\"/><path d=\"M158,145 C191,145 191,94 224,94\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv36j)\"/><path d=\"M382,66 C415,66 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv36j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value [0]</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value [1]</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"37\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,55 L224.5,42 Q224.5,37.5 229,37.5 L377,37.5 Q381.5,37.5 381.5,42 L381.5,55 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"50\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Input Selector</text><circle cx=\"224\" cy=\"66\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"224\" cy=\"80\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"83\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[0]</text><circle cx=\"224\" cy=\"94\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"97\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">[1]</text><circle cx=\"224\" cy=\"108\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"111\" font-size=\"9\" fill=\"#20242c\">[2]</text><circle cx=\"382\" cy=\"66\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"69\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 36】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Selector] Input Selector\n・[Math] Value（インデックス番号）\n・[Object] 出力先テキスト",
    "body_en": "[VL recipe 36]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Selector] Input Selector\n・[Math] Value（インデックス番号）\n・[Object] 出力先テキスト",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Input Selector を置き、Index Offset を設定（背番号が10始まりなら 10）\n・Value でインデックス番号を入力",
    "body_en": "・Place an Input Selector and set Index Offset (e.g. 10 if jerseys start at 10)\n・Enter the index number with a Value",
    "tip": "連番で管理するデータ（選手・レーン等）を番号1つで引き当てる用途に。",
    "tip_en": "For pulling data managed by consecutive numbers (players, lanes) with a single number."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ オフセット基準で対応する入力値が選ばれ、出力される（offset10・Value12 なら12番の入力）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ The matching input is picked from the offset base and output (offset 10 + Value 12 → input #12)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-37-route-one-input-to",
  "title": "VL 37｜1つの入力を条件で複数の出力先に振り分ける",
  "title_en": "VL 37 | Route one input to several outputs by condition",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "Value のインデックスで、どの出力先に値を流すかが決まる（String=Player1・Value=1 なら Text2 に出力）。",
  "goal_en": "The Value's index decides which output the value goes to (String=Player1, Value=1 → Text2).",
  "overview": "流れ：Output Selector → Value → Text ×複数",
  "overview_en": "Flow: Output Selector → Value → Text ×複数",
  "svg": "<svg viewBox=\"0 0 606 156\" width=\"606\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv37j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,58 C191,58 191,73 224,73\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv37j)\"/><path d=\"M158,116 C191,116 191,87 224,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv37j)\"/><path d=\"M382,73 C415,73 415,29 448,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv37j)\"/><path d=\"M382,87 C415,87 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv37j)\"/><path d=\"M382,101 C415,101 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv37j)\"/><rect x=\"0\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,47 L0.5,34 Q0.5,29.5 5,29.5 L153,29.5 Q157.5,29.5 157.5,34 L157.5,47 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value</text><circle cx=\"158\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,105 L0.5,92 Q0.5,87.5 5,87.5 L153,87.5 Q157.5,87.5 157.5,92 L157.5,105 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value</text><circle cx=\"158\" cy=\"116\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"224\" y=\"44\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,62 L224.5,49 Q224.5,44.5 229,44.5 L377,44.5 Q381.5,44.5 381.5,49 L381.5,62 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"57\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Output Selector</text><circle cx=\"224\" cy=\"73\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"224\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Input</text><circle cx=\"382\" cy=\"73\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">[0]</text><circle cx=\"382\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">[1]</text><circle cx=\"382\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">[2]</text><rect x=\"448\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,18 L448.5,5 Q448.5,0.5 453,0.5 L601,0.5 Q605.5,0.5 605.5,5 L605.5,18 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">[0] Text</text><circle cx=\"448\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">[1] Text</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">[2] Text</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 37】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Selector] Output Selector\n・[Math] Value（インデックス）\n・[Object] Text ×複数",
    "body_en": "[VL recipe 37]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Selector] Output Selector\n・[Math] Value（インデックス）\n・[Object] Text ×複数",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Output Selector を置き、Index Offset を設定\n・入力（String Value 等）を1つ接続\n・複数のテキストを出力側に接続",
    "body_en": "・Place an Output Selector and set Index Offset\n・Connect one input (a String Value, etc.)\n・Connect several texts on the output side",
    "tip": "Reset Inactive Outputs をオンにすると、非アクティブになった出力は空/0/null にリセットされる。",
    "tip_en": "Turn on Reset Inactive Outputs so an output that becomes inactive resets to empty/0/null."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ Value のインデックスで、どの出力先に値を流すかが決まる（String=Player1・Value=1 なら Text2 に出力）\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ The Value's index decides which output the value goes to (String=Player1, Value=1 → Text2)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-38-switch-strings-by-index",
  "title": "VL 38｜インデックスで文字列を切り替える（曜日など）",
  "title_en": "VL 38 | Switch strings by index (e.g. day of week)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "出力をテキストオブジェクトへ接続。",
  "goal_en": "Connect the output to a text object.",
  "overview": "流れ：String Selector → Value → Text",
  "overview_en": "Flow: String Selector → Value → Text",
  "svg": "<svg viewBox=\"0 0 606 54\" width=\"606\" height=\"54\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv38j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,36 C191,36 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv38j)\"/><path d=\"M382,29 C415,29 415,36 448,36\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv38j)\"/><rect x=\"0\" y=\"7\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,25 L0.5,12 Q0.5,7.5 5,7.5 L153,7.5 Q157.5,7.5 157.5,12 L157.5,25 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"20\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value</text><circle cx=\"158\" cy=\"36\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"39\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#FF8C00\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Selector</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Index</text><circle cx=\"224\" cy=\"43\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"233\" y=\"46\" font-size=\"9\" fill=\"#20242c\">[0]</text><circle cx=\"382\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Output</text><rect x=\"448\" y=\"7\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,25 L448.5,12 Q448.5,7.5 453,7.5 L601,7.5 Q605.5,7.5 605.5,12 L605.5,25 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"20\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text</text><circle cx=\"448\" cy=\"36\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"39\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 38】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Selector] String Selector\n・[Math] Value（インデックス）\n・[Object] Text",
    "body_en": "[VL recipe 38]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Selector] String Selector\n・[Math] Value（インデックス）\n・[Object] Text",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・String Selector の Item に + で候補文字列を追加（Monday, Tuesday, …）\n・Index Offset を 1 にすれば Monday=1 始まりになる\n・Value にインデックスを入力（Value=2 なら Tuesday を出力）",
    "body_en": "・Add candidate strings to String Selector's Item with + (Monday, Tuesday, …)\n・Set Index Offset to 1 so Monday starts at 1\n・Enter the index with a Value (Value=2 → Tuesday)",
    "tip": "固定の文言リストから番号で1つ選ぶ用途に最適。月名・状態ラベル等にも。",
    "tip_en": "Ideal for picking one from a fixed word list by number. Works for month names, status labels, etc."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 出力をテキストオブジェクトへ接続\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect the output to a text object\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-39-join-several-strings-fields",
  "title": "VL 39｜複数の文字列を1つに連結する",
  "title_en": "VL 39 | Join several strings/fields into one (e.g. Down & Distance)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "数値の桁揃えが要るときは Format Float / Format String と併用する。",
  "goal_en": "Pair with Format Float / Format String when you need digit alignment.",
  "overview": "流れ：object/str: 連結する部品 → String Value → Concatenate → 出力テキスト",
  "overview_en": "Flow: object/str: 連結する部品 → String Value → Concatenate → 出力テキスト",
  "svg": "<svg viewBox=\"0 0 606 156\" width=\"606\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv39j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,87 224,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv39j)\"/><path d=\"M158,145 C191,145 191,101 224,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv39j)\"/><path d=\"M158,87 C191,87 191,73 224,73\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv39j)\"/><path d=\"M382,73 C415,73 415,87 448,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv39j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Down（Base）</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value &quot;&amp;&quot;</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">distance（＋）</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"44\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,62 L224.5,49 Q224.5,44.5 229,44.5 L377,44.5 Q381.5,44.5 381.5,49 L381.5,62 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"57\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Concatenate</text><circle cx=\"224\" cy=\"73\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Delimiter</text><circle cx=\"224\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">+</text><circle cx=\"382\" cy=\"73\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,76 L448.5,63 Q448.5,58.5 453,58.5 L601,58.5 Q605.5,58.5 605.5,63 L605.5,76 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">OUT .Text</text><circle cx=\"448\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 39】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] object/str: 連結する部品（Base と ＋ に1つずつ。例 Down, distance）\n・[Strings] String Value（区切り文字 → Delimiter。例 \" & \"）\n・[Strings] Concatenate（Delimiter＋Base＋＋…）\n・[Object] 出力テキスト（例 3rd & 10）",
    "body_en": "[VL recipe 39]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] object/str: 連結する部品（Base と ＋ に1つずつ。例 Down, distance）\n・[Strings] String Value（区切り文字 → Delimiter。例 \" & \"）\n・[Strings] Concatenate（Delimiter＋Base＋＋…）\n・[Object] 出力テキスト（例 3rd & 10）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・連結したい部品を Concatenate の Base と ＋（＋ボタンで item を増やせる）に1つずつ入れる（例 Base=Down=\"3rd\" / ＋=distance=\"10\"）。【なぜ Concatenate か】複数の文字列を1つに結合する専用ブロックだから\n・区切り文字は Delimiter に入れる（例 \" & \"）。Delimiter は Base/＋ の各項目の間に自動で挟まる。【重要】区切りを部品の間に String Value で挟むのではなく、Delimiter に入れるのが正しい（公式仕様）\n・Concatenate の出力を表示テキストへ接続（例 \"3rd & 10\"）",
    "body_en": "・Put the parts to join into Concatenate's Base and + (use the + button to add items), one each (e.g. Base=Down=\"3rd\" / +=distance=\"10\"). [Why Concatenate] the block for merging several strings into one\n・Put the separator into the Delimiter (e.g. \" & \"); it is inserted automatically between the Base/+ items. [Important] don't wedge a String Value between the parts — put it in the Delimiter (official spec)\n・Connect Concatenate's output to the display text (e.g. \"3rd & 10\")",
    "tip": "区切りは Delimiter に入れると各項目の間に自動挿入される（例 Base=\"3rd\"／＋=\"10\"／Delimiter=\" & \" → \"3rd & 10\"）。item は ＋/− ボタンで増減。💡ネイティブ代替：単純な「ラベル＋値」なら DataLinq の Prepend/Append で作れる（VLなしで可）。数値の桁整形は Format Float と併用。■公式ヘルプ準拠（Strings > Concatenate）。",
    "tip_en": "Put the separator in the Delimiter and it's auto-inserted between items (e.g. Base=\"3rd\" / +=\"10\" / Delimiter=\" & \" → \"3rd & 10\"). Add/remove items with the +/- buttons. 💡Native alt: a simple 'label + value' can be built with DataLinq's Prepend/Append (no VL). Pair with Format Float to align digits. ■Per the official help (Strings > Concatenate)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 数値の桁揃えが要るときは Format Float / Format String と併用する\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Pair with Format Float / Format String when you need digit alignment\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-40-control-visibility-with-multiple",
  "title": "VL 40｜複数条件（AND/OR/NOT）で表示を制御する",
  "title_en": "VL 40 | Control visibility with multiple conditions (AND/OR/NOT)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "【定石】空判定は IsEmpty→Not（文字が入っている時だけ Visible=True）。Greater Than 等の比較ブロックの Boolean 出力とも組み合わせ可。",
  "goal_en": "[Idiom] for emptiness use IsEmpty→Not (visible only when text is present); also combine with comparison-block Boolean outputs (Greater Than, etc.).",
  "overview": "流れ：Value → And/ Or/ Not → String Compare → 各オブジェクトの Visible",
  "overview_en": "Flow: Value → And/ Or/ Not → String Compare → 各オブジェクトの Visible",
  "svg": "<svg viewBox=\"0 0 606 272\" width=\"606\" height=\"272\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv40j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,73 224,73\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M158,87 C191,87 191,87 224,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M382,73 C415,73 415,73 448,73\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M158,145 C191,145 191,145 224,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M158,203 C191,203 191,159 224,159\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M382,145 C415,145 415,145 448,145\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M158,261 C191,261 191,217 224,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><path d=\"M382,217 C415,217 415,217 448,217\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv40j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1.0</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1.0</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"44\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,62 L224.5,49 Q224.5,44.5 229,44.5 L377,44.5 Q381.5,44.5 381.5,49 L381.5,62 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"57\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">And</text><circle cx=\"224\" cy=\"73\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">And</text><circle cx=\"382\" cy=\"73\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"44\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,62 L448.5,49 Q448.5,44.5 453,44.5 L601,44.5 Q605.5,44.5 605.5,49 L605.5,62 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"57\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">And .Visible</text><circle cx=\"448\" cy=\"73\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"76\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"87\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"90\" font-size=\"9\" fill=\"#20242c\">And</text><circle cx=\"606\" cy=\"73\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"76\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 1.0</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"174\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,192 L0.5,179 Q0.5,174.5 5,174.5 L153,174.5 Q157.5,174.5 157.5,179 L157.5,192 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"187\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0.0</text><circle cx=\"158\" cy=\"203\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"206\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"116\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,134 L224.5,121 Q224.5,116.5 229,116.5 L377,116.5 Q381.5,116.5 381.5,121 L381.5,134 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Or</text><circle cx=\"224\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"159\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"162\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Or</text><circle cx=\"382\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"116\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,134 L448.5,121 Q448.5,116.5 453,116.5 L601,116.5 Q605.5,116.5 605.5,121 L605.5,134 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Or .Visible</text><circle cx=\"448\" cy=\"145\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"159\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"162\" font-size=\"9\" fill=\"#20242c\">Or</text><circle cx=\"606\" cy=\"145\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"148\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"232\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,250 L0.5,237 Q0.5,232.5 5,232.5 L153,232.5 Q157.5,232.5 157.5,237 L157.5,250 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"245\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 0.0</text><circle cx=\"158\" cy=\"261\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"264\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"188\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,206 L224.5,193 Q224.5,188.5 229,188.5 L377,188.5 Q381.5,188.5 381.5,193 L381.5,206 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"201\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not</text><circle cx=\"224\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"217\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"188\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,206 L448.5,193 Q448.5,188.5 453,188.5 L601,188.5 Q605.5,188.5 605.5,193 L605.5,206 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"201\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Not .Visible</text><circle cx=\"448\" cy=\"217\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"220\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"606\" cy=\"217\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"597\" y=\"220\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Out</text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 40】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Math] Value（Boolean 1.000/0.000＝True/False）→ 各 Logic の入力\n・[Logic] And（Base/And）/ Or（Base/Or）/ Not（In）\n・[Strings] String Compare（文字列→Boolean 変換。Equal 出力を Logic へ）\n・[Object] 各オブジェクトの Visible",
    "body_en": "[VL recipe 40]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Math] Value（Boolean 1.000/0.000＝True/False）→ 各 Logic の入力\n・[Logic] And（Base/And）/ Or（Base/Or）/ Not（In）\n・[Strings] String Compare（文字列→Boolean 変換。Equal 出力を Logic へ）\n・[Object] 各オブジェクトの Visible",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・【前提】And/Or/Not は Boolean（True/False＝1/0）専用で、文字列の内容は直接比較・認識できない。実機では Value（1.000/0.000）を各 Logic の入力に与える\n・And：Base と And が両方 True（1）のとき Out=1 → 出力先の Visible へ（実機：Value1＋Value1 → Out=1 → And.Visible=1）\n・Or：Base か Or のどちらかが True なら Out=1（実機：Value1＋Value0 → Out=1 → Or.Visible=1）\n・Not：In が True で Out=0、False で Out=1 に反転（実機：Value0 → Not → Out=1 → Not.Visible=1）\n・【文字列を条件にしたい時】String（マゼンタ）出力は Logic（パープル）の Boolean 入力に直接つながらない。まず String Compare に文字列を入れ、Equal 等の Boolean 出力を And/Or の入力へ接続（例：データが A かつ B のときだけ表示＝2つの String Compare → And）",
    "body_en": "・[Premise] And/Or/Not work on Boolean (True/False = 1/0) only; they cannot read or compare string content directly. On hardware, Value blocks (1.000/0.000) feed each Logic input\n・And: Out=1 only when both Base and And are True (hardware: Value1 + Value1 → Out=1 → And.Visible=1)\n・Or: Out=1 when either Base or Or is True (hardware: Value1 + Value0 → Out=1 → Or.Visible=1)\n・Not: inverts — In True → Out=0, In False → Out=1 (hardware: Value0 → Not → Out=1 → Not.Visible=1)\n・[To use strings as conditions] a String (magenta) output won't connect to a Logic (purple) Boolean input. First feed strings into String Compare, then wire its Equal (Boolean) output into And/Or (e.g. show only when data is A AND B = two String Compares → And)",
    "tip": "★And/Or/Not は Boolean（真偽値）を扱うブロックで、文字列の内容は直接認識できない。文字列をロジックに組み込むには String Compare で『型の変換』を行い、その Equal（黄ドット）出力を Logic の入力（緑ドット）へ繋ぐのが基本設計。エディタ上では String（マゼンタ）出力を Logic（パープル）の Boolean 入力へ直接繋げない／意図通り動かないことがある。※『Equal To』は公式資料では数値（numerical values）の一致判定として紹介されており、文字列の厳密比較には専用の String Compare を使うのが推奨。Equal To には Epsilon（丸め誤差の許容幅）があり浮動小数の一致に使う。■実機確認済み：And=Value1+Value1→Out1、Or=Value1+Value0→Out1、Not=Value0→Out1。各 Out→対象.Visible。",
    "tip_en": "★And/Or/Not operate on Boolean values and cannot read string content directly. To bring strings into logic, convert the type with String Compare and wire its Equal (yellow dot) output into the Logic input (green dot). In the editor a String (magenta) output can't be connected to a Logic (purple) Boolean input, or won't behave as intended. Note: 'Equal To' is documented for numerical values, so use the dedicated String Compare for strict string comparison. Equal To also has an Epsilon (rounding tolerance) for floating-point matches. ■Verified: And = Value1+Value1→Out1, Or = Value1+Value0→Out1, Not = Value0→Out1; each Out → target.Visible."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 【定石】空判定は IsEmpty→Not（文字が入っている時だけ Visible=True）。Greater Than 等の比較ブロックの Boolean 出力とも組み合わせ可\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ [Idiom] for emptiness use IsEmpty→Not (visible only when text is present); also combine with comparison-block Boolean outputs (Greater Than, etc.)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-41-show-a-number-formatted",
  "title": "VL 41｜数値を書式付きで表示する（小数桁・テンプレート）",
  "title_en": "VL 41 | Show a number formatted (decimals / template)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "結果をテキストオブジェクトへ接続。",
  "goal_en": "Connect the result to a text object.",
  "overview": "流れ：Value → Format Float / Format String → Text",
  "overview_en": "Flow: Value → Format Float / Format String → Text",
  "svg": "<svg viewBox=\"0 0 606 44\" width=\"606\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv41j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv41j)\"/><path d=\"M382,31 C415,31 415,31 448,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv41j)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 3.1416</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Format Float</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,20 L448.5,7 Q448.5,2.5 453,2.5 L601,2.5 Q605.5,2.5 605.5,7 L605.5,20 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Text</text><circle cx=\"448\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 41】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Math] Value（例 3.1416）\n・[Strings] Format Float / Format String\n・[Object] Text",
    "body_en": "[VL recipe 41]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Math] Value（例 3.1416）\n・[Strings] Format Float / Format String\n・[Object] Text",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Format Float で数値の小数桁などを整える\n・文言に値を差し込むなら Format String の String に %s を入れ、入力文字列で置換する",
    "body_en": "・Tidy decimals with Format Float\n・To insert a value into text, put %s in Format String's String and replace it with an input string",
    "tip": "💡ネイティブ代替：桁/書式はデータ側や DataLinq でも整えられる。 Escape Characters オプションで特殊文字を解釈できる。Concatenate と組み合わせて「単位付き表示」を作る。■実機確認済み（検証値）：Value(3.1416)→Format Float(FormatFloat(x))→Text で 3.1 表示（小数1桁）。",
    "tip_en": "💡Native alt: digits/format can also be handled at the data source or via DataLinq. The Escape Characters option interprets special characters. Pair with Concatenate to make a 'value with unit' display."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 結果をテキストオブジェクトへ接続\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Connect the result to a text object\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-42-auto-enable-word-wrap",
  "title": "VL 42｜文字数がしきい値を超えたら自動で折り返し（Word Wrap）をONにする",
  "title_en": "VL 42 | Auto-enable Word Wrap when text exceeds a length threshold",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "折り返しはネイティブの Word Wrap が担当し、Visual Logic は『いつ切り替えるか』の判断だけを持たせる。",
  "goal_en": "Native Word Wrap does the wrapping; Visual Logic only decides when to switch.",
  "overview": "流れ：名前テキスト → String Length → Value → Greater Than → String Value → Name_TXT の WordWrap.Enabled / WordWrap.Width",
  "overview_en": "Flow: 名前テキスト → String Length → Value → Greater Than → String Value → Name_TXT の WordWrap.Enabled / WordWrap.Width",
  "svg": "<svg viewBox=\"0 0 830 156\" width=\"830\" height=\"156\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv42j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,58 224,58\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv42j)\"/><path d=\"M382,58 C415,58 415,94 448,94\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv42j)\"/><path d=\"M158,87 C303,87 303,80 448,80\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv42j)\"/><path d=\"M606,80 C639,80 639,87 672,87\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv42j)\"/><path d=\"M158,145 C191,145 191,116 224,116\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv42j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Name_TXT.Text</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"29\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,47 L224.5,34 Q224.5,29.5 229,29.5 L377,29.5 Q381.5,29.5 381.5,34 L381.5,47 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"42\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Length</text><circle cx=\"224\" cy=\"58\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">In</text><circle cx=\"382\" cy=\"58\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"61\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,76 L0.5,63 Q0.5,58.5 5,58.5 L153,58.5 Q157.5,58.5 157.5,63 L157.5,76 Z\" fill=\"#5ABFB0\"/><text x=\"8\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Value 43</text><circle cx=\"158\" cy=\"87\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"51\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,69 L448.5,56 Q448.5,51.5 453,51.5 L601,51.5 Q605.5,51.5 605.5,56 L605.5,69 Z\" fill=\"#8288DD\"/><text x=\"456\" y=\"64\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Greater Than</text><circle cx=\"448\" cy=\"80\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"83\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"448\" cy=\"94\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"97\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&gt;</text><circle cx=\"606\" cy=\"80\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"83\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"116\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,134 L0.5,121 Q0.5,116.5 5,116.5 L153,116.5 Q157.5,116.5 157.5,121 L157.5,134 Z\" fill=\"#C86FC4\"/><text x=\"8\" y=\"129\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">String Value 1520</text><circle cx=\"158\" cy=\"145\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"148\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"672\" y=\"58\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,76 L672.5,63 Q672.5,58.5 677,58.5 L825,58.5 Q829.5,58.5 829.5,63 L829.5,76 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"71\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">WordWrap.Enabled</text><circle cx=\"672\" cy=\"87\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"90\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"224\" y=\"87\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,105 L224.5,92 Q224.5,87.5 229,87.5 L377,87.5 Q381.5,87.5 381.5,92 L381.5,105 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"100\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">WordWrap.Width</text><circle cx=\"224\" cy=\"116\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"119\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 42】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] 名前テキスト（Name_TXT の Text）\n・[Strings] String Length（In / Out）\n・[Math] Value（しきい値 例 43）\n・[Logic] Greater Than（Base=しきい値 / > =文字数）\n・[Strings] String Value（折り返し幅 例 1520）\n・[Object] Name_TXT の WordWrap.Enabled / WordWrap.Width",
    "body_en": "[VL recipe 42]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] 名前テキスト（Name_TXT の Text）\n・[Strings] String Length（In / Out）\n・[Math] Value（しきいValue 例 43）\n・[Logic] Greater Than（Base=しきいValue / > =文字数）\n・[Strings] String Value（折り返し幅 例 1520）\n・[Object] Name_TXT の WordWrap.Enabled / WordWrap.Width",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Name_TXT の Text を String Length の In に接続する\n・Math の Value にしきい値の文字数（実機例 43）を入れる\n・しきい値の Value を Greater Than の Base、String Length.Out を > 側に接続する（文字数>しきい値で Out=1）\n・Greater Than の出力を Name_TXT の WordWrap.Enabled に接続する（しきい値超えで折り返しON）\n・Strings の String Value（折り返し幅 実機例 1520）を WordWrap.Width に接続して幅を固定する",
    "body_en": "・Connect Name_TXT's Text to String Length's In\n・Put the character threshold (e.g. 43) into a Math Value\n・Connect the threshold Value to Greater Than's Base and String Length.Out to the > side (Out=1 when length exceeds threshold)\n・Connect Greater Than's output to Name_TXT's WordWrap.Enabled (wrap turns on past the threshold)\n・Connect a String Value (wrap width, e.g. 1520) to WordWrap.Width to fix the wrapping width",
    "tip": "切り替えのしきい値は文字数で近似する。解像度・セーフティゾーン・フォント依存なので実機で最長の名前を入れて決める。■実機確認済み（検証値）：Value(しきい値)→Greater Than.Base、String Length.Out→>。長さ>しきい値で Out=1→WordWrap.Enabled。折り返し幅は String Value→WordWrap.Width で固定。",
    "tip_en": "Approximate the threshold by character count. It depends on resolution, safe area and font, so set it on hardware with your longest name."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 折り返しはネイティブの Word Wrap が担当し、Visual Logic は『いつ切り替えるか』の判断だけを持たせる\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Native Word Wrap does the wrapping; Visual Logic only decides when to switch\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-43-zero-pad-align-a",
  "title": "VL 43｜スコアを表示用にゼロ詰め・桁揃えで整える（07 など）",
  "title_en": "VL 43 | Zero-pad / align a score for display (e.g. 07)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "数値はそのまま出さず、表示の直前で必ず整える。",
  "goal_en": "Never output the number raw; always shape it right before display.",
  "overview": "流れ：スコアの元値 → Format String → 表示テキスト",
  "overview_en": "Flow: スコアのsourceValue → Format String → 表示テキスト",
  "svg": "<svg viewBox=\"0 0 606 44\" width=\"606\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv43j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv43j)\"/><path d=\"M382,31 C415,31 415,31 448,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv43j)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">元値 Score</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Format String</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Param</text><circle cx=\"382\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,20 L448.5,7 Q448.5,2.5 453,2.5 L601,2.5 Q605.5,2.5 605.5,7 L605.5,20 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">表示 Text</text><circle cx=\"448\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 43】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] スコアの元値（SB_HomeScore など）\n・[Strings] Format String（Param / 書式）\n・[Object] 表示テキスト（SB_HomeScore_TXT の Text）",
    "body_en": "[VL recipe 43]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] スコアのsourceValue（SB_HomeScore など）\n・[Strings] Format String（Param / 書式）\n・[Object] 表示テキスト（SB_HomeScore_TXT の Text）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Visual Logic Editor に NumFormat タブを追加する（機能ごとにタブを分けると後から読める）\n・Strings の Format String を置く（Away 側も同様にもう1つ）\n・スコアの元値を Format String の Param に接続する\n・Format String の書式でゼロ詰め・桁揃え（例 07）を指定する\n・Format String の出力を SB_HomeScore_TXT の Text に接続する",
    "body_en": "・Add a NumFormat tab in the Visual Logic Editor (splitting tabs per function keeps it readable later)\n・Place a Format String (add a second one for the Away side)\n・Connect the raw score value to Format String's Param\n・Specify zero-padding / alignment (e.g. 07) in the Format String's format\n・Connect Format String's output to SB_HomeScore_TXT's Text",
    "tip": "桁数の想定（最大何点まで）とゼロ詰めの有無は競技・運用で決め、実機で桁あふれの挙動を確認する。■実機確認済み（検証値）：raw Score(7)→Format String.Param、書式 07 で Out=\"07\"→display.Text。",
    "tip_en": "Decide the digit count (max score) and whether to zero-pad per sport/operation, and check overflow behavior on hardware."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 数値はそのまま出さず、表示の直前で必ず整える\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Never output the number raw; always shape it right before display\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 606 44\" width=\"606\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv43e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv43e)\"/><path d=\"M382,31 C415,31 415,31 448,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv43e)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Raw score</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#C86FC4\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Format String</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Param</text><circle cx=\"382\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,20 L448.5,7 Q448.5,2.5 453,2.5 L601,2.5 Q605.5,2.5 605.5,7 L605.5,20 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Display Text</text><circle cx=\"448\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-44-play-an-emphasis-animation",
  "title": "VL 44｜得点が変わった瞬間に強調アニメ（Scene Director）を再生する【イベント】",
  "title_en": "VL 44 | Play an emphasis animation (Scene Director) the moment the score changes [event]",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "値が動く瞬間に表示が破綻しないか必ず確認する。",
  "goal_en": "Always check that the display doesn't break at the moment the value changes.",
  "overview": "流れ：スコアテキストの Events.OnSetText → Scene Director の ScoreMove",
  "overview_en": "Flow: スコアテキストの Events.OnSetText → Scene Director の ScoreMove",
  "svg": "<svg viewBox=\"0 0 382 44\" width=\"382\" height=\"44\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv44j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,31 C191,31 191,31 224,31\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv44j)\"/><rect x=\"0\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,20 L0.5,7 Q0.5,2.5 5,2.5 L153,2.5 Q157.5,2.5 157.5,7 L157.5,20 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">OnSetText</text><circle cx=\"158\" cy=\"31\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"2\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,20 L224.5,7 Q224.5,2.5 229,2.5 L377,2.5 Q381.5,2.5 381.5,7 L381.5,20 Z\" fill=\"#8a93a6\"/><text x=\"232\" y=\"15\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">ScoreMove.Play</text><circle cx=\"224\" cy=\"31\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"34\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 44】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] スコアテキストの Events.OnSetText（SB_HomeScore_TXT）\n・[Object] Scene Director の ScoreMove（Actions.Play）",
    "body_en": "[VL recipe 44]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] スコアテキストの Events.OnSetText（SB_HomeScore_TXT）\n・[Object] Scene Director の ScoreMove（Actions.Play）",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Scene Director に ScoreMove（数字が軽く弾む短い動き）を作り、Event(Stop) で待機させる\n・Visual Logic に PointMove タブを作る\n・SB_HomeScore_TXT の Events.OnSetText を Scene Director（ScoreMove）の Actions.Play に接続する（Away 側も同様）\n・テキストが差し替わった瞬間に強調が自動再生される",
    "body_en": "・Create ScoreMove (a short bounce on the number) in the Scene Director and hold it at an Event(Stop)\n・Create a PointMove tab in Visual Logic\n・Connect SB_HomeScore_TXT's Events.OnSetText to the Scene Director (ScoreMove) Actions.Play (same for Away)\n・The emphasis auto-plays the instant the text is replaced",
    "tip": "動画マテリアルの再生ではなく Scene Director のアニメを起点にする方式。差し替わりの一瞬の表示崩れに注意する。",
    "tip_en": "This triggers a Scene Director animation rather than playing a video material. Watch for a one-frame glitch at the swap."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 値が動く瞬間に表示が破綻しないか必ず確認する\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Always check that the display doesn't break at the moment the value changes\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-45-detect-a-tie-and",
  "title": "VL 45｜同点を判定して両方の優勢マーカーを消す（Equal To 分岐）",
  "title_en": "VL 45 | Detect a tie and hide both lead markers (Equal To branch)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "3状態（ホーム優勢・アウェイ優勢・同点）すべてで正しく出ることを確認する。",
  "goal_en": "Verify all three states (Home lead / Away lead / tie) display correctly.",
  "overview": "流れ：ホーム/アウェイのスコア → Greater Than → Smaller Than → HOME/AWAY 優勢マーカーの Visible",
  "overview_en": "Flow: ホーム/アウェイのスコア → Greater Than → Smaller Than → HOME/AWAY 優勢マーカーの Visible",
  "svg": "<svg viewBox=\"0 0 606 126\" width=\"606\" height=\"126\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv45j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,43 C191,43 191,29 224,29\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv45j)\"/><path d=\"M158,101 C191,101 191,43 224,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv45j)\"/><path d=\"M382,29 C415,29 415,101 448,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv45j)\"/><path d=\"M158,43 C191,43 191,101 224,101\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv45j)\"/><path d=\"M158,101 C191,101 191,115 224,115\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv45j)\"/><path d=\"M382,101 C415,101 415,43 448,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv45j)\"/><rect x=\"0\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,32 L0.5,19 Q0.5,14.5 5,14.5 L153,14.5 Q157.5,14.5 157.5,19 L157.5,32 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Home Score</text><circle cx=\"158\" cy=\"43\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"0\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,90 L0.5,77 Q0.5,72.5 5,72.5 L153,72.5 Q157.5,72.5 157.5,77 L157.5,90 Z\" fill=\"#8a93a6\"/><text x=\"8\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Away Score</text><circle cx=\"158\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"0\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,18 L224.5,5 Q224.5,0.5 229,0.5 L377,0.5 Q381.5,0.5 381.5,5 L381.5,18 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Greater Than</text><circle cx=\"224\" cy=\"29\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&gt;</text><circle cx=\"382\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"224\" y=\"72\" width=\"158\" height=\"54\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,90 L224.5,77 Q224.5,72.5 229,72.5 L377,72.5 Q381.5,72.5 381.5,77 L381.5,90 Z\" fill=\"#8288DD\"/><text x=\"232\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Smaller Than</text><circle cx=\"224\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Base</text><circle cx=\"224\" cy=\"115\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"118\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">&lt;</text><circle cx=\"382\" cy=\"101\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"448\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,32 L448.5,19 Q448.5,14.5 453,14.5 L601,14.5 Q605.5,14.5 605.5,19 L605.5,32 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">HOME優勢.Vis</text><circle cx=\"448\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text><rect x=\"448\" y=\"72\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,90 L448.5,77 Q448.5,72.5 453,72.5 L601,72.5 Q605.5,72.5 605.5,77 L605.5,90 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"85\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">AWAY優勢.Vis</text><circle cx=\"448\" cy=\"101\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"104\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 45】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Object] ホーム/アウェイのスコア（SB_HomeScore / SB_AwayScore）\n・[Logic] Greater Than（Base=Home, >=Away → Away>Home で AWAY優勢）\n・[Logic] Smaller Than（Base=Home, <=Away → Away<Home で HOME優勢）\n・[Object] HOME/AWAY 優勢マーカーの Visible",
    "body_en": "[VL recipe 45]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Object] ホーム/アウェイのスコア（SB_HomeScore / SB_AwayScore）\n・[Logic] Greater Than（Base=Home, >=Away → Away>Home で AWAY優勢）\n・[Logic] Smaller Than（Base=Home, <=Away → Away<Home で HOME優勢）\n・[Object] HOME/AWAY 優勢マーカーの Visible",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・両スコアを Greater Than と Smaller Than に入れる（実機はどちらも Base=HomeScore、比較側=AwayScore）\n・Smaller Than（Base=Home, < 側=Away）は Away<Home＝ホーム優勢のとき Out=1 → HOME 優勢マーカーの Visible へ\n・Greater Than（Base=Home, > 側=Away）は Away>Home＝アウェイ優勢のとき Out=1 → AWAY 優勢マーカーの Visible へ\n・同点（ホーム=アウェイ）のときは両方とも false になり、両マーカーが自動で消える（＝『両方勝ち』事故を防止。明示的な Equal To は不要）",
    "body_en": "・Feed both scores into Greater Than and Smaller Than (hardware uses Base=HomeScore and compare side=AwayScore for both)\n・Smaller Than (Base=Home, < side=Away): Out=1 when Away<Home = Home leads → HOME lead marker's Visible\n・Greater Than (Base=Home, > side=Away): Out=1 when Away>Home = Away leads → AWAY lead marker's Visible\n・On a tie (Home = Away) both are false, so both markers hide automatically (prevents the 'both winning' bug; no explicit Equal To needed)",
    "tip": "★実機は Greater Than＋Smaller Than で『各チームが厳密に勝っている時だけ優勢マーカーを出す』作り。実機の接続は両方 Base=HomeScore・比較側=AwayScore で、Smaller Than→HOME優勢、Greater Than→AWAY優勢（比較ブロックの向き：Out=1 は『比較側 > Base』＝Greater、『比較側 < Base』＝Smaller。実機検証済みの向き）。同点では両方 false になり自動で両方消えるので、明示的な Equal To 分岐は不要（タイトルの『Equal To 分岐』は名残）。同点専用表示を出したい場合の別解として Equal To（==）を足すこともできる。■実機確認済み（Home1=Away1 → 両マーカー Visible=0。スクショ準拠で出力先を訂正：Greater→AWAY／Smaller→HOME）。",
    "tip_en": "★The real build uses Greater Than + Smaller Than so each marker shows only when its team is strictly ahead. Hardware wires both with Base=HomeScore and compare side=AwayScore: Smaller Than→HOME lead, Greater Than→AWAY lead (block direction: Out=1 when 'compare side > Base' for Greater, '< Base' for Smaller). A tie makes both false, hiding both automatically — no Equal To branch is required (the 'Equal To branch' in the title is legacy). To show a tie-specific display you could add Equal To (==). ■Verified (Home 1 = Away 1 → both markers Visible=0; output targets corrected per screenshot: Greater→AWAY, Smaller→HOME)."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 3状態（ホーム優勢・アウェイ優勢・同点）すべてで正しく出ることを確認する\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Verify all three states (Home lead / Away lead / tie) display correctly\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ]
 },
 {
  "id": "vl-46-show-a-digital-clock",
  "title": "VL 46｜デジタル時計（現在時刻）を出す（Clock→Format Date Time）",
  "title_en": "VL 46 | Show a digital clock (current time) with Clock -> Format Date Time",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "初級",
  "minutes": 10,
  "goal": "時・分・秒のうち必要な桁だけ出す書式にする。",
  "goal_en": "Use a format that shows only the digits you need (hour / minute / second).",
  "overview": "流れ：Clock → Format Date Time → 表示テキストの Text",
  "overview_en": "Flow: Clock → Format Date Time → 表示テキストの Text",
  "svg": "<svg viewBox=\"0 0 606 68\" width=\"606\" height=\"68\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv46j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,43 224,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv46j)\"/><path d=\"M382,43 C415,43 415,43 448,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv46j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"43\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"46\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"57\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"60\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,32 L224.5,19 Q224.5,14.5 229,14.5 L377,14.5 Q381.5,14.5 381.5,19 L381.5,32 Z\" fill=\"#735099\"/><text x=\"232\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Format Date Time</text><circle cx=\"224\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"382\" cy=\"43\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,32 L448.5,19 Q448.5,14.5 453,14.5 L601,14.5 Q605.5,14.5 605.5,19 L605.5,32 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">表示 Text</text><circle cx=\"448\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 46】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Timer] Clock（Date Time カテゴリ）\n・[Timer] Format Date Time（表示用文字列に整形）\n・[Object] 表示テキストの Text",
    "body_en": "[VL recipe 46]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Timer] Clock（Date Time カテゴリ）\n・[Timer] Format Date Time（表示用文字列に整形）\n・[Object] 表示テキストの Text",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Scene の Visual Logic Editor を開く\n・Function Blocks > Date Time から Clock をドラッグする\n・Clock の出力を Format Date Time に接続し、表示用の文字列に整形する\n・Format Date Time の出力を表示用 Text の Text に接続する",
    "body_en": "・Open the Scene's Visual Logic Editor\n・Drag Clock from Function Blocks > Date Time\n・Connect Clock's output to Format Date Time to shape it into a display string\n・Connect Format Date Time's output to the display Text's Text",
    "tip": "現在時刻をそのまま出すだけなら Clock で足りる。カウントダウンや曜日抽出には Date Time 系ブロックを使う。",
    "tip_en": "Clock alone is enough just to show the current time. Use the Date Time blocks for countdowns or weekday extraction."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ 時・分・秒のうち必要な桁だけ出す書式にする\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Use a format that shows only the digits you need (hour / minute / second)\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 606 68\" width=\"606\" height=\"68\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv46e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,43 224,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv46e)\"/><path d=\"M382,43 C415,43 415,43 448,43\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv46e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"43\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"46\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"57\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"60\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,32 L224.5,19 Q224.5,14.5 229,14.5 L377,14.5 Q381.5,14.5 381.5,19 L381.5,32 Z\" fill=\"#735099\"/><text x=\"232\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Format Date Time</text><circle cx=\"224\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"382\" cy=\"43\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">String</text><rect x=\"448\" y=\"14\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,32 L448.5,19 Q448.5,14.5 453,14.5 L601,14.5 Q605.5,14.5 605.5,19 L605.5,32 Z\" fill=\"#8a93a6\"/><text x=\"456\" y=\"27\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Display Text</text><circle cx=\"448\" cy=\"43\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"46\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 },
 {
  "id": "vl-47-build-a-countdown-to",
  "title": "VL 47｜目標時刻までのカウントダウンを Date Time 系ブロックで作る",
  "title_en": "VL 47 | Build a countdown to a target time using Date Time blocks",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
  "cb": "recipes",
  "level": "中級",
  "minutes": 15,
  "goal": "その Days/Hours/Minutes/Seconds を Format String の Param に入れて表示文字列に整形し、Text に接続する。",
  "goal_en": "Feed those Days/Hours/Minutes/Seconds into Format String's Param inputs, shape the display string and connect it to the Text.",
  "overview": "流れ：Clock → Encode Date Time → Time Delta → Format String → 表示テキストの Text",
  "overview_en": "Flow: Clock → Encode Date Time → Time Delta → Format String → 表示テキストの Text",
  "svg": "<svg viewBox=\"0 0 830 210\" width=\"830\" height=\"210\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv47j\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,65 224,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><path d=\"M158,171 C191,171 191,79 224,79\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><path d=\"M382,65 C415,65 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><path d=\"M382,79 C415,79 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><path d=\"M382,93 C415,93 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><path d=\"M382,107 C415,107 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><path d=\"M606,93 C639,93 639,114 672,114\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47j)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"124\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#735099\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Encode Date Time</text><circle cx=\"0\" cy=\"29\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"32\" font-size=\"9\" fill=\"#20242c\">Year</text><circle cx=\"0\" cy=\"43\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"46\" font-size=\"9\" fill=\"#20242c\">Month</text><circle cx=\"0\" cy=\"57\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"60\" font-size=\"9\" fill=\"#20242c\">Day</text><circle cx=\"0\" cy=\"71\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"74\" font-size=\"9\" fill=\"#20242c\">Hours</text><circle cx=\"0\" cy=\"85\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"88\" font-size=\"9\" fill=\"#20242c\">Minutes</text><circle cx=\"0\" cy=\"99\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"102\" font-size=\"9\" fill=\"#20242c\">Seconds</text><circle cx=\"0\" cy=\"113\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"116\" font-size=\"9\" fill=\"#20242c\">Milliseconds</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><rect x=\"0\" y=\"142\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,160 L0.5,147 Q0.5,142.5 5,142.5 L153,142.5 Q157.5,142.5 157.5,147 L157.5,160 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"155\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"171\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"174\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"185\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"188\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"199\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"202\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"36\" width=\"158\" height=\"138\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,54 L224.5,41 Q224.5,36.5 229,36.5 L377,36.5 Q381.5,36.5 381.5,41 L381.5,54 Z\" fill=\"#735099\"/><text x=\"232\" y=\"49\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Time Delta</text><circle cx=\"224\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"224\" cy=\"79\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"82\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"382\" cy=\"65\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Days</text><circle cx=\"382\" cy=\"79\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"82\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Hours</text><circle cx=\"382\" cy=\"93\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"96\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Minutes</text><circle cx=\"382\" cy=\"107\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"110\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Seconds</text><circle cx=\"382\" cy=\"121\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"124\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"135\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"138\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"149\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"152\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"163\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"166\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"64\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,82 L448.5,69 Q448.5,64.5 453,64.5 L601,64.5 Q605.5,64.5 605.5,69 L605.5,82 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"77\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Format String</text><circle cx=\"448\" cy=\"93\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"96\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Param</text><circle cx=\"448\" cy=\"107\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"110\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"448\" cy=\"121\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"124\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"448\" cy=\"135\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"138\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"606\" cy=\"93\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"96\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"85\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,103 L672.5,90 Q672.5,85.5 677,85.5 L825,85.5 Q829.5,85.5 829.5,90 L829.5,103 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"98\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">CountDownTimer .Text</text><circle cx=\"672\" cy=\"114\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"117\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>",
  "steps": [
   {
    "h": "ブロックを置く",
    "h_en": "Place the blocks",
    "body": "【VLレシピ 47】\n対象オブジェクトの Visual Logic エディタを開き、次のブロックを置く：\n・[Timer] Clock（現在時刻の Date Time）\n・[Date Time] Encode Date Time（目標の年月日時刻を作る → Date Time）\n・[Date Time] Time Delta（目標 と 現在 の2つの Date Time → Days/Hours/Minutes/Seconds ほか）\n・[Strings] Format String（Days/Hours/Minutes/Seconds を Param に入れて整形）\n・[Object] 表示テキストの Text",
    "body_en": "[VL recipe 47]\nOpen the Visual Logic editor on the target object and place these blocks:\n・[Timer] Clock（現在Timeの Date Time）\n・[Date Time] Encode Date Time（目標の年月日Timeを作る → Date Time）\n・[Date Time] Time Delta（目標 と 現在 の2つの Date Time → Days/Hours/Minutes/Seconds ほか）\n・[Strings] Format String（Days/Hours/Minutes/Seconds を Param に入れて整形）\n・[Object] 表示テキストの Text",
    "tip": "ブロック名は結線図と同じものを選ぶ。カテゴリ（ヘッダー色）が探す手がかり。",
    "tip_en": "Pick exactly the blocks shown in the wiring diagram — the category header colors are your guide."
   },
   {
    "h": "結線する",
    "h_en": "Wire them up",
    "body": "・Function Blocks > Date Time の Clock で現在時刻の Date Time を取る\n・Encode Date Time（指定した年月日時刻から Date Time を作る）で目標時刻を用意する\n・Time Delta の2つの Date Time 入力に『目標(Encode)』と『現在(Clock)』を入れ、Days/Hours/Minutes/Seconds を残り時間として得る（Equal/Greater/Less/Ordinal で到達判定も可）",
    "body_en": "・Get the current time (Date Time) with Clock from Function Blocks > Date Time\n・Build the target time with Encode Date Time (create a Date Time from a given Y/M/D + time)\n・Feed the target (Encode) and current (Clock) into Time Delta's two Date Time inputs to get Days/Hours/Minutes/Seconds as the remaining time (Equal/Greater/Less/Ordinal also signal arrival)",
    "tip": "★差を取るのは『Time Delta』ブロック（『Difference』という名前のブロックは無い）。2つの Date Time（目標・現在）を入れると Days/Hours/Minutes/Seconds と Equal/Greater/Less/Ordinal が出る。整形は Format String（Param を複数）。現在時刻をそのまま出すだけなら Clock→Format Date Time で足りる。■実機確認済み（Encode 7/17 19:40 と Clock の差 → Format String → 'DAY 10 0:1:14'）。",
    "tip_en": "The block that takes the difference is 'Time Delta' (there is no block literally named 'Difference'). Two Date Times (target, current) give Days/Hours/Minutes/Seconds plus Equal/Greater/Less/Ordinal. Shape with Format String (multiple Params). Clock→Format Date Time alone is enough just to show the current time. ■Verified (Encode 7/17 19:40 vs Clock → Format String → 'DAY 10 0:1:14')."
   },
   {
    "h": "動かして確認",
    "h_en": "Run and check",
    "body": "✅ その Days/Hours/Minutes/Seconds を Format String の Param に入れて表示文字列に整形し、Text に接続する\n・値をいくつか変えて、期待どおりに変化するか確認する。",
    "body_en": "✅ Feed those Days/Hours/Minutes/Seconds into Format String's Param inputs, shape the display string and connect it to the Text\n・Change a few values and confirm the behavior matches."
   }
  ],
  "checklist": [
   "結線図と同じ接続になっている（どのポートに挿すかまで一致）",
   "値を変えて期待どおりに変化した"
  ],
  "checklist_en": [
   "Wiring matches the diagram, down to which port each line enters",
   "Changing values produced the expected result"
  ],
  "svg_en": "<svg viewBox=\"0 0 830 210\" width=\"830\" height=\"210\" style=\"height:auto\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ahv47e\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" fill=\"#6b7280\"/></marker></defs><path d=\"M158,29 C191,29 191,65 224,65\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><path d=\"M158,171 C191,171 191,79 224,79\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><path d=\"M382,65 C415,65 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><path d=\"M382,79 C415,79 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><path d=\"M382,93 C415,93 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><path d=\"M382,107 C415,107 415,93 448,93\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><path d=\"M606,93 C639,93 639,114 672,114\" fill=\"none\" stroke=\"#6b7280\" stroke-width=\"1.4\" marker-end=\"url(#ahv47e)\"/><rect x=\"0\" y=\"0\" width=\"158\" height=\"124\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,18 L0.5,5 Q0.5,0.5 5,0.5 L153,0.5 Q157.5,0.5 157.5,5 L157.5,18 Z\" fill=\"#735099\"/><text x=\"8\" y=\"13\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Encode Date Time</text><circle cx=\"0\" cy=\"29\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"32\" font-size=\"9\" fill=\"#20242c\">Year</text><circle cx=\"0\" cy=\"43\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"46\" font-size=\"9\" fill=\"#20242c\">Month</text><circle cx=\"0\" cy=\"57\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"60\" font-size=\"9\" fill=\"#20242c\">Day</text><circle cx=\"0\" cy=\"71\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"74\" font-size=\"9\" fill=\"#20242c\">Hours</text><circle cx=\"0\" cy=\"85\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"88\" font-size=\"9\" fill=\"#20242c\">Minutes</text><circle cx=\"0\" cy=\"99\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"102\" font-size=\"9\" fill=\"#20242c\">Seconds</text><circle cx=\"0\" cy=\"113\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"9\" y=\"116\" font-size=\"9\" fill=\"#20242c\">Milliseconds</text><circle cx=\"158\" cy=\"29\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"32\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><rect x=\"0\" y=\"142\" width=\"158\" height=\"68\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M0.5,160 L0.5,147 Q0.5,142.5 5,142.5 L153,142.5 Q157.5,142.5 157.5,147 L157.5,160 Z\" fill=\"#1E8865\"/><text x=\"8\" y=\"155\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Clock</text><circle cx=\"158\" cy=\"171\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"149\" y=\"174\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Date Time</text><circle cx=\"158\" cy=\"185\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"188\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Time</text><circle cx=\"158\" cy=\"199\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"149\" y=\"202\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Date</text><rect x=\"224\" y=\"36\" width=\"158\" height=\"138\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M224.5,54 L224.5,41 Q224.5,36.5 229,36.5 L377,36.5 Q381.5,36.5 381.5,41 L381.5,54 Z\" fill=\"#735099\"/><text x=\"232\" y=\"49\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Time Delta</text><circle cx=\"224\" cy=\"65\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"224\" cy=\"79\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"233\" y=\"82\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Date Time</text><circle cx=\"382\" cy=\"65\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"68\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Days</text><circle cx=\"382\" cy=\"79\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"82\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Hours</text><circle cx=\"382\" cy=\"93\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"96\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Minutes</text><circle cx=\"382\" cy=\"107\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"373\" y=\"110\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Seconds</text><circle cx=\"382\" cy=\"121\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"124\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Equal</text><circle cx=\"382\" cy=\"135\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"138\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Greater</text><circle cx=\"382\" cy=\"149\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"152\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Less</text><circle cx=\"382\" cy=\"163\" r=\"4\" fill=\"#f2c14e\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"373\" y=\"166\" font-size=\"9\" fill=\"#20242c\" text-anchor=\"end\">Ordinal</text><rect x=\"448\" y=\"64\" width=\"158\" height=\"82\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M448.5,82 L448.5,69 Q448.5,64.5 453,64.5 L601,64.5 Q605.5,64.5 605.5,69 L605.5,82 Z\" fill=\"#C86FC4\"/><text x=\"456\" y=\"77\" font-size=\"10.5\" font-weight=\"700\" fill=\"#15181f\">Format String</text><circle cx=\"448\" cy=\"93\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"457\" y=\"96\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\">Param</text><circle cx=\"448\" cy=\"107\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"110\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"448\" cy=\"121\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"124\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"448\" cy=\"135\" r=\"4\" fill=\"#5ecb7f\" stroke=\"#23262e\" stroke-width=\"1\"/><text x=\"457\" y=\"138\" font-size=\"9\" fill=\"#20242c\"></text><circle cx=\"606\" cy=\"93\" r=\"5.5\" fill=\"#ff8c00\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"597\" y=\"96\" font-size=\"9\" font-weight=\"700\" fill=\"#a63a00\" text-anchor=\"end\">Out</text><rect x=\"672\" y=\"85\" width=\"158\" height=\"40\" rx=\"5\" fill=\"#cfd3db\" stroke=\"#23262e\"/><path d=\"M672.5,103 L672.5,90 Q672.5,85.5 677,85.5 L825,85.5 Q829.5,85.5 829.5,90 L829.5,103 Z\" fill=\"#8a93a6\"/><text x=\"680\" y=\"98\" font-size=\"10.5\" font-weight=\"700\" fill=\"#ffffff\">Display Text</text><circle cx=\"672\" cy=\"114\" r=\"5.5\" fill=\"#2fa85a\" stroke=\"#23262e\" stroke-width=\"1.6\"/><text x=\"681\" y=\"117\" font-size=\"9\" font-weight=\"700\" fill=\"#166b38\"></text></svg>"
 }
];
