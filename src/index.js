import { createAction } from 'redux-act';

export const createAsyncAction = (description, asyncFunction) =>
  createAction(description, (...args) => ({
    ...args,
    reduxActDispatchFreeAsyncAction: store => asyncFunction(store)(...args)
  }));

export const asyncActionsCallerMiddleware = store => next => action => {
  if (
    action.payload !== undefined &&
    action.payload.reduxActDispatchFreeAsyncAction !== undefined
  ) {
    action.payload.reduxActDispatchFreeAsyncAction(store);
    action.payload = Object.keys(action.payload).reduce(
      (payload, key) =>
        key === 'reduxActDispatchFreeAsyncAction'
          ? payload
          : { ...payload, [key]: action.payload[key] },
      {}
    );
    return next(action);
  }
  return next(action);
};

const createAsyncCycle = (description, asyncFunction) => {
  const success = createAction(`[success] ${description}`);
  const error = createAction(`[error] ${description}`);
  const fetch = createAction(`[fetch] ${description}`, (...args) => ({
    ...args,
    reduxActDispatchFreeAsyncAction: async store => {
      try {
        const response = await asyncFunction(store)(...args);
        success(response);
      } catch (e) {
        error(e);
      }
    },
  }));

  return [fetch, success, error];
};
