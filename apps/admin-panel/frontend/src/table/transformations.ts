export const valueToInputString = (value, dataType) => {
  const mapping = {
    'character varying': (v) => v.toString(),
    'timestamp without time zone': (v: Date) =>
      v
        .toLocaleString('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        .replace(' ', 'T'),
  };
  const str = mapping[dataType] ? mapping[dataType](value) : value.toString();
  return str;
};

export const dataTypeToInputType = (dataType: string) => {
  const mapping = {
    'character varying': 'text',
    'timestamp without time zone': 'datetime-local',
    integer: 'number',
  };
  return mapping[dataType] || 'text';
};
