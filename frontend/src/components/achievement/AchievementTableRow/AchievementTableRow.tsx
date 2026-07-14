import "./AchievementTableRow.css";

import {

    Eye,

    Pencil,

    Trash2,

} from "lucide-react";

import { Link } from "react-router-dom";

import {

    ROUTES,

} from "../../../constants";

import Badge from "../../common/Badge";

import type {

    Achievement,

} from "../../../types/Api";

import {

    formatDate

} from "../../../utils";

interface AchievementTableRowProps {

    achievement: Achievement;

    onDelete: (id: number) => void;

}

export default function AchievementTableRow({

    achievement,

    onDelete,

}: AchievementTableRowProps) {
    

    return (

        <tr>

            {/* =======================================================
                Prestasi
            ======================================================= */}

            <td>

                <div className="achievement-info">

                    <div className="achievement-thumbnail">

                        {

                            achievement.thumbnail_url ? (

                                <img

                                    src={achievement.thumbnail_url}

                                    alt={achievement.title}

                                />

                            ) : (

                                <div className="thumbnail-placeholder">

                                    No Image

                                </div>

                            )

                        }

                    </div>

                    <div className="achievement-content">

                        <h4>

                            {achievement.title}

                        </h4>

                        <p>

                            {achievement.recipient}

                        </p>

                    </div>

                </div>

            </td>

            {/* =======================================================
                Category
            ======================================================= */}

            <td>

                {

                    achievement.category?.name

                    ?? "-"

                }

            </td>

            {/* =======================================================
                Level
            ======================================================= */}

            <td>

                <Badge
                    variant="level"
                    value={achievement.level}
                />

            </td>

            {/* =======================================================
                Date
            ======================================================= */}

            <td>

                {

                    formatDate(

                        achievement.achievement_date

                    )

                }

            </td>

            {/* =======================================================
                Status
            ======================================================= */}

            <td>

                <Badge
                    variant="status"
                    value={achievement.is_published}
                />

            </td>

            {/* =======================================================
                Action
            ======================================================= */}

            <td>

                <div className="table-actions">

                    <Link

                        className="action-btn"

                        to={`${ROUTES.achievements}/${achievement.id}`}

                        title="Detail"

                    >

                        <Eye size={17}/>

                    </Link>

                    <Link

                        className="action-btn warning"

                        to={ROUTES.achievementEdit(achievement.id)}

                        title="Edit"

                    >

                        <Pencil size={17}/>

                    </Link>

                    <button

                        type="button"

                        className="action-btn danger"

                        onClick={()=>

                            onDelete(

                                achievement.id

                            )

                        }

                    >

                        <Trash2

                            size={17}

                        />

                    </button>

                </div>

            </td>

        </tr>

    );

}