//Response JSON
const loginJSON = { 
    success: '',
    message: '',
    msg_type: '',
 };
 const scoreJSON ={
    user: '',
    score: 0,
    time: "00:00:00",
 };
 const initJSON ={
    gameId: 0,
 };
 const insertJSON ={
    success: false,
 };
 const updateJSON ={
    success: false,
 };
 const deleteJSON ={
    success: false,
 };
 const analyseJSON ={
    player: {
        totalPlayers: 0,
        finishedPercent: 0.00,
    },
    question: [],
};

//arrayObjects
const questionElement =         {
    id: 0,
    totalAnswers: 0,
    correctPercent: 0.00,
    falsePercent: 0.00,
    noAnswerPercent: 0.00,
};

 module.exports = {
     json:{
        login: loginJSON,
        score: scoreJSON,
        init: initJSON,
        insert: insertJSON,
        update: updateJSON,
        delete: deleteJSON,
        analyse: analyseJSON,
     },
     arrayElement: {
        question: questionElement,
     },
  };