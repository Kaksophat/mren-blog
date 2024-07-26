import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
const Fooster = () => {
  return (
    <Footer container className="border border-t-7  border-blue-300">
      <div className="w-full max-w-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-lg sm:text-xl dark:text-white font-semibold"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Sophat
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="mt-5">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noregerrer"
                >
                  100 JS Project
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noregerrer"
                >
                  Sophat Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="mt-5">
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Kaksophat"
                  target="_blank"
                  rel="noopener noregerrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">LinkIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="mt-4">
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#">Terms</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
          <div className="w-full sm:flex sm:justify-between sm:items-center">
            <Footer.Copyright
            href="#"
            by="sophat blog"
            year={new Date().getFullYear()}/>
         
          <div className="flex gap-3 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon icon={FaFacebookSquare}/>
            <Footer.Icon icon={FaGithub} href="https://github.com/Kaksophat"/>
            <Footer.Icon icon={FaInstagramSquare}/>
            <Footer.Icon icon={FaLinkedin}/>
          </div>
          </div>
      </div>
    </Footer>
  );
};

export default Fooster;
