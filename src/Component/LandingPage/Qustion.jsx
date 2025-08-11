import { useState } from "react"

function Qustion() {
    const [activeIndex,setActiveIndex]=useState(null)
    const qustion=[
        {
            id:1,
            qustion:"What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!"
        },
         {
            id:2,
            qustion:"What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!"
        },
         {
            id:3,
            qustion:"What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!"
        },
        {
            id:1,
            qustion:"What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!"
        },
         {
            id:2,
            qustion:"What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!"
        },
         {
            id:3,
            qustion:"What is Netflix?",
            answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There s always something new to discover, and new TV shows and movies are added every week!"
        }
    ]
    const handleToggle=(index)=>{
        setActiveIndex((prevIndex)=>(prevIndex===index?null:index))
    }
  return (
    <div className="py-10 bg-black text-white">
{/* {heading} */}

        <div className="text-3xl sm:text-xl font-bold ">
    Frequently Asked Questions
        </div>
        {/* {qustion} */}

            {qustion.map((item,index)=>{
                const isActive=activeIndex===index
                return( 
                    <div  className=" flex flex-col justify-between  ">
                    
                <div className="bg-gray-800  text-white flex justify-between  mt-4 h-15 text-[23px]  cursor-pointer items-center transition-colors xl:h-[150px] xl:w-[1197px]"onClick={()=>handleToggle(index)} >
                    <div className="ml-5">
                        
                        {item.qustion} 

                        
                        </div>
              
                <div  className="text-5xl ">
                     <span >
                        {isActive?"✕":"+"}
                     </span>
                     
                     </div>
                 </div>

            <div className={` bg-gray-800 text-white  overflow-hidden ${activeIndex===index?"max-h-[500px]":"max-h-0 " }xl:h-[100px] xl:w-[1197px] break-normal `}>
                <hr className="h-px my-8 bg-black border-0 dark:bg-black"/>
               {  item.answer}
            </div>

            
</div>
                 )
            
})}
        





    </div>
  )
}

export default Qustion