import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/shared/interfaces/todo.interface';
import * as TodoListActions from './todo-list-action';

export interface TodoListState {
  todos: Todo[];
  featchTodosErrorMessage: String | null;
  loading: boolean;
}

const initialState: TodoListState = {
  todos: [
    // {
    //   id: 1,
    //   isComplete: true,
    //   name: 'Umyj naczynia.',
    // },
    // {
    //   id: 2,
    //   isComplete: true,
    //   name: 'Umyj naczynia.2',
    // },
    // {
    //   id: 3,
    //   isComplete: false,
    //   name: 'Umyj naczynia3.',
    // },
  ],
  featchTodosErrorMessage: null,
  loading: false,
};

const _todoListReducer = createReducer(
  initialState,
  on(TodoListActions.addTodo, (state, action) => ({
    ...state,
    todos: state.todos.concat({ ...action.todo }),
  })),
  on(TodoListActions.deleteTodo, (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.id),
  })),
  on(TodoListActions.changeTodoStatus, (state, action) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id == action.id ? { ...todo, isComplete: !todo.isComplete } : todo
    ),
  })),
  on(TodoListActions.fetchTodosSuccess, (state, action) => ({
    ...state,
    todos: [...action.todos],
    loading: false,
    featchTodosErrorMessage: null,
  })),
  on(TodoListActions.fetchTodos, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(TodoListActions.fetchTodosFailed, (state, action) => ({
    ...state,
    loading: false,
    featchTodosErrorMessage: action.errorMessage,
  }))
);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
