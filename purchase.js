const purchaseGrid = document.getElementById("purchaseGrid");

async function loadPurchaseBooks() {
  const res = await fetch("purchase.json");
  const books = await res.json();

  purchaseGrid.innerHTML = books.map(book => `
    <div class="book-card">
      <img src="thumbs/${book.thumbnail}" alt="cover" />
      <h3>${book.title}</h3>
      <a href="${book.link}" target="_blank">🛒 Buy Now</a>
    </div>
  `).join("");
}

loadPurchaseBooks();
// purchase.js placeholder
