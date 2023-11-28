import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppService } from './app.service';
import { Observable, Subject, catchError, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sidenavUpdateSource = new Subject<void>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service:AppService,
    private snackBar: MatSnackBar
  ) { }
  isLoggedin(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token != null) {
      const headers = new HttpHeaders({
        Authorization:"Bearer "+token,
      });
      return this.service.authenticateToken(headers).pipe(
        map((response) => {
          // Assuming the authentication endpoint returns a successful status (e.g., 200 OK)
          // You might need to adjust this based on the actual response structure.
          return response.status === 200;
        }),
        catchError((error) => {
          // Handle authentication error (e.g., token invalid or expired)
          console.error('Authentication failed:', error);
          return of(false); // Return false to indicate authentication failure
        })
      );
    } else {
      return of(false);
    }
  }

  sidenavUpdate$ = this.sidenavUpdateSource.asObservable();
  triggerSidenavUpdate(): void {
    this.sidenavUpdateSource.next();
  }
}
