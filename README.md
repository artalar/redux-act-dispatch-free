## Free your component from [connect](https://github.com/reactjs/react-redux), free yourself from extra code

> `redux-act-dispatch-free` extend `redux-act` for async actions call without dispatch.

> Of course this work only with [assigned](https://github.com/pauldijou/redux-act#assignallactioncreators-stores) or [bonded](https://github.com/pauldijou/redux-act#bindallactioncreators-stores) actions

> So it **granted access to** bounded **store** from *asyncAction*

> 1KB size gzip

### Example
```javascript
// userActions.js
import { createAction } from 'redux-act';
import { createAsyncAction } from 'redux-act-dispatch-free';

export const responseUserAuthorization = createAction('response user authorization');
export const errorResponceUserAuthorization = createAction('error response user authorization');

export const fetchUserInfo = createAsyncAction(
  'request user data',
  store => async () => {
    try {
      const response = await api.getMe();
      responceUserInfo(response.data.result.user);
    } catch (e) {
      console.log(e)
      errorResponceUserInfo(e.message ? e.message : e);
    }
  }
);
```

```javascript
// initStore.js
import { asyncActionsCallerMiddleware } from 'redux-act-dispatch-free';
import { assignAll } from 'redux-act';
import actions from 'actions';
//...
  const store = createStore(
    reducers,
    applyMiddleware(asyncActionsCallerMiddleware)
  );
  assignAll(actions, store);
//...
```

```javascript
// Component.jsx
import { fetchUserInfo } from 'actions/userActions';
//...
  componentDidMount = () => {
    fetchUserInfo()
  };
//...
```

> **Attentions:** *bindAll* and *assignAll* not work with [SSR](http://redux.js.org/docs/recipes/ServerRendering.html)