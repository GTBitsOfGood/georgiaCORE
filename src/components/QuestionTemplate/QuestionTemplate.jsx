/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./QuestionTemplate.module.css";
import Image from "next/image";
import PropTypes from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";
import UndoRedo from "../ChatNavigator/UndoRedo";
import ProgressBar from "../ChatNavigator/ProgessBar";
import { BsGlobe } from "react-icons/bs";
import { getStackStyles } from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { AiOutlineAlignLeft } from "react-icons/ai";

const ItemTemplate = (props) => {
  const heading =
    props.type === "url" || props.type == "text" ? "Resources" : props.question;
  const progress =
    props.type === "url" || props.type == "text" ? 1 : props.progess;

  let mainBody = <></>;

  if (props.type === "text") {
    mainBody = (
      <div id={styles.optionContainer}>
        <div id={styles.bigTextContainer}>
          <div id={styles.textContainer}>
            How to donate a car: Complete the form Complete our easy-to-use
            online car donation form or call us 1-888-227-5500. We just need
            some basic info about you, your vehicle and where your vehicle needs
            to be picked up. If you have any questions about vehicle donation,
            please visit our FAQ’s. Arrange a free pick-up time Your vehicle can
            be scheduled for pick up within 24-48 hours after your title has
            been received by our vehicle donation processing center. We tow your
            car After a few weeks, you’ll receive the tax deductible receipt
            that you’ll need for filing your taxes. How to donate a car:
            Complete the form Complete our easy-to-use online car donation form
            or call us 1-888-227-5500. We just need some basic info about you,
            your vehicle and where your vehicle needs to be picked up. If you
            have any questions about vehicle donation, please visit our FAQ’s.
            Arrange a free pick-up time need some basic info about you, your
            vehicle and where your vehicle needs to be picked up. If you have
            any questions about vehicle donation, please visit our FAQ’s. time
            How to donate a car: Complete the form Complete our easy-to-use
            online car donation form or call us 1-888-227-5500. We just need
            some basic info about you, your vehicle and where your vehicle needs
            to be picked up. If you have any questions about vehicle donation,
            please visit our FAQ’s. Arrange a free pick-up time Your vehicle can
            be scheduled for pick up within 24-48 hours after your title has
            been received by our vehicle donation processing center. We tow your
            car After a few weeks, you’ll receive the tax deductible receipt
            that you’ll need for filing your taxes. How to donate a car:
            Complete the form Complete our easy-to-use online car donation form
            or call us 1-888-227-5500. We just need some basic info about you,
            your vehicle and where your vehicle needs to be picked up. If you
            have any questions about vehicle donation, please visit our FAQ’s.
            Arrange a free pick-up time need some basic info about you, your
            vehicle and where your vehicle needs to be picked up. If you have
            any questions about vehicle donation, please visit our FAQ’s. time
          </div>
          <div
            id={styles.copyContainer}
            onClick={() => {
              navigator.clipboard.writeText(props.text);
            }}
          >
            <AiOutlineAlignLeft
              style={{
                display: "inline",
                position: "relative",
                top: "2.5px",
                right: "3px",
              }}
            ></AiOutlineAlignLeft>
            Copy
          </div>
        </div>
      </div>
    );
  } else if (props.type === "url") {
    mainBody = (
      <div id={styles.optionContainer}>
        <div id={styles.optionStack}>
          <span id={styles.globe}>
            <BsGlobe></BsGlobe>
          </span>
          <span>
            Others found this page useful:{" "}
            <a id={styles.urlLink} href={props.url}>
              <span style={{ borderBottom: "1px solid #1C355E" }}>
                {props.url}
              </span>
              <HiOutlineExternalLink id={styles.linkIcon} />
            </a>
          </span>
        </div>
      </div>
    );
  } else if (props.type === "question") {
    mainBody = (
      <div id={styles.optionContainer}>
        {props.options.map((option, index) => {
          return (
            <div
              itemID={index}
              key={index}
              id={styles.optionStack}
              onClick={option.triggerNext ? option.triggerNext : () => {}}
            >
              {props.options.image ? (
                <div id={styles.greenCircle}>
                  <PhoneIcon></PhoneIcon>
                </div>
              ) : (
                <div id={styles.greenCircle}>
                  <PhoneIcon height={50} width={50}></PhoneIcon>
                </div>
              )}
              <h4 id={styles.optionAnswer}>{option.answer}</h4>
              <p id={styles.optionInfo}>
                professional medical resources that may help
              </p>
              <div />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={styles} id={styles.container}>
      <div id={styles.flexRow}>
        <div id={styles.progress}>
          <ProgressBar
            bgcolor={"#F6893C"}
            completed={progress * 100}
            width="150"
          />
        </div>
        <div id={styles.redo}>
          <UndoRedo
            question={props.question}
            setCurrentQuestionIndex={props.setCurrentQuestionIndex}
            undoStack={props.undoStack}
            setUndoStack={props.setUndoStack}
          />
        </div>
        <h2 id={styles.question}>{heading}</h2>
      </div>
      {mainBody}
    </div>
  );
};

ItemTemplate.propTypes = {
  question: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.any, // string but optional
      answer: PropTypes.string,
      next: PropTypes.number,
      triggerNext: PropTypes.func,
    })
  ),
};

export default ItemTemplate;
