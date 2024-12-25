import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import HouseIcon from "./HouseIcon";

function BodyRandomQuizPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [shuffledData, setShuffledData] = useState([]);

    const quizFile = location.state?.quizData;

    useEffect(() => {
        import(`../data/${quizFile}`)
            .then((module) => setShuffledData(shuffleArray([...module.default])))
            .catch((error) => {
                console.error("Erreur lors du chargement des données :", error);
                alert("Impossible de charger le quiz.");
                navigate("/");
            });
    }, [quizFile, navigate]);

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [orderInput, setOrderInput] = useState("");
    const [familyInput, setFamilyInput] = useState("");
    const [scientificInput, setScientificInput] = useState("");
    const [nameInput, setNameInput] = useState("");

    const [orderInputState, setOrderInputState] = useState("");
    const [orderAnswer, setOrderAnswer] = useState("");
    const [familyInputState, setFamilyInputState] = useState("");
    const [familyAnswer, setFamilyAnswer] = useState("");
    const [scientificInputState, setScientificInputState] = useState("");
    const [scientificAnswer, setScientificAnswer] = useState("");
    const [nameInputState, setNameInputState] = useState("");
    const [nameAnswer, setNameAnswer] = useState("");

    const [score, setScore] = useState(0);
    const [alreadyClicked, setAlreadyClicked] =  useState(0);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = () => {
        const currentData = shuffledData[currentQuestion];
        let currentScore = 0;

        function removeAccents(str) {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        if (removeAccents(orderInput.trim().toLowerCase()) === removeAccents(currentData.order.toLowerCase())) {
            currentScore = currentScore + 0.5
            setOrderInputState("")
            setOrderAnswer("")
        } else {
            setOrderInputState(orderInput.toLowerCase())
            setOrderAnswer(currentData.order.toLowerCase())
        }
        if (removeAccents(familyInput.trim().toLowerCase()) === removeAccents(currentData.family.toLowerCase())) {
            currentScore = currentScore + 0.5
            setFamilyInputState("")
            setFamilyAnswer("")
        } else {
            setFamilyInputState(familyInput.toLowerCase())
            setFamilyAnswer(currentData.family.toLowerCase())
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
        setOrderInput("");
        setFamilyInput("");
        setScientificInput("");
        setNameInput("");
        setOrderInputState("");
        setOrderAnswer("");
        setFamilyInputState("")
        setFamilyAnswer("")
        setScientificInputState("")
        setScientificAnswer("")
        setNameInputState("")
        setNameAnswer("")
        setAlreadyClicked(0)

        if (currentQuestion < shuffledData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert(`Quiz terminé ! Votre score final est de ${((score/2)/(shuffledData.length))*20} / 20.`);
            setCurrentQuestion(0);
            setScore(0);
            navigate('/')
        }
    };

    const currentData = shuffledData[currentQuestion] || {};
    const imagePath = currentData.image
    ? require(`../assets/${currentData.image}`)
    : null;

    return (
        <section className="quiz_page_section">
            <article className="quiz_page_box">
                <h1 className="quiz_page_h1">Reconocimiento Peces</h1>
                <p className="quiz_page_current_question">Question <span className="quiz_page_current_question_span">{currentQuestion + 1}</span> on {shuffledData.length}</p>
                <article className="quiz_page_box_question-image">
                    <div className="quiz_page_box-question">
                        <div>
                            <label className="quiz_page_box-question_label">
                                ORDEN :
                                <input
                                    className="quiz_page_box-question_input"
                                    type="text"
                                    value={orderInput}
                                    onChange={(e) => setOrderInput(e.target.value)}
                                    style={{ margin: "10px" }}
                                />
                            </label>
                        </div>
                        <div>
                            <label className="quiz_page_box-question_label">
                                FAMILIA :
                                <input
                                    className="quiz_page_box-question_input"
                                    type="text"
                                    value={familyInput}
                                    onChange={(e) => setFamilyInput(e.target.value)}
                                    style={{ margin: "10px" }}
                                />
                            </label>
                        </div>
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
                        <p className="quiz_page_box_feedback">{feedback}</p>

                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {orderInputState}</span> : {orderAnswer}
                        </div>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {familyInputState}</span> : {familyAnswer}
                        </div>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {scientificInputState}</span> : {scientificAnswer}
                        </div>
                        <div style={{color:'white'}}>Answer 
                            <span style={{color:'red'}}> {nameInputState}</span> : {nameAnswer}
                        </div>

                    </div>
                    <div className="quiz_page_box-image">
                    {imagePath ? (
                        <img
                            className="image-fit"
                            src={imagePath}
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

export default BodyRandomQuizPage