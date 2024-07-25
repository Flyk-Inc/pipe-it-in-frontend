import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProfilePostComponent } from './group-profile-post.component';

describe('ProfilePostComponent', () => {
	let component: GroupProfilePostComponent;
	let fixture: ComponentFixture<GroupProfilePostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GroupProfilePostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(GroupProfilePostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
