import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesTimelineComponent } from './codes-timeline.component';

describe('CodesTimelineComponent', () => {
	let component: CodesTimelineComponent;
	let fixture: ComponentFixture<CodesTimelineComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CodesTimelineComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CodesTimelineComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
