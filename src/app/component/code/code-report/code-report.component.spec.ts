import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReportComponent } from './code-report.component';

describe('CodeReportComponent', () => {
	let component: CodeReportComponent;
	let fixture: ComponentFixture<CodeReportComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CodeReportComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CodeReportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
