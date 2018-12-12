import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  getChecking(accountEmail: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/checking', { params: {email: accountEmail}})
  }

  getSavings(accountEmail: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/savings', { params: {email: accountEmail}})
  }

  registerUser(newEmail: string) {
    return this.http.post("http://localhost:3000/users", {"email": newEmail})
  }
  
}
