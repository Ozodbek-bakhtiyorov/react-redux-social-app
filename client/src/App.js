import { Navbar } from "./components/Navbar";
import { Switch, Route ,  useHistory} from "react-router-dom";
import { Home, Profile, Signin, Signup } from "./pages";
import { createContext, useReducer, useEffect,useContext} from "react";
import Createpost from "./components/CreatePost/CreatePost";
import { userReducer, initialstate } from "./reducer/useReducer";
import Userprofile from "./pages/UserProfile";
import SubscribeUserPost from './pages/SubscribeUserPost';
export const Usercontext = createContext();

const Routes = () => {
 const  history = useHistory();
 const {state, dispatch} = useContext(Usercontext);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/');
    }
    else{
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile"  component={Profile} />
      <Route path="/signin" component={Signin} />
      <Route path="/createpost" component={Createpost} />
      <Route path="/user/:id" component={Userprofile}/>
      <Route path="/myfollowerpost" component={SubscribeUserPost}/>
      <Route>
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(userReducer, initialstate);

  return (
    <div className="App">
      <Usercontext.Provider value={{state, dispatch}}>
        <Navbar />
        <Routes />
      </Usercontext.Provider>
    </div>
  );
}

export default App;
