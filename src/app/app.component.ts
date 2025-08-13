// Angularの基本コンポーネントをインポート
import { Component } from '@angular/core';

// アプリケーションのルートコンポーネント
@Component({
  selector: 'app-root', // セレクター名
  templateUrl: './app.component.html', // HTMLテンプレートのパス
  styleUrl: './app.component.css', // CSSファイルのパス
})
// アプリケーションのメインコンポーネントクラス
export class AppComponent {
  // アプリケーションのタイトル
  title = 'todo-app';
}
