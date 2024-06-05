import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-underline',
	standalone: true,
	imports: [NgClass],
	templateUrl: './underline.component.html',
	styleUrl: './underline.component.scss',
})
export class UnderlineComponent {
	@Input() style?: string;
}
