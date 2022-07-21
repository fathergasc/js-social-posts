const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

const containerDom = document.getElementById("container");
const profilePicDiv = document.getElementById("profile-pic-div");

// creates the posts in the DOM with the correct data
posts.forEach((element) => {
  containerDom.innerHTML += `<div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div id="profile-pic-div" class="post-meta__icon">
                    ${generateAvatar(element.author.image,element.author.name)}             
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${element.author.name}</div>
                    <div class="post-meta__time">${YMDtoDMYdate(element.created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${element.content}</div>
        <div class="post__image">
            <img src="${element.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${
                      element.id
                    }">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${
                      element.id
                    }" class="js-likes-counter">${element.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>`;
});

const likeBtn = document.getElementsByClassName("js-like-button");
console.log("likeBtn: ", likeBtn);
const likesCounter = document.getElementsByClassName("js-likes-counter");
console.log("likesCounter: ", likesCounter);

const likedPosts = [];

// The function adds an event listener on all the like buttons. If a like button is clicked, it toggles .like-button--liked class on the button, adds 1 to the likes counter and pushes the postid in an array to keep track of liked posts (only if not already present in it). If the button has been already clicked, it removes the class and subtracts 1 from the likes counter.
likeBtnClick(likeBtn, likesCounter, likedPosts);

console.log("likedPosts: ", likedPosts);

// FUNCTIONS

function likeBtnClick(elementsArray, countersArray, arrayToStoreLikedPosts) {
  for (let i = 0; i < elementsArray.length; i++) {
    elementsArray[i].addEventListener("click", function (event) {
      event.preventDefault(); //prevents the empty <a> tag from jumping to the top of the page
      if (elementsArray[i].classList.contains("like-button--liked")) {
        countersArray[i].innerHTML = parseInt(countersArray[i].innerHTML) - 1;
      } else {
        countersArray[i].innerHTML = parseInt(countersArray[i].innerHTML) + 1;
      }
      elementsArray[i].classList.toggle("like-button--liked");

      if (!arrayToStoreLikedPosts.includes(elementsArray[i].dataset.postid)) {
        arrayToStoreLikedPosts.push(elementsArray[i].dataset.postid); // prevents duplicates IDs in the array
      } else {
        arrayToStoreLikedPosts.splice(
          arrayToStoreLikedPosts.indexOf(elementsArray[i].dataset.postid),
          1
        );
      } // removes the ID from the array
      console.log("arrayToStoreLikedPosts: ", arrayToStoreLikedPosts);
    });
  }
}

//converts a date in YYYY-MM-DD format to DD/MM/YYYY format
function YMDtoDMYdate(dateString) {
  dateString = dateString.split("-").reverse().join("/");
  return dateString;
}

//changes the class of the div containing the profile picture based on the presence of an image in posts.author.image.
function profilePicDefault(imageString) {
  if (imageString == null) {
    return "profile-pic-default";
  } else {
    return "profile-pic";
  }
}

//it returns the first letters of the name of the author of the post 
function firstLetters(nameString) {
  const arrayFromString = nameString.split(" ");
  const firstLetters = arrayFromString.map((word) => word[0]);
  let firstLettersJoin = firstLetters.join("");
  return firstLettersJoin;
}

//generates the div or the img tag containing the profile picture or the first letters of the name of the author of the post based on the presence of an image in posts.author.image.
function generateAvatar(imageString, nameString) {
  if (imageString == null) {
    return `<div class="profile-pic-default">${firstLetters(nameString)}</div>`;
  } else {
    return `<img class="profile-pic" src="${imageString}" alt="${nameString}">`;
  }
}
