import React from "react";
import renderField from "./renderField";

export const isRequired = (schema, fieldName) => {
  if (!schema.required) {
    return false;
  }
  return schema.required === true || schema.required.indexOf(fieldName) !== -1;
};

const renderFields = (schema, theme, prefix = null, context = {}) => {
  let props = [];
  for (let i in schema.properties) {
    props.push({ prop: i, propertyOrder: schema.properties[i].propertyOrder });
  }
  props = props.sort((a, b) => {
    if (a.propertyOrder > b.propertyOrder) {
      return 1;
    } else if (a.propertyOrder < b.propertyOrder) {
      return -1;
    } else {
      return 0;
    }
  });
  return props.map((item, i) => {
    const name = item.prop;
    const field = schema.properties[name];
    if (schema.isSummary) {
      field.isSummary = schema.isSummary;
    }

    return (
      <div className="block__item" key={`obj_item_${i}`}>
        <div className="form-group">
          {renderField(
            field,
            name,
            theme,
            prefix,
            context,
            isRequired(schema, name)
          )}
        </div>
      </div>
    );
  });
};

export default renderFields;
