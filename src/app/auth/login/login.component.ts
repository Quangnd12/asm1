// login.component.ts
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";

import { SpinnerService } from "../../@theme/components/spinner/spinner.service";
import { AuthService } from "../../@core/services/apis";
import { LocalStorageService } from "../../@core/services/common";
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from "../../@core/config";
import { IAlertMessage } from "../../@theme/components/alert/ngx-alerts.component";

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alertMessages: IAlertMessage[] = [];
  submitting = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: SpinnerService,
    private auth: AuthService,
    private storageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid && !this.submitting) {
      this.submitting = true;
      this.spinner.show();

      this.auth.login({
        useremail: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
        .pipe(finalize(() => {
          this.submitting = false;
          this.spinner.hide();
        }))
        .subscribe({
          next: (res) => this.handleLoginSuccess(res),
          error: (err) => this.handleLoginFailed(err),
        });
    } else {
      this.alertMessages = [{ status: 'danger', message: 'Form không hợp lệ. Vui lòng kiểm tra lại thông tin.' }];
    }
  }

  private handleLoginSuccess(res) {
    console.log('Login successful. Token:', res.access_token);
    this.storageService.setItem(LOCALSTORAGE_KEY.userInfo, res.email);
    this.storageService.setItem(LOCALSTORAGE_KEY.token, res.access_token);
    this.router.navigate([ROUTER_CONFIG.pages]).then();
  }

  private handleLoginFailed(error) {
    console.error('Login failed:', error);
    this.alertMessages = [{ status: 'danger', message: 'Tài khoản hoặc mật khẩu không chính xác' }];
  }
}
