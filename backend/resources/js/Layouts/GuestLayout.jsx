import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Guest({ children }) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
            {/* Logo */}
            <div className="mb-3">
                <Link href="https://mounassabat.ma">
                    <image src="logo.png" alt="" />
                </Link>
            </div>

            {/* Card Container */}
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>
    );
}
