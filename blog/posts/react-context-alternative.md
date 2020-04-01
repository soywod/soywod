---
title: React Context API alternative
desc: 'Experiment: replace React Context API by RxJS Observable pattern'
date: '2019-06-26'
tags:
  - experiment
  - react
  - context
  - observable
---

For my next [React](https://reactjs.org) project, I need to integrate
[Firebase](https://firebase.google.com). Let's start with the authentication
system:

## With React Context API

```javascript
// context.js

export const AuthContext = createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}
```

```javascript
// service.js

export function onAuthStateChanged(callback) {
  return firebase.auth().onAuthStateChanged((user, error) => {
    if (error || !user) callback(false)
    else callback(user)
  })
}
```

```javascript
// provider.jsx

import {AuthContext} from './context'
import {onAuthStateChanged} from './service'

function AuthProvider({children}) {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(setAuth)
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
```

I'm quite happy, it works well. I re-read a bit their documentation, and I see
in [this
paragraph](https://firebase.google.com/docs/auth/web/start#set_an_authentication_state_observer_and_get_user_data)
the word _observer_. It reminds me of [RxJS](https://rxjs-dev.firebaseapp.com),
with their Observables. Wait... what about replacing my context with an
observable?

## With RxJS Observable pattern
I have less files and less code:

```javascript
// service.js

export const user$ = new BehaviorSubject(null)

export function onAuthStateChanged(callback) {
  return firebase.auth().onAuthStateChanged((user, error) => {
    if (error || !user) user$.next(false)
    else user$.next(user)
  })
}
```

```javascript
// hooks.js

import {onAuthStateChanged} from './service'

export function useAuth() {
  const [user, setUser] = useState(user$.value)

  useEffect(() => {
    const subscription = user$.subscribe(setUser)
    return () => subscription.unsubscribe()
  }, [])

  return user
}

export function useAuthService() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged()
    return () => unsubscribe()
  }, [])
}
```

Also, my `App` file is much cleaner. I don't have to indent one level more for
each new provider:

```javascript
// with context
function App() {
  return (
    <AuthProvider>
      <OtherProvider>
        ...
      </OtherProvider>
    </AuthProvider>
  )
}

// with observable
function App() {
  useAuthService()
  useOtherService()

  return (
    ...
  )
}
```

## Conclusion

This is just an experiment but the result is interesting. The code is cleaner
and we prevent some of the unexpected re-renders. It could be nice to compare
bundle sizes and performances.

I don't see any drawback here, but I may miss something. I would love to get
some feedback, feel free to leave a comment!
