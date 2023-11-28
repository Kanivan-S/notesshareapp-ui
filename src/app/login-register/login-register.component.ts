import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError: string;
  token: string;
  regtoken:string;
  isDialogOpen: boolean = false;

  hide: boolean = true;
  public showPassword: boolean = false;
  protected key=environment.recaptcha.siteKey;


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  constructor(
    private router: Router,
    private service:AppService,
    private authser:AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  )  {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      recaptcha: new FormControl(['', Validators.required]),
    });
    this.registerForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      copypassword: new FormControl('', Validators.required),
      recaptcha: new FormControl(['', Validators.required]),
    });
    this.loginError="";this.token="";this.regtoken="";
   }
   showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }
  ngOnInit(): void {
    this.authser.isLoggedin().subscribe({
      next: (loggedIn: boolean) => {
        if (loggedIn) {
          this.router.navigate(['user']);
          this.showSnackbar("Already Logged In!");
        }
      },
      error: (error) => {
        console.error("Error checking login status:", error);
      },
      complete: () => {
      },
    });
  }
  errored(err:any) {
    if (err.timeout) {
      // Regenerate the reCAPTCHA
      this.loginForm.get('recaptcha')?.reset();
      this.registerForm.get('recaptcha')?.reset();
    }
  }
  onLogin(){
    if(this.loginForm.valid){
      const mail=this.loginForm.get('email');
      const password=this.loginForm.get('password');
      if(mail!=null && password!=null && this.token.length!=0){
        const formval=new FormData();
        formval.append('mail',mail.value);
        formval.append('password',password.value);
        formval.append('recaptchatoken',this.token);
        this.service.authenticateUser(formval).subscribe({
          next:(data:HttpResponse<any>)=>{
            this.showSnackbar(data.body.message);
            localStorage.setItem("mail",data.body.mail);
            this.isDialogOpen=true;
            const dialogRef = this.dialog.open(ShareDialogComponent, {
              disableClose:true,
              data: {
                boxtype:'otp'
              },
            });

            dialogRef.afterClosed().subscribe(result => {
                this.showSnackbar('OTP verified!');
            });

          },
          error: (err: HttpErrorResponse) => {
            this.loginForm.get('recaptcha')?.reset();
            this.showSnackbar(err.error.message);
          },
          complete:()=>{
            // this.router.navigate(['user'])
          }
        }
        )
      }
      else{
        this.showSnackbar("Invalid Credentials!");
      }
    }
    else{
      this.showSnackbar("Invalid Credentials!");
    }
  }
  addItem(val: string) {
   console.log(val)
  }
  loginresolved(captchaResponse: string) {
    this.token=captchaResponse;
  }
  registerresolved(captchaResponse: string) {
    this.regtoken=captchaResponse;
  }
  onRegister(){
    if(this.registerForm.valid){
      const mail=this.registerForm.get("email");
      const password=this.registerForm.get("password");
      const confpassword=this.registerForm.get("copypassword");
      if(mail!=null && password!=null && confpassword!=null && (password.value==confpassword.value) && this.regtoken.length!=0){
        const formval=new FormData();
        formval.append('mail',mail.value);
        formval.append('password',password.value);
        formval.append("copypassword",confpassword.value);
        formval.append('recaptchatoken',this.regtoken);
        this.service.authenticateRegister(formval).subscribe({
          next:(data:HttpResponse<any>)=>{
            this.showSnackbar(data.body.message);
            localStorage.setItem("mail",data.body.mail);
            const dialogRef = this.dialog.open(ShareDialogComponent, {
              disableClose:true,
              data: {
                boxtype:'otp'
              },
            });
            dialogRef.afterClosed().subscribe(result => {
                this.showSnackbar('OTP verified!');
            });
          },
          error: (err: HttpErrorResponse) => {
            this.registerForm.get('recaptcha')?.reset();
            this.showSnackbar(err.error.message);
          },
          complete:()=>{
            // this.router.navigate(['user'])
          }
        }
        )
      }
      else{
        this.showSnackbar("Invalid Credentials!");
      }
    }
    else{
      this.showSnackbar("Invalid Credentials!");
    }

  }
}

