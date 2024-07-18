import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasnsactionAddComponent } from './trasnsaction-add.component';

describe('TrasnsactionAddComponent', () => {
  let component: TrasnsactionAddComponent;
  let fixture: ComponentFixture<TrasnsactionAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrasnsactionAddComponent]
    });
    fixture = TestBed.createComponent(TrasnsactionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
