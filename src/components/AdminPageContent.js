import { useContext } from "react";
import AuthContext from '../store/auth-context';

const AdminPageContent = () => {
  const authCtx = useContext(AuthContext);

  // make an API using fetch to get some data from the Firebase database
  // to make this API call you will need the idToken that is saved in authCtx
  const token = authCtx.token
  // this token will need to be included in the body/payload of an outgoing API call to your Firestore database

  return (<div>AdminPageContent.js</div>);
};

export default AdminPageContent;
