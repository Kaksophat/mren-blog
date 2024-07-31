import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon ,FaSun} from "react-icons/fa";
import { useSelector } from "react-redux";
import { signOutsuccess} from "../redux/user/userslice"
import { useDispatch } from "react-redux";
import { toggletheme} from "../redux/theme/themeslice"
const Header = () => {
  const dispatch = useDispatch()
  const {theme} = useSelector((state)=>state.theme)
  console.log(dispatch(toggletheme()));
  const { Currentuser} = useSelector((state)=>state.user)

  const handlesignout = async()=>{
    try {
        const respone = await fetch("/api/user/signout",{
          method:"POST",
        })
        const data = await respone.json()
        if(!respone.ok){
          console.log(data.message);
        }else{
           dispatch(signOutsuccess())
        }
    } catch (error) {
      console.log(error);
    }
  }
  // const path = useLocation().pathname
  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-sm sm:text-xl dark:text-white font-semibold"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Sophat
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10  sm:inline" color="gray" pill onClick={()=> dispatch(toggletheme())}>
            {theme ==="light"? <FaSun/>:  <FaMoon />}
          
          </Button>
          {Currentuser ? (
            <Dropdown 
            arrowIcon={false}
            inline
            label={
              <Avatar
               alt="user"
               img={Currentuser.profilepic}
               rounded/>
               
            }>
              <Dropdown.Header>
                <span className="block text-sm">@{Currentuser.username}</span>
                <span className="block text-sm font-medium truncate">{Currentuser.email}</span>
              </Dropdown.Header>
              <Link to={"/dashboard?tab==profile"}>
                 <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider/>
              <Dropdown.Item onClick={handlesignout}>Sign out</Dropdown.Item>
            </Dropdown>
          )
          :(
            <Link to={"/signup"}>
            <Button gradientDuoTone={"purpleToBlue"} outline>Signup</Button>
          </Link>
          )}
      
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link as={'div'}>
            <Link to={"/"}>Home</Link>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <Link to={"/about"}>About</Link>
          </Navbar.Link>
          <Navbar.Link as={'div'}>
            <Link to={"/project"}>Project</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
