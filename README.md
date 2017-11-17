## Free your component from [connect](https://github.com/reactjs/react-redux), free yourself from extra code

> `redux-act-dispatch-free` extends `redux-act` so that you can call async actions without dispatch.

> Of course this works only with [assigned](https://github.com/pauldijou/redux-act#assignallactioncreators-stores) or [bound](https://github.com/pauldijou/redux-act#bindallactioncreators-stores) actions

> So it **allows you to access** a bound **store** from an *asyncAction*

> 1k size minified, 0.1kB minified + gzipped

### Instalation
```bash
npm install redux-act-dispatch-free --save
```

### Example

> `createAsyncCycle` new at 17 nov 2017

```javascript
// userActions.js
import { createAsyncCycle } from 'redux-act-dispatch-free';

// You can return any async (or not) function
// and thay will automaticaly dispatch all async lifecicle functions
export const [fetchGetUserData, successGetUserData, errorGetUserData] = createAsyncCycle(
  'get user data',
  store => () => api.getUserData(store.getState().app.user.uid)
);
```
#### Call `fetchGetUserData` will generate^

> "[fetch] get user data"

> ...after some time...

> "[success] get user data" or "[error] get user data"

#### You can customize output payload

```javascript
export const [fetchGetUserData, successGetUserData, errorGetUserData] = createAsyncCycle(
  'get user data',
  store => () => api.getUserData(store.getState().app.user.uid),
  // success
  payload => payload.data,
  // error
  error => error.response.status
);
```

#### More custom way

```javascript
// userActions.js
import { createAction } from 'redux-act';
import { createAsyncAction } from 'redux-act-dispatch-free';

export const responseUserInfo = createAction('response user Info');
export const errorResponceUserInfo = createAction('error response user Info');

export const fetchUserInfo = createAsyncAction(
  'request user data',
  store => async userId => {
    try {
      const response = await api.getUser(userId);
      responceUserInfo(response.data);
    } catch (e) {
      console.error(e)
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
    fetchUserInfo(this.props.yuerId)
  };
//...
```

#

> Likewise you can import only needed methods

```javascript
// userActions.js
import createAsyncCycle from 'redux-act-dispatch-free/createAsyncCycle';
```

#


> **Attention:** *bindAll* and *assignAll* do not work with [SSR](http://redux.js.org/docs/recipes/ServerRendering.html)
