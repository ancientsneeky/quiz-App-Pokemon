function randomNoRepeats(array) {
  // call question from random
  let answerChoice = checkIfHasIndex(array);
  // unset answer called to false
  while (answerChoice !== undefined) {
    return randomQuestionGiven(answerChoice, array);
  }
}

function randomQuestionGiven(answerChoice, array) {
  let newQuestion = [answerChoice];
  const numberOfQuestionsWeWant = 3;
  while (newQuestion.length < numberOfQuestionsWeWant) {
    const decoy = randomSelect(array);

    if (newQuestion.length > 1 && decoy !== answerChoice) {
      if (decoy !== newQuestion[1]) {
        newQuestion.push(decoy);
      }
    } else if (decoy !== answerChoice) {
      newQuestion.push(decoy);
    }
  }
  return newQuestion;
}
// randomizer
function randomSelect(array) {
  const index = Math.floor(Math.random() * array.length);
  const item = array[index];
  return item;
}

//check if array exists and has obj
function checkIfHasIndex(array) {
  //create newVal from random function if Array objects contain a false
  for (let i = 0; i < array.length; i++) {
    if (array[i].questionCalled === false) {
      const newVal = randomSelect(array);
      return keepingTrack(newVal, array);
    }
    //best place to make a end of quiz I believe but for now we'll just call less than number of objects hard coded
  }

}

function keepingTrack(item, array) {
  if (item.questionCalled === false) {
    item.questionCalled = true;
    return item;
  } else if (item.questionCalled === true) {
    return checkIfHasIndex(array);
  } else {
    console.log('we should never get to this point');
  }
}

function shuffle(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    const i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function randomQuizQuestion() {
  const shuffleThis = randomNoRepeats(STORE);
  const answerBeforeshuffle = shuffleThis[0];
  return [answerBeforeshuffle, shuffle(shuffleThis)];
}

randomQuizQuestion();

