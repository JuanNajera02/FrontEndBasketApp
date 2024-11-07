import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { map } from 'rxjs/operators';
import { TokenService } from '../tokenService/token.service';
import { url } from '../../url-config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

}
