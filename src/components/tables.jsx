import React from "react";
import { useTranslation } from "react-i18next";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';



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

  return(
    <>
    <br />
    <h3>{t('Records')}</h3>
    <br /><br />
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
            border: 0,
            fontFamily: 'Dubai, sans-serif',
            '& .MuiDataGrid-cell': {
                justifyContent: 'center',
                display: 'flex',
            },
            }}
        />
    </Paper>
    </>
  )

}

export default ReactTable;