import { FaArchive, FaHome, FaPlus } from 'react-icons/fa';
import { Link, useResolvedPath } from 'react-router-dom';
import './index.css';

export const BottomNavigator = () => {
    const params = useResolvedPath();

    return <>
        <div className="space"></div>
        <div className="bottom-navigator">
            <Link to="/" className={'bottom-navigator-item ' + (params.pathname === '/' ? 'selected' : '')}>
                <FaHome />
            </Link>
            <Link to="/new" className={'bottom-navigator-item ' + (params.pathname === '/new' ? 'selected' : '')}>
                <FaPlus />
            </Link>
            <Link to="/archive" className={'bottom-navigator-item ' + (params.pathname === '/archive' ? 'selected' : '')}>
                <FaArchive />
            </Link>
        </div>
    </>
}