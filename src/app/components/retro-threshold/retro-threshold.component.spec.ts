import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroThresholdComponent } from './retro-threshold.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('RetroThresholdComponent', () => {
  let component: RetroThresholdComponent;
  let fixture: ComponentFixture<RetroThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RetroThresholdComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
