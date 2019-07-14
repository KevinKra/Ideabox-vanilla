const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const saveButton = document.querySelector(".save-button");
const mainOutput = document.querySelector(".main-output");
const increaseBtn = document.querySelector(".increase-quality");
const decreaseBtn = document.querySelector(".decrease-quality");

const ideasArray = [];

saveButton.addEventListener("click", e => {
  e.preventDefault();
  createCard();
});

const voteCard = (event, format) => {
  const targetId = event.target.parentNode.parentNode.id;
  const matchingIdea = ideasArray.filter(
    idea => idea.id === parseInt(targetId)
  );
  format === "upvote" ? determineQuality(matchingIdea[0], format) : null;
  format === "downvote" ? determineQuality(matchingIdea[0], format) : null;
};

const createCard = () => {
  const newIdea = new Idea(titleInput.value, bodyInput.value);
  ideasArray.push(newIdea);
  appendCard();
  console.log(ideasArray);
};

const appendCard = () => {
  mainOutput.innerHTML = "";
  ideasArray.forEach(idea => {
    insertCard(idea.title, idea.body, idea.id);
  });
};

function determineQuality(targetIdea, voteType) {
  console.log("firing 1");
  voteType === "downvote"
    ? downvoteConditional(targetIdea)
    : upvoteConditional(targetIdea);
}

function upvoteConditional(targetIdea) {
  if (targetIdea.quality === "Plausible") {
    targetIdea.updateQuality("Genius");
  }
  if (targetIdea.quality === "Swill") {
    targetIdea.updateQuality("Plausible");
  }
}

function downvoteConditional(targetIdea) {
  if (targetIdea.quality === "Plausible") {
    targetIdea.updateQuality("Swill");
  }
  if (targetIdea.quality === "Genius") {
    targetIdea.updateQuality("Plausible");
  }
}

function insertCard(title, body, id) {
  mainOutput.insertAdjacentHTML(
    "beforeend",
    `<article class="card" id=${id}><header>
    <button>STAR</button>
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
    <p>Quality:<span>Swill</span></p>
    <button class='decrease-quality' onclick="voteCard(event, 'downvote')">v</button>
  </footer>
  </article>`
  );
}
