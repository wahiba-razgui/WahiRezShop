import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserModel} from '../model/user.model';

const AUTH_API = 'http://localhost:3000/api/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<UserModel> {
    return this.http.get(AUTH_API, httpOptions);
  }

  public deleteById(id: string | undefined): Observable<any> {
    return this.http.delete(AUTH_API + `/${id}`, httpOptions);
  }

  public update(id: string | undefined, username: string, email: string, password: string, roles: string[] = []): Observable<any> {
    return this.http.put(AUTH_API, {
      username,
      email,
      password,
      roles,
      _id: id
    }, httpOptions);
  }
}
