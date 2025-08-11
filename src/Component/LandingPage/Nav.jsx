

import { Navigate, useNavigate } from 'react-router-dom'
import bgimg from '../../assets/netflix.jpeg'

const Nav=()=>{
    const navigate=useNavigate()
    const SignInForm=(e)=>{

//   e.preventdefault()
  navigate('/login')
    }
    return(
        <>
<div  className="p-5 bg-black text-white z-0 "  >   
  <div  className=' bg-cover opacity-25 absolute inset-0 bg-center '  style={{ backgroundImage: `url(${bgimg})` }}>

  </div>


       
         <div className='relative z-0'>
            <div className="flex justify-between items-center ">
             
            <div className="text-4xl text-red-800 font-bold  ">
                NETFLEX
            </div>
            <div >
                {/* <div className=" flex "> */}
                    <select   className="pr-10   mr-3 border  border-gray-500 " name="" id="">
                        <option className="text-black " value="English">English</option>
                        <option className="text-black" value="Arabic">Arabic</option>

                    </select>
                {/* </div> */}
                
                <button className="bg-red-600 px-5 py-1 rounded"  onClick={(e)=>SignInForm(e)}> SIGN IN</button>

                
            </div>
           </div>
       
           <div className="py-30 flex flex-col items-center">
            
            <div className="text-5xl font-bold w-180 text-center">
                Unlimited movies, TV shows and more
            </div>
            <div className="text-2xl p-5">Starts at ₹149. Cancel at any time.</div>
            <p  className="text-center text-2xl">Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="pt-4">
                <input type="text" placeholder="Email address" className="border border-gray-400 size-16 w-60 text-center mr-3" />
                <button className=" text-white bg-red-600 size-18 w-60 rounded text-2xl">Get Started &gt;  </button>
            </div>
           </div>
         </div>
        </div>
        </>
    )
}

export default Nav