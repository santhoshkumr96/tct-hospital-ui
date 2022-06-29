//URL CONFIG
export const BASE_PATH='';

export const HOME_PATH=`${BASE_PATH}/`;
export const LOGIN_PATH =`${BASE_PATH}/login`;
export const SURVEY_PATH =`*/survey`;

export const SERVICE_BASE_URL='http://localhost:8080/api/';
// export const SERVICE_BASE_URL='http://tctmh.eastus.cloudapp.azure.com:8080/tctcampaign/api/';

export const LOGIN_URL=`/v1/auth/login`;

//TOKEN and ERROR HANDLER CONFIG
export const TOKEN_EXPIRED='Token Expired';


//ROLE EXTENDED CONFIG
export const QUESTION_CREATOR_ROLE='ROLE_USER';
export const QUESTION_APPROVER_ROLE='ROLE_ADMIN';
export const CAMPAIN_CREATOR_ROLE='ROLE_USER';
export const CAMPAIN_APPROVER_ROLE='ROLE_ADMIN';
export const POPULATION_ASSOCIATION_ROLE='ROLE_ADMIN';
export const ROLE_ADMIN='ROLE_ADMIN';
export const ROLE_USER='ROLE_USER';
export const ROLE_SURVEYOR='ROLE_SURVEYOR';
//section names
export const CAMPAIGNS_SECTION = 'Campaigns'  ;
export const QUESTIONNAIRE_SECTION = 'Questionnaire';
export const POPULATION_SECTION = 'Population';
export const ADD_USER_SECTION = 'AddUser';
export const ADD_QUESTION_CATEGORY_SECTION = 'AddQuestionCategory';
export const SURVEY_SECTION = 'SurveySection';

//question type
export const QUESTION_TYPE_TEXT = 'text';
export const QUESTION_TYPE_TEXTBOX = 'TEXTBOX';
export const QUESTION_TYPE_RADIO = 'radio';
export const QUESTION_TYPE_DROPDOWN = 'dropdown';
export const QUESTION_TYPE_CHECKBOX = 'checkbox';
export const QUESTION_TYPE_DATE = 'date';

//approve and reject 
export const PENDING = 'PENDING'
export const APPROVE = 'APPROVED';
export const REJECT = 'REJECTED';
export const DELETED = 'DELETED';
export const CLOSED = 'CLOSED';