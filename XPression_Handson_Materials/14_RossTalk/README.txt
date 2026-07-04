14_RossTalk ハンズオン用 DashBoardサンプルパネル
=================================================
ハンズオン「RossTalkで外部からTakeする」用の、実機検証済み
DashBoard CustomPanelを同梱しています（DashBoardはRoss公式の無料ツール）。

ファイル
  XPression_Handson_RossTalk.grid … CustomPanel本体
  （DashBoardで File > Open File から開く）

使う前に直すところ（2箇所だけ）
  1. 各ボタンのRossTalkタスクの Host：
     XPressionと同じPCなら localhost のまま。
     別PCならXPression機のIPアドレスに変更。
  2. Port：XPression側 Hardware Setup > GPI / Tally Boards >
     Smart GPI / RossTalk の Incoming TCP Port に合わせる（既定例 7788）。

パネルのボタン構成（推奨）
  [TAKE 2]      … Take ID 0002 を送出（フォーカス不動）
  [SEQO 2]      … Take ID 0002 を下げる
  [SEQI 2]      … フォーカスを移動して送出（TAKEとの違い確認用）
  [LAYEROFF]    … Outトランジション付きで消す
  [CLFB / CLRA] … 即クリア（消え方の違い確認用）
  [選手切替 1〜6] … DATALINQKEY 0002:PlayerNo:N → CUE 0002 →
                    Pause 200ms → TAKE 2 の4タスク連続
                    （13_JSON_PlayerList ハンズオンと連動）
  [DATA切替]      … Table欄=Players_%TeamTable% 方式（実機検証済み）。
                    DATALINQKEY 0002:TeamTable:Player / Empty で表ごと切替
  [GPI 1]       … シミュレートGPI（Keyboard/GPI Mappingの割当先が動く）

ポイント
  ・値を変えて即TAKEは反映が間に合わないことがある。
    DATALINQKEY → CUE → Pause(200ms) → TAKE の順が定石。
  ・コマンド一覧・書式はアプリ内「RossTalkコマンド」カード
    （フラッシュカード）と逆引きCookbookを参照。
