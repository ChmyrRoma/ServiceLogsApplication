
import styles from './table.module.scss';

interface ITable {
    children: React.ReactNode;
    customStyles?: React.CSSProperties;
    isLoading?: boolean;
}

const Table = ({ children, customStyles, isLoading }: ITable) => {
    return (
        <div className={styles.tableContainer}>
            {isLoading && (
                <div className={styles.tableContainer__loader}>
                    <div className={styles.table__loader_item}>
                    </div>
                </div>
            )}
            <div style={customStyles} className={styles.table}>
                {children}
            </div>
        </div>
    );
};

export default Table;
