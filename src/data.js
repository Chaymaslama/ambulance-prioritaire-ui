// DONNÉES STATIQUES : mêmes champs que les tables SQLite et les messages MQTT.
export const HOPITAL = { lat: 36.8000, lon: 10.1750 }
export const MALADE = { lat: 36.8065, lon: 10.1815 }
export const FEUX = [
  { id: 'TN-TUN-0010', nom: 'Carrefour A', lat: 36.8018, lon: 10.1742, etat: 'normal', connexion: 'non équipé' },
  { id: 'TN-TUN-0011', nom: 'Carrefour B', lat: 36.8010, lon: 10.1795, etat: 'normal', connexion: 'non équipé' },
  { id: 'TN-TUN-0012', nom: 'Maquette', lat: 36.8035, lon: 10.1780, etat: 'priorité', connexion: 'en ligne',
    dernierOrdre: 'priorite · 14:02:11', dernierEtat: 'vert, mode priorité', rssi: '-58 dBm', version: '1.0.3' },
  { id: 'TN-TUN-0013', nom: 'Carrefour D', lat: 36.8050, lon: 10.1832, etat: 'normal', connexion: 'non équipé' },
]
export const AMBULANCES = [
  { id: 'AMB07', immat: '123 TUN 4567', statut: 'active' },
  { id: 'AMB03', immat: '987 TUN 1234', statut: 'active' },
  { id: 'AMB11', immat: '456 TUN 7890', statut: 'maintenance' },
]
export const CHAUFFEURS = [
  { id: 1, nom: 'Ben Ali, Sami', badge: 'A1F3', statut: 'actif' },
  { id: 2, nom: 'Trabelsi, Nour', badge: '9C2D', statut: 'actif' },
  { id: 3, nom: 'Gharbi, Omar', badge: '7B10', statut: 'révoqué' },
]
export const MISSIONS = [
  { id: 1042, ambulance: 'AMB07', chauffeur: 'Ben Ali, Sami', destination: 'Domicile du malade', date: '06/11 14:01', duree: '8 min', statut: 'en cours' },
  { id: 1041, ambulance: 'AMB03', chauffeur: 'Trabelsi, Nour', destination: 'Hôpital', date: '06/11 13:40', duree: '7 min', statut: 'terminée' },
  { id: 1040, ambulance: 'AMB07', chauffeur: 'Ben Ali, Sami', destination: 'Domicile du malade', date: '06/11 13:11', duree: '9 min', statut: 'terminée' },
]
export const PASSAGES = [
  { mission: 1042, feu: 'TN-TUN-0012', detection: '14:02:11', vert: '14:02:12', gagne: 24 },
  { mission: 1041, feu: 'TN-TUN-0012', detection: '13:41:07', vert: '13:41:08', gagne: 19 },
  { mission: 1040, feu: 'TN-TUN-0012', detection: '13:12:50', vert: '13:12:51', gagne: 20 },
  { mission: 1039, feu: 'TN-TUN-0012', detection: '12:50:33', vert: '12:50:34', gagne: 18 },
  { mission: 1038, feu: 'TN-TUN-0012', detection: '12:20:10', vert: '12:20:11', gagne: 25 },
]
export const ALERTES = [
  { id: 1, type: 'Mission invalide', gravite: 'r', heure: '14:03:20', msg: 'AMB99 inconnue au feu 0012, aucune priorité accordée' },
  { id: 2, type: 'Réseau', gravite: 'a', heure: '13:58:04', msg: 'Perte de HiveMQ : le feu 0012 est revenu au cycle normal' },
  { id: 3, type: 'Feu', gravite: 'a', heure: '13:41:30', msg: 'Priorité de 30 s atteinte au feu 0012, retour automatique' },
  { id: 4, type: 'Mission invalide', gravite: 'r', heure: '12:20:11', msg: 'Badge 7B10 révoqué, mission non démarrée' },
]
export const EVENEMENTS = [
  ['13:55', 'Mission créée'], ['14:00', 'Acceptée, badge validé'], ['14:01', 'En route vers le malade'],
  ['14:02:11', 'Feu 0012 détecté'], ['14:02:12', 'Vert prioritaire'], ['14:02:40', 'Feu libéré, cycle normal'], ['14:09', 'Arrivée chez le malade'],
]
export const REGLES = [['Rayon de détection', '100 m'], ['Fréquence des positions', '1 à 2 s'], ['Orange avant le rouge', '2 s'], ['Durée max de la priorité', '30 s'], ['Retour si broker perdu', 'cycle normal']]
export const SUJETS = [
  ['projet2026/ambulance/AMB07/position', 'Ambulance → PC', 'lat, lon, mission'],
  ['projet2026/feux/TN-TUN-0012/cmd', 'PC → Feu', 'priorite ou liberer'],
  ['projet2026/feux/TN-TUN-0012/etat', 'Feu → PC', 'vert, mode priorité'],
]
