const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/planes.json', 'utf8'));

let html = `<div class="swiper-wrapper">\n`;

for (let plan of data.planes) {
    let badgesHtml = plan.servicios.slice(0, 2).map(s => `<div>✓ ${s}</div>`).join('\n');
    html += `
  <div class="swiper-slide">
    <div class="plan-card" style="background-image: url('${plan.img}')">
      <h3>${plan.nombre}</h3>
      <span>${plan.fmt}</span>
      ${badgesHtml}
    </div>
  </div>
`;
}

html += `</div>`;

fs.writeFileSync('seccion-servicios-updated.html', html);
console.log("HTML successfully generated.");
