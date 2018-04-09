import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsMsoComponent } from './ics-mso.component';

describe('IcsMsoComponent', () => {
  let component: IcsMsoComponent;
  let fixture: ComponentFixture<IcsMsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsMsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsMsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
