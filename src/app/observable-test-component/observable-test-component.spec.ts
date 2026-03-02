import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableTestComponent } from './observable-test-component';

describe('ObservableTestComponent', () => {
  let component: ObservableTestComponent;
  let fixture: ComponentFixture<ObservableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservableTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservableTestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
