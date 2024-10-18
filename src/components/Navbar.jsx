import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-lg">HR Management</div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/attendance" className="text-white hover:underline">
                            Attendance
                        </Link>
                    </li>
                    <li>
                        <Link to="/benefits" className="text-white hover:underline">
                            Benefits
                        </Link>
                    </li>
                    <li>
                        <Link to="/leave" className="text-white hover:underline">
                            Leave
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
