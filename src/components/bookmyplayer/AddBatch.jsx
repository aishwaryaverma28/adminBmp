import React, { useState, useEffect } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { 
    // getDecryptedToken,
    UPDATE_ACADEMY, RESTRICTED_KEYWORDS, ADD_BATCH } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBatch = ({ onClose, fetchBatch, array }) => {
    const decryptedToken = localStorage.getItem("jwtToken");
    const [selectedDays, setSelectedDays] = useState([]);
    const [batchTitle, setBatchTitle] = useState("");
    const [ageGroups, setAgeGroups] = useState([{ minAge: "", maxAge: "" }]);
    const [showMaxAgeMessage, setShowMaxAgeMessage] = useState(false);
    const [times, setTimes] = useState([{ minTime: "", maxTime: "" }]);
    const [showTimeMessage, setShowTimeMessage] = useState(false);
    const [feeGroups, setFeeGroups] = useState([{ month: "", fees: "" }]);
    const [showFeeMessage, setShowFeeMessage] = useState(false);
    const [num, setNum] = useState([]);
    const [stateBtn, setStateBtn] = useState(0);
    const [keywords, setKeywords] = useState([
        "murder",
        "kill",
        "killer",
        "kill you",
        "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
      ]);
    const id = localStorage.getItem("academy_id");

    // const getAllKeywords = () => {
    //     axios.get(RESTRICTED_KEYWORDS, {
    //         headers: {
    //             Authorization: `Bearer ${decryptedToken}`,
    //         },
    //     })
    //         .then((response) => {
    //             const newKeywords = response?.data?.data.map(keywordObj => keywordObj.keyword);
    //             setKeywords(newKeywords);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
    // useEffect(() => {
    //     getAllKeywords();
    // }, [])
    useEffect(() => {
        setNum(array);
    }, [array]);

    // ===========================================================function for batch name
    const handleInputChange = (e) => {
        const title = e.target.value;
        let redText = false;
        let disableSaveButton = false;
    const words = title.split(' ');
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
      e.target.style.color = 'red';
    } else {
      e.target.style.color = '';
    }
        setBatchTitle(title);
        setStateBtn(disableSaveButton ? 0 : 1);
    }
    // ========================================================function for batch age
    const handleMinAgeChange = (e, index) => {
        const ageGroupsCopy = [...ageGroups];
        ageGroupsCopy[index].minAge = e.target.value;
        setAgeGroups(ageGroupsCopy);
        setShowMaxAgeMessage(true);
        setStateBtn(0);
    }

    const handleMaxAgeChange = (e, index) => {
        const ageGroupsCopy = [...ageGroups];
        ageGroupsCopy[index].maxAge = e.target.value;
        setAgeGroups(ageGroupsCopy);
        setShowMaxAgeMessage(false);
        setStateBtn(1);
    }

    const addAgeGroup = () => {
        setAgeGroups([...ageGroups, { minAge: "", maxAge: "" }]);
    }

    const ageGroupStrings = ageGroups.map((group, index) => {
        return `${group.minAge}-${group.maxAge} yrs`;
    });
    // ===========================================================function for days
    const handleDayClick = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(
                selectedDays.filter((selectedDay) => selectedDay !== day)
            );
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    // ========================================================function for batch fee
    const handleMonthChange = (e, index) => {
        console.log(e.target.value)
        const feeGroupsCopy = [...feeGroups];
        feeGroupsCopy[index].month = e.target.value;
        setFeeGroups(feeGroupsCopy);
        setShowFeeMessage(true);
        setStateBtn(0);
    }

    const handleFeeChange = (e, index) => {
        console.log(e.target.value)
        const feeGroupsCopy = [...feeGroups];
        feeGroupsCopy[index].fees = e.target.value;
        setFeeGroups(feeGroupsCopy);
        setShowFeeMessage(false);
        setStateBtn(1);
    }

    const addFeeGroup = () => {
        setFeeGroups([...feeGroups, { month: "", fees: "" }]);
    }

    const feeGroupStrings = feeGroups.map((group, index) => {
        return `${group.month} month-${group.fees}`;
    });

    // ========================================================function for batch age
    const timeOptions = [];
    for (let hours = 0; hours <= 23; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            timeOptions.push(formattedTime);
        }
    }
    const handleMinTimeChange = (e, index) => {
        const timeCopy = [...times];
        timeCopy[index].minTime = e.target.value;
        setTimes(timeCopy);
        setShowTimeMessage(true);
        setStateBtn(0);
    }

    const handleMaxTimeChange = (e, index) => {
        const timeCopy = [...times];
        timeCopy[index].maxTime = e.target.value;
        setTimes(timeCopy);
        setShowTimeMessage(false);
        setStateBtn(1);
    }

    const addTimeGroup = () => {
        setTimes([...times, { minTime: "", maxTime: "" }]);
    }

    const timeStrings = times.map((group, index) => {
        return `${group.minTime} to ${group.maxTime}`;
    });
    // ========================================================function to add new batch
    const fetchBatchData = (event) => {
        event.preventDefault();
        console.log("Batch Title:", batchTitle);
        console.log("Age Groups:", ageGroupStrings.join(", "));
        console.log("Days:", selectedDays.join(", "));
        console.log("Time:", timeStrings.join(", "));
        console.log("Fee Groups:", feeGroupStrings.join(", "));
        const body = {
            object_id: parseInt(id),
            object_type: "academy",
            title: batchTitle,
            age_group: ageGroupStrings.join(", "),
            weekly_days: selectedDays.join(", "),
            timing: timeStrings.join(", "),
            fees: feeGroupStrings.join(", ")
        }
        axios
            .post(ADD_BATCH, body
                , {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
                },
            }
            )
            .then((response) => {
                console.log(response)
                if (response?.data?.status === 1) {
                    toast.success("Batch added successfully!", {
                        position: "top-center",
                        autoClose: 2000,
                    });
                    onClose();
                } else {
                    toast.error(
                        response?.data?.message,

                        {
                            position: "top-center",
                            autoClose: 2000,
                        }
                    );
                }
                handleSave();
                fetchBatch();
            })
            .catch((error) => {
                toast.error("Some Error Occoured!", {
                    position: "top-center",
                    autoClose: 2000,
                });
            })
    }

    const handleSave = () => {
        if (!num?.includes("2")) {
            num.push("2");
            setNum(num);
        }
        const combinedProgress = num.join(",");
        axios
            .put(UPDATE_ACADEMY + id, {
                completion_percentage: combinedProgress,
            }
            , {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`, // Include the JWT token in the Authorization header
                },
            }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <>
            <div className="help-modal-container">
                <div className="help-modal-box">
                    <section>
                        <div className="bmp-add-new-batch">
                            <p className="common-fonts bmp-add-heading">Add Batch</p>
                        </div>

                        <div className="bmp-wrapper">
                            <div className="bmp-modal-form">
                                <div className="bmp-add-fields">
                                    <label htmlFor="" className="common-fonts light-color">
                                        Batch Name
                                        <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-fonts common-input bmp-modal-input"
                                        name="title"
                                        onChange={handleInputChange}
                                        value={batchTitle}
                                    />
                                </div>
                                <div className="bmp-agegroup">
                                    <label htmlFor="" className="common-fonts light-color batchErrorLable">
                                        <span> Age Group <span className="common-fonts redAlert"> *</span></span> {showMaxAgeMessage ? (
                                            <p className="common-fonts redAlert">Please enter maximum age</p>
                                        ) : (
                                            <p className="common-fonts light-color" style={{ visibility: 'hidden' }}>
                                                &nbsp;
                                            </p>
                                        )}
                                    </label>
                                    {ageGroups.map((group, index) => (
                                        <div key={index}>
                                            <div className="bmp-input-flex-2 bmp-add-fields">
                                                <input
                                                    type="number"
                                                    className="common-fonts common-input bmp-modal-input"
                                                    placeholder="Min Age"
                                                    onChange={(e) => handleMinAgeChange(e, index)}
                                                    value={group.minAge}
                                                />
                                                <p className="common-fonts light-color bmp-to">To</p>
                                                <input
                                                    type="number"
                                                    className="common-fonts common-input bmp-modal-input"
                                                    placeholder="Max Age"
                                                    onChange={(e) => handleMaxAgeChange(e, index)}
                                                    value={group.maxAge}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bmp-group">
                                    <button
                                        className="common-fonts common-white-blue-button"
                                        onClick={addAgeGroup}
                                    >
                                        + Add Groups
                                    </button>
                                </div>

                                <div className="bmp-add-fields">
                                    <label htmlFor="" className="common-fonts light-color">
                                        Weekly days  <span className="common-fonts redAlert"> *</span>
                                    </label>
                                    <div className="bmp-days">
                                        <div
                                            className={`common-fonts bmp-add-days bmp-add-days-1 ${selectedDays.includes("Sun") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Sun")}
                                        >
                                            Sun
                                        </div>
                                        <div
                                            className={`common-fonts bmp-add-days ${selectedDays.includes("Mon") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Mon")}
                                        >
                                            Mon
                                        </div>
                                        <div
                                            className={`common-fonts bmp-add-days ${selectedDays.includes("Tue") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Tue")}
                                        >
                                            Tue
                                        </div>
                                        <div
                                            className={`common-fonts bmp-add-days ${selectedDays.includes("Wed") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Wed")}
                                        >
                                            Wed
                                        </div>
                                        <div
                                            className={`common-fonts bmp-add-days ${selectedDays.includes("Thu") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Thu")}
                                        >
                                            Thu
                                        </div>
                                        <div
                                            className={`common-fonts bmp-add-days ${selectedDays.includes("Fri") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Fri")}
                                        >
                                            Fri
                                        </div>
                                        <div
                                            className={`common-fonts bmp-add-days bmp-add-days-2 ${selectedDays.includes("Sat") ? "blueDiv" : ""
                                                }`}
                                            onClick={() => handleDayClick("Sat")}
                                        >
                                            Sat
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="common-fonts light-color batchErrorLable">
                                        <span> Timings  <span className="common-fonts redAlert"> *</span></span> {showTimeMessage ? (
                                            <p className="common-fonts redAlert">Please enter closing time</p>
                                        ) : (
                                            <p className="common-fonts light-color" style={{ visibility: 'hidden' }}>
                                                &nbsp;
                                            </p>
                                        )}

                                    </label>
                                    {times.map((group, index) => (
                                        <div key={index}>
                                            <div className="bmp-input-flex-2 bmp-add-fields  bmp-new-timing">
                                                <select
                                                    onChange={(e) => handleMinTimeChange(e, index)}
                                                    value={group.minTime}
                                                    name=""
                                                    id=""
                                                    className="common-fonts common-input bmp-modal-select-2 bmp-select-fee"
                                                >
                                                    <option value="">Start time</option>
                                                    {timeOptions.map((time, index) => (
                                                        <option key={index} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select
                                                    onChange={(e) => handleMaxTimeChange(e, index)}
                                                    value={group.maxTime}
                                                    name=""
                                                    id=""
                                                    className="common-fonts common-input bmp-modal-select-2 bmp-select-fee"
                                                >
                                                    <option value="">End time</option>
                                                    {timeOptions.map((time, index) => (
                                                        <option key={index} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bmp-group">
                                    <button
                                        className="common-fonts common-white-blue-button"
                                        onClick={addTimeGroup}
                                    >
                                        + Add Timings
                                    </button>
                                </div>
                                <div>
                                    <label htmlFor="" className="common-fonts light-color batchErrorLable">
                                        <span> Fee  <span className="common-fonts redAlert"> *</span></span> {showFeeMessage ? (
                                            <p className="common-fonts redAlert">Please enter amount</p>
                                        ) : (
                                            <p className="common-fonts light-color" style={{ visibility: 'hidden' }}>
                                                &nbsp;
                                            </p>
                                        )}
                                    </label>
                                    {feeGroups.map((group, index) => (
                                        <div key={index}>
                                            <div className="bmp-input-flex-2 bmp-add-fields  bmp-new-timing">
                                                <select
                                                    onChange={(e) => handleMonthChange(e, index)}
                                                    value={group.month}
                                                    name=""
                                                    id=""
                                                    className="common-fonts common-input bmp-modal-select-2 bmp-select-fee"
                                                >
                                                    <option value="">Months</option>
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
                                                </select>
                                                <input
                                                    type="text"
                                                    className="common-fonts common-input bmp-modal-input"
                                                    placeholder="Enter your amount"
                                                    onChange={(e) => handleFeeChange(e, index)}
                                                    value={group.fees}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <button
                                        className="common-fonts common-white-blue-button"
                                        onClick={addFeeGroup}
                                    >
                                        + Add fields
                                    </button>
                                </div>
                            </div>

                            <div className="bmp-add-bottom-btn">
                                <button className="common-fonts common-white-button" onClick={onClose}>
                                    Cancel
                                </button>
                                {stateBtn === 0 ? (
                                    <button className="disabledBtn">Save</button>
                                ) : (
                                    <button
                                        className="common-save-button common-save"
                                        onClick={fetchBatchData}
                                    >
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="help-cross" onClick={onClose}>
                    X
                </div>
            </div>
        </>
    )
}

export default AddBatch