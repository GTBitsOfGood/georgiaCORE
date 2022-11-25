import { FaInstagram, FaFacebook, FaQuestion } from "react-icons/fa";
import { GrResources, GiMedicalThermometer } from "react-icons/gr";
import { BiPlusMedical } from "react-icons/bi";
import { CiMedicalMask } from "react-icons/ci";
import { BsFileMedical } from "react-icons/bs";
import { MdCancel, MdPersonPin } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { GiPersonInBed } from "react-icons/gi";
import React from "react";

const icons = {
  Calendar: <AiOutlineCalendar />,
  Cancel: <MdCancel />,
  Doctor: <MdPersonPin />,
  Facebook: <FaFacebook />,
  Instagram: <FaInstagram />,
  Mask: <CiMedicalMask />,
  MedicalForm: <BsFileMedical />,
  MedicalPlus: <BiPlusMedical />,
  PersonInBed: <GiPersonInBed />,
  QuestionMark: <FaQuestion />,
  Resources: <GrResources />,
  Thermometer: <GiMedicalThermometer />,
  
};

export default icons;
