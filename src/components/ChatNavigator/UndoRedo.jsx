import React, { useEffect, useState } from "react";
import styles from "./UndoRedo.module.css";
import { getActiveQuestionTree, getQuestionTreeById } from "../../actions/Tree";
import Image from "next/image";
import PropTypes from "prop-types";
import QuestionTemplate from "../QuestionTemplate/QuestionTemplate";
import { useRouter } from "next/router";
import ErrorPage from "../ErrorPage";
import { useSession } from "next-auth/react";
import { IoChevronBackOutline } from "react-icons/io5";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import {RiArrowGoBackLine} from "react-icons/ri";


const UndoRedo = (props) => {
    return (
        <div id={styles.container}>
            <div 
                id={styles.box}
                onClick={props.handleHome}
                >
                    <RiArrowGoBackLine size={15} color="white"/>
            </div>
            <div 
                id={styles.box}
                onClick={props.handleHome}
                >
                    <BsChevronLeft  size={15} color="white"/>
            </div>
            <div 
                id={styles.box}
                onClick={props.handleHome}
                >
                    <BsChevronRight  size={15} color="white"/>
            </div>
            
        </div>
    );
}

UndoRedo.propTypes = {};

export default UndoRedo;

