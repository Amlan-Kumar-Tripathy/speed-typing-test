let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let options = {
    method: "GET",
}

let count = 0;

let url = "https://apis.ccbp.in/random-quote";

fetch(url, options)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonObject) {
        quoteDisplayEl.textContent = jsonObject.content;
    });

let intervalId = setInterval(function() {
    timerEl.textContent = count;
    count = count + 1;
}, 1000);

submitBtnEl.addEventListener("click", function() {

    if (quoteInputEl.value === "" || quoteInputEl.value !== quoteDisplayEl.textContent) {
        resultEl.textContent = "You typed incorrect sentence";
    } else {
        clearInterval(intervalId);
        resultEl.textContent = "You typed in " + timerEl.textContent + " seconds";
    }
});

resetBtnEl.addEventListener("click", function() {
    spinnerEl.classList.remove("d-none");
    count = 0;
    quoteInputEl.value = "";
    resultEl.textContent = "";


    clearInterval(intervalId);

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonObject) {
            quoteDisplayEl.textContent = jsonObject.content;
            spinnerEl.classList.add("d-none");
        });

    intervalId = setInterval(function() {
        timerEl.textContent = count;
        count = count + 1;
    }, 1000);


});