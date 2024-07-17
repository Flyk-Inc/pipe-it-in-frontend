import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTimelineItemComponent } from './code-timeline-item.component';

describe('CodeTimelineItemComponent', () => {
	let component: CodeTimelineItemComponent;
	let fixture: ComponentFixture<CodeTimelineItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CodeTimelineItemComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CodeTimelineItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
