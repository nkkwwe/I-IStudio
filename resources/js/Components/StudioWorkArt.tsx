import { useId } from 'react';

export type StudioArtMode = 'identity' | 'digital' | 'packaging';
const brands = {
  'objects-of-tomorrow': { name: 'OTO', line: 'OBJECTS OF TOMORROW', ink: '#253f2c', paper: '#dfed82', accent: '#b8cfed', word: 'FORM / FUNCTION / FEELING' },
  'open-culture': { name: 'OPEN', line: 'CULTURE IS A CONVERSATION', ink: '#392666', paper: '#d8cef6', accent: '#f7865c', word: 'A SPACE FOR EVERY VOICE' },
  'make-room': { name: 'ROOM', line: 'MAKE ROOM FOR MORE', ink: '#5a3025', paper: '#f0b592', accent: '#efe9df', word: 'LIVE A LITTLE DIFFERENTLY' },
  'future-office': { name: 'NEXT', line: 'THE FUTURE IS OPEN', ink: '#133d50', paper: '#bbe4eb', accent: '#eaf480', word: 'BETTER DAYS AT WORK' },
};
export default function StudioWorkArt({ project, mode = 'identity', label }: { project: string; mode?: StudioArtMode; label: string }) {
  const b = brands[project as keyof typeof brands] ?? brands['objects-of-tomorrow'];
  const id = useId().replace(/:/g, '');
  return <svg className={`bd-brand-board bd-brand-board-${mode}`} viewBox="0 0 1000 700" role="img" aria-labelledby={`${id}-title`}>
    <title id={`${id}-title`}>{label}</title>
    <defs><linearGradient id={`${id}-shadow`} x2="1" y2="1"><stop stopColor={b.ink} stopOpacity=".12"/><stop offset="1" stopColor={b.ink} stopOpacity="0"/></linearGradient></defs>
    <rect width="1000" height="700" fill={b.paper}/>
    {mode === 'identity' && <>
      <rect x="60" y="58" width="520" height="580" fill={b.ink}/><text x="92" y="98" fill={b.paper} fontFamily="Arial,sans-serif" fontSize="14" letterSpacing="3">{b.line}</text>
      <text x="90" y="315" fill={b.paper} fontFamily="Arial,sans-serif" fontSize={b.name.length > 3 ? '146' : '195'} fontWeight="800" letterSpacing="-12">{b.name}</text>
      <path d="M94 382h445M94 391h445" stroke={b.paper} strokeWidth="2"/><text x="94" y="572" fill={b.paper} fontFamily="Arial,sans-serif" fontSize="17" letterSpacing="2">{b.word}</text>
      <rect x="626" y="94" width="305" height="220" fill={b.accent}/><text x="654" y="151" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="47" fontWeight="700">{b.name}®</text><text x="654" y="273" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="11" letterSpacing="2">GOOD THINGS START HERE.</text>
      <rect x="635" y="354" width="278" height="268" fill={b.paper} stroke={b.ink}/><text x="654" y="407" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="13" letterSpacing="2">BRAND NOTES / 001</text><circle cx="775" cy="503" r="59" fill={b.ink}/><path d="m749 503 22 22 36-44" fill="none" stroke={b.paper} strokeWidth="6"/><text x="654" y="602" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="11">A SYSTEM MADE TO MOVE.</text>
    </>}
    {mode === 'digital' && <>
      <rect x="64" y="65" width="866" height="578" rx="15" fill={`url(#${id}-shadow)`}/>
      <rect x="50" y="50" width="875" height="585" rx="12" fill={b.accent}/><path d="M50 88h875" stroke={b.ink} strokeOpacity=".2"/>
      <circle cx="76" cy="69" r="4" fill={b.ink}/><circle cx="91" cy="69" r="4" fill={b.ink} opacity=".5"/><circle cx="106" cy="69" r="4" fill={b.ink} opacity=".2"/>
      <text x="87" y="140" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="24" fontWeight="800">{b.name}®</text><text x="695" y="138" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="12">ABOUT / WORK / CONTACT</text>
      <text x="87" y="248" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="13" letterSpacing="2">{b.line}</text><text x="82" y="368" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="97" fontWeight="800" letterSpacing="-6">GOOD THINGS.</text>
      <rect x="87" y="413" width="190" height="44" rx="22" fill={b.ink}/><text x="109" y="440" fill={b.paper} fontFamily="Arial,sans-serif" fontSize="13">EXPLORE WHAT'S NEXT</text>
      <rect x="86" y="501" width="243" height="96" fill={b.paper}/><rect x="347" y="501" width="243" height="96" fill={b.ink}/><rect x="608" y="501" width="278" height="96" fill={b.paper}/>
      <text x="110" y="560" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="25">01 / IDEAS</text><text x="369" y="560" fill={b.paper} fontFamily="Arial,sans-serif" fontSize="25">02 / PEOPLE</text><text x="630" y="560" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="25">03 / POSSIBILITIES</text>
    </>}
    {mode === 'packaging' && <>
      <ellipse cx="504" cy="603" rx="320" ry="34" fill={b.ink} opacity=".1"/>
      <path d="m180 180 100-45 350 65-98 45Z" fill={b.accent}/><path d="m180 180 352 65v346l-352-64Z" fill={b.ink}/><path d="m532 245 98-45v345l-98 46Z" fill={b.accent}/>
      <text x="209" y="350" fill={b.paper} fontFamily="Arial,sans-serif" fontSize={b.name.length > 3 ? '101' : '135'} fontWeight="800" letterSpacing="-6" transform="rotate(10 209 350)">{b.name}</text><text x="207" y="469" fill={b.paper} fontFamily="Arial,sans-serif" fontSize="11" letterSpacing="1.5" transform="rotate(10 207 469)">{b.line}</text>
      <rect x="667" y="294" width="174" height="272" rx="4" fill={b.accent}/><path d="M690 294v-55a62 62 0 0 1 124 0v55" fill="none" stroke={b.ink} strokeWidth="5"/>
      <text x="684" y="373" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="43" fontWeight="700">{b.name}</text><path d="M685 409h138" stroke={b.ink}/><text x="685" y="528" fill={b.ink} fontFamily="Arial,sans-serif" fontSize="9">TAKE GOOD IDEAS WITH YOU.</text>
    </>}
  </svg>;
}
