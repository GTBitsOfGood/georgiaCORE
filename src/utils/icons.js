import {
  FaInstagram,
  FaFacebook,
  FaQuestion,
  FaAccessibleIcon,
  FaUserNurse,
  FaStethoscope,
  FaBrain,
  FaMoneyBill,
  FaDonate,
  FaHospitalAlt
} from "react-icons/fa";
import { GrResources, GrNavigate, GrUserWorker, GrGroup } from "react-icons/gr";
import { BiPlusMedical, BiNavigation } from "react-icons/bi";
import { CiMedicalMask } from "react-icons/ci";
import { IoBandage } from "react-icons/io5";
import { BsFileMedical, BsSearch, BsIntersect, BsFillPersonFill, BsNewspaper } from "react-icons/bs";
import { MdCancel, MdPersonPin, MdEmail, MdOutlineFamilyRestroom, MdRecordVoiceOver } from "react-icons/md";
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
  GiBiceps,
  GiLungs,
  GiKidneys,
  GiCaduceus,
  GiMedicalThermometer,
  GiBookCover,
  GiPalm
} from "react-icons/gi";
import { TbVaccine } from "react-icons/tb";
import React from "react";


const icons = {
  Alert: <AiFillAlert />,
  Bandage: <IoBandage />,
  BandageRoll: <GiBandageRoll />,
  Biceps: <GiBiceps/>,
  Book: <GiBookCover/>,
  Brain: <FaBrain />,
  Caduceus: <GiCaduceus />,
  Calendar: <AiOutlineCalendar />,
  Cancel: <MdCancel />,
  Cloud: <AiFillCloud />,
  Differences: <BsIntersect/>,
  Doctor: <MdPersonPin />,
  Donate: <FaDonate/>,
  Edit: <AiFillEdit />,
  Email: <MdEmail/>,
  Eye: <AiFillEye />,
  Facebook: <FaFacebook />,
  Family: <MdOutlineFamilyRestroom/>,
  Fire: <AiFillFire />,
  Frown: <AiFillFrown />,
  Folder: <AiFillFolder />,
  Google: <AiFillGoogleSquare />,
  Group: <GrGroup/>,
  Heart: <AiFillHeart />,
  Home: <AiFillHome />,
  Hospital: <FaHospitalAlt/>,
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
  Money: <FaMoneyBill/>,
  Navigate: <GrNavigate />,
  NavigateArrow: <BiNavigation />,
  Newspaper: <BsNewspaper/>,
  Nurse: <FaUserNurse />,
  Person: <BsFillPersonFill/>, 
  PersonInBed: <GiPersonInBed />,
  QuestionMark: <FaQuestion />,
  RaisedHand: <GiPalm/>,
  Resources: <GrResources />,
  Search: <BsSearch />,
  Smile: <AiFillSmile />,
  Speaking: <MdRecordVoiceOver/>,
  Sthetoscope: <FaStethoscope />,
  Thermometer: <GiMedicalThermometer />,
  Twitter: <AiFillTwitterCircle />,
  Wheelchair: <FaAccessibleIcon />,
  Worker: <GrUserWorker/>,
  Vaccine: <TbVaccine />,
};

export default icons;
