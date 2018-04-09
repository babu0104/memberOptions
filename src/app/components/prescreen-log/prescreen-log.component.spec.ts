import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescreenLogComponent } from './prescreen-log.component';

describe('PrescreenLogComponent', () => {
  let component: PrescreenLogComponent;
  let fixture: ComponentFixture<PrescreenLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescreenLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescreenLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
