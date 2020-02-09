import React from "react";
import classNames from "classnames";
import { Field } from "redux-form";
import Info from "../../components/Info";

const zipObject = (props, values) =>
  props.reduce(
    (prev, prop, i) => Object.assign(prev, { [prop]: values[i] }),
    {}
  );

const changeValue = (checked, item, onChange, currentValue = []) => {
  console.log("CURRENT ITEM", item, "CURRENT VALUE", currentValue);
  if (checked) {
    if (currentValue.indexOf(checked) === -1) {
      return onChange([...currentValue, item]);
    }
  } else {
    return onChange(currentValue.filter(it => it != item));
  }
  return onChange(currentValue);
};

const renderChoice = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);
  const options = field.schema.items.enum;
  const optionNames = field.schema.items.enum_titles || options;

  const selectOptions = zipObject(options, optionNames);
  return (
    <div className={className}>
      <label className="control-label" htmlFor={"field-" + field.name}>
        {field.label} {field.required ? "*" : ""}
      </label>
      {Object.entries(selectOptions).map(([value, name]) => {
        return (
          <div className="form-check" key={value}>
            <input
              type="checkbox"
              className="form-check-input"
              value={value}
              checked={field.input.value.indexOf(value) !== -1}
              onChange={e =>
                changeValue(
                  e.target.checked,
                  value,
                  field.input.onChange,
                  field.input.value
                )
              }
            />
            <label className="form-check-label">{name}</label>
          </div>
        );
      })}

      {field.meta.touched &&
        field.meta.error && (
          <span className="help-block">{field.meta.error}</span>
        )}
      {field.description && (
        <Info
          title={field.label ? field.label : field.name}
          description={field.description}
        />
      )}
    </div>
  );
};

const ChoiceMultipleExpandedWidget = props => {
  return (
    <Field
      component={renderChoice}
      label={props.label}
      name={props.fieldName}
      required={props.required}
      id={"field-" + props.fieldName}
      placeholder={props.schema.default}
      description={props.schema.description}
      schema={props.schema}
      multiple={props.multiple}
    />
  );
};

export default ChoiceMultipleExpandedWidget;
