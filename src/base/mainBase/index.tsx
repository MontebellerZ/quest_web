import "./styles.scss";
import { Outlet } from "react-router-dom";

function MainBase() {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default MainBase;
