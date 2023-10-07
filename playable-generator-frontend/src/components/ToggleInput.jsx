function ToggleInput({ name, value, onChange, req = false }) {
  return (
    <div>
      <input
        className="Checkbox"
        type="checkbox"
        onChange={onChange}
        checked={value}
        required={req}
      />
      <label className="CheckboxLabel"> {name} </label>
    </div>
  );
}

export default ToggleInput;
