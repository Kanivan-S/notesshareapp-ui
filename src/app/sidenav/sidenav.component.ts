import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private subscription!: Subscription;
  navlistdata : TextHistory[]=[];
  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {
    this.subscription = this.authser.sidenavUpdate$.subscribe(() => {
      this.updatennavlist();
    });
    this.updatennavlist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  updatennavlist(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization:"Bearer "+token,
    });
    this.service.getTextHistory(headers).subscribe({
      next:(data:HttpResponse<any>)=>{
        this.navlistdata=data.body.data.map((c:TextHistory,index:Number)=>{
          return {
            sno: Number(index)+1,
            linkcode:c.linkcode,
            updatedAt:c.updatedAt
          }
        })
      },
      error:(err: HttpErrorResponse) => {
        this.showSnackbar(err.error.message);
      },
    })
  }

  constructor(
    private router: Router,
    private service:AppService,
    private authser:AuthService,
    private snackBar: MatSnackBar
  )  { }

  showSnackbar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 3000, // Duration in milliseconds
    });}

}

export interface TextHistory{
  sno:Number;
  linkcode:String;
  updatedAt:String;
}

