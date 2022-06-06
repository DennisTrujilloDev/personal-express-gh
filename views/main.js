const ul = document.querySelector("ul");
// const tempType = document.querySelector("#tempDiv");
// const sweetType = document.querySelector("#sweetDiv");
const listItem = document.querySelectorAll('li')

const deleteIt = document.querySelector("#delete")
//delete button
const complete = document.querySelector("#complete")
//complete order button

// tempType.addEventListener('click', tempTypeChosen)
// sweetType.addEventListener('click', sweetTypeChosen)


// listItem.addEventListener('click', update)
  Array.from(listItem).forEach((ele)=>{
    ele.addEventListener('click', updateLI)
  })
  function updateLI(e){
    let itemID = e.target.getAttribute('data-id')
  fetch('updateOrder', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'id': itemID
    })
  }).then(function (response) {
    console.log(response);
    window.location.reload()
  })
}




deleteIt.addEventListener('click', deleteThem)

function deleteThem(){
  const listItem = document.querySelectorAll('li')
  let IDsToDelete = []
  Array.from(listItem).forEach((ele)=>{
    IDsToDelete.push(ele.getAttribute('data-id'))
  })
  
  fetch('deleteEm', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'id': IDsToDelete.join(';')
    })
  }).then(function (response) {
    console.log(response);
    window.location.reload()
  })
};



drinkType.addEventListener('click', drinkTypeChosen)

function drinkTypeChosen(e){
  if(e.target.classList.contains("chosen")){
      const nameOfDrinkType = e.target.innerText
      fetch('addItem', { 
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': nameOfDrinkType
        })
      }).then(function (response) {
        window.location.reload()
      })
    }
}



// probs not necessary
// function sendOrder(e){
//     const receiptText = e.target.nextElementSibling.nextElementSibling.innerText
//     console.log(receiptText);
//     //innerText?
//       fetch('orderDone', { //connected to delete method
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'sweet': nameOfSweet

//         })
//       }).then(function (response) {
//         window.location.reload()
//       })

// }

// function deleteThem(e){
//       // fetch('delete', {
//         fetch('order', {
//         method: 'delete',
//       }).then(function (response) {
//         window.location.reload()
//       })
// }

// function sweetTypeChosen(e){
//   if(e.target.classList.contains("sweetHere")){
//       const nameOfSweet = e.target.innerText
//       fetch('addSweet', { 
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'sweet': nameOfSweet
//         })
//       }).then(function (response) {
//         window.location.reload()
//       })
//     }
// }



// function tempTypeChosen(e){
//   if(e.target.classList.contains("isIt")){
//       const nameOfTempType = e.target.innerText
//       fetch('addTemp', {
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'temp': nameOfTempType
//         })
//       }).then(function (response) {
//         window.location.reload()
//       })
//     }
// }
// function drinkTypeChosen(e){
//   if(e.target.classList.contains("chosen")){
//       const nameOfDrinkType = e.target.innerText
//       fetch('addItem', { 
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'name': nameOfDrinkType
//         })
//       }).then(function (response) {
//         window.location.reload()
//       })
//     }
// }


// const thumbUp = document.getElementsByClassName("fa-thumbs-up");
// const trash = document.getElementsByClassName("fa-trash");
// const thumbDown = document.getElementsByClassName('fa-thumbs-down')
// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const likes = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('thumbsUp', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'likes':likes,
//             'action': 'like'
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const likes = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('thumbsDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'likes': likes,
//         'action': 'dislike'
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });
// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });