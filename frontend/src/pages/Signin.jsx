import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Signin = () => {
  const [formdata,setformdata] = useState([])
  const [errormessage,seterrormessage] = useState("")
  const [loading,setloading] = useState(false)
   const handdlechange =(e)=>{
     setformdata({...formdata,[e.target.id]: e.target.value.trim()})
   }
   const handdlesubmit = async(e)=>{
     e.preventDefault()
     if(!formdata.email || !formdata.password){
          return seterrormessage("all fiil require")
     }
     try {
       setloading(true)
       seterrormessage(null)
       const respones = await fetch('/api/auth/signin',{
         method:'POST',
         headers:{
           "Content-Type":"application/json"
         },
         body: JSON.stringify(formdata)
       })
       const data = respones.json()
 
       if(data.success === false){
         return seterrormessage("error emaile or password incorrect")
       }
       setloading(false)
 
       
     } catch (error) {
       seterrormessage(error.errormessage)
       setloading(false)
     }
   }
   return (
     <div className="min-h-screen mt-20">
       <div className="flex p-3 max-w-3xl mx-auto flex-col lg:flex-row md:items-center gap-5">
         {/* left */}
         <div className="flex-1">
           <Link to={"/"} className="  text-4xl dark:text-white font-bold">
             <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
               Sophat
             </span>
             Blog
           </Link>
           <p className="text-sm mt-5">
             you can signup with email and passwors or google account
           </p>
         </div>
         {/* right */}
         <div className="flex-1">
           <form className="flex flex-col gap-4" onSubmit={handdlesubmit}>
            
             <div>
               <Label value="email" />
               <TextInput type="email" placeholder="enter email" id="email" 
               onChange={handdlechange}/>
             </div>
             <div>
               <Label value="password" />
               <TextInput
                 type="password"
                 placeholder="enter password"
                 id="password"
                 onChange={handdlechange}
                 
               />
             </div>
             <Button gradientDuoTone={"purpleToPink"} type="submit" disabled={loading}>
             {loading? 
             <>
             <Spinner size="sm"/>
             <span className="pl-3">loading....</span>
             </>: 'Sign in'
             }
             </Button>
           </form>
           <div className="flex gap-2 mt-5 text-sm">
             <span> dont`t Have an account?</span>
             <Link to={"/signup"} className="text-blue-500">Signup</Link>
           </div>
           {errormessage &&(
             <Alert className="mt-5" color="failure">{errormessage}</Alert>
           )}
         </div>
       </div>
     </div>
   );
}

export default Signin