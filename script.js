let books = [];
let currentPage = 1;
const itemsPerPage = 10;

const grid = document.getElementById('bookGrid');
const searchBox = document.getElementById('searchBox');
const pagination = document.getElementById('pagination');

async function loadBooks() {
  const res = await fetch('books.json');
  books = await res.json();
  displayBooks();
}

function displayBooks() {
  const filter = searchBox.value.toLowerCase();
  const filtered = books.filter(b => b.title.toLowerCase().includes(filter));
  const start = (currentPage - 1) * itemsPerPage;
  const pageBooks = filtered.slice(start, start + itemsPerPage);

  grid.innerHTML = pageBooks.map(book => `
    <div class="book-card">
      <img src="thumbs/${book.thumbnail}" alt="cover" />
      <h3>${book.title}</h3>
      <a href="books/${book.filename}" target="_blank">📄 View</a>
      <a href="books/${book.filename}" download>⬇️ Download</a>
    </div>
  `).join('');

  renderPagination(filtered.length);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayBooks();
    });
    pagination.appendChild(btn);
  }
}

searchBox.addEventListener("input", () => {
  currentPage = 1;
  displayBooks();
});

loadBooks();
// script.js placeholder
