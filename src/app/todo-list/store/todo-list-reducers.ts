import { Action, createReducer } from '@ngrx/store';
import { Todo } from 'src/app/shared/interfaces/todo.interface';

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

const _todoListReducer = createReducer(initialState);

export function todoListReducer(
  state: TodoListState | undefined,
  action: Action
) {
  return _todoListReducer(state, action);
}
