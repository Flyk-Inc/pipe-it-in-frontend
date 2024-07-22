import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconComponent } from '../../typography/icon/icon.component';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [NgClass, IconComponent],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class ButtonComponent {
	@Input() text!: string;
	@Input() disabled!: boolean;
	@Input() type?: 'submit' | 'reset' | 'button' | undefined;
	@Input() icon?: string;
	@Input() size: 'small' | 'normal' = 'normal';
}
