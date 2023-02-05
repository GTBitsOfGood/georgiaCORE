/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./QuestionTemplate.module.css";
import Image from "next/image";
import PropTypes from "prop-types";
import { PhoneIcon } from "@chakra-ui/icons";
import UndoRedo from "../ChatNavigator/UndoRedo";
import ProgressBar from "../ChatNavigator/ProgessBar";
import icons from "src/utils/icons";
import Slider from "../Slider/Slider";

const QuestionTemplate = (props) => {
  const shouldRenderIcons = () => {
    let invalidIcons = props.options.some((option) => {
      return !option.icon || option.icon == "None";
    });
    return !invalidIcons;
  };

  const shouldRenderSupportingText = () => {
    let invalidText = props.options.some((option) => {
      return !option.supportingText || option.supportingText == "";
    });
    return !invalidText;
  };

  let renderIcons = shouldRenderIcons();
  let renderSupport = shouldRenderSupportingText();

  const getIcon = (icon) => {
    let Element = icons[icon];
    return (
      <Element.type font-size={60} className={styles.white}></Element.type>
    );
  };

  return (
    <div style={styles} id={styles.container}>
      <div id={styles.utilsRow}>
        <div id={styles.progress}>
          <ProgressBar
            bgcolor={"#F6893C"}
            completed={props.progess * 100}
            width="100"
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
      </div>
      <div id={styles.flexRow}>
        <h2 id={styles.question}>{props.question}</h2>
      </div>
      <div id={styles.optionContainer}>
        <Slider>
          {props.options.map((option, index) => {
            return (
              <div
                itemID={index}
                key={index}
                id={styles.optionStack}
                onClick={option.triggerNext ? option.triggerNext : () => {}}
              >
                {renderIcons ? (
                  <>
                    <div id={styles.greenCircle}>{getIcon(option.icon)}</div>
                    <h4 id={styles.optionAnswer}>{option.answer}</h4>
                    {renderSupport && (
                      <p id={styles.optionInfo}>{option.supportingText}</p>
                    )}
                  </>
                ) : (
                  <>
                    <div id={styles.greenCircle} style={{ marginBottom: 45 }}>
                      {option.answer}
                    </div>
                    {renderSupport && (
                      <p id={styles.optionInfo}>{option.supportingText}</p>
                    )}
                  </>
                )}
                <div />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

QuestionTemplate.propTypes = {
  setUndoStack: PropTypes.any,
  question: PropTypes.any,
  setCurrentQuestionIndex: PropTypes.any,
  undoStack: PropTypes.any,
  progess: PropTypes.any,
  options: PropTypes.any,
};

export default QuestionTemplate;
