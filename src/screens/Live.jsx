import { useEffect, useState } from 'react'
import MapView from '../MapView.jsx'
import { Card, Pill, Led } from '../ui.jsx'
import { getFeux, getRoute, subscribePosition } from '../api.js'

export default function Live() {
  const [pos, setPos] = useState(null), [run, setRun] = useState(0)
  useEffect(() => { setPos(null); return subscribePosition(setPos) }, [run])
  const prio = !!pos && pos.distance < 100 && !pos.passe
  const feux = getFeux().map(f => f.id === 'TN-TUN-0012' ? { ...f, etat: prio ? 'priorité' : 'normal' } : f)
  const feu = feux[2], pct = pos ? Math.round(pos.index / (pos.total - 1) * 100) : 0
  return (
    <div className="live">
      <div className="mapbox"><MapView feux={feux} route={getRoute()} ambulance={pos} geofence={feu} /></div>
      <div className="side">
        <Card title="Mission 1042"><p>AMB07 · Ben Ali, Sami<br />Destination : domicile du malade</p><Pill c="g">En route</Pill></Card>
        <Card title="Feu TN-TUN-0012">
          <Led on={prio ? 'v' : 'r'} /><Pill c={prio ? 'g' : 'm'}>{prio ? 'Priorité active' : 'Cycle normal'}</Pill>
          <div className="big">{pos ? Math.round(pos.distance) + ' m' : '–'}</div><p className="mu">distance ambulance et feu</p>
          <p>Détection : {prio ? '14:02:11' : '–'}<br />Vert : {prio ? '14:02:12' : '–'}<br />Temps gagné (simulé) : {pos && pos.passe ? '24 s' : '–'}</p>
        </Card>
        <Card title="Progression"><div className="bar"><i style={{ width: pct + '%' }} /></div><p className="mu">Hôpital → Feu 0012 → Malade · {pct} %</p>
          <button className="btn dark" onClick={() => setRun(run + 1)}>Relancer la simulation</button></Card>
        <Card title="Alerte récente"><p className="err">14:03 · AMB99 inconnue, refusée</p></Card>
      </div>
    </div>
  )
}
