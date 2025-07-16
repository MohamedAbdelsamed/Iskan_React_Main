import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import api from './Api';


const Admins = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const printRef = useRef();

  useEffect(() => {
    api
      .get('/v1/Iskan_API_UI_MAIN/api/v1.0/uimain/usrmgmt/user/list/all')
      .then((res) => {
        const dataWithId = res.data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        setRows(dataWithId);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Helper to display value or 'N/A' for null/undefined/empty
  const getValueOrNA = (params) => {
    if (!params) return '-';
    const value = params.value ?? params.row?.[params.field];
    if (value === null || value === undefined || value === '') return '-';
    return String(value);
  };

  const columns = [
    {
      field: 'userId',
      headerName: t('ID'),
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: getValueOrNA,
    },
    {
      field: 'username',
      headerName: t('Admins.username'),
      width: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: getValueOrNA,
    },
    {
      field: 'fullName',
      headerName: t('Admins.fullname'),
      width: 300,
      align: 'center',
      headerAlign: 'center',
      renderCell: getValueOrNA,
    },
    {
      field: 'isAdmin',
      headerName: t('Admins.isAdmin'),
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const val = params.value ?? params.row?.[params.field];
        if (val === 'y' || val === 'Y') return t('Admins.yes');
        if (val === 'n' || val === 'N') return t('Admins.no');
        return '-';
      },
    },
    {
      field: 'email',
      headerName: t('Admins.email'),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: getValueOrNA,
    },
    {
      field: 'createdBy',
      headerName: t('Admins.createdBy'),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: getValueOrNA,
    },
    {
      field: 'createdOn',
      headerName: t('Admins.createdOn'),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const val = params.value ?? params.row?.[params.field];
        if (!val) return '-';
        const date = new Date(val);
        return date.toLocaleDateString();
      },
    },
    {
      field: 'modifiedBy',
      headerName: t('Admins.modifiedBy'),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: getValueOrNA,
    },
    {
      field: 'modifiedOn',
      headerName: t('Admins.modifiedOn'),
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const val = params.value ?? params.row?.[params.field];
        if (!val) return '-';
        const date = new Date(val);
        return date.toLocaleDateString();
      },
    },
  ];

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredRows = rows.filter((row) =>
    columns.some((col) => {
      const value = row[col.field];
      return String(value ?? '').toLowerCase().includes(searchText);
    })
  );

  const exportToExcel = (rowsToExport, cols) => {
    const data = rowsToExport.map((row) =>
      cols.reduce((acc, col) => {
        let value = row[col.field];
        // Special handling for isAdmin to export yes/no
        if (col.field === 'isAdmin') {
          if (value === 'y' || value === 'Y') value = t('Admins.yes');
          else if (value === 'n' || value === 'N') value = t('Admins.no');
          else value = '-';
        }
        // Format dates for createdOn and modifiedOn
        else if (col.field === 'createdOn' || col.field === 'modifiedOn') {
          if (value) value = new Date(value).toLocaleDateString();
          else value = '-';
        }
        acc[col.headerName || col.field] = value ?? '-';
        return acc;
      }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(fileData, 'data.xlsx');
  };

  const handlePrint = () => {
    const tableHeaders = columns.map((col) => `<th>${col.headerName}</th>`).join('');
    const tableRows = filteredRows
      .map((row) => {
        const rowData = columns
          .map((col) => {
            let value = row[col.field];
            // Same export formatting rules for printing
            if (col.field === 'isAdmin') {
              if (value === 'y' || value === 'Y') value = t('Admins.yes');
              else if (value === 'n' || value === 'N') value = t('Admins.no');
              else value = '-';
            } else if (col.field === 'createdOn' || col.field === 'modifiedOn') {
              if (value) value = new Date(value).toLocaleDateString();
              else value = '-';
            }
            if (value === null || value === undefined || value === '') value = '-';
            return `<td>${value}</td>`;
          })
          .join('');
        return `<tr>${rowData}</tr>`;
      })
      .join('');

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

  return (
    <>
      <br />
      <h3>{t('Admins.Admins')}</h3>

      <TextField
        label={t('Search')}
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
        sx={{ mb: 2, direction: 'rtl' }}
      />

      <div style={{ marginBottom: 16 }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={() => exportToExcel(filteredRows, columns)}>
          {t('Export_Excel')}
        </Button>
        <Button variant="outlined" onClick={handlePrint}>
          {t('Print')}
        </Button>
      </div>

      <div ref={printRef}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            pagination
            checkboxSelection
            sx={{
              direction: 'rtl',
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
  );
};

export default Admins;
