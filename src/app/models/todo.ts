// TODOアイテムのステータス列挙型
export enum TodoStatus {
  PENDING = 'pending',       // 未着手
  IN_PROGRESS = 'in_progress', // 進行中
  COMPLETED = 'completed',     // 完了
}

// TODOアイテムの優先度列挙型
export enum TodoPriority {
  LOW = 'low',       // 低
  MEDIUM = 'medium', // 中
  HIGH = 'high',     // 高
  URGENT = 'urgent', // 緊急
}

// TODOアイテムのカテゴリ列挙型
export enum TodoCategory {
  WORK = 'work',           // 仕事
  PERSONAL = 'personal',   // プライベート
  SHOPPING = 'shopping',   // 買い物
  HEALTH = 'health',       // 健康
  EDUCATION = 'education', // 教育・学習
  OTHER = 'other',         // その他
}

// TODOアイテムのデータモデル
export interface Todo {
  id: number;                    // 一意のID
  title: string;                 // タイトル
  description: string;           // 詳細説明
  status: TodoStatus;            // ステータス
  priority: TodoPriority;        // 優先度
  category: TodoCategory;        // カテゴリ
  dueDate: Date | null;          // 期限日（任意）
  createdAt: Date;               // 作成日時
  updatedAt: Date;               // 更新日時
  isCompleted: boolean;          // 完了フラグ
}
