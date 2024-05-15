import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASMComponent } from './asm.component';

describe('ASMComponent', () => {
  let component: ASMComponent;
  let fixture: ComponentFixture<ASMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ASMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
