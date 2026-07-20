import type { LucideIcon } from "lucide-react";

import "./Badge.css";

import {

    getFeaturedBadge,

    getLevelBadge,

    getStatusBadge,

} from "../../../utils";

type BadgeVariant =

    | "level"

    | "status"

    | "featured";

interface BadgeProps {

    variant: BadgeVariant;

    value:

        | string

        | boolean;

}

interface BadgeConfig {

    label: string;

    icon?: LucideIcon;

    color: string;

}

export default function Badge({

    variant,

    value,

}: BadgeProps) {

    let badge: BadgeConfig;

    switch (variant) {

        case "level":

            badge = {

                label: String(value),

                ...getLevelBadge(

                    String(value)

                ),

            };

            break;

        case "status":

            badge = {

                label:

                    value

                        ? "Published"

                        : "Draft",

                ...getStatusBadge(

                    Boolean(value)

                ),

            };

            break;

        case "featured":

            badge = {

                label:

                    value

                        ? "Unggulan"

                        : "Biasa",

                ...getFeaturedBadge(

                    Boolean(value)

                ),

            };

            break;

    }


    const Icon = badge.icon;

    return (

        <div

            className="badge"

            style={{

                color: badge.color,

                borderColor:

                    `${badge.color}30`,

                backgroundColor:

                    `${badge.color}15`,

            }}

        >

            {

                Icon && (

                    <Icon

                        size={15}

                        strokeWidth={2}

                    />

                )

            }

            <span>

                {badge.label}

            </span>

        </div>

    );

}