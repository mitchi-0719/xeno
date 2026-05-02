あなたはシニアフロントエンドエンジニアです。  
以下の要件で、React + TypeScript のフロントエンド実装を進めてください。  
曖昧な点は合理的に仮定し、必ず「仮定一覧」を明記してから実装してください。

# 目的

Python(Sanic)製バックエンドに接続する、対戦カードゲーム用フロントエンドを実装する。  
バックエンドは以下のエンドポイントを持つ。

- GET `/api/status`
- WebSocket `/api/webSoket?user_id=<string>&room_id=<string/int>&mode=<player|audiences>`

# バックエンド情報（重要）

```python
@app.get("/api/status")
async def get_status(request):
    return response.json({
        "status": "online",
        "message": "Sanic backend is running!"
    })

@app.websocket("/api/webSoket")
async def get_websocet(request: Request, ws: Websocket):
    user_id = request.args.get("user_id")
    room_id = request.args.get("room_id")
    mode = request.args.get("mode", "player")
    await ws_manager.add_connection(room_id, user_id, ws, mode)
```

WebSocketで受信するメッセージは `type` フィールドを持つJSONで、代表例:

- `put_action1` ～ `put_action9`
- `select_action1` ～ `select_action9`
- `card_draw`
- `opponent_card_draw`
- `opponent_card_put`
- `reincarnation`
- `corr_swap`
- `judge_win` / `judge_lose` / `judge_draw`

# 技術スタック指定

- React
- TypeScript
- Vite
- React Router
- Zustand（グローバル状態管理）
- zod（WSメッセージバリデーション）
- TanStack Query（REST取得）
- 任意の軽量UIライブラリ（未指定なら素のCSSで可）

# 実装要件

1. 最小構成で起動可能なプロジェクトを作成する
2. `/api/status` の疎通確認画面を作る
3. WS接続画面を作る
   - 入力: user_id, room_id, mode
   - 接続/切断ボタン
   - 接続状態表示 (idle/connecting/open/closed/error)
4. WS受信ログを時系列表示する
5. `type` ごとにハンドリングを分ける土台を作る（switch文など）
6. `judge_win/lose/draw` を受信したら結果表示エリアを更新する
7. 再接続戦略を実装する（指数バックオフ、最大試行回数あり）
8. エラーハンドリングを実装する（JSON parse失敗、通信切断）
9. すべてTypeScriptで型を付ける
10. zodで最低限のメッセージスキーマを作る（共通 + 主要type）

# 非機能要件

- 可読性重視
- ファイル分割を適切に行う
- コメントは必要最小限
- `npm run dev` で動く状態
- `.env.example` を用意し、API/WSのベースURLを設定可能にする

# 期待する成果物の出力形式

必ず以下の順で回答してください。

1. 実装方針（箇条書き）
2. ディレクトリ構成
3. 追加・作成する全ファイル一覧
4. 各ファイルのコード全文
5. セットアップ手順
6. 動作確認手順
7. 今後の拡張ポイント
8. 仮定一覧（Assumptions）

# 制約

- バックエンド側コードは変更しない前提
- ただしバックエンド仕様に不整合の可能性がある箇所は「注意点」として明記する
- 実装を途中で省略しない（「以下同様」は不可）
- すべて日本語で説明する
