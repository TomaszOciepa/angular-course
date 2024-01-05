import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/shared/interfaces/todo.interface';
import * as TodoListActions from './todo-list-action';

export interface TodoListState {
  todos: Todo[];
}

const initialState: TodoListState = {
  todos: [
    {
      id: 1,
      isComplete: true,
      name: 'Umyj naczynia.',
    },
    {
      id: 2,
      isComplete: true,
      name: 'Umyj naczynia.2',
    },
    {
      id: 3,
      isComplete: false,
      name: 'Umyj naczynia3.',
    },
  ],
};

const _todoListReducer = createReducer(
  initialState,
  on(TodoListActions.addTodo, (state, action) => ({
    ...state,
    todos: state.todos.concat({ ...action.todo }),
  }))
);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
