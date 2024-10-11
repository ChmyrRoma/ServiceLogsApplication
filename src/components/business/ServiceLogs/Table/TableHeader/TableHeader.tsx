import classNames from 'classnames';

import styles from './tableHeader.module.scss';

interface ITableHeader {
    children: React.ReactNode;
    customStyles?: React.CSSProperties;
    positionSticky?: 'first' | 'last';
}

const TableHeader = ({ children, customStyles, positionSticky }: ITableHeader) => {
    return (
        <div
            style={customStyles || {}}
            className={classNames([
                styles.tableHeader,
                {
                    [styles.tableHeader__sticky]: positionSticky,
                    [styles.tableHeader__stickyFirst]: positionSticky === 'first',
                    [styles.tableHeader__stickyLast]: positionSticky === 'last',
                },
            ])}
        >
            {children}
        </div>
    );
};

export default TableHeader;
