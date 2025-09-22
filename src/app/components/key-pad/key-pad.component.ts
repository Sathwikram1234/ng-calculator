import { Component, inject, output } from '@angular/core';

@Component({
  selector: 'app-key-pad',
  standalone: true,
  imports: [],
  templateUrl: './key-pad.component.html',
  styleUrl: './key-pad.component.scss',
})
export class KeyPadComponent {
  keys: string[] = [
    '7',
    '8',
    '9',
    'DEL',
    '4',
    '5',
    '6',
    '+',
    '1',
    '2',
    '3',
    '-',
    '.',
    '0',
    '/',
    '*',
    'RESET',
    '=',
  ];

  getKeyClass(key: string) {
    const classes = ['key'];
    if (key === 'DEL' || key === 'RESET' || key === '=') {
      classes.push('special');
    }

    if (key === 'DEL' || key === 'RESET') {
      classes.push('action');
    } else if (key === '=') {
      classes.push('equals');
    } else {
      classes.push('ordinary');
    }

    if (key === 'RESET' || key === '=') {
      classes.push('span-2');
    }
    return classes;
  }

  keyEmitter = output<string>({ alias: 'keyPress' });
}
