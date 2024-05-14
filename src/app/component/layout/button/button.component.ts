import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() disabled!: boolean;
  @Output() onClick = new EventEmitter<any>();
  @Input() type?: 'submit' | 'reset' | 'button' | undefined;

  onClickButton(event: MouseEvent) {
    this.onClick.emit(event);
  }
}
