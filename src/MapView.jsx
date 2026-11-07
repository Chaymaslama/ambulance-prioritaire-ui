import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapView({ center = [36.8035, 10.178], zoom = 16, feux = [], route = [], ambulance, geofence, onPick, pick }) {
  const el = useRef(), map = useRef(), layer = useRef(), pickRef = useRef()
  pickRef.current = onPick
  useEffect(() => {
    map.current = L.map(el.current).setView(center, zoom)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map.current)
    layer.current = L.layerGroup().addTo(map.current)
    map.current.on('click', e => pickRef.current && pickRef.current(e.latlng))
    return () => map.current.remove()
  }, [])
  useEffect(() => {
    const g = layer.current; g.clearLayers()
    if (route.length) L.polyline(route.map(p => [p.lat, p.lon]), { color: '#d63b2f', weight: 4, dashArray: '10 8' }).addTo(g)
    if (geofence) L.circle([geofence.lat, geofence.lon], { radius: 100, color: '#1b8a4b', weight: 1, fillOpacity: 0.08 }).addTo(g)
    feux.forEach(f => {
      const c = f.etat === 'priorité' ? '#1b8a4b' : '#7c8b97'
      L.circleMarker([f.lat, f.lon], { radius: 9, color: '#14202b', weight: 2, fillColor: c, fillOpacity: 1 })
        .bindTooltip(f.id, { permanent: true, direction: 'top' }).addTo(g)
    })
    if (ambulance) L.marker([ambulance.lat, ambulance.lon], { icon: L.divIcon({ className: '', html: '<div class="amb">AMB07</div>', iconSize: [56, 24], iconAnchor: [28, 12] }) }).addTo(g)
    if (pick) L.circleMarker([pick.lat, pick.lng], { radius: 10, color: '#d63b2f', fillColor: '#fff', fillOpacity: 1 }).bindTooltip('Destination', { permanent: true }).addTo(g)
  }, [feux, route, ambulance, geofence, pick])
  return <div ref={el} className="map" />
}
