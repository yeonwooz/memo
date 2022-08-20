main();
function main() {
  console.log("file loaded");
  getContents();

  document
    .querySelector("#post-article-btn")
    .addEventListener("click", postContent);
}

function getContents() {

}

function postContent() {
  const title = document.querySelector("#input-title").value;
  const text = document.querySelector("#input-text").value;
  if (title.length === 0 && text.length === 0) return;
  const params = {
    title: title,
    text: text,
  };
  console.log(params);
  const urlEncodedDataPairs = [];

  for (let name in params) {
    urlEncodedDataPairs.push(
      encodeURIComponent(name) + "=" + encodeURIComponent(params[name])
    );
  }
  const urlEncodedData = urlEncodedDataPairs.join("&");

  const url = "/memo";
  const xhttp = new XMLHttpRequest();
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
      alert("ERROR");
    }
  };
  xhttp.send(urlEncodedData);

  console.log("posted");
}

function attachContent(result) {
  console.log(result);

//  TODO: attach 
}
