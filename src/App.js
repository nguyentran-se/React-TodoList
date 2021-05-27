import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import classes from "./assets/styles/theme.css";
import TasksBuilder from "./containers/TasksBuilder/TasksBuilder";
class App extends Component {
   render() {
      return (
         <div className={`${classes.App} ${classes.LightMode}`}>
            <Layout>
               <TasksBuilder />
            </Layout>
         </div>
      );
   }
}

export default App;
