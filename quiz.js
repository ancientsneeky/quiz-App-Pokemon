'use strict'

let questionNumber = 0;
let score = 0;

//Starting Handler  for quiz
function handleQuizApp() {
  handleReadyButton();
}

//start the quiz
function handleReadyButton() {
  $('.letsBegin').on('click', '.start',(event) => {
    $('.letsBegin').remove();
    quizApp();
  });
}

// Creates random quiz question and answer always [0]
function quizApp() {
  const answerChoices = randomQuizQuestion();
  const answer = answerChoices[0];
  renderQuestion(answer, answerChoices[1]);
}

//create Question form and submit
function renderQuestion(answer, answerChoices) {
  updateQuestionNumber();
  const question = `
    <form id="questionRadioRoot">
      <h2 class="Question">Whose That Pokemon?</h2>
      <fieldset>
        <label class="answerOption blockMe">
          <input value="${answerChoices[0].name}" name="answer" required="" type="radio">
          <span>${answerChoices[0].name}</span>
        </label>

        <label class="answerOption blockMe">
          <input value="${answerChoices[1].name}" name="answer" required="" type="radio">
          <span>${answerChoices[1].name}</span>
        </label>

        <label class="answerOption blockMe">
          <input value="${answerChoices[2].name}" name="answer" required="" type="radio">
          <span>${answerChoices[2].name}</span>
        </label>
      </fieldset>
      <button type="submit" class="submitButton blockMe" role="button">Submit</button>
    </form>
  `;
  const questionImg = answer.imgPath;
  $('.questionImage').append(`<img src="${questionImg}" id="pokemon-Img" class="hidden" alt="picture of ${answer.name}">`);
  $('.questionContainer').html(question);
  handleSubmitClick(answer);
}

// if answer correct
function correctAnswerResultWindow(answer) {
  updateScore();
  $('#result').html(`<p>Correct, It's ${answer.name}</p><button class="next blockMe" role="button">Next Question</button>`);

  handleNextButton();
}

// if incorrect answer
function incorrectAnswerResultWindow(answer) {
  $('.questionContainer').empty();
  $('#result').html(`<p>Incorrect, It's ${answer.name}</p><button class="next blockMe" role="button">Next Question</button>`);
  
  handleNextButton();
}

// Cycle through questions and handle when quiz should end
function handleNextButton() {
  $('.next').on('click', event => {
    $('#result p').remove();
    if (questionNumber > 4) {
      endOfQuiz();
    } else {
      displayNewQuestion();
    }
  });
}

// submit button handler, tests user answered vs correct answer
function handleSubmitClick(answer) {
  $('#questionRadioRoot').on('submit', event => {
    event.preventDefault();
    const answerChoice = $('input:checked').val();
    
    if (answerChoice === undefined) {
      alert("Please Choose a answer");
    } else if (answerChoice === answer.name) {
      correctAnswerResultWindow(answer);
      $('#pokemon-Img').removeClass('hidden');
      $('.questionContainer').empty();
    } else {
      incorrectAnswerResultWindow(answer);
      $('#pokemon-Img').removeClass('hidden');
      $('.questionContainer').empty();
    }
  });
}

// update score and render on navagation bar
function updateScore() {
  score++;
  renderNav();
}

// udate question on navagation bar
function updateQuestionNumber() {
  questionNumber++;
  renderNav();
}

// updates html on navigation bar
function renderNav() {
  $('.score').html(`${score}`);
  $('.questionNumber').html(`${questionNumber}`);
}

// clear original question
function displayNewQuestion() {
  $('.questionContainer').empty();
  $('.next').remove();
  $('#pokemon-Img').remove();
  quizApp();
}

// end function to display results
function endOfQuiz() {
  $('#result').addClass('col12')
    .removeClass('col6');
  if (score >= 5) {
     $('#result').html(`<p>Congratulations you Answered ${score} out of 5. Red wants to be your rival!</p><button class="next finish blockMe" role="button">Next Stop the Elite 4, Retry?</button>`);
  } else if (score >= 3) {
     $('#result').html(`<p>Congratulations you Answered ${score} out of 5. Blue wants to be your rival!</p><button class="next finish blockMe" role="button">Try again to challenge Red?</button>`);
  } else {
      $('#result').html(`<p>Congratulations you Answered ${score} out of 5. You are worse than Ash without a pokedex</p><button class="next finish blockMe" role="button">You really need to Retry!</button>`);
  }
  $('#pokemon-Img').remove();
  handleEndOfQuizFinishButton();
}

// reload page to start over
function handleEndOfQuizFinishButton() {
  $('.finish').on('click', event => {
    location.reload();
  });
}


$(handleQuizApp);