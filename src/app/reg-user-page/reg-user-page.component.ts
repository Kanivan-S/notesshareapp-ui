import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reg-user-page',
  templateUrl: './reg-user-page.component.html',
  styleUrls: ['./reg-user-page.component.scss']
})
export class RegUserPageComponent implements OnInit {
  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ngOnInit(): void {

  }

  constructor(
    private router: Router,
    private service:AppService,
    private authser:AuthService,
    private snackBar: MatSnackBar
  )  { }



}

