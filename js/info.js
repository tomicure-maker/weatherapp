const form = document.getElementById('form');
const name = document.getElementById('nombre');
const lastname = document.getElementById('apellido');
const email = document.getElementById('email');
const text = document.getElementById('comentario')
const regex =/^[^\s@]+@(hotmail|gmail)\.com$/;

const labelName = document.querySelector('label[for="nombre"]');
const labelLastname = document.querySelector('label[for="apellido"]');
const labelEmail = document.querySelector('label[for="email"]');

form.addEventListener('submit', (e) => {
    e.preventDefault();
        validarNombre();
        validarApellido();
        validarEmail()
})
name.addEventListener('blur', validarNombre);
lastname.addEventListener('input', validarApellido);
email.addEventListener('input', validarEmail);

function validarNombre (){
    if(name.value.length < 3 || name.value.length >= 20){
        console.log('El nombre debe tener entre 3 y 20 caracteres')
        if(!labelName.querySelector('#nameError')){
            const nameError = document.createElement('p');
            nameError.id = 'nameError';
            nameError.classList.add('textError');
            nameError.textContent = 'El nombre debe tener entre 3 a 20 caracteres';
            labelName.appendChild(nameError);
        }     
        name.classList.add('error');
    } else{
        if(labelName.querySelector('#nameError')){
            labelName.querySelector('#nameError').remove()
        }
        name.classList.remove('error');  
    }
}
function validarApellido(){
    if(lastname.value.length < 3 || lastname.value.length > 20){
        console.log('El apellido debe tener entre 3 a 20 caracteres')
        if(!labelLastname.querySelector("#lastnameError")){
            const lastnameError = document.createElement('p');
            lastnameError.id = "lastnameError";
            lastnameError.classList.add('textError');
            lastnameError.textContent = 'El apellido debe tener entre 3 a 20 caracteres.'
            labelLastname.appendChild(lastnameError)
            
        }
        lastname.classList.add('error');
        
    } else{
        lastname.classList.remove('error');
        if(labelLastname.querySelector("#lastnameError")){
            labelLastname.querySelector('#lastnameError').remove()
        }
    }
}
function validarEmail(){
    if(!regex.test(email.value)){
            console.log('El mail debe incluir un @ y ser GMAIL o HOTMAIL')
            email.classList.add('error');
            if(!labelEmail.querySelector('#emailError')){
                const emailError = document.createElement('p');
                emailError.id = 'emailError';
                emailError.classList.add('textError');
                emailError.textContent = 'El email debe tenerminar en: @gmail.com o @hotmail.com'
                labelEmail.appendChild(emailError);
            } 
        } else{
            email.classList.remove('error');
            if( labelEmail.querySelector('#emailError')){
                    labelEmail.querySelector('#emailError').remove();
            }
        }
}