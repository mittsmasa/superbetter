# SuperBetter

これは スーパーベターになろう！──ゲームの科学で作る「強く勇敢な自分」 を効率よく実践するためのアプリケーションです
Next.js、PandaCSS、Drizzle ORMを使用したウェブアプリケーション

## アプリケーション
https://www.superbetter.app/

## Storybook
https://mittsmasa.github.io/superbetter

## Font
[PixelMplus](https://itouhiro.hatenablog.com/entry/20130602/font) を使わせていただいております。感謝。

## Icon
[PixelartIcons](https://pixelarticons.com/) を使わせていただいております。感謝。


## セットアップ

1. 依存関係のインストール
```bash
pnpm install
```

2. データベースの起動
```bash
docker compose up -d
```

3. データベースのマイグレーション
  
```bash
pnpm drizzle:migrate
```

4. （オプション）シードデータの投入
```bash
pnpm drizzle:seed
```

## 開発

開発サーバーの起動:
```bash
pnpm dev
```

## 利用可能なスクリプト

### アプリケーション関連
- `pnpm dev` - 開発サーバーの起動（Turboモード）
- `pnpm build` - プロダクションビルド
- `pnpm start` - プロダクションサーバーの起動

### データベース関連
- `pnpm drizzle:gen` - Drizzleのマイグレーションファイル生成
- `pnpm drizzle:migrate` - マイグレーションの実行
- `pnpm drizzle:push` - スキーマの変更をデータベースに反映
- `pnpm drizzle:studio` - DrizzleStudioの起動（データベース管理UI）
- `pnpm drizzle:seed` - シードデータの投入

### 開発ツール
- `pnpm check` - Biomeによるコード品質チェック
- `pnpm check:fix` - Biomeによる自動修正
- `pnpm type-check` - TypeScriptの型チェック
- `pnpm storybook` - Storybookの起動
- `pnpm storybook:build` - Storybookのビルド

### その他
- `pnpm prepare` - PandaCSSのコード生成（自動実行）

