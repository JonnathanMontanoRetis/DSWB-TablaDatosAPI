import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplarlibroComponent } from './ejemplarlibro.component';

describe('EjemplarlibroComponent', () => {
  let component: EjemplarlibroComponent;
  let fixture: ComponentFixture<EjemplarlibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplarlibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemplarlibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
