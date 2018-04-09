import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreacodeSelectionComponent } from './areacode-selection.component';

describe('AreacodeSelectionComponent', () => {
  let component: AreacodeSelectionComponent;
  let fixture: ComponentFixture<AreacodeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreacodeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreacodeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
