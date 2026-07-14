import LoginCard from "../../components/auth/LoginCard/LoginCard";
import logoLentera from "../../assets/lentera.png";
import "./Login.css";

export default function Login() {
    return (
        <div className="login-layout">
            <div className="login-bg-overlay"></div>
            <div className="login-bg-shape"></div>
            
            <div className="login-top-logo">
                <img src={logoLentera} alt="LENTERA" />
            </div>

            <div className="login-content">
                <LoginCard />
            </div>
        </div>
    );
}
