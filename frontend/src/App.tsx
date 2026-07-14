import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Prestasi from "./pages/Prestasi/Prestasi";
import TambahPrestasi from "./pages/Prestasi/TambahPrestasi";
import EditPrestasi from "./pages/Prestasi/EditPrestasi";
import DetailPrestasi from "./pages/Prestasi/DetailPrestasi";
import Kategori from "./pages/Kategori/Kategori";
import TambahKategori from "./pages/Kategori/TambahKategori";
import EditKategori from "./pages/Kategori/EditKategori";
import MediaLibrary from "./pages/MediaLibrary/MediaLibrary";
import Profil from "./pages/Profil/Profil";


import ProtectedRoute from "./routes/ProtectedRoute";
import { ROUTES } from "./constants";

function App() {
    return (
        <Routes>

            {/* Redirect root ke login */}
            <Route
                path="/"
                element={<Navigate to={ROUTES.login} replace />}
            />

            {/* Login */}
            <Route
                path={ROUTES.login}
                element={<Login />}
            />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>

                <Route
                    path={ROUTES.dashboard}
                    element={<Dashboard />}
                />

                <Route
                    path={ROUTES.achievements}
                    element={<Prestasi />}
                />

                <Route
                    path={ROUTES.achievementCreate}
                    element={<TambahPrestasi />}
                />

                <Route
                    path="/prestasi/:id/edit"
                    element={<EditPrestasi />}
                />

                <Route
                    path="/prestasi/:id"
                    element={<DetailPrestasi />}
                />

                <Route
                    path={ROUTES.categories}
                    element={<Kategori />}
                />

                <Route
                    path={ROUTES.categoryCreate}
                    element={<TambahKategori />}
                />

                <Route
                    path="/kategori/:id/edit"
                    element={<EditKategori />}
                />

                <Route
                    path={ROUTES.media}
                    element={<MediaLibrary />}
                />

                <Route
                    path={ROUTES.profile}
                    element={<Profil />}
                />


            </Route>
        </Routes>
    );
}

export default App;