import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.scss']
})
export class EmployeesCreateComponent implements OnInit {
  employeesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
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

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.employeesForm.valid) {
      const formData = this.employeesForm.value;
      console.log('employees created successfully', formData);
      this.router.navigate(['/pages/employees']);
    }
  }
}
