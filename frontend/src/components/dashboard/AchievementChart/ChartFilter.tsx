import "./AchievementChart.css";

interface ChartFilterProps {
    period: "year" | "month";

    year: number;

    onPeriodChange: (period: "year" | "month") => void;

    onYearChange: (year: number) => void;
}

export default function ChartFilter({
    period,

    year,

    onPeriodChange,

    onYearChange,
}: ChartFilterProps) {
    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: 10 },

        (_, index) => currentYear - index,
    );

    return (
        <div className="chart-filter">
            <select
                value={period}

                onChange={(event) =>
                    onPeriodChange(event.target.value as "year" | "month")
                }
            >
                <option value="year">Per Tahun</option>

                <option value="month">Per Bulan</option>
            </select>

            {period === "month" && (
                <select
                    value={year}

                    onChange={(event) =>
                        onYearChange(Number(event.target.value))
                    }
                >
                    {years.map((item) => (
                        <option
                            key={item}

                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
