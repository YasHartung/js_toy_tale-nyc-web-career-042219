const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
var toyArr = []
const URL = "http://localhost:3000/toys"
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
window.addEventListener("DOMContentLoaded", (event)=>{
  //elements
  const toyContainer = document.querySelector("#toy-collection")
  const sbmtToyBtn = document.querySelector("#submit-btn")
  
  //fetches
  const toyFetch = fetch(URL)
  .then(r => r.json())
  .then(data => {
    toyArr = data
    displayToys(toyArr);
  })

  //event listeners
  sbmtToyBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    newToyObj = {
      name: e.srcElement.form[0].value,
      image: e.srcElement.form[1].value,
      likes: 0
    }
    createToy(newToyObj);
  })
  toyContainer.addEventListener('click', (e)=>{
    if(e.target.dataset.type === "like"){
      addLikeId = e.target.dataset.id
      toyAddLike = toyArr.find(toy => toy.id == addLikeId)
      addLike(toyAddLike)

    }
  })
  //functions

  function displayToys(toys){
    toyContainer.innerHTML = toys.map(toy => {
      return `
      <div class="card" data-id="${toy.id}">
       <h2>${toy.name}</h2>
       <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" data-type="like" class="like-btn">Like <3</button>
      </div>
      `
    }).join("");
  }

  function createToy(newToyObj){
    fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToyObj)
    } ).then(r => r.json())
    .then(data => {
   
      toyArr.push(data)
    

      displayToys(toyArr);

    })
  }

  function addLike(toy){
   
    updatedLikes = toy.likes + 1
   
    fetch(`${URL}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: updatedLikes})
    })
    updateIndex = toyArr.findIndex(toyObj => toyObj.id == toy.id)
   
    toyArr[updateIndex].likes= updatedLikes;
    displayToys(toyArr);

  }
})