import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/atoms/Button";
import { LocaleConsumer } from '../contexts/LocaleContext';
import useInput, { translate } from "../utils";
import { register } from '../utils/api';

export function RegisterPage() {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');
    const navigate = useNavigate()

    const  onLogin = async(e) => {
        e.preventDefault();

        if(!email) {
            alert('Please enter a valid email');
            return;
        } else if(!password) {
            alert('Please enter a valid password');
            return;
        } else if(password !== confirmPassword) {
            alert('Password and confirm password must be the same');
            return;
        } else if(!name) {
            alert('Please enter a valid name');
            return;
        }

        const {error} = await register({name, email, password})
        if(!error) {
            navigate("/login")
        }
    }

    return (
         <LocaleConsumer>
            {
            ({ locale }) => {
                    return <>
                        <div className="form">
                            <div className="form-item">
                                <label htmlFor="fullName">{ translate(locale, 'Nama Lengkap','Full name')}</label>
                                <input type="text" id="fullName" value={name} onChange={onNameChange} />
                            </div>
                            <div className="form-item">
                                <label htmlFor="email">{ translate(locale, 'Surel','Email')}</label>
                                <input type="email" id="email" value={email} onChange={onEmailChange} />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password">{ translate(locale, 'Kata sandi','Password')}</label>
                                <input type="password" id="password" value={password} onChange={onPasswordChange} />
                            </div>
                            <div className="form-item">
                                <label htmlFor="confirm-password">{ translate(locale, 'Konfirmasi Password','Confirm Password')}</label>
                                <input type="password" id="confirm-password" value={confirmPassword} onChange={onConfirmPasswordChange} />
                            </div>
                            <Button type="submit" title={ translate(locale, 'Daftar', 'Register') } onClick={(e) => onLogin(e)} />
                            
                            <p className="form-item link">
                                { translate(locale, 'Sudah punya kun ?','Already have an account ?')}
                                 <Link to={'/login'}>
                                     { translate(locale, 'Masuk disini','Login Here')}
                                </Link>
                            </p> 
                        </div>
                    </>
            }
        }
         </LocaleConsumer>

        
    );
}
