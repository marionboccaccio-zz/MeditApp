// import apiService from "/APIHandler";

const inputs = document.querySelectorAll("input");
const submitBtn = document.getElementById("submitBtn");

function submit(id) {
  const updateUser = {};
  inputs.forEach(input => {
    var propriete = input.getAttribute("name");
    var value = input.value;
    updateUser[`${propriete}`] = value;
  });
  axios
    .post(`/edit-account/${id}`, updateUser)
    .then(apiRes => console.log(apiRes))
    .catch(err => console.log(err));
}

submitBtn.onclick = () => submit(submitBtn.getAttribute("data-id"));

// for (let i = 0; i < btnEdit.length; i++) {
//   btnEdit[i].onclick = e => {
//     const inputData = e.target.previousElementSibling;
//     console.log(user);
//     inputData.focus = e => {
//       inputData.addEventListener("keydown", event => {
//         if (event.keyCode === 13) {
//           event.preventDefault();
//           inputData.blur();
//           axios
//             .patch(`/edit-account/${user.id}`, {
//               name: inputData.textContent.trim()
//             })
//             .then(apiRes => console.log(apiRes))
//             .catch();
//         }
//       });
//     };
//   };
// }
