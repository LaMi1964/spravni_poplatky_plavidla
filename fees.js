function vypocetAlg1({ druh, maKajutu, vykon, delka, sirka, ponor }) {
  // 1) Druh = plachetnice?
  if (druh.includes("plachetnice")) {
    // 2) Má kajutu?
    if (!maKajutu) return { amount: 600, note: "Plachetnice bez kajuty – 600 Kč." };
    // jinak pokračujeme objemem
  } else {
    // 3) Výkon strojů > 0?
    if (!(vykon > 0)) return { amount: 600, note: "Plavidlo bez motoru – 600 Kč." };
    // jinak pokračujeme objemem
  }

  const objem = delka * sirka * ponor;
  if (!isFinite(objem) || objem <= 0) {
    return { amount: null, note: "Neplatné rozměry pro výpočet objemu." };
  }

  if (objem <= 30) return { amount: 1500, note: `Objem ${objem.toFixed(2)} m³ – 1500 Kč.` };
  if (objem <= 60) return { amount: 2700, note: `Objem ${objem.toFixed(2)} m³ – 2700 Kč.` };
  return { amount: 3600, note: `Objem ${objem.toFixed(2)} m³ – 3600 Kč.` };
}

function vypocetAlg2({ druh, delka, sirka, ponor, maCE }) {
  // 1) Druh obsahuje "plachetnice"?
  if (!druh.includes("plachetnice")) {
    // 2) Druh obsahuje "s kajutou"?
    if (!druh.includes("s kajutou")) {
      return { amount: 1000, note: "Plavidlo bez kajuty – 1000 Kč." };
    }
    // 3) Druh = "s vlastním strojním pohonem"?
    if (druh !== "s vlastním strojním pohonem") {
      return { amount: 1000, note: "Plavidlo bez vlastního strojního pohonu – 1000 Kč." };
    }
    // jinak pokračujeme objemem
  }
  // pokud obsahuje "plachetnice", jdeme rovnou na objem

  const objem = delka * sirka * ponor;
  if (!isFinite(objem) || objem <= 0) {
    return { amount: null, note: "Neplatné rozměry pro výpočet objemu." };
  }

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
