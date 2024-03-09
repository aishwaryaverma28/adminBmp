import React, { useState, useRef, useEffect } from "react";
import "../styles/bmp.css";
import Map from "../../assets/image/map.png";
import Whatsapp from "../../assets/image/whatsapp.svg";
import "chart.js/auto";
import axios from "axios";
import {
  GET_ACADEMY,
  UPDATE_ACADEMY_TABLE2,
  GET_UPDATED_ACADEMY_INFO,
  // RESTRICTED_KEYWORDS,
  // ADDRESS_API,
  // getDecryptedToken,
} from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "./ProgressBar";
import Dash from "../../assets/image/red-dash.svg";
import Dash2 from "../../assets/image/dash2.svg";
import { splitAddress } from "./splitAddress";
import { removeHtmlTags } from "./removeHtml";
import { default_about } from "../utils/bmp_about";

const BmpOverview = () => {
  const decryptedToken = localStorage.getItem("jwtToken");
  const academyId = localStorage.getItem("academy_id");
  const role_name = localStorage.getItem("role_name");
  const [status, setStatus] = useState(null);
  const [newAcadmeyData, setNewAcadmeyData] = useState(null);
  const [introduction, setIntroduction] = useState("");
  const [academyData, setAcademyData] = useState({});
  const [phoneNumberCount, setPhoneNumberCount] = useState(1);
  const [academyDataOld, setAcademyDataOld] = useState({});
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isWhatsappActivated, setIsWhatsappActivated] = useState(true);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [stateBtn, setStateBtn] = useState(0);
  const [selectedDaysString, setSelectedDaysString] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [updatedFields, setUpdatedFields] = useState([]);
  const [progress, setProgress] = useState(null);
  const [progressArray, setProgressArray] = useState([]);
  const [selectedLanguageName, setSelectedLanguageName] = useState("");
  const [mappedLanguages, setMappedLanguages] = useState([]);
  const [languageString, setLanguageString] = useState("");
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [number4, setNumber4] = useState(0);
  let joinLanguage;
  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const languages = [
    { value: "Hindi", label: "Hindi" },
    { value: "English", label: "English" },
    { value: "Telugu", label: "Telugu" },
    { value: "Kannada", label: "Kannada" },
    { value: "Tamil", label: "Tamil" },
    { value: "Marathi", label: "Marathi" },
    { value: "Bengali", label: "Bengali" },
    { value: "Urdu", label: "Urdu" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Malayalam", label: "Malayalam" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Odia", label: "Odia" },
    { value: "Sindhi", label: "Sindhi" },
    { value: "Bhojpuri", label: "Bhojpuri" },
    { value: "Russian", label: "Russian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Italian", label: "Italian" },
    { value: "Japanese", label: "Japanese" },
    { value: "Korean", label: "Korean" },
    { value: "Portuguese", label: "Portuguese" },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mapLink, setMapLink] = useState("");
  const [coordinate, setCoordinate] = useState("");
  const [result, setResult] = useState({});
  const [keywords, setKeywords] = useState([
    "murder",
    "kill",
    "killer",
    "kill you",
    "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
  ]);
  const updatedAcadmeyInfo = () => {
    axios
      .post(
        GET_UPDATED_ACADEMY_INFO,
        {
          academy_id: academyId,
        }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      }
      )
      .then((response) => {
        const statusValue = response?.data?.data[0]?.status;
        setStatus(statusValue);

        const rawData = response?.data?.data[0];
        const filteredData = Object.fromEntries(
          Object.entries(rawData).filter(
            ([key, value]) =>
              value !== null &&
              ![
                "creation_date",
                "update_date",
                "status",
                "id",
                "academy_id",
              ].includes(key)
          )
        );
        setNewAcadmeyData(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //=====================================================================language changes
  const handlelanguageNameChange = (e) => {
    setSelectedLanguageName(e.target.value);
    setStateBtn(1);
    updateField("spoken_languages");
    if (e.target.value) {
      const newLanguage = {
        language: e.target.value
      };
      setMappedLanguages([...mappedLanguages, newLanguage]);
      const languageString = mappedLanguages
        .concat(newLanguage)
        .map((lang) => `${lang.language}`)
        .join(", ");
      setLanguageString(languageString);
    }
  };

  const handleDeleteLanguage = (index) => {
    setStateBtn(1);
    const updatedLanguages = [...mappedLanguages];
    const newArr = [
      ...updatedLanguages.slice(0, index),
      ...updatedLanguages.slice(index + 1),
    ];
    if (newArr.length === 0) {
      setNumber(1);
    } else {
      setNumber(0);
    }
    setMappedLanguages([...newArr]);

    joinLanguage = newArr
      .map((lang) => `${lang.language}`)
      .join(", ");
    setLanguageString(joinLanguage);
  };
    //===============================================================================google map changes
  const handleInputChange = async (value) => {
    setAddress(value);
    setStateBtn(1);
    try {
      const response = await axios.get(`https://www.zomato.com/webroutes/location/search?q=${value}`);
      // console.log(response?.data?.locationSuggestions);
      if (response?.status === 200) {
        setSuggestions(response?.data?.locationSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
    }
  };
  const handleSelectAddress = (selectedAddress) => {
    let add = splitAddress(selectedAddress)
    setResult(add);
    setAddress(selectedAddress?.entity_name);
    if (selectedAddress?.length === 0) {
      setNumber2(1);
    } else {
      setNumber2(0);
    }
    setStateBtn(1);
    setCoordinate(`${selectedAddress?.entity_latitude},${selectedAddress?.entity_longitude}`);
    if (`${selectedAddress?.entity_latitude},${selectedAddress?.entity_longitude}`.length === 0) {
      setNumber4(1);
    } else {
      setNumber4(0);
    }
    setMapLink(
      `https://www.google.com/maps?q=${selectedAddress?.entity_latitude},${selectedAddress?.entity_longitude}`
    );
    if (mapLink.length === 0) {
      setNumber3(1);
    } else {
      setNumber3(0);
    }
    setSuggestions([]);

  };

  const updateField = (fieldName) => {
    if (!updatedFields.includes(fieldName)) {
      setUpdatedFields([...updatedFields, fieldName]);
    }
  };

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsWhatsappActivated(checked);

    if (checked) {
      setPhoneNumberCount(1);
      setIsButtonVisible(true);
    }
  };
  //=======================================================timing

  const academyDetails = () => {
    axios
      .post(GET_ACADEMY, { academy_id: academyId }, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      }
      )
      .then((response) => {
        if (response?.data?.data && response?.data?.data?.length !== 0) {
          localStorage.setItem("url", response?.data?.data[0]?.url);
          const sport = response?.data?.data[0]?.sport;
          const academyName = response?.data?.data[0]?.name;
          const cityName = response?.data?.data[0]?.city;
          const academyObject = default_about?.find(obj => obj.sport === sport);
          const updatedAbout = academyObject?.about?.replace(/ACADEMY_NAME/g, academyName);
          const finalAbout = updatedAbout?.replace(/CITY_NAME/g, cityName);
          const intro = removeHtmlTags(finalAbout);
          setIntroduction(intro);
          if (sport === null || sport === "")
            setIntroduction("-")
          const addressComponents = [
            response?.data?.data[0]?.address1,
            response?.data?.data[0]?.address2,
            response?.data?.data[0]?.city,
            response?.data?.data[0]?.state,
          ];
          const formattedAddress = addressComponents
            .filter((component) => component && component.trim() !== "")
            .join(", ");
          setAcademyData(response?.data?.data[0]);
          setAcademyDataOld(response?.data?.data[0]);
          setAddress(formattedAddress || "");
          setCoordinate(response?.data?.data[0]?.coordinate || "");
          setMapLink(response?.data?.data[0]?.map || "");
          setSelectedLanguage(response?.data?.data[0]?.spoken_languages);
          setProgress(response?.data?.data[0]?.completion_percentage);
          if (
            response?.data?.data[0]?.completion_percentage !== "" &&
            response?.data?.data[0]?.completion_percentage !== null
          ) {
            setProgressArray(
              response?.data?.data[0]?.completion_percentage.split(",")
            );
          }
          if (response?.data?.data[0]?.spoken_languages === null) {
            setMappedLanguages([
              {
                language: "Hindi"
              },
              {
                language: "English"
              },
            ]);
          } else {
            const languages = response?.data?.data[0]?.spoken_languages.split(", ");

            const newLanguage = languages.map((lang) => {
              const [language] = lang.split(",");
              return {
                language: language.trim()
              };
            });

            setMappedLanguages([...newLanguage]);
          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    academyDetails();
    updatedAcadmeyInfo();
  }, []);
  useEffect(() => {
    progressArray?.push("1");
  }, [academyData])

  const processImageName = (imageName) => {
    const nameParts = imageName.split(".");
    if (nameParts.length > 1) {
      const namePart = nameParts.slice(0, -1).join(".");
      const processedName = namePart.replace(/[^\w-]/g, "-");
      return `${processedName}.${nameParts[nameParts.length - 1]}`;
    } else {
      return imageName.replace(/[^\w-]/g, "-");
    }
  };

  const handleFileChange = (event) => {
    setStateBtn(1);
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      if (!allowedImageTypes.includes(selectedImage.type)) {
        alert("Please choose a valid image file (JPEG, PNG, GIF).");
        return;
      }
      submitImage(event.target.files[0]);
    }
  };
  const submitImage = (file) => {
    const selectedImage = file;
    if (selectedImage) {
      if (selectedImage.size > 2 * 1024 * 1024) {
        alert(
          "Image size should be less than 2MB. Please choose a smaller image."
        );
        return;
      }
      const folder = "bookmyplayer/academy/" + academyId;
      const imageNameWithoutExtension = selectedImage.name.replace(
        /\.[^/.]+$/,
        ""
      );
      const sanitizedImageName = imageNameWithoutExtension.replace(
        /[^\w-]/g,
        "-"
      );
      const uniqueFileName = `${folder}/${sanitizedImageName}`;
      const data = new FormData();
      data.append("file", selectedImage);
      data.append("upload_preset", "zbxquqvw");
      data.append("cloud_name", "cloud2cdn");
      data.append("public_id", uniqueFileName);
      setIsUploading(true);
      fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedFile(selectedImage);
          updateField("logo");
          setFileName(processImageName(selectedImage.name));
          if (processImageName(selectedImage.name).length === 0) {
            setNumber1(1);
          } else {
            setNumber1(0);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsUploading(false);
        });
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    let redText = false;
    let disableSaveButton = false;
    const words = value.split(" ");
    let textRestrict = "";
    words.forEach((word) => {
      if (keywords.includes(word?.toLowerCase())) {
        textRestrict = word;
        redText = true;
        disableSaveButton = true;
      }
    });
    if (redText) {
      alert(`Warning: The word "${textRestrict}" is a restricted keyword.`);
      event.target.style.color = "red";
    } else {
      event.target.style.color = "";
    }
    if (academyData[name] !== value) {
      setStateBtn(disableSaveButton ? 0 : 1);
      updateField(name);
    }
    setAcademyData({ ...academyData, [name]: value });
  }

  const handleDayClick = (day) => {
    setStateBtn(1);
    setSelectedDays(day);
    // if (selectedDays?.includes(day)) {
    //   setSelectedDays(
    //     selectedDays.filter((selectedDay) => selectedDay !== day)
    //   );
    //   updateField("sport");
    // } else {
    //   setSelectedDays([...selectedDays, day]);
    //   updateField("sport");
    // }
  };

  // useEffect(() => {
  //   setSelectedDaysString(selectedDays.join(","));
  // }, [selectedDays]);

  useEffect(() => {
    setSelectedDays(academyData?.sport || []);
  }, [academyData]);

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };


  const addPhoneNumberInput = () => {
    setIsWhatsappActivated(false);
    setPhoneNumberCount(phoneNumberCount + 1);
    setIsButtonVisible(false);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const filteredProgressArray = progressArray.filter(value => value !== "1");
    if (!filteredProgressArray?.includes("1")) {
      filteredProgressArray.push("1");
      setProgressArray(filteredProgressArray);
    }
    const combinedProgress = filteredProgressArray.join(",");
    const sportsChanged =
      selectedDays !== academyData?.sport;

    const spokenLanguagesChanged =
      languageString !== academyData?.spoken_languages;

    const addressComponents = [
      academyData?.address1,
      academyData?.address2,
      academyData?.city,
      academyData?.state,
    ];
    const formattedAddress = addressComponents
      .filter((component) => component && component.trim() !== "")
      .join(", ");
    const addressChanged = address !== formattedAddress;
    const maplinkChanged = mapLink !== academyData?.map;
    const coordinateChanged = coordinate !== academyData?.coordinate;
    const logoChanged = fileName !== academyData?.fileName;

    const progressChanged = combinedProgress !== academyData?.completion_percentage;
    const updatedFormData = {};
    const hasChanged = (field) =>
      academyData?.[field] !== academyDataOld?.[field];

    if (hasChanged("name")) {
      updatedFormData.name = academyData.name;
    }
    if (hasChanged("about")) {
      updatedFormData.about = academyData.about;
    }

    if (hasChanged("phone")) {
      updatedFormData.phone = academyData.phone;
    }

    if (hasChanged("whatsapp")) {
      updatedFormData.whatsapp = academyData.whatsapp;
    }

    if (hasChanged("experience")) {
      updatedFormData.experience = academyData.experience;
    }

    if (hasChanged("facebook")) {
      updatedFormData.facebook = academyData.facebook;
    }

    if (hasChanged("instagram")) {
      updatedFormData.instagram = academyData.instagram;
    }

    if (hasChanged("website")) {
      updatedFormData.website = academyData.website;
    }

    if (hasChanged("email")) {
      updatedFormData.email = academyData.email;
    }

    if (hasChanged("timing")) {
      updatedFormData.timing = academyData.timing;
    }

    if (spokenLanguagesChanged && languageString !== "") {
      updatedFormData.spoken_languages = languageString;
    }

    if (number === 1) {
      updatedFormData.spoken_languages = languageString;
    }

    if (sportsChanged) {
      updatedFormData.sport = selectedDays;
    }
    if (logoChanged && fileName !== "") {
      updatedFormData.logo = fileName;
    }

    if (progressChanged && combinedProgress !== "") {
      updatedFormData.completion_percentage = combinedProgress;
    }

    if (number1 === 1) {
      updatedFormData.logo = fileName;
    }

    if (addressChanged && address !== "") {
      updatedFormData.address1 = result?.address1;
      updatedFormData.address2 = result?.address2;
      updatedFormData.city = result?.city;
      updatedFormData.state = result?.state;
    }
    if (maplinkChanged && mapLink !== "") {
      updatedFormData.map = mapLink;
    }
    if (coordinateChanged && coordinate !== "") {
      updatedFormData.coordinate = coordinate;
    }

    if (number2 === 1) {
      updatedFormData.address1 = address;
    }
    if (number3 === 1) {
      updatedFormData.map = mapLink;
    }
    if (number4 === 1) {
      updatedFormData.coordinate = coordinate;
    }

    updatedFormData.academy_id = academyId;

    if (newAcadmeyData !== null) {
      Object.keys(newAcadmeyData).forEach((key) => {
        if (!updatedFormData.hasOwnProperty(key)) {
          updatedFormData[key] = newAcadmeyData[key];
        }
      });
    }

    axios
      .post(UPDATE_ACADEMY_TABLE2, updatedFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      }
      )
      .then((response) => {
        if (response.data.status === 1) {
          toast.success("Details updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error("Some Error Occurred", {
            position: "top-center",
            autoClose: 2000,
          });
        }
        academyDetails();
        updatedAcadmeyInfo();
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setStateBtn(0);
      });
  }
  return (
    <>
      <div className="bmp-container">
        <div>
          <p className="common-fonts bmp-top">Address & Contact details</p>

          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              <span>{role_name}</span> name
            </label>
            <input
              type="text"
              className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                }`}
              name="name"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.name || ""}
              disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
            />
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Introduction
            </label>
            <textarea
              name="about"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.about === null ? introduction : academyData?.about}
              id=""
              className={`common-fonts bmp-textarea ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                }`}
              rows="2"
              disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
            ></textarea>
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Address
            </label>
            <div className="relativeInput">
              <input
                type="text"
                value={address}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type your address..."
                className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                  }`}
                disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
              />
              {suggestions?.length > 0 && address?.length !== 0 && (
                <div className="autocomplete-dropdown">
                  {suggestions.map((address) => (
                    <div
                      key={address?.entity_latitude}
                      onClick={() => handleSelectAddress(address)}
                    >
                      {address?.entity_name}
                    </div>
                  ))}
                </div>
              )}
              {/* {address && (
                <div>
                  <p>Selected Address: {address}</p>
                  <p>
                    Selected Coordinates: {coordinate}
                  </p>
                  <p>
                    Google Map Link:{' '}
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">
                      {mapLink}
                    </a>
                  </p>
                </div>
              )} */}
            </div>
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Select your sport
            </label>
            <div className="bmp-games">
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("archery") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("archery")}
              >
                Archery
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("arts") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("arts")}
              >
                Arts
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("atheletics") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("atheletics")}
              >
                Atheletics
              </div>

              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("badminton") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("badminton")}
              >
                Badminton
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("basketball") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("basketball")}
              >
                Basketball
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("billiards") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("billiards")}
              >
                Billiards
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("bodybuilding") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("bodybuilding")}
              >
                Bodybuilding
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("boxing") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("boxing")}
              >
                Boxing
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("chess") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("chess")}
              >
                Chess
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("cricket") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("cricket")}
              >
                Cricket
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("fencing") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("fencing")}
              >
                fencing
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("football") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("football")}
              >
                football
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("golf") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("golf")}
              >
                golf
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("hockey") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("hockey")}
              >
                hockey
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("kabaddi") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("kabaddi")}
              >
                Kabaddi
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("karate") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("karate")}
              >
                karate
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("kho-kho") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("kho-kho")}
              >
                kho-kho
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("mma") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("mma")}
              >
                MMA
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("motor sports") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("motor sports")}
              >
                Motor sports
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("rugby") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("rugby")}
              >
                Rugby
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("shooting") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("shooting")}
              >
                Shooting
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("skating") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("skating")}
              >
                Skating
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("sports") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("sports")}
              >
                Sports
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("squash") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("squash")}
              >
                Squash
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("swimming") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("swimming")}
              >
                Swimming
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("table-tennis") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("table-tennis")}
              >
                Table-tennis
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("taekwondo") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("taekwondo")}
              >
                Taekwondo
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("tennis") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("tennis")}
              >
                Tennis
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("volleyball") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("volleyball")}
              >
                Volleyball
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("wrestling") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("wrestling")}
              >
                Wrestling
              </div>
              <div
                className={`common-fonts bmp-game-list ${selectedDays?.includes("yoga") &&
                  !(status === 0 && (role_name === 'academy' || role_name === 'player'))
                  ? "bmp-game-active"
                  : ""
                  } ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""}`}
                onClick={() => handleDayClick("yoga")}
              >
                Yoga
              </div>
            </div>
          </div>
          {[...Array(phoneNumberCount)].map((_, index) => (
            <div className="bmp-input-flex" key={index}>
              <div className="bmp-phone-field">
                <label htmlFor="" className="common-fonts bmp-academy-name">
                  {index === 0 ? "Phone Number" : `Whatsapp Number`}
                </label>

                {index === 0 && ( // Render checkbox and label only for the first phone number input
                  <div className="bmp-whatsapp-check">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        className={`cb1 ${status === 0 && (role_name === 'academy' || role_name === 'player')
                          ? "bmp_disable"
                          : ""
                          }`}
                        name="headerCheckBox"
                        checked={isWhatsappActivated}
                        onChange={handleCheckboxChange}
                        disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <p className="common-fonts light-color">
                      Whatsapp Activated
                    </p>
                  </div>
                )}
              </div>

              <input
                type="number"
                className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                  }`}
                name={index === 0 ? "phone" : "whatsapp"}
                disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
                onChange={handleChange}
                value={
                  isLoading
                    ? "-"
                    : index === 0
                      ? academyData?.phone
                      : academyData?.whatsapp
                }
              />
            </div>
          ))}

          {isButtonVisible && (
            <div>
              <button
                className={`common-fonts common-white-blue-button bmp-add-phone ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                  }`}
                onClick={addPhoneNumberInput}
                disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
              >
                + Add Phone Number
              </button>
            </div>
          )}

          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                }`}
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.email || ""}
              style={{ textTransform: "none" }}
              disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
            />
          </div>
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Website
            </label>
            <input
              type="text"
              name="website"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.website || ""}
              className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                }`}
              disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
            />
          </div>

          <div className="bmp-input-flex">
            <label className="common-fonts bmp-academy-name">
              Experience:{" "}
            </label>
            <select
              className={`common-fonts common-input langSelect ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                }`}
              name="experience"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.experience || ""}
              disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
            >
              <option value="">Select Experience</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="20+">20+</option>
            </select>
          </div>
          <br />
          <div className="bmp-input-flex">
            <label htmlFor="" className="common-fonts bmp-academy-name">
              Open Timings
            </label>
            <input
              type="text"
              name="timing"
              onChange={handleChange}
              value={isLoading ? "-" : academyData?.timing === null ? "10am-9pm" : academyData?.timing}
              className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                }`}
              disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
            />
          </div>
        </div>

        <div>
          <ProgressBar array={progressArray} />
          <div className="bmp-right-fields">
            <p className="common-fonts">Upload <span>{role_name}</span> Logo</p>
            <p className="common-fonts">Recommended image size 190x190</p>

            <div className="bmp-upload">
              <div className="contact-browse deal-doc-file">
                <span
                  className="common-fonts common-input contact-tab-input"
                  style={{
                    position: "relative",
                    marginRight: "10px",
                  }}
                >
                  <button
                    className={`common-fonts contact-browse-btn ${status === 0 && (role_name === 'academy' || role_name === 'player')
                      ? "bmp_disable"
                      : ""
                      }`}
                    onClick={handleButtonClick}
                    disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
                  >
                    Browse
                  </button>

                  <input
                    type="file"
                    style={{
                      display: "none",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      width: "100%",
                    }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  {isUploading ? (
                    <span className="common-fonts upload-file-name">
                      Uploading...
                    </span>
                  ) : (
                    <span className={`common-fonts upload-file-name ${status === 0 && (role_name === 'academy' || role_name === 'player') ? 'bmp_disable' : ''}`}>
                      {fileName ? fileName : academyData?.logo}
                      { }
                    </span>
                  )}
                </span>
              </div>

              {selectedFile && (
                <div className="bmp-image-preview">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Preview"
                    className="bmp-preview-image"
                  />
                </div>
              )}

              {!selectedFile && (
                <div className="bmp-image-preview">
                  <img
                    src={academyData?.logo === null
                      ? "https://res.cloudinary.com/cloud2cdn/image/upload/q_10/bookmyplayer/asset/images/logo.svg"
                      : `https://res.cloudinary.com/cloud2cdn/image/upload/bookmyplayer/academy/${academyId}/${academyData?.logo}`}
                    alt=""
                  />
                </div>
              )}
            </div>

            <p className="common-fonts bmp-social">
              Connect Social Media Account
            </p>

            <div className="bmp-input-flex">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Facebook
              </label>
              <input
                type="text"
                className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? 'bmp_disable' : ''}`}
                name="facebook"
                onChange={handleChange}
                value={isLoading ? "-" : academyData?.facebook || ""}
                disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
              />
            </div>
            {/* <div className="bmp-input-flex">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Twitter
              </label>
              <input
                type="text"
                className="common-fonts common-input bmp-input"
              />
            </div> */}
            <div className="bmp-input-flex">
              <label htmlFor="" className="common-fonts bmp-academy-name">
                Instagram
              </label>
              <input
                type="text"
                className={`common-fonts common-input bmp-input ${status === 0 && (role_name === 'academy' || role_name === 'player') ? 'bmp_disable' : ''}`}
                name="instagram"
                onChange={handleChange}
                value={isLoading ? "-" : academyData?.instagram || ""}
                disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
              />
            </div>
            <div className="bmp_overview_language_flex">
              <p className="common-fonts bmp-social">Language</p>
            </div>
            <div className="bmp-input-flex ">
              <select
                value={selectedLanguageName}
                onChange={handlelanguageNameChange}
                className={`common-fonts common-input langSelect level_input bmp_lang_box${status === 0 && (role_name === 'academy' || role_name === 'player') ? 'bmp_disable' : ''}`}

                disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
              >
                <option value="">Select your language</option>
                {languages.map((language) => {
                  if (!mappedLanguages?.some((mappedLanguage) => mappedLanguage.language === language.label)) {
                    return (
                      <option key={language.value} value={language.value}>
                        {language.label}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
            </div>

            {mappedLanguages.map((mappedLanguage, index) => (
              <div className="bmp_overview_language_map" key={index}>
                <p className={`common-fonts ${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable" : ""
                  }`}>
                  {mappedLanguage.language}
                </p>{
                  status === 0 && (role_name === 'academy' || role_name === 'player') ? (
                    <img src={Dash2} alt="" />
                  ) : (
                    <img src={Dash} alt="" onClick={() => handleDeleteLanguage(index)} />
                  )
                }

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bmp-bottom-btn">
        <button className="common-fonts common-white-button">cancel</button>
        {stateBtn === 0 ? (
          <button disabled className="disabledBtn">
            Save
          </button>
        ) : (
          <button
            className={`${status === 0 && (role_name === 'academy' || role_name === 'player') ? "bmp_disable disabledBtn" : "common-save-button common-save"}`}
            onClick={handleSubmit}
            disabled={status === 0 && (role_name === 'academy' || role_name === 'player')}
          >
            Save
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default BmpOverview;
