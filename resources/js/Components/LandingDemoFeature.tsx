import { useState } from 'react';
import type { LandingDemoId } from '../content/landingDemos';

const materials = [
  { name: 'Clay', note: 'Earth, shaped by hand.', description: 'Soft curves, a warm glaze and the small imperfections that make a piece feel personal.', className: 'clay', detail: '01 / FORM & FEELING' },
  { name: 'Linen', note: 'A softer kind of everyday.', description: 'An open weave, a gentle texture and natural fibres that become softer with time.', className: 'linen', detail: '02 / TEXTURE & COMFORT' },
  { name: 'Oak', note: 'Character in every grain.', description: 'Honest wood, considered proportions and a quiet warmth that belongs in any room.', className: 'oak', detail: '03 / WARMTH & CHARACTER' },
];

export default function LandingDemoFeature({ design }: { design: LandingDemoId }) {
  const [checked, setChecked] = useState<number[]>([0]);
  const [material, setMaterial] = useState(0);

  if (design === 'pulse') return <section className="ld-container ld-section ld-feature ld-flow" data-ld-reveal aria-labelledby="feature-title">
    <div className="ld-feature-copy"><span className="ld-kicker">A SMALL INTERACTIVE MOMENT</span><h2 id="feature-title">Less juggling.<br/>More doing.</h2><p>Try a tiny piece of the workspace. Check off your next steps and watch your day come together.</p><div className="ld-avatar-line"><div className="ld-avatars" aria-hidden="true"><span>AL</span><span>MK</span><span>JD</span></div><span>A shared space for your whole team.</span></div></div>
    <div className="ld-task-board"><div className="ld-task-heading"><div><span className="ld-kicker">YOUR FOCUS FOR TODAY</span><h3>A little forward motion.</h3></div><span className="ld-task-count" aria-live="polite">{checked.length} / 3</span></div><div className="ld-task-progress" role="progressbar" aria-label="Completed sample tasks" aria-valuemin={0} aria-valuemax={3} aria-valuenow={checked.length}><span style={{ transform: `scaleX(${checked.length / 3})` }}/></div>{['Give that big idea a name', 'Bring the right people together', 'Make room for a fresh start'].map((task, index) => <button key={task} className={`ld-task-row${checked.includes(index) ? ' is-complete' : ''}`} aria-pressed={checked.includes(index)} onClick={() => setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])}><span className="ld-task-check" aria-hidden="true">{checked.includes(index) ? '✓' : ''}</span><span>{task}</span><span className="ld-task-tag">{['IDEA', 'TEAM', 'NEXT'][index]}</span></button>)}<p className="ld-task-note">{checked.length === 3 ? 'A good day, one small step at a time. ✦' : 'One thing at a time. You’ve got this.'}</p></div>
  </section>;

  if (design === 'atelier') return <section className="ld-container ld-section ld-feature ld-materials" data-ld-reveal aria-labelledby="feature-title">
    <div className={`ld-material-art is-${materials[material].className}`} aria-hidden="true"><div className="ld-material-object"/><span>{materials[material].detail}</span></div><div className="ld-feature-copy"><span className="ld-kicker">THE BEAUTY OF HONEST MATERIALS</span><h2 id="feature-title">Natural by nature.<br/>Beautiful by touch.</h2><p>Different textures. The same thoughtful approach. Explore the materials behind our imagined collection.</p><div className="ld-material-buttons" role="group" aria-label="Explore sample materials">{materials.map((item, index) => <button className="ld-button ld-secondary" aria-pressed={index === material} key={item.name} onClick={() => setMaterial(index)}>{item.name}</button>)}</div><div className="ld-material-description" key={material} aria-live="polite"><h3>{materials[material].note}</h3><p>{materials[material].description}</p></div></div>
  </section>;

  const steps = design === 'mono' ? [
    ['Discover', 'Start with the right questions.', 'We get to know the people, the purpose and the possibilities behind your idea.'],
    ['Distil', 'Find the clearest expression.', 'A focused direction that makes the important things feel simple and unmistakable.'],
    ['Deliver', 'Make every detail count.', 'A complete identity and digital experience, considered from the first glance to the last click.'],
  ] : [
    ['Align', 'A clear point of departure.', 'Define the ambition, map the challenge and choose a trajectory.'],
    ['Create', 'A direction with distinction.', 'Shape a visual world and connect it to a purposeful experience.'],
    ['Build', 'Ideas, made tangible.', 'Bring the details together in a responsive digital foundation.'],
    ['Launch', 'Ready for what comes next.', 'Refine the experience and give the next chapter a confident start.'],
  ];
  return <section className={`ld-container ld-section ld-feature-process ${design === 'orbit' ? 'ld-mission' : 'ld-process'}`} data-ld-reveal aria-labelledby="feature-title"><div className="ld-section-heading"><div><span className="ld-kicker">{design === 'mono' ? '02 / THE WAY WE WORK' : 'A ROADMAP, NOT A GUESS'}</span><h2 id="feature-title">{design === 'mono' ? 'A clear process.\nA considered result.' : 'Every great launch\nstarts with a direction.'}</h2></div><p>{design === 'mono' ? 'No unnecessary complexity. Just the right steps, taken with care.' : 'Four connected phases. One shared purpose. A little more clarity at every step.'}</p></div><div className="ld-process-grid">{steps.map(([name, title, text], index) => <article key={name}><div className="ld-process-number"><span>0{index + 1}</span><span aria-hidden="true">{design === 'mono' ? '—' : '◎'}</span></div><h3>{name}</h3><strong>{title}</strong><p>{text}</p></article>)}</div><div className="ld-process-footer"><span>{design === 'mono' ? 'Purpose first. Always.' : 'FROM FIRST SPARK TO FULL ORBIT'}</span><a className="ld-text-link" href="#contact">{design === 'mono' ? 'Let’s find your direction' : 'Begin your next chapter'} ↗</a></div></section>;
}
