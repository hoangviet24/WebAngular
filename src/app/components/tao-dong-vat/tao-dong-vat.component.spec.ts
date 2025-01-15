import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoDongVatComponent } from './tao-dong-vat.component';

describe('TaoDongVatComponent', () => {
  let component: TaoDongVatComponent;
  let fixture: ComponentFixture<TaoDongVatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaoDongVatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoDongVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
