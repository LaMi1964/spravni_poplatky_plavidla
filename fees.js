// Algoritmus 1 – pravidelná / mimořádná prohlídka
function vypocetAlg1({ druh, maKajutu, vykon, delka, sirka, ponor }) {
  if (druh === "plachetnice") {
    if (!maKajutu) return { amount: 600, note: "Plachetnice bez kajuty – 600 Kč." };
  } else {
    if (vykon <= 0) return { amount: 600, note: "Plavidlo bez motoru – 600 Kč." };
  }

  const objem = delka * sirka * ponor;
  if (!isFinite(objem) || objem <= 0)
    return { amount: null, note: "Neplatné rozměry pro výpočet objemu." };

  if (objem <= 30) return { amount: 1500, note: `Objem ${objem.toFixed(2)} m³ – 1500 Kč.` };
  if (objem <= 60) return { amount: 2700, note: `Objem ${objem.toFixed(2)} m³ – 2700 Kč.` };
  return { amount: 3600, note: `Objem ${objem.toFixed(2)} m³ – 3600 Kč.` };
}

// Algoritmus 2 – první prohlídka
function vypocetAlg2({ druh, maKajutu, vykon, delka, sirka, ponor, maCE }) {
  if (druh === "plachetnice") {
    if (!maKajutu) return { amount: 1000, note: "Plachetnice bez kajuty – 1000 Kč." };
  } else {
    if (!maKajutu && vykon <= 0)
      return { amount: 1000, note: "Plavidlo bez kajuty a bez motoru – 1000 Kč." };
    if (vykon <= 0)
      return { amount: 1000, note: "Plavidlo bez motoru – 1000 Kč." };
  }

  const objem = delka * sirka * ponor;
  if (!isFinite(objem) || objem <= 0)
    return { amount: null, note: "Neplatné rozměry pro výpočet objemu." };

  let p;
  if (objem <= 30) p = 2500;
  else if (objem <= 60) p = 4500;
  else p = 6000;

  if (maCE) {
    const snizena = Math.round(p * 0.4);
    return {
      amount: snizena,
      note: `CE prohlášení – sleva 60 % (z ${p} Kč).`
    };
  }

  return { amount: p, note: `Objem ${objem.toFixed(2)} m³ – ${p} Kč.` };
}

// Obsluha formuláře
const form = document.getElementById("fee-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const typProhlidky = document.getElementById("typProhlidky").value;
  const druh = document.getElementById("druh").value;
  const maKajutu = document.getElementById("maKajutu").checked;
  const vykon = parseFloat(document.getElementById("vykon").value || "0");
  const delka = parseFloat(document.getElementById("delka").value || "0");
  const sirka = parseFloat(document.getElementById("sirka").value || "0");
  const ponor = parseFloat(document.getElementById("ponor").value || "0");
  const maCE = document.getElementById("maCE").checked;
  const portal = document.getElementById("portal").checked;

  const vstup = { druh, maKajutu, vykon, delka, sirka, ponor, maCE };

  let vysledek =
    typProhlidky === "alg1" ? vypocetAlg1(vstup) : vypocetAlg2(vstup);

  if (vysledek.amount != null && portal) {
    const puvodni = vysledek.amount;
    vysledek.amount = Math.round(puvodni * 0.8);
    vysledek.note += ` Podání přes Portál dopravy – sleva 20 % (z ${puvodni} Kč).`;
  }

  if (vysledek.amount == null) {
    resultDiv.textContent = vysledek.note;
  } else {
    resultDiv.textContent = `Správní poplatek: ${vysledek.amount} Kč. ${vysledek.note}`;
  }
});
