let items = [];
const gallery = document.getElementById('gallery');
const sortSelect = document.getElementById('sort');
const dropFilter = document.getElementById('dropFilter');

async function loadItems() {
  const res = await fetch('items.json');
  items = await res.json();
  renderItems(items);
}

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


function sortItems(method) {
  let sorted = [...items];
  switch (method) {
    case 'value-desc':
      sorted.sort((a, b) => b.value - a.value);
      break;
    case 'value-asc':
      sorted.sort((a, b) => a.value - b.value);
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldest':
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
  }
  return sorted;
}

function filterItems(drop) {
  if (drop === 'all') return items;
  return items.filter(i => i.drop === parseInt(drop));
}

sortSelect.addEventListener('change', () => {
  const drop = dropFilter.value;
  renderItems(sortItems(sortSelect.value).filter(i => drop === 'all' || i.drop === parseInt(drop)));
});

dropFilter.addEventListener('change', () => {
  const sorted = sortItems(sortSelect.value);
  renderItems(filterItems(dropFilter.value).sort((a, b) => sorted.indexOf(a) - sorted.indexOf(b)));
});

loadItems();
