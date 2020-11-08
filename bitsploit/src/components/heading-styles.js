import React from "react";
import headingStyles from "./heading.module.css"

const Heading = (props) => <h1 className={headingStyles.headingAbout}>{props.headingText}</h1>

export default Heading