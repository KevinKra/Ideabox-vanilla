const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const saveButton = document.querySelector(".save-button");
const mainOutput = document.querySelector(".main-output");

//sorting filter buttons
const filterSwill = document.querySelector("#filter-swill");
const filterPlausible = document.querySelector("#filter-plausible");
const filterGenius = document.querySelector("#filter-genius");
const filterFavorites = document.querySelector("#filter-favorites");
const filterAll = document.querySelector("#filter-all");

//search bar elements
const searchButton = document.querySelector("#primary-search-btn");

//add new quality
const newQualityButton = document.querySelector("#add-new-quality-btn");

let ideasArray = [];
let filteredIdeas = [];
retrieveLocalStorage();

//event listeners
saveButton.addEventListener("click", e => {
  e.preventDefault();
  createCard();
});

searchButton.addEventListener("click", e => {
  const query = e.target.nextElementSibling.value;
  searchFunctionality(query);
});

//adding new quality functionality
let qualityTypes = ["Swill", "Plausible", "Genius"];

function addNewQuality(qualityArray, newElement) {
  qualityArray.push(newElement);
}

newQualityButton.addEventListener("click", e => {
  e.preventDefault();
  const newQuality = e.target.previousElementSibling.value;
  addNewQuality(qualityTypes, newQuality);
});

filterSwill.addEventListener("click", () => {
  filterCards("quality", "Swill");
});
filterPlausible.addEventListener("click", () => {
  filterCards("quality", "Plausible");
});
filterGenius.addEventListener("click", () => {
  filterCards("quality", "Genius");
});
filterFavorites.addEventListener("click", () => {
  filterCards("favorite", true);
});
filterAll.addEventListener("click", () => {
  appendCards(ideasArray);
});

//searching functionality
function searchFunctionality(query) {
  const output = ideasArray.filter(idea => {
    return idea.title === query || idea.body === query;
  });
  filteredIdeas = output;
  appendCards(filteredIdeas);
}

//card sorting by quality
function filterCards(property, type) {
  const output = ideasArray.filter(card => {
    return card[property] === type;
  });
  filteredIdeas = output;
  appendCards(filteredIdeas);
}

//card appending functionality
const createCard = () => {
  const newIdea = new Idea(titleInput.value, bodyInput.value);
  ideasArray.push(newIdea);
  appendCards(ideasArray);
};

function appendCards(fromArray) {
  mainOutput.innerHTML = "";
  localStorage.setItem("storedIdeas", JSON.stringify(ideasArray));
  fromArray.forEach(idea => {
    insertCard(idea.title, idea.body, idea.id, idea.quality, idea.favorite);
  });
}

//localStorage interaction
function retrieveLocalStorage() {
  const savedIdeasArray = localStorage.getItem("storedIdeas");
  unboundIdeasArray = JSON.parse(savedIdeasArray);
  const boundIdeasArray = unboundIdeasArray.map(idea => {
    return Object.assign(new Idea(), idea);
  });
  ideasArray = boundIdeasArray;
  appendCards(ideasArray);
}

//card favoriting
const favoriteCard = event => {
  const targetIdea = targetThisIdeaCard(event);
  const matchingIdea = ideasArray.find(idea => {
    return idea.id === parseInt(targetIdea.id);
  });
  matchingIdea.toggleFavoriteCard();
  renderFavorited(matchingIdea, targetIdea);
  localStorage.setItem("storedIdeas", JSON.stringify(ideasArray));
};

const renderFavorited = (matchingIdea, targetIdea) => {
  matchingIdea.favorite === true
    ? updateIdeaFavorite(targetIdea, true)
    : updateIdeaFavorite(targetIdea, false);
};

const updateIdeaFavorite = (idea, status) => {
  status === true
    ? idea.classList.add("favorite")
    : idea.classList.remove("favorite");
};

//card removal
const removeCard = event => {
  const targetIdea = targetThisIdeaCard(event);
  const matchingIndex = ideasArray.findIndex(idea => {
    return idea.id === parseInt(targetIdea.id);
  });
  ideasArray.splice(matchingIndex, 1);
  appendCards(ideasArray);
};

//voting functionality
const voteCard = (event, format) => {
  const targetIdea = targetThisIdeaCard(event);
  const matchingIdea = ideasArray.find(
    idea => idea.id === parseInt(targetIdea.id)
  );
  format === "upvote" ? determineQuality(matchingIdea, format) : null;
  format === "downvote" ? determineQuality(matchingIdea, format) : null;
};

function determineQuality(targetIdea, voteType) {
  voteType === "downvote"
    ? downVoteCard(targetIdea, qualityTypes)
    : upVoteCard(targetIdea, qualityTypes);
  appendCards(ideasArray);
}

function upVoteCard(targetIdea, qualityTypes) {
  const qualityIndex = qualityTypes.indexOf(targetIdea.quality);
  if (qualityTypes[qualityIndex + 1])
    targetIdea.updateQuality(qualityTypes[qualityIndex + 1]);
}

function downVoteCard(targetIdea, qualityTypes) {
  const qualityIndex = qualityTypes.indexOf(targetIdea.quality);
  if (qualityTypes[qualityIndex - 1])
    targetIdea.updateQuality(qualityTypes[qualityIndex - 1]);
}

//misc functionality
function targetThisIdeaCard(event) {
  return event.target.parentNode.parentNode;
}

//card insertion
function initialClassNames(input) {
  if (input === true) return "favorite";
}

function insertCard(title, body, id, quality, favorite) {
  mainOutput.insertAdjacentHTML(
    "beforeend",
    `<article class="card ${initialClassNames(favorite)}" id=${id}><header>
    <button onclick="favoriteCard(event)">STAR</button>
    <button onclick="removeCard(event)">X</button>
  </header>
  <main>
    <h5>
      ${title}
    </h5>
    <p>
      ${body}
    </p>
  </main>
  <footer>
    <button class='increase-quality' onclick="voteCard(event, 'upvote')">^</button>
    <p>Quality:<span>${quality}</span></p>
    <button class='decrease-quality' onclick="voteCard(event, 'downvote')">v</button>
  </footer>
  </article>`
  );
}
