import MapView from '../MapView.jsx'
import { Card } from '../ui.jsx'
import { getEvenements, getFeux, getPassages, getRoute, exportCsv } from '../api.js'

export default function Suivi() {
  return (
    <>
      <h2>Suivi de la mission 1042</h2>
      <div className="two">
        <Card title="Chronologie"><ol className="tl">{getEvenements().map(([h, t]) => <li key={h}><b>{t}</b><span>{h}</span></li>)}</ol></Card>
        <div>
          <div className="mapbox short"><MapView feux={getFeux()} route={getRoute()} /></div>
          <div className="three">
            <Card title="Chauffeur"><b>Ben Ali, Sami</b><p className="mu">Badge A1F3 · actif</p></Card>
            <Card title="Ambulance"><b>AMB07</b><p className="mu">Statut actif</p></Card>
            <Card title="Résultat"><b className="ok">24 s gagnées</b><p className="mu">1 feu sur 1 franchi</p></Card>
          </div>
          <button className="btn dark" onClick={() => exportCsv('passages.csv', getPassages())}>Exporter en CSV</button>
        </div>
      </div>
    </>
  )
}
