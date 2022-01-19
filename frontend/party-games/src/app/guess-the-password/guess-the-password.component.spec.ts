import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessThePasswordComponent } from './guess-the-password.component';

describe('GuessThePasswordComponent', () => {
  let component: GuessThePasswordComponent;
  let fixture: ComponentFixture<GuessThePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessThePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessThePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
