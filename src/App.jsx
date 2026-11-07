import { useState } from 'react'
import Login from './screens/Login.jsx'
import Live from './screens/Live.jsx'
import Missions from './screens/Missions.jsx'
import Suivi from './screens/Suivi.jsx'
import Feux from './screens/Feux.jsx'
import Flotte from './screens/Flotte.jsx'
import Historique from './screens/Historique.jsx'
import Alertes from './screens/Alertes.jsx'
import Reglages from './screens/Reglages.jsx'
import Chauffeur from './screens/Chauffeur.jsx'

const SCREENS = { 'Carte en direct': Live, Missions, Suivi, Feux, Flotte, Historique, Alertes, 'Réglages': Reglages, 'Chauffeur (mobile)': Chauffeur }
const MENU = {
  'Régulateur': ['Carte en direct', 'Missions', 'Suivi', 'Feux', 'Historique', 'Alertes'],
  'Administrateur': Object.keys(SCREENS),
  'Chauffeur': ['Chauffeur (mobile)'],
}

export default function App() {
  const [role, setRole] = useState(null), [page, setPage] = useState('')
  if (!role) return <Login onLogin={r => { setRole(r); setPage(MENU[r][0]) }} />
  const Screen = SCREENS[page]
  return (
    <div className="app">
      <aside>
        <h1>Ambulance<small>prioritaire</small></h1>
        {MENU[role].map(p => <button key={p} className={p === page ? 'on' : ''} onClick={() => setPage(p)}>{p}</button>)}
        <div className="spacer" />
        <small>{role} · regulateur1</small>
        <button onClick={() => setRole(null)}>Déconnexion</button>
      </aside>
      <main><Screen /></main>
    </div>
  )
}
