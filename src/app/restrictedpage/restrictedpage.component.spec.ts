import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RestrictedpageComponent} from './restrictedpage.component';

describe('RestrictedpageComponent', () => {
  let component: RestrictedpageComponent;
  let fixture: ComponentFixture<RestrictedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictedpageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RestrictedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
