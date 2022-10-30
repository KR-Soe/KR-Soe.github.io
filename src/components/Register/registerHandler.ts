import { validateReg } from './../Login/validate';

const registerHandler = async (
        event: React.MouseEvent<HTMLElement>,
        createUser: Function, 
        data: any[], 
        userData: {mail: string, name: string, gender: string}
    ) => {

    const { mail, name, gender } = userData;
    const isValid = validateReg(name!, mail!, data);

    if(!isValid) {
        const element = document.querySelectorAll<HTMLElement>('.input-field')
        element.forEach(el => el.classList.add('--error'))
        alert('usuario y/o correo ya esta en uso')
        return;
    }
    
    await createUser(name, mail, gender).then(() => {
        const element = document.querySelectorAll<HTMLElement>('.input-field')
        element.forEach(el => el.classList.remove('--error'))
        alert('Usuario registrado correctamente');
    }).catch(() => console.log('error'));
}


export default registerHandler;