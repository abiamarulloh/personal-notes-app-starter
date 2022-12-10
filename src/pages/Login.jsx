import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/atoms/Button";
import { LocaleConsumer } from '../contexts/LocaleContext';
import useInput, { translate } from "../utils";
import { login } from "../utils/api";

export function LoginPage({loginSuccess}) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const navigate = useNavigate()


    const  onLogin = async(e) => {
        e.preventDefault();

        if(!email) {
            alert('Please enter a valid email');
            return;
        } else if(!password) {
            alert('Please enter a valid password');
            return;
        }

        const {error, data} = await login({email, password})
        if(!error) {
            loginSuccess(data)
            navigate('/')
        }
    }

    return (
        <LocaleConsumer>
        {
          ({ locale }) => {
                return <>
                    <div className="form">
                        <div className="form-item">
                            <label htmlFor="email">{ translate(locale, 'Surel','Email')}</label>
                            <input type="email" id="email" value={email} onChange={onEmailChange} />
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">{ translate(locale, 'Kata sandi','Password')}</label>
                            <input type="password" id="password" value={password} onChange={onPasswordChange} />
                        </div>
                        <Button type="submit" title={ translate(locale, 'Masuk', 'Login') } onClick={(e) => onLogin(e)} />
                        
                    
                        <p className="form-item link">
                            { translate(locale, 'Belum punya akun ?' ,  "Don't have an account ?" )}
                            <Link to={'/register'}>{ translate(locale, 'Daftar disini',  "Register Here") } </Link></p> 
                    </div>                
                </>
             }
        }
      </LocaleConsumer>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func,
}