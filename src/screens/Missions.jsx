import { useState } from 'react'
import MapView from '../MapView.jsx'
import { Card, Field, Table, statutPill } from '../ui.jsx'
import { getAmbulances, getChauffeurs, getFeux, getMissions, getRoute } from '../api.js'

export default function Missions() {
  const [list, setList] = useState(getMissions()), [pick, setPick] = useState(null)
  const [amb, setAmb] = useState('AMB07'), [chf, setChf] = useState(getChauffeurs()[0].nom), [msg, setMsg] = useState('')
  const creer = () => {
    const c = getChauffeurs().find(x => x.nom === chf)
    if (!pick) return setMsg('Cliquez sur la carte pour choisir la destination.')
    if (c.statut === 'révoqué') return setMsg('Chauffeur révoqué : mission refusée.')
    setList([{ id: list[0].id + 1, ambulance: amb, chauffeur: chf, destination: pick.lat.toFixed(4) + ', ' + pick.lng.toFixed(4), date: 'maintenant', duree: '–', statut: 'créée' }, ...list])
    setMsg('Mission créée (statut « créée »).')
  }
  return (
    <>
      <h2>Créer une mission</h2>
      <div className="two">
        <Card>
          <Field label="Ambulance"><select value={amb} onChange={e => setAmb(e.target.value)}>{getAmbulances().filter(a => a.statut === 'active').map(a => <option key={a.id}>{a.id}</option>)}</select></Field>
          <Field label="Chauffeur"><select value={chf} onChange={e => setChf(e.target.value)}>{getChauffeurs().map(c => <option key={c.id}>{c.nom}</option>)}</select></Field>
          <Field label="Destination (cliquer sur la carte)"><input readOnly value={pick ? pick.lat.toFixed(4) + ', ' + pick.lng.toFixed(4) : ''} placeholder="Aucune destination" /></Field>
          <Field label="Heure de début"><input type="time" defaultValue="14:00" /></Field>
          <p className="mu">Trajet calculé : 3,4 km · 7 min · 1 feu connecté (TN-TUN-0012)</p>
          <button className="btn" onClick={creer}>Créer la mission</button>{msg && <p className="err">{msg}</p>}
        </Card>
        <div className="mapbox short"><MapView feux={getFeux()} route={getRoute()} pick={pick} onPick={setPick} /></div>
      </div>
      <Card title="Missions du jour"><Table cols={['N°', 'Ambulance', 'Chauffeur', 'Destination', 'Date', 'Statut']} rows={list.map(m => [m.id, m.ambulance, m.chauffeur, m.destination, m.date, statutPill(m.statut)])} /></Card>
    </>
  )
}
