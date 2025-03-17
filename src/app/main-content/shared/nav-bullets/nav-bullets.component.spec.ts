import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBulletsComponent } from './nav-bullets.component';

describe('NavBulletsComponent', () => {
  let component: NavBulletsComponent;
  let fixture: ComponentFixture<NavBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
