export const Card = ({ title, children, style }) => <div className="card" style={style}>{title && <h3>{title}</h3>}{children}</div>
export const Pill = ({ c = 'm', children }) => <span className={'pill ' + c}>{children}</span>
export const Field = ({ label, children }) => <label className="field">{label}{children}</label>
export const Led = ({ on }) => <div className="leds">{['r', 'o', 'v'].map(k => <span key={k} className={'led ' + k + (on === k ? ' on' : '')} />)}</div>
export const Table = ({ cols, rows }) => (
  <div className="tw"><table><thead><tr>{cols.map(c => <th key={c}>{c}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((x, j) => <td key={j}>{x}</td>)}</tr>)}</tbody></table></div>
)
export const statutPill = s => <Pill c={['actif', 'active', 'en cours', 'en ligne'].includes(s) ? 'g' : ['révoqué', 'maintenance'].includes(s) ? 'a' : 'm'}>{s}</Pill>
