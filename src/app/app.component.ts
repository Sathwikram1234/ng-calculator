import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyPadComponent } from './components/key-pad/key-pad.component';
import { CalculatorService } from './services/calculator.service';
import { DisplayComponent } from './components/display/display.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeyPadComponent, DisplayComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-calculator';

  private service = inject(CalculatorService);

  formattedDisplay = this.service.formattedDisplay;

  theme = signal<1 | 2 | 3>(1);

  handleKeyPress(key: string) {
    this.service.handleKeyPress(key);
  }
}
