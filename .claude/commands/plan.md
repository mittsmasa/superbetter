---
description: "Generate implementation plan and save it to .plan directory"
allowed-tools: ["Write", "Task", "Bash"]
---

「$ARGUMENTS」の実装方針を作成し、.plan ディレクトリに保存します。

以下の内容を含む詳細な実装方針を作成します：

1. **要件分析**: プロンプトの内容を分析し、実装すべき機能を整理
2. **技術選択**: 使用する技術・ライブラリ・フレームワーク
3. **実装手順**: ステップバイステップの実装計画
4. **ファイル構成**: 作成・変更が必要なファイルとその役割
5. **テスト方針**: テストの実装方法と検証項目
6. **注意点**: 実装時の注意事項や考慮すべきポイント

!Task general-purpose "現在の日時をベースにしたファイル名（plan-YYYYMMDD-HHMMSS.md形式）で、「$ARGUMENTS」に関する詳細な実装方針をMarkdown形式で作成し、.planディレクトリに保存してください。実装方針には要件分析、技術選択、実装手順、ファイル構成、テスト方針、注意点を含めてください。"