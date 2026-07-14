import { Badge, Card } from "../../common";

import { INFO_ICONS } from "../../../constants/icons";

import {
    formatDate,
    truncateText,
} from "../../../utils";

import type { RecentAchievement } from "../../../types/Dashboard";

import "./RecentAchievementCard.css";

interface RecentAchievementCardProps {
    achievement: RecentAchievement;
}

export default function RecentAchievementCard({
    achievement,
}: RecentAchievementCardProps) {



    const RecipientIcon = INFO_ICONS.recipient;
    const CategoryIcon = INFO_ICONS.category;
    const CreatorIcon = INFO_ICONS.creator;
    const CalendarIcon = INFO_ICONS.calendar;
    const publishedDate = formatDate(achievement.achievement_date);

    return (
        <Card className="achievement-card">
            <div className="achievement-card-header">
                <h3 title={achievement.title}>
                    {truncateText(achievement.title, 55)}
                </h3>
            </div>

            <div className="achievement-card-badges">
               <Badge
                    variant="status"
                    value={achievement.status.published}
                />

                <Badge
                    variant="featured"
                    value={achievement.featured}
                />

                <Badge
                    variant="level"
                    value={achievement.level}
                />
            </div>

            <p className="achievement-description">
                {truncateText(achievement.short_description, 110)}
            </p>

            <div className="achievement-information">
                <div className="achievement-item">
                    <RecipientIcon size={18} />

                    <span>{achievement.recipient}</span>
                </div>

                <div className="achievement-item">
                    <CategoryIcon size={18} />

                    <span>{achievement.category.name}</span>
                </div>

                <div className="achievement-item">
                    <CreatorIcon size={18} />

                    <span>{achievement.creator.name}</span>
                </div>

                <div className="achievement-item">
                    <CalendarIcon size={18} />

                    <span>{publishedDate}</span>
                </div>
            </div>
        </Card>
    );
}
