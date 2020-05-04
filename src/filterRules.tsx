// @ts-nocheck
export const filterRules = ({
  values,
  value,
  name,
  type,
}: {
  name: string;
  type: any;
  values: any[];
  value: string;
}) => {
  let types = {
    string: values
      .filter((v) => v[name])
      .filter((v) => v[name].toLowerCase().indexOf(value.toLowerCase()) !== -1),
    text: values
      .filter((v) => v[name])
      .filter((v) => v[name].toLowerCase().indexOf(value.toLowerCase()) !== -1),
  }[type];
  types = types || values;
  return types;
};
