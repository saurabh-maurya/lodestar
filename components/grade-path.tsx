const GRADES = [
  { label: '8', x: 66, y: 366, r: 24 },
  { label: '9', x: 150, y: 302, r: 24 },
  { label: '10', x: 232, y: 230, r: 26 },
  { label: '11', x: 314, y: 156, r: 26 },
  { label: '12', x: 388, y: 82, r: 34 },
] as const;

const PATH =
  'M66,366 C112,344 130,314 150,302 C182,282 204,254 232,230 C264,202 288,178 314,156 C344,130 364,108 388,82';

/**
 * Abstract stand-in for the hero's photo slot: a student's path through
 * secondary school, not a stock illustration of one. Five nodes, Class 8 to
 * 12, on one ascending line — the same "one decision, refined over years"
 * idea the headline states in words. Class 12 is drawn larger and carries
 * the one continuous animation on the page (a slow breathing glow), the
 * same exception the header's shimmer already makes: one element that is
 * always on screen is allowed to stay alive at rest.
 *
 * Pure SVG + CSS, no canvas or animation library — consistent with the rest
 * of the site's hand-rolled motion. Coordinates are hand-placed, not
 * computed off the path, since there are only five of them.
 */
export function GradePath() {
  return (
    <svg
      viewBox="0 0 440 440"
      className="grade-path"
      role="img"
      aria-label="A student's journey from Class 8 to Class 12, each year building on the last"
    >
      <defs>
        <radialGradient id="gp-node" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="var(--ls-blue-200)" />
          <stop offset="100%" stopColor="var(--ls-blue-500)" />
        </radialGradient>
        <radialGradient id="gp-node-final" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="var(--ls-blue-400)" />
          <stop offset="100%" stopColor="var(--ls-blue-700)" />
        </radialGradient>
      </defs>

      {/* Ambient drift — decorative only, matching the hero's mesh backdrop. */}
      <circle className="grade-path__drift" cx="60" cy="100" r="5" />
      <circle className="grade-path__drift grade-path__drift--slow" cx="380" cy="330" r="7" />
      <circle className="grade-path__drift" cx="330" cy="380" r="4" />

      <path className="grade-path__line" d={PATH} pathLength={1} />

      {GRADES.map((g, i) => {
        const final = i === GRADES.length - 1;
        return (
          <g
            className={`grade-path__node${final ? ' grade-path__node--final' : ''}`}
            style={{ '--i': i } as React.CSSProperties}
            key={g.label}
          >
            {final && <circle className="grade-path__glow" cx={g.x} cy={g.y} r={g.r + 14} />}
            <circle
              cx={g.x}
              cy={g.y}
              r={g.r}
              fill={final ? 'url(#gp-node-final)' : 'url(#gp-node)'}
            />
            <text x={g.x} y={g.y} textAnchor="middle" dominantBaseline="central">
              {g.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
