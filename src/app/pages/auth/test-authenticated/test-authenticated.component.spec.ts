import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAuthenticatedComponent } from './test-authenticated.component';

describe('TestAuthenticatedComponent', () => {
  let component: TestAuthenticatedComponent;
  let fixture: ComponentFixture<TestAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAuthenticatedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
