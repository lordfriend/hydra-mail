import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DkimComponent } from './dkim.component';

describe('DkimComponent', () => {
  let component: DkimComponent;
  let fixture: ComponentFixture<DkimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DkimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DkimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
