import React from 'react';

function ConsumptionInputs({ 
  homeConsumption, setHomeConsumption, 
  totalConsumptionInput, setTotalConsumptionInput,
  hasTotalInput, yearlyEvConsumption,
  evInputMode, setEvInputMode, 
  evPeriod, setEvPeriod, 
  evInputValue, setEvInputValue,
  evEfficiency, setEvEfficiency,
  homeHpRatio, setHomeHpRatio 
}) {

  // Conversions for display
  let displayedEnergy = 0;
  let displayedDistance = 0;

  if (evInputMode === 'distance') {
    const monthlyDistance = evPeriod === 'month' ? evInputValue : evInputValue / 12;
    displayedDistance = monthlyDistance;
    displayedEnergy = monthlyDistance * (evEfficiency / 100);
  } else {
    const monthlyEnergy = evPeriod === 'month' ? evInputValue : evInputValue / 12;
    displayedEnergy = monthlyEnergy;
    displayedDistance = monthlyEnergy / (evEfficiency / 100);
  }

  return (
    <div className="card">
      <h2 className="section-title">Estimation de la Consommation</h2>
      
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        <div className="form-group">
          <label>Consommation annuelle totale du logement (kWh/an, Optionnel)</label>
          <input 
            type="number" 
            placeholder="Ex: 8000 (VE inclus)"
            value={totalConsumptionInput} 
            onChange={(e) => setTotalConsumptionInput(e.target.value === '' ? '' : Number(e.target.value))}
            min="0"
            step="100"
            style={{ backgroundColor: 'rgba(30, 27, 75, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
          />
          <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.25rem', fontSize: '0.8rem' }}>
            Remplir si vous connaissez la consommation globale logement + VE.
          </small>
        </div>

        <div className="form-group">
          <label>
            Consommation domestique {hasTotalInput ? '(calculée hors VE)' : '(hors VE)'} en kWh/an
          </label>
          <input 
            type="number" 
            value={Math.round(homeConsumption)} 
            onChange={(e) => setHomeConsumption(Number(e.target.value))}
            disabled={hasTotalInput}
            min="0"
            step="100"
            style={{ 
              opacity: hasTotalInput ? 0.7 : 1, 
              cursor: hasTotalInput ? 'not-allowed' : 'text',
              backgroundColor: hasTotalInput ? 'rgba(255, 255, 255, 0.05)' : '',
              borderColor: hasTotalInput ? 'rgba(255, 255, 255, 0.05)' : ''
            }}
          />
          {hasTotalInput ? (
            <small style={{ color: '#34d399', display: 'block', marginTop: '0.25rem', fontSize: '0.8rem' }}>
              ✓ Déduite automatiquement : {Math.round(totalConsumptionInput)} - {Math.round(yearlyEvConsumption)} (VE)
            </small>
          ) : (
            <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.25rem', fontSize: '0.8rem' }}>
              Saisie directe (la consommation du VE s'ajoutera automatiquement).
            </small>
          )}
        </div>
      </div>

      <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.2rem' }}>Consommation véhicule</h3>
      
      <div className="ev-consumption-panel">
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Consommation</label>
        
        <div className="toggles-grid">
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${evInputMode === 'distance' ? 'active-pink' : ''}`}
              onClick={() => setEvInputMode('distance')}
            >
              📍 Distance
            </button>
            <button 
              className={`toggle-btn ${evInputMode === 'energy' ? 'active-pink' : ''}`}
              onClick={() => setEvInputMode('energy')}
            >
              ⚡ Énergie
            </button>
          </div>
          
          <div className="toggle-group">
            <button 
              className={`toggle-btn ${evPeriod === 'month' ? 'active-blue' : ''}`}
              onClick={() => setEvPeriod('month')}
            >
              Par mois
            </button>
            <button 
              className={`toggle-btn ${evPeriod === 'year' ? 'active-blue' : ''}`}
              onClick={() => setEvPeriod('year')}
            >
              Par an
            </button>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '1.5rem' }}>
          <label>
            {evInputMode === 'distance' ? 'Distance parcourue' : 'Énergie consommée'} 
            ({evInputMode === 'distance' ? 'km' : 'kWh'}/{evPeriod === 'month' ? 'mois' : 'an'})
          </label>
          <input 
            type="number" 
            value={evInputValue} 
            onChange={(e) => setEvInputValue(Number(e.target.value))}
            min="0"
            style={{ backgroundColor: 'rgba(30, 27, 75, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>

        <div className="form-group" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
          <label>
            Consommation moyenne du véhicule (kWh / 100 km)
          </label>
          <input 
            type="number" 
            value={evEfficiency} 
            onChange={(e) => setEvEfficiency(Number(e.target.value))}
            min="10"
            max="40"
            step="0.1"
            style={{ backgroundColor: 'rgba(30, 27, 75, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>

        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          {evInputMode === 'distance' 
            ? `Énergie estimée : ${displayedEnergy.toFixed(1)} kWh/mois` 
            : `Distance estimée : ${displayedDistance.toFixed(0)} km/mois`}
        </div>

        <div className="slider-section">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', marginBottom: '1rem' }}>
            ☀️ Répartition Heures Pleines / Heures Creuses
          </label>
          
          <div className="slider-container">
            <input 
              type="range" 
              min="0" max="100" 
              value={homeHpRatio}
              onChange={(e) => setHomeHpRatio(Number(e.target.value))}
              className="custom-slider"
              style={{ '--val': `${homeHpRatio}%` }}
            />
            <div className="slider-labels">
              <span>☀️ HP: {homeHpRatio}%</span>
              <span>🌙 HC: {100 - homeHpRatio}%</span>
            </div>
          </div>
           <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Ajustez la répartition HP/HC pour la consommation du foyer (hors VE). Par défaut : 60% HP / 40% HC.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConsumptionInputs;
