import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import AuthContext from '../store/auth-context';

const firebaseAuthSignInURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
// don't include the [API_KEY] part here
const firebaseAPIKey = "AIzaSyCUx2yj0UjM_61qUl5KdEDdRBK-mPhEFg8";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    const url = `${firebaseAuthSignInURL}${firebaseAPIKey}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Auth failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        // data logged will take the form of what you see in the Response Payload section of the Firebase auth documentation below
        // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
        authCtx.login(data.idToken);
        // return data from this API call has thee idToken which we are storing in the authCtx since we'll need it from other components in the app to make auth'ed API calls to Firebase to do other things like interact with the database for CRUD operations
        // we also want to store the idToken to check (by virtue of it's existence) whether or not the user is logged in at any point in time

        // to do:
        // programmatic (and protected) navigation to the admin dashboard upon a successful login
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

// notes:
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
// CRUD - create, read, update, destroy
