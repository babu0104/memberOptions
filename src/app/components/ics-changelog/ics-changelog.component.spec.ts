import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcsChangelogComponent } from './ics-changelog.component';

describe('IcsChangelogComponent', () => {
  let component: IcsChangelogComponent;
  let fixture: ComponentFixture<IcsChangelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcsChangelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcsChangelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should be created', () => {
    expect(component).toBeTruthy();
  });*/
});
