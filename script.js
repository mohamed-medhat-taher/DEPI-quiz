
    var quizDiv = document.getElementById("quizDiv");
    var alertName = document.getElementById("alertName");
    if (localStorage.getItem("sname")) {
        var studentName = localStorage.getItem("sname");
        alertName.innerHTML = "<h6>Welcome " + studentName + "</h6>";


        var questions = [
            {
                question: "To Declare Variable using ?",
                options: ["Dim", "Var", "int", "Declare"],
                answer: "Var"
            },
            {
                question: "To using conditions using?",
                options: ["loop", "for", "if", "while"],
                answer: "if"
            },
            {
                question: "To using loop using?",
                options: ["loop", "for", "if", "until"],
                answer: "for"
            },
            {
                question: "To using style using?",
                options: ["java", "php", "css", "Bootstrab"],
                answer: "css"
            }
        ];

        var currentQuestion = 0;
        var score = 0;
        var timer;
        var answers = [];
        var correctAnswers = [];

        function startQuiz() {
            if (currentQuestion < questions.length) {
                showQuestion(currentQuestion);
            } else {
                showResults();
            }
        }

        function showQuestion(index) {
            clearTimeout(timer);

            var question = questions[index];
            var questionHtml = `
                <h3>${question.question}</h3>
                <div id="timer">Time left: <span id="timerCount">10</span> seconds</div>
                <div id="options">
            `;

            question.options.forEach(function(option, i) {
                questionHtml += `
                    <div>
                        <input type="radio" id="option${i}" name="question${index}" value="${option}">
                        <label for="option${i}">${option}</label>
                    </div>
                `;
            });

            questionHtml += `
                </div>
                <button id="nextBtn" class="btn btn-primary mt-3">${index === questions.length - 1 ? 'Submit' : 'Next'}</button>
            `;

            quizDiv.innerHTML = questionHtml;

            document.getElementById("nextBtn").addEventListener("click", function() {
                if (index === questions.length - 1) {
                    submitQuiz();
                } else {
                    nextQuestion();
                }
            });

            var timerCount = 10;
            document.getElementById("timerCount").textContent = timerCount;
            timer = setInterval(function() {
                timerCount--;
                document.getElementById("timerCount").textContent = timerCount;
                if (timerCount <= 0) {
                    clearInterval(timer);
                    if (index === questions.length - 1) {
                        submitQuiz();
                    } else {
                        nextQuestion();
                    }
                }
            }, 1000);
        }

        function selectAnswer() {
            var selectedOption = document.querySelector(`input[name="question${currentQuestion}"]:checked`);
            var selectedAnswer = selectedOption ? selectedOption.value : "No answer";
            var question = questions[currentQuestion];
            var isCorrect = selectedAnswer === question.answer;

            if (isCorrect) {
                score++;
            }
            answers.push(selectedAnswer);
            correctAnswers.push(question.answer);
        }

        function nextQuestion() {
            selectAnswer();

            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                startQuiz();
            } else {
                submitQuiz();
            }
        }

        function submitQuiz() {
            selectAnswer();
            showResults();
        }

        function showResults() {
            var resultHtml = `
                <h3>Quiz Completed</h3>
                <p>Your score is: ${score} out of ${questions.length}</p>
                <h4>Quiz Report</h4>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Your Answer</th>
                            <th>Correct Answer</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (var i = 0; i < questions.length; i++) {
                var status = (answers[i] === correctAnswers[i]) ? "Correct" : "Incorrect";
                resultHtml += `
                    <tr>
                        <td>${questions[i].question}</td>
                        <td>${answers[i]}</td>
                        <td>${correctAnswers[i]}</td>
                        <td>${status}</td>
                    </tr>
                `;
            }

            resultHtml += `
                    </tbody>
                </table>
                <button id="printBtn" class="btn btn-primary mt-3">Print Report</button>
            `;

            quizDiv.innerHTML = resultHtml;

            var printBtn = document.getElementById("printBtn");
            printBtn.addEventListener("click", function() {
                window.print();
            });
        }

        startQuiz();
    }else{
        window.open("index.html", "_parent");
    }

