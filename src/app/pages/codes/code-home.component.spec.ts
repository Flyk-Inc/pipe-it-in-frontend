import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeHomeComponent } from './code-home.component';

describe('PipelinesComponent', () => {
	let component: CodeHomeComponent;
	let fixture: ComponentFixture<CodeHomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CodeHomeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CodeHomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
