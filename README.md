# XENO Frontend

React + TypeScript + Vite で実装した対戦カードゲーム向けフロントエンドです。

## 機能

- `/api/status` への疎通確認画面
- `/api/webSoket` への WebSocket 接続画面
- ランダム行動するコンピュータ対戦モード（CPU Battle）
- 接続状態表示（idle / connecting / open / closed / error）
- WS 受信ログの時系列表示
- `type` ごとのハンドリング基盤
- `judge_win / judge_lose / judge_draw` 受信時の結果表示
- 指数バックオフによる再接続（最大試行回数あり）

## セットアップ

1. 依存インストール

```bash
npm install
```

2. 環境変数ファイル作成

```bash
cp .env.example .env
```

3. 開発サーバー起動

```bash
npm run dev
```

## 環境変数

- `VITE_API_BASE_URL`（例: `http://localhost:8000`）
- `VITE_WS_BASE_URL`（例: `ws://localhost:8000`）

`VITE_WS_BASE_URL` を省略した場合は `VITE_API_BASE_URL` から自動導出されます。

## 注意点

- バックエンドの WebSocket パスは仕様通り `webSoket`（`Socket` ではない）を利用しています。
- `mode` は `player` と `audiences` の2種類を想定しています。
