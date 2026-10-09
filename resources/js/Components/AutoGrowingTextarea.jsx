import { useLayoutEffect, useRef } from 'react';

export default function AutoGrowingTextarea({ onInput, value, ...props }) {
  const ref = useRef(null);
  const resize = () => {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  };
  useLayoutEffect(() => {
    resize();
    const frame = requestAnimationFrame(resize);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <textarea {...props} value={value} ref={ref} onInput={(event) => { resize(); onInput?.(event); }} />;
}
