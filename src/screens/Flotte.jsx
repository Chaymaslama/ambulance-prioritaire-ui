import { useState } from 'react'
import { Card, Table, statutPill } from '../ui.jsx'
import { getAmbulances, getChauffeurs } from '../api.js'

export default function Flotte() {
  const [chf, setChf] = useState(getChauffeurs())
  const basculer = id => setChf(chf.map(c => c.id === id ? { ...c, statut: c.statut === 'révoqué' ? 'actif' : 'révoqué' } : c))
  return (
    <>
      <h2>Ambulances et chauffeurs</h2>
      <div className="two">
        <Card title="Ambulances"><Table cols={['Numéro', 'Immatriculation', 'Statut']} rows={getAmbulances().map(a => [a.id, a.immat, statutPill(a.statut)])} /></Card>
        <Card title="Chauffeurs"><Table cols={['Nom', 'Badge', 'Statut', 'Action']} rows={chf.map(c => [c.nom, c.badge, statutPill(c.statut), <button className="link" onClick={() => basculer(c.id)}>{c.statut === 'révoqué' ? 'Réactiver' : 'Révoquer'}</button>])} />
          <p className="mu">Un badge révoqué ne donne plus aucune priorité : mission refusée et alerte créée.</p></Card>
      </div>
    </>
  )
}
