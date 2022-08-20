function render(results) {
  const area = document.querySelector("#card-list");
  let html = "";
  const contents = JSON.parse(JSON.parse(results).contents);

  for (let { _id, title, text } of contents) {
    html += `
    <div id="${_id}" class="card mb-3">
      <div class="card-body view-mode">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${text}</p>
        <div class="d-flex flex-row ">
            <button type="submit" class="patch-card-item btn btn-primary">수정</button>
            <button type="submit" class="delete-card-item btn btn-primary ml-2">삭제</button>
        </div>
       </div>
       <div class="card-body edit-mode hide">
       <div>
           <div class="form-group">
               <input class="form-control mod-title">
           </div>
           <div class="form-group">
               <textarea class="form-control mod-text" rows="5"></textarea>
           </div>
           <button type="submit" class="save-patch btn btn-primary">저장</button>
       </div>
    </div>
    </div>
    `;
  }

  area.innerHTML += html;
}

export default render;
