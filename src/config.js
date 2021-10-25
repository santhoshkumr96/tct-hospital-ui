//URL CONFIG
export const BASE_PATH='';

export const HOME_PATH=`${BASE_PATH}/`;
export const LOGIN_PATH =`${BASE_PATH}/login`;

// export const SERVICE_BASE_URL='http://localhost:8080/api/';
export const SERVICE_BASE_URL='https://45db-103-139-34-238.ngrok.io/api/';

export const LOGIN_URL=`/v1/auth/login`;

//TOKEN and ERROR HANDLER CONFIG
export const TOKEN_EXPIRED='Token Expired';


//ROLE EXTENDED CONFIG
export const QUESTION_CREATOR_ROLE='ROLE_USER';
export const QUESTION_APPROVER_ROLE='ROLE_ADMIN';
export const CAMPAIN_CREATOR_ROLE='ROLE_USER';
export const CAMPAIN_APPROVER_ROLE='ROLE_ADMIN';
export const POPULATION_ASSOCIATION_ROLE='ROLE_ADMIN';

//section names
export const CAMPAIGNS_SECTION = 'Campaigns'  ;
export const QUESTIONNAIRE_SECTION = 'Questionnaire';
export const POPULATION_SECTION = 'Population';


//question type
export const QUESTION_TYPE_TEXT = 'text';
export const QUESTION_TYPE_RADIO = 'radio';
export const QUESTION_TYPE_DROPDOWN = 'dropdown';


//approve and reject 
export const PENDING = 'PENDING'
export const APPROVE = 'APPROVED';
export const REJECT = 'REJECTED';