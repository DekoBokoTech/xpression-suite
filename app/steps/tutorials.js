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
  "id": "script-01-textcopy",
  "title": "Script 01｜別テキストの値をコピー",
  "title_en": "Script 01 | Copy another text object's value",
  "subtitle": "OnSetTextで別のテキストへ自動反映（Cookbook Script（シーン内）より）",
  "subtitle_en": "Auto-mirror text with OnSetText (from Cookbook Script in-scene recipes)",
  "srcVol": 6,
  "srcChap": "Cookbook Script",
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
  "id": "vl-01-trim-trailing-characters-show",
  "title": "VL 01｜文字列の右端の余分な文字を消す（左からN桁だけ表示）",
  "title_en": "VL 01 | Trim trailing characters (show only N from the left)",
  "srcVol": 6,
  "srcChap": "Cookbook VL",
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
 }
];
