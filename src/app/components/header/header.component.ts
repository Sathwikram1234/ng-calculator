import { Component, model } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  theme = model.required<1 | 2 | 3>();

  changeTheme(theme: Event) {
    const target = theme.target as HTMLInputElement;
    this.theme.set(parseInt(target.value) as 1 | 2 | 3);
  }
}
