import { useState } from 'react'
import MapView from '../MapView.jsx'
import { Card, Led, Table, statutPill } from '../ui.jsx'
import { getFeux } from '../api.js'

export default function Feux() {
  const feux = getFeux(), [sel, setSel] = useState(feux[2])
  return (
    <>
      <h2>Gestion des feux</h2>
      <div className="two">
        <div className="mapbox short"><MapView feux={feux} geofence={sel.connexion === 'en ligne' ? sel : null} center={[sel.lat, sel.lon]} /></div>
        <div>
          <Card title="Feux (4 enregistrés, 1 connecté)">
            <Table cols={['Identifiant', 'Carrefour', 'État', 'Connexion', '']} rows={feux.map(f => [f.id, f.nom, statutPill(f.etat === 'priorité' ? 'actif' : f.etat), statutPill(f.connexion === 'en ligne' ? 'en ligne' : f.connexion), <button className="link" onClick={() => setSel(f)}>Voir</button>])} />
          </Card>
          <Card title={'Fiche du feu ' + sel.id}>
            <Led on={sel.connexion === 'en ligne' ? 'v' : null} />
            <Table cols={['Champ', 'Valeur']} rows={[['Position', sel.lat + ', ' + sel.lon], ['Dernier ordre', sel.dernierOrdre || '–'], ['Dernier état reçu', sel.dernierEtat || '–'], ['Wi-Fi ESP32', sel.rssi || '–'], ['Version du logiciel', sel.version || '–'], ['Limite du mode priorité', '30 s']]} />
          </Card>
        </div>
      </div>
    </>
  )
}
