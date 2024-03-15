import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonusuariosComponent } from './admonusuarios.component';

describe('AdmonusuariosComponent', () => {
  let component: AdmonusuariosComponent;
  let fixture: ComponentFixture<AdmonusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmonusuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmonusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
