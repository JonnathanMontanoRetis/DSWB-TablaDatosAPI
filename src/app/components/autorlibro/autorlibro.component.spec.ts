import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorlibroComponent } from './autorlibro.component';

describe('AutorlibroComponent', () => {
  let component: AutorlibroComponent;
  let fixture: ComponentFixture<AutorlibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorlibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorlibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
