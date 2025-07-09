import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (rows, columns) => {
  const data = rows.map((row) =>
    columns.reduce((acc, col) => {
      acc[col.headerName || col.field] = row[col.field];
      return acc;
    }, {})
  );

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(fileData, 'data.xlsx');
};





const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

const ReactTable = () => {
  const { t } = useTranslation();
  const printRef = useRef();
  const columns = [
  { field: 'id', headerName: t('ID'), width: 130 ,align: 'center', headerAlign: 'center'},
  { field: 'firstName', headerName: t('firstName'), width: 330 ,align: 'center', headerAlign: 'center'},
  { field: 'lastName', headerName: t('lastName'), width: 330,align: 'center', headerAlign: 'center' },
  {
    field: 'age',
    headerName: t('Age'),
    type: 'number',
    width: 190,
    align: 'center', headerAlign: 'center'
  },
  {
    field: 'fullName',
    headerName: t('Role'),
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 360,
    align: 'center', headerAlign: 'center',
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const arabicLocaleText = {
filterOperatorContains: t('filterPanelOperators.contains'),
filterOperatorEquals: t('filterPanelOperators.equals'),
filterOperatorStartsWith: t('filterPanelOperators.startsWith'),
filterOperatorEndsWith: t('filterPanelOperators.endsWith'),
filterOperatorIsEmpty: t('filterPanelOperators.isEmpty'),
filterOperatorIsNotEmpty: t('filterPanelOperators.isNotEmpty'),
filterOperatorIsAnyOf: t('filterPanelOperators.isAnyOf'),
 filterPanelInputPlaceholder: t('grid.filterPanelInputPlaceholder'),
 noRowsLabel: t('grid.noRowsLabel'),
  noResultsOverlayLabel: t('grid.noResultsOverlayLabel'),
  errorOverlayDefaultLabel: t('grid.errorOverlayDefaultLabel'),
  columnMenuLabel: t('grid.columnMenuLabel'),
  columnMenuShowColumns: t('grid.columnMenuShowColumns'),
  columnMenuFilter: t('grid.columnMenuFilter'),
  columnMenuHideColumn: t('grid.columnMenuHideColumn'),
  columnMenuUnsort: t('grid.columnMenuUnsort'),
  columnMenuSortAsc: t('grid.columnMenuSortAsc'),
  columnMenuSortDesc: t('grid.columnMenuSortDesc'),
  toolbarDensity: t('grid.toolbarDensity'),
  toolbarDensityLabel: t('grid.toolbarDensityLabel'),
  toolbarDensityCompact: t('grid.toolbarDensityCompact'),
  toolbarDensityStandard: t('grid.toolbarDensityStandard'),
  toolbarDensityComfortable: t('grid.toolbarDensityComfortable'),
  toolbarColumns: t('grid.toolbarColumns'),
  toolbarColumnsLabel: t('grid.toolbarColumnsLabel'),
  toolbarFilters: t('grid.toolbarFilters'),
  toolbarFiltersLabel: t('grid.toolbarFiltersLabel'),
  toolbarFiltersTooltipHide: t('grid.toolbarFiltersTooltipHide'),
  toolbarFiltersTooltipShow: t('grid.toolbarFiltersTooltipShow'),
  toolbarExport: t('grid.toolbarExport'),
  toolbarExportLabel: t('grid.toolbarExportLabel'),
  toolbarExportCSV: t('grid.toolbarExportCSV'),
  toolbarExportPrint: t('grid.toolbarExportPrint'),
  footerRowSelected: (count) =>
    count === 1 ? `${count} ${t('row selected')}` : `${count} ${t('rows selected')}`,
  footerTotalRows: t('grid.footerTotalRows'),
  footerTotalVisibleRows: (visible, total) =>
    `${visible} من ${total}`,
  MuiTablePagination: {
    labelRowsPerPage: t('grid.MuiTablePagination.labelRowsPerPage'),
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`,
    firstIconButtonText: t('grid.MuiTablePagination.firstIconButtonText'),
    previousIconButtonText: t('grid.MuiTablePagination.previousIconButtonText'),
    nextIconButtonText: t('grid.MuiTablePagination.nextIconButtonText'),
    lastIconButtonText: t('grid.MuiTablePagination.lastIconButtonText'),
  },
   columnsPanelTextFieldLabel: t('grid.columnsPanelTextFieldLabel'),
  columnsPanelTextFieldPlaceholder: t('grid.columnsPanelTextFieldPlaceholder'),
  columnsPanelDragIconLabel: t('grid.columnsPanelDragIconLabel'),
  columnsPanelShowAllButton: t('grid.columnsPanelShowAllButton'),
  columnsPanelHideAllButton: t('grid.columnsPanelHideAllButton'),

  // Filters panel
  filterPanelAddFilter: t('grid.filterPanelAddFilter'),
  filterPanelDeleteIconLabel: t('grid.filterPanelDeleteIconLabel'),

  filterPanelColumns: t('grid.filterPanelColumns'),
  filterPanelInputLabel: t('grid.filterPanelInputLabel'),
  filterPanelOperator: t('grid.filterPanelOperator'),
};

const handlePrint = () => {

  const tableHeaders = columns.map(col => `<th>${col.headerName}</th>`).join('');
  const tableRows = filteredRows.map(row => {
    const rowData = columns.map(col => {
      const value = typeof col.valueGetter === 'function'
        ? col.valueGetter(null, row)
        : row[col.field];
      return `<td>${value ?? ''}</td>`;
    }).join('');
    return `<tr>${rowData}</tr>`;
  }).join('');

  const html = `
    <html dir="rtl">
      <head>
        <title>${t('Records')}</title>
        <style>
        
          body {
            font-family: 'Dubai', sans-serif;
            direction: rtl;
            padding: 20px;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: center;
          }
          h3 {
            margin-bottom: 16px;
          }
        </style>
      </head>
      <body>
        <h3>${t('Records')}</h3>
        <table>
          <thead><tr>${tableHeaders}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;

  const WindowPrt = window.open('', '', 'width=900,height=650');
  WindowPrt.document.write(html);
  WindowPrt.document.close();
  WindowPrt.focus();
  WindowPrt.print();
  WindowPrt.close();
};

console.log('contains:', t('filterPanelOperators.contains'))

const [searchText, setSearchText] = useState("");

const handleSearch = (event) => {
  setSearchText(event.target.value.toLowerCase());
};

const filteredRows = rows.filter((row) =>
  columns.some((column) => {
    const value = typeof column.valueGetter === 'function'
      ? column.valueGetter(null, row)
      : row[column.field];

    return String(value ?? '')
      .toLowerCase()
      .includes(searchText);
  })
);

  return(
    <>
    <br />
    <h3>{t('Records')}</h3>
    <TextField
  label={t('Search')}
  variant="outlined"
  fullWidth
  value={searchText}
  onChange={handleSearch}
  sx={{ mb: 2, direction: 'rtl' }}
/>

    <br /><br />
    <div style={{ marginBottom: 16 }}>
  <button className="btn btn-print" onClick={() => exportToExcel(rows, columns)}>{t('Export_Excel')}</button>
  <button className="btn btn-print" onClick={handlePrint}>{t('Print')}</button>
</div>

  <div ref={printRef}>
      <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid 
          rows={filteredRows}
          columns={columns}
           pageSizeOptions={[5, 10]}     // options to select
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
          pagination 
          localeText={arabicLocaleText}
          checkboxSelection
          sx={{
             direction: 'rtl', // fix table direction
            border: 0,
            fontFamily: 'Dubai, sans-serif',
            '& .MuiDataGrid-cell': {
              justifyContent: 'center',
              display: 'flex',
            },
          }}
          />
    </Paper>
  </div>
  
    </>
  )

}

export default ReactTable;