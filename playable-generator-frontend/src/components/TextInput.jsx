function TextInput({ name, value, onChange, req = false, inline = false }) {
  return (
    <div className={inline? "InlineContainer": ""}>
      <div className={inline? "InlineLabel": ""}>
        <div className="InputLabel">{name}</div>
      </div>
      <div className={inline? "InlineInput": ""}>
        <input
          className="TextInput"
          placeholder={name}
          value={value}
          onChange={onChange}
          required={req}
        />
      </div>
    </div>
  );
}

export default TextInput;
