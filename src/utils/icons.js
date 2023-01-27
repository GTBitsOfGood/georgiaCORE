import { FaInstagram, FaFacebook, FaQuestion } from "react-icons/fa";
import { GrResources, GiMedicalThermometer } from "react-icons/gr";
import { BiPlusMedical } from "react-icons/bi";
import { CiMedicalMask } from "react-icons/ci";
import { BsFileMedical } from "react-icons/bs";
import { MdCancel, MdPersonPin } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { GiPersonInBed } from "react-icons/gi";
import React from "react";
import {
  BsNewspaper,
  GiStrong,
  TbLayersDifference,
  BsFillPersonFill,
  GrUserWorker,
  FcReading,
  AiOutlineMail,
  BiMoney,
  FcDonate,
  BsFillPeopleFill,
  MdEmojiPeople,
  BsBuilding,
  MdOutlineFamilyRestroom,
  MdRecordVoiceOver,
  MdGroups,
} from "react-icons";

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
  arm: <GiStrong />,
  Difference: <TbLayersDifference />,
  Person: <BsFillPersonFill />,
  Worker: <GrUserWorker />,
  Reading: <FcReading />,
  Mail: <AiOutlineMail />,
  Money: <BiMoney />,
  Donate: <FcDonate />,
  Group: <BsFillPeopleFill />,
  news: <BsNewspaper />,
  Volunteer: <MdEmojiPeople />,
  Building: <BsBuilding />,
  Family: <MdOutlineFamilyRestroom />,
  speaking: <MdRecordVoiceOver />,
  leader: <MdGroups />,
};

export default icons;
