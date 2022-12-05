import { FaArchive, FaHome, FaPlus } from 'react-icons/fa';
import { Link, useResolvedPath } from 'react-router-dom';
import './index.css';

export const BottomNavigator = () => {
    const params = useResolvedPath();

    return <>
        <div className="space"></div>
        <div className="bottom-navigator">
            <Link to="/notes" className={'bottom-navigator-item ' + (params.pathname === '/notes' ? 'selected' : '')}>
                <FaHome />
            </Link>
            <Link to="/notes/new" className={'bottom-navigator-item ' + (params.pathname === '/notes/new' ? 'selected' : '')}>
                <FaPlus />
            </Link>
            <Link to="/notes/archive" className={'bottom-navigator-item ' + (params.pathname === '/notes/archive' ? 'selected' : '')}>
                <FaArchive />
            </Link>
        </div>
    </>
}