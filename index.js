


const questions = [
    {
      id: 1,
      text: "How satisfied are you with our products?",
      type: "rating",
      min: 1,
      max: 5
    },
    {
      id: 2,
      text: "How fair are the prices compared to similar retailers?",
      type: "rating",
      min: 1,
      max: 5
    },
    {
      id: 3,
      text: "How satisfied are you with the value for money of your purchase?",
      type: "rating",
      min: 1,
      max: 5
    },
    {
      id: 4,
      text:
        "how likely are you to recommend us to your friends and family?",
      type: "rating",
      min: 1,
      max: 10
    },
    { id: 5, text: "What could we do to improve our service?", type: "text" }
  ];
  
  // Current survey state
  let currentQuestion = 0;
  let surveyData = [];
  
  // Initialize survey
  function startSurvey() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("survey-screen").style.display = "block";
    showQuestion(currentQuestion);
  }
  
  // Show current question
  function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    document.getElementById("question-number").textContent = `${
      questionIndex + 1
    }/${questions.length}`;
    document.getElementById("question").textContent = question.text;
  
    if (question.type === "rating") {
      let answerHtml = "";
      for (let i = question.min; i <= question.max; i++) {
        answerHtml += `<label><input type="radio" name="answer" value="${i}">${i}</label>`;
      }
      document.getElementById("answers").innerHTML = answerHtml;
    } else if (question.type === "text") {
      document.getElementById(
        "answers"
      ).innerHTML = `<input type="text" name="answer">`;
    }
  }
 
  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
    }
  }
  
  function nextQuestion() {
    const answer = getAnswer();
    if (answer !== null) {
      saveAnswer(answer);
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
      } else {
        document.getElementById("survey-screen").style.display = "none";
        document.getElementById("confirmation-screen").style.display = "block";
      }
    }
  }
  
  
  function saveAnswer(answer) {
    const question = questions[currentQuestion];
    const answerData = {
      questionId: question.id,
      answer: answer
    };
    surveyData.push(answerData);
  }

  function getAnswer() {
    const question = questions[currentQuestion];
    if (question.type === "rating") {
      const selectedOption = document.querySelector(
        'input[name="answer"]:checked'
      );
      if (selectedOption) {
        return parseInt(selectedOption.value);
      }
    } else if (question.type === "text") {
      return document.querySelector('input[name="answer"]').value.trim();
    }
    return null;
  }
  

  function submitSurvey() {
    
    localStorage.setItem("surveyCompleted", "true");
  
 
    currentQuestion = 0;
    surveyData = [];
  
    document.getElementById("confirmation-screen").style.display = "none";
    document.getElementById("welcome-screen").style.display = "block";
    setTimeout(function () {
      startSurvey();
    }, 5000);
  }

