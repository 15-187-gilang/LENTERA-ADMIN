import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import type { Category } from "../../../types/Api";
import Button from "../../common/Button";
import { formatDate } from "../../../utils";

interface CategoryTableRowProps {
    category: Category;
    index: number;
    onDelete: (category: Category) => void;
}

export default function CategoryTableRow({
    category,
    index,
    onDelete,
}: CategoryTableRowProps) {
    const EditIcon = Pencil;
    const DeleteIcon = Trash2;

    return (
        <tr className="category-table-row">
            <td className="text-center">{index + 1}</td>
            <td>
                <div className="category-name">{category.name}</div>
            </td>
            <td>{category.slug}</td>
            <td className="text-center">
                <span className="badge">
                    {category.achievements_count ?? 0} Prestasi
                </span>
            </td>
            <td>{formatDate(category.created_at)}</td>
            <td>
                <div className="action-buttons">
                    <Link to={`/kategori/${category.id}/edit`}>
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<EditIcon size={14} />}
                            title="Edit"
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<DeleteIcon size={14} />}
                        onClick={() => onDelete(category)}
                        title="Hapus"
                    >
                        Hapus
                    </Button>
                </div>
            </td>
        </tr>
    );
}
