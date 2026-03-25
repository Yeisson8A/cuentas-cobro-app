import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPeriodosComponent } from './top-periodos.component';

describe('TopPeriodosComponent', () => {
  let component: TopPeriodosComponent;
  let fixture: ComponentFixture<TopPeriodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopPeriodosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPeriodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
