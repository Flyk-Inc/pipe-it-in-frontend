import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCodesListComponent } from './personal-codes-list.component';

describe('CodesTimelineComponent', () => {
	let component: PersonalCodesListComponent;
	let fixture: ComponentFixture<PersonalCodesListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PersonalCodesListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PersonalCodesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
