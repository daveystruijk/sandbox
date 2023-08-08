export const valueToInputString = (value, dataType) => {
  if (value === null) {
    return '';
  }

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
    boolean: '',
    integer: (v) => v.toString(),
  };
  const str = mapping[dataType] ? mapping[dataType](value) : value.toString();
  return str;
};
