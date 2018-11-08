// Render-Data for Websites
const indexJSON = {
    header_text: '',
    msg: {
        content: '',
        type: '',
    },
    scores: [{
        id: 0,
        user: '',
        score: 0,
        time: "00:00:00",
    }],
};

const analyseJSON = {
    header_text: '',
    data: {
        player: {
            totalPlayers: 0,
            finishedPercent: 0,
        },
        question: [],
    },
};

const elseJSON = {
    header_text: '',
};

const notFoundJSON = {
    header_text: '',
    file: '',
};

// Cookie-Data
const cookieUserData = {
    username: '',
    gameId: 0,
};

const cookieMsgData = {
    content: '',
    type: '',
};

// BackEndService
const scoresJSON = {
    max: 0,
};

const startGameJSON = {
    gameId: 0,
    username: '',
};

const answerJSON = {
    gameId: 0,
    questionId: 0,
    answer: 0,
};

const endGameJSON = {
    gameId: 0,
    score: 0,
    time: "00:00:00",
};

module.exports = {
    json: {
        index: indexJSON,
        analyse: analyseJSON,
        else: elseJSON,
        notFound: notFoundJSON,
    },
    cookie: {
        user: cookieUserData,
        msg: cookieMsgData,
    },
    service: {
        scores: scoresJSON,
        startGame: startGameJSON,
        answer: answerJSON,
        endGame: endGameJSON,
    },
};