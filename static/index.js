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

function deleteContent() {
  const card = document.querySelector(".card");
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

function getContents() {
  const url = "/memo-list";
  xhttp.open("GET", url);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (xhttp.readyState === 4) {
          let result = xhttp.response;
          render(result);
          if (document.querySelector("#delete-card-item")) {
            document
              .querySelector("#delete-card-item")
              .addEventListener("click", deleteContent);
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
