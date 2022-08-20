function render(results) {
  const area = document.querySelector("#card-list");
  let html = "";
  const contents = JSON.parse(JSON.parse(results).contents);

  for (let { _id, title, text } of contents) {
    html += `
    <div id="${_id}" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${text}</p>
        <div class="d-flex flex-row ">
            <button type="submit" class="btn btn-primary">수정</button>
            <button id="delete-card-item" type="submit" class="btn btn-primary ml-2">삭제</button>
        </div>
       </div>
      </div>
    `;
  }

  area.innerHTML = html;
}

export default render;
