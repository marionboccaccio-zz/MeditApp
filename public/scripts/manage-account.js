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
