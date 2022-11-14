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
  Instagram: <FaInstagram />,
  Facebook: <FaFacebook />,
  QuestionMark: <FaQuestion />,
  Resources: <GrResources />,
  MedicalPlus: <BiPlusMedical />,
  Thermometer: <GiMedicalThermometer />,
  Mask: <CiMedicalMask />,
  MedicalForm: <BsFileMedical />,
  Cancel: <MdCancel />,
  Calendar: <AiOutlineCalendar />,
  Doctor: <MdPersonPin />,
  PersonInBed: <GiPersonInBed />,
};

export default icons;
