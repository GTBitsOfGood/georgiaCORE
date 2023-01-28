import { FaInstagram, FaFacebook, FaQuestion } from "react-icons/fa";
import { GrResources, GrUserWorker } from "react-icons/gr";
import { BiPlusMedical, BiMoney } from "react-icons/bi";
import { CiMedicalMask } from "react-icons/ci";
import {
  BsFileMedical,
  BsNewspaper,
  BsFillPersonFill,
  BsFillPeopleFill,
  BsBuilding,
} from "react-icons/bs";
import {
  MdCancel,
  MdPersonPin,
  MdEmojiPeople,
  MdOutlineFamilyRestroom,
  MdRecordVoiceOver,
  MdGroups,
} from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { GiPersonInBed, GiMedicalThermometer, GiStrong } from "react-icons/gi";
import { FcReading, FcDonate } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { TbLayersDifference } from "react-icons/tb";
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
