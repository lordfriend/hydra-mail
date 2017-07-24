import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainPortalComponent } from './domain-portal.component';

describe('DomainPortalComponent', () => {
  let component: DomainPortalComponent;
  let fixture: ComponentFixture<DomainPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
