export default function renderInfoBox() {
  const template = `<div class="weather-info">
  <p class="header-area">
    <span class="error"></span>
    <span class="city values"></span>
    <img class="flag" />
  </p>
  <div class="info-area">
    <div class="box-1">
      <ul>
        <li class="temp values"></li>
        <li class="temp_fl values"></li>
        <li>
          <img class="icon" />
        </li>
        <li class="status values"></li>
      </ul>
    </div>

    <div class="box-2">
      <table>
        <thead>
          <tr>
            <th>Local time:</th>
            <th>Air quality:</th>
            <th>Humidity:</th>
            <th>Cloud cover:</th>
            <th>Wind speed:</th>
            <th>Wind direction:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="time values"></td>
            <td class="air_q values"></td>
            <td class="humidity values"></td>
            <td class="cloud values"></td>
            <td class="wind-speed values"></td>
            <td class="wind-degree values"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`;
  const range = document.createRange();
  const documentFragment = range.createContextualFragment(template);
  document.body.appendChild(documentFragment);
}
