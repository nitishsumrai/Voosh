import React, { useEffect, useState } from "react";
import { useAsync } from "../helpers/hooks";
import Table from "./Table";

export default function DataTable({
  title,
  cols,
  actions,
  rowStyle,
  exportCsv
}) {
  const [spinner, setSpinner] = useState(true);
  const [data] = useAsync(setSpinner);
  return data ? (
    <React.Fragment>
      {spinner?<div className="lds-ring" style={{zIndex:"9999"}}><div></div><div></div><div></div><div></div></div>: null}
      <Table
        title={title}
        cols={cols}
        rows={data}
        actions={actions ? actions : []}
        rowStyle={rowStyle}
        exportCsv={exportCsv}
      />
    </React.Fragment>
  ) : <div className="lds-ring" style={{zIndex:"9999"}}><div></div><div></div><div></div><div></div></div>
}
