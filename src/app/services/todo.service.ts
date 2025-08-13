// Angularのサービス機能をインポート
import { Injectable } from '@angular/core';
// RxJSの非同期処理用ライブラリをインポート
import { Observable, of } from 'rxjs';
// TODOデータモデルをインポート
import { Todo } from '../models/todo';
// インメモリデータサービスをインポート
import { InMemoryDataService } from './in-memory-data.service';

// TODOアイテムを管理するサービスクラス
@Injectable({
  providedIn: 'root', // アプリケーション全体で利用可能
})
export class TodoService {
  // インメモリデータサービスをコンストラクタインジェクション
  constructor(private inMemoryDataService: InMemoryDataService) {}

  // 全てのTODOアイテムを取得する
  getTodos(): Observable<Todo[]> {
    return of(this.inMemoryDataService.getTodos());
  }

  // 指定IDのTODOアイテムを取得する
  getTodo(id: number): Observable<Todo | undefined> {
    return of(this.inMemoryDataService.getTodo(id));
  }

  // 新しいTODOアイテムを追加する
  addTodo(
    todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>
  ): Observable<Todo> {
    // 新しいTODOアイテムを作成（自動生成されるフィールドを設定）
    const newTodo: Todo = {
      id: this.inMemoryDataService.genId(), // 一意IDを自動生成
      createdAt: new Date(),                // 作成日時を現在時刻に設定
      updatedAt: new Date(),                // 更新日時を現在時刻に設定
      isCompleted: false,                   // 完了フラグをfalseに設定
      ...todo,                              // その他のフィールドをコピー
    };
    this.inMemoryDataService.addTodo(newTodo);
    return of(newTodo);
  }

  // 既存のTODOアイテムを更新する
  updateTodo(todo: Todo): Observable<Todo> {
    this.inMemoryDataService.updateTodo(todo);
    return of(todo);
  }

  // 指定IDのTODOアイテムを削除する
  deleteTodo(id: number): Observable<void> {
    this.inMemoryDataService.deleteTodo(id);
    return of();
  }
}
