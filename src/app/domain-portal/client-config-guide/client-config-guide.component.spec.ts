import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConfigGuideComponent } from './client-config-guide.component';

describe('ClientConfigGuideComponent', () => {
  let component: ClientConfigGuideComponent;
  let fixture: ComponentFixture<ClientConfigGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientConfigGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientConfigGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
