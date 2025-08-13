# Angular Todo App Lv3

Angular 17で構築された高機能なTodoアプリケーションです。Reactive Forms、LocalStorage永続化、検索・フィルタリング機能などを備えています。

## 🚀 デモ

開発サーバーを起動してアプリケーションを確認できます：

```bash
ng serve
```

ブラウザで `http://localhost:4200` にアクセスしてください。

## ✨ 主な機能

### 📝 Todo管理
- **CRUD操作**: 作成、読み取り、更新、削除
- **ステータス管理**: Pending → In Progress → Completed
- **優先度設定**: Low, Medium, High, Urgent
- **カテゴリ分類**: Work, Personal, Shopping, Health, Education, Other
- **期限設定**: 期限切れ警告機能付き

### 🔍 検索・フィルタリング
- **テキスト検索**: タイトル・説明文での部分検索
- **ステータスフィルタ**: 進行状況別の絞り込み
- **優先度フィルタ**: 重要度別の絞り込み
- **カテゴリフィルタ**: 分類別の絞り込み
- **ソート機能**: タイトル、期限、優先度、ステータス、作成日順

### 🎨 ユーザーインターフェース
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **Bootstrap 5**: モダンなUIコンポーネント
- **Bootstrap Icons**: 直感的なアイコン表示
- **カラーコーディング**: 
  - 🟢 完了済み: 緑色表示（取り消し線付き）
  - 🔴 期限切れ: 赤枠で警告表示
  - 🎯 優先度別バッジ: Urgent(赤)、High(黄)、Medium(青)、Low(グレー)

### 💾 データ管理
- **LocalStorage永続化**: ブラウザ再起動後もデータ保持
- **リアルタイム保存**: 変更内容の自動保存
- **初期データ**: サンプルTodoで即座に動作確認可能

## 🛠️ 技術スタック

- **Frontend**: Angular 17 (Standalone Components)
- **Forms**: Reactive Forms (FormBuilder, Validators)
- **Styling**: Bootstrap 5 + Bootstrap Icons
- **Data**: LocalStorage API
- **Language**: TypeScript
- **Build**: Angular CLI
- **Code Quality**: ESLint + Prettier

## 📦 インストール

### 前提条件
- Node.js (v18以上)
- npm (v9以上)
- Angular CLI (v17以上)

### セットアップ手順

1. リポジトリをクローン
```bash
git clone https://github.com/s1150103/angular_Lv3.git
cd angular_Lv3/todo-app
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
ng serve
```

4. ブラウザでアプリケーションを開く
```
http://localhost:4200
```

## 📜 利用可能なスクリプト

| コマンド | 説明 |
|---------|------|
| `ng serve` | 開発サーバーを起動 |
| `ng build` | プロダクション用にビルド |
| `ng test` | ユニットテストを実行 |
| `ng lint` | ESLintでコード検査 |
| `npm run format` | Prettierでコードフォーマット |

## 🎯 使用方法

### 基本操作

1. **Todo作成**
   - 「Add New Todo」ボタンをクリック
   - タイトル、説明、ステータス、優先度、カテゴリ、期限を入力
   - 「Add Todo」ボタンで保存

2. **Todo編集**
   - 一覧でペンシルアイコンをクリック
   - または詳細ページで「Edit」ボタンをクリック
   - 内容を修正して「Update Todo」で保存

3. **ステータス変更**
   - チェックアイコンをクリックで完了/未完了を切り替え
   - 完了したTodoは緑色で表示（取り消し線付き）

4. **検索・フィルタリング**
   - 検索ボックスでテキスト検索
   - ドロップダウンでステータス・優先度・カテゴリを絞り込み
   - ソート設定で並び順を変更

### 詳細機能

- **期限管理**: 期限切れのTodoは赤枠で表示
- **データ永続化**: ブラウザを閉じても自動でデータ保存
- **バリデーション**: 入力内容の検証とエラー表示
- **確認ダイアログ**: 削除時の安全確認

## 📱 レスポンシブ対応

- **デスクトップ**: 3カラムレイアウト
- **タブレット**: 2カラムレイアウト  
- **モバイル**: 1カラムレイアウト

## 🎨 カスタマイズ

### テーマ変更
Bootstrap変数を`src/styles.css`で上書きしてカスタマイズ可能

### 新機能追加
1. `src/app/models/todo.ts`でデータモデル拡張
2. `src/app/services/`でサービス追加
3. `src/app/components/`でコンポーネント作成

## 📈 開発ロードマップ

- [ ] ユーザー認証機能
- [ ] クラウド同期機能
- [ ] 添付ファイル対応
- [ ] 通知機能
- [ ] PWA対応
- [ ] ダークモード

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. featureブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👨‍💻 作者

- **s1150103** - [GitHub](https://github.com/s1150103)

## 🙏 謝辞

- Angular チーム
- Bootstrap チーム
- オープンソースコミュニティ

---

## 📞 サポート

質問や問題がある場合は、[Issues](https://github.com/s1150103/angular_Lv3/issues)でお知らせください。

**Happy Coding! 🎉**