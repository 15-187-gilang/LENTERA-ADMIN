import "./CategoryToolbar.css";
import { Link } from "react-router-dom";
import { Plus, RefreshCcw, Search } from "lucide-react";
import { ROUTES } from "../../../constants";
import Button from "../../common/Button";
import Input from "../../common/Form/Input";

interface CategoryToolbarProps {
    search: string;
    loading?: boolean;
    onSearchChange: (value: string) => void;
    onRefresh: () => void;
}

export default function CategoryToolbar({
    search,
    loading = false,
    onSearchChange,
    onRefresh,
}: CategoryToolbarProps) {
    return (
        <div className="category-toolbar">
            <div className="toolbar-left">
                <Input
                    value={search}
                    leftIcon={<Search size={18}/>}
                    placeholder="Cari kategori..."
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

                <Link
                    to={ROUTES.categoryCreate}
                    className="toolbar-link"
                >
                    <Button leftIcon={<Plus size={18} />}>
                        Tambah Kategori
                    </Button>
                </Link>
            </div>
        </div>
    );
}
