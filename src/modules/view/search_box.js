export default function renderSearchBox() {
  const template = `
  <div class="search-input-wrapper">
    <form class="search-form">
    <i class="fa fa-search"></i>
    <input type="text" class="input" placeholder="Search your city" />
  </form>
  </div>`;
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(template);
  document.body.appendChild(documentFragment);
}
