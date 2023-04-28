import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private http:HttpService , private toaster:ToastrService , private router:Router , private authGuardService:AuthGuardService){

  }
  public Data: any = {};
  public formValid = false;
  public auth!: boolean;
  @ViewChild(FormComponent) formComponent!: FormComponent;
  signin() {
    const formData = this.formComponent.formGroup.value;
    if (
      this.formComponent.formGroup.status == 'VALID'
      ) {
      let loginData = {
        email: formData.Email,
        password: formData.Password,
      };
      this.http.loaderPost('loginadmin', loginData, false).subscribe((res: any) => {
        if (res) {
          if (res?.hasOwnProperty('errors')) {
            for (const key in res?.errors) {
              this.toaster.error(res?.errors[key]);
            }
          } else {
            this.toaster.success(res?.message);
            localStorage.setItem('access_token', res?.token);
              this.router.navigate(['/dashboard']);
              this.authGuardService.login('admin');
            AuthService.signin.next(true);
          }
        }
      });
    }
    else{
      this.toaster.error("Invalid Form");
    }
  }
}
