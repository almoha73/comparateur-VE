import React from 'react';

function VehicleSelector({ vehicleBrand, setVehicleBrand, vehicleModel, setVehicleModel, chargerType, setChargerType, subscriptionDate, setSubscriptionDate }) {
  return (
    <div className="card">
      <h2 className="section-title">Votre Véhicule Électrique</h2>
      
      <div className="grid-2">
        <div className="form-group">
          <label>Marque du véhicule</label>
          <select value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)}>
            <option value="">Sélectionnez une marque...</option>
            <option value="tesla">Tesla</option>
            <option value="peugeot">Peugeot</option>
            <option value="renault">Renault</option>
            <option value="audi">Audi</option>
            <option value="volkswagen">Volkswagen</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Modèle</label>
          <select value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} disabled={!vehicleBrand}>
            <option value="">Sélectionnez un modèle...</option>
            <option value="model3">Model 3 / Y</option>
            <option value="e208">e-208 / e-2008</option>
            <option value="megane">Megane E-Tech</option>
            <option value="id3">ID.3 / ID.4</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Type de borne de recharge</label>
          <select value={chargerType} onChange={(e) => setChargerType(e.target.value)}>
            <option value="prise">Prise renforcée (Green'up)</option>
            <option value="wallbox">Borne classique (Wallbox)</option>
            <option value="v2c">Borne intelligente (V2C / Zaptec)</option>
          </select>
        </div>
      </div>
      
      {vehicleBrand && chargerType && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(0, 230, 230, 0.1)', borderLeft: '4px solid var(--color-accent-cyan)', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <p style={{ margin: 0, color: 'var(--color-accent-cyan)' }}>
            <strong>Bonne nouvelle !</strong> Cette configuration est probablement compatible avec <em>Intelligent Octopus</em>.
          </p>
          <div className="form-group" style={{ marginBottom: 0, maxWidth: '400px' }}>
            <label style={{ color: 'var(--color-accent-cyan)' }}>Date de souscription au contrat :</label>
            <select value={subscriptionDate} onChange={(e) => setSubscriptionDate(e.target.value)} style={{ borderColor: 'rgba(0, 230, 230, 0.3)', backgroundColor: 'rgba(0, 230, 230, 0.05)', color: 'white' }}>
              <option value="pre-feb-2026">Avant Février 2026 (Fixe : 0.12 €/kWh crédité)</option>
              <option value="post-feb-2026">À partir de Février 2026 (Coût recharge ramené à 0.08 €/kWh)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleSelector;
