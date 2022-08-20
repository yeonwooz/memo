function attachContent(result) {
  console.log(result);
  const data = JSON.parse(result).data;
  const { title, text } = data;

  const area = document.querySelector("#card-list");
  area.innerHTML += `
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${text}</p>
      <div class="d-flex flex-row ">
          <button type="submit" class="btn btn-primary">수정</button>
          <button type="submit" class="btn btn-primary ml-2">삭제</button>
      </div>
     </div>
    </div>
  `;
}

export default attachContent;
