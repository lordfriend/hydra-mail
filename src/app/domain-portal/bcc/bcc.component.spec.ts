import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BccComponent } from './bcc.component';

describe('BccComponent', () => {
  let component: BccComponent;
  let fixture: ComponentFixture<BccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
