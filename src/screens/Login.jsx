import { useState } from 'react'
import { Field } from '../ui.jsx'
import { getChauffeurs } from '../api.js'

export default function Login({ onLogin }) {
  const [role, setRole] = useState('Régulateur'), [badge, setBadge] = useState('A1F3'), [msg, setMsg] = useState('')
  const verifier = () => {
    const c = getChauffeurs().find(x => x.badge === badge)
    if (!c) return setMsg('Badge inconnu : accès refusé, alerte enregistrée.')
    if (c.statut === 'révoqué') return setMsg('Badge révoqué : accès refusé, alerte enregistrée.')
    onLogin('Chauffeur')
  }
  return (
    <div className="login">
      <div className="card"><h2>Connexion</h2>
        <Field label="Identifiant"><input defaultValue="regulateur1" /></Field>
        <Field label="Mot de passe"><input type="password" defaultValue="motdepasse" /></Field>
        <div className="chips">{['Régulateur', 'Chauffeur', 'Administrateur'].map(r => <button key={r} className={'chip' + (r === role ? ' on' : '')} onClick={() => setRole(r)}>{r}</button>)}</div>
        <button className="btn" onClick={() => role === 'Chauffeur' ? verifier() : onLogin(role)}>Se connecter</button>
      </div>
      <div className="card"><h3>Chauffeur : badge RFID (simulé)</h3>
        <Field label="Badge"><select value={badge} onChange={e => { setBadge(e.target.value); setMsg('') }}>
          {getChauffeurs().map(c => <option key={c.id} value={c.badge}>{c.badge} · {c.nom}</option>)}<option value="0000">0000 · inconnu</option></select></Field>
        <button className="btn dark" onClick={verifier}>Valider le badge</button>
        {msg && <p className="err">{msg}</p>}
      </div>
    </div>
  )
}
