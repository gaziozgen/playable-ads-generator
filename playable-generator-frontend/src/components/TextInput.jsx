function TextInput({ name, value, onChange, req = false, inline = false, password = false }) {
  return (
    <div className={inline? "InlineContainer": ""}>
      <div className={inline? "InlineLabel": ""}>
        <div className="InputLabel">{name}</div>
      </div>
      <div className={inline? "InlineInput": ""}>
        <input
          type={password? "password": ""}
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
