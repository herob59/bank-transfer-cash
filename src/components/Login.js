import React, {useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname ||   "/";

    const { setAuth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();

    // const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/api/login`,
                { email: email, password: pwd }
            
            );

            
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            localStorage.setItem('token', accessToken);
            setAuth({ email, pwd, accessToken });
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Invalid Email or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
        }
    }


  return (
    
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>
                </section>
           
  );
};

export default Login;
