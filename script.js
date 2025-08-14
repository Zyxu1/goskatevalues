let items = [];
const gallery = document.getElementById('gallery');
const sortSelect = document.getElementById('sort');

// Load items from JSON
async function loadItems() {
  const res = await fetch('items.json');
  items = await res.json();
  renderItems(items);
}

// Render cards
function renderItems(data) {
  gallery.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p class="source">${item.source}</p>
      <p class="price">$${item.value.toLocaleString()}</p>
    `;
    gallery.appendChild(card);
  });
}

// Sort logic
function sortItems(method) {
  let sorted = [...items];
  switch (method) {
    case 'value-desc':
      sorted.sort((a, b) => b.value - a.value);
      break;
    case 'value-asc':
      sorted.sort((a, b) => a.value - b.value);
      break;
  }
  return sorted;
}

// Event listener for sorting
sortSelect.addEventListener('change', () => {
  renderItems(sortItems(sortSelect.value));
});

// Load items on page load
loadItems();
