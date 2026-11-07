import { useState } from 'react'
import { Pill } from '../ui.jsx'
import { getAlertes } from '../api.js'

export default function Alertes() {
  const [list, setList] = useState(getAlertes()), [f, setF] = useState('Toutes')
  const types = ['Toutes', 'Mission invalide', 'Réseau', 'Feu']
  return (
    <>
      <h2>Alertes</h2>
      <div className="chips">{types.map(t => <button key={t} className={'chip' + (t === f ? ' on' : '')} onClick={() => setF(t)}>{t}</button>)}</div>
      {list.filter(a => f === 'Toutes' || a.type === f).map(a => (
        <div key={a.id} className={'alerte ' + a.gravite}>
          <div><b>{a.type}</b> <Pill c={a.gravite}>{a.gravite === 'r' ? 'grave' : 'attention'}</Pill><p className="mu">{a.msg}</p></div>
          <span>{a.heure}</span><button className="btn dark" onClick={() => setList(list.filter(x => x.id !== a.id))}>Acquitter</button>
        </div>))}
      {!list.length && <p className="mu">Aucune alerte.</p>}
    </>
  )
}
