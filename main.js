const btn_inp = document.querySelector(".btn-inp");
const login = document.querySelector(".login");
const oyin = document.querySelector("#oyin");
const exit = document.querySelector("#exit");
const rasm_check = document.querySelector(".rasm-check");
const h1Title = document.querySelector(".h1");
const [inp1, inp2] = document.querySelectorAll(".inp");

exit.addEventListener("click", () => {
  localStorage.removeItem("bolajon-ismi");
  localStorage.removeItem("bolajon-yoshi");
  window.location.reload();
});

const bolakayIsmi = localStorage.getItem("bolajon-ismi");
const bolakayYoshi = localStorage.getItem("bolajon-yoshi");
if (bolakayIsmi && bolakayYoshi) {
  btn_inp.style.display = "none";
  inp1.style.display = "none";
  inp2.style.display = "none";
  oyin.style.display = "block";
  rasm_check.style.display = "none";
  login.style.display = "none";
  h1Title.textContent = `Salom ${localStorage.getItem("bolajon-ismi")}👋`;
}

btn_inp.addEventListener("click", () => {
  if (inp1.value && inp2.value) {
    localStorage.setItem("bolajon-ismi", inp1.value);
    localStorage.setItem("bolajon-yoshi", inp2.value);
    const bolakayIsmi = localStorage.getItem("bolajon-ismi");
    const bolakayYoshi = localStorage.getItem("bolajon-yoshi");
    if (bolakayIsmi && bolakayYoshi) {
      btn_inp.style.display = "none";
      inp1.style.display = "none";
      inp2.style.display = "none";
      setTimeout(() => {
        rasm_check.style.display = "none";
        login.style.display = "none";
        h1Title.textContent = `Salom ${localStorage.getItem("bolajon-ismi")}👋`;
        oyin.style.display = "block";
      }, 1000);
      rasm_check.style.display = "block";
    }
  } else {
    alert("malumotni toldir");
  }
});

