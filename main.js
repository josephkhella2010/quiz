const questions = [
  {
    question: "  är huvudstad av france Paris?",
    answer: [
      { text: "rätt", correct: "true" },
      { text: "false", correct: "false" }
    ]
  },
  {
    question: "är huvudstad av  spain bercelona?",
    answer: [
      { text: "rätt", correct: "false" },
      { text: "false", correct: "true" }
    ]
  },
  {
    question: "vilken huvudstad  är av usa?",
    answer: [
      { text: "washington", correct: "true" },
      { text: "new york", correct: "false" },
      { text: "chicago", correct: "false" },
      { text: "san diego", correct: "false" }
    ]
  },
  {
    question: "vilken huvudstad  är av canada?",
    answer: [
      { text: "toronto", correct: "false" },
      { text: "ottawa", correct: "true" },
      { text: "quebec", correct: "false" },
      { text: "calgary", correct: "false" }
    ]
  },
  {
    question: "vilken huvudstad  är av austrialia?",
    answer: [
      { text: "melbourne", correct: "false" },
      { text: "perth", correct: "flase" },
      { text: "sydney", correct: "true" },
      { text: "adelaide", correct: "false" }
    ]
  },
  {
    question: "vilken huvudstad  är av egypt?",
    answer: [
      { text: "assiut", correct: "false" },
      { text: "alexandria", correct: "false" },
      { text: "sharm el shiek", correct: "false" },
      { text: "cairo", correct: "true" }
    ]
  },
  {
    question: "vilken huvudstad  är av tyskland?",
    answer: [
      { text: "berlin", correct: "true" },
      { text: "hamburg", correct: "false" },
      { text: "munchen", correct: "false" },
      { text: "dresden", correct: "false" }
    ]
  },
  {
    question: "vilken huvudstad  är av uk?",
    answer: [
      { text: "liverpool", correct: "false" },
      { text: "london", correct: "true" },
      { text: "leicester", correct: "false" },
      { text: "manchester", correct: "false" }
    ]
  }
];
const wrapper = document.querySelector(".wrapper");
let currentindex = 0;
let scores = 0;
let userAnswers = [];

//////////////////////////////////////////////////
function creatediv() {
  return questions.map((item, index) => {
    const { question, answer } = item;
    const newdiv = document.createElement("div");
    newdiv.classList.add("container");

    newdiv.innerHTML = `
    
      <h1 class="question"> ${index + 1}- question: ${question}</h1>
      <div class="btn-container">
      
      </div>
      <button class="next">next</button>
    `;
    const btncontainer = newdiv.querySelector(".btn-container");
    // console.log(btncontainer);
    answer.map((item, index) => {
      const btn = document.createElement("button");
      btn.textContent = item.text;
      btn.dataset.correct = item.correct;
      btncontainer.appendChild(btn);
      btnclick(btn, answer, newdiv, question);
    });

    wrapper.append(newdiv);
    return newdiv;
  });
}
creatediv();

function showscore() {
  const scoreDiv = document.createElement("div");
  scoreDiv.classList.add("score-container");
  scoreDiv.innerHTML = `
        <h2>Slutpoäng: ${scores}</h2>
        <ul class="ul">
          ${userAnswers
            .map(
              (answer, index) =>
                `<li>Fråga ${index + 1}: ${answer.question}
             <span> Du svarade "${answer.useranswer}", rätt svar är "${
                  answer.correctAnswer
                }"</span>`
            )
            .join("")}
        </ul>
        <button onclick="resetFunction()">reset</button>
      `;

  wrapper.innerHTML = "";
  wrapper.append(scoreDiv);
}

function result() {
  const divs = creatediv();
  divs[currentindex].classList.add("active");

  divs.forEach((item, index) => {
    const nextBtn = item.querySelector(".next");

    nextBtn.addEventListener("click", () => {
      item.classList.remove("active");

      if (currentindex < divs.length - 1) {
        currentindex++;
        divs[currentindex].classList.add("active");
      } else {
        showscore(); // Show score after last question
      }
    });
  });
}

function btnclick(btn, answer, newdiv, question) {
  btn.addEventListener("click", (e) => {
    let p = document.createElement("p");

    const correctAnswer = answer.find((item) => item.correct === "true").text;
    const nextBtn = newdiv.querySelector(".next");
    const correctBtn = Array.from(newdiv.querySelectorAll("button")).find(
      (button) => button.dataset.correct === "true"
    );
    correctBtn.style.background = "green";
    userAnswers.push({
      question: question,
      useranswer: btn.innerHTML,
      correctAnswer: correctAnswer
    });
    if (btn.dataset.correct === "true") {
      scores = scores + 10;
      p.innerHTML = ` well done your answer is correct and u have score : ${scores} `;
    } else {
      p.innerHTML = `  your answer is wrong the correct answer is ${correctAnswer} and u have score : ${scores} `;
      btn.style.background = "red";
    }
    console.log("the write answer is ", correctAnswer);
    newdiv.append(p);
    newdiv.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
    nextBtn.disabled = false;
  });
}
function resetFunction() {
  window.location.reload();
}
result();
