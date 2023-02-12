const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profilePopup = document.querySelector(".profile-popup");
const cardPopup = document.querySelector(".card-popup");
const viewingPopup = document.querySelector(".viewing-popup");
const profileEditBtn = document.querySelector(".profile__edit-button");
const closeProfilePopupBtn = document.querySelector(".profile-popup__close");
const closeCardPopupBtn = document.querySelector(".card-popup__close");
const closeViewingPopupBtn = document.querySelector(".viewing-popup__close");
const inputProfilePopupName = document.querySelector(".popup__input_name-profile");
const inputProfilePopupSubname = document.querySelector(".popup__input_subname-profile");
const titleProfile = document.querySelector(".profile__title");
const subtitleProfile = document.querySelector(".profile__subtitle");
const profilePopupForm = document.querySelector(".profile-popup__form");
const addCardBtn = document.querySelector(".profile__add-button");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfilePopupForm() {
  inputProfilePopupName.value = titleProfile.textContent;
  inputProfilePopupSubname.value = subtitleProfile.textContent;
  openPopup(profilePopup);
}
function saveEditProfileBtn(evt) {
  evt.preventDefault();
  titleProfile.textContent = inputProfilePopupName.value;
  subtitleProfile.textContent = inputProfilePopupSubname.value;
  closePopup(profilePopup);
}
function closeProfilePopupForm() {
  closePopup(profilePopup);
}

profilePopupForm.addEventListener('submit', saveEditProfileBtn);
profileEditBtn.addEventListener("click", openProfilePopupForm);
closeProfilePopupBtn.addEventListener("click", closeProfilePopupForm);

function openCardPopupForm() {
  openPopup(cardPopup);
}
function closeCardPopupForm() {
  closePopup(cardPopup);
}

addCardBtn.addEventListener("click", openCardPopupForm);
closeCardPopupBtn.addEventListener("click", closeCardPopupForm);

const elementsCard = document.querySelector(".elements");
const popupImages = document.querySelector(".viewing-popup__image");
const titlePopupImg = document.querySelector(".viewing-popup__title");
const elementForm = document.querySelector(".card-popup__form");
const cardProfileInputName = document.querySelector(".popup__input_name-card");
const cardProfileInputLink = document.querySelector(".popup__input_link-card");
const template = document.querySelector(".element").content.querySelector(".elements__element");

elementForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = createCard({ name: cardProfileInputName.value, link: cardProfileInputLink.value });
  elementsCard.prepend(card);
  evt.target.reset();
  closePopup(cardPopup);
})

function createCard(item) {
  const card = template.cloneNode(true);
  const elementImage = card.querySelector(".elements__image");
  const elementsTitle = card.querySelector(".elements__title");
  const likeClick = card.querySelector(".elements__like");
  const deleteCardBtn = card.querySelector(".elements__delete-btn");

  elementsTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;

  deleteCardBtn.addEventListener("click", () => {
    card.remove();
  })

  likeClick.addEventListener("click", () => {
    likeClick.classList.toggle("elements__like_enable");
  })

  elementImage.addEventListener("click", () => {
    openPopup(viewingPopup);
    popupImages.src = item.link;
    popupImages.alt = item.name;
    titlePopupImg.textContent = item.name;
  })

  return card;
}

function renderCards(item) {
  const cards = initialCards.map((item) => {
    return createCard(item);
  })
  elementsCard.prepend(...cards)
}

function closePopupImg() {
  closePopup(viewingPopup);
}
closeViewingPopupBtn.addEventListener("click", closePopupImg);

renderCards();
