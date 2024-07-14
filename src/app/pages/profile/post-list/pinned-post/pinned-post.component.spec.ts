import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedPostComponent } from './pinned-post.component';

describe('PinnedPostComponent', () => {
	let component: PinnedPostComponent;
	let fixture: ComponentFixture<PinnedPostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PinnedPostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PinnedPostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
