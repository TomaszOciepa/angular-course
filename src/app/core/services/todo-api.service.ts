import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>('http://localhost:3000/todo')
  }
}
