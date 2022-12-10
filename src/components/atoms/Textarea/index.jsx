import PropTypes from 'prop-types';
import './index.css';

export function Textarea({ value, placeholder, onChange }) {
    return (
        <textarea cols="30" rows="10" placeholder={placeholder} onChange={onChange} value={value} />
    );
}

Textarea.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}