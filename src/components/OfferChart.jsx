import React from 'react';

function OfferChart({ offers }) {
  if (!offers || offers.length === 0) return null;

  // Maximum total cost to scale the bars (with a 10% buffer to leave space for the text)
  const maxTotalCost = Math.max(...offers.map(o => o.totalCost)) / 12;
  const maxBarWidth = 85; // Max percentage width of the bar area

  return (
    <div className="offer-chart-card">
      <div className="chart-header">
        <span className="mascot-icon">🐙</span>
        <h2>Comparaison des offres (€ TTC/mois)</h2>
      </div>

      <div className="chart-body">
        {offers.map(offer => {
          const bd = offer.breakdown;
          const abo = bd.monthlySub;
          // Conso takes into account whether there is a flat rate
          const conso = offer.flatRate > 0 ? bd.monthlyHomeCost : (bd.monthlyHomeCost + bd.monthlyEvCostFinal);
          const forfait = offer.flatRate || 0;
          
          // Calculate percentages relative to the maximum total cost
          const pAbo = (abo / maxTotalCost) * maxBarWidth;
          const pConso = (conso / maxTotalCost) * maxBarWidth;
          const pForfait = (forfait / maxTotalCost) * maxBarWidth;
          
          // Total visual width for the entire stacked bar
          const totalPct = pAbo + pConso + pForfait;

          return (
            <div className="chart-row" key={offer.id}>
              <div className="chart-label-col">
                <span className="chart-offer-name">{offer.name.replace(' Fixe Février', '').replace(' Fixe Avril', '')}</span>
              </div>
              <div className="chart-bar-col">
                <div className="chart-bar-wrapper" style={{ width: `${totalPct}%` }}>
                  <div className="chart-segment abo" style={{ width: `${(pAbo / totalPct) * 100}%` }}></div>
                  <div className="chart-segment conso" style={{ width: `${(pConso / totalPct) * 100}%` }}></div>
                  {pForfait > 0 && (
                    <div className="chart-segment forfait" style={{ width: `${(pForfait / totalPct) * 100}%` }}></div>
                  )}
                </div>
                <div className="chart-price-label">
                  {bd.monthlyTotal.toFixed(2)} €
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chart-legend">
        <div className="legend-item"><span className="legend-dot abo"></span>Abo Élec</div>
        <div className="legend-item"><span className="legend-dot conso"></span>Conso Élec</div>
        <div className="legend-item"><span className="legend-dot forfait"></span>Forfait</div>
      </div>

      <div className="chart-summary">
        {offers.map((offer, idx) => {
          let icon = '⚡';
          if (offer.id === 'intelligent-octopus') icon = '🐙';
          if (offer.id === 'octopus-go') icon = '🚙';
          if (offer.id === 'eco-conso') icon = '💡';
          if (offer.id === 'emce-2025') icon = '🤝';
          if (offer.id === 'octotempo') icon = '📅';
          if (offer.id === 'drive-pack') icon = '🚘';
          if (offer.id === 'edf-tempo') icon = '⏱️';

          return (
            <div className={`summary-card ${idx === 0 ? 'best' : ''}`} key={`sum-${offer.id}`}>
              <div className="summary-title">
                <span className="summary-icon">{icon}</span>
                <span className="summary-name">{offer.name.replace(' Fixe Février', '').replace(' Fixe Avril', '')}</span>
              </div>
              <div className="summary-price">
                {offer.breakdown.monthlyTotal.toFixed(2)} € {idx === 0 && <span className="trophy">🏆</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfferChart;
