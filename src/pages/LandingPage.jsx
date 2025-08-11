import Foot from "../Component/LandingPage/Footer"
import Nav from "../Component/LandingPage/Nav"
import Qustion from "../Component/LandingPage/Qustion"
import Reasons from "../Component/LandingPage/Reasons"
import Trends from "../Component/LandingPage/Trends"





const App=()=>{
  return(
  <div className="bg-black px-30  text-white">
    <div>
    <Nav/>

    </div>
    <div className="pt-10">

     <Trends />
    </div>
    
    <Reasons/>
    <Qustion/>
    <Foot/>
    
    
      </div>
  )
}

export default App