import CryptoJS from "crypto-js";
const secretKey = "mySecretKey123";
const landingUrl = localStorage.getItem("landingUrl");
const getDecryptedToken = () => {
  const encryptedToken = localStorage.getItem("jwtToken");
  if (encryptedToken) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
  return "";
};
export { getDecryptedToken };

const getDecryptedUserPath = () => {
  const encryptedUserPathTot = localStorage.getItem("encryptedUserPathTot");
  if (encryptedUserPathTot) {
    // Decrypt the userPathTot
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedUserPathTot,
      secretKey
    );
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
  return "";
};
export { getDecryptedUserPath };

//=============================================================logout function
export const handleLogout = () => {
  if (landingUrl === "/bmp/academy/overview" || landingUrl === "/bmp/admin") {
    localStorage.clear();
    window.location.href = "https://www.bookmyplayer.com/profile/logout";
  } else {
    localStorage.clear();
    window.location.href = "https://core.leadplaner.com/login";
  }
};
//=============================================================config
export const config = {
  bucketName: "bmpcdn",
  region: "ap-south-1",
  dirName: "test/17",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};
// =============================================================apis used
const start = "https://bmp.leadplaner.com/api/api";
// const start = "http://localhost:4000/api";
const userId = localStorage.getItem("id");
export const BMP_USER = start + "/bmp/getUser";
//==============================================================blog apis
export const BLOG_ADD = start + "/blog/add";
export const BLOG_EDIT = start + "/blog/edit/";
export const BLOG_GET = start + "/blog/get";
export const BLOG_GETID = start + "/blog/get/";
export const GET_TAG = start + "/blog/tag/getall";
export const GET_TAG_CATEGORY = start + "/blog/tag/getcategories/";
export const GET_TAG_BY_SITE = start + "/blog/tag/getbysite/";
export const SEC_GET = start + "/blog/section/getbyblog/";
export const SEC_UPDATE = start + "/blog/section/update/";
export const SEC_ADD = start + "/blog/section/add/";
//===================================================================leadplaner
export const UPDATE_TEAM_MEM = start + "/user/updateteammember/";
export const GET_PASSWORD = start + "/setting/password/get";
//========================================================================COMPANY settings
export const ADD_TICKET = start + "/bmp/ticket/raise";
export const UPDATE_TICKET = start + "/user/ticket/update/";
export const GET_SERVICE = start + "/bmp/ticket/getmytickets/";
export const GET_ALL_SEARCH = start + "/user/help/searchquestion";
//============================================================bmp apis
export const GET_ACADEMY = start + "/bmp/academy/get";
export const ADDRESS_API = start + "/bmp/academy/getaddressbyquery";
export const UPDATE_ACADEMY_TABLE2 = start + "/bmp/academy/addupdaterequest";
export const UPDATE_ACADEMY = start + "/bmp/academy/update/";
export const ADD_BATCH = start + "/bmp/batch/add";
export const GET_BATCH = start + "/bmp/batch/get";
export const UPDATE_BATCH = start + "/bmp/batch/update/";
export const GET_ALL_REVIEW = start + "/bmp/academy/getreviews";
export const GET_REVIEW_REPLY = start + "/bmp/academy/getreviewreply";
export const GET_ACC_REVIEW = start + "/bmp/academy/getreviewreport";
export const GET_ACC_LEAD = start + "/bmp/academy/leads/get/";
export const ADD_REPLY = start + "/bmp/academy/review/reply";
export const RESTRICTED_KEYWORDS = start + "/bmp/getrestrictedkeywords";
export const GET_ACADEMY_STATUS = start + "/bmp/academy/getall";
export const GET_APPROVAL = start + "/bmp/academy/getrequesthistory";
export const UPDATE_ACADMEY_STATUS = start + "/bmp/academy/updateupdatedinfo/";
export const GET_UPDATED_ACADEMY_INFO = start + "/bmp/academy/getupdatedinfo";
//==============================================================bmp reviews
export const BMP_ACADEMY_ALL_REVIEWS = start + "/bmp/academy/getreviewsbytype";
export const UPDATE_ACADEMY_REVIEW = start + "/bmp/academy/review/update/";

//===============================================================league apis
export const GET_ALL_LEAGUE = start + "/bmp/league/getall";
export const ADD_LEAGUE = start + "/bmp/league/add";
export const GET_LEAGUE_BY_ID = start + "/bmp/league/get/";
export const UPDATE_LEAGUE = start + "/bmp/league/update/";

//=====================================================================lead review
export const GET_ALL_LEADS = start + "/ezuka/leads/get-all";
