import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlineComponent } from './underline.component';

describe('UnderlineComponent', () => {
	let component: UnderlineComponent;
	let fixture: ComponentFixture<UnderlineComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UnderlineComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UnderlineComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
