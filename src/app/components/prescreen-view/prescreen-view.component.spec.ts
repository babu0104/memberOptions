import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescreenViewComponent } from './prescreen-view.component';

describe('PrescreenViewComponent', () => {
  let component: PrescreenViewComponent;
  let fixture: ComponentFixture<PrescreenViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescreenViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescreenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
