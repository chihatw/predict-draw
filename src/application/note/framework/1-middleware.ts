import { AnyAction, Middleware } from '@reduxjs/toolkit';
import { Services } from 'infrastructure/services';

const noteMiddleware =
  (services: Services): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  async (action: AnyAction) => {
    next(action);
    switch (action.type) {
      case 'note/update': {
        const input = action.payload as string;
        services.api.note.update(input);
        return;
      }
      default:
    }
  };

export default [noteMiddleware];
