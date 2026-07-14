/**
 * ============================================================================
 * Publish Status
 * ============================================================================
 */

export type PublishStatus =

    "true"

    |

    "false"

    |

    "";

export interface PublishStatusOption {

    value: PublishStatus;

    label: string;

}

export const PUBLISH_STATUS_OPTIONS:

readonly PublishStatusOption[] = [

    {

        value: "",

        label: "Semua Status",

    },

    {

        value: "true",

        label: "Published",

    },

    {

        value: "false",

        label: "Draft",

    },

] as const;