import classNames from "classnames";

import { EServiceType, IServiceLog } from "../../../../../types/serviceLog";

import TableRow from "../../Table/TableRow/TableRow";
import TableCell from "../../Table/TableCell/TableCell";
import ActionsPopover from "../ActionsPopover/ActionsPopover";

import styles from "./serviceLogRow.module.scss";

const GRID = {
    gridTemplateColumns: 'repeat(10, minmax(100px, 1fr)) 100px',
    minWidth: 1300,
};

interface IProjectRowProps {
    data: IServiceLog;
    onEdit: (id: string) => void;
    onDelete: () => void;
}

const isSuspend = false;

const ServiceLogRow = ({ data, onEdit, onDelete }: IProjectRowProps) => {
    const draftStyles = isSuspend
        ? {
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #E9E7F2',
        }
        : {};

    const tableCellClassNames = ({ isBold = true, isBlack = false, isSuspend = false }) =>
        classNames([
            styles.projectRow__tableCell,
            { [styles.projectRow__tableCell_bold]: isBold },
            { [styles.projectRow__tableCell_black]: isBlack },
            { [styles.projectRow__tableCell_grey]: isSuspend },
        ]);


    return (
        <TableRow positionSticky="last" customStyles={{ ...GRID, ...draftStyles }} key={data.id}>
            <TableCell className={tableCellClassNames({})}>
                {data.id}
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
                {data.providerId}
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
                {data.serviceOrder}
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
                {data.truckId}{ data.trailer}
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
                {data.odometer}
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
                {data.engineHours}
            </TableCell>
            <TableCell className={tableCellClassNames({ isBold: false })}>
                {data.startDate}
            </TableCell>
            <TableCell className={tableCellClassNames({ isBold: false })}>
                {data.endDate}
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
            <span
                className={classNames({
                    [styles.projectRow__tableCell_capitalize]: true,
                    [styles.projectRow__tableCell_green]: data.type === EServiceType.PLANNED,
                    [styles.projectRow__tableCell_red]: data.type === EServiceType.EMERGENCY,
                    [styles.projectRow__tableCell_yellow]: data.type === EServiceType.UNPLANNED,
                })}
            >
              {data.type}
            </span>
            </TableCell>
            <TableCell className={tableCellClassNames({})}>
                {data.serviceDescription}
            </TableCell>
            <TableCell className={styles.projectRow__actionsCell}>
                <ActionsPopover id={data.id} deleteDraft={onDelete} editDraft={() => onEdit(data.id)} />
            </TableCell>
        </TableRow>
    );
};

export default ServiceLogRow;
