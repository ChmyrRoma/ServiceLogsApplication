import { HEADER_COLUMNS } from '../mockData/mockData';

import {  useAppSelector } from '../../../../store/hooks';

import Table from "../Table/Table";
import TableHeader from "../Table/TableHeader/TableHeader";
import TableCell from "../Table/TableCell/TableCell";
import ServiceLogRow from "./ServiceLogsRow/ServiceLogRow";

import styles from './serviceLogsTable.module.scss';
import { Box } from '@mui/material';

const GRID = {
    gridTemplateColumns: 'repeat(10, minmax(100px, 1fr)) 100px',
    minWidth: 1300,
};

interface IProjectsTableProps {
    onEdit: (id: string) => void;
    onDelete: () => void;
}

const ServiceLogsTable = ({
    onEdit,
    onDelete,
}: IProjectsTableProps) => {
    const { data } = useAppSelector((state) => state.serviceLogs);

    return (
        <div data-testid="projects-table">
            <Table>
                <TableHeader customStyles={GRID} positionSticky="last">
                    {HEADER_COLUMNS.map((column) => {
                        return (
                            <TableCell
                                className={styles.projectsTable__tableCellHead}
                                key={column.id}
                            >
                                {column.label}
                            </TableCell>
                        );
                    })}
                </TableHeader>
                {data.length ? data.map((item) => (
                    <ServiceLogRow
                        key={item.id}
                        data={item}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                )) : <Box textAlign={'center'} p={3}>No Service Logs</Box>}
            </Table>
        </div>
    );
};

export default ServiceLogsTable;
