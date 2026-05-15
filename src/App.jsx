import React, { useState, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import ConsumptionInputs from './components/ConsumptionInputs';
import OfferComparison from './components/OfferComparison';
import OfferChart from './components/OfferChart';

function App() {
  const [power, setPower] = useState('9');
  const [offerType, setOfferType] = useState('base');
  
  const [subscriptionDate, setSubscriptionDate] = useState('post-feb-2026');
  
  const [homeConsumption, setHomeConsumption] = useState(4500);
  
  const [evInputMode, setEvInputMode] = useState('distance'); // 'distance' or 'energy'
  const [evPeriod, setEvPeriod] = useState('month'); // 'month' or 'year'
  const [evInputValue, setEvInputValue] = useState(300);
  const [evEfficiency, setEvEfficiency] = useState(16.8);
  const [homeHpRatio, setHomeHpRatio] = useState(60);

  // Constants & calculations
  let yearlyEvConsumption = 0;
  if (evInputMode === 'distance') {
    const monthlyDistance = evPeriod === 'month' ? evInputValue : evInputValue / 12;
    yearlyEvConsumption = monthlyDistance * 12 * (evEfficiency / 100);
  } else {
    yearlyEvConsumption = evPeriod === 'month' ? evInputValue * 12 : evInputValue;
  }
  
  const totalConsumption = homeConsumption + yearlyEvConsumption;

  // Exact offer data based on Octopus Energy
  const offers = useMemo(() => {
    // Subscriptions based on power (kVA) and offerType (base/hphc)
    let pSubscription = 0;
    let emceSubscription = 0;
    let powerNum = Number(power);
    if (offerType === 'base') {
      if(powerNum === 6) { pSubscription = 15.65; emceSubscription = 14.76; }
      if(powerNum === 9) { pSubscription = 19.56; emceSubscription = 18.48; }
      if(powerNum === 12) { pSubscription = 23.32; emceSubscription = 22.19; }
      if(powerNum === 36) { pSubscription = 53.06; emceSubscription = 51.97; }
    } else {
      if(powerNum === 6) { pSubscription = 15.65; emceSubscription = 15.04; }
      if(powerNum === 9) { pSubscription = 19.83; emceSubscription = 19.17; }
      if(powerNum === 12) { pSubscription = 23.68; emceSubscription = 22.99; }
      if(powerNum === 36) { pSubscription = 52.54; emceSubscription = 51.78; }
    }

    const priceBase = powerNum >= 7 ? 0.1895 : 0.1909;
    const priceHP = 0.2031;
    const priceHC = 0.1555;
    const octoGoHP = 0.2132;
    const octoGoHC = 0.1251;

    const baseOffers = [
      {
        id: 'emce-2025',
        name: 'Energie Moins Chère Ensemble 2025',
        subscription: emceSubscription,
        rates: { base: 0.1627, hp: 0.1727, hc: 0.1376 },
        bonus: 0,
        flatRate: 0,
        features: ["Achat groupé (UFC-Que Choisir)", "Tarifs très avantageux", "Prix bloqué"]
      },
      {
        id: 'eco-conso',
        name: 'Eco-Conso Fixe -2%',
        subscription: pSubscription,
        rates: { base: priceBase, hp: priceHP, hc: priceHC },
        bonus: 0,
        flatRate: 0,
        features: ["Fixe HT 2 ans (abo + kWh)", "Stabilité totale sur 24 mois", "Pas liée aux VE"]
      },
      {
        id: 'intelligent-octopus',
        name: 'Intelligent Octopus Fixe Février',
        subscription: pSubscription,
        rates: { base: priceBase, hp: priceHP, hc: priceHC },
        bonusType: 'intelligent',
        flatRate: 0,
        features: ["Fixe HT 2 ans (abo + kWh + recharge)", "Recharge automatisée par l'app", "Bonus recharge en cagnotte"]
      },
      {
        id: 'drive-pack',
        name: 'Drive Pack Fixe Avril',
        subscription: pSubscription,
        rates: { base: priceBase, hp: priceHP, hc: priceHC },
        bonus: 0,
        flatRate: 44.99,
        features: ["Maison : Fixe HT 2 ans (abo + kWh)", "Forfait VE : 1 an, reconductible tacite", "Dépassement forfait : tarif fixe HT"]
      },
      {
        id: 'octopus-go',
        name: 'Octopus Go',
        subscription: pSubscription * 1.1, // Approximated
        rates: { base: octoGoHP, hp: octoGoHP, hc: octoGoHC },
        bonus: 0,
        flatRate: 0,
        features: ["Indexé TRV (pas de blocage)", "8 Heures Creuses à moitié prix HP HTT", "2h creuses = 1h pleine"]
      },
      {
        id: 'octotempo',
        name: 'OctoTempo',
        subscription: pSubscription, // Uses base TRV subscription
        isOctoTempo: true,
        rates: {
          eteHC: 0.1325, eteHP: 0.1575,
          hiverHC: 0.1575, hiverHP: 0.1871,
          redHC: 0.1575, redHP: 0.6469
        },
        bonus: 0,
        flatRate: 0,
        features: ["Tarification saisonnière (Été/Hiver)", "22 Jours Rouges en hiver", "Heures creuses intéressantes"]
      },
      {
        id: 'edf-tempo',
        name: 'EDF Tempo',
        subscription: pSubscription * 1.05, // Approximated Tempo sub
        isTempo: true,
        rates: {
          blueHC: 0.1296, blueHP: 0.1609,
          whiteHC: 0.1486, whiteHP: 0.1894,
          redHC: 0.1568, redHP: 0.7562
        },
        bonus: 0,
        flatRate: 0,
        features: ["Prix variables selon couleurs", "300 jours bleus très avantageux", "22 jours rouges très chers"]
      }
    ];

    // Calculate total cost for each offer
    return baseOffers.map(offer => {
      let cost = 0;
      const annualSub = offer.subscription * 12;
      const monthlySub = offer.subscription;
      
      const homeHC = homeConsumption * ((100 - homeHpRatio) / 100);
      const homeHP = homeConsumption * (homeHpRatio / 100);
      const evHC = yearlyEvConsumption * 0.8;
      const evHP = yearlyEvConsumption * 0.2;
      
      const monthlyHomeKwh = homeConsumption / 12;
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
      } else if (offerType === 'hphc' || offer.id === 'octopus-go') {
        homeCost = (homeHC * offer.rates.hc) + (homeHP * offer.rates.hp);
        evCostRaw = (evHC * offer.rates.hc) + (evHP * offer.rates.hp);
        evCostFinal = evCostRaw;
        
        optRate = offer.rates.hc;
        normRate = offer.rates.hp;
        
        if (offer.flatRate > 0) {
          const annualFlatRate = offer.flatRate * 12;
          if (evCostRaw < annualFlatRate) {
            refundMonthly = (annualFlatRate - evCostRaw) / 12;
            evCostFinal = annualFlatRate; // Monthly billing remains the flat rate
          } else {
            overageMonthly = (evCostRaw - annualFlatRate) / 12;
            evCostFinal = evCostRaw; // Billing includes overage
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
        homeCost = homeConsumption * offer.rates.base;
        evCostRaw = yearlyEvConsumption * offer.rates.base;
        evCostFinal = evCostRaw;
        
        optKwh = (yearlyEvConsumption * 0.8) / 12;
        normKwh = (yearlyEvConsumption * 0.2) / 12;
        optRate = offer.rates.base;
        normRate = offer.rates.base;

        if (offer.flatRate > 0) {
          const annualFlatRate = offer.flatRate * 12;
          if (evCostRaw < annualFlatRate) {
            refundMonthly = (annualFlatRate - evCostRaw) / 12;
            evCostFinal = annualFlatRate;
          } else {
            overageMonthly = (evCostRaw - annualFlatRate) / 12;
            evCostFinal = evCostRaw;
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
  }, [power, offerType, homeConsumption, yearlyEvConsumption, totalConsumption, subscriptionDate, homeHpRatio]);

  // Find best offer
  const bestOffer = offers[0];

  return (
    <div className="App">
      <Header 
        power={power} setPower={setPower}
        offerType={offerType} setOfferType={setOfferType}
      />
      <ConsumptionInputs 
        homeConsumption={homeConsumption} setHomeConsumption={setHomeConsumption}
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
    </div>
  );
}

export default App;
