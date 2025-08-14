let items = [];
const gallery = document.getElementById('gallery');
const sortSelect = document.getElementById('sort');
const searchInput = document.getElementById('search');

// Load items from JSON
async function loadItems() {
  const res = await fetch('items.json');
  items = await res.json();

  // Set default sort option
  sortSelect.value = 'value-desc';

  updateDisplay(); // Applies default sort and renders items
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

// Filter items by search query
function filterItemsBySearch(query) {
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Update display based on sort and search
function updateDisplay() {
  const query = searchInput.value.trim().toLowerCase();
  const sorted = sortItems(sortSelect.value);

  const filtered = query
    ? sorted.filter(item => {
        const combined = `${item.name} ${item.source}`.toLowerCase();
        return combined.includes(query);
      })
    : sorted;

  renderItems(filtered);
}

// Event listeners
sortSelect.addEventListener('change', updateDisplay);
searchInput.addEventListener('input', updateDisplay);

// Initial load
loadItems();
