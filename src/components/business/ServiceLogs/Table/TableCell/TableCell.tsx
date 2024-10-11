import classNames from 'classnames';

import styles from './tableCell.module.scss';

interface ITableCellProps {
    children: React.ReactNode;
    customStyles?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

const TableCell = ({ children, customStyles, className, onClick }: ITableCellProps) => {
    return (
        <div className={classNames([styles.tableCell, className])} style={customStyles} onClick={onClick}>
            {children}
        </div>
    );
};

export default TableCell;
