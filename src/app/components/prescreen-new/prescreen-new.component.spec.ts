import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescreenComponent } from './prescreen-new.component';

describe('ChangeAssociationComponent', () => {
  let component: PrescreenComponent;
  let fixture: ComponentFixture<PrescreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
