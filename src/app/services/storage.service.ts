import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly STORAGE_KEY = 'todo-app-data';

  constructor() {}

  saveData<T>(data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(this.STORAGE_KEY, serializedData);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  loadData<T>(): T | null {
    try {
      const serializedData = localStorage.getItem(this.STORAGE_KEY);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData) as T;
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return null;
    }
  }

  clearData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data from localStorage:', error);
    }
  }

  isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}
