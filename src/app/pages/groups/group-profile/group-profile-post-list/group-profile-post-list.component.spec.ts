import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfilePostListComponent } from './group-profile-post-list.component';

describe('GroupProfilePostListComponent', () => {
	let component: GroupProfilePostListComponent;
	let fixture: ComponentFixture<GroupProfilePostListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GroupProfilePostListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(GroupProfilePostListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
