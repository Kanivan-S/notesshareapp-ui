import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUserPageComponent } from './reg-user-page.component';

describe('RegUserPageComponent', () => {
  let component: RegUserPageComponent;
  let fixture: ComponentFixture<RegUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegUserPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
