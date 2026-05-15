import React from 'react';

function Header({ power, setPower, offerType, setOfferType }) {
  return (
    <div className="card header">
      <h1>Comparateur d'offres VE</h1>
      <p>Estimez vos coûts de recharge et optimisez votre contrat d'électricité</p>
      
      <div className="grid-2" style={{ marginTop: '2rem', textAlign: 'left' }}>
        <div className="form-group">
          <label>Puissance souscrite (kVA)</label>
          <select value={power} onChange={(e) => setPower(e.target.value)}>
            <option value="6">6 kVA</option>
            <option value="9">9 kVA</option>
            <option value="12">12 kVA</option>
            <option value="36">36 kVA</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Type de tarification actuel</label>
          <select value={offerType} onChange={(e) => setOfferType(e.target.value)}>
            <option value="base">Option Base</option>
            <option value="hphc">Heures Pleines / Heures Creuses</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;
