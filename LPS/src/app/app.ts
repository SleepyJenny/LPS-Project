import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentHolder } from './shared/content-holder/content-holder';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ContentHolder],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('LPS');
}
