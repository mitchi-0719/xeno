# WebSocketの通信詳細

## 通信タイミング

- ゲーム開始
- ドロ―
- カードシャッフル（並び替え時）
- カード使用（カードに応じてその後も通信）

## 通信詳細

クライアントをAとB、サーバをSとして記述する。

### ゲーム開始時

AとS、BとSでそれぞれコネクションを確立
S -> A・B: 初期手札を提供

### プレイヤードロー時

（Aのドロ―した時の挙動）
S -> A：配ったカードを手札の2枚目として伝達
S -> B：2枚目にカードが1枚追加されたことを伝達

### プレイヤーのカードシャッフル

（Aがシャッフルしたときの挙動）

### カード使用

全てAが使用したときの挙動

#### 1(少年)

1枚目
A -> S: カードを使用
S -> B: カードが使用されたことを伝える

2枚目
A -> S: カードを使用（サーバで枚数を判断）
S -> B: カードを1枚渡す
S -> A: Bの手札のカード情報を提供
A -> S: カードをどちらか選択
S -> B: 選ばれたカード情報を提供
S -> A: 捨てられたカード情報を提供

#### 2（兵士）

A -> S: カードの番号を選択
S -> B: 選択されたカード番号の情報と成功・失敗の情報を提供（転生の有無を含む）
S -> A: 成功・失敗の情報を提供（転生の有無を含む）

#### 3（占い師）

A -> S: カードの使用
S -> B: カードが使用されたことを伝える
S -> A: カード番号を提供

#### 4（乙女）

A -> S: カードの使用
S -> B: カードが使用されたことを伝える
（サーバで防がれるかの判定はする）

#### 5（死神）

A -> S: カードを使用
S -> B: カードを1枚渡す
S -> A: Bの手札のカードの順序のみを提供
A -> S: カードをどちらか選択
S -> B: 選ばれたカード情報を提供
S -> A: 捨てられたカード情報を提供

#### 6（貴族）

1枚目
A -> S: カードを使用
S -> B: カードが使用されたこと、相手のカードの番号を伝える
S -> A: 相手のカードの番号を伝える

2枚目
A -> S: カードを使用
S -> B: カードが使用されたこと、相手のカード番号、勝敗を伝える
S -> A: 相手のカード番号、勝敗を伝える

#### 7（賢者）

A -> S: カードの使用
S -> B: カードが使用されたことを伝える

次ターン冒頭
S -> A: カードを3枚提供
S -> B: 3枚提供されたことを伝える
A -> S: 選んだカードのインデックスを伝える
S -> B: どのカードを選んだかを伝える（インデックス）

#### 8（精霊）

A -> S: カードの使用
S -> B: カードが使用されたことを伝え、Aのカードを提供
S -> A: Bのカードを提供

#### 9（皇帝）

A -> S: カードを使用（サーバで枚数を判断）
S -> B: カードを1枚渡す
S -> A: Bの手札のカード情報を提供
A -> S: カードをどちらか選択
S -> B: 選ばれたカード情報を提供
S -> A: 捨てられたカード情報を提供

#### 10

転生時
勝利宣言orカードが捨てられたときに、転生札で転生する旨を伝達し、転生札情報を提供

## 疑問点

- ターンの開始時に同期処理的なものって必要かな？
  - やるなら、Nターン目という情報を双方に提供することになる気がする
- 捨て札の情報を常に提供したほうがいいのか？
  - ターン開始時に提供するのがいいのかも知れない

## 図解

### 基本通信

​```mermaid
sequenceDiagram
autonumber
participant A as クライアントA
participant S as サーバ(S)
participant B as クライアントB

    alt
    Note over A, B: ゲーム開始時
    A->>S: コネクション確立
    B->>S: コネクション確立
    S-->>A: カード対応表を提供 (card_info)
    S-->>B: カード対応表を提供 (card_info)
    S-->>A: 初期手札を提供 (card_draw)
    S-->>B: 初期手札を提供 (card_draw)
    end

    alt
    Note over A, B: プレイヤードロー時 (Aのターン)
    S-->>A: カード伝達 (card_draw)
    S-->>B: カード追加を通知 (opponent_card_draw)
    end

    alt
    Note over A, B: カードスワップ
    A->>S: スワップ回数を送る (card_swap)
    S-->>B: N回スワップしたことを伝える (opponent_swap)
    end

​```

### カード利用

​```mermaid
sequenceDiagram
autonumber
participant A as クライアントA
participant S as サーバ(S)
participant B as クライアントB

    alt 1(少年) / 5(死神) / 9(皇帝) ※共通ロジック
        A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        S-->>B: 新しいカードを提供 (card_draw)
        B->>S: シャッフル回数を提供 (card_swap)
        S-->>A: Bの手札情報を提供 (put_action1/5/9)
        A->>S: カードを選択 (select_card)
        S-->>B: 選ばれたカード情報を通知 (select_action1/5/9)
        S-->>A: 捨てられたカード情報を通知 (select_action1/5/9)
    end
    alt 2(兵士)
        A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        A->>S: カード番号を選択して送信 (select_card_number2)
        S-->>B: 選択番号、成功/失敗、転生有無を通知 (select_action2)
        S-->>A: 成功/失敗、転生有無を通知 (select_action2)
    	end
    alt 3(占い師)
        A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        S-->>A: BのカードIDを提供 (put_action3)
    	end
    alt 4(乙女)
        A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        Note over S: サーバー側で防御フラグを立てる
        Note over A,B: 防御フラグが立っている時に1,2,3,5,6,8,9のカードが使われた時（opponent_card_putの後に返す）
        S-->>A: 防がれたことを通知 (guard_action)
        S-->>B: カード使用通知 (guard_action)
    	end
    alt 6(貴族)
        Note over A, B: 1,2枚目共通処理
        A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        S-->>A: BのカードIDを通知 (put_action_6)
        S-->>B: AのカードIDを通知 (put_action_6)
        Note over S: 2枚目追加処理
        S-->>B: 勝敗結果を通知 (judge_*)
        S-->>A: 勝敗結果を通知 (judge_*)
    	end
    alt 7(賢者)
        A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        Note over A, B: 次ターン冒頭
        S-->>A: 選択肢としてカード3枚提供 (three_draw_action)
        S-->>B: Aが3枚引いたことを通知 (opponent_card_draw)
        A->>S: 選んだカードのインデックスを回答 (select_card)
        S-->>B: 選ばれたインデックスを通知 (opponent_card_select)
    	end
    alt 8(精霊)
    	    A->>S: カードを使用 (use_card)
        S-->>B: カード使用通知 (opponent_card_put)
        S-->>A: Bのカードを提供 (put_action8)
        S-->>B: Aのカードを提供 (put_action8)
    	end
    alt 10(英雄)
        Note over S: Aが10を持っていた場合
        S-->>A: 転生後時に追加で捨てられたカードの通知 (reincarnetion_card_trash)
        S-->>B: 転生後時に追加で捨てられたカードの通知 (reincarnetion_card_trash)
        S-->>A: 転生後のカードを提供 (reincarnetion_draw)
        S-->>B: 転生したことを伝える (opponent_reincarnetion)
    	end

​```
