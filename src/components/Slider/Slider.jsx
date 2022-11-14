/* eslint-disable no-unused-vars */
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styles from "./Slider.module.css";
import PropTypes from "prop-types";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const Slider = (props) => {
  const [x, setX] = useState(0);

  const buildElGroups = () => {
    let tempGroup = [];
    for (let i = 0; i < Math.ceil(props.children.length / el); i += 1) {
      let temp = [];
      for (
        let j = i * el;
        j < Math.min((i + 1) * el, props.children.length);
        ++j
      ) {
        temp.push(props.children[j]);
      }
      tempGroup.push(temp);
    }
    return tempGroup;
  };

  const ref = useRef(null);
  const [el, setEl] = useState(Math.min(5, window.innerWidth / 275));
  const [elGroups, setElGroups] = useState(buildElGroups());

  useEffect(() => {
    let numElements = Math.min(5, parseInt(window.innerWidth / 275));
    numElements = Math.max(numElements, 1);
    setEl(numElements);
    setElGroups(buildElGroups());
  }, [props]);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      let numElements = Math.min(5, parseInt(window.innerWidth / 275));
      numElements = Math.max(numElements, 1);
      setEl(numElements);
      setElGroups(buildElGroups());
    }, 40);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  return (
    <div id={styles.sliderContainer} ref={ref}>
      {elGroups.map((group, index) => {
        return (
          <div
            id={styles.panel}
            key={index}
            style={{ transform: `translateX(${index * 100 + x}%)` }}
          >
            {group.map((el, index) => el)}
          </div>
        );
      })}
      {x != (elGroups.length - 1) * -100 && (
        <div id={styles.rightIcon} onClick={() => setX((x) => x - 100)}>
          <FiChevronRight font-size={70} />
        </div>
      )}
      {x != 0 && (
        <div id={styles.leftIcon} onClick={() => setX((x) => x + 100)}>
          <FiChevronLeft font-size={70} />
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.any,
};

export default Slider;
