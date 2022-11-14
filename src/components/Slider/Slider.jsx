/* eslint-disable no-unused-vars */
import React, {useState, useLayoutEffect, useRef} from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import styles from "./Slider.module.css";

const Slider = (props) => {

    const [x, setX] = useState(0);

    const buildElGroups = () => {
        let tempGroup = []
        for (let i = 0; i < Math.ceil(props.children.length / el); i += 1) {
            let temp = []
            for (let j = i * el; j < Math.min((i + 1) * el, props.children.length); ++j) {
                temp.push(props.children[j]);
            }
            tempGroup.push(temp);
        }
        return tempGroup;
    }


    const ref = useRef(null);
    const [el, setEl] = useState(3);

    useLayoutEffect(() => {
        let numElements = Math.min(5, parseInt(ref.current.offsetWidth/250));
        setEl(numElements);
    }, []);

    let elGroups = buildElGroups();

    return (
        <div id={styles.sliderContainer} ref={ref}>
            {
                elGroups.map((group, index) => {
                    return (
                    <div id={styles.panel} style={{transform: `translateX(${index * 100 + (x)}%)`}}>
                        {
                            group.map((el, index) => el)
                        }
                    </div>);
                })
            }
            {x != ((elGroups.length - 1) * -100) && 
                <div id={styles.rightIcon} onClick={() => setX(x => x - 100)}>
                    <FiChevronRight font-size={70} />
                </div>
            }
            {x != 0 &&
                <div id={styles.leftIcon} onClick={() => setX(x => x + 100)}>
                    <FiChevronLeft font-size={70} />
                </div>
            }
        </div>
    );

};


export default Slider;