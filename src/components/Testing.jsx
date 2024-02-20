import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { BMP_USER } from './utils/Constants';
import loader from "../assets/image/loader.gif"
import CryptoJS from "crypto-js";
const secretKey = "mySecretKey123";
const Testing = () => {
  const { auth } = useParams();
  const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  var key = 'secret_jddkhksjhkasdhkshdkdkasd';
  const cleanedAuth = auth.replace('auth=', '');
  var encryptedDataBase64 = cleanedAuth;
  var encryptedData = atob(encryptedDataBase64);
  var decryptedData = '';
  for (var i = 0; i < encryptedData.length; i++) {
    decryptedData += String.fromCharCode(encryptedData.charCodeAt(i) - key.charCodeAt(i % key.length));
  }
  console.log(decryptedData);
  const userData = () => {
    axios.post(BMP_USER, {}, {
      headers: {
        Authorization: `Bearer ${encryptedDataBase64}`,
      },
    })
      .then((response) => {
        const data = response?.data?.user;
        console.log(response);
        if (response.data.status === 1) {
          localStorage.setItem("org_id", data?.org_id);
          let role = data?.type?.toLowerCase()
          localStorage.setItem("role_name", data?.type?.toLowerCase());
          localStorage.setItem("academy_id", data?.parent_id);
          localStorage.setItem("id", data?.id);
          if (data?.type_id === 2) {
              const permissions = "/bmp,/bmp/academy,/bmp/academy/overview,/bmp/academy/fees,/bmp/academy/training,/bmp/academy/gallery,/bmp/academy/reviews,/bmp/academy/approval,/bmp/academy/leads,/bmp/academy/support,/bmp/settings,/bmp/settings/review/view,/bmp/settings/blog/add,/bmp/settings/blog/view,/bmp/settings/tournament/add,/bmp/settings/tournament/view";
              const userPath = permissions.split(",");
              const userPathTot = userPath.join(",");
              const encryptedUserPathTot = CryptoJS.AES.encrypt(
                  userPathTot,
                  secretKey
              ).toString();
              localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
              localStorage.setItem("landingUrl", "/bmp/academy/overview");
              navigate("/bmp/academy/overview");
          }
          else if (role === "player") {
              const permissions = "/bmp,/bmp/academy,/bmp/academy/overview,/bmp/academy/fees,/bmp/academy/training,/bmp/academy/gallery,/bmp/academy/reviews,/bmp/academy/approval,/bmp/academy/leads,/bmp/academy/support,/bmp/settings,/bmp/settings/review/view,/bmp/settings/blog/add,/bmp/settings/blog/view,/bmp/settings/tournament/add,/bmp/settings/tournament/view";
              const userPath = permissions.split(",");
              const userPathTot = userPath.join(",");
              const encryptedUserPathTot = CryptoJS.AES.encrypt(
                  userPathTot,
                  secretKey
              ).toString();
              localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
              localStorage.setItem("landingUrl", "/bmp/academy/overview");
              navigate("/bmp/academy/overview");
          }
          else if (role === "academy_admin") {
              const permissions = "/bmp,/bmp/admin,/bmp/academy,/bmp/academy/overview,/bmp/academy/fees,/bmp/academy/training,/bmp/academy/gallery,/bmp/academy/reviews,/bmp/academy/approval,/bmp/academy/leads,/bmp/academy/support,/bmp/settings,/bmp/settings/review/view,/bmp/settings/tournament/add,/bmp/settings/tournament/view";
              const userPath = permissions.split(",");
              const userPathTot = userPath.join(",");
              const encryptedUserPathTot = CryptoJS.AES.encrypt(
                  userPathTot,
                  secretKey
              ).toString();
              localStorage.setItem("encryptedUserPathTot", encryptedUserPathTot);
              localStorage.setItem("landingUrl", "/bmp/admin");
              navigate("/bmp/admin");
          }
          setIsLoading(false);
      }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    localStorage.setItem("jwtToken", cleanedAuth);
    userData();
  }, [cleanedAuth])
  return (
    <>
    {isLoading ? (<img src={loader} alt="loading" />) : (<h2> loading </h2>)}
</>
  )
}

export default Testing