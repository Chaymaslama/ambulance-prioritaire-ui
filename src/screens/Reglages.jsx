import { useState } from 'react'
import { Card, Field, Pill, Table } from '../ui.jsx'
import { getPassages, getReglages, exportCsv } from '../api.js'

export default function Reglages() {
  const { regles, sujets } = getReglages(), [gps, setGps] = useState('Simulée')
  return (
    <>
      <h2>Réglages</h2>
      <div className="two">
        <Card title="Connexion MQTT (HiveMQ public)"><Pill c="g">Connecté</Pill>
          <Field label="Broker"><input readOnly value="broker.hivemq.com" /></Field>
          <Field label="Port"><input readOnly value="1883" /></Field>
          <Field label="Préfixe des sujets"><input readOnly value="projet2026/" /></Field>
          <Field label="Identifiant client"><input readOnly value="serveur-python" /></Field></Card>
        <Card title="Règles du système"><Table cols={['Paramètre', 'Valeur']} rows={regles} /></Card>
      </div>
      <Card title="Sujets MQTT"><Table cols={['Sujet', 'Sens', 'Exemple']} rows={sujets} /></Card>
      <Card title="Position de l’ambulance">
        <div className="chips">{['Simulée', 'GPS réel'].map(t => <button key={t} className={'chip' + (t === gps ? ' on' : '')} onClick={() => setGps(t)}>{t}</button>)}</div>
        <button className="btn dark" onClick={() => exportCsv('passages.csv', getPassages())}>Exporter en CSV</button>
      </Card>
    </>
  )
}
