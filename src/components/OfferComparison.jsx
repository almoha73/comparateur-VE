import React from 'react';

function OfferComparison({ offers, selectedOfferId, offerType }) {
  return (
    <div className="card results-container">
      <h2 className="section-title">Comparaison détaillée de toutes les offres</h2>
      
      <div className="offer-cards">
        {offers.map((offer) => {
          const bd = offer.breakdown;
          const isSelected = offer.id === selectedOfferId;

          return (
            <div key={offer.id} className={`offer-card ${isSelected ? 'highlight' : ''}`}>
              {isSelected && <div className="badge-selected">Offre sélectionnée</div>}
                         <div className="offer-card-content">
                <div className="offer-card-left">
                  <div className="offer-header">
                    {offer.id === 'intelligent-octopus' && '🐙 '}
                    {offer.id === 'octopus-go' && '🚙 '}
                    {offer.id === 'eco-conso' && '💡 '}
                    {offer.id === 'emce-2025' && '🤝 '}
                    {offer.id === 'octotempo' && '📅 '}
                    {offer.id === 'drive-pack' && '🚘 '}
                    {offer.id === 'edf-tempo' && '⏱️ '}
                    {offer.id === 'edf-tempo-100hc' && '🌙 '}
                    {offer.name}
                  </div>

                  <div className="detail-box">
                    <ul>
                      {offer.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>

                  {offer.id === 'octopus-go' && offerType === 'base' && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.6rem 0.8rem',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '0.375rem',
                      fontSize: '0.8rem',
                      color: '#f59e0b',
                      lineHeight: '1.4'
                    }}>
                      ⚠️ <strong>Attention :</strong> Cette offre impose un passage du client en option tarifaire <strong>Heures Pleines / Heures Creuses (HP/HC)</strong>.
                    </div>
                  )}

                  <div className="detail-box rates">
                    <div style={{ marginBottom: '0.5rem', color: 'white' }}>🏷️ Tarifs appliqués (TTC)</div>
                    {offer.isTempo ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#60a5fa' }}>Bleu HC: {offer.rates.blueHC}€</span>
                        <span style={{ color: '#60a5fa' }}>Bleu HP: {offer.rates.blueHP}€</span>
                        <span style={{ color: '#e2e8f0' }}>Blanc HC: {offer.rates.whiteHC}€</span>
                        <span style={{ color: '#e2e8f0' }}>Blanc HP: {offer.rates.whiteHP}€</span>
                        <span style={{ color: '#f87171' }}>Rouge HC: {offer.rates.redHC}€</span>
                        <span style={{ color: '#f87171' }}>Rouge HP: {offer.rates.redHP}€</span>
                      </div>
                    ) : offer.isOctoTempo ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.2rem', fontSize: '0.8rem' }}>
                        <span style={{ color: '#fde047' }}>Été HC: {offer.rates.eteHC}€</span>
                        <span style={{ color: '#fde047' }}>Été HP: {offer.rates.eteHP}€</span>
                        <span style={{ color: '#60a5fa' }}>Hiver HC: {offer.rates.hiverHC}€</span>
                        <span style={{ color: '#60a5fa' }}>Hiver HP: {offer.rates.hiverHP}€</span>
                        <span style={{ color: '#f87171' }}>Rouge HC: {offer.rates.redHC}€</span>
                        <span style={{ color: '#f87171' }}>Rouge HP: {offer.rates.redHP}€</span>
                      </div>
                    ) : (offer.id !== 'octopus-go' && offerType === 'base') ? (
                      <div style={{ color: 'var(--color-accent-pink)' }}>Base : {offer.rates.base} €/kWh TTC</div>
                    ) : (
                      <>
                        <div style={{ color: 'var(--color-accent-pink)' }}>HP : {offer.rates.hp} €/kWh TTC</div>
                        <div style={{ color: 'var(--color-accent-pink)' }}>HC : {offer.rates.hc} €/kWh TTC</div>
                      </>
                    )}
                  </div>
                </div>

                <div className="offer-card-middle">
                  <div className="breakdown-row">
                    <span>🧾 Abo Élec</span>
                    <span>{bd.monthlySub.toFixed(2)} €</span>
                  </div>
                  <div className="breakdown-row">
                    <span>🏡 Maison ({bd.monthlyHomeKwh.toFixed(0)} kWh)</span>
                    <span>{bd.monthlyHomeCost.toFixed(2)} €</span>
                  </div>
                  
                  {offer.flatRate === 0 && (
                    <div className="breakdown-row">
                      <span>🚙 Conso VE ({bd.monthlyEvKwh.toFixed(0)} kWh)</span>
                      <span>{bd.monthlyEvCostRaw.toFixed(2)} €</span>
                    </div>
                  )}

                  {offer.flatRate > 0 && (
                    <div className="breakdown-row" style={{ color: 'var(--color-accent-pink)' }}>
                      <span>{bd.monthlyEvCostRaw * 12 > offer.flatRate * 12 ? '🚙 Conso VE (au réel)' : '🚘 Forfait VE'}</span>
                      <span>{bd.monthlyEvCostRaw * 12 > offer.flatRate * 12 ? (bd.monthlyEvCostRaw).toFixed(2) : offer.flatRate.toFixed(2)} €</span>
                    </div>
                  )}

                  {offer.bonus > 0 && (
                    <div className="breakdown-row" style={{ color: '#34d399' }}>
                      <span>🎁 Cagnotte de recharge</span>
                      <span>-{bd.monthlyBonus.toFixed(2)} €</span>
                    </div>
                  )}
                  
                  {(offerType === 'hphc' || offer.isTempo) && offer.id !== 'drive-pack' && offer.bonus === 0 && (
                    <div className="optimization-box" style={{ marginTop: '1rem' }}>
                      <h4>📉 Détail optimisation véhicule :</h4>
                      <div className="opt-detail-row">
                        • {bd.optKwh.toFixed(1)} kWh optimisés (nuit)
                      </div>
                      <div className="opt-detail-row">
                        • {bd.normKwh.toFixed(1)} kWh au tarif normal (jour)
                      </div>
                    </div>
                  )}
                </div>

                <div className="offer-card-right">
                  <div className="breakdown-row total" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                    <span>Total mensuel TTC (Net)</span>
                    <span style={{ textAlign: 'right' }}>
                      <div>{bd.monthlyNetTotal.toFixed(2)} €</div>
                    </span>
                  </div>

                  {offer.bonus > 0 && (
                    <div className="cagnotte-box" style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem', marginTop: '1rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <div style={{ fontWeight: 'bold', color: '#34d399', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <span>🎁 Cagnotte de recharge</span>
                        <span>+{bd.monthlyBonus.toFixed(2)} € / mois</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.2rem' }}>
                          <span style={{ display: 'block' }}>• HC : {bd.optKwh.toFixed(0)} kWh × {offer.bonus.toFixed(4)} €</span>
                          <span style={{ fontWeight: 'bold', display: 'block' }}>={(bd.optKwh * offer.bonus).toFixed(2)} €</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.2rem' }}>
                          <span style={{ display: 'block' }}>• HP : {bd.normKwh.toFixed(0)} kWh × {(offer.bonusHP || 0).toFixed(4)} €</span>
                          <span style={{ fontWeight: 'bold', display: 'block' }}>={(bd.normKwh * (offer.bonusHP || 0)).toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <details className="calculation-details" style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Comment est calculé ce total ?</summary>
                    <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
                      <div><strong>Total Mensuel TTC =</strong></div>
                      <div>+ Abonnement ({bd.monthlySub.toFixed(2)} €)</div>
                      <div>
                        + Consommation Maison ({bd.monthlyHomeCost.toFixed(2)} €)
                        {(offerType === 'hphc' || offer.isTempo || offer.isOctoTempo) && (
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                            ↳ Basé sur votre répartition ({(100 - bd.homeHpRatio || 40)}% HC / {bd.homeHpRatio || 60}% HP)
                          </div>
                        )}
                      </div>
                      {offer.flatRate > 0 ? (
                        <>
                          <div>+ Forfait Véhicule ({offer.flatRate.toFixed(2)} €)</div>
                          {bd.monthlyEvCostRaw * 12 > offer.flatRate * 12 ? (
                            <div style={{ color: '#34d399', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.25rem' }}>
                              💡 <strong>Abonnement avec remboursement de dépassement :</strong>
                              <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#10b981' }}>
                                Consommation VE réelle estimée à {bd.monthlyEvCostRaw.toFixed(2)} €/mois (soit {(bd.monthlyEvCostRaw * 12).toFixed(2)} €/an).<br/>
                                Le surplus (soit {(bd.monthlyRefund * 12).toFixed(2)} €/an) sera déduit à la régul, garantissant un coût net de {offer.flatRate.toFixed(2)} €/mois.
                              </div>
                            </div>
                          ) : (
                            <div style={{ color: '#cbd5e1', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.25rem' }}>
                              ℹ️ <strong>Forfait minimal appliqué :</strong>
                              <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: '#cbd5e1' }}>
                                Consommation VE réelle estimée à {bd.monthlyEvCostRaw.toFixed(2)} €/mois. Inférieure au forfait de {(offer.flatRate * 12).toFixed(2)} €/an, le forfait s'applique donc intégralement.
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div>
                          + Consommation Véhicule ({bd.monthlyEvCostRaw.toFixed(2)} €)
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                            ↳ Répartie à {offer.isTempo100HC ? "100" : "80"}% en HC ({bd.optKwh.toFixed(0)} kWh) et {offer.isTempo100HC ? "0" : "20"}% en HP ({bd.normKwh.toFixed(0)} kWh)
                            {offer.isTempo || offer.isOctoTempo ? " (lissé sur l'année)" : ""}
                          </div>
                        </div>
                      )}
                      {offer.bonus > 0 && (
                        <div style={{ color: '#34d399', marginTop: '0.5rem' }}>
                          <div>- Cagnotte de recharge ({bd.monthlyBonus.toFixed(2)} €)</div>
                          <div style={{ fontSize: '0.75rem', color: '#10b981', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                            <div>↳ HC: {bd.optKwh.toFixed(0)} kWh × {offer.bonus.toFixed(4)} €</div>
                            <div>↳ HP: {bd.normKwh.toFixed(0)} kWh × {(offer.bonusHP || 0).toFixed(4)} €</div>
                          </div>
                        </div>
                      )}
                      <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', marginTop: '0.5rem', lineHeight: '1.2' }}>
                        <div>
                          {bd.monthlyNetTotal.toFixed(2)} € <span style={{ fontSize: '1rem', color: '#cbd5e1', fontWeight: 'normal' }}>/mois net</span>
                        </div>
                      </div>
                      {(offer.isTempo || offer.isOctoTempo) && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' }}>
                          * Pour cette offre dynamique, le coût affiché est une moyenne mensuelle lissée. 
                          Les tarifs sont appliqués proportionnellement au nombre de jours dans l'année : 
                          {offer.isTempo 
                            ? " 300 jours Bleus, 43 jours Blancs et 22 jours Rouges." 
                            : " 214 jours d'Été, 129 jours d'Hiver normaux et 22 jours Rouges."}
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfferComparison;
