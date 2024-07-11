import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCodeComponent } from './new-code.component';

describe('NewCodeComponent', () => {
	let component: NewCodeComponent;
	let fixture: ComponentFixture<NewCodeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NewCodeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NewCodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
