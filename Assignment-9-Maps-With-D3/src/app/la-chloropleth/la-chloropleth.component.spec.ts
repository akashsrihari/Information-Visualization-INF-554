import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaChloroplethComponent } from './la-chloropleth.component';

describe('LaChloroplethComponent', () => {
  let component: LaChloroplethComponent;
  let fixture: ComponentFixture<LaChloroplethComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaChloroplethComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaChloroplethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
