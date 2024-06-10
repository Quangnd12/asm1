import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.scss']
})
export class EmployeesEditComponent implements OnInit {
  employeesForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeesForm = this.fb.group({
      id_employees: ['', [Validators.required]],
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', [Validators.required]],
      date_create: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.employeesForm.valid) {
      console.log(this.employeesForm.value);
    }
  }
}
