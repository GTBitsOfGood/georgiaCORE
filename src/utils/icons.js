import {
  FaInstagram,
  FaFacebook,
  FaQuestion,
  FaAccessibleIcon,
  FaUserNurse,
  FaStethoscope,
  FaBrain,
} from "react-icons/fa";
import {
  GrResources,
  GiMedicalThermometer,
  GrNavigate,
  GiCaduceus,
} from "react-icons/gr";
import { BiPlusMedical, BiNavigation } from "react-icons/bi";
import { CiMedicalMask } from "react-icons/ci";
import { IoBandage } from "react-icons/io";
import { BsFileMedical, BsSearch } from "react-icons/bs";
import { MdCancel, MdPersonPin } from "react-icons/md";
import {
  AiOutlineCalendar,
  AiFillEnvironment,
  AiFillAlert,
  AiFillCloud,
  AiFillEdit,
  AiFillFolder,
  AiFillFire,
  AiFillEye,
  AiFillGoogleSquare,
  AiFillInfoCircle,
  AiFillFrown,
  AiFillHome,
  AiFillHeart,
  AiFillMessage,
  AiFillSmile,
  AiFillTwitterCircle,
} from "react-icons/ai";
import {
  GiPersonInBed,
  GiMedicines,
  GiInspiration,
  GiBandageRoll,
  GiLungs,
  GiKidneys,
} from "react-icons/gi";
import { TbVaccine } from "react-icons/tb";
import React from "react";

const icons = {
  Alert: <AiFillAlert />,
  Bandage: <IoBandage />,
  BandageRoll: <GiBandageRoll />,
  Brain: <FaBrain />,
  Caduceus: <GiCaduceus />,
  Calendar: <AiOutlineCalendar />,
  Cancel: <MdCancel />,
  Cloud: <AiFillCloud />,
  Doctor: <MdPersonPin />,
  Edit: <AiFillEdit />,
  Eye: <AiFillEye />,
  Facebook: <FaFacebook />,
  Fire: <AiFillFire />,
  Frown: <AiFillFrown />,
  Folder: <AiFillFolder />,
  Google: <AiFillGoogleSquare />,
  Heart: <AiFillHeart />,
  Home: <AiFillHome />,
  Information: <AiFillInfoCircle />,
  Instagram: <FaInstagram />,
  Inspiration: <GiInspiration />,
  Kidney: <GiKidneys />,
  Location: <AiFillEnvironment />,
  Lungs: <GiLungs />,
  Mask: <CiMedicalMask />,
  Medicine: <GiMedicines />,
  MedicalForm: <BsFileMedical />,
  MedicalPlus: <BiPlusMedical />,
  Message: <AiFillMessage />,
  Navigate: <GrNavigate />,
  NavigateArrow: <BiNavigation />,
  Nurse: <FaUserNurse />,
  PersonInBed: <GiPersonInBed />,
  QuestionMark: <FaQuestion />,
  Resources: <GrResources />,
  Search: <BsSearch />,
  Smile: <AiFillSmile />,
  Sthetoscope: <FaStethoscope />,
  Thermometer: <GiMedicalThermometer />,
  Twitter: <AiFillTwitterCircle />,
  Wheelchair: <FaAccessibleIcon />,
  Vaccine: <TbVaccine />,
};

export default icons;
