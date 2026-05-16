import React, { useState } from 'react';

function CalculationDetails() {
  const [openSection, setOpenSection] = useState(null);

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
          <p><em>Ce document retrace l'intégralité du cheminement mathématique qui permet d'aboutir aux mensualités estimées. À fournir au client s'il souhaite vérifier la pertinence de l'algorithme.</em></p>
          
          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Paramètres de la simulation</h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Puissance souscrite :</strong> 9 kVA</li>
            <li><strong>Consommation de la maison :</strong> 4 057 kWh / an (59% HP / 41% HC)</li>
            <li><strong>Consommation du véhicule (VE) :</strong> 2 880 kWh / an (20% HP / 80% HC)</li>
          </ul>

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Calcul avec EDF Tempo (Mensualité : 114,48 €)</h3>
          <p>La spécificité d'EDF Tempo est la fluctuation du prix selon les jours. Pour obtenir une mensualité stable, nous calculons un prix "moyen lissé" sur l'année.</p>
          
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>A. Le "Prix Moyen Lissé" Tempo calculé par l'algorithme</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Moyenne HC annuelle</strong> = 0,13347 € / kWh</li>
            <li><strong>Moyenne HP annuelle</strong> = 0,20013 € / kWh</li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>B. La facture annuelle Tempo</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Abonnement (9 kVA) :</strong> ~249,86 € / an</li>
            <li><strong>Maison :</strong> 701,04 € / an</li>
            <li><strong>Véhicule (VE) :</strong> 422,78 € / an</li>
          </ul>
          <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
            TOTAL ANNUEL TEMPO : 1 373,68 €<br/>
            MENSUALITÉ LISSÉE TEMPO : 114,48 € / mois
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Calcul avec Intelligent Octopus (Mensualité : 101,10 €)</h3>
          
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>A. La facture brute annuelle (avant remise de la cagnotte)</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Abonnement (9 kVA) :</strong> 237,96 € / an</li>
            <li><strong>Maison :</strong> 744,79 € / an</li>
            <li><strong>Véhicule (VE) brut :</strong> 475,25 € / an</li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>B. Le calcul de la Cagnotte (Bonus de recharge intelligente)</h4>
          <p>Total Cagnotte Annuelle : 244,85 € remboursés</p>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>C. La facture annuelle nette</h4>
          <p>On prend le coût brut et on déduit la cagnotte générée : 1 458,00 € - 244,85 € = 1 213,15 €</p>
          <div style={{ backgroundColor: '#ecfdf5', color: '#065f46', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
            TOTAL ANNUEL OCTOPUS : 1 213,15 €<br/>
            MENSUALITÉ LISSÉE OCTOPUS : 101,10 € / mois
          </div>
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

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>1. Paramètres de la simulation</h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li><strong>Puissance souscrite :</strong> 9 kVA</li>
            <li><strong>Consommation de la maison :</strong> 4 057 kWh / an (59% HP / 41% HC)</li>
            <li><strong>Consommation du véhicule (VE) :</strong> 2 880 kWh / an (20% HP / 80% HC)</li>
          </ul>

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>2. Calcul avec OctoTempo (Mensualité : 115,92 €)</h3>
          <p>Les prix varient selon la saison (Été / Hiver) et la couleur du jour. Nous calculons un prix moyen lissé sur l'année.</p>
          
          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>A. Les tarifs OctoTempo au kWh (TTC)</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Période Été (214 j, soit 58,63%) : HC 0,1325 € / HP 0,1575 €</li>
            <li>Période Hiver "Normale" (129 j, soit 35,34%) : HC 0,1575 € / HP 0,1871 €</li>
            <li>Jours Rouges (22 j, soit 6,03%) : HC 0,1575 € / HP 0,6469 €</li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>B. Le "Prix Moyen Lissé" OctoTempo</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Moyenne HC annuelle</strong> = (58,63% × 0,1325) + (35,34% × 0,1575) + (6,03% × 0,1575) = <strong>0,14284 € / kWh</strong></li>
            <li><strong>Moyenne HP annuelle</strong> = (58,63% × 0,1575) + (35,34% × 0,1871) + (6,03% × 0,6469) = <strong>0,19747 € / kWh</strong></li>
          </ul>

          <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>C. La facture annuelle OctoTempo</h4>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Abonnement (9 kVA) :</strong> 237,96 € / an</li>
            <li><strong>Maison :</strong>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>HC : 1 663,37 kWh × 0,14284 € = 237,60 €</li>
                <li>HP : 2 393,63 kWh × 0,19747 € = 472,67 €</li>
                <li><em>Sous-total = 710,27 €</em></li>
              </ul>
            </li>
            <li><strong>Véhicule (VE) :</strong>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>HC : 2 304 kWh × 0,14284 € = 329,11 €</li>
                <li>HP : 576 kWh × 0,19747 € = 113,74 €</li>
                <li><em>Sous-total = 442,85 €</em></li>
              </ul>
            </li>
          </ul>
          <div style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
            TOTAL ANNUEL OCTOTEMPO : 1 391,08 €<br/>
            MENSUALITÉ LISSÉE OCTOTEMPO : 115,92 € / mois
          </div>

          <hr style={{ margin: '1.5rem 0', borderColor: '#e2e8f0' }} />

          <h3 style={{ color: '#0f172a', marginBottom: '1rem' }}>3. Bilan Financier : OctoTempo vs Intelligent Octopus</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Coût mensuel OctoTempo : <strong>115,92 €</strong></li>
            <li>Coût mensuel Intelligent Octopus (après cagnotte) : <strong>101,10 €</strong></li>
            <li>Économie réalisée avec Intelligent Octopus par rapport à OctoTempo : <strong>14,82 € / mois</strong> (soit environ <strong>178 € / an</strong>).</li>
            <li>Tout comme pour EDF Tempo, le tarif garanti à 0,08 € / kWh de la recharge via l'algorithme Octopus creuse considérablement l'écart en faveur de l'offre Intelligent Octopus pour un propriétaire de véhicule électrique.</li>
          </ul>
        </div>
      )}

    </div>
  );
}

export default CalculationDetails;
