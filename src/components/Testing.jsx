import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { BMP_USER } from './utils/Constants';
import loader from "../assets/image/loader.gif"
import CryptoJS from "crypto-js";
const secretKey = "mySecretKey123";
const Testing = () => {
  // https://bmp.leadplaner.com/auth?auth=CEcWAQAGFg5GXllRU19IGAoTFgocNBoMRlFWU1FDVF9HBgoVHS0PFzsCBklJW19aUUJXXVpDWBk=
  // CEcWAQAGFg5GXllRU19IGAoTFgocNBoMRlFWU1FDVF9HBgoVHS0PFzsCBklJW19aUENVUVlCWxk=
  const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [authValue, setAuthValue] = useState('');

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const authParam = params.get('auth');
      setAuthValue(authParam);
    }, []);
    console.log(authValue)
  
  var key = 'secret_jddkhksjhkasdhkshdkdkasd';
  var encryptedDataBase64 = authValue;
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
        // console.log(response);
        if (response.data.status === 1) {
          localStorage.setItem("org_id", data?.org_id);
          localStorage.setItem("role_name", data?.type?.toLowerCase());
          localStorage.setItem("academy_id", data?.parent_id);
          localStorage.setItem("id", data?.id);
          if (data?.type_id === 2) {
              const permissions = "/bmp,/bmp/academy,/bmp/academy/overview,/bmp/academy/fees,/bmp/academy/training,/bmp/academy/gallery,/bmp/academy/reviews,/bmp/academy/approval,/bmp/academy/leads,/bmp/academy/support";
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
          else if (data?.type_id === 3) {
            const permissions = "/bmp,/bmp/academy,/bmp/academy/overview,/bmp/academy/fees,/bmp/academy/training,/bmp/academy/gallery,/bmp/academy/reviews,/bmp/academy/approval,/bmp/academy/leads,/bmp/academy/support";
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
         else if (data?.type_id === 0) {
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
    localStorage.setItem("jwtToken", authValue);
    userData();
  }, [authValue])
  return (
    <>
    {isLoading ? (<img src={loader} alt="loading" />) : (<h2> loading </h2>)}
</>
  )
}

export default Testing