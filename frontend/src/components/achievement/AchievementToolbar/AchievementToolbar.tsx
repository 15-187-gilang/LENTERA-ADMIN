import "./AchievementToolbar.css";

import { Link } from "react-router-dom";

import {

    Plus,

    RefreshCcw,

    Search,

} from "lucide-react";

import {

    ROUTES,

    FORM_LEVEL_OPTIONS,

    SORT_OPTIONS,

    PUBLISHED_OPTIONS,

} from "../../../constants";

import Button from "../../common/Button";

import Input from "../../common/Form/Input";

import Select from "../../common/Form/Select";

interface AchievementToolbarProps {

    search: string;

    level: string;

    published: string;

    sort: string;

    loading?: boolean;

    onSearchChange: (value: string) => void;

    onLevelChange: (value: string) => void;

    onPublishedChange: (value: string) => void;

    onSortChange: (value: string) => void;

    onRefresh: () => void;

}

export default function AchievementToolbar({

    search,

    level,

    published,

    sort,

    loading = false,

    onSearchChange,

    onLevelChange,

    onPublishedChange,

    onSortChange,

    onRefresh,

}: AchievementToolbarProps) {

    return (

        <div className="achievement-toolbar">

            <div className="toolbar-left">

                <Input

                    value={search}

                    leftIcon={<Search size={18}/>}

                    placeholder="Cari judul, penerima, penyelenggara..."

                    disabled={loading}

                    onChange={(e)=>

                        onSearchChange(

                            e.target.value

                        )

                    }

                />

                <Select

                    value={level}

                    disabled={loading}

                    options={FORM_LEVEL_OPTIONS}

                    onChange={(e)=>

                        onLevelChange(

                            e.target.value

                        )

                    }

                />

                <Select

                    value={sort}

                    disabled={loading}

                    options={SORT_OPTIONS}

                    onChange={(e)=>

                        onSortChange(

                            e.target.value

                        )

                    }

                />

            </div>

            <div className="toolbar-right">

                <Button

                    variant="outline"

                    leftIcon={

                        <RefreshCcw

                            size={18}

                        />

                    }

                    loading={loading}

                    onClick={onRefresh}

                >

                    Refresh

                </Button>

                <Link

                    to={ROUTES.achievementCreate}

                    className="toolbar-link"

                >

                    <Button

                        leftIcon={

                            <Plus

                                size={18}

                            />

                        }

                    >

                        Tambah Prestasi

                    </Button>

                </Link>

            </div>

        </div>

    );

}