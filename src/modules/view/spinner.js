export default function renderSpinner() {
  const template = `<div hidden id="spinner"></div>`;
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(template);
  document.body.appendChild(documentFragment);
}
