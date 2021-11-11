export default function renderHeader() {
  const template = `<header>
  <ul class="header-items">
    <li>country: <span class="country values"></span></li>
    <li>currency:<span class="currency values"></span></li>
    <li>call code:<span class="call_code values"></span></li>
    <li>drive on:<span class="drive_on values"></span></li>
  </ul>
</header>
`;
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(template);
  document.body.appendChild(documentFragment);
}
