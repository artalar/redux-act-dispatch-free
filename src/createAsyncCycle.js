// for build async code
import regeneratorRuntime from "regenerator-runtime";


import { createAction } from 'redux-act';

export default (description, asyncFunction, successFunction, errorFunction) => {
  const success = createAction(`[success] ${description}`, successFunction);
  const error = createAction(`[error] ${description}`, errorFunction);
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
