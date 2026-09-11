import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import ConsumptionInputs from './components/ConsumptionInputs';
import OfferComparison from './components/OfferComparison';
import OfferChart from './components/OfferChart';
import CalculationDetails from './components/CalculationDetails';

function App() {
  const [power, setPower] = useState('9');
  const [offerType, setOfferType] = useState('base');
  
  const [subscriptionDate, setSubscriptionDate] = useState('post-feb-2026');
  
  const [homeConsumption, setHomeConsumption] = useState(4500);
  const [totalConsumptionInput, setTotalConsumptionInput] = useState('');
  
  const [evInputMode, setEvInputMode] = useState('distance'); // 'distance' or 'energy'
  const [evPeriod, setEvPeriod] = useState('month'); // 'month' or 'year'
  const [evInputValue, setEvInputValue] = useState(300);
  const [evEfficiency, setEvEfficiency] = useState(16.8);
  const [homeHpRatio, setHomeHpRatio] = useState(60);

  // Constants & calculations
  const evVal = evInputValue === '' ? 0 : Number(evInputValue);
  const evEff = evEfficiency === '' ? 0 : Number(evEfficiency);
  const homeVal = homeConsumption === '' ? 0 : Number(homeConsumption);

  let yearlyEvConsumption = 0;
  if (evInputMode === 'distance') {
    const monthlyDistance = evPeriod === 'month' ? evVal : evVal / 12;
    yearlyEvConsumption = monthlyDistance * 12 * (evEff / 100);
  } else {
    yearlyEvConsumption = evPeriod === 'month' ? evVal * 12 : evVal;
  }
  
  const hasTotalInput = totalConsumptionInput !== '' && Number(totalConsumptionInput) > 0;
  const finalHomeConsumption = hasTotalInput 
    ? Math.max(0, Number(totalConsumptionInput) - yearlyEvConsumption)
    : homeVal;
  const finalTotalConsumption = hasTotalInput 
    ? Number(totalConsumptionInput)
    : homeVal + yearlyEvConsumption;

  // Exact offer data based on Octopus Energy (Grilles d'Août 2026)
  const offers = useMemo(() => {
    const powerNum = Number(power);

    // Standard Octopus subscription (Intelligent Octopus, Drive Pack, Octopus Go)
    let standardSub = 19.88;
    if (powerNum === 6) standardSub = 15.86;
    else if (powerNum === 9) standardSub = 19.88;
    else if (powerNum === 12) standardSub = 23.76;
    else if (powerNum === 36) standardSub = 54.41;

    // TRV & Cocon & OctoTempo subscription
    let trvSub = 19.88;
    if (powerNum === 6) trvSub = 15.86;
    else if (powerNum === 9) trvSub = 19.88;
    else if (powerNum === 12) trvSub = 23.76;
    else if (powerNum === 36) trvSub = 53.88;

    // Eco-Conso Fixe -5% subscription
    let ecoConsoSub = 20.04;
    if (powerNum === 6) ecoConsoSub = 16.01;
    else if (powerNum === 9) ecoConsoSub = 20.04;
    else if (powerNum === 12) ecoConsoSub = 23.90;
    else if (powerNum === 36) ecoConsoSub = 54.55;

    // EMCE 2025 subscription
    let emceSub = 18.95;
    if (offerType === 'base') {
      if (powerNum === 6) emceSub = 15.12;
      else if (powerNum === 9) emceSub = 18.95;
      else if (powerNum === 12) emceSub = 22.78;
      else if (powerNum === 36) emceSub = 53.47;
    } else {
      if (powerNum === 6) emceSub = 15.39;
      else if (powerNum === 9) emceSub = 19.37;
      else if (powerNum === 12) emceSub = 23.21;
      else if (powerNum === 36) emceSub = 53.79;
    }

    // EDF Tempo subscription
    let tempoSub = 19.70;
    if (powerNum === 6) tempoSub = 15.80;
    else if (powerNum === 9) tempoSub = 19.70;
    else if (powerNum === 12) tempoSub = 23.50;
    else if (powerNum === 36) tempoSub = 53.76;

    // Rates Août / Septembre 2026
    const ioPriceBase = powerNum >= 7 ? 0.1953 : 0.1968;
    const ioPriceHP = 0.2106;
    const ioPriceHC = 0.1565;

    // Eco-conso Fixe -5% (Grille applicable au 11/09/2026)
    const eco5PriceBase = powerNum >= 7 ? 0.1911 : 0.1924;
    const eco5PriceHP = 0.2059;
    const eco5PriceHC = 0.1530;

    // Eco-conso Fixe -2% (Grille applicable au 04/09/2026)
    const eco2PriceBase = powerNum >= 7 ? 0.1956 : 0.1971;
    const eco2PriceHP = 0.2111;
    const eco2PriceHC = 0.1566;

    const octoGoHP = 0.2302;
    const octoGoHC = 0.1335;

    const coconRates = offerType === 'base'
      ? {
          ete: powerNum >= 7 ? 0.1743 : 0.1707,
          hiver: powerNum >= 7 ? 0.2277 : 0.2245,
          base: powerNum >= 7 ? 0.1743 : 0.1707 // fallback
        }
      : {
          eteHC: powerNum >= 7 ? 0.1405 : 0.1344,
          eteHP: powerNum >= 7 ? 0.1876 : 0.1787,
          hiverHC: powerNum >= 7 ? 0.1809 : 0.1773,
          hiverHP: powerNum >= 7 ? 0.2461 : 0.2409,
          hc: powerNum >= 7 ? 0.1405 : 0.1344, // fallback
          hp: powerNum >= 7 ? 0.1876 : 0.1787
        };

    const trvPriceBase = powerNum >= 7 ? 0.1985 : 0.2001;
    const trvPriceHP = 0.2142;
    const trvPriceHC = 0.1589;

    const baseOffers = [
      {
        id: 'emce-2025',
        name: 'EMCE 2025',
        subscription: emceSub,
        rates: { base: 0.1689, hp: 0.1807, hc: 0.1387 },
        bonus: 0,
        flatRate: 0,
        features: ["Achat groupé (UFC-Que Choisir)", "Tarifs très avantageux", "Prix bloqué"]
      },
      {
        id: 'eco-conso-5',
        name: 'Eco-Conso Fixe -5%',
        subscription: ecoConsoSub,
        rates: { base: eco5PriceBase, hp: eco5PriceHP, hc: eco5PriceHC },
        bonus: 0,
        flatRate: 0,
        features: ["Fixe HT 2 ans (abo + kWh)", "Remise de 5% sur le kWh HT", "Pas liée aux VE"]
      },
      {
        id: 'eco-conso-2',
        name: 'Eco-Conso Fixe -2%',
        subscription: ecoConsoSub,
        rates: { base: eco2PriceBase, hp: eco2PriceHP, hc: eco2PriceHC },
        bonus: 0,
        flatRate: 0,
        features: ["Fixe HT 2 ans (abo + kWh)", "Remise de 2% sur le kWh HT", "Pas liée aux VE"]
      },
      {
        id: 'cocon',
        name: 'Octopus Cocon',
        isCocon: true,
        subscription: trvSub,
        rates: coconRates,
        bonus: 0,
        flatRate: 0,
        features: ["Tarif saisonnalisé Été / Hiver", "Prix réduit 7 mois sur 12 (Avril - Octobre)", "Fixe HT 2 ans (abo + kWh)"]
      },
      {
        id: 'intelligent-octopus',
        name: 'Intelligent Octopus Fixe Août',
        subscription: standardSub,
        rates: { base: ioPriceBase, hp: ioPriceHP, hc: ioPriceHC },
        bonusType: 'intelligent',
        flatRate: 0,
        features: ["Fixe HT 2 ans (abo + kWh + recharge)", "Recharge automatisée par l'app", "Bonus recharge en cagnotte"]
      },
      {
        id: 'drive-pack',
        name: 'Drive Pack Fixe Août',
        subscription: standardSub,
        rates: { base: ioPriceBase, hp: ioPriceHP, hc: ioPriceHC },
        bonus: 0,
        flatRate: 44.99,
        features: ["Maison : Fixe HT 2 ans (abo + kWh)", "Forfait VE : 1 an, reconductible tacite", "Recharge VE sans limite de dépassement"]
      },
      {
        id: 'octopus-go',
        name: 'Octopus Go Fixe',
        subscription: standardSub,
        rates: { base: octoGoHP, hp: octoGoHP, hc: octoGoHC },
        bonus: 0,
        flatRate: 0,
        features: ["Indexé TRV (pas de blocage)", "8 Heures Creuses à moitié prix HP HTT", "2h creuses = 1h pleine"]
      },
      {
        id: 'octotempo',
        name: 'OctoTempo',
        subscription: trvSub,
        isOctoTempo: true,
        rates: {
          eteHC: 0.1356, eteHP: 0.1615,
          hiverHC: 0.1615, hiverHP: 0.1921,
          redHC: 0.1615, redHP: 0.6465
        },
        bonus: 0,
        flatRate: 0,
        features: ["Tarification saisonnière (Été/Hiver)", "22 Jours Rouges en hiver", "Heures creuses intéressantes"]
      },
      {
        id: 'edf-tempo',
        name: 'EDF Tempo',
        subscription: tempoSub,
        isTempo: true,
        rates: {
          blueHC: 0.1356, blueHP: 0.1654,
          whiteHC: 0.1536, whiteHP: 0.1921,
          redHC: 0.1615, redHP: 0.7295
        },
        bonus: 0,
        flatRate: 0,
        features: ["Prix variables selon couleurs", "300 jours bleus très avantageux", "22 jours rouges très chers"]
      },
      {
        id: 'edf-tempo-100hc',
        name: 'EDF Tempo (100% HC)',
        subscription: tempoSub,
        isTempo: true,
        isTempo100HC: true,
        rates: {
          blueHC: 0.1356, blueHP: 0.1654,
          whiteHC: 0.1536, whiteHP: 0.1921,
          redHC: 0.1615, redHP: 0.7295
        },
        bonus: 0,
        flatRate: 0,
        features: ["Variante 100% Heures Creuses", "Recharge VE de nuit uniquement", "Aucune recharge en journée"]
      },
      {
        id: 'edf-bleu',
        name: 'EDF Tarif Bleu (TRV)',
        subscription: trvSub,
        rates: { base: trvPriceBase, hp: trvPriceHP, hc: trvPriceHC },
        bonus: 0,
        flatRate: 0,
        features: ["Tarif Réglementé de Vente", "Fixé par les pouvoirs publics", "Tarif repère national"]
      }
    ];

    // Calculate total cost for each offer
    return baseOffers.map(offer => {
      let cost = 0;
      const annualSub = offer.subscription * 12;
      const monthlySub = offer.subscription;
      
      const homeHC = finalHomeConsumption * ((100 - homeHpRatio) / 100);
      const homeHP = finalHomeConsumption * (homeHpRatio / 100);
      const evHC = offer.isTempo100HC ? yearlyEvConsumption : yearlyEvConsumption * 0.8;
      const evHP = offer.isTempo100HC ? 0 : yearlyEvConsumption * 0.2;
      
      const monthlyHomeKwh = finalHomeConsumption / 12;
      const monthlyEvKwh = yearlyEvConsumption / 12;

      let homeCost = 0;
      let evCostRaw = 0;
      let evCostFinal = 0;
      let bonusMonthly = 0;
      let overageMonthly = 0;
      let refundMonthly = 0;

      // Details for optimization box
      let optKwh = evHC / 12;
      let optRate = 0;
      let normKwh = evHP / 12;
      let normRate = 0;

      if (offer.isTempo) {
        // Tempo calculation: proportional weighting over the year
        const daysInYear = 365;
        const ratioBlue = 300 / daysInYear;
        const ratioWhite = 43 / daysInYear;
        const ratioRed = 22 / daysInYear;

        homeCost = 
          (homeHC * ratioBlue * offer.rates.blueHC) + (homeHP * ratioBlue * offer.rates.blueHP) +
          (homeHC * ratioWhite * offer.rates.whiteHC) + (homeHP * ratioWhite * offer.rates.whiteHP) +
          (homeHC * ratioRed * offer.rates.redHC) + (homeHP * ratioRed * offer.rates.redHP);
        
        evCostRaw = 
          (evHC * ratioBlue * offer.rates.blueHC) + (evHP * ratioBlue * offer.rates.blueHP) +
          (evHC * ratioWhite * offer.rates.whiteHC) + (evHP * ratioWhite * offer.rates.whiteHP) +
          (evHC * ratioRed * offer.rates.redHC) + (evHP * ratioRed * offer.rates.redHP);

        evCostFinal = evCostRaw;
        cost = annualSub + homeCost + evCostFinal;
        
        // Mock optimization for tempo (simplified)
        optRate = offer.rates.blueHC;
        normRate = offer.rates.whiteHP;
      } else if (offer.isOctoTempo) {
        // OctoTempo calculation: proportional weighting over the year
        // Été (Avril - Octobre) = 214 days
        // Hiver (Novembre - Mars) = 151 days (129 jours normaux + 22 jours rouges)
        const daysInYear = 365;
        const ratioEte = 214 / daysInYear;
        const ratioHiver = 129 / daysInYear;
        const ratioRed = 22 / daysInYear;

        homeCost = 
          (homeHC * ratioEte * offer.rates.eteHC) + (homeHP * ratioEte * offer.rates.eteHP) +
          (homeHC * ratioHiver * offer.rates.hiverHC) + (homeHP * ratioHiver * offer.rates.hiverHP) +
          (homeHC * ratioRed * offer.rates.redHC) + (homeHP * ratioRed * offer.rates.redHP);
        
        evCostRaw = 
          (evHC * ratioEte * offer.rates.eteHC) + (evHP * ratioEte * offer.rates.eteHP) +
          (evHC * ratioHiver * offer.rates.hiverHC) + (evHP * ratioHiver * offer.rates.hiverHP) +
          (evHC * ratioRed * offer.rates.redHC) + (evHP * ratioRed * offer.rates.redHP);

        evCostFinal = evCostRaw;
        cost = annualSub + homeCost + evCostFinal;
        
        optRate = offer.rates.eteHC;
        normRate = offer.rates.hiverHP;
      } else if (offer.isCocon) {
        // Octopus Cocon : saisonnalité Été (Avril - Octobre = 214 j) / Hiver (Novembre - Mars = 151 j)
        const daysInYear = 365;
        const ratioEte = 214 / daysInYear;
        const ratioHiver = 151 / daysInYear;

        if (offerType === 'base') {
          homeCost = (finalHomeConsumption * ratioEte * offer.rates.ete) + (finalHomeConsumption * ratioHiver * offer.rates.hiver);
          evCostRaw = (yearlyEvConsumption * ratioEte * offer.rates.ete) + (yearlyEvConsumption * ratioHiver * offer.rates.hiver);
          evCostFinal = evCostRaw;

          optKwh = (yearlyEvConsumption * 0.8) / 12;
          normKwh = (yearlyEvConsumption * 0.2) / 12;
          optRate = (ratioEte * offer.rates.ete) + (ratioHiver * offer.rates.hiver);
          normRate = optRate;
        } else {
          homeCost = 
            (homeHC * ratioEte * offer.rates.eteHC) + (homeHP * ratioEte * offer.rates.eteHP) +
            (homeHC * ratioHiver * offer.rates.hiverHC) + (homeHP * ratioHiver * offer.rates.hiverHP);
          
          evCostRaw = 
            (evHC * ratioEte * offer.rates.eteHC) + (evHP * ratioEte * offer.rates.eteHP) +
            (evHC * ratioHiver * offer.rates.hiverHC) + (evHP * ratioHiver * offer.rates.hiverHP);
          evCostFinal = evCostRaw;

          optRate = (ratioEte * offer.rates.eteHC) + (ratioHiver * offer.rates.hiverHC);
          normRate = (ratioEte * offer.rates.eteHP) + (ratioHiver * offer.rates.hiverHP);
        }

        cost = annualSub + homeCost + evCostFinal;
      } else if (offerType === 'hphc' || offer.id === 'octopus-go') {
        homeCost = (homeHC * offer.rates.hc) + (homeHP * offer.rates.hp);
        evCostRaw = (evHC * offer.rates.hc) + (evHP * offer.rates.hp);
        evCostFinal = evCostRaw;
        
        optRate = offer.rates.hc;
        normRate = offer.rates.hp;
        
        if (offer.flatRate > 0) {
          const annualFlatRate = offer.flatRate * 12;
          if (evCostRaw < annualFlatRate) {
            refundMonthly = 0; // Pas de remboursement, c'est perdu !
            evCostFinal = annualFlatRate;
          } else {
            refundMonthly = (evCostRaw - annualFlatRate) / 12; // Trop-payé remboursé à la régul
            evCostFinal = evCostRaw; // Facturé au réel au fil de l'année
          }
        }
        if (offer.bonusType === 'intelligent') {
          let bonusRate = 0;
          let bonusRateHP = 0;
          if (subscriptionDate === 'pre-feb-2026') {
            bonusRate = 0.12;
            bonusRateHP = 0.12;
          } else {
            bonusRate = Math.max(0, optRate - 0.08);
            bonusRateHP = Math.max(0, normRate - 0.08);
          }
          offer.bonus = bonusRate;
          offer.bonusHP = bonusRateHP;
          const annualBonus = (evHC * bonusRate) + (evHP * bonusRateHP);
          bonusMonthly = annualBonus / 12;
          evCostFinal -= annualBonus; // Intelligent Octopus cagnotte
        }

        cost = annualSub + homeCost + evCostFinal;
      } else {
        // Base option
        homeCost = finalHomeConsumption * offer.rates.base;
        evCostRaw = yearlyEvConsumption * offer.rates.base;
        evCostFinal = evCostRaw;
        
        optKwh = (yearlyEvConsumption * 0.8) / 12;
        normKwh = (yearlyEvConsumption * 0.2) / 12;
        optRate = offer.rates.base;
        normRate = offer.rates.base;

        if (offer.flatRate > 0) {
          const annualFlatRate = offer.flatRate * 12;
          if (evCostRaw < annualFlatRate) {
            refundMonthly = 0; // Pas de remboursement, c'est perdu !
            evCostFinal = annualFlatRate;
          } else {
            refundMonthly = (evCostRaw - annualFlatRate) / 12; // Trop-payé remboursé à la régul
            evCostFinal = evCostRaw; // Facturé au réel au fil de l'année
          }
        }
        if (offer.bonusType === 'intelligent') {
          let bonusRate = 0;
          let bonusRateHP = 0;
          if (subscriptionDate === 'pre-feb-2026') {
            bonusRate = 0.12;
            bonusRateHP = 0.12;
          } else {
            bonusRate = Math.max(0, optRate - 0.08);
            bonusRateHP = Math.max(0, normRate - 0.08);
          }
          offer.bonus = bonusRate;
          offer.bonusHP = bonusRateHP;
          const annualBonus = (yearlyEvConsumption * 0.8 * bonusRate) + (yearlyEvConsumption * 0.2 * bonusRateHP);
          bonusMonthly = annualBonus / 12;
          evCostFinal -= annualBonus;
        }

        cost = annualSub + homeCost + evCostFinal;
      }

      return {
        ...offer,
        totalCost: cost - (refundMonthly * 12),
        breakdown: {
          monthlySub,
          monthlyHomeCost: homeCost / 12,
          monthlyHomeKwh,
          monthlyEvCostRaw: evCostRaw / 12,
          monthlyEvCostFinal: evCostFinal / 12,
          monthlyEvKwh,
          monthlyBonus: bonusMonthly,
          monthlyOverage: overageMonthly,
          monthlyRefund: refundMonthly,
          monthlyTotal: cost / 12,
          monthlyNetTotal: (cost / 12) - refundMonthly,
          optKwh,
          optRate,
          normKwh,
          normRate,
          homeHpRatio
        }
      };
    }).sort((a, b) => a.totalCost - b.totalCost);
  }, [power, offerType, finalHomeConsumption, yearlyEvConsumption, finalTotalConsumption, subscriptionDate, homeHpRatio]);

  // Find best offer
  const bestOffer = offers[0];

  return (
    <div className="App">
      <Header 
        power={power} setPower={setPower}
        offerType={offerType} setOfferType={setOfferType}
      />
      <ConsumptionInputs 
        homeConsumption={hasTotalInput ? finalHomeConsumption : homeConsumption} setHomeConsumption={setHomeConsumption}
        totalConsumptionInput={totalConsumptionInput} setTotalConsumptionInput={setTotalConsumptionInput}
        hasTotalInput={hasTotalInput}
        yearlyEvConsumption={yearlyEvConsumption}
        evInputMode={evInputMode} setEvInputMode={setEvInputMode}
        evPeriod={evPeriod} setEvPeriod={setEvPeriod}
        evInputValue={evInputValue} setEvInputValue={setEvInputValue}
        evEfficiency={evEfficiency} setEvEfficiency={setEvEfficiency}
        homeHpRatio={homeHpRatio} setHomeHpRatio={setHomeHpRatio}
      />
      
      <OfferChart offers={offers} />

      <OfferComparison 
        offers={offers}
        selectedOfferId={bestOffer.id}
        offerType={offerType}
      />
      
      <CalculationDetails 
        power={power}
        homeConsumption={finalHomeConsumption}
        homeHpRatio={homeHpRatio}
        yearlyEvConsumption={yearlyEvConsumption}
        offers={offers}
      />
    </div>
  );
}

export default App;
