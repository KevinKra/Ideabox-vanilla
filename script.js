const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const saveButton = document.querySelector(".save-button");
const mainOutput = document.querySelector(".main-output");
// const increaseBtn = document.querySelector(".increase-quality");
// const decreaseBtn = document.querySelector(".decrease-quality");

const ideasArray = [];

saveButton.addEventListener("click", e => {
  e.preventDefault();
  createCard();
});

//card appending functionality
const createCard = () => {
  const newIdea = new Idea(titleInput.value, bodyInput.value);
  ideasArray.push(newIdea);
  appendCards();
};

const appendCards = () => {
  mainOutput.innerHTML = "";
  console.log(ideasArray);
  ideasArray.forEach(idea => {
    insertCard(idea.title, idea.body, idea.id, idea.quality, idea.favorite);
  });
};

//card favoriting
const favoriteCard = event => {
  const targetIdea = event.target.parentNode.parentNode;
  const matchingIdea = ideasArray.find(idea => {
    return idea.id === parseInt(targetIdea.id);
  });
  matchingIdea.toggleFavoriteCard();
  renderFavorited(matchingIdea, targetIdea);
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

//voting functionality
const voteCard = (event, format) => {
  const targetId = event.target.parentNode.parentNode.id;
  const matchingIdea = ideasArray.filter(
    idea => idea.id === parseInt(targetId)
  );
  format === "upvote" ? determineQuality(matchingIdea[0], format) : null;
  format === "downvote" ? determineQuality(matchingIdea[0], format) : null;
};

function determineQuality(targetIdea, voteType) {
  voteType === "downvote" ? downVoteCard(targetIdea) : upVoteCard(targetIdea);
  appendCards();
}

function upVoteCard(targetIdea) {
  if (targetIdea.quality === "Plausible") {
    targetIdea.updateQuality("Genius");
  }
  if (targetIdea.quality === "Swill") {
    targetIdea.updateQuality("Plausible");
  }
}

function downVoteCard(targetIdea) {
  if (targetIdea.quality === "Plausible") {
    targetIdea.updateQuality("Swill");
  }
  if (targetIdea.quality === "Genius") {
    targetIdea.updateQuality("Plausible");
  }
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
    <button>X</button>
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
