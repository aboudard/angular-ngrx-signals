import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Todo } from './todo';
import { computed } from '@angular/core';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
  query: {
    sort: {
      criteria: string;
    };
  };
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  filter: { query: 'test', order: 'asc' },
  query: {
    sort: {
      criteria: 'title',
    }
  }
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos }) => ({
    todosCount: computed(() => todos().length),
  })),
  withMethods((store) => ({
    setTodos(todos: Todo[]) {
      patchState(store, () => ({ todos }));
    },
    setFilter(tmpFilter: { query: string; order: 'asc' | 'desc' }) {
      patchState(store, (state) => ({
        filter: { ...state.filter, ...tmpFilter },
      }));
    },
    setCriteria(criteria: string) {
      patchState(store, (state) => ({
        query: { ...state.query, sort: { ...state.query.sort, criteria } },
      }));
    },
    resetState() {
      patchState(store, () => initialState);
    },
  }))
);
