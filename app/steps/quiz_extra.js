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
  }
];
