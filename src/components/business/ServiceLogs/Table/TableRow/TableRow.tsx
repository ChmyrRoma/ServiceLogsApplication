import classNames from 'classnames';

import styles from './tableRow.module.scss';

interface ITableRow {
    children: React.ReactNode;
    customStyles?: React.CSSProperties;
    positionSticky?: 'first' | 'last';
}

const TableRow = ({ children, customStyles, positionSticky }: ITableRow) => {
    return (
        <div
            style={customStyles || {}}
            className={classNames([
                styles.tableRow,
                {
                    [styles.tableRow__sticky]: positionSticky,
                    [styles.tableRow__stickyFirst]: positionSticky === 'first',
                    [styles.tableRow__stickyLast]: positionSticky === 'last',
                },
            ])}
        >
            {children}
        </div>
    );
};

export default TableRow;
