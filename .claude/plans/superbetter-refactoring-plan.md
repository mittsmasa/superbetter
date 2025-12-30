# SuperBetter コード重複リファクタリング計画

## 実施日: 2025-12-14

## 概要

similarity-tsツールによる自動検出と手動コード調査の結果を基に、SuperBetterアプリケーションの重複コードをリファクタリングします。

---

## similarity-ts 検出結果サマリー

### 実行コマンド
```bash
pnpm similarity:check           # 全体スキャン (閾値: 0.85, 最小行数: 10)
pnpm similarity:check:actions   # サーバーアクション (閾値: 0.90, 最小行数: 5)
pnpm similarity:check:components # コンポーネント (閾値: 0.85, 最小行数: 10)
```

### 自動検出された重複

**関数の重複 (3件):**

1. **achievement-helpers.ts 内部の重複** (類似度: 89.02%, 40.5 points)
   - `getMissionsWithConditions` (129-169行)
   - `buildDailyAchievements` (171-220行)

2. **weekly集計関数の重複** (類似度: 100.00%, 36.0 points)
   - `getWeeklyAchievements` (get-weekly-achievements.ts:10-38)
   - `getWeeklyPosNegScores` (get-weekly-pos-neg-scores.ts:18-60)

3. **履歴操作ハンドラーの重複** (類似度: 90.00%, 21.2 points)
   - `handleDelete` (entity-history-item.tsx:57-80)
   - `handleAdd` (entity-list-content.tsx:52-74)

**型の重複 (1件):**

- `EntityHistorySectionContentProps` vs `EntityHistorySectionProps` (類似度: 92.80%)

### 自動検出されなかった主要な重複

similarity-tsは**変数名やテーブル名の違い**により以下の明らかな重複を検出できませんでした：

**サーバーアクション:**
- get-quest.ts / get-powerup.ts / get-villain.ts (64行, 完全同一構造)
- post-quest-history.ts / post-powerup-history.ts / post-villain-history.ts (56-57行)

**UIコンポーネント:**
- quest-list.tsx / powerup-list.tsx / villain-list.tsx (63行, 完全同一構造)
- execute-button.tsx (4エンティティ: quest/powerup/villain/epicwin)

---

## 手動調査による重複パターン分析

### パターン1: エンティティCRUD操作（最優先）

**対象ファイル:** quest, powerup, villain の3エンティティ

| ファイルタイプ | 行数 | 重複度 | ファイル数 |
|--------------|------|--------|-----------|
| get-{entity}.ts | 64行 | 100% | 3 |
| post-{entity}-history.ts | 56-57行 | 95%+ | 3 |
| {entity}-list.tsx | 63行 | 100% | 3 |
| execute-button.tsx | ~30行 | 95%+ | 4 |

**違いは以下のみ:**
- テーブル名 (quests / powerups / villains)
- 関数名 (getQuest / getPowerup / getVillain)
- 変数名の短縮形 (q / pup / v)
- ルートパス (/quests / /powerups / /villains)

**削減見込み:**
- get-{entity}.ts: 192行 → ~30行（ファクトリー + 3つの呼び出し）
- {entity}-list.tsx: 189行 → ~40行（共通コンポーネント + 3つの呼び出し）

---

## リファクタリング戦略

### 採用戦略: ジェネリックファクトリーパターン

**メリット:**
- 既存のファイル構造を維持
- 段階的な移行が可能
- 型安全性を保持

---

## 実装計画

### フェーズ1: エンティティCRUD操作のファクトリー化（最優先）

**新規ディレクトリ:**
```
src/app/(private)/_actions/_factories/
├── types.ts                    # 共通型定義
├── entity-config.ts            # エンティティ設定
└── create-get-entity.ts        # GETファクトリー
```

**削減効果:** 192行 → 95行（-97行、51%削減）+ ファクトリー80行 = **正味削減: 17行**

### フェーズ2: UIコンポーネントのジェネリック化（高優先度）

**新規ディレクトリ:**
```
src/app/(private)/_components/entity/
├── types.ts
├── entity-list.tsx
└── execute-entity-button.tsx
```

**削減効果:** 189行 → 102行（-87行、46%削減）+ 共通コンポーネント60行 = **正味削減: 27行**

### フェーズ3-5: その他の重複削減

- 履歴操作リファクタリング（見積もり: 50行削減）
- 週次集計リファクタリング（見積もり: 30行削減）
- achievement-helpersリファクタリング（見積もり: 20行削減）

---

## 削減効果の見積もり

**正味削減: 約140行**

**重要な効果:**
- **保守性の大幅向上**: 3箇所の変更が1箇所に
- **バグ修正の効率化**: ファクトリー修正で全エンティティに適用
- **新エンティティ追加の容易化**: 設定追加のみで対応可能

---

## 実装スケジュール

| フェーズ | 内容 | 見積もり | 優先度 |
|---------|------|---------|--------|
| 1 | エンティティCRUDファクトリー化 | 2-3日 | 最高 |
| 2 | UIコンポーネントジェネリック化 | 1-2日 | 高 |
| 3 | 履歴操作リファクタリング | 1日 | 中 |
| 4 | 週次集計リファクタリング | 0.5日 | 中 |
| 5 | achievement-helpersリファクタリング | 0.5日 | 低 |

**合計: 5-7日**

---

## 継続的な重複検出

```bash
# 月次レビュー
pnpm similarity:check
```

---

## 次のステップ

1. フェーズ1の実装開始: エンティティCRUDファクトリー化
2. 1エンティティでテスト: questで検証後、他へ展開
3. 型チェックと手動テスト: 各変更後に実施
4. 段階的コミット: 機能単位でコミット
