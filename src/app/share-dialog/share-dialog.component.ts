import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss'],
})
export class ShareDialogComponent {


  @Input() boxtype='';
  // @Output() newItemEvent = new EventEmitter<string>();
  otpForm: FormGroup;
  constructor(
    private authser:AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    private service:AppService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      this.otpForm=new FormGroup({otp:new FormControl('',[Validators.required])})
      this.dialogRef.afterClosed().subscribe(result => {
        this.authser.triggerSidenavUpdate();
      });
    }
  copymsg():void{
    this.showSnackbar("Copied to Clipboard");
  }
  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });}
  onClose(): void {
    this.authser.triggerSidenavUpdate();
    this.dialogRef.close();
  }
  onOtpChange(value: string) {
    const mail=localStorage.getItem("mail");
    if(value.length===6 && mail){
      const formval=new FormData();
      formval.append('otp',value);
      formval.append('mail', mail);
      this.service.verifyOTP(formval).subscribe({
        next:(data:HttpResponse<any>)=>{
          this.showSnackbar(data.body.message);
          localStorage.removeItem("mail");
          localStorage.setItem("token",data.body.accessToken);
          this.dialogRef.close();
          this.router.navigate(['user']);
        },
        error:(err:HttpErrorResponse)=>{
          this.showSnackbar(err.error.message);
        },
        complete:()=>{
          // this.router.navigate(['user'])
        }

      })
    }
  }


}
