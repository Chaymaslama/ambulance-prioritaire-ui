import { useEffect, useState } from 'react'
import MapView from '../MapView.jsx'
import { Led, Pill } from '../ui.jsx'
import { getFeux, getRoute, subscribePosition } from '../api.js'

export default function Chauffeur() {
  const [pos, setPos] = useState(null)
  useEffect(() => subscribePosition(setPos), [])
  const prio = !!pos && pos.distance < 100 && !pos.passe
  const feux = getFeux().map(f => f.id === 'TN-TUN-0012' ? { ...f, etat: prio ? 'priorité' : 'normal' } : f)
  return (
    <div className="phone">
      <div className="pmap"><MapView feux={feux} route={getRoute()} ambulance={pos} zoom={15} /></div>
      <div className="card"><p className="mu">Prochain feu · TN-TUN-0012</p><div className="big">{pos ? Math.round(pos.distance) + ' m' : '–'}</div>
        <Led on={prio ? 'v' : 'r'} /><Pill c={prio ? 'g' : 'm'}>{prio ? 'Vert prioritaire' : 'Cycle normal'}</Pill></div>
      <div className="card"><b>Mission 1042</b><p className="mu">Destination : domicile du malade<br />Arrivée estimée 14:09</p></div>
      <div className="card"><b className="ok">Badge A1F3 · Ben Ali, Sami</b></div>
      <button className="btn dark wide">Terminer la mission</button>
      <p className="mu">Écran en lecture : ne pas le manipuler en conduisant.</p>
    </div>
  )
}
