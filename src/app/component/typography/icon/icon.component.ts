import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-icon',
	standalone: true,
	imports: [NgClass],
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
})
export class IconComponent {
	@Input() icon!: string;
	@Input() filled: boolean = false;
}
