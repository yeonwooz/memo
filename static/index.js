main();
function main() {
  console.log("file loaded");

  document.querySelector("button").addEventListener("click", postArticle);
}

function postArticle() {
  const url = "/memo";
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = () => {
    console.log("status:", xhttp.readyState, xhttp.status);
    if (xhttp.status === 200) {
      if (xhttp.readyState === 4) {
        let result = xhttp.response;
        console.log(result);
      }
    } else {
      alert("ERROR");
    }
  };
  xhttp.send(null);

  console.log("posted");
  // TODO ajax
}
