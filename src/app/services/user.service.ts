import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  private users: User[] = [];

  private url: string = 'http://localhost:8080/api/users';

  //pasamos por el contructor el http cliente
  constructor(private http: HttpClient) { 
  }

  //metodo para obtener todos
  findAll(): Observable<User[]> {
   // return of(this.users)
   return this.http.get<User[]>(this.url)
  }

  //metodo para obtener todos por pageable
  findAllPageable(page: number): Observable<any> {
    // return of(this.users)
    return this.http.get<any>(`${this.url}/page/${page}`);
   }

  findById(id: number): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  update(user: User): Observable<User>{
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }


}
