import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEditDialogComponent } from './common-edit-dialog.component';

describe('CommonEditDialogComponent', () => {
  let component: CommonEditDialogComponent;
  let fixture: ComponentFixture<CommonEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
