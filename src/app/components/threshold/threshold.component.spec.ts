import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdComponent } from './threshold.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('ThresholdComponent', () => {
  let component: ThresholdComponent;
  let fixture: ComponentFixture<ThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ThresholdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
