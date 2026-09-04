import React from 'react';

function Header({ power, setPower, offerType, setOfferType }) {
  return (
    <div className="card header">
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 1rem',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '9999px',
        color: '#34d399',
        fontSize: '0.88rem',
        fontWeight: '600',
        marginBottom: '0.75rem'
      }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          boxShadow: '0 0 8px #10b981'
        }}></span>
        Site à jour avec les derniers tarifs d'août 2026
      </div>

      <h1>Comparateur d'offres VE</h1>
      
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
