import PropTypes from 'prop-types';
import { FiLogOut } from 'react-icons/fi';
import ToggleLang from '../../components/atoms/ToggleLang';
import ToggleTheme from '../../components/atoms/ToggleTheme';
import './index.css';

export const Header = ({authenticatedUser, onLogout}) => {
    return <>
        <div className="header">
            <h3>Apps Notes</h3>
           
            <div className="actions">
                <ToggleTheme />
                <ToggleLang />

                 {authenticatedUser ? <h5 onClick={onLogout}>
                    <FiLogOut />
                </h5> : ''}
                
            </div>
         </div>
        <div className="space"></div>
    </>
}

Header.propTypes = {
    authenticatedUser: PropTypes.string,
    onLogout: PropTypes.func,
}