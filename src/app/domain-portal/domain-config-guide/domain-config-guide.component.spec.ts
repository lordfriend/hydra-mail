import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainConfigGuideComponent } from './domain-config-guide.component';

describe('DomainConfigGuideComponent', () => {
  let component: DomainConfigGuideComponent;
  let fixture: ComponentFixture<DomainConfigGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainConfigGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainConfigGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
