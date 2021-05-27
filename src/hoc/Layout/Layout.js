import React from "react";
import SideBar from "../../components/Navigation/SideBar/SideBar";
import classes from "./Layout.css";
import Header from "../../components/Header/Header";
import TasksBar from "../../containers/TasksBar/TasksBar";

const layout = (props) => {
   return (
      <section className={classes.Layout}>
         <SideBar />
         <TasksBar />
         <div className={classes.Main}>
            <Header />
            <main>{props.children}</main>
         </div>
      </section>
   );
};

export default layout;
