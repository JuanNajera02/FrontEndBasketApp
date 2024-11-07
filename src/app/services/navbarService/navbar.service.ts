import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) {}

  logout() {
    const headers = this.clearAuthorizationHeader();
    
    localStorage.removeItem('token');
  }

  private clearAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({});
  }

}
