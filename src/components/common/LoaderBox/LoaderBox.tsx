import classNames from "classnames";

import Loader from "../Loader/Loader";

import styles from "./loaderBox.module.scss";

interface IProps {
    children: React.ReactNode;
    isLoading?: boolean;
}

const LoaderBox = ({ children, isLoading }: IProps) => (
    <div className={
        classNames({
            [styles.loaderBox]: true,
            [styles.loaderBoxLoading]: isLoading,
        })
    }>
        {isLoading && (
            <div className={styles.loaderBox__loader}>
                <Loader size={50} />
            </div>
        )}
        {children}
    </div>
);

export default LoaderBox;