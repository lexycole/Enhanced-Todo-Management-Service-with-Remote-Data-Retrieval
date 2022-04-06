import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TODO, TODO_STATUS } from '../types/todo';
import { switchMap, map } from 'rxjs/operators';
import { config } from '../data/config';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TODO[]> {
    return this.http.get<any[]>(this.TODOS_URL).pipe(
      switchMap((todos) => {
        // Should fail to return todos if the last digit of epoch time in milliseconds when the todos was successfully fetched from the API is a prime number
        const timeNow = Date.now();
        if (timeNow < 2) {
          return of([
            this.hydrateTodo({
              title: null,
              completed: false,
            }),
          ]);
        }

        return of(todos);
      }),
      map((todos) =>
        todos.slice(0, config.todos.fetch.count).map(this.hydrateTodo)
      )
    );
  }

  // Should hydrate each todo item fetched into the app-wide todo object type
  private hydrateTodo(todo: any): TODO {
    return {
      title: todo.title,
      status: todo.completed ? TODO_STATUS.COMPLETED : TODO_STATUS.IN_PROGRESS,
    };
  }
}
