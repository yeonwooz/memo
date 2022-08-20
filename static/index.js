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
  //  TODO: DELETE 메서드로 구현
  const card = document.querySelector(".card");
  console.log(card);
  const urlEncodedData = `id=${card.id}`;

  const url = "/delete-memo";
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = () => {
    console.log("status:", xhttp.readyState, xhttp.status);
    if (xhttp.status === 200) {
      if (xhttp.readyState === 4) {
        let result = xhttp.response;
        console.log("deleted", result);
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
  //   document.querySelector('[id="63006fc8c62de151052d822e"]')
  // const card = document.querySelector(`[id="${id}"]`);
  const viewModeSelector = `[id="${id}"] > .view-mode`;
  const editModeSelector = `[id="${id}"] > .edit-mode`;
  document.querySelector(viewModeSelector).classList.add("hide");
  document.querySelector(editModeSelector).classList.remove("hide");
}

function hidePatchEditor(target) {
  const id = target.path[3].id;
  //   document.querySelector('[id="63006fc8c62de151052d822e"]')
  // const card = document.querySelector(`[id="${id}"]`);
  const viewModeSelector = `[id="${id}"] > .view-mode`;
  const editModeSelector = `[id="${id}"] > .edit-mode`;
  document.querySelector(viewModeSelector).classList.remove("hide");
  document.querySelector(editModeSelector).classList.add("hide");
}

function patchContent() {
  //   // const id =
  //   const title = document.querySelector(".mod-title").value;
  //   const text = document.querySelector(".mod-text").value;
  //   if (title.length === 0 && text.length === 0) return;
  //   const params = {
  //     title: title,
  //     text: text,
  //   };
  //   const urlEncodedDataPairs = [];
  //   for (let name in params) {
  //     urlEncodedDataPairs.push(
  //       encodeURIComponent(name) + "=" + encodeURIComponent(params[name])
  //     );
  //   }
  //   const urlEncodedData = urlEncodedDataPairs.join("&");
  //   const url = "/memo";
  //   xhttp.open("POST", url, true);
  //   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  //   xhttp.onreadystatechange = () => {
  //     console.log("status:", xhttp.readyState, xhttp.status);
  //     if (xhttp.status === 200) {
  //       if (xhttp.readyState === 4) {
  //         let result = xhttp.response;
  //         attachContent(result);
  //         document.querySelector("#input-title").value = "";
  //         document.querySelector("#input-text").value = "";
  //       }
  //     } else {
  //       console.log("ERROR");
  //     }
  //   };
  //   xhttp.send(urlEncodedData);
}
