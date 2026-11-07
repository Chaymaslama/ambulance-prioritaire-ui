# Ambulance prioritaire : interfaces (données statiques)

Frontend React + Vite + Leaflet. Aucune donnée n'est dans les écrans : tout passe par `src/api.js`,
qui lit `src/data.js`. Plus tard, seul `api.js` change (FastAPI + WebSocket) ; les écrans restent identiques.

## Lancer
1. Installer Node.js (version 18 ou plus) : https://nodejs.org
2. Dans ce dossier : `npm install`  (point de contrôle : pas d'erreur rouge)
3. `npm run dev`  puis ouvrir l'adresse affichée (http://localhost:5173)

## Parcours de test (points de contrôle)
1. Connexion : « Régulateur », bouton Se connecter. Chauffeur + badge 7B10 : refusé. Badge A1F3 : accepté.
2. Carte en direct : l'ambulance avance (1 position / 1,5 s) ; sous 100 m, le feu passe au vert ; après le feu, retour normal.
3. Missions : cliquer sur la carte, puis Créer la mission : une ligne apparaît.
4. Suivi : chronologie ; Exporter en CSV télécharge passages.csv.
5. Feux : Voir sur un feu change la fiche. Flotte : Révoquer un badge. Alertes : filtrer, Acquitter.
6. Historique, Réglages : indicateurs calculés depuis data.js.
7. Se connecter en Administrateur pour voir tous les menus ; en Chauffeur pour l'écran mobile.

## Où sont les écrans
src/screens/ : Login, Live, Missions, Suivi, Feux, Flotte, Historique, Alertes, Reglages, Chauffeur.
