import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainBase from "../base/mainBase";
import HomePage from "../pages/home";
import OutBase from "../base/outBase";
import LoginPage from "../pages/login";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainBase />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
                <Route element={<OutBase />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
