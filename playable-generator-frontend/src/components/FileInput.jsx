function FileInput({ name, value, onChange, accept, req = false }) {
  return (
    <div>
      <div className="InputLabel">{name}</div>
      <div className="FileInputArea">
        <input
          type="file"
          className="FileInput"
          onChange={onChange}
          required={req}
          accept={accept}
        />
      </div>
    </div>
  );
}

export default FileInput;
