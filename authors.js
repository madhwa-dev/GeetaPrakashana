document.addEventListener("DOMContentLoaded", function () {
  const authorSelect = document.getElementById("authorSelect");
  const bookList = document.getElementById("bookList");

  fetch("books.json")
    .then(response => response.json())
    .then(data => {
      const authors = Object.keys(data);
      authors.forEach(authorId => {
        const option = document.createElement("option");
        option.value = authorId;
        option.textContent = data[authorId].author_name;
        authorSelect.appendChild(option);
      });

      authorSelect.addEventListener("change", () => {
        const selectedId = authorSelect.value;
        displayBooks(data[selectedId].books);
      });

      // Load default author
      if (authors.length > 0) {
        authorSelect.value = authors[0];
        displayBooks(data[authors[0]].books);
      }
    });

  function displayBooks(books) {
    bookList.innerHTML = "";
    books.forEach(book => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${book.title}</strong>${book.purchase_link ? ` – <a href="${book.purchase_link}" target="_blank">Buy</a>` : ""}`;
      bookList.appendChild(li);
    });
  }
});
