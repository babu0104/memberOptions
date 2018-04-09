import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScfViewComponent } from './scf-view.component';

describe('ScfViewComponent', () => {
  let component: ScfViewComponent;
  let fixture: ComponentFixture<ScfViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScfViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
