import React, { useMemo } from "react";
import MaterialTable from "material-table";

// const getNewObject = el => {
//   return {
//     ...el,
//     order_items: '"' + JSON.stringify(el.order_items) + '"',
//     order_comments: '"' + JSON.stringify(el.order_comments) + '"',
//     customer: JSON.stringify(el.customer)
//   };
// };
export default function Table2({ title, cols, rows, actions, rowStyle, exportCsv }) {
  // const newRows = rows.map(el => getNewObject(el));
  return (
    <div>
      <MaterialTable
        columns={cols}
        data={useMemo(() => rows, [rows])}
        title={title}
        localization={{ toolbar: { searchPlaceholder: 'Search by Symbol' } }}
        options={{
          search: false,
          exportButton: true,
          exportAllData: true,
          pageSize: 5,
          sorting: false,
          rowStyle: rowStyle,
          search: true,
          pageSize:10,
          headerStyle: {
            backgroundColor: "#003459",
            color: "#FFF"
          },

          exportCsv: exportCsv
        }}
        actions={actions}
        style={{ border: "1px solid #1b263b" }}
      />
    </div>
  );
}
