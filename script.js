let allBooks = {};
let currentAuthor = 'srinivasa'; // default author
let currentPage = 1;
const itemsPerPage = 10;

const grid = document.getElementById('bookGrid');
const searchBox = document.getElementById('searchBox');
const pagination = document.getElementById('pagination');
const authorSelect = document.getElementById('authorSelect');

async function loadBooks() {
  try {
    const res = await fetch('books.json');
    const data = await res.json();
    allBooks = data.authors;
    populateAuthorDropdown();
    displayBooks();
  } catch (error) {
    console.error("Error loading books.json:", error);
  }
}

function populateAuthorDropdown() {
  if (!authorSelect) return;

  authorSelect.innerHTML = '';
  for (const [id, info] of Object.entries(allBooks)) {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = info.name;
    if (id === currentAuthor) option.selected = true;
    authorSelect.appendChild(option);
  }
}

function getFilteredBooks() {
  const books = allBooks[currentAuthor]?.books || [];
  const filter = searchBox.value.toLowerCase();
  return books.filter(b => b.title.toLowerCase().includes(filter));
}

function displayBooks() {
  const filtered = getFilteredBooks();
  const start = (currentPage - 1) * itemsPerPage;
  const pageBooks = filtered.slice(start, start + itemsPerPage);

  grid.innerHTML = pageBooks.map(book => `
    <div class="book-card">
      <img src="thumbs/${book.thumbnail}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <div>
      <a href="books/${book.filename}" target="_blank">📄 View</a>|<a href="books/${book.filename}" download>⬇️ Download</a>
      </div>
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
    btn.className = (i === currentPage) ? 'active' : '';
    btn.addEventListener("click", () => {
      currentPage = i;
      displayBooks();
    });
    pagination.appendChild(btn);
  }
}

searchBox?.addEventListener("input", () => {
  currentPage = 1;
  displayBooks();
});

authorSelect?.addEventListener("change", e => {
  currentAuthor = e.target.value;
  currentPage = 1;
  displayBooks();
});

loadBooks();
