import React, { useState } from 'react';

function CalculationDetails({ power, homeConsumption, homeHpRatio, yearlyEvConsumption, offers }) {
  const [openSection, setOpenSection] = useState(null);

  if (!offers || offers.length === 0) return null;

  const tempo = offers.find(o => o.id === 'edf-tempo');
  const tempo100Hc = offers.find(o => o.id === 'edf-tempo-100hc');
  const octopus = offers.find(o => o.id === 'intelligent-octopus');
  const octotempo = offers.find(o => o.id === 'octotempo');

  if (!tempo || !octopus || !octotempo || !tempo100Hc) return null;

  const homeHpKwh = homeConsumption * (homeHpRatio / 100);
  const homeHcKwh = homeConsumption * ((100 - homeHpRatio) / 100);
  
  const evHpKwh = yearlyEvConsumption * 0.2;
  const evHcKwh = yearlyEvConsumption * 0.8;

  const daysInYear = 365;

  // Tempo Averages
  const tempoAvgHc = (300/daysInYear * tempo.rates.blueHC) + (43/daysInYear * tempo.rates.whiteHC) + (22/daysInYear * tempo.rates.redHC);
  const tempoAvgHp = (300/daysInYear * tempo.rates.blueHP) + (43/daysInYear * tempo.rates.whiteHP) + (22/daysInYear * tempo.rates.redHP);

  // OctoTempo Averages
  const octoAvgHc = (214/daysInYear * octotempo.rates.eteHC) + (129/daysInYear * octotempo.rates.hiverHC) + (22/daysInYear * octotempo.rates.redHC);
  const octoAvgHp = (214/daysInYear * octotempo.rates.eteHP) + (129/daysInYear * octotempo.rates.hiverHP) + (22/daysInYear * octotempo.rates.redHP);

  // Octopus calculations for detail
  const octopusHomeHpCost = homeHpKwh * octopus.rates.hp;
  const octopusHomeHcCost = homeHcKwh * octopus.rates.hc;
  const octopusEvHpBrut = evHpKwh * octopus.rates.hp;
  const octopusEvHcBrut = evHcKwh * octopus.rates.hc;
  const octopusBonusHp = octopus.rates.hp - 0.08;
  const octopusBonusHc = octopus.rates.hc - 0.08;
  const octopusCagnotteAn = (octopus.breakdown.monthlyBonus * 12).toFixed(2);
  const octopusBrutAn = (octopus.breakdown.monthlySub * 12) + octopusHomeHpCost + octopusHomeHcCost + octopusEvHpBrut + octopusEvHcBrut;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const getButtonStyles = (section) => ({
    width: '100%',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: openSection === section ? '#eff6ff' : '#f8fafc',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '1.15rem',
    fontWeight: '600',
    color: '#1e293b',
    transition: 'background-color 0.2s'
  });

  return (
    <div style={{
      margin: '2rem auto',
      maxWidth: '1200px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      
      {/* ---------------- EDF TEMPO ---------------- */}
      <button 
        onClick={() => toggleSection('tempo')}
        style={getButtonStyles('tempo')}
      >
        <span>📊 Détail des Calculs : EDF Tempo vs Intelligent Octopus</span>
        <span style={{ fontSize: '1.5rem', color: '#64748b' }}>{openSection === 'tempo' ? '−' : '+'}</span>
      </button>

      {openSection === 'tempo' && (
        <div style={{ padding: '2rem', color: '#334155', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <p><em>Ces calculs s'adaptent dynamiquement en fonction de la puissance et des consommations que vous avez renseignées.</em></p>
          
          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Paramètres de la simulation</h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Puissance souscrite :</strong> {power} kVA</li>
            <li><strong>Consommation de la maison :</strong> {homeConsumption.toFixed(0)} kWh / an ({homeHpRatio}% HP / {100 - homeHpRatio}% HC)
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', color: '#64748b' }}>
                <li>Soit : {homeHpKwh.toFixed(0)} kWh en HP et {homeHcKwh.toFixed(0)} kWh en HC</li>
              </ul>
            </li>
            <li><strong>Consommation du véhicule (VE) :</strong> {yearlyEvConsumption.toFixed(0)} kWh / an (20% HP / 80% HC par défaut)
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', color: '#64748b' }}>
                <li>Soit : {evHpKwh.toFixed(0)} kWh en HP et {evHcKwh.toFixed(0)} kWh en HC</li>
              </ul>
            </li>
          </ul>

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Calcul avec EDF Tempo (Mensualité : {tempo.breakdown.monthlyNetTotal.toFixed(2)} €)</h3>
          <p>La spécificité d'EDF Tempo est la fluctuation du prix selon les jours. Pour obtenir une mensualité stable, nous calculons un prix "moyen lissé" sur l'année.</p>
          
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>A. Le "Prix Moyen Lissé" Tempo calculé par l'algorithme</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Moyenne HC annuelle</strong> = {tempoAvgHc.toFixed(5)} € / kWh</li>
            <li><strong>Moyenne HP annuelle</strong> = {tempoAvgHp.toFixed(5)} € / kWh</li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>B. La facture annuelle Tempo</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Abonnement ({power} kVA) :</strong> ~{(tempo.breakdown.monthlySub * 12).toFixed(2)} € / an</li>
            <li><strong>Maison :</strong> {(tempo.breakdown.monthlyHomeCost * 12).toFixed(2)} € / an</li>
            <li><strong>Véhicule (VE) :</strong> {(tempo.breakdown.monthlyEvCostRaw * 12).toFixed(2)} € / an</li>
          </ul>
          <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
            TOTAL ANNUEL TEMPO : {tempo.totalCost.toFixed(2)} €<br/>
            MENSUALITÉ LISSÉE TEMPO : {tempo.breakdown.monthlyNetTotal.toFixed(2)} € / mois
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', borderLeft: '4px solid #3b82f6', backgroundColor: '#eff6ff', borderRadius: '0 4px 4px 0', fontSize: '0.9rem' }}>
            <h4 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#1e40af' }}>Variante : Si le client recharge 100% en Heures Creuses</h4>
            <p style={{ margin: 0 }}>
              Si le client s'assure de ne jamais brancher son véhicule en Heures Pleines ({yearlyEvConsumption.toFixed(0)} kWh rechargés exclusivement de nuit) :
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
              <li><strong>Véhicule (VE) :</strong> {yearlyEvConsumption.toFixed(0)} kWh × {tempoAvgHc.toFixed(5)} € = {(tempo100Hc.breakdown.monthlyEvCostRaw * 12).toFixed(2)} € / an (au lieu de {(tempo.breakdown.monthlyEvCostRaw * 12).toFixed(2)} €)</li>
              <li><strong>TOTAL ANNUEL TEMPO :</strong> {tempo100Hc.totalCost.toFixed(2)} €</li>
              <li><strong>MENSUALITÉ LISSÉE TEMPO : {tempo100Hc.breakdown.monthlyNetTotal.toFixed(2)} € / mois</strong></li>
            </ul>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#475569' }}>
              À noter : Avec Intelligent Octopus, le coût final de recharge reste contractuellement plafonné à 0,08 € / kWh grâce à la cagnotte. La mensualité Octopus reste donc à {octopus.breakdown.monthlyNetTotal.toFixed(2)} € / mois (que la recharge se fasse en HC ou en HP).
            </p>
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Calcul avec Intelligent Octopus (Mensualité : {octopus.breakdown.monthlyNetTotal.toFixed(2)} €)</h3>
          
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>A. La facture brute annuelle (avant remise de la cagnotte)</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Abonnement ({power} kVA) :</strong> {(octopus.breakdown.monthlySub * 12).toFixed(2)} € / an</li>
            <li><strong>Maison :</strong> {(octopus.breakdown.monthlyHomeCost * 12).toFixed(2)} € / an</li>
            <li><strong>Véhicule (VE) brut :</strong> {(octopus.breakdown.monthlyEvCostRaw * 12).toFixed(2)} € / an</li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>B. Le calcul de la Cagnotte (Bonus de recharge intelligente)</h4>
          <p>Total Cagnotte Annuelle : {octopusCagnotteAn} € remboursés</p>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>C. La facture annuelle nette</h4>
          <p>On prend le coût brut et on déduit la cagnotte générée : {octopusBrutAn.toFixed(2)} € - {octopusCagnotteAn} € = {octopus.totalCost.toFixed(2)} €</p>
          <div style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
            TOTAL ANNUEL OCTOPUS : {octopus.totalCost.toFixed(2)} €<br/>
            MENSUALITÉ LISSÉE OCTOPUS : {octopus.breakdown.monthlyNetTotal.toFixed(2)} € / mois
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>4. Bilan Financier</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Économie réalisée avec Intelligent Octopus par rapport à Tempo (classique) : <strong>{(tempo.breakdown.monthlyNetTotal - octopus.breakdown.monthlyNetTotal).toFixed(2)} € / mois</strong> (soit environ <strong>{((tempo.breakdown.monthlyNetTotal - octopus.breakdown.monthlyNetTotal) * 12).toFixed(0)} € / an</strong>).</li>
          </ul>
        </div>
      )}

      {/* ---------------- OCTOTEMPO ---------------- */}
      <button 
        onClick={() => toggleSection('octotempo')}
        style={{...getButtonStyles('octotempo'), borderBottom: openSection === 'octotempo' ? '1px solid #e2e8f0' : 'none'}}
      >
        <span>📊 Détail des Calculs : OctoTempo vs Intelligent Octopus</span>
        <span style={{ fontSize: '1.5rem', color: '#64748b' }}>{openSection === 'octotempo' ? '−' : '+'}</span>
      </button>

      {openSection === 'octotempo' && (
        <div style={{ padding: '2rem', color: '#334155', lineHeight: '1.6', fontSize: '0.95rem' }}>
          <p><em>Même logique que pour EDF Tempo, mais appliquée aux tarifs saisonniers d'OctoTempo (saisonnalité propre à Octopus Energy).</em></p>
          
          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Calcul avec OctoTempo (Mensualité : {octotempo.breakdown.monthlyNetTotal.toFixed(2)} €)</h3>
          <p>Les prix varient selon la saison (Été / Hiver) et la couleur du jour. Nous calculons un prix moyen lissé sur l'année.</p>
          
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>A. Le "Prix Moyen Lissé" OctoTempo</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Moyenne HC annuelle</strong> = (58,63% × {octotempo.rates.eteHC}) + (35,34% × {octotempo.rates.hiverHC}) + (6,03% × {octotempo.rates.redHC}) = <strong>{octoAvgHc.toFixed(5)} € / kWh</strong></li>
            <li><strong>Moyenne HP annuelle</strong> = (58,63% × {octotempo.rates.eteHP}) + (35,34% × {octotempo.rates.hiverHP}) + (6,03% × {octotempo.rates.redHP}) = <strong>{octoAvgHp.toFixed(5)} € / kWh</strong></li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>B. La facture annuelle OctoTempo</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Abonnement ({power} kVA) :</strong> {(octotempo.breakdown.monthlySub * 12).toFixed(2)} € / an</li>
            <li><strong>Maison :</strong>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>HC : {homeHcKwh.toFixed(2)} kWh × {octoAvgHc.toFixed(5)} €</li>
                <li>HP : {homeHpKwh.toFixed(2)} kWh × {octoAvgHp.toFixed(5)} €</li>
                <li><em>Sous-total = {(octotempo.breakdown.monthlyHomeCost * 12).toFixed(2)} €</em></li>
              </ul>
            </li>
            <li><strong>Véhicule (VE) :</strong>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>HC : {evHcKwh.toFixed(2)} kWh × {octoAvgHc.toFixed(5)} €</li>
                <li>HP : {evHpKwh.toFixed(2)} kWh × {octoAvgHp.toFixed(5)} €</li>
                <li><em>Sous-total = {(octotempo.breakdown.monthlyEvCostRaw * 12).toFixed(2)} €</em></li>
              </ul>
            </li>
          </ul>
          <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
            TOTAL ANNUEL OCTOTEMPO : {octotempo.totalCost.toFixed(2)} €<br/>
            MENSUALITÉ LISSÉE OCTOTEMPO : {octotempo.breakdown.monthlyNetTotal.toFixed(2)} € / mois
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Bilan Financier : OctoTempo vs Intelligent Octopus</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Coût mensuel OctoTempo : <strong>{octotempo.breakdown.monthlyNetTotal.toFixed(2)} €</strong></li>
            <li>Coût mensuel Intelligent Octopus (après cagnotte) : <strong>{octopus.breakdown.monthlyNetTotal.toFixed(2)} €</strong></li>
            <li>Économie réalisée avec Intelligent Octopus par rapport à OctoTempo : <strong>{(octotempo.breakdown.monthlyNetTotal - octopus.breakdown.monthlyNetTotal).toFixed(2)} € / mois</strong> (soit environ <strong>{((octotempo.breakdown.monthlyNetTotal - octopus.breakdown.monthlyNetTotal) * 12).toFixed(0)} € / an</strong>).</li>
            <li>Tout comme pour EDF Tempo, le tarif garanti à 0,08 € / kWh de la recharge via l'algorithme Octopus creuse considérablement l'écart en faveur de l'offre Intelligent Octopus pour un propriétaire de véhicule électrique.</li>
          </ul>
        </div>
      )}

    </div>
  );
}

export default CalculationDetails;
