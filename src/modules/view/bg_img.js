export default function renderImgElement() {
  const template = `<img id="bgImg" />
`;
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(template);
  document.body.appendChild(documentFragment);
}
