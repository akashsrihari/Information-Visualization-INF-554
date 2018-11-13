import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldProportionalSymbolComponent } from './world-proportional-symbol.component';

describe('WorldProportionalSymbolComponent', () => {
  let component: WorldProportionalSymbolComponent;
  let fixture: ComponentFixture<WorldProportionalSymbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldProportionalSymbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldProportionalSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
