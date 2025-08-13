// Angularのサービス機能をインポート
import { Injectable } from '@angular/core';

// ローカルストレージを管理するサービスクラス
@Injectable({
  providedIn: 'root', // アプリケーション全体で利用可能
})
export class StorageService {
  // ローカルストレージのキー名（読み取り専用）
  private readonly STORAGE_KEY = 'todo-app-data';

  constructor() {}

  // データをローカルストレージに保存
  saveData<T>(data: T): void {
    try {
      const serializedData = JSON.stringify(data); // オブジェクトをJSON文字列に変換
      localStorage.setItem(this.STORAGE_KEY, serializedData);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  // ローカルストレージからデータを読み込み
  loadData<T>(): T | null {
    try {
      const serializedData = localStorage.getItem(this.STORAGE_KEY);
      if (serializedData === null) {
        return null; // データが存在しない場合
      }
      return JSON.parse(serializedData) as T; // JSON文字列をオブジェクトに変換
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return null;
    }
  }

  // ローカルストレージのデータをクリア
  clearData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
    }
  }

  // ローカルストレージが使用可能かどうかをチェック
  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';       // テスト用キー
      localStorage.setItem(test, test);      // テストデータを保存
      localStorage.removeItem(test);         // テストデータを削除
      return true;                           // 成功した場合はtrueを返す
    } catch {
      return false;                          // エラーが発生した場合はfalseを返す
    }
  }
}
