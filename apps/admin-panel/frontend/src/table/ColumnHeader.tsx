import { Component } from 'solid-js';

import { Column } from '@sandbox/admin-panel-backend/src/router';

export const ColumnHeader: Component<{ column: Column }> = (props) => {
  return (
    <div class="flex flex-col gap-1 px-1 py-1">
      <span class="text-slate-600">{props.column.column_name}</span>
      {/*<span class="text-slate-300">{props.column.data_type}</span>*/}
    </div>
  );
};
