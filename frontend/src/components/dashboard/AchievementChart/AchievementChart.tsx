import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import type { AchievementTrend } from "../../../types/Dashboard";

import Card from "../../common/Card";

import ChartFilter from "./ChartFilter";

import "./AchievementChart.css";

interface AchievementChartProps {
    trend: AchievementTrend;

    period: "year" | "month";

    year: number;

    onPeriodChange: (value: "year" | "month") => void;

    onYearChange: (value: number) => void;
}

export default function AchievementChart({
    trend,

    period,

    year,

    onPeriodChange,

    onYearChange,
}: AchievementChartProps) {
    /**
     * Empty State
     */
    if (trend.data.length === 0) {
        return (
            <Card className="chart-card">
                <div className="chart-header">
                    <div>
                        <h3>Tren Prestasi</h3>

                        <p>Belum terdapat data prestasi.</p>
                    </div>

                    <ChartFilter
                        period={period}

                        year={year}

                        onPeriodChange={onPeriodChange}

                        onYearChange={onYearChange}
                    />
                </div>

                <div className="chart-empty">
                    Tidak ada data untuk ditampilkan.
                </div>
            </Card>
        );
    }

    return (
        <Card className="chart-card">
            <div className="chart-header">
                <div>
                    <h3>Tren Prestasi</h3>

                    <p>Statistik prestasi berdasarkan waktu.</p>
                </div>

                <ChartFilter
                    period={period}

                    year={year}

                    onPeriodChange={onPeriodChange}

                    onYearChange={onYearChange}
                />
            </div>

            <ResponsiveContainer width="100%" height={340}>
                <LineChart
                    data={trend.data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        stroke="#E5E7EB"

                        strokeDasharray="3 3"

                        vertical={false}
                    />

                    <XAxis
                        dataKey="label"

                        axisLine={false}

                        tickLine={false}

                        tick={{
                            fontSize: 13,
                        }}
                    />

                    <YAxis
                        allowDecimals={false}

                        axisLine={false}

                        tickLine={false}

                        tick={{
                            fontSize: 13,
                        }}
                    />

                    <Tooltip
                        cursor={{
                            stroke: "#CBD5E1",

                            strokeWidth: 2,
                        }}

                        contentStyle={{
                            borderRadius: 12,

                            border: "none",

                            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                        }}
                    />

                    <Line
                        type="monotone"

                        dataKey="total"

                        stroke="#2563EB"

                        strokeWidth={3}

                        dot={{
                            r: 4,

                            strokeWidth: 2,

                            fill: "#2563EB",
                        }}

                        activeDot={{
                            r: 7,
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
