const config = {
    title: "Flashcards",
    instruction: "Test your knowledge by playing with the following flashcards. Guess the correct answer and then click \"Reveal Answer\" to see if you got it right!",
    image: "https://a.storyblok.com/f/112136/373x445/175f800354/lucia-8.png",
    background: "https://a.storyblok.com/f/112136/1920x1409/5ba98e7f92/texture-bg-5efdcf3715f790-74747584-606d864d1b22d1-55861802.jpg",
    background_color: "#25517B",
    correct_border: "rgb(18, 169, 71)",
    incorrect_border: "#ca2626",
    end_image: "https://a.storyblok.com/f/112136/205x150/12867bb205/sporting-hero.png",
    end_text: "Well Done! Click the “Next Video” button to proceed now.",
}

const flashcards = [{
        question: "Test Question 1",
        answer: "Test Answer 1",
        image: "" //https://a.storyblok.com/f/112136/446x446/cf944b253b/1.png
    },
    {
        question: "Test Question 2",
        answer: "Test Answer 2",
        image: "" //https://a.storyblok.com/f/112136/446x446/3ea9d4491c/2.png
    },
    {
        question: "Test Question 3",
        answer: "Test Answer 3",
        image: "" //https://a.storyblok.com/f/112136/446x446/1cadc0e6c3/3.png
    },
    {
        question: "Test Question 4",
        answer: "Test Answer 4",
        image: "" //https://a.storyblok.com/f/112136/446x446/0c7f465cc6/4.png
    }
]

const body = document.querySelector('body');
const reveal = document.getElementById('cardBtnAnswer');
const revealQuestion = document.getElementById('cardBtnQuestion');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const card = document.getElementById('card');
const image = document.getElementById("image");
const title = document.getElementById("title");
const instruction = document.getElementById("instruction");
const input = document.getElementById('input');
const textContainer = document.getElementById('textContainer');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const navBtnContainer = document.getElementById('navBtns');
const answerText = document.getElementById('answerValue');
const score = document.getElementById('score');
const total = document.getElementById('total');
const proceed = document.getElementById('proceed');
const answerImage = document.getElementById('answerImage');
const endContainer = document.getElementById('endContainer');
const endImg = document.getElementById('endImg');
const endMessage = document.getElementById('endMessage');
const main = document.getElementById('main');

title.textContent = config.title;
instruction.textContent = config.instruction;
body.style.backgroundImage = `url(${config.background})`;
body.style.backgroundColor = config.background_color;
image.src = config.image;
question.textContent = flashcards[0].question;
answer.textContent = flashcards[0].answer;
answerImage.src = flashcards[0].image;
prevBtn.style.display = 'none';
endImg.src = config.end_image;
endMessage.textContent = config.end_text;

score.textContent = 0;
total.textContent = flashcards.length;

const endScreen = () => {
    main.style.display = 'none';
    endContainer.style.display = 'flex';
    console.log(endContainer)
}
proceed.addEventListener('click', endScreen);

if (flashcards.length === 1) {
    nextBtn.style.display = 'none';
}

flashcards.forEach(element => {
    if (element.image === "" || element.image === " ") {
        answerImage.style.marginTop = '0';
    }
})

let answers = []
let answerValue = input.value;
let s = 0;
const revealAnswer = () => {
    card.style.animation = "rotate 2s forwards";
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    navBtnContainer.style.pointerEvents = 'none';
    navBtnContainer.style.justifyContent = 'center';
    input.style.pointerEvents = 'none';


    setTimeout(() => {
        question.style.display = 'none';
        answer.style.display = 'block';
        reveal.style.display = 'none';
        answerImage.style.display = 'none';
    }, 500);


    setTimeout(() => {
        const correctAnswer = answer.textContent.toUpperCase().replace(/\s+/g, "");
        revealQuestion.style.display = 'block';
        if (correctAnswer === answerValue && !answers.toString().includes(answerValue)) {
            card.style.border = `solid 3px ${config.correct_border}`;
            answerText.textContent = "Correct!";
            answers.push(answerValue);
            s++;
            score.textContent = s;
        } else if (correctAnswer === answerValue) {
            card.style.border = `solid 3px ${config.correct_border}`;
            answerText.textContent = "Correct!";
        } else {
            card.style.border = `solid 3px ${config.incorrect_border}`;
            answerText.textContent = "Incorrect!";
        }

        if (parseInt(score.textContent) === flashcards.length) {
            proceed.style.display = 'block';
        }

    }, 2000);
}
reveal.addEventListener('click', revealAnswer);

const revealQuestionFunction = () => {
    card.style.animation = "rotateBack 2s backwards";
    nextBtn.style.display = 'block';
    prevBtn.style.display = 'block';
    navBtnContainer.style.justifyContent = 'space-between';
    answerText.textContent = ""
    navBtnContainer.style.pointerEvents = 'all';
    input.style.pointerEvents = 'all';
    card.style.border = 'none';
    setTimeout(() => {
        answer.style.display = 'none';
        reveal.style.display = 'none';
        revealQuestion.style.display = 'none';
        question.style.display = 'block'
        question.style.transform = 'rotateY(0deg)';
        answerImage.style.display = 'block';
    }, 500);
}
revealQuestion.addEventListener('click', revealQuestionFunction);

const showButton = () => {
    reveal.style.display = 'block';
    answerValue = input.value.toUpperCase().replace(/\s+/g, "");
    if (input.value === "") {
        reveal.style.display = 'none';
    };
}
input.addEventListener('keyup', showButton);

let i = 0;
const goNext = () => {
    reveal.style.display = 'none';
    card.style.border = 'none';
    input.value = "";
    if (i < flashcards.length - 1) {
        i++;
        question.textContent = flashcards[i].question;
        answer.textContent = flashcards[i].answer;
        answerImage.src = flashcards[i].image;

    }
    if (i === flashcards.length - 1) {
        nextBtn.style.display = 'none';
    }
    if (i > 0) {
        prevBtn.style.display = 'block';
        navBtnContainer.style.justifyContent = 'space-between';
    }
}
nextBtn.addEventListener('click', goNext);

const goPrev = () => {
    reveal.style.display = 'none';
    card.style.border = 'none';
    input.value = ""
    if (i > 0) {
        i--;
        question.textContent = flashcards[i].question;
        answer.textContent = flashcards[i].answer;
        answerImage.src = flashcards[i].image;
    }

    if (i === 0) {
        prevBtn.style.display = 'none';
        navBtnContainer.style.justifyContent = 'flex-end';
    }

    if (i < flashcards.length - 1) {
        nextBtn.style.display = 'block';
    }
}
prevBtn.addEventListener('click', goPrev);