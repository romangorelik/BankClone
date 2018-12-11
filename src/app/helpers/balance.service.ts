import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  getChecking(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/checking')
  }

  getSavings(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/savings')
  }
  
}
