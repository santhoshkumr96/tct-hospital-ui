
import { errorHelper } from '../../Helpers/ajaxCatchBlockHelper';
import { useContext, useState } from 'react';
import Login from '../Login/Login';
import Context from '../Login/LoginAuthProvider/Context';
import ErrorContext from '../NetworkAuthProvider/ErrorContext';
import { SERVICE_BASE_URL, TOKEN_EXPIRED } from '../../config';
import { useEffect } from 'react';
import ajax from '../../Helpers/ajaxHelper';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import './AssociatePopulation.scss'
import { Row, Col , message} from 'antd';
import { Button, Fab } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


import { Query, Builder, Utils as QbUtils } from "react-awesome-query-builder";
// types
import {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps
} from "react-awesome-query-builder";

// For AntDesign widgets only:
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import "antd/dist/antd.css"; // or import "react-awesome-query-builder/css/antd.less";
// For Material-UI widgets only:
//import MaterialConfig from "react-awesome-query-builder/lib/config/material";

import "react-awesome-query-builder/lib/css/styles.css";
import "react-awesome-query-builder/lib/css/compact_styles.css"; //optional, for more compact styles
import { TextField } from '@material-ui/core';

// Choose your skin (ant/material/vanilla):
const InitialConfig = AntdConfig;


// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  fields: {
    District: {
      label: "District",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Taluk: {
      label: "Taluk",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Block: {
      label: "Block",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Panchayat: {
      label: "Panchayat",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Area_Code: {
      label: "Area_Code",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Village_Code: {
      label: "Village_Code",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Village: {
      label: "Village",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Street_Name: {
      label: "Street_Name",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Door_No: {
      label: "Door_No",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Respondent_Name: {
      label: "Respondent_Name",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Mobile_No: {
      label: "Mobile_No",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Is_SmartPhone: {
      label: "Is_SmartPhone",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Family_Caste: {
      label: "Family_Caste",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Sub_Caste: {
      label: "Sub_Caste",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Family_Id: {
      label: "Family_Id",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Date_of_Connection: {
      label: "Date_of_Connection",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Member_Name: {
      label: "Member_Name",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Gender: {
      label: "Gender",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Relationship_to_Head: {
      label: "Relationship_to_Head",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Date_of_Birth: {
      label: "Date_of_Birth",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Educational_Status: {
      label: "Educational_Status",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Marital_Status: {
      label: "Marital_Status",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Occupation: {
      label: "Occupation",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Is_Retired: {
      label: "Is_Retired",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    TMHId: {
      label: "TMHId",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Patient_Id: {
      label: "Patient_Id",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Is_Dead: {
      label: "Is_Dead",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Date_of_Death: {
      label: "Date_of_Death",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Status_of_House: {
      label: "Status_of_House",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Type_of_House: {
      label: "Type_of_House",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Number_of_various_Motor_vechicles_owned: {
      label: "Number_of_various_Motor_vechicles_owned",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Livestocks_Details: {
      label: "Livestocks_Details",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Toilet_Facility_at_Home: {
      label: "Toilet_Facility_at_Home",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Government_Insurance_Health_Insurance: {
      label: "Government_Insurance_Health_Insurance",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Private_Insurance_Health_Insurance: {
      label: "Private_Insurance_Health_Insurance",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Old_age_pension: {
      label: "Old_age_pension",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Widowed_Pension: {
      label: "Widowed_Pension",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Retirement_Pension: {
      label: "Retirement_Pension",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Other_Financial_Assisant_Schemes: {
      label: "Other_Financial_Assisant_Schemes",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Smoking_Member_s: {
      label: "Smoking_Member_s",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Alcohol_Member_s: {
      label: "Alcohol_Member_s",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Tabacco_Member_s: {
      label: "Tabacco_Member_s",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    For_Minor_Problems: {
      label: "For_Minor_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    For_Major_Problems: {
      label: "For_Major_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Provide_Details_of_Private_Doctors_Hospitals_Clinics_where_you_may_visit: {
      label: "Provide_Details_of_Private_Doctors_Hospitals_Clinics_where_you_may_visit",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    In_your_family_is_any_one_suffering_from_following_diseases: {
      label: "In_your_family_is_any_one_suffering_from_following_diseases",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Ortho: {
      label: "Ortho",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Anemia: {
      label: "Anemia",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Asthma: {
      label: "Asthma",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Blood_Pressure: {
      label: "Blood_Pressure",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Cold: {
      label: "Cold",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Cough: {
      label: "Cough",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Stress: {
      label: "Stress",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Diabetes: {
      label: "Diabetes",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    ENT_Infection: {
      label: "ENT_Infection",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Eye_Problem: {
      label: "Eye_Problem",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Fever: {
      label: "Fever",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Elephantiasis: {
      label: "Elephantiasis",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Gynaecological: {
      label: "Gynaecological",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Headache: {
      label: "Headache",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Jaundice: {
      label: "Jaundice",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Heart_Problems: {
      label: "Heart_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Pediatric: {
      label: "Pediatric",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Kidney_Problems: {
      label: "Kidney_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Malaria: {
      label: "Malaria",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Neuro: {
      label: "Neuro",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Lung: {
      label: "Lung",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Obesity_Cholesterol: {
      label: "Obesity_Cholesterol",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Skin_Problems: {
      label: "Skin_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Stomach_Problems: {
      label: "Stomach_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Toothache: {
      label: "Toothache",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    TB: {
      label: "TB",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Wounds: {
      label: "Wounds",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Thyroid: {
      label: "Thyroid",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Hernia: {
      label: "Hernia",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    ChickenPox: {
      label: "ChickenPox",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Cancer: {
      label: "Cancer",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Paralysis: {
      label: "Paralysis",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Others: {
      label: "Others",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Breast_Problems: {
      label: "Breast_Problems",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Uterus_Problmes: {
      label: "Uterus_Problmes",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Person_eligible_But_not_screened: {
      label: "Person_eligible_But_not_screened",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Breast_or_Uterus_Cancer: {
      label: "Breast_or_Uterus_Cancer",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    If_screened_where_have_they_been_screened: {
      label: "If_screened_where_have_they_been_screened",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Is_diagnosed_as_cancer: {
      label: "Is_diagnosed_as_cancer",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    If_yes_where_have_they_been_treated: {
      label: "If_yes_where_have_they_been_treated",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Family_Position_Numbers_of_any_mentally_retarded_persons: {
      label: "Family_Position_Numbers_of_any_mentally_retarded_persons",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Availed_Govt_benefits: {
      label: "Availed_Govt_benefits",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    What_sort_of_benefits: {
      label: "What_sort_of_benefits",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Are_those_with_mental_illness_taking_any_treatment: {
      label: "Are_those_with_mental_illness_taking_any_treatment",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Handicap_Person_Name: {
      label: "Handicap_Person_Name",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Handicap_Type: {
      label: "Handicap_Type",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Have_ID_card_for_physically_challenged_persons: {
      label: "Have_ID_card_for_physically_challenged_persons",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Whether_availed_Govt_benefits: {
      label: "Whether_availed_Govt_benefits",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    What_sort_of_govt_benefits: {
      label: "What_sort_of_govt_benefits",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    In_your_family_is_any_one_suffering_from_NCD_s: {
      label: "In_your_family_is_any_one_suffering_from_NCD_s",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    NCD_Diabetes: {
      label: "NCD_Diabetes",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    NCD_Blood_Pressure: {
      label: "NCD_Blood_Pressure",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Osteoporosis: {
      label: "Osteoporosis",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Uterus_Cancer: {
      label: "Uterus_Cancer",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Breast_Cancer: {
      label: "Breast_Cancer",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Oral_Cancer: {
      label: "Oral_Cancer",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Obesity: {
      label: "Obesity",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Heart_Diseases: {
      label: "Heart_Diseases",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Lung_Related_Diseases: {
      label: "Lung_Related_Diseases",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    NCD_Asthma: {
      label: "NCD_Asthma",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    JointPain: {
      label: "JointPain",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    NCD_Paralysis: {
      label: "NCD_Paralysis",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Alcoholic: {
      label: "Alcoholic",
      type: "text",
      excludeOperators: ["proximity"],
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Age: {
      label: "Age",
      type: "number",
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
    Area_Code: {
      label: "Area Code",
      type: "number",
      fieldSettings: {
        min: 0
      },
      valueSources: ["value"],
      preferWidgets: ["number"]
    },
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: "group" };



const AssociatePopulationSection = () => {

  const paginationDefaultData = {
    numberOfRows: 10,
    pageNumber: 0,
    sqlCondition : '',
    campaginId : undefined
  }

  const loginContext = useContext(Context);
  const errorContext = useContext(ErrorContext);
  const [popData, setPopData] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationDefaultData);
  const [campaginId , setCampaignId] = useState('');
  const [surveyName , setSurveyName] = useState('');
  const [popDataCount, setPopDataCount] = useState(0);
  const [updatePage, setUpdatePage] = useState(1);


  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  });

  const onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setState({ tree: immutableTree, config: config });

    const jsonTree = QbUtils.getTree(immutableTree);

    let temp = paginationData;
    temp.sqlCondition = QbUtils.sqlFormat(immutableTree, config);
    setPaginationData({...temp});
    // console.log(JSON.stringify(QbUtils.sqlFormat(immutableTree, config)));
   
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };

  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );


  const getData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
      .post(`${SERVICE_BASE_URL}v1/survey-data-pagination`, paginationData, config)
      .then((res) => {
        // console.log(res.data);
        setPopData(res.data);
      })
      .catch((e) => {
        if (errorHelper(e) == TOKEN_EXPIRED) {
          loginContext.setTokenExpired(true);
        } else {
          errorContext.setIsErrorDisplayed(true);
          errorContext.setError(errorHelper(e));
        }
      }
      );
  }
  const getDataCount = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
      .post(`${SERVICE_BASE_URL}v1/get-survey-count`, paginationData, config)
      .then((res) => {
        setPopDataCount(res.data);
      })
      .catch((e) => {
        if (errorHelper(e) == TOKEN_EXPIRED) {
          loginContext.setTokenExpired(true);
        } else {
          errorContext.setIsErrorDisplayed(true);
          errorContext.setError(errorHelper(e));
        }
      }
      );
  }

  const downloadCsv = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    ajax
      .post(`${SERVICE_BASE_URL}v1/survey-download`, paginationData, config)
      .then((res) => {
          console.log(res.data)
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'tct_population_assocaiton.csv'); //or any other extension
          document.body.appendChild(link);
          link.click();
      })
      .catch((e) => {
        if (errorHelper(e) == TOKEN_EXPIRED) {
          loginContext.setTokenExpired(true);
        } else {
          errorContext.setIsErrorDisplayed(true);
          errorContext.setError(errorHelper(e));
        }
      }
      );
  }

  const setCampaignIdToPopulationCall = async () => {
    const config = {
      headers: { Authorization: `Bearer ${loginContext.accessToken}` }
    };
    const tempData = {...paginationData}
    tempData.campaignId = campaginId
    tempData.surveyName = surveyName
    ajax
      .post(`${SERVICE_BASE_URL}v1/set-survey-population-campaign`, tempData, config)
      .then((res) => {
        setUpdatePage(updatePage+1)
        message.success('survey opened')
      })
      .catch((e) => {
        if (errorHelper(e) == TOKEN_EXPIRED) {
          loginContext.setTokenExpired(true);
        } else {
          errorContext.setIsErrorDisplayed(true);
          errorContext.setError(errorHelper(e));
        }
      }
      );
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let temp = paginationData;
    paginationData.pageNumber = newPage;
    setPaginationData({ ...temp });
    // getData();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    let temp = paginationData;
    paginationData.pageNumber = 0;
    paginationData.numberOfRows = (+event.target.value);
    setPaginationData({ ...temp });
    // getData();
  };

  const checkNullOrUndefined = (data) => {
    return (data[0]) ? data[0] : [];
  }

  const downloadFile = () => {
    downloadCsv();
  }

  const setCampaignIdToPopulation = () =>{
    if(paginationData.sqlCondition == '' || paginationData.sqlCondition == undefined){
      message.warn('filter something')
      return
    }
    if(campaginId == '' || campaginId == undefined){
      message.warn('add campaign id')
      return
    }
    if(surveyName == '' || surveyName == undefined){
      message.warn('add survey name')
      return
    }
    setCampaignIdToPopulationCall()

  }

  useEffect(() => {
    getData();
    getDataCount();
  }, [paginationData])

  useEffect(() => {
    setCampaignId('')
    setSurveyName('')
    getData();
    getDataCount();
  }, [updatePage])

  return (

    <div className="query-builder-parent-wrapper">

      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result">
        {/* <div>
          Query string:{" "}
          <pre>
            {JSON.stringify(QbUtils.queryString(state.tree, state.config))}
          </pre>
        </div> */}
        {/* <div>
          MongoDb query:{" "}
          <pre>
            {JSON.stringify(QbUtils.mongodbFormat(state.tree, state.config))}
          </pre>
        </div> */}
        {/* <div>
          SQL where:{" "}
          <pre>
            {JSON.stringify(QbUtils.sqlFormat(state.tree, state.config))}
          </pre>
        </div> */}
        {/* <div>
          JsonLogic:{" "}
          <pre>
            {JSON.stringify(QbUtils.jsonLogicFormat(state.tree, state.config))}
          </pre>
        </div> */}
      </div>

        <br/>
      <Row>
        <Col span={20}>
        <TextField
                    style={{ marginRight: '20px' }}
                    error={false}
                    id="standard-basic"
                    label="Enter Survey Name"
                    value={surveyName}
                    variant="outlined"
                    onChange={(e) => {setSurveyName(e.target.value)}}
          />

        
        <TextField
                    error={false}
                    id="standard-basic"
                    label="Enter Campagin Id"
                    value={campaginId}
                    variant="outlined"
                    onChange={(e) => {setCampaignId(e.target.value)}}
          />

          <Button style={{ marginLeft: '20px' }} variant="contained" onClick={() => { setCampaignIdToPopulation() }}>
                SUBMIT
          </Button>
        </Col>
       
      </Row>

      <br/>
      <Paper>
        <Row>
        <Col span={14}>
            <TablePagination
              className="pagnation-div"
              rowsPerPageOptions={[10, 25, 100, 1000]}
              component="div"
              count={popDataCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Col>
          <Col span={10}>
        
            <Button   
            className="download-csv" 
            style={{ marginRight: '20px' , float :'right' }} 
            variant="contained" 
            onClick = {()=> {downloadFile()}}
            >
              <CloudDownloadIcon/>
            </Button>
          </Col>


        </Row>
        <TableContainer >
          <Table sx={{ minWidth: 800 }} stickyHeader aria-label="sticky table">
            <TableHead id='question-table-head'>
              <TableRow>
                {((popData) !== null) && ((popData) !== undefined) && (popData).length > 0 &&
                  Object.keys(checkNullOrUndefined((popData))).map((e, i) => (
                    <TableCell id='question-table-header' key={i} align="left">{_.startCase(e)}</TableCell>
                  ))
                }
              </TableRow>
            </TableHead>

            <TableBody>
              {((popData) !== null) && ((popData) !== undefined) && (popData).length > 0 &&
                (popData).map((row, index) => (
                  <TableRow

                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {popData.length > 0 &&
                      Object.values(row).map((e, i) => (
                        <TableCell key={i} align="left">{e}</TableCell>
                      ))
                    }

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </div>

  )
}

export default AssociatePopulationSection;