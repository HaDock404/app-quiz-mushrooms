import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import HouseIcon from "./HouseIcon";

function BodyQuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const quizFile = location.state?.quizData;
    const [data, setData] = useState([]);

    useEffect(() => {
        import(`../data/${quizFile}`)
            .then((module) => setData([...module.default]))
            .catch((error) => {
                console.error("Erreur lors du chargement des données :", error);
                alert("Impossible de charger le quiz.");
                navigate("/");
            });
    }, [quizFile, navigate]);

    const [scientificInput, setScientificInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [edibleInput, setEdibleInput] = useState("")
    const [syndromeInput, setSyndromeInput] = useState("")

    const [scientificInputState, setScientificInputState] = useState("");
    const [scientificAnswer, setScientificAnswer] = useState("");
    const [nameInputState, setNameInputState] = useState("");
    const [nameAnswer, setNameAnswer] = useState("");
    const [edibleInputState, setEdibleInputState] = useState("")
    const [edibleAnswer, setEdibleAnswer] = useState("")
    const [syndromeInputState, setSyndromeInputState] = useState("")//
    const [syndromeAnswer, setSyndromeAnswer] = useState("")//

    const [score, setScore] = useState(0);
    const [alreadyClicked, setAlreadyClicked] =  useState(0);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        const currentData = data[currentQuestion];
        let currentScore = 0;

        function removeAccents(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        if (removeAccents(scientificInput.trim().toLowerCase()) === removeAccents(currentData.scientific_name.toLowerCase())) {
            currentScore = currentScore + 0.5
            setScientificInputState("")
            setScientificAnswer("")
        } else {
            setScientificInputState(scientificInput.toLowerCase())
            setScientificAnswer(currentData.scientific_name.toLowerCase())
        }
        if (removeAccents(nameInput.trim().toLowerCase()) === removeAccents(currentData.common_name.toLowerCase())) {
            currentScore = currentScore + 0.5
            setNameInputState("")
            setNameAnswer("")
        } else {
            setNameInputState(nameInput.toLowerCase())
            setNameAnswer(currentData.common_name.toLowerCase())
        }
        if (removeAccents(edibleInput.trim().toLowerCase()) === removeAccents(currentData.edible.toLowerCase())) {
            currentScore = currentScore + 0.5
            setEdibleInputState("")
            setEdibleAnswer("")
        } else {
            setEdibleInputState(edibleInput.toLowerCase())
            setEdibleAnswer(currentData.edible.toLowerCase())
        }
        if (removeAccents(syndromeInput.trim().toLowerCase()) === removeAccents(currentData.syndrome.toLowerCase())) {
            currentScore = currentScore + 0.5
            setSyndromeInputState("")
            setSyndromeAnswer("")
        } else {
            setSyndromeInputState(syndromeInput.toLowerCase())
            setSyndromeAnswer(currentData.syndrome.toLowerCase())
        }

        if (alreadyClicked === 0) {
            setScore(score + currentScore);
            setAlreadyClicked(1)
        }
    
        if (alreadyClicked === 0) {
            if (currentScore === 2) {
                setFeedback("Good Job ! 2/2 points !");
            } else if (currentScore === 1.5) {
                setFeedback("Almost ! 1.5/2 point.");
            } else if (currentScore === 1) {
                setFeedback("Meh ! 1/2 point.");
            } else if (currentScore === 0.5) {
                setFeedback("Outch ! 0.5/2 point.");
            } else {
                setFeedback("What are u doing ?! 0/2 point.");
            }
            setAlreadyClicked(1)
        }
    };
    
    const handleNextQuestion = () => {
        setFeedback("");
        setScientificInput("");
        setScientificInputState("")
        setScientificAnswer("")
        setNameInput("");
        setNameInputState("")
        setNameAnswer("")
        setEdibleInput("");
        setEdibleInputState("")
        setEdibleAnswer("")
        setSyndromeInput("");
        setSyndromeInputState("")
        setSyndromeAnswer("")
        setAlreadyClicked(0)

        if (currentQuestion < data.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert(`Quiz done ! Your final score is ${((score/2)/(data.length))*20} / 20.`);
            setCurrentQuestion(0);
            setScore(0);
            navigate('/')
        }
    };

    const currentData = data[currentQuestion];
    

    return (
        <section className="quiz_page_section">
            <article className="quiz_page_box">
                <h1 className="quiz_page_h1">Reconocimiento Hongos</h1>
                <p className="quiz_page_current_question">Question <span className="quiz_page_current_question_span">{currentQuestion + 1}</span> on {data.length}</p>
                <article className="quiz_page_box_question-image">
                    <div className="quiz_page_box-question">
                        <div>
                            <label className="quiz_page_box-question_label">
                                NOMBRE CIENTIFICO :
                                <input
                                    className="quiz_page_box-question_input"
                                    type="text"
                                    value={scientificInput}
                                    onChange={(e) => setScientificInput(e.target.value)}
                                    style={{ margin: "10px" }}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="quiz_page_box-question_label">
                                NOMBRE COMUN :
                                <input
                                    className="quiz_page_box-question_input"
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    style={{ margin: "10px" }}
                                />
                            </label>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <label className="quiz_page_box-question_label">
                                COMESTIBLE :
                            </label>
                            <div style={{ margin: "10px" }}>
                                <label style={{ marginRight: "10px", display: "inline-flex", alignItems: "center" }}>
                                    <input
                                        type="radio"
                                        name="edible"
                                        value="si"
                                        onChange={(e) => setEdibleInput(e.target.value)}
                                        style={{
                                            appearance: "none",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            border: "2px solid #000",
                                            marginRight: "5px",
                                            outline: "none",
                                            cursor: "pointer",
                                            backgroundColor: edibleInput === "si" ? "#007BFF" : "transparent"
                                        }}
                                        onFocus={(e) => (e.target.style.boxShadow = "0 0 5px #007BFF")}
                                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                                        onClick={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    />
                                    Si
                                </label>
                                <label style={{ marginRight: "10px", display: "inline-flex", alignItems: "center" }}>
                                    <input
                                        type="radio"
                                        name="edible"
                                        value="no"
                                        onChange={(e) => setEdibleInput(e.target.value)}
                                        style={{
                                            appearance: "none",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            border: "2px solid #000",
                                            marginRight: "5px",
                                            outline: "none",
                                            cursor: "pointer",
                                            backgroundColor: edibleInput === "no" ? "#007BFF" : "transparent"
                                        }}
                                        onFocus={(e) => (e.target.style.boxShadow = "0 0 5px #007BFF")}
                                        onBlur={(e) => (e.target.style.boxShadow = "none")}
                                        onClick={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="quiz_page_box-question_label">
                                SINDROME :
                                <input
                                    className="quiz_page_box-question_input"
                                    type="text"
                                    value={syndromeInput}
                                    onChange={(e) => setSyndromeInput(e.target.value)}
                                    style={{ 
                                        margin: "10px", 
                                        backgroundColor: edibleInput === 'si' ? '#121422' : 'black',
                                        pointerEvents: edibleInput === 'si' ? 'none' : 'auto',
                                    }}
                                    readOnly={edibleInput === 'si'}
                                />
                            </label>
                        </div>
                        <p className="quiz_page_box_feedback">{feedback}</p>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {scientificInputState}</span> : {scientificAnswer}
                        </div>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {nameInputState}</span> : {nameAnswer}
                        </div>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {edibleInputState}</span> : {edibleAnswer}
                        </div>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {syndromeInputState}</span> : {syndromeAnswer}
                        </div>
                    </div>
                    <div className="quiz_page_box-image">
                        {currentData?.image ? (
                                <img
                                    className="image-fit"
                                    src={require(`../assets/${currentData.image}`)}
                                    alt={currentData.name || "Image"}
                                />
                            ) : (
                                <p>Image non disponible</p>
                            )}
                    </div>
                </article>
                <article className="quiz_page_result">
                    <button className="quiz_page_result_button" onClick={handleSubmit} style={{backgroundColor: "#94C788"}}>
                        Check
                    </button>
                    <button className="quiz_page_result_button" onClick={handleNextQuestion} style={{backgroundColor: "#8DB5E6"}}>
                        Next Question
                    </button>
                </article>
            </article>
            <Link to='/' className="quiz_page_button_home">
                <HouseIcon />
                Home
            </Link>
        </section>
    )
}

export default BodyQuizPage