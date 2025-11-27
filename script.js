var WIKI_BASE_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

var weirdAlTopics = [
  { id: "Weird_Al_Yankovic", label: "Weird Al Yankovic (person)" },
  { id: "Dare_to_Be_Stupid", label: "Dare to Be Stupid (album)" },
  { id: "Amish_Paradise", label: "Amish Paradise (song)" },
  { id: "Eat_It", label: "Eat It (song)" },
  { id: "Smells_Like_Nirvana", label: "Smells Like Nirvana (song)" },
  { id: "Bad_Hair_Day", label: "Bad Hair Day (album)" },
  { id: "Mandatory_Fun", label: "Mandatory Fun (album)" },
  { id: "The_Saga_Begins", label: "The Saga Begins (song)" }
];

var topicSelect = document.getElementById("topic-select");
var topicForm = document.getElementById("topic-form");
var randomButton = document.getElementById("random-button");
var resultSection = document.getElementById("result");

function init() {
  populateTopicOptions();
  topicForm.addEventListener("submit", handleFormSubmit);
  randomButton.addEventListener("click", handleRandomClick);
  showStatusMessage("Pick a Weird Al topic or click Random to start.");
}

function populateTopicOptions() {
  var placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "-- Choose a Weird Al topic --";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  topicSelect.appendChild(placeholderOption);

  var i;
  for (i = 0; i < weirdAlTopics.length; i++) {
    var topic = weirdAlTopics[i];
    var option = document.createElement("option");
    option.value = topic.id;
    option.textContent = topic.label;
    topicSelect.appendChild(option);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  var selectedId = topicSelect.value;

  if (!selectedId) {
    showStatusMessage("Please choose a Weird Al topic first.");
    return;
  }

  fetchWeirdAlSummary(selectedId);
}

function handleRandomClick() {
  var randomIndex = Math.floor(Math.random() * weirdAlTopics.length);
  var topic = weirdAlTopics[randomIndex];

  topicSelect.value = topic.id;
  fetchWeirdAlSummary(topic.id);
}

function fetchWeirdAlSummary(pageTitle) {
  var url = WIKI_BASE_URL + pageTitle;

  showStatusMessage("Loading Weird Al fact...");

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then(function (data) {
      renderFactCard(data);
    })
    .catch(function () {
      showErrorMessage("Sorry, there was a problem loading this Weird Al fact.");
    });
}

function renderFactCard(data) {
  resultSection.innerHTML = "";

  var card = document.createElement("article");
  card.className = "fact-card";

  var imageWrapper = document.createElement("div");
  var imageElement = document.createElement("img");

  if (data.thumbnail && data.thumbnail.source) {
    imageElement.src = data.thumbnail.source;
    imageElement.alt = data.title + " thumbnail image";
  } else {
    imageElement.alt = "No image available";
    imageElement.style.backgroundColor = "#dddddd";
    imageElement.style.height = "120px";
  }

  imageWrapper.appendChild(imageElement);
  card.appendChild(imageWrapper);

  var textWrapper = document.createElement("div");

  var titleElement = document.createElement("h2");
  titleElement.textContent = data.title;
  textWrapper.appendChild(titleElement);

  if (data.description) {
    var descriptionElement = document.createElement("p");
    descriptionElement.className = "description";
    descriptionElement.textContent = data.description;
    textWrapper.appendChild(descriptionElement);
  }

  if (data.extract) {
    var extractElement = document.createElement("p");
    extractElement.className = "extract";
    extractElement.textContent = data.extract;
    textWrapper.appendChild(extractElement);
  }

  if (data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page) {
    var linkElement = document.createElement("a");
    linkElement.href = data.content_urls.desktop.page;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.textContent = "View full article on Wikipedia";
    textWrapper.appendChild(linkElement);
  }

  card.appendChild(textWrapper);
  resultSection.appendChild(card);
}

function showStatusMessage(messageText) {
  resultSection.innerHTML = "";

  var message = document.createElement("p");
  message.className = "status-message";
  message.textContent = messageText;

  resultSection.appendChild(message);
}

function showErrorMessage(messageText) {
  resultSection.innerHTML = "";

  var message = document.createElement("p");
  message.className = "status-message status-message--error";
  message.textContent = messageText;

  resultSection.appendChild(message);
}

init();



function randomUglyColor() {
  var uglyColors = [
    "#ff00ff", "#00ff00", "#ffff00", "#ff9900",
    "#00ffff", "#ff0000", "#ff66ff", "#00ff99",
    "#ff0066", "#ccff00"
  ];
  var index = Math.floor(Math.random() * uglyColors.length);
  return uglyColors[index];
}

window.addEventListener("load", function () {
  // ===== SPLASH ELEMENTS =====
  var splash = document.getElementById("splash-screen");
  var splashText = document.getElementById("splash-text");
  var startButton = document.getElementById("start-button");

  if (splash && splashText && startButton) {
    var sx = 50;
    var sy = 50;
    var svx = 4;
    var svy = 3;

    function moveSplashText() {
      var cRect = splash.getBoundingClientRect();
      var tRect = splashText.getBoundingClientRect();

      sx += svx;
      sy += svy;

      if (sx <= 0 || sx + tRect.width >= cRect.width) {
        svx = -svx;
        splashText.style.color = randomUglyColor();
      }
      if (sy <= 0 || sy + tRect.height >= cRect.height) {
        svy = -svy;
        splashText.style.color = randomUglyColor();
      }

      splashText.style.left = sx + "px";
      splashText.style.top = sy + "px";
    }

    setInterval(moveSplashText, 16);
    setInterval(function () {
      splashText.style.color = randomUglyColor();
    }, 700);
    splashText.style.color = randomUglyColor();

    // Show main app on START
    startButton.addEventListener("click", function () {
      splash.style.display = "none";
      var mainWrapper = document.getElementById("main-wrapper");
      if (mainWrapper) {
        mainWrapper.style.display = "block";
      }
    });
  }

  
});
