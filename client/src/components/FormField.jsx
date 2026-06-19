const FormField = ({ label, id, type = 'text', as = 'input', children, ...props }) => {
  const Component = as;

  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="label">{label}</span>
      {children || <Component id={id} type={type} className="input" {...props} />}
    </label>
  );
};

export default FormField;
