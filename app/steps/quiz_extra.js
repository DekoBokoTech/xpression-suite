/* =====================================================================
   XPression 学習ノート — 追加クイズ（手作りの良問）
   ここに問題を足すと、クイズに合流します（正解は必ず先頭= answer:0 で書く。
   アプリ側が選択肢をシャッフルして出題するので、位置の偏りは出ません）。
   1問 = { vol, topic, q, choices:[正解, ダミー, ダミー, ダミー], answer:0, explain }
   vol は絞り込み用の巻番号。explain は答え合わせ後に表示。
   ===================================================================== */
window.QUIZ_EXTRA = [
  {
    "vol": 4,
    "topic": "ローワーサードの幅",
    "q": "ローワーサードで、名前の長さによる「幅が壊れる」問題はどこで解くのが正解？",
    "choices": [
      "XPressionのネイティブ機能（Auto Squeeze / Auto Scale / Character Limits）",
      "Visual Logicで幅を計算する",
      "DataLinqで制御する",
      "Materialで調整する"
    ],
    "answer": 0,
    "explain": "幅はネイティブ機能で解決するのが最優先。Auto Squeezeは「絶対にはみ出さない」ための最も安全なガードレール。Visual Logicは判断が要る所だけに絞る。（第4巻 第12章）",
    "q_en": "In a lower third, where should the \"width breaks with long names\" problem be solved?",
    "choices_en": [
      "XPression's native features (Auto Squeeze / Auto Scale / Character Limits)",
      "Calculate the width in Visual Logic",
      "Control it with DataLinq",
      "Adjust it with Materials"
    ],
    "explain_en": "Solve width with native features first. Auto Squeeze is the safest guardrail that guarantees text never overflows. Keep Visual Logic only where judgment is needed. (Vol.4, Ch.12)"
  },
  {
    "vol": 4,
    "topic": "スコアの同点",
    "q": "スコアボードで「同点」の分岐を最初から入れておかないと、起こりやすい事故は？",
    "choices": [
      "両方が勝っているように見える",
      "スコアが消える",
      "色が反転する",
      "クロックが止まる"
    ],
    "answer": 0,
    "explain": "同点を放置すると両方のリード強調が出て「両方勝ち」に見える。最初から分岐を入れる。（第4巻 第13章）",
    "q_en": "On a scoreboard, what accident is likely if you don't build the \"tie\" branch in from the start?",
    "choices_en": [
      "Both teams look like they're winning",
      "The score disappears",
      "Colors get inverted",
      "The clock stops"
    ],
    "explain_en": "If ties are ignored, both lead highlights turn on and it looks like both teams are winning. Build the branch in from the start. (Vol.4, Ch.13)"
  },
  {
    "vol": 4,
    "topic": "差し替えの反映",
    "q": "送出中にテキストを差し替えたとき、オンエアに反映されるのはいつ？",
    "choices": [
      "再TAKEのタイミング",
      "入力した瞬間",
      "プレビューが更新された時",
      "自動で即時反映"
    ],
    "answer": 0,
    "explain": "プレビューは即更新されるが、オンエア反映は再TAKEのとき。差し替え→プレビュー確認→再TAKEの順で。（第4巻 第12章）",
    "q_en": "When you replace text during playout, when does it reach the on-air output?",
    "choices_en": [
      "On the next TAKE",
      "The instant you type it",
      "When the preview updates",
      "Automatically, immediately"
    ],
    "explain_en": "The preview updates immediately, but on-air updates on re-TAKE. Replace → check preview → re-TAKE. (Vol.4, Ch.12)"
  },
  {
    "vol": 1,
    "topic": "出す・消す",
    "q": "Sceneを安定して出す・消すための基本操作は？",
    "choices": [
      "Take（+）でオンエア、Offline（−）で消す",
      "毎回Visibleを手で切り替える",
      "ファイルを開閉する",
      "DataLinqで制御する"
    ],
    "answer": 0,
    "explain": "送出はTake、消すのはOffline（RossTalkならTAKE / SEQO）。（第1巻・第4巻）",
    "q_en": "What is the basic operation for reliably taking Scenes on and off air?",
    "choices_en": [
      "Take (+) for on air, Offline (−) to remove",
      "Toggle Visible by hand every time",
      "Open and close the file",
      "Control it with DataLinq"
    ],
    "explain_en": "Playout is Take; removal is Offline (TAKE / SEQO via RossTalk). (Vol.1 & Vol.4)"
  },
  {
    "vol": 4,
    "topic": "色は値で持つ",
    "q": "チームごとに色を出し分けやすくするには、色をどう持たせるのが良い？",
    "choices": [
      "見た目ではなく値として持たせる",
      "毎回手で塗り替える",
      "画像に焼き込む",
      "Materialを都度複製する"
    ],
    "answer": 0,
    "explain": "色を値として持たせると、選択に応じて流し込め、差し替えが楽で壊れにくい。（第4巻 第10章）",
    "q_en": "To make per-team colors easy to switch, how should colors be held?",
    "choices_en": [
      "As values, not as looks",
      "Repaint by hand every time",
      "Bake them into images",
      "Duplicate the Material each time"
    ],
    "explain_en": "Holding colors as values lets you feed them by selection — easy to swap and hard to break. (Vol.4, Ch.10)"
  },
  {
    "vol": 4,
    "topic": "背景の追従",
    "q": "Auto Scaleで背景を名前の詰まりに追従させるとき、背景はどこに置く？",
    "choices": [
      "名前Text Objectの最初の子（First Child）",
      "別のScene",
      "親の親の階層",
      "Sequencer"
    ],
    "answer": 0,
    "explain": "背景を子に持たせ Auto Scale（Target=First Child）にすると、親の詰まりに追従する。VLで幅計算は不要。（第4巻 第12章）",
    "q_en": "With Auto Scale making a background follow a squeezed name, where does the background go?",
    "choices_en": [
      "As the first child of the name Text Object (Target=First Child)",
      "In a separate Scene",
      "Two levels up the hierarchy",
      "In the Sequencer"
    ],
    "explain_en": "Make the background a child with Auto Scale (Target=First Child) and it follows the parent's squeeze. No VL width math needed. (Vol.4, Ch.12)"
  },
  {
    "vol": 4,
    "topic": "収まると読める",
    "q": "「収まる」と「読める」は別、という場面でVisual Logicが担当するのは？",
    "choices": [
      "どこで見せ方を切り替えるかの判断",
      "折り返しの実行そのもの",
      "文字の描画",
      "送出"
    ],
    "answer": 0,
    "explain": "折り返しはネイティブのWord Wrapが担当。VLは「どこで切り替えるか」の判断だけを持つ。（第4巻 第12章）",
    "q_en": "\"Fits\" and \"reads\" are different things — what part does Visual Logic own?",
    "choices_en": [
      "The decision of where to switch the presentation",
      "The actual line wrapping",
      "Drawing the characters",
      "Playout"
    ],
    "explain_en": "Native Word Wrap does the wrapping. VL only owns the decision of where to switch. (Vol.4, Ch.12)"
  },
  {
    "vol": 5,
    "topic": "つながる≠運用",
    "q": "DataLinqで「つながること」と「安定して運用できること」の関係は？",
    "choices": [
      "別物として設計する必要がある",
      "同じこと",
      "つながれば運用も自動で安定する",
      "運用は考えなくてよい"
    ],
    "answer": 0,
    "explain": "接続できることと安定運用は別。自動化しすぎると逆に現場が苦しくなる。（第5巻）",
    "q_en": "With DataLinq, what is the relationship between \"it connects\" and \"it runs stably\"?",
    "choices_en": [
      "They must be designed as separate things",
      "They are the same thing",
      "If it connects, stability is automatic",
      "Operation doesn't need thought"
    ],
    "explain_en": "Connecting and stable operation are different. Over-automation can make life harder on site. (Vol.5)"
  },
  {
    "vol": 5,
    "topic": "型を整える",
    "q": "外部データを表示につなぐ直前にやるべきことは？",
    "choices": [
      "数値か文字列かの型を整える（Format）",
      "色を変える",
      "画像を圧縮する",
      "並べ替える"
    ],
    "answer": 0,
    "explain": "見た目が数字でも数値として扱えるとは限らない。表示の直前で型を整える。（第4巻 第6章・第5巻）",
    "q_en": "What should you do right before wiring external data to a display?",
    "choices_en": [
      "Fix the type — number vs. string (Format)",
      "Change the color",
      "Compress the images",
      "Sort the data"
    ],
    "explain_en": "Looking like a number doesn't mean it can be treated as one. Fix the type right before display. (Vol.4 Ch.6, Vol.5)"
  },
  {
    "vol": 6,
    "topic": "出ない時",
    "q": "本番で「出ない」とき、まず疑うべきなのは？",
    "choices": [
      "FramebufferやLayerの指定違い",
      "フォントの種類",
      "文字色",
      "アニメの秒数"
    ],
    "answer": 0,
    "explain": "Take Item化していても送り先の指定ミスで出ないことが多い。まずFB/Layerを疑う。（第1巻・第6巻）",
    "q_en": "When something \"doesn't appear\" during a show, what do you suspect first?",
    "choices_en": [
      "Wrong Framebuffer or Layer target",
      "The font family",
      "The text color",
      "The animation duration"
    ],
    "explain_en": "Even with proper Take Items, a wrong destination is a common cause. Check FB/Layer first. (Vol.1 & Vol.6)"
  },
  {
    "vol": 6,
    "topic": "トラブル切り分け",
    "q": "トラブル時、Sceneのほかに見るべき場所は？",
    "choices": [
      "Hardware Setup",
      "Object Libraryだけ",
      "Sequencerだけ",
      "Material Editorだけ"
    ],
    "answer": 0,
    "explain": "原因がシーン側とは限らない。ハード側も切り分け対象にする。（第6巻）",
    "q_en": "During trouble, what should you check besides the Scene?",
    "choices_en": [
      "Hardware Setup",
      "Only the Object Library",
      "Only the Sequencer",
      "Only the Material Editor"
    ],
    "explain_en": "The cause isn't always the scene. Include the hardware side in your isolation. (Vol.6)"
  },
  {
    "vol": 6,
    "topic": "RossTalk TAKE",
    "q": "RossTalkの TAKE コマンドは何をする？",
    "choices": [
      "指定フレームバッファ／レイヤーにオンエアする",
      "シーンを削除する",
      "色を変える",
      "データを更新する"
    ],
    "answer": 0,
    "explain": "TAKE takeid:buffer:layer で Take Item をオンエア。（第6巻）",
    "q_en": "What does the RossTalk TAKE command do?",
    "choices_en": [
      "Puts a Take Item on air on the given framebuffer/layer",
      "Deletes the scene",
      "Changes colors",
      "Updates data"
    ],
    "explain_en": "TAKE takeid:buffer:layer puts the Take Item on air. (Vol.6)"
  },
  {
    "vol": 4,
    "topic": "Hard Limit",
    "q": "Character Limits の Hard Limit の役割は？",
    "choices": [
      "文字数を頭打ちにする最後の保険",
      "色を変える",
      "幅を広げる",
      "改行を入れる"
    ],
    "answer": 0,
    "explain": "想定を超える極端に長い名前でも、ここで頭打ちにして破綻を防ぐ。不格好になっても枠からは絶対に出さない「最後の砦」。（第4巻 第12章）",
    "q_en": "What is the role of Hard Limit in Character Limits?",
    "choices_en": [
      "The last-resort cap on character count",
      "Change the color",
      "Widen the box",
      "Insert line breaks"
    ],
    "explain_en": "Even absurdly long names get capped here to prevent breakage — ugly maybe, but it never leaves the frame. The last line of defense. (Vol.4, Ch.12)"
  },
  {
    "vol": 4,
    "topic": "使わない見極め",
    "q": "「Visual Logicを使わない」判断も設計のうち、とされる理由は？",
    "choices": [
      "ネイティブでできることまで抱えると、壊れやすく直しにくくなるから",
      "VLは動作が遅いから",
      "VLは有料だから",
      "VLは必ずバグるから"
    ],
    "answer": 0,
    "explain": "便利だからと全部VLで組むと、ネイティブが自動でやることまで抱え込み壊れやすくなる。（第4巻）",
    "q_en": "Why is \"choosing NOT to use Visual Logic\" also part of design?",
    "choices_en": [
      "Owning what native features do automatically makes things fragile and hard to fix",
      "VL is slow",
      "VL costs extra",
      "VL always has bugs"
    ],
    "explain_en": "Building everything in VL means owning work native features do automatically — fragile and hard to maintain. (Vol.4)"
  },
  {
    "vol": 3,
    "topic": "キーフレーム",
    "q": "キーフレームは何として捉えると設計しやすい？",
    "choices": [
      "状態の記録",
      "動きそのもの",
      "色の設定",
      "データの単位"
    ],
    "answer": 0,
    "explain": "キーフレームは「動き」ではなく「状態の記録」。（第3巻）",
    "q_en": "How should keyframes be understood for easier design?",
    "choices_en": [
      "As recordings of state",
      "As the motion itself",
      "As color settings",
      "As data units"
    ],
    "explain_en": "A keyframe is a recorded state, not the motion. (Vol.3)"
  },
  {
    "vol": 4,
    "topic": "桁を揃える",
    "q": "スコアを「07」のように桁を揃えて表示するには？",
    "choices": [
      "Formatで表示用に整える",
      "手入力で0を足す",
      "画像化する",
      "別Objectを重ねる"
    ],
    "answer": 0,
    "explain": "数値はそのまま出さず、Formatで表示用の形に整えてから表示につなぐ。（第4巻 第6章・第13章）",
    "q_en": "To show a score with padded digits like \"07\"?",
    "choices_en": [
      "Shape it for display with Format",
      "Type the 0 by hand",
      "Turn it into an image",
      "Overlay another object"
    ],
    "explain_en": "Don't show raw numbers — shape them with Format before wiring to display. (Vol.4, Ch.6 & 13)"
  },
  {
    "vol": 6,
    "topic": "本番前の順番",
    "q": "本番前チェックは、どう進めると切り分けやすい？",
    "choices": [
      "順番を決めて確認する（Hardware→出力→Scene…）",
      "全部を同じ重みで一度に見る",
      "気づいた所だけ見る",
      "本番中に見る"
    ],
    "answer": 0,
    "explain": "全部を同じ重みで見ると逆に分かりにくい。順番を固定すると漏れが減る。（第6巻）",
    "q_en": "How should pre-show checks proceed for easy isolation?",
    "choices_en": [
      "In a fixed order (Hardware → output → Scene…)",
      "Everything at once with equal weight",
      "Only what you happen to notice",
      "During the show"
    ],
    "explain_en": "Checking everything with equal weight obscures issues. A fixed order reduces omissions. (Vol.6)"
  },
  {
    "vol": 2,
    "topic": "外部画像の遅延",
    "q": "DataLinqで外部画像を読むと、本番で起きがちな問題は？",
    "choices": [
      "表示が遅い／出ないことがある",
      "色が変わる",
      "音が出る",
      "文字化けする"
    ],
    "answer": 0,
    "explain": "外部画像は本番で表示が遅いことがある。事前キャッシュやローカル化を検討。（第2巻）",
    "q_en": "What problem tends to happen live when DataLinq loads external images?",
    "choices_en": [
      "Display can be slow or fail",
      "Colors change",
      "Sound plays",
      "Text garbles"
    ],
    "explain_en": "External images can be slow to appear live. Consider pre-caching or localizing. (Vol.2)"
  },
  {
    "vol": 1,
    "topic": "手入力かデータか",
    "q": "手入力でよい情報とデータ連携すべき情報を分ける判断軸は？",
    "choices": [
      "その情報が変わるか・繰り返し使うか",
      "文字数の多さ",
      "色の違い",
      "担当者の好み"
    ],
    "answer": 0,
    "explain": "変わる情報・何度も使う情報はデータ連携、固定はデザイン側で。（第1巻 第3章）",
    "q_en": "What is the axis for deciding hand-typed info vs. data-linked info?",
    "choices_en": [
      "Whether the info changes and is used repeatedly",
      "Character count",
      "Color differences",
      "Operator preference"
    ],
    "explain_en": "Changing/repeated info gets data linkage; fixed info lives in the design. (Vol.1, Ch.3)"
  },
  {
    "vol": 4,
    "topic": "Width Only",
    "q": "ネームテロップで Auto Squeeze の Scaling を「Width Only」にする理由は？",
    "choices": [
      "縦を変えず横方向だけ詰めたいから",
      "全体を縮めたいから",
      "縦だけ詰めたいから",
      "何も変えたくないから"
    ],
    "answer": 0,
    "explain": "ネームは縦を変えたくないので、まず横だけ詰めるWidth Onlyが基本。（第4巻 第12章）",
    "q_en": "Why set Auto Squeeze Scaling to \"Width Only\" for name straps?",
    "choices_en": [
      "To squeeze only horizontally without changing height",
      "To shrink everything",
      "To squeeze only vertically",
      "To change nothing"
    ],
    "explain_en": "You don't want name height to change, so squeezing width only is the default. (Vol.4, Ch.12)"
  },
  {
    "vol": 4,
    "topic": "Greater Than",
    "q": "Visual Logic の Greater Than は主に何に使う？",
    "choices": [
      "2つの値の大小を比べる（リード判定など）",
      "文字を連結する",
      "色を直接指定する",
      "時刻を取得する"
    ],
    "answer": 0,
    "explain": "ホームとアウェイのスコアを比較してリードを強調する、などに使う。（第4巻 第13章・第3章）",
    "q_en": "What is Visual Logic's Greater Than mainly used for?",
    "choices_en": [
      "Comparing two values (e.g. lead detection)",
      "Concatenating text",
      "Directly setting colors",
      "Getting the time"
    ],
    "explain_en": "For example, compare home and away scores to highlight the lead. (Vol.4 Ch.13, Ch.3)"
  },
  {
    "vol": 1,
    "topic": "あとから分かる設計",
    "q": "テンプレートを「あとから見て分かる」設計にする狙いは？",
    "choices": [
      "別担当者が探せる・直せる・差し替えられる状態にするため",
      "見た目を派手にするため",
      "容量を減らすため",
      "描画を速くするため"
    ],
    "answer": 0,
    "explain": "使い回すテンプレほど、最初の設計（分かりやすさ）が効いてくる。（第1巻・第6巻）",
    "q_en": "What is the aim of designing templates to be \"understandable later\"?",
    "choices_en": [
      "So another person can find, fix, and swap things",
      "To look flashier",
      "To reduce file size",
      "To render faster"
    ],
    "explain_en": "The more a template is reused, the more that initial clarity pays off. (Vol.1 & Vol.6)"
  },
  {
    "vol": 3,
    "topic": "動いても壊れない",
    "q": "動作確認は「止まった絵」だけでなく、何まで確認する？",
    "choices": [
      "動いても壊れないか（値が動く瞬間の破綻）",
      "BGMの音量",
      "ファイル名",
      "フォルダ構成"
    ],
    "answer": 0,
    "explain": "桁が変わる・入れ替わる・同点になる瞬間に破綻しないかまで見る。（第3巻・第4巻）",
    "q_en": "Verification isn't just the \"still frame\" — what else do you confirm?",
    "choices_en": [
      "That it survives motion (breakage at the moment values change)",
      "BGM volume",
      "File names",
      "Folder structure"
    ],
    "explain_en": "Check the moments digits change, entries swap, or scores tie. (Vol.3 & Vol.4)"
  },
  {
    "vol": 4,
    "topic": "クロックは独立",
    "q": "ゲームクロックなどの時計は、スコアボード章ではどう扱う？",
    "choices": [
      "独立した題材として、別章の作例を部品として差し込む",
      "スコアボード内でその場で作る",
      "使わない",
      "画像で置いておく"
    ],
    "answer": 0,
    "explain": "時計は独立題材。第14章の作例を部品として差し込む形にする。（第4巻 第13章）",
    "q_en": "How does the scoreboard chapter treat clocks like the game clock?",
    "choices_en": [
      "As an independent topic — insert the other chapter's build as a component",
      "Build it inline inside the scoreboard",
      "Don't use one",
      "Place it as an image"
    ],
    "explain_en": "Clocks are their own topic. Insert the Chapter 14 build as a component. (Vol.4, Ch.13)"
  },
  {
    "vol": 6,
    "topic": "消す操作",
    "q": "RossTalkでオンエア中のTake Itemを消すには？",
    "choices": [
      "Offline（−）／SEQO",
      "TAKE",
      "CUE",
      "もう一度TAKE"
    ],
    "answer": 0,
    "explain": "オンエア中のものを消すのは Offline（テンキー −、RossTalkなら SEQO）。（第1巻・第6巻）",
    "q_en": "How do you remove an on-air Take Item via RossTalk?",
    "choices_en": [
      "Offline (−) / SEQO",
      "TAKE",
      "CUE",
      "TAKE again"
    ],
    "explain_en": "Removing what's on air is Offline (numpad −, or SEQO via RossTalk). (Vol.1 & Vol.6)"
  },
  {
    "vol": 2,
    "topic": "Multiplyの注意",
    "q": "スポンサーロゴのTextureにBlend ModeのMultiplyを使うとき、注意すべきことは？",
    "choices": [
      "色が暗く変わり、ブランド表現として問題になることがある",
      "透明になって完全に消えてしまう",
      "解像度が自動的に下がる",
      "Alphaが必ず反転する"
    ],
    "answer": 0,
    "explain": "Multiplyは前段の値と掛け合わせるため暗くなりやすい。背景や装飾素材には使いやすいが、ロゴ・写真・スポンサー素材は色の変化に慎重に。（第2巻 第2章）",
    "q_en": "When using Blend Mode Multiply on a sponsor logo Texture, what should you watch for?",
    "choices_en": [
      "Colors darken, which can be a problem for brand representation",
      "It becomes fully transparent and disappears",
      "Resolution drops automatically",
      "Alpha always inverts"
    ],
    "explain_en": "Multiply multiplies with the underlying value, so it darkens. Fine for backgrounds/decoration, but be careful with logos, photos, and sponsor assets. (Vol.2, Ch.2)"
  },
  {
    "vol": 2,
    "topic": "Additionの適所",
    "q": "Blend ModeのAddition（加算）が向いているのは？",
    "choices": [
      "光素材や発光感を出す演出用Texture",
      "スコアや選手名など読ませる情報の本文",
      "選手写真の色補正",
      "Alpha抜きの調整"
    ],
    "answer": 0,
    "explain": "Additionは明るさを足す見え方。発光・ハイライト向き。使いすぎると白飛びし、読ませる情報では文字が読みにくくならないか確認が必要。（第2巻 第2章）",
    "q_en": "What is Blend Mode Addition suited for?",
    "choices_en": [
      "Light assets and glow-style staging Textures",
      "Body text of scores and player names",
      "Color-correcting player photos",
      "Adjusting alpha keying"
    ],
    "explain_en": "Addition adds brightness — good for glows and highlights. Overuse blows out whites; check readability on informational text. (Vol.2, Ch.2)"
  },
  {
    "vol": 2,
    "topic": "Address Mode: Wrap",
    "q": "Address ModeのWrapが向いている素材は？",
    "choices": [
      "斜線やドットなど繰り返しパターンの背景素材",
      "チームロゴ",
      "選手写真",
      "スポンサーロゴ"
    ],
    "answer": 0,
    "explain": "Wrapはテクスチャを繰り返す設定。ロゴや写真に使うと意図しない繰り返しが見えて、本番で大きな違和感になる。（第2巻 第2章）",
    "q_en": "Which assets suit Address Mode Wrap?",
    "choices_en": [
      "Repeating-pattern backgrounds like diagonals or dots",
      "Team logos",
      "Player photos",
      "Sponsor logos"
    ],
    "explain_en": "Wrap repeats the texture. On logos or photos, unintended repetition shows and looks badly wrong on air. (Vol.2, Ch.2)"
  },
  {
    "vol": 2,
    "topic": "Address Mode: Clamp",
    "q": "ロゴや写真を「繰り返したくない」ときに候補になるAddress Modeは？",
    "choices": [
      "Clamp（端を伸ばす）",
      "Wrap（繰り返す）",
      "Mirror（反転して繰り返す）",
      "Border"
    ],
    "answer": 0,
    "explain": "Clampは端のピクセルを伸ばして繰り返しを防ぐ。ただし端に強い色があると伸びて見えるので確認する。Mirrorは文字・ロゴが反転する恐れがあり不向き。（第2巻 第2章）",
    "q_en": "Which Address Mode is the candidate when you don't want logos/photos to repeat?",
    "choices_en": [
      "Clamp (extends the edge)",
      "Wrap (repeats)",
      "Mirror (flips and repeats)",
      "Border"
    ],
    "explain_en": "Clamp extends edge pixels to prevent repeats — but strong colors at the edge visibly smear, so check. Mirror risks flipping text/logos. (Vol.2, Ch.2)"
  },
  {
    "vol": 2,
    "topic": "Mip Mapping",
    "q": "細かいストライプ素材が小さく表示されたときにちらつく。まず確認すべきなのは？",
    "choices": [
      "Mip Mapping",
      "Address Mode",
      "Color Blending",
      "Loop Points"
    ],
    "answer": 0,
    "explain": "縮小時のちらつき・モアレはMip Mappingを確認。逆に拡大でぼける・ギザつくときはTexture Filteringを確認する。（第2巻 第2章）",
    "q_en": "A fine striped asset flickers when displayed small. What do you check first?",
    "choices_en": [
      "Mip Mapping",
      "Address Mode",
      "Color Blending",
      "Loop Points"
    ],
    "explain_en": "Flicker/moiré when shrinking → Mip Mapping. Blur/jaggies when enlarging → Texture Filtering. (Vol.2, Ch.2)"
  },
  {
    "vol": 2,
    "topic": "動画が動かない",
    "q": "Material Videoで「動画が動かない」とき、まず確認したい設定は？",
    "choices": [
      "Run ModeのModeがStoppedになっていないか",
      "Texture Filteringの種類",
      "Address ModeのU/V",
      "Pivotの位置"
    ],
    "answer": 0,
    "explain": "Stoppedは最初のフレームだけを表示するモード。待機用としては使えるが、動かしたい動画に設定されているとトラブルに見える。（第2巻 第3章）",
    "q_en": "When \"the video doesn't move\" in Material Video, which setting do you check first?",
    "choices_en": [
      "Whether Run Mode's Mode is set to Stopped",
      "The Texture Filtering type",
      "Address Mode U/V",
      "The Pivot position"
    ],
    "explain_en": "Stopped shows only the first frame. Useful for standby, but looks like trouble when set on a video you want moving. (Vol.2, Ch.3)"
  },
  {
    "vol": 2,
    "topic": "Loop Points",
    "q": "Material VideoのLoop Pointsについて正しいのは？",
    "choices": [
      "Scene Director上に置いたクリップには適用されない",
      "Scene Director上のクリップ専用の機能である",
      "Loop Countの0はループ無効を意味する",
      "Loop In Frameは音声専用の設定である"
    ],
    "answer": 0,
    "explain": "Loop Pointsはfree-runningの動画に有用で、Scene Director上のクリップには適用されない。Loop Count 0は無限ループ。（第2巻 第3章）",
    "q_en": "Which statement about Material Video's Loop Points is correct?",
    "choices_en": [
      "They don't apply to clips placed on a Scene Director",
      "They are exclusively for clips on a Scene Director",
      "Loop Count 0 means looping is disabled",
      "Loop In Frame is an audio-only setting"
    ],
    "explain_en": "Loop Points are useful for free-running video and don't apply to Scene Director clips. Loop Count 0 means infinite. (Vol.2, Ch.3)"
  },
  {
    "vol": 2,
    "topic": "Render Viewとは",
    "q": "Material Render Viewは何をする機能？",
    "choices": [
      "プロジェクト内のSceneをMaterialのShaderとして使い、Sceneを素材として再利用する",
      "Sceneを動画ファイルに書き出す",
      "プレビュー専用のウィンドウを開く",
      "外部カメラ入力を取り込む"
    ],
    "answer": 0,
    "explain": "Render ViewはSceneを「素材化」する考え方。別Objectの表面や別演出Sceneの部品として再利用できる。参照関係が複雑になりすぎないよう設計も大事。（第2巻 第4章）",
    "q_en": "What does Material Render View do?",
    "choices_en": [
      "Uses a Scene in the project as a Material shader, reusing the Scene as an asset",
      "Exports the Scene to a video file",
      "Opens a preview-only window",
      "Captures an external camera input"
    ],
    "explain_en": "Render View turns a Scene into an asset — reusable on another object's surface or as a part of another Scene. Keep the reference graph sane. (Vol.2, Ch.4)"
  },
  {
    "vol": 2,
    "topic": "Render ViewのResolution",
    "q": "Render ViewのResolutionはどう決めるのが正解？",
    "choices": [
      "最終的にどの大きさで使うかで決める（小窓なら低め、大きく使うなら高め）",
      "常に出力全体の解像度と同じにする",
      "常に最大値にしておく",
      "素材画像の元サイズに必ず合わせる"
    ],
    "answer": 0,
    "explain": "高すぎると描画負荷に影響し、低すぎると文字やロゴがぼやける。使う大きさから逆算して決める。（第2巻 第4章）",
    "q_en": "How should Render View Resolution be decided?",
    "choices_en": [
      "By the size it will finally be used at (low for a small window, high for large use)",
      "Always equal to the full output resolution",
      "Always the maximum",
      "Always match the source image size"
    ],
    "explain_en": "Too high hits render load; too low blurs text and logos. Work backwards from the display size. (Vol.2, Ch.4)"
  },
  {
    "vol": 2,
    "topic": "Bump Mapの画像",
    "q": "XPressionのBump Mapに入れる画像として正しいのは？",
    "choices": [
      "Normal Map",
      "白黒のHeight Map",
      "Alpha付きロゴ画像",
      "ぼかした写真"
    ],
    "answer": 0,
    "explain": "名前からHeight Map（白黒の凹凸画像）を入れたくなるが、XPressionのBump MapはNormal Mapとして考える必要がある。（第2巻 第7章）",
    "q_en": "What image belongs in XPression's Bump Map?",
    "choices_en": [
      "A Normal Map",
      "A black-and-white Height Map",
      "A logo image with alpha",
      "A blurred photo"
    ],
    "explain_en": "The name tempts you to use a Height Map, but XPression's Bump Map should be thought of as a Normal Map. (Vol.2, Ch.7)"
  },
  {
    "vol": 3,
    "topic": "Event Marker",
    "q": "XPressionのEvent Markerの説明として正しいのは？",
    "choices": [
      "SceneやScene Groupに追加するObjectで、止める・再開するなどの意味を持たせる",
      "After Effects同様タイムライン上に直接置くマーカー",
      "レンダリング範囲を指定する機能",
      "書き出し時のチャプター設定"
    ],
    "answer": 0,
    "explain": "AEのマーカーと違い、Event MarkerはObjectとして追加する。停止・再開・速度変更・Script Eventの入口などの意味を持たせられる。（第3巻 第1章）",
    "q_en": "Which description of XPression's Event Marker is correct?",
    "choices_en": [
      "An Object added to a Scene/Scene Group, given meanings like stop and resume",
      "A marker placed directly on the timeline like After Effects",
      "A feature to set the render range",
      "Chapter markers for export"
    ],
    "explain_en": "Unlike AE markers, an Event Marker is added as an Object. It can mean stop, resume, speed change, or a Script Event entry point. (Vol.3, Ch.1)"
  },
  {
    "vol": 3,
    "topic": "StaggerとACの分担",
    "q": "選手紹介で「背景パネル→写真→名前→スタッツ」という全体の流れを作るのに向くのは？",
    "choices": [
      "Animation Controller",
      "Stagger Animation",
      "Transition",
      "Widgets"
    ],
    "answer": 0,
    "explain": "グラフィックス全体の時間設計はAnimation Controller。選手名の文字の出方やスタッツの行ごとの見せ方はStagger Animationが担当。（第3巻 第4章）",
    "q_en": "For the overall flow \"panel → photo → name → stats\" in a player intro, which tool fits?",
    "choices_en": [
      "Animation Controller",
      "Stagger Animation",
      "Transition",
      "Widgets"
    ],
    "explain_en": "Overall timing design is the Animation Controller. How the name's characters appear or stats rows reveal is Stagger Animation. (Vol.3, Ch.4)"
  },
  {
    "vol": 3,
    "topic": "スタッツの見せ方",
    "q": "スタッツのような情報量が多い場所の見せ方として本文が勧めるのは？",
    "choices": [
      "文字ごとに動かすより、行ごとに出す",
      "1文字ずつ大きく揺らして目立たせる",
      "全文字を同時に点滅させる",
      "ランダムな順で文字を出す"
    ],
    "answer": 0,
    "explain": "情報量が多い場所で細かく動かしすぎると視線が散る。行ごとに出した方が読みやすい。（第3巻 第4章）",
    "q_en": "For info-dense areas like stats, what does the text recommend?",
    "choices_en": [
      "Reveal by row rather than animating per character",
      "Wiggle each character large to stand out",
      "Blink all characters at once",
      "Reveal characters in random order"
    ],
    "explain_en": "Too much per-character motion scatters the eye in dense areas. Row-by-row reads better. (Vol.3, Ch.4)"
  },
  {
    "vol": 3,
    "topic": "Take Itemの理解",
    "q": "Take Itemの説明として正しいのは？",
    "choices": [
      "Scene/Scene GroupをSequencerに追加した送出用の項目で、Sceneそのものではない",
      "Sceneの完全なコピー",
      "Sceneのバックアップファイル",
      "外部制御専用の別プロジェクト"
    ],
    "answer": 0,
    "explain": "Sceneは「元の形」、Take Itemは「本番で出すために並べた項目」。同じSceneから選手A用・B用など複数のTake Itemを作れる。「コピー」と言い切らないのが安全。（第3巻 第11章）",
    "q_en": "Which description of a Take Item is correct?",
    "choices_en": [
      "A playout entry made by adding a Scene/Scene Group to the Sequencer — not the Scene itself",
      "A complete copy of the Scene",
      "A backup file of the Scene",
      "A separate project for external control"
    ],
    "explain_en": "The Scene is the source; a Take Item is an entry arranged for playout. One Scene can back multiple Take Items (player A, player B…). Safer not to call it a \"copy\". (Vol.3, Ch.11)"
  },
  {
    "vol": 3,
    "topic": "Take ID設計",
    "q": "Take IDの付け方として本文が例示する運用は？",
    "choices": [
      "100番台はLower、200番台はSponsorのように範囲で意味を持たせる",
      "作った順に適当な連番を振る",
      "毎回ランダムに割り当てる",
      "本番中に自動で振り直す"
    ],
    "answer": 0,
    "explain": "番号を見て用途を推測できるようにする（公式仕様ではなく運用の考え方）。外部制御（PBus/RossTalk等）から参照される場合は特に変更しにくい番号になるため、最初の設計が重要。（第3巻 第11章）",
    "q_en": "Which Take ID scheme does the text illustrate?",
    "choices_en": [
      "Give ranges meaning — 100s for Lowers, 200s for Sponsors, etc.",
      "Sequential numbers in creation order",
      "Random assignment each time",
      "Auto-renumbering during the show"
    ],
    "explain_en": "Make the number hint at the purpose (an operational convention, not an official spec). IDs referenced by external control (PBus/RossTalk) are hard to change later, so initial design matters. (Vol.3, Ch.11)"
  },
  {
    "vol": 3,
    "topic": "Camera選び",
    "q": "スコアやスタッツを正確に読ませたい画面で、まず検討すべきCameraは？",
    "choices": [
      "Ortho Camera",
      "Perspective Camera",
      "Camera Layer",
      "動かせるカメラなら何でもよい"
    ],
    "answer": 0,
    "explain": "Ortho Cameraは遠近によるサイズ変化が少なく、情報を安定して配置できる。奥行きや迫力を見せたい演出はPerspective Camera。「読む画面か、見せる画面か」で判断。（第3巻 第14章）",
    "q_en": "For screens where scores/stats must read accurately, which Camera do you consider first?",
    "choices_en": [
      "Ortho Camera",
      "Perspective Camera",
      "Camera Layer",
      "Any camera that can move"
    ],
    "explain_en": "Ortho has little size change with depth, so information sits stably. Use Perspective for depth and impact. Judge by \"a screen to read vs. a screen to watch\". (Vol.3, Ch.14)"
  },
  {
    "vol": 3,
    "topic": "Perspectiveの注意",
    "q": "Perspective Cameraで情報を見せるときの注意点として正しいのは？",
    "choices": [
      "角度やFOVを付けすぎず、情報を奥に置きすぎない",
      "FOVは最大にした方が読みやすい",
      "角度は強いほど視認性が上がる",
      "情報ほど画面の奥に置くべき"
    ],
    "answer": 0,
    "explain": "角度が強いと文字が斜めに潰れ、FOVが広いと画面端が歪み、奥の情報は小さく見える。かっこよくても読めなければ成立しない。（第3巻 第14章）",
    "q_en": "Which is the correct caution for showing information with a Perspective Camera?",
    "choices_en": [
      "Don't overdo angle or FOV, and don't push info deep into the scene",
      "Maximize FOV for readability",
      "Stronger angles improve legibility",
      "Information belongs at the back"
    ],
    "explain_en": "Strong angles skew text, wide FOV distorts edges, and deep placement shrinks info. Cool but unreadable doesn't work. (Vol.3, Ch.14)"
  },
  {
    "vol": 3,
    "topic": "Transitionの捉え方",
    "q": "本文はTransitionを「単なるエフェクト」ではなく何として扱う？",
    "choices": [
      "Sceneの出入りを破綻させないための送出設計の一部",
      "レンダリング品質の設定",
      "素材の圧縮方式",
      "プレビュー専用の機能"
    ],
    "answer": 0,
    "explain": "出す瞬間だけでなく「どう消すか」「次のSceneとどう入れ替わるか」「外部制御と矛盾しないか」まで含めて設計する。（第3巻 第8章）",
    "q_en": "The text treats Transition not as a mere effect but as what?",
    "choices_en": [
      "Part of playout design that keeps Scene ins/outs from breaking",
      "A render-quality setting",
      "An asset compression method",
      "A preview-only feature"
    ],
    "explain_en": "Design includes how it leaves, how it swaps with the next Scene, and consistency with external control. (Vol.3, Ch.8)"
  },
  {
    "vol": 5,
    "topic": "DataLinqとServerの違い",
    "q": "DataLinqとDataLinq Serverの役割分担として正しいのは？",
    "choices": [
      "DataLinqは表示側から見たデータ利用、DataLinq Serverはデータを受ける側の窓口",
      "同じ機能の新旧の名称",
      "Serverは有料オプションの名称",
      "Serverは画像データ専用"
    ],
    "answer": 0,
    "explain": "DataLinqは「どのテキストにどのデータを入れるか」、DataLinq Serverは「どこからデータを受けて、どう使える状態にするか」。（第5巻 第2章）",
    "q_en": "What is the correct division of roles between DataLinq and DataLinq Server?",
    "choices_en": [
      "DataLinq is data use seen from the display side; DataLinq Server is the receiving gateway",
      "Old and new names for the same feature",
      "Server is a paid option's name",
      "Server is for image data only"
    ],
    "explain_en": "DataLinq: which data goes into which text. DataLinq Server: where data is received and made usable. (Vol.5, Ch.2)"
  },
  {
    "vol": 5,
    "topic": "CSVの本質",
    "q": "DataLinqでCSVを扱うときの正しい理解は？",
    "choices": [
      "区切り文字付きテキストとして扱う（Excelで開けてもExcelファイルではない）",
      "Excelファイルの一種として扱う",
      "JSONの簡易版として扱う",
      "画像リスト専用の形式"
    ],
    "answer": 0,
    "explain": "CSVはカンマ等の区切り文字で列を分けたテキスト。単純ゆえにトラブル時も中身を追いやすい半面、文字化け・列ずれ・空ファイルに注意。（第5巻 第3章）",
    "q_en": "What is the correct understanding of CSV in DataLinq?",
    "choices_en": [
      "Delimited text (it opens in Excel but isn't an Excel file)",
      "A kind of Excel file",
      "A simplified JSON",
      "An image-list-only format"
    ],
    "explain_en": "CSV is text with delimiter-separated columns. Simple to debug, but watch for encoding issues, column shifts, and empty files. (Vol.5, Ch.3)"
  },
  {
    "vol": 5,
    "topic": "Excelの確認",
    "q": "ExcelをDataLinqの元データにするとき、本番前に必ず確認すべきなのは？",
    "choices": [
      "本番機側の読み取り環境（Excelのインストール有無・読み取り方式・Worksheet指定）",
      "セルの背景色の設定",
      "ファイル名の長さだけ",
      "フォントの種類だけ"
    ],
    "answer": 0,
    "explain": "制作PCで読めても本番機で読めるとは限らない。Excel DataLinq SourceはMicrosoft Excelのインストールが必要な構成もある。列名・シート名の変更ルールも決めておく。（第5巻 第3章）",
    "q_en": "Before using Excel as a DataLinq source live, what must be checked?",
    "choices_en": [
      "The playout machine's reading environment (Excel installed, read method, Worksheet setting)",
      "Cell background colors",
      "Only filename length",
      "Only the font"
    ],
    "explain_en": "Reading on the build PC doesn't guarantee the playout machine. Some Excel DataLinq Source setups require Microsoft Excel installed. Agree on rules for column/sheet renames. (Vol.5, Ch.3)"
  },
  {
    "vol": 5,
    "topic": "JSONの適所",
    "q": "JSONをデータソースに選びやすいのはどんな場合？",
    "choices": [
      "外部システムが生成する、階層構造を持つデータを渡す場合",
      "人が手で頻繁に編集する場合",
      "どんな場合でも一番安定するから常に",
      "画像を直接埋め込みたい場合"
    ],
    "answer": 0,
    "explain": "JSONは階層を持てる形式で、システム生成データに向く。Table Presets（Name＋File Path）で参照ファイルを登録・切替できる。手編集は括弧やカンマを壊しやすい。（第5巻 第3章）",
    "q_en": "When is JSON an easy pick as a data source?",
    "choices_en": [
      "When an external system generates hierarchical data to hand over",
      "When humans edit it frequently by hand",
      "Always — it's the most stable",
      "When you want to embed images directly"
    ],
    "explain_en": "JSON holds hierarchy and suits system-generated data. Table Presets (Name + File Path) register/switch source files. Hand-editing breaks brackets and commas easily. (Vol.5, Ch.3)"
  },
  {
    "vol": 5,
    "topic": "Widgetsの理解",
    "q": "Widgetを作っただけでは画面に何も表示されないのはなぜ？",
    "choices": [
      "Widgetは値や選択肢を持つ仕組みで、どのオブジェクトで表示するかは別に割り当てるから",
      "レンダリングを手動で実行していないから",
      "ライセンスの追加が必要だから",
      "Sceneを再起動するまで反映されないから"
    ],
    "answer": 0,
    "explain": "XPressionでは「見た目」と「中身の値」を分けて考える。時計Widgetを作り、その値をTextオブジェクトに割り当てて初めて表示に使える。（第5巻 第4章）",
    "q_en": "Why does creating a Widget alone show nothing on screen?",
    "choices_en": [
      "A Widget holds values/choices; which object displays it is assigned separately",
      "Rendering wasn't run manually",
      "An extra license is needed",
      "It won't apply until the Scene restarts"
    ],
    "explain_en": "XPression separates the look from the value. Make a clock Widget, then assign its value to a Text object before it shows. (Vol.5, Ch.4)"
  },
  {
    "vol": 5,
    "topic": "Dynamic Materialの仕組み",
    "q": "Dynamic Materialの仕組みとして正しいのは？",
    "choices": [
      "Material Pathの文字列を解決して、使うMaterialや素材を切り替える",
      "Materialを自動生成するAI機能",
      "Materialを固定で割り当てる標準機能の別名",
      "動画専用の再生モード"
    ],
    "answer": 0,
    "explain": "Object InspectorのDataLinqタブ→Select Material SourceでDynamic Materialを選び、Material Pathに値を入れる。file path・material name・%datalinqkey%・@TextObject@などを指定できる。（第5巻 第5章）",
    "q_en": "Which is correct about how Dynamic Material works?",
    "choices_en": [
      "It resolves the Material Path string to switch which Material/asset is used",
      "An AI feature that auto-generates Materials",
      "Another name for fixed material assignment",
      "A playback mode for video only"
    ],
    "explain_en": "Object Inspector → DataLinq tab → Select Material Source → Dynamic Material, then feed the Material Path: file path, material name, %datalinqkey%, @TextObject@, etc. (Vol.5, Ch.5)"
  },
  {
    "vol": 5,
    "topic": "GPIの2つの入口",
    "q": "物理GPIとRossTalk経由のGPIトリガーの違いは？",
    "choices": [
      "物理GPIは接点入力の信号、RossTalkのGPIコマンドはXPression側のGPI入力をソフト的に叩く",
      "まったく同じもの",
      "RossTalkは映像信号を送る",
      "物理GPIはネットワーク経由で届く"
    ],
    "answer": 0,
    "explain": "物理GPIは接点・ケーブル・Debounce Timeの確認が重要。RossTalk経由はコマンド・通信設定・GPI番号のMappingが重要。入口が違えば確認ポイントも違う。（第5巻 第6章）",
    "q_en": "What is the difference between physical GPI and GPI triggers via RossTalk?",
    "choices_en": [
      "Physical GPI is a contact-closure signal; the RossTalk GPI command fires XPression's GPI input in software",
      "Exactly the same thing",
      "RossTalk sends video signals",
      "Physical GPI arrives over the network"
    ],
    "explain_en": "Physical GPI: contacts, cabling, Debounce Time. Via RossTalk: command, comms settings, GPI number mapping. Different entrances, different checkpoints. (Vol.5, Ch.6)"
  },
  {
    "vol": 5,
    "topic": "ショートカットの範囲",
    "q": "Keyboard / GPI MappingのLocal Shortcutの特徴は？",
    "choices": [
      "特定の画面やコンポーネントにフォーカスがあるときだけ有効",
      "XPression全体でいつでも有効",
      "プロジェクトを問わず常に有効",
      "外部制御専用"
    ],
    "answer": 0,
    "explain": "Project／Global／Localで効く範囲が違う。「いつでも同じように効く」と思い込むのがつまずきポイント。本番前にフォーカス状態も含めて確認する。（第5巻 第6章）",
    "q_en": "What characterizes a Local Shortcut in Keyboard / GPI Mapping?",
    "choices_en": [
      "Active only while a specific screen/component has focus",
      "Always active across XPression",
      "Always active regardless of project",
      "External control only"
    ],
    "explain_en": "Project/Global/Local differ in scope. Assuming \"it always works\" is the trap — verify focus state before the show. (Vol.5, Ch.6)"
  },
  {
    "vol": 1,
    "topic": "修正依頼の初動",
    "q": "現場で修正依頼が来たとき、最初に考えるべきことは？",
    "choices": [
      "Project→Scene→Objectのどの階層の問題かを判断する",
      "すぐObjectを触って直す",
      "XPressionを再起動する",
      "素材をすべて作り直す"
    ],
    "answer": 0,
    "explain": "いきなりObjectを触る前に階層を判断する。どの階層の問題かが分かれば、直す場所も影響範囲も明確になる。（第1巻 第4章）",
    "q_en": "When a fix request comes in on site, what do you think about first?",
    "choices_en": [
      "Which level the problem is at: Project → Scene → Object",
      "Touch the Object immediately",
      "Restart XPression",
      "Rebuild all assets"
    ],
    "explain_en": "Before touching objects, identify the level. Knowing the level clarifies where to fix and the impact range. (Vol.1, Ch.4)"
  },
  {
    "vol": 1,
    "topic": "Template Links",
    "q": "Template Linksの位置づけとして本文が示すのは？",
    "choices": [
      "制作担当者と運用担当者の境界線",
      "外部制御の通信規格",
      "素材の圧縮機能",
      "ライセンス管理の仕組み"
    ],
    "answer": 0,
    "explain": "どの項目を公開するかを決めることで、運用が触ってよい範囲と制作が守る範囲が分かれる。（第1巻）",
    "q_en": "How does the text position Template Links?",
    "choices_en": [
      "As the boundary between build staff and operations staff",
      "A comms standard for external control",
      "An asset compression feature",
      "A license management scheme"
    ],
    "explain_en": "Choosing which items to expose separates what operations may touch from what build protects. (Vol.1)"
  },
  {
    "vol": 1,
    "topic": "Pivot",
    "q": "TransformのPivotは何を決める？",
    "choices": [
      "回転やスケーリングの基準点",
      "オブジェクトの描画順",
      "表示される時間",
      "レイヤーの番号"
    ],
    "answer": 0,
    "explain": "Pivotが違うと同じRotation/Scalingでも見え方が変わる。伸ばす方向・回す中心を設計してから動きを付ける。（第1巻 第14章）",
    "q_en": "What does Transform's Pivot decide?",
    "choices_en": [
      "The reference point for rotation and scaling",
      "Draw order of objects",
      "Display duration",
      "Layer number"
    ],
    "explain_en": "A different Pivot changes how the same Rotation/Scaling looks. Design the stretch direction and rotation center before animating. (Vol.1, Ch.14)"
  },
  {
    "vol": 1,
    "topic": "画像を出す基本",
    "q": "画像を1枚出すとき、第1巻が示す基本ワークフローは？",
    "choices": [
      "Materialとして読み込み→Objectに割り当て→Sequencerから送出",
      "デスクトップからドラッグして直接オンエア",
      "Sequencerに画像ファイルを直接読み込む",
      "Scene Directorに画像を置くだけ"
    ],
    "answer": 0,
    "explain": "画像はMaterial・Object・Sequencerの3段階で考える。この流れを押さえると、差し替えやDataLinq化にも進みやすい。（第1巻 第15章）",
    "q_en": "What basic workflow does Vol.1 give for putting up one image?",
    "choices_en": [
      "Load as a Material → assign to an Object → play out from the Sequencer",
      "Drag from the desktop straight to air",
      "Load the image file directly into the Sequencer",
      "Just place the image on the Scene Director"
    ],
    "explain_en": "Think of images in three steps: Material, Object, Sequencer. This flow leads naturally to swaps and DataLinq later. (Vol.1, Ch.15)"
  },

  /* ===== ここから 5テーマ追加分（VL / Script / RossTalk / Dynamic Material / DataLinq）2026-07-09 ===== */

  /* ---- Visual Logic（第4巻） ---- */
  {
    "vol": 4, "topic": "VL：Greater Thanの向き",
    "q": "Visual Logic の Greater Than が Out=1 を出すのはどんなとき？",
    "choices": ["「>」ポートに入れた値が Base より大きいとき", "Base が「>」ポートの値より大きいとき", "2つの値が等しいとき", "どちらかが0のとき"],
    "answer": 0,
    "explain": "比較ブロックの向きは「Out=1 ⟺（比較側ポートの値）が Base より大きい」。Base が基準、ポート側が比較される値（実機検証済み）。",
    "q_en": "When does Visual Logic's Greater Than output Out=1?",
    "choices_en": ["When the value on the \">\" port is greater than Base", "When Base is greater than the \">\" port value", "When the two values are equal", "When either value is 0"],
    "explain_en": "The comparator's direction is: Out=1 when the port-side value is greater than Base. Base is the reference; the port side is what gets compared (verified on hardware)."
  },
  {
    "vol": 4, "topic": "VL：Greater Than/Eq To",
    "q": "Greater Than/Eq To に Base=2、「>=」側=3 を入れた。Out はいくつ？",
    "choices": ["1（3 >= 2 で真）", "0（2 >= 3 で偽）", "3", "エラーになる"],
    "answer": 0,
    "explain": "判定は「>=側 >= Base」。3 >= 2 なので Out=1。Base 側を主語に読むと逆になるので注意（実機検証済み：この向きでオブジェクト表示が点灯）。",
    "q_en": "You feed Greater Than/Eq To with Base=2 and 3 on the \">=\" port. What is Out?",
    "choices_en": ["1 (3 >= 2 is true)", "0 (2 >= 3 is false)", "3", "It errors"],
    "explain_en": "The test is \"port side >= Base\": 3 >= 2, so Out=1. Reading Base as the subject flips it — a common mistake (hardware-verified direction)."
  },
  {
    "vol": 4, "topic": "VL：Logicブロックの入力型",
    "q": "And / Or / Not ブロックに入れられる値は？",
    "choices": ["Boolean（1/0）だけ", "文字列も直結できる", "色も入れられる", "何でも自動変換される"],
    "answer": 0,
    "explain": "Logic（パープル）は Boolean 専用。String（マゼンタ）出力は直結できない。文字列は String Compare で 1/0 に変換してから入れる（実機検証済み）。",
    "q_en": "What kind of values can go into And / Or / Not blocks?",
    "choices_en": ["Boolean (1/0) only", "Strings can connect directly", "Colors work too", "Anything — it auto-converts"],
    "explain_en": "Logic (purple) is Boolean-only. String (magenta) outputs can't connect directly; convert strings to 1/0 with String Compare first (verified on hardware)."
  },
  {
    "vol": 4, "topic": "VL：文字列の判定",
    "q": "文字列が特定の語と一致するかを And / Or に渡したい。正しい経路は？",
    "choices": ["String Compare の Equal 出力を Logic に入れる", "文字列をそのまま And に入れる", "Equal To に文字列を入れる", "Format String を使う"],
    "answer": 0,
    "explain": "String Compare が文字列比較の入口。Equal / Greater / Less / Ordinal の Boolean 出力を Logic ブロックへ渡す。Equal To は数値用。",
    "q_en": "You want to feed \"does this string match a word?\" into And / Or. What's the correct route?",
    "choices_en": ["String Compare's Equal output into the Logic block", "Connect the string straight into And", "Put the string into Equal To", "Use Format String"],
    "explain_en": "String Compare is the entry point for string tests. Its Boolean outputs (Equal / Greater / Less / Ordinal) feed Logic blocks. Equal To is for numbers."
  },
  {
    "vol": 4, "topic": "VL：同点で両方消える理由",
    "q": "優勢マーカーを Greater Than と Smaller Than の2つ（どちらも Base=Home）で作ると、同点のとき何が起きる？",
    "choices": ["両方 false になり、両マーカーが自動で消える", "両方 true になり事故になる", "どちらか片方だけ点く", "エラーで止まる"],
    "answer": 0,
    "explain": "厳密な大小だけを判定するので、同点はどちらの条件も満たさず両方 false。明示的な Equal To 分岐なしで「両方勝ち」事故を防げる（実機検証済み：Home1=Away1で両マーカーVisible=0）。",
    "q_en": "You build lead markers with Greater Than and Smaller Than (both Base=Home). What happens on a tie?",
    "choices_en": ["Both go false and both markers hide automatically", "Both go true and you get the double-win bug", "Only one lights up", "It errors and stops"],
    "explain_en": "Each tests strict inequality, so a tie satisfies neither — both false. No explicit Equal To branch is needed to prevent the \"both winning\" bug (verified: Home 1 = Away 1 → both markers Visible=0)."
  },
  {
    "vol": 4, "topic": "VL：現在値デバッグ",
    "q": "Visual Logic Editor で各ブロックの「今の値」を表示するショートカットは？",
    "choices": ["ALT+V", "Ctrl+D", "F5", "Shift+Enter"],
    "answer": 0,
    "explain": "ALT+V で各ブロックの下に現在値が出る。値のズレをブロック単位で追える、原因切り分けの要。",
    "q_en": "Which shortcut shows each block's current value in the Visual Logic Editor?",
    "choices_en": ["ALT+V", "Ctrl+D", "F5", "Shift+Enter"],
    "explain_en": "ALT+V displays the live value under every block — the key tool for isolating where a value goes wrong."
  },
  {
    "vol": 4, "topic": "VL：接続線の色",
    "q": "Visual Logic でブロック同士をつなごうとしたら線が赤い矢印になった。意味は？",
    "choices": ["型が合わず接続できない", "接続済みの印", "データ共有中", "選択中の印"],
    "answer": 0,
    "explain": "緑=接続可、赤矢印=不可（型不一致）、青矢印=データ共有中。赤のままなら String→Logic 直結などの型違いを疑う。",
    "q_en": "While wiring blocks in Visual Logic the line shows a red arrow. What does it mean?",
    "choices_en": ["Types don't match — it can't connect", "Already connected", "Sharing data", "Currently selected"],
    "explain_en": "Green = connectable, red arrow = not allowed (type mismatch), blue arrow = sharing data. A stubborn red line usually means something like String→Logic."
  },
  {
    "vol": 4, "topic": "VL：ロジックの再利用",
    "q": "完成した Visual Logic を他のシーンでも使い回すには？",
    "choices": ["Save all tabs で XVL ファイルに保存し、他シーンで Open", "コピー＆ペーストしかない", "シーンごと複製する", "スクリーンショットを撮る"],
    "answer": 0,
    "explain": "Visual Logic メニュー → Save all tabs で XVL に保存→他シーンで Open。1タブ=1機能で分けておくと部品として流用しやすい。",
    "q_en": "How do you reuse finished Visual Logic in other scenes?",
    "choices_en": ["Save all tabs to an XVL file, then Open it in the other scene", "Copy & paste is the only way", "Duplicate the whole scene", "Take a screenshot"],
    "explain_en": "Visual Logic menu → Save all tabs writes an XVL; Open loads it elsewhere. Keeping one tab = one function makes logic reusable as parts."
  },
  {
    "vol": 4, "topic": "VL：日時の差を取る",
    "q": "目標時刻までの残り時間（カウントダウン）を作るとき、2つの Date Time の差を出すブロックは？",
    "choices": ["Time Delta", "Difference", "Subtract", "Date Compare"],
    "answer": 0,
    "explain": "Time Delta に目標（Encode Date Time）と現在（Clock）を入れると Days/Hours/Minutes/Seconds が出る。「Difference」というブロックは存在しない（実機確認済み）。",
    "q_en": "Which block takes the difference of two Date Times for a countdown to a target time?",
    "choices_en": ["Time Delta", "Difference", "Subtract", "Date Compare"],
    "explain_en": "Feed Time Delta the target (Encode Date Time) and now (Clock) to get Days/Hours/Minutes/Seconds. There is no block named \"Difference\" (hardware-checked)."
  },
  {
    "vol": 4, "topic": "VL：一括適用",
    "q": "同じロジック/属性を多数の似たオブジェクトへ配りたい。手配線以外の方法は？",
    "choices": ["Copy → Assign & Paste（Shift+Ctrl+V）で適用先を順送りしながら一括割り当て", "1本ずつ配線し直すしかない", "XVLを何度も読み込む", "オブジェクトを全部グループ化する"],
    "answer": 0,
    "explain": "元ブロックを Copy → 右クリック Assign & Paste → Destination Object で適用先を選び、Increment Destinations で順送り。手作業の配線ミスを防げる。",
    "q_en": "You want to distribute the same logic/attribute to many similar objects. What beats manual wiring?",
    "choices_en": ["Copy → Assign & Paste (Shift+Ctrl+V) and step through destinations in bulk", "Rewiring one by one is the only way", "Loading the XVL repeatedly", "Grouping every object"],
    "explain_en": "Copy the source block → right-click Assign & Paste → pick targets in Destination Object, stepping with Increment Destinations. Avoids manual wiring mistakes."
  },

  /* ---- Script（第6巻） ---- */
  {
    "vol": 6, "topic": "Script：BC30451の原因",
    "q": "Scene の OnOnline に Scene.GetObjectByName(...) と書いたら「BC30451 名前 'Scene' は宣言されていません」。正しい直し方は？",
    "choices": ["Scene. を Self. に置き換える（SceneイベントではSelfがシーン）", "dim Scene as new xpScene を足す", "Engine.Scene と書く", "イベントを OnSetText に変える"],
    "answer": 0,
    "explain": "Sceneイベントの引数は (Engine, Self) で Scene 変数が無い。シーン自身は Self。サンプルプロジェクトのSceneイベント29本もすべて Self（例外ゼロ）。",
    "q_en": "In a Scene's OnOnline, Scene.GetObjectByName(...) throws \"BC30451 'Scene' is not declared\". The correct fix?",
    "choices_en": ["Replace Scene. with Self. (in Scene events, Self IS the scene)", "Add dim Scene as new xpScene", "Write Engine.Scene", "Switch the event to OnSetText"],
    "explain_en": "Scene events receive (Engine, Self) — there is no Scene variable; the scene is Self. All 29 scene-event scripts in the sample projects use Self (zero exceptions)."
  },
  {
    "vol": 6, "topic": "Script：SelfとSceneの使い分け",
    "q": "Self と Scene の使い分けを決めるものは？",
    "choices": ["スクリプトを書く場所（Sceneイベント=Self、オブジェクトイベント=Scene）", "書く人の好み", "XPressionのバージョン", "オブジェクトの種類"],
    "answer": 0,
    "explain": "Sceneイベント（OnOnline等）はSceneが渡らないのでSelf、オブジェクトイベント（OnSetText等）はSceneが引数で渡るのでScene。サンプル107本が例外なくこの使い分け。",
    "q_en": "What determines whether you use Self or Scene?",
    "choices_en": ["Where the script lives (Scene events = Self, object events = Scene)", "Personal preference", "The XPression version", "The object type"],
    "explain_en": "Scene events (OnOnline etc.) get no Scene parameter, so use Self; object events (OnSetText etc.) receive Scene as a parameter. All 107 sample scripts follow this split."
  },
  {
    "vol": 6, "topic": "Script：OnSetTextのtext",
    "q": "テキストの OnSetText に渡ってくる text を書き換えるとどうなる？",
    "choices": ["書き換えた内容がそのまま表示される（ByRef）", "何も起きない", "エラーになる", "元の値に戻る"],
    "answer": 0,
    "explain": "text は ByRef 引数。例えば text = text & \" ET\" と書けば、表示直前に加工できる（サンプルプロジェクトの定番パターン）。",
    "q_en": "What happens if you modify the 'text' parameter inside a text's OnSetText?",
    "choices_en": ["The modified content is what displays (ByRef)", "Nothing", "It errors", "It reverts to the original"],
    "explain_en": "'text' is ByRef. For example text = text & \" ET\" transforms the value just before display — a classic sample-project pattern."
  },
  {
    "vol": 6, "topic": "Script：公式流の取得",
    "q": "GetObjectByName でテキストを取るとき、サンプルプロジェクト流の書き方は？",
    "choices": ["dim txt as xpTextObject と宣言し、型付き変数を直接渡す", "xpBaseObject で受けてから TypeOf と CType で変換する", "戻り値を必ず If で確認する", "Try/Catch で囲む"],
    "answer": 0,
    "explain": "サンプル138種の実態：型付き変数を直接渡すのが公式流。TypeOf は1本・CType/戻り値チェック/Is Nothing は0本。防御的な多段キャストは公式文化に無い。",
    "q_en": "What's the sample-project style for getting a text with GetObjectByName?",
    "choices_en": ["Declare dim txt as xpTextObject and pass the typed variable straight in", "Receive as xpBaseObject, then TypeOf + CType", "Always If-check the return value", "Wrap it in Try/Catch"],
    "explain_en": "Across 138 unique sample scripts: typed variables are passed directly. TypeOf appears once; CType, return-value checks and Is Nothing appear zero times."
  },
  {
    "vol": 6, "topic": "Script：青いBC42030",
    "q": "Script Editor の Messages に青字で BC42030（未代入で参照渡し）が出た。どうする？",
    "choices": ["無害な警告なのでそのままでよい（動く）", "赤字と同じなので必ず直す", "XPressionを再起動する", "イベントを書き直す"],
    "answer": 0,
    "explain": "青字の BC42030 は警告で、スクリプトは動く。直すべきは赤字のエラー（BC30451・BC30800など）。気になるなら = Nothing で初期化すると消える。",
    "q_en": "The Messages pane shows BC42030 (passed by reference before assignment) in blue. What do you do?",
    "choices_en": ["Nothing — it's a harmless warning and the script runs", "Treat it like a red error and fix it", "Restart XPression", "Rewrite the event"],
    "explain_en": "Blue BC42030 is a warning; the script still runs. Red errors (BC30451, BC30800…) are what must be fixed. Initializing with = Nothing silences it."
  },
  {
    "vol": 6, "topic": "Script：かっこ必須",
    "q": "XPressionのScript（VB.NET）で GetObjectByName \"Text1\", obj と書いたらエラー。理由は？",
    "choices": ["VB.NETでは引数付き呼び出しにかっこが必須（BC30800）", "GetObjectByName が存在しない", "obj の型が違う", "文字列にシングルクォートが必要"],
    "answer": 0,
    "explain": "VB.NETはかっこ必須：GetObjectByName(\"Text1\", obj)。かっこ無しの古いVB6流は BC30800 になる。",
    "q_en": "Writing GetObjectByName \"Text1\", obj errors in XPression Script (VB.NET). Why?",
    "choices_en": ["VB.NET requires parentheses on calls with arguments (BC30800)", "GetObjectByName doesn't exist", "obj has the wrong type", "Strings need single quotes"],
    "explain_en": "VB.NET requires parentheses: GetObjectByName(\"Text1\", obj). The old parenthesis-free VB6 style raises BC30800."
  },
  {
    "vol": 6, "topic": "Script：出た瞬間に1回",
    "q": "「シーンが表示された瞬間に1回だけ」値をセットしたい。書くイベントは？",
    "choices": ["Scene の OnOnline", "Scene の OnRender", "テキストの OnSetText", "Scene の OnOffline"],
    "answer": 0,
    "explain": "OnOnline はオンエアになった時に1回だけ走る最頻イベント。表示前の重い準備は OnPrepare、毎フレームは OnRender。",
    "q_en": "You want to set values \"once, the moment the scene appears\". Which event?",
    "choices_en": ["The Scene's OnOnline", "The Scene's OnRender", "A text's OnSetText", "The Scene's OnOffline"],
    "explain_en": "OnOnline runs once when the scene goes on air — the most-used event. Heavy prep goes in OnPrepare; per-frame work in OnRender."
  },
  {
    "vol": 6, "topic": "Script：毎フレーム処理",
    "q": "時計のように毎フレーム動かしたい処理を書くイベントと注意点は？",
    "choices": ["Scene の OnRender。重い処理は入れない", "OnOnline。1回で十分", "OnSetText。テキスト専用", "OnExport。書き出し時"],
    "answer": 0,
    "explain": "OnRender は本線描画のたびに走る。毎フレーム実行なので、重いデータ取得などを書くと送出に響く。",
    "q_en": "Which event runs something every frame (like a clock), and what's the caveat?",
    "choices_en": ["The Scene's OnRender — keep it light", "OnOnline — once is enough", "OnSetText — texts only", "OnExport — on export"],
    "explain_en": "OnRender fires on every rendered frame. Because it runs constantly, heavy work there hurts playout."
  },
  {
    "vol": 6, "topic": "Script：別シーンの参照",
    "q": "スクリプトから別のシーン（例：設定用シーン）のオブジェクトを読むには？",
    "choices": ["Engine.GetSceneByName でシーンを取得し、そのシーンに GetObjectByName", "Self.GetObjectByName で直接届く", "Scene.Parent を使う", "できない"],
    "answer": 0,
    "explain": "Engine.GetSceneByName(\"シーン名\", scn) → scn.GetObjectByName(...)。設定用シーンの値をオンエア用シーンの OnOnline で取り込むのが定番（Ross Sports 2013 の実例あり）。",
    "q_en": "How does a script read an object in another scene (e.g. a setup scene)?",
    "choices_en": ["Engine.GetSceneByName to get the scene, then GetObjectByName on it", "Self.GetObjectByName reaches it directly", "Use Scene.Parent", "It can't be done"],
    "explain_en": "Engine.GetSceneByName(\"name\", scn) → scn.GetObjectByName(...). Pulling setup-scene values in the on-air scene's OnOnline is the classic pattern (real example in Ross Sports 2013)."
  },
  {
    "vol": 6, "topic": "Script：共通関数",
    "q": "複数のイベントから呼びたい共通の関数はどこに書く？",
    "choices": ["Script > Global Methods（Global Script Methods Editor）", "各イベントにコピーする", "OnOnline の先頭", "外部の .vb ファイル"],
    "answer": 0,
    "explain": "Global Script Methods にはプロジェクト全体で使える Function / Sub を定義でき、各イベントから名前で呼べる。同じ処理を1か所に書いて使い回す。",
    "q_en": "Where do you write a shared function callable from multiple events?",
    "choices_en": ["Script > Global Methods (the Global Script Methods Editor)", "Copy it into every event", "At the top of OnOnline", "An external .vb file"],
    "explain_en": "Global Script Methods holds project-wide Functions/Subs, callable by name from any event — write a routine once, reuse it everywhere."
  },

  /* ---- RossTalk（第6巻） ---- */
  {
    "vol": 6, "topic": "RossTalk：受信設定",
    "q": "XPressionでRossTalkを受けるための設定は？",
    "choices": ["Hardware Setup → GPI Boards に RossTalk を追加し、Enabled・TCP・ポート7788", "Preferences → Network をON", "DataLinq Server に追加", "Sequencer の設定だけでよい"],
    "answer": 0,
    "explain": "Edit > Hardware Setup > GPI Boards タブ > Add > RossTalk > State=Enabled > TCP > Port 7788 が受信の基本設定。",
    "q_en": "How do you set up XPression to receive RossTalk?",
    "choices_en": ["Hardware Setup → GPI Boards → add RossTalk; Enabled, TCP, port 7788", "Preferences → turn Network on", "Add it in DataLinq Server", "Sequencer settings alone suffice"],
    "explain_en": "Edit > Hardware Setup > GPI Boards tab > Add > RossTalk > State=Enabled > TCP > port 7788 is the standard receive setup."
  },
  {
    "vol": 6, "topic": "RossTalk：終端と大文字小文字",
    "q": "RossTalkコマンドを送っても反応しない。まず疑う送信側の基本2点は？",
    "choices": ["末尾のCR/LF終端と、コマンドの大文字小文字", "ポートとIPだけ", "XPressionの再起動", "シーン名の長さ"],
    "answer": 0,
    "explain": "各コマンドは CR/LF で終端が必須、かつ大文字小文字を区別する（TAKE と take は別物）。この2つが無反応の定番原因。",
    "q_en": "A RossTalk command gets no response. Which two sender-side basics do you check first?",
    "choices_en": ["The trailing CR/LF terminator and the command's letter case", "Just the port and IP", "Restarting XPression", "The scene name's length"],
    "explain_en": "Every command must end with CR/LF, and commands are case-sensitive (TAKE ≠ take). These two are the classic causes of silence."
  },
  {
    "vol": 6, "topic": "RossTalk：buffer番号のずれ",
    "q": "RossTalkの「buffer 0」はXPressionのどのフレームバッファ？",
    "choices": ["フレームバッファ1（番号が1ずれる）", "フレームバッファ0", "プレビュー", "全フレームバッファ"],
    "answer": 0,
    "explain": "RossTalk の buffer 0 = XPression の FB1、buffer 1 = FB2…と1ずれる。TAKE や CLFB の指定ミスの定番。",
    "q_en": "RossTalk's \"buffer 0\" is which XPression framebuffer?",
    "choices_en": ["Framebuffer 1 (numbers are offset by one)", "Framebuffer 0", "The preview", "All framebuffers"],
    "explain_en": "RossTalk buffer 0 = XPression FB1, buffer 1 = FB2, and so on. A classic source of TAKE/CLFB targeting mistakes."
  },
  {
    "vol": 6, "topic": "RossTalk：TAKEとSEQIの違い",
    "q": "TAKE と SEQI、フォーカスバーの動きの違いは？",
    "choices": ["TAKEは動かない／SEQIはその項目へ移動する", "両方動く", "両方動かない", "SEQIだけ動かない"],
    "answer": 0,
    "explain": "TAKE takeid:buffer:layer はフォーカスを動かさず任意テンプレを割り込ませられる。SEQI はフォーカスがその項目に移動する。自動運行中の割り込みは TAKE 向き。",
    "q_en": "TAKE vs SEQI — how does the focus bar behave?",
    "choices_en": ["TAKE leaves it put / SEQI moves it to that item", "Both move it", "Neither moves it", "Only SEQI leaves it put"],
    "explain_en": "TAKE takeid:buffer:layer fires a template without moving focus — good for interrupting automation. SEQI moves the focus to the item."
  },
  {
    "vol": 6, "topic": "RossTalk：中身の更新",
    "q": "オンエア中のテンプレの文字や表示を外部から書き換えるコマンドは？",
    "choices": ["TEMPLATEDATA [takeid]:[object]:[property]:[value]", "TAKE", "FOCUS", "READ"],
    "answer": 0,
    "explain": "例：TEMPLATEDATA 0002:Text1:Visibility:0 で Take 0002 の Text1 を非表示。オブジェクト名・プロパティ名は大文字小文字まで正確に。",
    "q_en": "Which command rewrites text or visibility in an on-air template from outside?",
    "choices_en": ["TEMPLATEDATA [takeid]:[object]:[property]:[value]", "TAKE", "FOCUS", "READ"],
    "explain_en": "E.g. TEMPLATEDATA 0002:Text1:Visibility:0 hides Text1 in Take 0002. Object and property names must match exactly, including case."
  },
  {
    "vol": 6, "topic": "RossTalk：LAYEROFFの特徴",
    "q": "LAYEROFF が SEQO / CLFB と違う点は？",
    "choices": ["テンプレのアウトトランジションを再生して消す", "全フレームバッファを消す", "プレビューだけ消す", "違いはない"],
    "answer": 0,
    "explain": "LAYEROFF buffer:layer は、そのレイヤーのシーンをアウトトランジション付きでオフエアにする。ぶつ切りで消えない「きれいな消し方」。",
    "q_en": "What sets LAYEROFF apart from SEQO / CLFB?",
    "choices_en": ["It plays the template's out transition while removing it", "It clears every framebuffer", "It clears only the preview", "There's no difference"],
    "explain_en": "LAYEROFF buffer:layer takes the scene on that layer off air using its out transition — the clean removal, not a hard cut."
  },
  {
    "vol": 6, "topic": "RossTalk：UPNEXT",
    "q": "UPNEXT [takeid] は何をする？",
    "choices": ["フォーカスを動かさずに指定Take Itemをプレビューに載せる（出画しない）", "即オンエアする", "次の項目へ進めてオンエアする", "レイヤーをクリアする"],
    "answer": 0,
    "explain": "UPNEXT は「次に出すもの」を先に見せるためのプレビュー設定。出画は READ / NEXT / TAKE で行う。",
    "q_en": "What does UPNEXT [takeid] do?",
    "choices_en": ["Puts that take item on preview without moving focus (doesn't air it)", "Airs it immediately", "Advances and airs the next item", "Clears a layer"],
    "explain_en": "UPNEXT stages what goes next on the preview. Actually airing is done with READ / NEXT / TAKE."
  },
  {
    "vol": 6, "topic": "RossTalk：擬似GPI",
    "q": "配線なしで、RossTalkからGPIトリガーを発火させる書式は？",
    "choices": ["GPI [gpi番号]:[state]（stateは0/1）", "TRIGGER [番号]", "GPIO [番号]", "FIRE [番号]"],
    "answer": 0,
    "explain": "GPI 3:1 のように送ると、Keyboard/GPI Mapping で割り当てた機能をソフト的に叩ける（最大64入力）。物理接点なしでGPI運用を試せる。",
    "q_en": "Which syntax fires a GPI trigger from RossTalk without wiring?",
    "choices_en": ["GPI [gpi number]:[state] (state is 0/1)", "TRIGGER [number]", "GPIO [number]", "FIRE [number]"],
    "explain_en": "Sending e.g. GPI 3:1 fires the function mapped in Keyboard/GPI Mapping in software (up to 64 inputs) — GPI workflows without physical contacts."
  },
  {
    "vol": 6, "topic": "RossTalk：消すコマンド",
    "q": "「レイヤー単位で消す」「全部消す」の組み合わせとして正しいのは？",
    "choices": ["CLFB [buffer]:[layer] ／ CLRA", "SEQO ／ TAKE", "LAYEROFF ／ SEQI", "CLFB ／ READ"],
    "answer": 0,
    "explain": "CLFB がフレームバッファ/レイヤーのクリア、CLRA が全消し。トランジション付きで消したいときは LAYEROFF を使う。",
    "q_en": "Which pair is \"clear one layer\" / \"clear everything\"?",
    "choices_en": ["CLFB [buffer]:[layer] / CLRA", "SEQO / TAKE", "LAYEROFF / SEQI", "CLFB / READ"],
    "explain_en": "CLFB clears a framebuffer/layer; CLRA clears all. Use LAYEROFF when you want the out transition."
  },
  {
    "vol": 6, "topic": "RossTalk：使いどころ",
    "q": "Advance-next型のGPIと比べた、RossTalkの運用上の強みは？",
    "choices": ["任意の順番で任意のテンプレを呼べる", "配線が不要になるだけ", "画質が上がる", "遅延がゼロになる"],
    "answer": 0,
    "explain": "GPIは「次へ」型の順送りが基本だが、RossTalkは TAKE/SEQI で任意順のリコールができる。スイッチャー・自動運行・自作ツールからの制御に向く。",
    "q_en": "Compared with advance-next GPI, what's RossTalk's operational strength?",
    "choices_en": ["Recalling any template in any order", "Just saving wiring", "Better picture quality", "Zero latency"],
    "explain_en": "GPI is basically sequential \"next\"; RossTalk recalls in any order via TAKE/SEQI — suited to switchers, automation, and custom tools."
  },

  /* ---- Dynamic Material（第5巻） ---- */
  {
    "vol": 5, "topic": "DynMat：解決できる4種",
    "q": "Dynamic Material の Material Path が解決できるのは？",
    "choices": ["ファイルパス／マテリアル名／色(#AARRGGBB)／ClipStore(recallid:)", "ファイルパスだけ", "マテリアル名と色だけ", "URLだけ"],
    "answer": 0,
    "explain": "パス文字列は4種に解決される：ファイル（相対/絶対）、プロジェクト内マテリアル名、#AARRGGBB の色、recallid:[project]:[recallid] の ClipStore。",
    "q_en": "What can a Dynamic Material path resolve to?",
    "choices_en": ["A file path / a material name / a color (#AARRGGBB) / ClipStore (recallid:)", "Only file paths", "Only material names and colors", "Only URLs"],
    "explain_en": "The path string resolves four ways: a file (relative/absolute), a project material name, an #AARRGGBB color, or ClipStore via recallid:[project]:[recallid]."
  },
  {
    "vol": 5, "topic": "DynMat：色指定の書式",
    "q": "Material Path に #FF0A64FF と書いた。先頭の FF は何？",
    "choices": ["不透明度（AA）。#AARRGGBB形式", "赤成分", "予約語", "エラーになる"],
    "answer": 0,
    "explain": "色は #AARRGGBB。AA=不透明度、RR/GG/BB=色。FF0A64FF は不透明の青系。RGBだけのつもりで書くと1バイトずれる。",
    "q_en": "You type #FF0A64FF into Material Path. What is the leading FF?",
    "choices_en": ["The alpha (AA) — the format is #AARRGGBB", "The red component", "A reserved word", "It errors"],
    "explain_en": "Colors are #AARRGGBB: AA = alpha, then RR/GG/BB. #FF0A64FF is an opaque blue. Writing plain RGB shifts everything by one byte."
  },
  {
    "vol": 5, "topic": "DynMat：ClipStore呼び出し",
    "q": "ClipStore の内容を Material Path で呼ぶ正しい書式は？",
    "choices": ["recallid:[project]:[recallid]（先頭の recallid: を忘れない）", "clipstore://project/id", "[project]:[recallid] だけ", "cs:[recallid]"],
    "answer": 0,
    "explain": "例：recallid:MyProject:1024。先頭の recallid: が無いとファイル名やマテリアル名として解釈されてしまう。",
    "q_en": "The correct syntax to recall ClipStore content in a Material Path?",
    "choices_en": ["recallid:[project]:[recallid] (don't drop the leading recallid:)", "clipstore://project/id", "Just [project]:[recallid]", "cs:[recallid]"],
    "explain_en": "E.g. recallid:MyProject:1024. Without the leading recallid: the string is read as a file or material name."
  },
  {
    "vol": 5, "topic": "DynMat：連番画像",
    "q": "連番画像を動画として使いたいとき、Material Path の先頭に付けるのは？",
    "choices": ["video:", "seq:", "anim:", "movie:"],
    "answer": 0,
    "explain": "video:seq/flag/ のように前置する。付けないと1枚の静止画と解釈されることがある。",
    "q_en": "To use a numbered image sequence as a movie, what do you prefix the Material Path with?",
    "choices_en": ["video:", "seq:", "anim:", "movie:"],
    "explain_en": "Write e.g. video:seq/flag/. Without the prefix it may be read as a single still image."
  },
  {
    "vol": 5, "topic": "DynMat：@名前@の解決順",
    "q": "@TeamTriCode@ のようなマクロは、何をどの順で探す？",
    "choices": ["同名のテキストオブジェクト→無ければウィジェット", "ウィジェット→テキスト", "グローバルマクロだけ", "DataLinqキーだけ"],
    "answer": 0,
    "explain": "@名前@ はまずテキストオブジェクト、無ければウィジェット。両方あるときは @W:名前@ でウィジェットを、@G:名前@ でグローバルマクロを強制できる。",
    "q_en": "In what order does a macro like @TeamTriCode@ resolve?",
    "choices_en": ["A text object of that name first, then a widget", "Widget first, then text", "Global macros only", "DataLinq keys only"],
    "explain_en": "@Name@ looks for a text object first, then a widget. When both exist, force the widget with @W:Name@ or a global macro with @G:Name@."
  },
  {
    "vol": 5, "topic": "DynMat：%datalinqkey%",
    "q": "Material Path の中の %datalinqkey% は何に置き換わる？",
    "choices": ["DataLinqキーの実際の値", "プロジェクト名", "オブジェクト名", "日付"],
    "answer": 0,
    "explain": "%キー名% はDataLinqの値に置換される。%teamColor% が #AARRGGBB なら色として、素材名なら素材として解決される、データ駆動の要。",
    "q_en": "What does %datalinqkey% inside a Material Path become?",
    "choices_en": ["The actual value of that DataLinq key", "The project name", "The object name", "The date"],
    "explain_en": "%key% is replaced with the DataLinq value. If %teamColor% is #AARRGGBB it acts as a color; if it's a material name, as that material — the heart of data-driven looks."
  },
  {
    "vol": 5, "topic": "DynMat：設定場所",
    "q": "Dynamic Material はどこで設定する？",
    "choices": ["Object Inspector → Materials（DataLinq）→ Dynamic Material にチェック → Material Path", "Edit → Preferences", "DataLinq Server", "Visual Logic Editor"],
    "answer": 0,
    "explain": "対象オブジェクトの Object Inspector で設定。Material Path 欄は右クリック → Insert Lookup からマクロを挿入できる。",
    "q_en": "Where do you set up Dynamic Material?",
    "choices_en": ["Object Inspector → Materials (DataLinq) → tick Dynamic Material → Material Path", "Edit → Preferences", "DataLinq Server", "The Visual Logic Editor"],
    "explain_en": "It's configured in the object's Object Inspector. Right-click the Material Path field → Insert Lookup to insert macros."
  },
  {
    "vol": 5, "topic": "DynMat：解決不能時",
    "q": "パスが解決できなかったとき素材を残したくない。使う設定は？",
    "choices": ["Clear material when material path is unresolvable にチェック", "Material Path を空にしておく", "Visible を切るVLを組む", "できない"],
    "answer": 0,
    "explain": "このチェックを入れると、解決不能時に前の素材が残らない。「前のチームのロゴが出っぱなし」事故の防止。",
    "q_en": "You don't want a leftover material when the path can't resolve. Which setting?",
    "choices_en": ["Tick \"Clear material when material path is unresolvable\"", "Keep the Material Path empty", "Build VL to switch Visible off", "It can't be done"],
    "explain_en": "With the checkbox on, no material remains when resolution fails — preventing the \"previous team's logo stays up\" accident."
  },
  {
    "vol": 5, "topic": "DynMat：ロゴ差替の定番",
    "q": "チームコードのテキストに連動してロゴ画像を差し替える Material Path の定番は？",
    "choices": ["logos/@TeamTriCode@.png のようにフォルダ＋マクロ＋拡張子", "ロゴごとにシーンを分ける", "Script必須", "手動で差し替える"],
    "answer": 0,
    "explain": "@TeamTriCode@ が実際のコード（例 NYY）に置換され logos/NYY.png を読む。命名規則を揃えておくのが前提。",
    "q_en": "The classic Material Path for swapping a logo image based on a team-code text?",
    "choices_en": ["Folder + macro + extension, e.g. logos/@TeamTriCode@.png", "A separate scene per logo", "Script is required", "Swap it by hand"],
    "explain_en": "@TeamTriCode@ becomes the code (e.g. NYY), loading logos/NYY.png. It relies on a consistent file-naming convention."
  },
  {
    "vol": 5, "topic": "DynMat：使いすぎ注意",
    "q": "Dynamic Material を多用しすぎたときに起きやすい問題は？",
    "choices": ["どこで何が差し替わるのか追えなくなり、管理・デバッグが難しくなる", "画質が落ちる", "ライセンス違反になる", "特に問題ない"],
    "answer": 0,
    "explain": "呼び出し設計の機能なので、乱用すると「なぜこの絵になったか」を追えなくなる。命名規則と使う場所の設計が本体（第5巻 第5章）。",
    "q_en": "What tends to happen when Dynamic Material is overused?",
    "choices_en": ["You lose track of what swaps where — management and debugging get hard", "Image quality drops", "It violates the license", "Nothing in particular"],
    "explain_en": "It's a \"how things get called\" feature; overuse makes the picture untraceable. Naming rules and deciding where to use it are the real design (Vol.5, Ch.5)."
  },

  /* ---- DataLinq（第5巻） ---- */
  {
    "vol": 5, "topic": "DataLinq：Excelを読む",
    "q": "Excel（XLSX）をDataLinqで読む定番のソースは？",
    "choices": ["ADODB DataLinq Source（OLEDB/ODBC経由・ACE/Jetプロバイダが必要）", "Text DataLinq Source", "RSS/HTTP", "WebSocket"],
    "answer": 0,
    "explain": "ExcelはADODBで読む。ACE/Jetプロバイダの導入（32bitに注意）と、本番機側の読み取り環境確認が前提。CSVはTextソース。",
    "q_en": "The standard source for reading Excel (XLSX) via DataLinq?",
    "choices_en": ["ADODB DataLinq Source (via OLEDB/ODBC; needs the ACE/Jet provider)", "Text DataLinq Source", "RSS/HTTP", "WebSocket"],
    "explain_en": "Excel is read through ADODB — install the ACE/Jet provider (mind 32-bit) and verify the playout machine's setup. CSV goes through the Text source."
  },
  {
    "vol": 5, "topic": "DataLinq：CSVの列名",
    "q": "CSVの1行目を「列名＝キー」として使いたい。Textソースで入れる設定は？",
    "choices": ["Text File has Header Row にチェック", "Delimiter を Comma にするだけ", "Encoding を UTF-8 にするだけ", "設定不要"],
    "answer": 0,
    "explain": "Header Row を有効にすると先頭行が見出しになり、列名でバインドできる。Delimiter は実データの区切りに合わせる。",
    "q_en": "You want the CSV's first row as column names (keys). Which Text-source setting?",
    "choices_en": ["Tick \"Text File has Header Row\"", "Just set Delimiter to Comma", "Just set Encoding to UTF-8", "No setting needed"],
    "explain_en": "With Header Row on, the first line becomes headers and you bind by column name. Match Delimiter to the actual data."
  },
  {
    "vol": 5, "topic": "DataLinq：ネットワークドライブ",
    "q": "ネットワークドライブ上のファイルをDataLinqで読むとき、更新検知はどちらが推奨？",
    "choices": ["Poll every N seconds（定期読み直し）", "Wait for file change events（変更イベント検知）", "毎回手動で再読込", "どちらでも同じ"],
    "answer": 0,
    "explain": "変更イベント検知はネットワークドライブでは不確実なので非推奨。Pollで定期的に読み直す（短すぎる間隔は負荷に注意）。",
    "q_en": "For files on a network drive, which update detection is recommended?",
    "choices_en": ["Poll every N seconds (periodic re-read)", "Wait for file change events", "Manual reload every time", "They're equivalent"],
    "explain_en": "File-change events are unreliable on network drives. Poll periodically instead (but not too frequently)."
  },
  {
    "vol": 5, "topic": "DataLinq：JSONと文字コード",
    "q": "JSON DataLinq で日本語が文字化けした。まず確認するのは？",
    "choices": ["ファイルがUTF-8で保存されているか", "XPressionの言語設定", "フォント", "ポート番号"],
    "answer": 0,
    "explain": "JSONはUTF-8が前提（実機検証済み：他のエンコーディングでは化ける）。Encoding設定は実ファイルに合わせる。",
    "q_en": "Japanese text from a JSON DataLinq shows garbled. First thing to check?",
    "choices_en": ["Whether the file is saved as UTF-8", "XPression's language setting", "The font", "The port number"],
    "explain_en": "JSON expects UTF-8 (hardware-verified: other encodings garble). Match the Encoding setting to the real file."
  },
  {
    "vol": 5, "topic": "DataLinq：Table Presets",
    "q": "JSON/データソースの「Table Presets」は実運用で何に使える？",
    "choices": ["読み込むファイル（テーブル）をプリセットで切り替える", "文字色のプリセット", "レイアウトの保存", "使い道はない"],
    "answer": 0,
    "explain": "Table Presets でソースの向き先をプリセット切替できる（実機検証済み：試合ごとのファイル切替などに便利）。",
    "q_en": "What is \"Table Presets\" good for in practice?",
    "choices_en": ["Switching which file (table) the source reads via presets", "Text-color presets", "Saving layouts", "It has no use"],
    "explain_en": "Table Presets switches the source's target as presets (hardware-verified — handy for per-game file switching)."
  },
  {
    "vol": 5, "topic": "DataLinq：TCP受信の約束",
    "q": "XML/JSON TCP DataLinq で外部からデータを送るときの約束は？",
    "choices": ["各送信データをNULL文字で終端する（既定ポート7327）", "改行で終端する", "終端は不要", "必ずUDPを使う"],
    "answer": 0,
    "explain": "ソケット送信は各データを NULL 文字で終端する必要がある。既定ポートは 7327。RossTalk の CR/LF と混同しない。",
    "q_en": "When pushing data to the XML/JSON TCP DataLinq, what's the rule?",
    "choices_en": ["Terminate each transmission with a NULL character (default port 7327)", "Terminate with a newline", "No terminator needed", "Always use UDP"],
    "explain_en": "Each socket transmission must end with a NULL character; the default port is 7327. Don't confuse it with RossTalk's CR/LF."
  },
  {
    "vol": 5, "topic": "DataLinq：オンエア中の更新",
    "q": "オンエア中もデータの変化を表示に反映させたい。Set DataLinq Properties で入れる設定は？",
    "choices": ["Live Update にチェック", "Poll を0にする", "Entity Decoding にチェック", "Prepend を設定"],
    "answer": 0,
    "explain": "Live Update でデータ変化時に自動更新される。&amp; などの実体参照を戻すのは Entity Decoding、単位付けは Prepend/Append と役割が違う。",
    "q_en": "You want on-air graphics to follow data changes. Which Set DataLinq Properties option?",
    "choices_en": ["Tick Live Update", "Set Poll to 0", "Tick Entity Decoding", "Set Prepend"],
    "explain_en": "Live Update refreshes automatically when data changes. Entity Decoding fixes HTML entities; Prepend/Append adds fixed text — different jobs."
  },
  {
    "vol": 5, "topic": "DataLinq：単位を足す",
    "q": "DataLinqの値「25」を「25pt」と表示したい。データを変えずに済む方法は？",
    "choices": ["Set DataLinq Properties の Append に「pt」を設定", "元データに pt を書き足す", "Visual Logic で連結する以外ない", "できない"],
    "answer": 0,
    "explain": "Prepend / Append で値の前後に固定文字を付加できる。データ側を汚さず表示だけ整えられる。",
    "q_en": "You want the DataLinq value \"25\" to display as \"25pt\" without touching the data. How?",
    "choices_en": ["Set \"pt\" in Append under Set DataLinq Properties", "Edit the source data to include pt", "Only by concatenating in Visual Logic", "It can't be done"],
    "explain_en": "Prepend/Append adds fixed text around the value — the display is shaped without polluting the data."
  },
  {
    "vol": 5, "topic": "DataLinq：同名ソースの動き",
    "q": "複数のDataLinq Serverに同名ソースがあるとき、XPressionはどう振る舞う？",
    "choices": ["自動フェイルオーバーする（追加順が優先度）", "エラーで止まる", "常に両方から読む", "ランダムに選ぶ"],
    "answer": 0,
    "explain": "同名ソースは自動フェイルオーバーの仕組みとして働き、追加順＝優先度。冗長化に使えるが、意図しない同名は事故のもと。",
    "q_en": "With same-named sources on multiple DataLinq Servers, what does XPression do?",
    "choices_en": ["It fails over automatically (add order = priority)", "It stops with an error", "It always reads both", "It picks randomly"],
    "explain_en": "Same-named sources act as automatic failover, with add order as priority. Useful for redundancy; accidental name clashes cause confusion."
  },
  {
    "vol": 5, "topic": "DataLinq：来てない？出てない？",
    "q": "「表示が変わらない」とき、“データが来ているか”をDataLinq側で確かめる道具は？",
    "choices": ["DataLinq Data Logger", "Render View", "Script Editor", "Sequencer"],
    "answer": 0,
    "explain": "まず Data Logger で「来ているか」を見る。来ていれば表示側（バインド・Live Update・Scene）、来ていなければソース側（接続・パス・形式）と切り分けられる。",
    "q_en": "The display won't change. Which tool checks \"is the data even arriving?\" on the DataLinq side?",
    "choices_en": ["The DataLinq Data Logger", "Render View", "The Script Editor", "The Sequencer"],
    "explain_en": "Check arrival with the Data Logger first. If data arrives, suspect the display side (binding, Live Update, scene); if not, the source side (connection, path, format)."
  }
];
