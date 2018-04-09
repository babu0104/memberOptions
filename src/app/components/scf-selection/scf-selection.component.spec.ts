import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScfSelectionComponent } from './scf-selection.component';

describe('ScfSelectionComponent', () => {
  let component: ScfSelectionComponent;
  let fixture: ComponentFixture<ScfSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScfSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScfSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
