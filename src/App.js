import React, { Component, Suspense } from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "./store/actions/index";
import Spinner from './components/UI/Spinner/Spinner';

// Not Used BC of Lazy Loading
// ======================================================
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
// ======================================================

// React Lazy Loading
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));

class App extends Component {

  componentDidMount(){
    this.props.onLoadAuthFromStorage();
  }

  render() {

    let routes = (
      <Switch>
        <Route 
          path="/auth" 
          render={()=>(
            <Suspense fallback={<Spinner/>} >
              <Auth {...this.props}/>
            </Suspense>
          )}
        />
        <Route path="/" exact component={BurgerBuilder}/>
        {/* Sends Unknow Routes To Home*/}
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>

          {/* React Lazy Load*/}
          <Route 
            path="/checkout" 
            render={()=>(
              <Suspense fallback={<Spinner/>} >
                <Checkout {...this.props}/>
              </Suspense>
            )}
          />

          {/* React Lazy Load*/}
          <Route 
            path="/orders" 
            render={()=>(
              <Suspense fallback={<Spinner/>} >
                <Orders {...this.props}/>
              </Suspense>
            )}
          />

          {/* React Lazy Load*/}
          <Route 
            path="/auth" 
            render={()=>(
              <Suspense fallback={<Spinner/>} >
                <Auth {...this.props}/>
              </Suspense>
            )}
          />
       
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
           {/* Sends Unknow Routes To Home*/}
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
     
          <div>
            <Layout>
              {routes}
            </Layout>
          </div>
       
    );
  }
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onLoadAuthFromStorage: ()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


// Firebase URL: https://react-buger-c3d8d.firebaseio.com/


// const Posts = React.lazy(() => import('./containers/Posts'));

      //     <Route
      //       path="/posts"
      //       render={() => (
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //       )}
      //     />



      // let routes = (
      //   <Switch>
      //     <Route path="/auth" component={Auth}/>
      //     <Route path="/" exact component={BurgerBuilder}/>
      //     {/* Sends Unknow Routes To Home*/}
      //     <Redirect to="/"/>
      //   </Switch>
      // );
  
      // if(this.props.isAuthenticated){
      //   routes = (
      //     <Switch>
      //       <Route path="/checkout" component={Checkout}/>
      //       <Route path="/orders" component={Orders}/>
      //       <Route path="/auth" component={Auth}/>
      //       <Route path="/logout" component={Logout}/>
      //       <Route path="/" exact component={BurgerBuilder}/>
      //        {/* Sends Unknow Routes To Home*/}
      //       <Redirect to="/"/>
      //     </Switch>
      //   );
      // }