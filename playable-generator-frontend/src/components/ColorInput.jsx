function ColorInput({ name, value, onChange, inline = false}) {
  return (
    <div className={inline? "InlineContainer": ""}>
      <div className={inline? "InlineLabel": ""}>
        <div className="InputLabel">{name}</div>
      </div>
      <div className={inline? "InlineInput": ""}>
        <input
          type="color"
          className="ColorInput"
          placeholder={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default ColorInput;
