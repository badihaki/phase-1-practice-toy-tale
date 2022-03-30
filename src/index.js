let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  // my code below
  //
  setUpToys();
  document.querySelector('.submit').addEventListener('click',addNewToy);
  //
});

const toyURL = 'http://localhost:3000/toys';
const toyCollectionDiv = document.getElementById('toy-collection');

function setUpToys(){
  // make a get request to fetch all the toy obj
  fetch(toyURL).then(response => response.json()).then(data =>{
    // with the response data, make div element with a class of 'card' for each toy
    // add each toy to the toy-collection div
    for(i=0;i<data.length;i++){
      const toy = document.createElement('div');
      toy.className = 'card';
      toy.innerHTML = `
      <h2>${data[i]['name']}</h2>
      <img src = ${data[i]['image']} class = 'toy-avatar'/>
      <p>${data[i]['likes']} likes</p>
      `
      const likeButton = document.createElement('button');
      likeButton.innerText = 'Like!';
      likeButton.setClass = 'like-btn';
      likeButton.id = data[i]['id'];
      toy.appendChild(likeButton);
      // LIKE FUNCTIONALITY CAN BE DEFINED HERE~~~~~~~~~~~~~
      likeButton.addEventListener('click', ()=>{
        const newNumberOfLikes = Number(toy.querySelector('p').innerText[0])+1;
        fetch(`${toyURL}/${likeButton.id}`,{
          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": `${newNumberOfLikes} likes`
          })
        }).then(()=>{
          toy.querySelector('p').innerText = `${newNumberOfLikes} Likes`
        })
      });
      toyCollectionDiv.appendChild(toy);
      console.log(toy);
      toyCollectionDiv.appendChild(toy);
    }
    }
  );
}

function addNewToy(ev){
  /*
    A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
    If the post is successful, the toy should be added to the DOM without reloading the page.
  */
  ev.preventDefault();
  const toyName = document.getElementsByClassName('input-text')[0].value;
  const toyIMGurl = document.getElementsByClassName('input-text')[1].value;
  // console.log(`name: ${toyName}, img url: ${toyIMGurl}`);

  fetch(toyURL,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'name': toyName,
      'image': toyIMGurl,
      'likes': 0
    })
  }).then((data)=>{
    // add to DOM
    const toy = document.createElement('div');
    toy.className = 'card';
      toy.innerHTML = `
      <h2>${toyName}</h2>
      <img src = ${toyIMGurl} class = 'toy-avatar'/>
      <p>${0} likes</p>
      `

      const likeButton = document.createElement('button');
      likeButton.innerText = 'Like!';
      likeButton.setClass = 'like-btn';
      likeButton.id = Number(document.querySelectorAll('.card').length + 1);
      toy.appendChild(likeButton);
      // LIKE FUNCTIONALITY CAN BE DEFINED HERE~~~~~~~~~~~~~
      //likeButton.addEventListener('click', likeFunctionality);
      likeButton.addEventListener('click', ()=>{
        const newNumberOfLikes = Number(toy.querySelector('p').innerText[0])+1;
        fetch(`${toyURL}/${likeButton.id}`,{
          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": `${newNumberOfLikes} likes`
          })
        }).then(()=>{
          toy.querySelector('p').innerText = `${newNumberOfLikes} Likes`
        })
      });
      toyCollectionDiv.appendChild(toy);
      console.log(toy);
  }
  )
}

// end