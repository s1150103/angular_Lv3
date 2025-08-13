// Angularの基本コンポーネントをインポート
import { Component } from '@angular/core';
// ルーティング機能をインポート
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// アプリケーションのルートコンポーネント
@Component({
  selector: 'app-root', // セレクター名
  standalone: true, // スタンドアロンコンポーネント
  imports: [RouterOutlet, RouterLink, RouterLinkActive], // 必要なモジュールをインポート
  templateUrl: './app.component.html', // HTMLテンプレートのパス
  styleUrl: './app.component.css', // CSSファイルのパス
})
// アプリケーションのメインコンポーネントクラス
export class AppComponent {
  // アプリケーションのタイトル
  title = 'todo-app';
}
