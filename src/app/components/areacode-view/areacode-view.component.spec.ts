import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreacodeViewComponent } from './areacode-view.component';

describe('AreacodeViewComponent', () => {
  let component: AreacodeViewComponent;
  let fixture: ComponentFixture<AreacodeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreacodeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreacodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
