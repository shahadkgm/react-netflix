import React from 'react'
import bgimg from '../assets/netflix.jpeg'
import '../index.css'
// import Navbar from '../Component/'
// import NewNav from './Component/newNav'

function LoginPage() {

  return (
    <>   
    <Navbar/>
<div className='text-white  z-0 '>
   <div  className=' bg-cover opacity-80 absolute inset-0 bg-center z-[-1] '  style={{ backgroundImage: `url(${bgimg})` }}>
  
    </div>

    <div className='flex flex-col items-center justify-center h-screen pt-20'>
      <div className='w-full  bg-black bg-opacity-30  rounded-xl shadow-md py-8 px-8 h-[750px] sm:w-[609px]'>
        <div className=''>
          <h2 className='text-[28px] font-bold text-white mb-8 ml-6'>SIGN UP</h2>
        <form action="" className='flex flex-col '>
    <input type="text" placeholder='Email or mobile number' name='email/mobile'className='border h-[89px] xl:w-[470px] ml-7 text-center ' />
    <input type="password" placeholder='Password'  className='border mt-5 h-[89px] xl:w-[470px] ml-7 text-center'/>
    <button className='bg-red-700 sm:h-[89px] xl:w-[470px]  ml-7 mt-5 rounded-xl'> Sign In</button>

    

        </form>
         <div className='flex flex-col'>
        <h4 className='text-white text-center mt-4'>OR</h4>
        
              <button className='bg-gray-500 sm:h-[80px] xl:w-[470px]  ml-7 mt-5 rounded-xl'>Use a Sign In Code</button>

<span className='text-white text-center mt-4 underline'>

              Forgot password?
</span>
<span className='ml-7 text-2xl'><input type="checkbox" /> Remember me</span>

  <span>New to Netflix ? Sign up now </span>
<div>
  This page is protected by Google reCAPCHA to ensure
</div>
  <span>your not bot</span>

      </div>
        </div>
       
      </div>
      
    </div>
    
<div>

</div>

{/* <NewNav className="" /> */}




       </div>


       






</>





  )
}

export default LoginPage