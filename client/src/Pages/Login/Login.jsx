import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

import toast from 'react-hot-toast';
import axios from 'axios';
const Login = () => {
  // const { signIn, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
 

  const handleLogin = async e => {
    e.preventDefault();
    // console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    // console.log(email, password);
    axios.post(`http://localhost:5000/login`, {  email, password })
    .then((response) => {
        const data = response?.data;
        // localStorage.setItem("userInfo" , JSON.stringify(data?.user))
        if (data?.message) {
            toast.success(data?.message);
            navigate(location.state? location.state : "/" ); 
        }
    })
    .catch((error) => {
        const errorMsg = error?.response?.data?.message || 'An error occurred.';
        toast.error(errorMsg);
    });
  }


  const handleGoogleSignIn = async() => {
   try{
    signInWithGoogle()
    .then(async result => {
      console.log(result.user)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,
      {
        email: result?.user?.email,
      },
      { withCredentials: true }
    )
     console.log(data)
      toast.success('log in successfully')
      navigate(location?.state ? location.state : '/');
    })
    .catch(error => {
      console.error(error)
    })
   }
    catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGithubSignIn = () => {
    signInWithGithub()
      .then(result => {
        console.log(result.user)
        toast.success('log in successfully')
        navigate(location?.state ? location.state : '/');
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (

    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      {/* <Helmet>
        <title>Akeneo | Login</title>
      </Helmet> */}
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Log in here!</h1>

        <p className="mt-4 text-gray-500">
          Dive into world of paints & craft
        </p>
      </div>

      <form onSubmit={handleLogin} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>

          <div className="form-control">
            <input
              type="email"
              name='email'
              required
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">Password</label>

          <div className="form-control">
            <input
              type="password"
              name='password'
              required
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />


          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <Link to="/register">
              <button className="underline" href="#">Register</button>
            </Link>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Log in
          </button>
        </div>
        {/* <p className='text-center font-bold text-xl'>Or log in with</p> */}


      </form>
      {/* <div className='flex gap-3 justify-center'>
        <button onClick={handleGoogleSignIn}><FaGoogle size={25}></FaGoogle></button>
      </div> */}
    </div>
  )
}

export default Login