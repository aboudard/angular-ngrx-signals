import { Component, inject } from '@angular/core';
import { TodosStore } from './todos/todos.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TodosStore],
})
export class AppComponent {
  title = 'angular-ngrx-signals';
  readonly todosStore = inject(TodosStore);
  readonly order = this.todosStore.filter.order;
  readonly todosCount  = this.todosStore.todosCount;

  setTodos() {
    const todos = [
      { id: 1, title: 'Learn Angular', completed: false },
      { id: 2, title: 'Learn NgRx', completed: false },
      { id: 3, title: 'Learn NgRx Signals', completed: false },
      { id: 4, title: 'Learn RxJS', completed: false },
      { id: 5, title: 'Learn TypeScript', completed: false },
    ];
    this.todosStore.setTodos(todos);
  }

  setFilter() {
    this.todosStore.setFilter({ query: 'changed', order: 'desc' });
  }

  resetStore() {
    this.todosStore.resetState();
  }

  setCriteria() {
    this.todosStore.setCriteria('completed');
  }


}
