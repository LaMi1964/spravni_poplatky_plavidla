// Pomocná funkce – převod čárky na tečku
function num(v) {
  if (typeof v !== "string") return 0;
  return parseFloat(v.replace(",", "."));
}

// ALG 1 – pravidelná / mimořádná prohlídka
function vypocetAlg1({ druh, maKajutu, maMotor, delka, sirka, ponor }) {

  if (druh === "plachetnice") {
    if (!maKajutu) return { amount: 600, note: "Plachetnice bez kajuty – 600 Kč." };
  } else {
    if (!maMotor) return { amount: 600, note: "Plavidlo bez motoru – 600 Kč." };
  }

  const objem = delka * sirka * ponor;
  if (!isFinite(objem) || objem <= 0)
    return { amount: null, note: "Neplatné rozměry pro výpočet objemu." };

  if (objem <= 30) return { amount: 1500, note: `Objem ${objem.toFixed(2)} m³ – 1500 Kč.` };
  if (objem <= 60) return { amount: 2700, note: `Objem ${objem.toFixed(2)} m³ – 2700 Kč.` };
  return { amount: 3600, note: `Objem ${objem.toFixed(2)} m³ – 3600 Kč.` };
}

// ALG 2 – první prohlídka
function vypocetAlg2({ druh, maKajutu, maMotor, delka, sirka, ponor, maCE }) {

  if (druh === "plachetnice") {
    if (!maKajutu) return { amount: 1000, note: "Plachetnice bez kajuty – 1000 Kč." };
  } else {
    if (!maMotor) return { amount: 1000, note: "Plavidlo bez motoru – 1000 Kč." };
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
      note: `CE prohlášení – 40 % původního poplatku (${p} Kč).`
    };
  }

  return { amount: p, note: `Objem ${objem.toFixed(2)} m³ – ${p} Kč.` };
}

// Obsluha formuláře
const form = document.getElementById("fee-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const typ = document.getElementById("typProhlidky").value;
  const druh = document.getElementById("druh").value;
  const maKajutu = document.getElementById("maKajutu").checked;
  const maMotor = document.getElementById("maMotor").checked;

  const delka = num(document.getElementById("delka").value);
  const sirka = num(document.getElementById("sirka").value);
  const ponor = num(document.getElementById("ponor").value);

  const maCE = document.getElementById("maCE").checked;
  const portal = document.getElementById("portal").checked;

  const vstup = { druh, maKajutu, maMotor, delka, sirka, ponor, maCE };

  let vysledek = typ === "alg1" ? vypocetAlg1(vstup) : vypocetAlg2(vstup);

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
