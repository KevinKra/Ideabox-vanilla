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

function findMe(event) {
  // console.log("this", this);
  console.log("this", event.target.parentNode.parentNode);
}

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
    <button class='increase-quality' onclick="findMe(event)">^</button>
    <p>Quality:<span>Swill</span></p>
    <button class='decrease-quality'>v</button>
  </footer>
  </article>`
  );
}
