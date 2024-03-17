import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPetcareComponent } from './dialog-add-petcare.component';

describe('DialogAddPetcareComponent', () => {
  let component: DialogAddPetcareComponent;
  let fixture: ComponentFixture<DialogAddPetcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddPetcareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddPetcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
