import { createAction } from 'redux-act';

export default (description, asyncFunction) =>
  createAction(description, (...args) => ({
    ...args,
    reduxActDispatchFreeAsyncAction: store => asyncFunction(store)(...args)
  }));