import { computed, Injectable, signal } from '@angular/core';

type Operator = '+' | '-' | '*' | '/';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  private currentInput = signal<string>('0');
  private previousInput = signal<string | null>(null);
  private operator = signal<Operator | null>(null);
  private operatorClicked = signal<boolean>(false);

  formattedDisplay = computed(() => {
    if (isNaN(parseFloat(this.currentInput()))) {
      return this.currentInput();
    }
    return parseFloat(this.currentInput()).toLocaleString('en-US', {
      maximumFractionDigits: 10,
    });
  });

  handleKeyPress = (key: string) => {
    if (/[0-9]/.test(key)) {
      this.appendNumber(key);
    } else if (key === '.') {
      this.appendDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.setOperator(key as Operator);
    } else if (key === '=') {
      this.calculate();
    } else if (key === 'DEL') {
      this.deleteLast();
    } else if (key === 'RESET') {
      this.reset();
    }
  };

  private appendNumber = (number: string) => {
    if (this.currentInput() === '0' || this.operatorClicked()) {
      this.currentInput.set(number);
      this.operatorClicked.set(false);
    } else if (this.currentInput().length < 15) {
      this.currentInput.set(this.currentInput() + number);
    }
  };

  private appendDecimal = () => {
    if (!this.currentInput().includes('.')) {
      this.currentInput.set(this.currentInput() + '.');
    }
  };

  private setOperator = (op: Operator) => {
    if (this.previousInput() !== null && !this.operatorClicked()) {
      this.calculate();
    }
    this.previousInput.set(this.currentInput());
    this.operator.set(op);
    this.operatorClicked.set(true);
  };

  private calculate = () => {
    if (this.previousInput() === null || this.operator() === null) return;

    const prev = parseFloat(this.previousInput() || '0');
    const current = parseFloat(this.currentInput());
    let result;

    switch (this.operator()) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = current === 0 ? 'Error' : prev / current;
        break;
    }

    this.currentInput.set(String(result));
    this.previousInput.set(null);
    this.operator.set(null);
    this.operatorClicked.set(false);
  };

  private deleteLast = () => {
    this.currentInput.set(
      this.currentInput().length === 1 ? '0' : this.currentInput().slice(0, -1)
    );
  };

  private reset = () => {
    this.currentInput.set('0');
    this.previousInput.set(null);
    this.operator.set(null);
    this.operatorClicked.set(false);
  };
}
