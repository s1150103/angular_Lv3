// Angularのサービス機能をインポート
import { Injectable } from '@angular/core';
// TODOデータモデルと関連列挙型をインポート
import { Todo, TodoStatus, TodoPriority, TodoCategory } from '../models/todo';
// ローカルストレージサービスをインポート
import { StorageService } from './storage.service';

// インメモリデータ管理サービス
@Injectable({
  providedIn: 'root', // アプリケーション全体で利用可能
})
export class InMemoryDataService {
  // メモリ上のTODOデータを保持する配列
  private todos: Todo[] = [];
  // デフォルトのTODOデータ（初期データ）
  private defaultTodos: Todo[] = [
    {
      id: 1,
      title: 'Learn Angular',               // Angularを学ぶ
      description: 'Study Angular framework basics',
      status: TodoStatus.IN_PROGRESS,       // 進行中
      priority: TodoPriority.HIGH,          // 高優先度
      category: TodoCategory.EDUCATION,     // 教育カテゴリ
      dueDate: new Date('2024-12-31'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Build Todo App',
      description: 'Create a todo application with CRUD operations',
      status: TodoStatus.IN_PROGRESS,
      priority: TodoPriority.URGENT,
      category: TodoCategory.WORK,
      dueDate: new Date('2024-12-15'),
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Add Bootstrap',
      description: 'Style the app with Bootstrap components',
      status: TodoStatus.COMPLETED,
      priority: TodoPriority.MEDIUM,
      category: TodoCategory.WORK,
      dueDate: null,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
      isCompleted: true,
    },
    {
      id: 4,
      title: 'Implement Router',
      description: 'Add navigation between pages',
      status: TodoStatus.COMPLETED,
      priority: TodoPriority.MEDIUM,
      category: TodoCategory.WORK,
      dueDate: null,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04'),
      isCompleted: true,
    },
    {
      id: 5,
      title: 'Buy Groceries',
      description: 'Buy milk, bread, and eggs',
      status: TodoStatus.PENDING,
      priority: TodoPriority.LOW,
      category: TodoCategory.SHOPPING,
      dueDate: new Date('2024-12-20'),
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
      isCompleted: false,
    },
  ];

  // コンストラクタ：ストレージサービスをインジェクションし、データを読み込み
  constructor(private storageService: StorageService) {
    this.loadTodosFromStorage(); // ストレージからTODOデータを読み込み
  }

  // ストレージからTODOデータを読み込むプライベートメソッド
  private loadTodosFromStorage(): void {
    const savedTodos = this.storageService.loadData<Todo[]>();
    if (savedTodos && Array.isArray(savedTodos)) {
      // 文字列からDateオブジェクトに変換
      this.todos = savedTodos.map((todo) => ({
        ...todo,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    } else {
      // 保存されたデータがない場合はデフォルトデータを使用
      this.todos = [...this.defaultTodos];
      this.saveTodosToStorage();
    }
  }

  // TODOデータをストレージに保存するプライベートメソッド
  private saveTodosToStorage(): void {
    this.storageService.saveData(this.todos);
  }

  // 全てのTODOアイテムを取得（コピーを返す）
  getTodos(): Todo[] {
    return [...this.todos];
  }

  // 指定IDのTODOアイテムを取得
  getTodo(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  // 新しいTODOアイテムを追加
  addTodo(todo: Todo): void {
    const now = new Date();
    const newTodo: Todo = {
      ...todo,
      id: this.genId(),                                         // 一意IDを生成
      createdAt: now,                                           // 作成日時を現在に設定
      updatedAt: now,                                           // 更新日時を現在に設定
      isCompleted: todo.status === TodoStatus.COMPLETED,       // ステータスに基づいて完了フラグを設定
    };
    this.todos.push(newTodo);          // リストに追加
    this.saveTodosToStorage();         // ストレージに保存
  }

  // 既存のTODOアイテムを更新
  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = {
        ...updatedTodo,
        updatedAt: new Date(),                                   // 更新日時を現在に設定
        isCompleted: updatedTodo.status === TodoStatus.COMPLETED, // ステータスに基づいて完了フラグを更新
      };
      this.saveTodosToStorage();         // ストレージに保存
    }
  }

  // 指定IDのTODOアイテムを削除
  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id); // 指定ID以外をフィルタリング
    this.saveTodosToStorage();         // ストレージに保存
  }

  // 新しい一意IDを生成
  genId(): number {
    return this.todos.length > 0
      ? Math.max(...this.todos.map((todo) => todo.id)) + 1  // 現在の最大ID + 1
      : 1;                                                   // 初回は1から開始
  }
}
