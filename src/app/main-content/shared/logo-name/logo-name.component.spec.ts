import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNameComponent } from './logo-name.component';

describe('LogoNameComponent', () => {
  let component: LogoNameComponent;
  let fixture: ComponentFixture<LogoNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
