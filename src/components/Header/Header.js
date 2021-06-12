import React, { useEffect, useState, useRef } from "react";
import {} from "@heroicons/react/solid";
import {
   CogIcon,
   MailIcon,
   InformationCircleIcon,
   SearchIcon,
} from "@heroicons/react/outline";
import classes from "./Header.css";
// import Button from "../UI/Button/Button";
import themeClasses from "../../assets/styles/theme.css";
import Sun from "../UI/ToggleTheme/Sun/Sun";
import TimeBar from "./TimeBar/TimeBar";
import Button from "../UI/Button/Button";
import axios from "../../axios-tasks";
import clickOutSideHandler from "../../helper/clickOutSideHandler";

const Header = (props) => {
   // toggle theme
   const [toggleTheme, setToggleTheme] = useState(false);
   useEffect(() => {
      const app = document.body.querySelector("#root div");
      if (toggleTheme) {
         app.classList.remove(themeClasses.LightMode);
         app.classList.add(themeClasses.DarkMode);
      } else {
         app.classList.remove(themeClasses.DarkMode);
         app.classList.add(themeClasses.LightMode);
      }
   }, [toggleTheme]);
   const [mailClicked, setMailClicked] = useState(false);
   const [infoClicked, setInfoClicked] = useState(false);

   // clickoutside
   const mailClickHandler = (e) => {
      setMailClicked(true);
   };
   const infoClickHandler = (e) => {
      setInfoClicked(true);
   };

   const wrapperRef = useRef(null);
   const wrapperRef2 = useRef(null);
   clickOutSideHandler(wrapperRef, setMailClicked);
   clickOutSideHandler(wrapperRef2, setInfoClicked);

   // send msg
   const [msg, setMsg] = useState("");

   const sendMsg = () => {
      const data = {
         content: msg,
         date: new Date().toString(),
      };
      axios
         .post("/message.json", data)
         .then((response) => {
            console.log(response);
            setMailClicked(false);
            setMsg("");
         })
         .catch((e) => {});
   };

   return (
      <section className={classes.Header}>
         <TimeBar />
         <div className={classes.HeaderItems}>
            <div className={classes.Item}>
               <CogIcon className={classes.Icon} />
            </div>
            <div
               className={classes.Item}
               onClick={(e) => mailClickHandler(e)}
               ref={wrapperRef}>
               <MailIcon className={classes.Icon} />
               <div
                  className={
                     mailClicked
                        ? `${classes.Dialog} ${classes.ShowDialog}`
                        : classes.Dialog
                  }>
                  <textarea
                     value={msg}
                     onChange={(e) => setMsg(e.target.value)}
                     placeholder="Send feedback to Peppers to make this app better! Feel free cuz he will not know who u are."
                  />
               </div>
               <Button
                  btnType={
                     mailClicked ? ["ButtonPos"] : ["ButtonPos", "ButtonVisi"]
                  }
                  clicked={sendMsg}>
                  Send
               </Button>
            </div>
            <div
               className={classes.Item}
               onClick={(e) => infoClickHandler(e)}
               ref={wrapperRef2}>
               <InformationCircleIcon className={classes.Icon} />
               <div
                  className={
                     infoClicked
                        ? `${classes.Dialog} ${classes.Custom} ${classes.ShowDialog}`
                        : `${classes.Dialog} ${classes.Custom}`
                  }>
                  Helloo, Đây là cách làm việc của mình các bạn có thể tham khảo
                  nha. Mình sẽ set time là 1hour 30min và rest in 15min. À nhớ
                  gạch bỏ completed task để có thêm nhiều motivation nha. Hope u
                  enjoy
                  <span role="img" aria-label="emoji">
                     &#128526;
                  </span>{" "}
               </div>
            </div>
            <div className={classes.Item}>
               <SearchIcon className={classes.Icon} />
            </div>
         </div>
         <div
            style={{ cursor: "pointer" }}
            onClick={() => {
               setToggleTheme(!toggleTheme);
            }}>
            <Sun toggle={toggleTheme} />
         </div>
      </section>
   );
};

export default Header;
