import React, { useState } from 'react';
import "./../styles/Login.css"
import { MdOutlineMail } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import {Link} from "react-router-dom"

export default function Logins() {
    const [formData , setFormData] = useState({
        email :'',
        password : ''
    })
    const [errors , setErrors] = useState({})

    const handleChange =(e) => {
        const {name , value} = e.target;
        setFormData({
            ...formData, [name] :value
        })

    }

    const handleSubmit =(e) => {
        e.preventDefault()
        const validationErrors ={}
        if(!formData.email.trim()){
            validationErrors.email = "* Yêu cầu nhập email"
        }
        else if (!/\S+@\S\.\S+/.test(formData.email)){
            validationErrors.email = "* Email không đúng định dạng"
        }

        if(!formData.password.trim()){
            validationErrors.password ="* Yêu cầu nhập mật khẩu"
        }
        else if (formData.password.length < 10){
            validationErrors.password = "Mật khẩu sai . Xin mời nhập lại"
        }

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            alert("Login sucess")
        }
        
        
    }
  return (
    <div>
        <header>
        <div className="logo bg-black py-4 pe-0 ps-3">
        <a>
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt=""
            style={{width :'120px'}} />
        </a>
      </div>
        </header> 

        <section className='d-flex justify-content-center align-items-center'
        style={{
            background :'linear-gradient(rgba(11,1,1,0.9) 0% , rgba(0,0,0) 100%)',
        }}>
            <div className="main my-5 mx-0 p-2 bg-dark"
            style={{
                width:'734px',
                height :'910px',
                borderRadius:'5px'
            }}>
                <h1 className='text-center my-5 mx-0 text-light fs-1'>Login in to Spotify</h1>

                <div className="account-connect d-flex justify-content-center align-items-center flex-column">
                    <button className="a-c-btn text-center p-2 my-1 mx-0 text-light fs-6" id='google'>
                    <img src="./../image/google.png" alt=""
                    style={{width :'50px'}} />
                        <span>Log in with Google</span>
                    </button>

                    <button className="a-c-btn text-center p-2 my-1 mx-0 text-light fs-6" id='apple'>
                    <img src="././image/apple.png" alt=""
                    style={{width :'50px'}} />
                        
                        <span>Log in with Apple</span>
                    </button>

                    <button className="a-c-btn text-center p-2 my-1 mx-0 text-light fs-6" id='facebook'>
                    <img src="https://drive.google.com/drive/folders/1ZKE4foBPFg9OrbAyaykN8E_6pU7C6C06" alt=""
                    style={{width :'50px'}} />
                        
                        <span>Log in with Facebook</span>
                    </button>
                </div>
                
                <div className="hr"></div>

                <div className="log-in d-flex justify-content-center align-items-center fw-bold">
                    <form action="" name='login-form' method='post' onSubmit={handleSubmit}>
                        <div style={{position:'relative'}}>
                        <label htmlFor="" className='text-white fs-6 d-block'>Email of username</label>
                        <input 
                        type="email" 
                        placeholder='Email or username ' 
                        name='email' 
                        onChange={handleChange}
                        />

                        <MdOutlineMail className='icon' 
                        style={{top:errors.password ? '26%' : '60%'}}/>

                        {errors.email && 
                        <p 
                        className='text-danger fw-normal py-1 px-2 w-100'
                        style={{
                        backgroundColor : '#ffb6c1',
                        borderBottom: '3px solid red',
                        }}>{errors.email}</p>}

                        </div>
                        
                        
                        <div style={{position:'relative'}}>
                        <label htmlFor="" className='text-white fs-6 mt-3 d-block'>Password</label>
                        <input 
                        type="password" 
                        placeholder='Password' 
                        name='password'
                        onChange={handleChange}/>

                        <FaRegEyeSlash 
                            className='icon'
                            style={{
                                top: errors.password ? '41%' : '67%' 
                            }}
                        />

                        {errors.password && 
                        <p className='text-danger fw-normal py-1 px-2'
                        style={{
                        backgroundColor : '#ffb6c1',
                        borderBottom: '3px solid red',
                        }}>{errors.password}</p>}
                        </div>

                        <div className="switch m-0 p-0">
                            <input type="checkbox" name="" id="switch" />
                            <label htmlFor="switch"></label>
                            <span>Remember me</span>
                        </div>

                        <button type='submit'>Login</button>

                        <a className='d-block text-center text-light fw-medium text-decoration-underline'
                        style={{
                            cursor:'pointer'
                        }}>Forgot password</a>
                    </form>
                </div>

                <div className="hr"></div>

                <div className='last text-center my-1 mx-0'>
                    <span>Don't you have an account?</span>
                    <Link to="/signup" className='text-light text-decoration-underline' style={{ cursor: 'pointer' }}>
                    Sign up for Spotify
                    </Link>
                </div>
                </div>
        </section> 
    </div>
  );
}
