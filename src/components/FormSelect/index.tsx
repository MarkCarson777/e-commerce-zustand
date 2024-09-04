import Select, { SingleValue, ActionMeta } from "react-select";
import { useField } from "formik";
import { ErrorMessage } from "formik";

type FormSelectProps = {
  label: string;
  field: {
    name: string;
    value: string;
    onChange: (value: string) => void;
  };
  options: { value: string; label: string }[];
};

export function FormSelect(props: FormSelectProps) {
  const { label } = props;
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (newValue) {
      setValue(newValue.value);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "2px solid #e5e7eb",
      padding: "2px",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 20,
    }),
  };

  return (
    <div>
      <label className="text-sm" htmlFor={props.field.name}>
        {label}
      </label>
      <Select
        styles={customStyles}
        {...props}
        onChange={onChange}
        onBlur={onBlur}
      />
      <ErrorMessage
        name={props.field.name}
        render={(error) => (
          <span className="text-red-500 text-sm">{error}</span>
        )}
      />
    </div>
  );
}
