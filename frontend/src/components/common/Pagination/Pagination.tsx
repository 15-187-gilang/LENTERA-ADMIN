import "./Pagination.css";

interface PaginationProps {

    currentPage: number;

    lastPage: number;

    total: number;

    perPage: number;

    loading?: boolean;

    onPageChange: (page: number) => void;

}

export default function Pagination({

    currentPage,

    lastPage,

    total,

    perPage,

    loading = false,

    onPageChange,

}: PaginationProps) {

    if (lastPage <= 1) {

        return null;

    }

    const start = (currentPage - 1) * perPage + 1;

    const end = Math.min(

        currentPage * perPage,

        total

    );

    const pages = [];

    for (let i = 1; i <= lastPage; i++) {

        pages.push(i);

    }

    return (

        <div className="pagination-container">

            <div className="pagination-info">

                Menampilkan

                <strong>

                    {" "} {start} - {end} {" "}

                </strong>

                dari

                <strong>

                    {" "} {total} {" "}

                </strong>

                data

            </div>

            <div className="pagination">

                <button

                    disabled={

                        loading ||

                        currentPage === 1

                    }

                    onClick={() =>

                        onPageChange(

                            currentPage - 1

                        )

                    }

                >

                    Sebelumnya

                </button>

                {

                    pages.map((page) => (

                        <button

                            key={page}

                            className={

                                page === currentPage

                                    ? "active"

                                    : ""

                            }

                            disabled={loading}

                            onClick={() =>

                                onPageChange(page)

                            }

                        >

                            {page}

                        </button>

                    ))

                }

                <button

                    disabled={

                        loading ||

                        currentPage === lastPage

                    }

                    onClick={() =>

                        onPageChange(

                            currentPage + 1

                        )

                    }

                >

                    Selanjutnya

                </button>

            </div>

        </div>

    );

}