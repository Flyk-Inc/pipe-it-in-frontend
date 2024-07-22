import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeFormComponent } from './create-code-form.component';

describe('CreateCodeFormComponent', () => {
	let component: CreateCodeFormComponent;
	let fixture: ComponentFixture<CreateCodeFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CreateCodeFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CreateCodeFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
