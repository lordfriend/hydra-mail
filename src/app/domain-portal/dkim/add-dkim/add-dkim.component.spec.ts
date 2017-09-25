import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDkimComponent } from './add-dkim.component';

describe('AddDkimComponent', () => {
  let component: AddDkimComponent;
  let fixture: ComponentFixture<AddDkimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDkimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDkimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
