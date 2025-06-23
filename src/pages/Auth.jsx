import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { googleLoginApi, LoginApi, registerApi } from '../../services/allApi';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
function Auth() {
  const location = useLocation();
  const register = location.pathname === '/register';
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  console.log(userDetails);
  const handleRegister = async () => {
    console.log('inside the register function');
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('please fill the complete details')
    }
    else {
      const result = await registerApi({ username, email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Register Successfull')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 409) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went Wrong')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }
  const handleLogin = async () => {
    console.log('inside the login function');
    const { email, password } = userDetails;

    if (!email || !password) {
      toast.info('please fill the complete details');
    } else {
      const result = await LoginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success('Login Successfull')
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setTimeout(() => {
          if (result.data.existingUser.email == 'emotlyadmin@gmail.com') {
            navigate('/admin-dashboard')
          }
          else {
            navigate('/')
          }
        }, 2500)
      }
      else if (result.status == 401) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else if (result.status == 404) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went Wrong')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  };
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);
    const result = await googleLoginApi({ username: details.name, email: details.email, password: 'googlepswd', photo: details.picture })
    console.log(result);
    if (result.status == 200) {
      toast.success('Login Successfull')
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)

      setTimeout(() => {
        if (result.data.existingUser.email == 'emotlyadmin@gmail.com') {
          navigate('/admin-dashboard')
        }
        else {
          navigate('/')
        }
      }, 2500)
    }
    else{
      toast.error('Something went Wrong')
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1530893609608-32a9af3aa95c')",
        }}
      >
        <div className="bg-green-300 rounded-xl shadow-xl p-6 w-full max-w-md md:max-w-sm flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white border border-black flex justify-center items-center mb-4">
            <FontAwesomeIcon icon={faUser} className="text-black text-2xl" />
          </div>

          <h2 className="text-xl font-bold mb-6">
            {register ? 'Register' : 'Login'}
          </h2>

          {register && (
            <input
              type="text" value={userDetails.username}
              placeholder="Username"
              className="mb-4 w-full px-4 py-2 rounded bg-white" onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })}
            />
          )}

          <input
            type="email" value={userDetails.email}
            placeholder="Email"
            className="mb-4 w-full px-4 py-2 rounded bg-white" onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })}
          />

          <input
            type="password" value={userDetails.password}
            placeholder="Password"
            className="mb-4 w-full px-4 py-2 rounded bg-white" onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })}
          />

          <p className="text-xs text-black mb-2">
            Never share your password with anyone.
          </p>
          <button
            type='button'
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-100 transition mb-4"
            onClick={register ? handleRegister : handleLogin}
          >
            {register ? 'Register' : 'Login'}
          </button>


          {!register && (
            <>
              <p className="text-sm text-black mb-2">
                ---------------- or ----------------
              </p>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  toast.error('Login Failed');
                }}
              />
            </>
          )}

          <p className="text-sm text-black">
            {register ? (
              <>
                Already a user?{' '}
                <Link to="/login" className="text-blue-700 underline">
                  Login
                </Link>
              </>
            ) : (
              <>
                New user?{' '}
                <Link to="/register" className="text-blue-700 underline">
                  Register
                </Link>
              </>
            )}
          </p>
        </div>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </div>
    </>
  );
}

export default Auth;
