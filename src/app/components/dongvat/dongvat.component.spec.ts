import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DongvatComponent } from './dongvat.component';

describe('DongvatComponent', () => {
  let component: DongvatComponent;
  let fixture: ComponentFixture<DongvatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DongvatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DongvatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
