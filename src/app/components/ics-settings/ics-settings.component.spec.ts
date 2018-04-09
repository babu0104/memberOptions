import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsSettingsComponent } from './ics-settings.component';

describe('IcsSettingsComponent', () => {
  let component: IcsSettingsComponent;
  let fixture: ComponentFixture<IcsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
