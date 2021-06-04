import React, { useState } from "react";
import DataTable from './DataTable';

export default function Home() {
  return (
    <div className="admin-page-container">
      <DataTable
        title="NSE Bhav"
        cols={orderCols}
      />
    </div>
  );
}
const orderCols = [
  "SYMBOL",
  "SERIES",
  "OPEN",
  "HIGH",
  "LOW",
  "CLOSE",
  "ISIN"
].map(col => {

  if(col != "SYMBOL" ){
    return {
      title: col,
      field: col,
      searchable:false
    };
  }
  return {
    searchable:true,
    title: col,
    field: col
  };
});
