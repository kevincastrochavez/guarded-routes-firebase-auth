import {
  Link,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthContextProvider, useAuthState } from './firebase';

function App() {
  const AuthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState();
    return (
      <Route
        {...props}
        render={(routeProps) =>
          isAuthenticated ? <C {...routeProps} /> : <Redirect to='/login' />
        }
      />
    );
  };

  const UnauthenticatedRoute = ({ component: C, ...props }) => {
    const { isAuthenticated } = useAuthState();
    return (
      <Route
        {...props}
        render={(routeProps) =>
          !isAuthenticated ? <C {...routeProps} /> : <Redirect to='/' />
        }
      />
    );
  };

  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Link to='/'>Home</Link> | <Link to='/login'>Login</Link> | {''}
          <Link to='/signup'>Sign Up</Link>
        </div>

        <AuthenticatedRoute exact path='/' component={<h1>Home</h1>} />
        <UnauthenticatedRoute
          exact
          path='/signup'
          component={<h1>Sign Up</h1>}
        />
        <UnauthenticatedRoute
          exact
          path='/signin'
          component={<h1>Sign In</h1>}
        />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
