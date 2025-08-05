import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm p-4 flex items-center justify-end border-b border-gray-100 z-10 sticky top-0">
            <div className="flex items-center space-x-2">
                <Link 
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors duration-300">Home
                </Link>
                <Link 
                to="/citas"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full text-sm font-medium transition-colors duration-300">Citas
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
