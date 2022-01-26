import React from "react"
import {DiStackoverflow} from "react-icons/di";
import {FiGithub, FiLinkedin} from "react-icons/fi";
import { IconContext } from "react-icons";

export const SocialIcons = () => (
    <div className={'socialIcons'}>
        <a className={"socialLink"} href={"https://www.linkedin.com/in/malsharanawaka/"}>
            <IconContext.Provider value={{ size: "1.3em", color: "rgba(255, 255, 255, 0.8)" }}>
                <FiLinkedin className={"iconFace"} strokeWidth={1.25} />
            </IconContext.Provider>
        </a>
        <a className={"socialLink"} href={"https://github.com/MalshaL"}>
            <IconContext.Provider value={{ size: "1.3em", color: "rgba(255, 255, 255, 0.8)" }}>
                <FiGithub className={"iconFace"} strokeWidth={1.25} />
            </IconContext.Provider>
        </a>
        <a className={"socialLink"} href={"https://stackoverflow.com/users/5802479/fleur"}>
            <IconContext.Provider value={{ size: "1.3em", color: "rgba(255, 255, 255, 0.8)" }}>
                <DiStackoverflow className={"iconFace"}/>
            </IconContext.Provider>
        </a>
    </div>
);