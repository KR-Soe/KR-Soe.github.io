import './css/login.css';
import Background from './../../assets/images/background.png';
import { validateUser } from './validate';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Login = () => {
    const [userData, onChangeUser] = useState({ name: '', mail: '' });
    const [data, onSetData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://gorest.co.in/public/v2/users', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_TOKEN}`
                }
            });
            onSetData(await response.json());
        }
        
        getData();
    }, [])

    const onChangeInput = (evt: React.FormEvent<HTMLInputElement>, field: string) => {
        const newValue = evt.currentTarget.value;
        evt.currentTarget.classList.remove('--error');
        onChangeUser(currentValue => ({
            ...currentValue,
            [field]: newValue
        }));
    }

    const loginHandler = async (event: React.MouseEvent<HTMLElement>) => {
        const { name, mail } = userData;
        const { isValid, user } = validateUser(name!, mail!, data);

        if(!isValid) {
            const element = document.querySelectorAll<HTMLElement>('.input-field');
            alert('nombre y/o contraseña incorrecto')
            element.forEach(el => el.classList.add('--error'))
            return;
        }
        
        navigate('/dashboard', { state: { user }});
    }
    
    return(
        <div className='login-wrapper'>
            <div className='login-container'>
                <h1 className='login-title'>LOG IN</h1>
                <span className='login-message'>Bienvenido a <a href='https://miguru.ai/' target='blank'>Miguru.ai</a></span>
                <div className='form'>
                    <div className='field-container'>
                        <span className='field'>Nombre</span>
                        <input className='input-field' onKeyUp={evt => onChangeInput(evt, 'name')} placeholder='Escriba su nombre'></input>
                    </div>
                    <div className='field-container'>
                        <span className='field'>Email</span>
                        <input className='input-field' onKeyUp={evt => onChangeInput(evt, 'mail')} placeholder='Escriba su correo aquí'></input>
                    </div>
                    <div className='button-container'>
                        <button className='login-button' onClick={loginHandler}>Ingresar</button>
                    </div>
                </div>
                <span className='login-message'>¿Aún no tienes una cuenta? <label className='link-label' onClick={() => navigate('/register')}>registrate</label></span>
            </div>
            <div className='login-image'>
                <div className='svg-container'>
                    <svg width="240" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#prefix__clip0_181:7055)" fill="#fff">
                            <path d="M76.976 30.106c.499 4.741-.903 9.178-3.044 13.36-2.562 5.007-6.279 9.172-11.302 12.01-3.655 2.06-7.523 3.61-11.845 4.105-2.035.234-4.064.539-6.077.37-3.504-.288-6.957-.88-10.242-2.256-3.885-1.626-7.338-3.806-10.236-6.797-.544-.56-1.037-.696-1.822-.256-3.616 2.028-7.277 3.964-10.848 6.074-1.743 1.027-3.543 2.093-5.83 1.968-2.91-.163-4.86-1.566-5.527-4.366-.667-2.79.387-5.252 2.965-6.715 3.526-2.006 7.036-4.04 10.668-5.867.858-.43 1.61-1.05 2.495-1.462.611-.289.745-.805.426-1.49-.858-1.832-1.53-7.705-1.615-8.689-.448-5.437 1.43-10.804 4.53-15.523 2.052-3.127 4.563-5.856 7.619-8.162 3.2-2.425 6.704-4.159 10.567-5.285C41.743 0 45.723-.218 49.725.195c4.194.436 8.14 1.713 11.823 3.72 3.487 1.897 6.363 4.41 8.942 7.4 3.044 3.534 4.776 7.601 6.015 11.902.622 2.202.69 4.54.47 6.889zM46.283 54.024c2.27.11 4.457-.413 6.582-.99 4.624-1.25 8.442-3.783 11.76-7.166 2.585-2.631 4.043-5.785 5.304-9.085.207-.55.297-1.147-.493-1.474-2.316-.956-4.412-2.321-6.632-3.452-1.856-.946-3.84-1.659-5.634-2.697-3.549-2.066-7.338-3.681-10.926-5.671-.41-.229-.818-.43-1.306-.158-2.164 1.218-4.328 2.436-6.503 3.632-3.033 1.659-6.082 3.29-9.115 4.948-2.136 1.164-4.26 2.355-6.385 3.534-.527.294-.595.658-.387 1.245 1.598 4.535 4.014 8.45 7.927 11.587 4.653 3.736 9.928 5.421 15.808 5.747zM57.994 9.08c-3.285-2.012-6.817-2.718-10.349-2.98-5.123-.375-9.956.952-14.345 3.551-1.973 1.17-3.846 2.55-5.342 4.268-1.189 1.36-2.316 2.779-3.213 4.366-1.676 2.964-2.859 6.041-2.92 9.467-.017.94.224 1.267 1.183.723 1.844-1.044 3.722-2.028 5.572-3.061 5.185-2.898 10.315-5.9 15.556-8.695 4.591-2.44 9.11-5.007 13.858-7.639zm12.832 18.15c-.213-1.159-.286-2.588-.835-3.953-1.329-3.328-2.714-6.612-5.416-9.19-.712-.679-1.334-.831-2.22-.336-3.223 1.794-6.469 3.556-9.709 5.323-.454.25-.566.554-.028.745.852.299 1.486.919 2.27 1.31 4.838 2.414 9.682 4.817 14.525 7.22 1.357.664 1.424.62 1.413-1.12zM113.823 25.272c-1.34 1.713-2.685 3.425-4.025 5.138-1.267 1.62-2.506 3.257-3.79 4.866-1.16 1.457-1.911 1.447-3.033-.021-2.438-3.198-4.86-6.4-7.293-9.597-.185-.245-.291-.571-.7-.593-.421.49-.247 1.05-.247 1.566-.017 5.421-.04 10.842.011 16.258.011 1.283-.42 1.837-1.771 1.723-.836-.07-1.677-.005-2.517-.016-1.806-.016-1.957-.158-1.963-1.974-.01-2.936-.005-5.872-.005-8.808 0-5.372-.006-10.75 0-16.122 0-1.963.252-2.017 2.242-2.229 3.319-.359 5.746.44 7.484 3.496 1.474 2.588 3.56 4.85 5.359 7.264.948 1.267 1.099 1.294 2.063.022 2.428-3.203 4.855-6.405 7.232-9.635.572-.777 1.233-1.152 2.22-1.12 1.306.044 2.612.038 3.918.006 1.11-.033 1.637.43 1.637 1.517a14243.8 14243.8 0 00.006 26.147c0 1.033-.477 1.48-1.536 1.441-1.026-.032-2.058-.06-3.078.011-1.34.093-1.816-.462-1.805-1.74.039-5.285.017-10.57.017-15.855v-1.593l-.426-.152zM158.916 27.66c1.727 0 3.454.015 5.175-.012.902-.016 1.412.272 1.407 1.23-.017 3.43-.017 6.861-.006 10.292 0 .756-.443 1.267-.931 1.756-3.38 3.366-7.596 4.595-12.321 4.355-3.011-.152-5.903-.766-8.46-2.441-3.352-2.197-5.185-5.258-5.942-9.107-1.009-5.15.034-9.804 3.33-13.887 2.394-2.969 5.701-4.508 9.603-4.959 3.677-.43 7.125.05 10.421 1.718 3.7 1.876 3.818 3.578.365 5.878-.802.533-1.306.054-1.873-.31-2.455-1.598-5.09-2.31-8.072-1.805-4.76.805-7.209 4.045-7.832 7.77-.583 3.474-.112 6.845 2.887 9.428 2.848 2.452 9.188 2.795 12.221.62.723-.517.746-1.197.735-1.925-.034-3.877.426-3.328-3.364-3.377-.28-.005-.56.028-.841-.005-.981-.12-2.343.49-2.864-.473-.667-1.229-.314-2.74-.169-4.121.068-.631.707-.631 1.223-.631 1.76.005 3.531.005 5.308.005zM239.99 34.363c0 2.887-.034 5.78.016 8.667.017 1.164-.442 1.664-1.648 1.577-.79-.054-1.586-.022-2.377-.016-.633.01-1.098-.212-1.261-.838-.286-1.093-.841-.924-1.614-.418-3.173 2.088-6.487 2.321-9.861.484-2.557-1.392-3.801-3.73-4.238-6.39-.662-4.028-.225-8.112-.303-12.168-.017-.826.409-1.256 1.256-1.3.14-.005.28-.021.42-.021 4.687-.016 4.12-.31 4.199 3.806.05 2.838-.292 5.693.235 8.515.376 2.028 1.733 3.311 3.667 3.588 1.979.278 4.114-.783 5.023-2.5.605-1.153.812-2.393.818-3.67.011-2.709.039-5.422-.011-8.13-.023-1.158.443-1.625 1.637-1.62 4.742.006 3.991-.196 4.042 3.795.022 2.213 0 4.426 0 6.64zM186.744 42.481c-1.62 1.011-2.898 1.74-4.406 2.213-4.653 1.457-9.923-1.566-10.988-6.726-.471-2.289-.263-4.589-.308-6.884-.039-1.892.017-3.79-.011-5.687-.017-.968.437-1.419 1.407-1.44.095 0 .185-.012.28-.012 4.9-.049 3.958-.103 4.025 3.643.045 2.436-.062 4.878.034 7.308.073 1.87.689 3.578 2.595 4.475 3.269 1.544 6.924-.63 7.053-4.263.106-3.066.028-6.139.044-9.205.006-1.746.202-1.952 2.002-1.958 4.322-.021 3.666-.228 3.688 3.524.028 5.143-.022 10.287.028 15.436.012 1.3-.465 1.838-1.788 1.702a6.368 6.368 0 00-1.115 0c-1.441.098-2.731.016-2.54-2.126zM198.158 34.309c0-2.931.028-5.867-.017-8.798-.016-1.082.393-1.61 1.536-1.571.836.027 1.677 0 2.517.021.421.011.987.022 1.116.42.482 1.45 1.082.592 1.721.162 2.354-1.593 6.632-1.484 9.003.174.667.468.897 1.006.561 1.74-.152.332-.314.653-.477.979-1.351 2.599-1.351 2.599-4.064 1.675-2.405-.821-6.15.674-6.172 4.04-.028 3.202-.011 6.404-.023 9.612-.005 1.73-.112 1.844-1.917 1.827-4.367-.038-3.739.55-3.784-3.653-.022-2.208 0-4.415 0-6.628zM126.554 34.282c0-2.887.039-5.775-.017-8.662-.028-1.31.493-1.914 1.856-1.941 4.815-.087 4.019.169 4.041 3.725.028 5.143.012 10.281.006 15.425 0 1.653-.118 1.778-1.828 1.762-4.686-.038-3.997.581-4.053-3.817-.028-2.164-.005-4.328-.005-6.492zM132.782 18.59c-.017 1.827-1.385 3.159-3.251 3.175-1.918.017-3.347-1.392-3.308-3.257.039-1.86 1.39-3.18 3.263-3.197 1.911-.016 3.313 1.381 3.296 3.279z"></path>
                            <path d="M55.173 35.57c2.702 0 4.193 1.337 4.199 3.768.005 2.54-1.783 4.399-4.233 4.393-2.23-.005-4.148-1.881-4.21-4.034-.056-1.996 1.693-4.486 4.244-4.127zM37.543 35.57c2.17 0 4.177 1.849 4.171 3.839-.006 2.463-2.012 4.41-4.54 4.306-1.84-.076-4.099-1.462-3.92-4.17.175-2.664 1.436-3.98 4.29-3.975z"></path>
                        </g>
                        <defs>
                            <clipPath id="prefix__clip0_181:7055">
                            <path fill="#fff" d="M0 0h240v60H0z"></path>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <img src={Background} alt='img' />
            </div>
        </div>
    );
};

Login.displayName = "Login";

export default Login;