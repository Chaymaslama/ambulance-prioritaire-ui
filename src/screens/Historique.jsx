import { Card, Table, statutPill } from '../ui.jsx'
import { getMissions, getPassages, getAlertes } from '../api.js'

export default function Historique() {
  const p = getPassages(), moy = Math.round(p.reduce((s, x) => s + x.gagne, 0) / p.length), max = Math.max(...p.map(x => x.gagne))
  return (
    <>
      <h2>Historique et statistiques</h2>
      <div className="three four">
        {[[getMissions().length, 'missions'], [moy + ' s', 'temps gagné moyen par feu'], ['96 %', 'détections réussies'], [getAlertes().length, 'alertes']].map(([n, l]) => <Card key={l}><div className="big">{n}</div><p className="mu">{l}</p></Card>)}
      </div>
      <div className="two">
        <Card title="Temps gagné par mission (s)"><div className="bars">{[...p].reverse().map(x => <div key={x.mission}><i style={{ height: x.gagne / max * 150 }} /><b>{x.gagne}</b><span>{x.mission}</span></div>)}</div></Card>
        <Card title="Derniers passages"><Table cols={['Mission', 'Feu', 'Détection', 'Gagné']} rows={p.map(x => [x.mission, x.feu.slice(-4), x.detection, x.gagne + ' s'])} /></Card>
      </div>
      <Card title="Historique des missions"><Table cols={['Mission', 'Date', 'Ambulance', 'Chauffeur', 'Destination', 'Durée', 'Statut']} rows={getMissions().map(m => [m.id, m.date, m.ambulance, m.chauffeur, m.destination, m.duree, statutPill(m.statut)])} /></Card>
    </>
  )
}
