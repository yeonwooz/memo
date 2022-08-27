import render from "./render.js";
import attachContent from "./attachContent.js";

const xhttp = new XMLHttpRequest();

main();

function main() {
  console.log("file loaded");
  getContents();

  document
    .querySelector("#post-article-btn")
    .addEventListener("click", postContent);
}

function getContents() {
  const url = "/memo-list";
  xhttp.open("GET", url);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (xhttp.readyState === 4) {
          let result = xhttp.response;
          render(result);
          const deleteButtons = document.querySelectorAll(".delete-card-item");
          for (let element of deleteButtons) {
            element.addEventListener("click", deleteContent);
          }

          const editbuttons = document.querySelectorAll(".patch-card-item");
          for (let element of editbuttons) {
            element.addEventListener("click", openPatchEditor);
          }

          const savePatchButtons = document.querySelectorAll(".save-patch");

          for (let element of savePatchButtons) {
            element.addEventListener("click", patchContent);
            element.addEventListener("click", hidePatchEditor);
          }
        }
      }
      if (this.status == 404) {
        document.body.innerHTML = "Page not found.";
      }
    }
  };

  xhttp.send(null);
}

function postContent() {
  const title = document.querySelector("#input-title").value;
  const text = document.querySelector("#input-text").value;
  if (title.length === 0 && text.length === 0) return;
  const params = {
    title: title,
    text: text,
  };

  const urlEncodedDataPairs = [];

  for (let name in params) {
    urlEncodedDataPairs.push(
      encodeURIComponent(name) + "=" + encodeURIComponent(params[name])
    );
  }
  const urlEncodedData = urlEncodedDataPairs.join("&");

  const url = "/memo";
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = () => {
    console.log("status:", xhttp.readyState, xhttp.status);
    if (xhttp.status === 200) {
      if (xhttp.readyState === 4) {
        let result = xhttp.response;
        attachContent(result);
        location.reload();
        document.querySelector("#input-title").value = "";
        document.querySelector("#input-text").value = "";
      }
    } else {
      console.log("ERROR");
    }
  };
  xhttp.send(urlEncodedData);
}

function deleteContent() {
  //  TODO: 가장 최근에 추가한 아이템 삭제 구현,
  const card = document.querySelector(".card");
  console.log(card);
  const urlEncodedData = `id=${card.id}`;

  const url = `/delete-memo/${card.id}`;
  xhttp.open("DELETE", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = () => {
    console.log("status:", xhttp.readyState, xhttp.status);
    if (xhttp.status === 200) {
      if (xhttp.readyState === 4) {
        let result = xhttp.response;
        location.reload();
      }
    } else {
      console.log("ERROR");
    }
  };
  xhttp.send(urlEncodedData);
}

function openPatchEditor(target) {
  const id = target.path[3].id;
  const viewModeSelector = `[id="${id}"] > .view-mode`;
  const editModeSelector = `[id="${id}"] > .edit-mode`;
  document.querySelector(editModeSelector).classList.remove("hide");
  document.querySelector(viewModeSelector).classList.add("hide");

  const titleSelector = `[id="${id}"] > .edit-mode > div > div > .mod-title`;
  const textSelector = `[id="${id}"] > .edit-mode > div > div > .mod-text`;

  document.querySelector(titleSelector).placeholder = document.querySelector(
    `[id="${id}"] > .view-mode > .card-title`
  ).innerHTML;
  document.querySelector(textSelector).placeholder = document.querySelector(
    `[id="${id}"] > .view-mode > .card-text`
  ).innerHTML;
}

function hidePatchEditor(target) {
  const id = target.path[3].id;
  const viewModeSelector = `[id="${id}"] > .view-mode`;
  const editModeSelector = `[id="${id}"] > .edit-mode`;
  document.querySelector(viewModeSelector).classList.remove("hide");
  document.querySelector(editModeSelector).classList.add("hide");
}

function patchContent(target) {
  const id = target.path[3].id;
  const titleSelector = `[id="${id}"] > .edit-mode > div > div > .mod-title`;
  const textSelector = `[id="${id}"] > .edit-mode > div > div > .mod-text`;
  const title = document.querySelector(titleSelector).value;
  const text = document.querySelector(textSelector).value;
  console.log(title, text);
  if (title.length === 0 && text.length === 0) return;
  const params = {
    id: id,
    title: title,
    text: text,
  };
  const urlEncodedDataPairs = [];
  for (let name in params) {
    urlEncodedDataPairs.push(
      encodeURIComponent(name) + "=" + encodeURIComponent(params[name])
    );
  }
  const urlEncodedData = urlEncodedDataPairs.join("&");
  const url = `/patch-memo/${id}`;
  xhttp.open("PUT", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = () => {
    console.log("status:", xhttp.readyState, xhttp.status);
    if (xhttp.status === 200) {
      if (xhttp.readyState === 4) {
        location.reload();
      }
    } else {
      console.log("ERROR");
    }
  };
  xhttp.send(urlEncodedData);
}
