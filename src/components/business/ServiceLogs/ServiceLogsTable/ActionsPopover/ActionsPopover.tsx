import { useState, useEffect, useRef } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { serviceLogsApi } from "../../../../../store/rest/serviceLogs";

import styles from "./actionsPopover.module.scss";
import {toast} from "react-toastify";
import { IconButton } from "@mui/material";

interface IProps {
    id: string;
    editDraft: () => void;
    deleteDraft: () => void;
}

const ActionsPopover = ({ id, editDraft, deleteDraft }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = () => setIsOpen(!isOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDeleteDraft = async () => {
        setIsLoading(true);

        const response = await serviceLogsApi.deleteServiceLogById(id);
        if (response) {
            toast.success('Draft deleted!');
        } else {
            toast.error('Something wrong!');
        }

        setIsLoading(false);
        setIsOpen(false);

        deleteDraft();
    }

    return (
        <div className={styles.actionsPopover} ref={popoverRef}>
            <IconButton onClick={handleChange} size="small">
                <MoreVertIcon className={styles.actionsPopover__icon} />
            </IconButton>
            {isOpen && (
                <div className={styles.actionsPopover__container}>
                    <div className={styles.actionsPopover__container_content} onClick={editDraft}>
                        <EditIcon />
                        Edit
                    </div>
                    {isLoading ? (
                        <div className={styles.actionsPopover__container_loaderOverlay}>
                            <AutorenewIcon className={styles.actionsPopover__container_loader} />
                        </div>
                    ) : (
                        <div className={styles.actionsPopover__container_content} onClick={handleDeleteDraft}>
                            <DeleteIcon />
                            Delete
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionsPopover;
