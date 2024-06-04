import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent {
  customerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [null, Validators.required],
    });
  }
  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
      this.toastrService.success('Cập nhật thành công', 'Success', {
        progressBar: true,
        timeOut: 3000,
        closeButton: true,
        tapToDismiss: true,
        toastClass: 'ngx-toastr toast-success',
      });
      this.router.navigate(['/pages/customers']);
    }
  }
}
