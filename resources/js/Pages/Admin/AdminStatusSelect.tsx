import ThemedSelect from '../../Components/ThemedSelect';

export type StatusOption = {
  value: string;
  label: string;
};

type AdminStatusSelectProps = {
  value: string;
  options: readonly StatusOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  ariaLabel: string;
  variant?: 'status' | 'filter';
};

export default function AdminStatusSelect({ value, options, onChange, disabled = false, ariaLabel, variant = 'status' }: AdminStatusSelectProps) {
  return <ThemedSelect value={value} options={options} onChange={onChange} disabled={disabled} ariaLabel={ariaLabel} variant={variant} />;
}
