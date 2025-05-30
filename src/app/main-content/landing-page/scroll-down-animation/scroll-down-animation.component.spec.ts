import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollDownAnimationComponent } from './scroll-down-animation.component';

describe('ScrollDownAnimationComponent', () => {
  let component: ScrollDownAnimationComponent;
  let fixture: ComponentFixture<ScrollDownAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollDownAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollDownAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
