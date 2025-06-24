fetch('recipes.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('recipe-container');
    for (const category in data) {
      const section = document.createElement('div');
      section.className = 'category';
      const title = document.createElement('h2');
      title.textContent = category;
      const grid = document.createElement('div');
      grid.className = 'recipe-grid';
      data[category].forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = \`<img src="\${recipe.image}" alt="\${recipe.name}" /><p>\${recipe.name}</p>\`;
        card.addEventListener('click', () => showModal(recipe));
        grid.appendChild(card);
      });
      section.appendChild(title);
      section.appendChild(grid);
      container.appendChild(section);
    }
  });

function showModal(recipe) {
  document.getElementById('modal-title').textContent = recipe.name;
  document.getElementById('modal-ingredients').innerHTML = recipe.ingredients.map(i => \`<li>\${i}</li>\`).join('');
  document.getElementById('modal-steps').innerHTML = recipe.steps.map(s => \`<li>\${s}</li>\`).join('');
  document.getElementById('modal').classList.remove('hidden');
}

document.getElementById('close-modal').onclick = () => {
  document.getElementById('modal').classList.add('hidden');
};

document.getElementById('recipe-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('recipe-name').value;
  const category = document.getElementById('recipe-category').value;
  const image = document.getElementById('recipe-image').value;
  const ingredients = document.getElementById('recipe-ingredients').value.split('\n');
  const steps = document.getElementById('recipe-steps').value.split('\n');
  const newRecipe = { name, image, ingredients, steps };
  document.getElementById('json-output').textContent = JSON.stringify({ [category]: [newRecipe] }, null, 2);
});