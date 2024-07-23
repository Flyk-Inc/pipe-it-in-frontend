import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VersionSelectorComponent } from '../version-selector/version-selector.component';
import { BehaviorSubject } from 'rxjs';
import { Version } from '../../../models/code.model';
import { ButtonComponent } from '../../layout/button/button.component';
import { PipelineStepComponent } from '../../../pages/codes/pipelines/pipeline-step/pipeline-step.component';
import { PipelineStepsCreatorItemComponent } from '../pipeline-steps-creator-item/pipeline-steps-creator-item.component';
import { IconComponent } from '../../typography/icon/icon.component';
import { FormControl } from '@angular/forms';

export interface stepInputOutput {
	inputError: boolean;
	outputError: boolean;
}

@Component({
	selector: 'app-pipeline-steps-creator',
	standalone: true,
	imports: [
		VersionSelectorComponent,
		ButtonComponent,
		PipelineStepComponent,
		PipelineStepsCreatorItemComponent,
		IconComponent,
	],
	templateUrl: './pipeline-steps-creator.component.html',
})
export class PipelineStepsCreatorComponent implements OnInit {
	@Input() versionInput?: Version[];
	@Output() stepsChange = new EventEmitter<Version[]>();
	@Output() stepsValidityChange = new EventEmitter<boolean>();
	currentlySelectedVersion = new BehaviorSubject<Version | null>(null);
	selectedSteps = new FormControl<Version[]>([], { nonNullable: true });
	stepsValidity: stepInputOutput[] = [];
	addToStepsButtonLabel = $localize`:@@addToSteps:Add to Steps`;
	protected onVersionSelection(version: Version | null) {
		this.currentlySelectedVersion.next(version);
	}

	ngOnInit() {
		this.setupStepValidation();
		if (this.versionInput) {
			this.selectedSteps.setValue(this.versionInput);
		}
	}

	protected addToSteps() {
		if (!this.currentlySelectedVersion.value) {
			return;
		}
		this.selectedSteps.setValue([
			...this.selectedSteps.value,
			this.currentlySelectedVersion.value,
		]);
	}

	private setupStepValidation() {
		this.selectedSteps.valueChanges.subscribe(() => {
			this.checkStepsValidity();
			this.stepsChange.emit(this.selectedSteps.value);
			this.stepsValidityChange.emit(this.areStepsValid());
		});
	}

	private checkStepsValidity() {
		this.stepsValidity = this.createInputOutputCehckArray(
			this.selectedSteps.value.length
		);
		this.checkInputToOutputInSelectedSteps();
	}

	private checkInputToOutputInSelectedSteps() {
		this.selectedSteps.value.forEach((step, index) => {
			if (index === 0) {
				return;
			}
			if (step.input.length) {
				if (this.selectedSteps.value[index - 1].output.length <= 0) {
					this.stepsValidity[index].inputError = true;
					this.stepsValidity[index - 1].outputError = true;
					return;
				}
				if (
					this.selectedSteps.value[index - 1].output[0].fileType !==
					step.input[0].fileType
				) {
					this.stepsValidity[index].inputError = true;
					this.stepsValidity[index - 1].outputError = true;
					return;
				}
			}
		});
	}

	areStepsValid(): boolean {
		return this.stepsValidity.every(
			step => !step.inputError && !step.outputError
		);
	}

	private createInputOutputCehckArray(nbOfSteps: number): stepInputOutput[] {
		const inputOutputCheckArray: stepInputOutput[] = [];
		for (let i = 0; i < nbOfSteps; i++) {
			inputOutputCheckArray.push({ inputError: false, outputError: false });
		}
		return inputOutputCheckArray;
	}

	moveStep(step: number, direction: 'right' | 'left') {
		const steps = this.selectedSteps.value;
		const currentIndex = step - 1; // Adjust for human-readable index
		const newIndex = currentIndex + (direction === 'right' ? 1 : -1);

		if (newIndex >= 0 && newIndex < steps.length) {
			[steps[currentIndex], steps[newIndex]] = [
				steps[newIndex],
				steps[currentIndex],
			];
			this.selectedSteps.setValue([...steps]);
		}
	}

	deleteStep(step: number) {
		const steps = this.selectedSteps.value;
		if (step >= 0) {
			steps.splice(step - 1, 1);
			this.selectedSteps.setValue([...steps]);
		}
	}
}
