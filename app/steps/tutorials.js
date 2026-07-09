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
    "id": "transition",
    "title": "Transitionで出入りを設計する",
    "subtitle": "Transition Logic（Scene Director＋Animation Controller）で出入りとback-to-backを作る",
    "srcVol": 3,
    "srcChap": "第8章",
    "level": "中級",
    "minutes": 25,
    "goal": "Transition Logic を使い、ローワーサード等を『左からスライドインして定位置で静止、Take Off で抜ける』ように実際に作る。Scene Director で Ctrl+K のキーフレームを打って In と Out を作り、Default Frame Marker（静止位置）と Preview Frame を設定。同じ Layer に並べれば back-to-back で自動入替。作った TL ルールは保存・再呼び出しでき、決めた尺＋Transition Out 付きで書き出せる。例は 1920×1080・30fps、frame 0→10（In）→10 静止→10→20（Out）。",
    "goalImg": "v3_91_001.jpg",
    "overview": "Transition Logic（TL）は、複数のグラフィック（テロップ・ロゴ等）が独立して動いても互いに衝突しないよう自動制御し、表示順に関係なくシームレスに遷移させる仕組み（例：ロゴ表示中に下部テロップを出すとロゴが自動で上へ避け、テロップを消すと元へ戻る）。手動操作ではなくロジックに自動計算させるのが要点。基本の流れ：Scene Director を作る→Animation Controller を Track に用意（Track1は既定で1つ、2つ目以降は Add Clip で追加）→In（入る）/Out（出る）のアニメをキーフレームで作る→Default Frame Marker・Preview Frame を設定→back-to-back で連続送出→TLルールを保存・再呼び出し→決めた尺＋Transition Out で書き出す。",
    "steps": [
      {
        "h": "素材を用意して Scene Director を開く",
        "body": "① まず動かす素材を用意する。例：ローワーサードのテキスト＋背景を Group『GR_Lower』に1つにまとめる（グループごと動かすと崩れにくい）\n② Animation メニュー > Scene Director を開く。Scene Director ウィンドウが開き、Track 1 に既定の Animation Controller が1つ入っている\n③ タイムラインの長さとフレームレートを確認する（この例では 0〜20フレーム／30fps。ここに In→静止→Out を1本で作る）\n\n✅ 確認：Scene Director が開き、Track 1 に Animation Controller が1つある。",
        "img": "v3_91_002.jpg",
        "h_en": "Prepare the asset and open the Scene Director",
        "body_en": "① First prepare what will move. E.g. bundle the lower-third text + background into one Group 'GR_Lower' (moving the whole group is more robust)\n② Open Animation menu > Scene Director. The window opens with one default Animation Controller on Track 1\n③ Check the timeline length and frame rate (here 0–20 frames / 30fps; you'll build In→hold→Out on this one timeline)\n\n✅ Check: The Scene Director is open with one Animation Controller on Track 1."
      },
      {
        "h": "Animation Controller を Track に用意する（既定＋追加は Add Clip）",
        "body": "① Scene Director を新規作成すると Track 1 には既定の Animation Controller が1つ入っている。今回は1系統なのでこの Track 1 をそのまま使う\n② 別々に動かす系統が増えたら Add Track で空トラックを足し、右クリック→Add Clip > Animation Controller で手動で載せる（★空トラックには自動では入らない）\n③ 1つの Track＝1グループのアニメ。動かす対象（GR_Lower）のキーフレーム（Ctrl+K）はこの Animation Controller に打つ\n\n✅ 確認：GR_Lower を動かす Animation Controller が Track 1 に載っている。",
        "img": "v3_91_003.jpg",
        "h_en": "Set up Animation Controllers on the Scene Director tracks (default + Add Clip)",
        "body_en": "① A newly created Scene Director already has one default Animation Controller on Track 1\n② For more motion, Add Track (empty) and right-click → Add Clip > Animation Controller to place one (★empty tracks don't get one automatically)\n③ One Track = one group of animation; keyframe (Ctrl+K) the objects on this Animation Controller\n\n✅ Check: You have the Animation Controllers you need on the Scene Director's tracks."
      },
      {
        "h": "In（入り）をキーフレームで作る（frame 0→10）",
        "body": "① 再生スライダー（Playout Slider）を frame 0 に置く。GR_Lower を画面外へ動かす（例 Position.X = -1920 ＝左の外）。Ctrl+K → Set Keyframe ダイアログで Position にチェック → Set & Close\n② スライダーを frame 10 に進める。GR_Lower を定位置（例 Position.X = 0）に戻す。もう一度 Ctrl+K で Position キーを打つ\n③ Scene Director の再生で 0→10 に左からスライドインするか確認\n※値は解像度・レイアウト依存。X移動の代わりに Alpha 0→255 のフェード、Scale 0→1 で出す等も同じ手順（Set Keyframe で対応する属性にチェック）\n\n✅ 確認：frame 0→10 で GR_Lower が画面内へ入ってくる。",
        "img": "v3_91_004.jpg",
        "h_en": "Keyframe the In (frame 0→10)",
        "body_en": "① Put the Playout Slider at frame 0. Move GR_Lower off-screen (e.g. Position.X = -1920, off the left). Ctrl+K → in the Set Keyframe dialog check Position → Set & Close\n② Advance the slider to frame 10. Return GR_Lower to its rest position (e.g. Position.X = 0). Ctrl+K again for a Position key\n③ Play in the Scene Director to check the left slide-in over 0→10\n※Values depend on resolution/layout. Instead of X, an Alpha 0→255 fade or Scale 0→1 works the same way (check the matching attribute in Set Keyframe)\n\n✅ Check: GR_Lower enters the frame over frame 0→10."
      },
      {
        "h": "Default Frame Marker と Preview Frame を設定する",
        "body": "① 定位置フレーム（この例では frame 10）に Default Frame Marker を置く。Take するとアニメがここまで再生されて静止＝オンエア状態になる\n② Preview Frame を、プレビューに出したいフレーム（同じく frame 10 の完成形）に設定する\n③ これで『Take すると In が再生され、Default Frame Marker で止まる』という登場の動きが確定する\n\n✅ 確認：Take で frame 10（定位置）に止まり、プレビューが完成形を映す。",
        "img": "v3_91_005.jpg",
        "tip": "Default Frame Marker＝オンエアの静止フレーム（Take はここで止まる）、Preview Frame＝プレビュー用フレーム。In の終わり＝定位置に Default Frame Marker を置くのが基本。",
        "tip_en": "Default Frame Marker = the on-air resting frame (a Take stops here); Preview Frame = the frame for preview. Put the Default Frame Marker at the end of the In (the rest position).",
        "h_en": "Set the Default Frame Marker and Preview Frame",
        "body_en": "① Put the Default Frame Marker at the rest frame (here frame 10). A Take plays the animation up to here and holds = the on-air state\n② Set the Preview Frame to the frame you want in preview (also the finished look at frame 10)\n③ This locks in the entrance: 'a Take plays the In and stops at the Default Frame Marker'\n\n✅ Check: A Take rests at frame 10 and preview shows the finished look."
      },
      {
        "h": "Out（抜け）を作る（frame 10→20）",
        "body": "① スライダーを定位置（frame 10）に置く（ここは既にキーがある）。次にスライダーを frame 20 へ進め、GR_Lower を画面外へ（例 Position.X = 1920 で右へ抜ける／または -1920 で来た方へ戻す）。Ctrl+K で Position キーを打つ\n② これで 0→10（In）→10 静止→10→20（Out）が1本のタイムラインに揃う。Take On で In＋静止、Take Off（または次を Take）で Default Frame Marker から先＝Out が再生される\n\n✅ 確認：In → 定位置 → Out が1本でつながって再生できる。",
        "img": "v3_91_006.jpg",
        "tip": "Out を作らないと本番で消え方が読めない。定位置（Default Frame Marker）を境に In と Out を対で用意する。左から入れて左へ戻す／右へ抜く は演出で選ぶ。",
        "tip_en": "Without an Out, on-air removal is unpredictable. Build In and Out as a pair around the rest (Default Frame Marker). Return the way it came, or exit the other side — your call.",
        "h_en": "Build the Out (frame 10→20)",
        "body_en": "① Put the slider at the rest frame (frame 10; a key is already here). Advance to frame 20 and move GR_Lower off-screen (e.g. Position.X = 1920 to exit right, or -1920 to return the way it came). Ctrl+K for a Position key\n② Now one timeline holds 0→10 (In) → 10 hold → 10→20 (Out). Take On plays In + hold; Take Off (or taking the next) plays from the Default Frame Marker onward = the Out\n\n✅ Check: In → rest → Out plays through on one timeline."
      },
      {
        "h": "Back-to-Back（連続送出）にする",
        "body": "① 入れ替えたいシーン同士を同じ Layer（同じ Framebuffer）に割り当てる。Sequencer に Take Item として並べ、順に Take していく\n② 同じ Layer 上で次の Scene を Take すると、現在の Scene が自動で Out、新しい Scene が In する＝Transition Logic による back-to-back（手前で In/Out を手打ちしなくてよい）\n③ TLの要点は『衝突回避の自動計算』：例えばロゴ表示中に下部テロップを Take するとロゴが自動で上へ避け、テロップを消すとロゴが元位置へ戻る。表示順に関係なく破綻しない\n④ スコアや情報の連続更新でも毎回きれいに入れ替わる。重なり順（Layer／Framebuffer）を揃えておく\n\n✅ 確認：Sequencer で連続 Take すると前が抜けて次が入り、共存時は互いに避け合う。",
        "img": "v3_91_007.jpg",
        "h_en": "Make it back-to-back (continuous playout)",
        "body_en": "① Assign the scenes you want to swap to the same Layer (same Framebuffer). Line them up as Take Items in the Sequencer and Take them in turn\n② On that same Layer, taking the next Scene makes the current one Out and the new one In automatically — back-to-back via Transition Logic (no need to hand-key In/Out at the point of use)\n③ The core of TL is auto-calculated collision avoidance: e.g. with a logo up, taking a lower-third makes the logo move up to make room, and removing the lower-third returns it — no breakage regardless of order\n④ Continuous score/info updates swap cleanly each time; keep the stacking order (Layer / Framebuffer) aligned\n\n✅ Check: Consecutive Takes in the Sequencer swap in/out, and coexisting graphics move aside for each other."
      },
      {
        "h": "TLルールを保存・再呼び出しする（Save & Recall）",
        "body": "作った Transition Logic は保存でき、別 Scene へ再呼び出しして同じ挙動を使い回せる（XPression 10.0以降）。\n① ルール設定済みの Scene を Object Manager で開く\n② Transition Logic タブの「保存（フロッピーディスク）」アイコンをクリックし、名前を付けてロジックファイルとして保存\n③ 適用したい別 Scene（未設定）を選択し、「Load transition logic from file」で保存ファイルを読み込むと全ルールが即反映\n\n✅ 確認：保存した TL ルールが別 Scene に適用できる。",
        "img": "v3_91_008.jpg",
        "tip": "番組テンプレートで出入りを統一したいときに有効。XPression 10.0以降の機能。",
        "tip_en": "Handy for standardizing ins/outs across a show template. A 10.0+ feature.",
        "h_en": "Save and recall TL rules",
        "body_en": "Transition Logic can be saved and recalled onto another Scene to reuse the same behavior (XPression 10.0+).\n① Open the Scene that already has rules in the Object Manager\n② In the Transition Logic tab, click the Save (floppy disk) icon and save it as a named logic file\n③ Select the target Scene (without rules) and click \"Load transition logic from file\" to load the saved file — all rules apply instantly\n\n✅ Check: Saved TL rules apply to another Scene."
      },
      {
        "h": "決めた尺で Transition Out 付きに書き出す＋本番前チェック",
        "body": "オフライン編集用に、指定フレーム数でイン／アウトを完結させた動画を書き出せる。\n① Sequencer で書き出したいアイテム（テロップ等）を右クリック\n② 「Export take item to video」を選択\n③ 書き出しファイル名を指定\n④ 編集者の要求に合わせて必要なフレーム数（デュレーション）を指定\n⑤ TL に基づくアウト・トランジションが自動計算されるので、そのまま Export でレンダリング\n本番前チェック：In→定位置→Out がつながるか／back-to-back で破綻しないか／重なり順（Layer／Framebuffer）が意図どおりか\n\n✅ 確認：指定尺＋Out付きの動画が書き出せ、出入りが破綻しない。",
        "img": "v3_91_009.jpg",
        "h_en": "Export with a transition out at a set duration + pre-show check",
        "body_en": "For offline editing, export a video that completes its in/out within a set frame count.\n① Right-click the item to export (e.g. a lower-third) in the Sequencer\n② Choose \"Export take item to video\"\n③ Specify the output filename\n④ Specify the frame count (duration) the editor requires\n⑤ The out-transition is auto-calculated from TL, so click Export to render\nPre-show check: In → rest → Out connects / back-to-back holds / stacking order (Layer/Framebuffer) is right\n\n✅ Check: A set-duration video with the out exports and the ins/outs don't break."
      }
    ],
    "checklist": [
      "Scene Director を作り、Animation Controller を作って Track に載せた",
      "In（フレームバッファへ入る）と Out（出る）のアニメを作った",
      "Default Frame Marker と Preview Frame を設定した",
      "back-to-back で連続送出できる（重なり順を揃えた）",
      "TLルールを保存・再呼び出しできる",
      "決めた尺＋Transition Out で書き出せる"
    ],
    "title_en": "Design Ins and Outs with Transition",
    "subtitle_en": "Build ins/outs and back-to-back with Transition Logic (Scene Director + Animation Controllers)",
    "goal_en": "Use Transition Logic to actually build a lower third that slides in from the left, rests in place, and exits on Take Off. Keyframe In and Out in the Scene Director with Ctrl+K, and set the Default Frame Marker (rest position) and Preview Frame. Lay scenes on the same Layer for back-to-back auto-swaps. The TL rules can be saved/recalled, and scenes exported at a defined duration with a transition out. Example: 1920×1080, 30fps, frame 0→10 (In) → 10 hold → 10→20 (Out).",
    "overview_en": "Transition Logic (TL) automatically keeps independently-animating graphics (lower-thirds, logos, etc.) from colliding, so they transition seamlessly regardless of show order (e.g. with a logo up, taking a lower-third makes the logo move up to make room, and removing the lower-third returns it). The point is letting logic auto-calculate instead of manual operation. Flow: create a Scene Director → set up Animation Controllers on tracks (Track 1 has a default one; add more with Add Clip) → keyframe the In (enter) and Out (leave) animations → set the Default Frame Marker and Preview Frame → play back-to-back → save/recall the TL rules → export at a defined duration with a transition out.",
    "checklist_en": [
      "Created a Scene Director and placed an Animation Controller on a Track",
      "Built the In (into the frame buffer) and Out animations",
      "Set the Default Frame Marker and Preview Frame",
      "Back-to-back continuous playout works (stacking order aligned)",
      "Can save and recall the TL rules",
      "Can export at a defined duration with a transition out"
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
  }
];
