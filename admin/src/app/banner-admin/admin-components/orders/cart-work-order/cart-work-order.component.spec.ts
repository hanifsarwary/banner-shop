import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartWorkOrderComponent } from './cart-work-order.component';

describe('CartWorkOrderComponent', () => {
  let component: CartWorkOrderComponent;
  let fixture: ComponentFixture<CartWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
