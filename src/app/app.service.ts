import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { API} from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {}
  authenticateToken(headers:HttpHeaders){
    return this.http.head<any>(`${API}/auth/JWTVerify`,{headers:headers,observe:'response'});
  }
  authenticateUser(form :FormData){
    return this.http.post<any>(`${API}/auth/login`,form,{observe:'response'});
  }
  authenticateRegister(form :FormData){
    return this.http.post<any>(`${API}/auth/register`,form,{observe:'response'});
  }

  verifyOTP(form :FormData){
    return this.http.post<any>(`${API}/auth/verifyOTP`,form,{observe:'response'});
  }
  shareText(form:FormData){
    let token=localStorage.getItem("token");
    if(token!=null){
      token="Bearer "+token;
      const headers=new HttpHeaders({
        "Authorization":token
      })
      return this.http.post<any>(`${API}/shareText`,form,{headers:headers,observe:'response'});
    }
    else{
      return this.http.post<any>(`${API}/shareText`,form,{observe:'response'});
    }


  }
  getTextHistory(headers:HttpHeaders){
    return this.http.get<any>(`${API}/getTextHistory`,{headers:headers,observe:'response'});
  }
  getText(linkcode :string){
    return this.http.get<any>(`${API}/getText?linkcode=`+linkcode,{observe:'response'});
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
