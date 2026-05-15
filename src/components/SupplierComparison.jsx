import React from 'react';

function SupplierComparison({ competitorCost, setCompetitorCost, bestOctopusCost }) {
  const savings = competitorCost > 0 ? competitorCost - bestOctopusCost : 0;

  return (
    <div className="card" style={{ border: '2px solid var(--color-accent-purple)', background: 'linear-gradient(135deg, var(--color-bg-card) 0%, #1a0b36 100%)' }}>
      <h2 className="section-title">Comparez avec votre fournisseur actuel</h2>
      
      <div className="grid-2" style={{ alignItems: 'center' }}>
        <div className="form-group">
          <label>Votre facture annuelle actuelle estimée (en €)</label>
          <input 
            type="number" 
            value={competitorCost} 
            onChange={(e) => setCompetitorCost(Number(e.target.value))}
            min="0"
            step="50"
            style={{ fontSize: '1.2rem', padding: '1rem' }}
          />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          {competitorCost > 0 ? (
            savings > 0 ? (
              <div>
                <h3 style={{ color: 'var(--color-accent-cyan)', marginBottom: '0.5rem' }}>Économies potentielles</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-accent-cyan)', textShadow: '0 0 15px rgba(0, 230, 230, 0.4)' }}>
                  {Math.round(savings)} € <span style={{ fontSize: '1.5rem' }}>/an</span>
                </div>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>En passant à l'offre Octopus la plus avantageuse</p>
              </div>
            ) : (
              <div>
                <h3 style={{ color: 'var(--color-text-muted)' }}>Votre offre actuelle semble compétitive</h3>
              </div>
            )
          ) : (
            <p style={{ color: 'var(--color-text-muted)' }}>Saisissez votre facture actuelle pour découvrir vos économies.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupplierComparison;
