// UNIQUE point d'accès aux données. Plus tard : remplacer le contenu par fetch() vers FastAPI et WebSocket.
import * as D from './data.js'
export const getFeux = () => D.FEUX
export const getAmbulances = () => D.AMBULANCES
export const getChauffeurs = () => D.CHAUFFEURS
export const getMissions = () => D.MISSIONS
export const getPassages = () => D.PASSAGES
export const getAlertes = () => D.ALERTES
export const getEvenements = () => D.EVENEMENTS
export const getReglages = () => ({ regles: D.REGLES, sujets: D.SUJETS })
export const getRoute = () => [D.HOPITAL, D.FEUX[2], D.MALADE]

export function distance(a, b) {            // formule de haversine, en mètres
  const R = 6371000, r = Math.PI / 180
  const x = Math.sin((b.lat - a.lat) * r / 2) ** 2 +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin((b.lon - a.lon) * r / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}
const lerp = (a, b, t) => ({ lat: a.lat + (b.lat - a.lat) * t, lon: a.lon + (b.lon - a.lon) * t })

// Simule le flux de positions (1 toutes les 1,5 s). Même forme que le futur WebSocket.
export function subscribePosition(cb) {
  const feu = D.FEUX[2], pts = []
  for (let i = 0; i <= 20; i++) pts.push(lerp(D.HOPITAL, feu, i / 20))
  for (let i = 1; i <= 20; i++) pts.push(lerp(feu, D.MALADE, i / 20))
  let i = 0
  const id = setInterval(() => {
    const p = pts[i]
    cb({ ...p, distance: distance(p, feu), index: i, total: pts.length, passe: i > 20 })
    if (++i >= pts.length) clearInterval(id)
  }, 1500)
  return () => clearInterval(id)
}

export function exportCsv(nom, rows) {
  const cles = Object.keys(rows[0])
  const csv = [cles.join(';'), ...rows.map(r => cles.map(c => r[c]).join(';'))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = nom
  a.click()
}
