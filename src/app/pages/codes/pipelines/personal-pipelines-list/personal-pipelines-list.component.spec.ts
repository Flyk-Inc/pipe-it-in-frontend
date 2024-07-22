import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPipelinesListComponent } from './personal-pipelines-list.component';

describe('PersonalPipelinesListComponent', () => {
	let component: PersonalPipelinesListComponent;
	let fixture: ComponentFixture<PersonalPipelinesListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PersonalPipelinesListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PersonalPipelinesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
