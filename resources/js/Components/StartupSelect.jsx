import { Children } from 'react';
import ThemedSelect from './ThemedSelect';

export default function StartupSelect({ children, id, value, onChange, ariaLabel, ...props }) {
  const options = Children.toArray(children).map((option) => ({ value: String(option.props.value ?? ''), label: option.props.children }));
  return <ThemedSelect id={id} value={value} onChange={onChange} ariaLabel={ariaLabel} options={options} {...props} />;
}
