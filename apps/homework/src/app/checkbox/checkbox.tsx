import './checkbox.module.css';

export interface CheckboxProps {
  fieldName: string,
  handleChange: (e: any) => void
  checked: boolean
}

export function Checkbox(props: CheckboxProps) {
  const { fieldName, handleChange, checked } = props;
  return (
    <div>
      <label>
        {fieldName}:
        <input
          name={fieldName} type="checkbox"
          checked={checked}
          onChange={handleChange} />
      </label>
    </div>
  );
}

export default Checkbox;
