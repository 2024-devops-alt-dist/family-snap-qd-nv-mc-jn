import { useState } from 'react';
import { supabase } from '../supabaseClient';
import {Link, useNavigate} from 'react-router-dom';

function Login() {
    
    
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    
    const login = async () => {

        const { data, error } = await supabase
            .from('events')
            .insert([
                {  title: title, date: date, description: description, created_by:'bcd2b9f4-2ffc-4ec8-a141-c14ac6575e72'  },
            ])
            .select('id')

        if (error) {
            alert('Insert failed');
            console.log(error.message);
        } else if (data && data.length > 0) {
            const id = data[0].id;

            // Use React Router's navigate function
            navigate(`/feed/${id}`);
        }
    }

    return (
        <div>

            <section className="hero is-fullheight is-default is-bold">
                <div className="hero-head">
                    <nav className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <Link to="/" className="navbar-item" >
                                    <img src="./src/assets/img/lgo.svg" alt="Logo"/>
                                </Link>

                            </div>
                            <div id="navbarMenu" className="navbar-menu">
                                <div className="navbar-end">
                                    <div className="tabs is-right">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div className="column is-6 is-offset-3" id="glasscreate">
                            <h1 className="title">
                                Create an Event
                            </h1>
                            <div className="">
                                <div className="field is-grouped">
                                    <p className="control is-expanded">
                                        <input className="input form" type="text" placeholder="Email" onChange={(e)=> setTitle(e.target.value)}/>
                                        <input className="input form" type="password" placeholder="Password" onChange={(e) => setDate(e.target.value)}/>
                                        <button className="button" id="create" onClick={login}>Create an Account</button>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Login;