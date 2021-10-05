import { useEffect, useRef, useState } from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const [inputs, setInputs] = useState({});
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const auth = getAuth();

    const handleChange = e => setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const handleSubmit = async event => {
        event.preventDefault();
        // console.log('event: ', event.email);
        createUserWithEmailAndPassword(auth, email, password)

        setInputs({ displayName: '', email: '', password: '', confirmPassword: '' });

    }

    useEffect(()=> {
        setDisplayName(inputs.displayName);
        setEmail(inputs.email);
        setPassword(inputs.password);
        setConfirmPassword(inputs.confirmPassword);
    },[inputs.confirmPassword, inputs.displayName, inputs.email, inputs.password]);

    const con = () => {
        console.log('inputs: ', inputs);
        console.log('email: ', email);
        console.log('pw: ', password);
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <label>
                    Display Name:
                    <input
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    />
                </label>

                <button type='submit'>SIGN UP</button>
                <button onClick={con}>con</button>
            </form>
        </div>
    );
}

export default SignUp;