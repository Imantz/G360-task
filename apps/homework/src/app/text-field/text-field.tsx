import './text-field.module.css';

export interface TextFieldProps {
  fieldName: string,
  handleChange: (e: { target: any; }) => void
  value: string,
}

export function TextField(props: TextFieldProps) {
  const { fieldName, value, handleChange } = props;
  return (
    <div>
      <label>
        {fieldName}:
      </label>
      <input name={fieldName} value={value} onChange={handleChange} />
      <br />
    </div>
  );
}

export default TextField;
