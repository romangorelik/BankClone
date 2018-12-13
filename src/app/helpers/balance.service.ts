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

  registerUser(newEmail: string): Observable<any> {
    return this.http.post<any>("http://localhost:3000/users", {"email": newEmail})
  }

  addCheckingDeposit(accountEmail: string, amount: number): Observable<any> {
    return this.http.patch<any>("http://localhost:3000/updatechecking", {email: accountEmail, deposit: amount})
  }
  
}
