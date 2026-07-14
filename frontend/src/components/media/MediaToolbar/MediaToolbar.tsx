import "./MediaToolbar.css";
import { Link } from "react-router-dom";
import { Search, RefreshCcw, Upload } from "lucide-react";
import Button from "../../common/Button";
import Input from "../../common/Form/Input";

interface MediaToolbarProps {
    search: string;
    loading?: boolean;
    onSearchChange: (value: string) => void;
    onRefresh: () => void;
    onUpload: () => void;
}

export default function MediaToolbar({
    search,
    loading = false,
    onSearchChange,
    onRefresh,
    onUpload,
}: MediaToolbarProps) {
    return (
        <div className="media-toolbar">
            <div className="toolbar-left">
                <Input
                    value={search}
                    leftIcon={<Search size={18} />}
                    placeholder="Cari nama file, ekstensi..."
                    disabled={loading}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="toolbar-right">
                <Button
                    variant="outline"
                    leftIcon={<RefreshCcw size={18} />}
                    loading={loading}
                    onClick={onRefresh}
                >
                    Refresh
                </Button>

                <Button
                    leftIcon={<Upload size={18} />}
                    onClick={onUpload}
                >
                    Upload Media
                </Button>
            </div>
        </div>
    );
}
