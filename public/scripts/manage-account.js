import apiService from "./APIHandler";

const btnEdit = document.getElementsByClassName("btn-edit");

btnEdit.forEach(
  b =>
    (b.onclick = e => {
      const inputData = e.target.getAttribute("content-box");
      inputData.onfocus = e => {
        inputData.addEventListener("keydown", event => {
          if (event.keyCode === 13) {
            event.preventDefault();
            inputData.blur();
            axios
              .patch(`/edit-account/${user.id}`, {
                name: inputData.textContent.trim()
              })
              .then(apiRes => console.log(apiRes))
              .catch();
          }
        });
      };
    })
);
