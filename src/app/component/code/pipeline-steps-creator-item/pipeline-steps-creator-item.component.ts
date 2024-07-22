import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Version } from '../../../models/code.model';
import { NgClass } from '@angular/common';
import { IconComponent } from '../../typography/icon/icon.component';

export interface stepMove {
	step: number;
	direction: 'right' | 'left';
}
export interface stepDelete {
	step: number;
}
@Component({
	selector: 'app-pipeline-steps-creator-item',
	standalone: true,
	imports: [NgClass, IconComponent],
	templateUrl: './pipeline-steps-creator-item.component.html',
})
export class PipelineStepsCreatorItemComponent {
	@Output() stepMove = new EventEmitter<stepMove>();
	@Output() stepDelete = new EventEmitter<number>();
	@Input() version!: Version;
	@Input() step!: number;
	@Input() inputProblem: boolean = false;
	@Input() outputProblem: boolean = false;
  @Input() totalSteps!: number;

	moveStep(step: number, direction: 'right' | 'left') {
		this.stepMove.emit({ step, direction });
	}

	deleteStep(step: number) {
		this.stepDelete.emit(step);
	}
}