const elBtns = document.querySelectorAll(".js-answer-btn");
const elSanoqBtn = document.querySelector(".savol-raqami");
const elCompleted = document.querySelector(".js-answer-count");
const elTime = document.querySelector(".js-time");
const elCorrect = document.querySelector(".js-correct");
const iwla = document.querySelector(".js-uncorrect-final");
const elUncorrect = document.querySelector(".js-uncorrect");
let savolCounter = 1;
let javobCounter = 0;
let foraCount = 5;
let correctAnswer = 0;
let uncorrectAnswer = 0;
const elAudioLose = document.querySelector("#lose");
const elAudioWin = document.querySelector("#win");
const elAudioPass = document.querySelector("#pass");
const elAudioFail = document.querySelector("#fail");
let arr = [];
function foraCountFunction(count) {
  document.querySelector(".js-fora").textContent = `${count} ta`;
}
function savolRaqami(son) {
  elSanoqBtn.textContent = `${son}-savol`;
}
function jsAnswerCounter(son) {
  elCompleted.textContent = `${son}/10`;
  if (javobCounter === 10 && foraCount !== 0) {
    document.querySelector(".tests").classList.add("d-none");
    document.querySelector(".youWin").classList.remove("d-none");
    document.querySelector(".js-correct-final").innerText = correctAnswer;
    elAudioWin.play();
  }
}
function jsCorrectFunction(son) {
  elCorrect.textContent = son;
}
function jsUnorrectFunction(son) {
  elUncorrect.textContent = son;
}
function greenBtn(ind) {
  console.log(ind);
  let number = Math.floor(Math.random() * 19);
  if (!arr.includes(number)) {
    correctAnswer++;
    jsCorrectFunction(correctAnswer);
    elAudioPass.play();
    arr.push(number);
    elBtns.forEach((btn, index) => {
      if (index === ind) {
        btn.style.border = "1px solid green";
        btn.classList.add("disabled");
        document.querySelector(".correctcha").style.display = "block";
        setTimeout(() => {
          btn.style.border = "1px solid rgb(184, 184, 184)";
          testRender(roadSymbol.slice(number, number + 3));
          savolCounter++;
          btn.classList.remove("disabled");
          javobCounter++;
          savolRaqami(savolCounter);
          jsAnswerCounter(javobCounter);
          document.querySelector(".correctcha").style.display = "none";
        }, 1000);
      } else {
        btn.classList.add("disabled");
        setTimeout(() => {
          btn.classList.remove("disabled");
        }, 750);
      }
    });
  } else {
    greenBtn(ind);
  }
}
function redBtn(ind) {
  let number = Math.floor(Math.random() * 19);
  if (!arr.includes(number)) {
    uncorrectAnswer++;
    jsUnorrectFunction(uncorrectAnswer);
    elAudioFail.play();
    arr.push(number);
    elBtns.forEach((btn, index) => {
      if (index === ind) {
        btn.classList.add("disabled");
        btn.style.border = "1px solid red";
        setTimeout(() => {
          btn.style.border = "1px solid rgb(184, 184, 184)";
          testRender(roadSymbol.slice(number, number + 3));
          savolCounter++;
          btn.classList.remove("disabled");

          javobCounter++;
          foraCount--;
          savolRaqami(savolCounter);
          jsAnswerCounter(javobCounter);
          foraCountFunction(foraCount);
          if (foraCount === 0) {
            document.querySelector(".tests").classList.add("d-none");
            document.querySelector(".gameOver").classList.remove("d-none");
            iwla.textContent = correctAnswer;
            console.log(document.querySelector(".js-uncorrect-final"));
            elAudioLose.play();
          }
        }, 750);
      } else {
        btn.classList.add("disabled");
        setTimeout(() => {
          btn.classList.remove("disabled");
        }, 750);
      }
    });
  } else {
    redBtn(ind);
  }
}
function testRender(symbols) {
  let sum = Math.floor(Math.random() * 2); // 1
  symbols.forEach((value, index) => {
    elBtns[index].textContent = value.symbol_title;
    if (sum === index) {
      document.querySelector(".js-test-img").src = value.symbol_img;
      elBtns.forEach((btn, yandex) => {
        if (sum === yandex) {
          btn.textContent = value.symbol_title;
          console.log(sum, yandex, correctAnswer);
          btn.setAttribute("onclick", `greenBtn(${yandex})`);
        } else {
          btn.setAttribute("onclick", `redBtn(${yandex})`);
        }
      });
    }
  });
}
function timeRender(time) {
  minut = `0${time}`;
  secund = 00;
  vaqt = `${minut}:${secund}`;
  elTime.textContent = vaqt;
  setInterval(() => {
    if (secund == 00 || secund == 0) {
      time = Number(time) - 1;
      console.log(time, secund);
      if (elTime.textContent == "00:0") {
        document.querySelector(".tests").classList.add("d-none");
        document.querySelector(".gameOver").classList.remove("d-none");
        document.querySelector(".js-uncorrect-final").textContent =
          correctAnswer;
        console.log(document.querySelector(".js-uncorrect-final"));
        elAudioLose.play();
      }
      secund = 60;
      secund--;
      minut = `0${time}`;
      vaqt = `${minut}:${secund}`;
      elTime.textContent = vaqt;
    } else {
      secund--;
      vaqt = `${minut}:${secund}`;
      elTime.textContent = vaqt;
    }
  }, 1000);
}
document.querySelectorAll(".blur-btns").forEach((value) => {
  value.addEventListener("click", () => {
    let sum = Math.floor(Math.random() * 19);
    arr.push(sum);
    document.querySelector(
      ".js-level-exam"
    ).textContent = `Level: ${value.textContent
      .slice(0, value.textContent.length - 9)
      .trim()}`;
    document.querySelector(".entery-section").classList.add("d-none");
    document.querySelector(".tests").classList.remove("d-none");
    testRender(roadSymbol.slice(sum, sum + 3));
    foraCountFunction(foraCount);
    savolRaqami(savolCounter);
    jsAnswerCounter(javobCounter);
    jsCorrectFunction(correctAnswer);
    jsUnorrectFunction(uncorrectAnswer);
    timeRender(value.textContent[value.textContent.length - 7]);
  });
});
