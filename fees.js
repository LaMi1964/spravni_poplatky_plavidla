function vypocetAlg2({ druh, maKajutu, maMotor, delka, sirka, ponor, maCE }) {

  // 1) Je plavidlo plachetnice?
  if (druh === "plachetnice") {

    // 2) Má kajutu?
    if (!maKajutu) {
      return { amount: 1000, note: "Plachetnice bez kajuty – 1000 Kč." };
    }

    // ANO → pokračujeme na objem

  } else {

    // 3) Má vlastní strojní pohon?
    if (!maMotor) {
      return { amount: 1000, note: "Plavidlo bez vlastního strojního pohonu – 1000 Kč." };
    }

    // ANO → pokračujeme na objem
  }

  // 4) Výpočet objemu
  const objem = delka * sirka * ponor;
  if (!isFinite(objem) || objem <= 0) {
    return { amount: null, note: "Neplatné rozměry pro výpočet objemu." };
  }

  let p;
  if (objem <= 30) p = 2500;
  else if (objem <= 60) p = 4500;
  else p = 6000;

  // 5) CE prohlášení
  if (maCE) {
    const snizena = Math.round(p * 0.4);
    return {
      amount: snizena,
      note: `CE prohlášení – 40 % původního poplatku (${p} Kč).`
    };
  }

  return { amount: p, note: `Objem ${objem.toFixed(2)} m³ – ${p} Kč.` };
}
