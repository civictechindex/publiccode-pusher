import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Field } from "redux-form";
import { zipObject as _zipObject, map as _map } from "lodash";
import Info from "../../components/Info";

const renderSelect = field => {
  const className = classNames([
    "form-group",
    { "has-error": field.meta.touched && field.meta.error }
  ]);
  const options = field.schema.enum;
  const optionNames = field.schema.enum_titles || options;

  const selectOptions = _zipObject(options, optionNames);
  return (
    <div className={className}>
      {field.showLabel && (
        <label className="control-label" htmlFor={"field-" + field.name}>
          {field.label} {field.schema.required ? "*" : ""}
        </label>
      )}

      <select
        {...field.input}
        className="form-control"
        id={"field-" + field.name}
        required={field.required}
        multiple={field.multiple}
      >
        {!field.required &&
          !field.multiple && (
            <option key={""} value={""}>
              {field.placeholder}
            </option>
          )}
        {_map(selectOptions, (name, value) => {
          return (
            <option key={value} value={value}>
              {name}
            </option>
          );
        })}
      </select>

      {field.meta.touched &&
        field.meta.error && (
          <div className="help-block">{field.meta.error}</div>
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

const ChoiceWidget = props => {
  return (
    <Field
      component={renderSelect}
      label={props.label}
      name={props.fieldName}
      required={props.required}
      id={"field-" + props.fieldName}
      placeholder={props.schema.default}
      description={props.schema.description}
      schema={props.schema}
      multiple={props.multiple}
      {...props}
    />
  );
};

ChoiceWidget.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldName: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object,
  multiple: PropTypes.bool,
  required: PropTypes.bool
};

export default ChoiceWidget;
