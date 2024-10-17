import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { MessageRow, ReorderRow, ReorderHandleWrapper, SelectRow } from './row';
import { useTableSelect } from '../hooks/hooks';
import { Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { tableData, type Payment } from '../data';
import { arraymove, arrayMoveMultiple, indexOf } from '@/utils/array';
import { handleMultiSelectOnCtrlRowClick, resetAndSetRowSelection } from '@/utils/table/table';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Row',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: () => <span>Status</span>,
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    minSize: 50
  },
  {
    accessorKey: 'email',
    header: () => <span>Email</span>,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <span>Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div>{formatted}</div>;
    }
  }
];

export const Select: StoryObj<{ enableMultiRowSelection: boolean }> = {
  args: {
    enableMultiRowSelection: false
  },
  render: ({ enableMultiRowSelection }) => {
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      enableMultiRowSelection,
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} onClick={() => rowSelection.options.onRowSelectionChange({})}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row} onDoubleClick={() => alert(`Double click on row: ${row.id}`)}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const Message: Story = {
  render: () => {
    const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <Fragment key={row.id}>
              {/* TODO: change row border color to message variant color */}
              <TableRow>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
              <MessageRow
                message={index === 2 ? { message: 'This is an error', variant: 'error' } : undefined}
                columnCount={columns.length}
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const Reorder: Story = {
  render: () => {
    const [data, setData] = React.useState(tableData);
    const updateOrder = (moveId: string, targetId: string) => {
      const fromIndex = indexOf(data, obj => obj.id === moveId);
      const toIndex = indexOf(data, obj => obj.id === targetId);
      arraymove(data, fromIndex, toIndex);
      setData([...data]);
    };
    const reorderColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      }
    ];
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      data,
      columns: reorderColumns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow key={row.id} row={row} id={row.original.id} updateOrder={updateOrder}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} onClick={() => table.options.meta?.updateData(row.id, cell.column.id, cell.getValue() + '1')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </ReorderRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const MultiSelectWithReorder: Story = {
  render: () => {
    const [data, setData] = React.useState(tableData);

    const reorderColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      }
    ];
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      enableMultiRowSelection: true,
      data,
      columns: reorderColumns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });

    const updateOrder = (moveId: string, targetId: string) => {
      const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original.id);
      const moveIds = selectedRows.length > 1 ? selectedRows : [moveId];
      const moveIndexes = moveIds.map(moveId => indexOf(data, obj => obj.id === moveId));
      const toIndex = indexOf(data, obj => obj.id === targetId);
      arrayMoveMultiple(data, moveIndexes, toIndex);
      setData([...data]);
      resetAndSetRowSelection(table, data, moveIds, row => row.id);
    };

    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow
              key={row.id}
              row={row}
              id={row.original.id}
              updateOrder={updateOrder}
              onDrag={!row.getIsSelected() ? () => table.resetRowSelection() : undefined}
              onClick={event => handleMultiSelectOnCtrlRowClick(table, row, event)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} onClick={() => table.options.meta?.updateData(row.id, cell.column.id, cell.getValue() + '1')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </ReorderRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};
