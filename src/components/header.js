import React, { useRef, useState, useEffect } from "react";
import { PrismicLink } from "@prismicio/react";
import Link from "next/link";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


function Header({ altLangs, settings }) {
  const { data } = settings;

  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef();
  const linksRef = useRef([]);


  const toggleOpen = () => setMobileOpen((current) => !current);

  useEffect(() => {
    setMobileOpen(false);
  }, [router]);


  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileOpen]);


  const tl = useRef();


  useGSAP(() => {
    let links = menuRef.current.querySelectorAll(".link_col")
    tl.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        x: "0%",
        duration: 0.5,
        ease: "power3.inOut"
      })
      .from(links, {
        opacity: 0,
        y: "10px",
        stagger: 0.2,
        ease: "power3.out",
        duration: 0.5,
      });
  }, { scope: menuRef });


  useEffect(() => {
    if (mobileOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [mobileOpen]);

  const addToLinksRef = (el) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };


  return (
    <>
      <header className={`fixed left-0 top-0 z-50 w-full px-[16px] py-1 md:px-4 font-secondary ${router.pathname === "/" ? "bg-transparent" : "bg-white"}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="w-1/3">
            <Link href="/">
              <h1 className="font-secondary uppercase text-grey text-[26px] leading-none">Gambirasio Interni</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4 justify-center w-1/3 mix-blend-difference">
            {settings.data.header[0].link.map((item, i) => {
              return (
                <PrismicLink
                  key={item.key}
                  field={item}
                  className={` header_link ${router.pathname.includes(item.text.toLowerCase()) ? 'active_link' : ''} uppercase text-grey  font-secondary leading-none relative group`}
                >
                  {item.text}
                  {/* <div className={`header_linka bsolute left-0 bottom-[-2px] w-0 h-[1px] bg-grey transition-all duration-300 group-hover:w-full ${router.pathname.includes(item.text.toLowerCase()) ? 'active_link' : ''}`}></div> */}
                </PrismicLink>
              );
            })}
          </div>

          <div className="w-1/3">
            {altLangs[0]   ? (
              <div className='flex justify-end'>
              <LanguageSwitcher altLangs={altLangs} />
            </div>
            ): (null)}
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        ref={menuRef}
        className={
          " fixed translate-x-[-100vw] top-0 z-50 h-[100vh] w-[100vw] bg-green px-[15px] py-2  ease-in-out" 
        }
      >
        <div className="flex items-start justify-between">
        
          <div
            onClick={() => toggleOpen(!expanded)}
            className="menu_btn text-white"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="white" />
              <path
                d="M12.2573 23.5708L23.571 12.2571"
                stroke="#4A783C"
                strokeWidth="1.5"
              />
              <path
                d="M12.429 12.4287L23.7427 23.7424"
                stroke="#4A783C"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        <div className="mobile_menu_container mt-6 flex flex-col gap-1 text-white link_col">
          
        </div>
      </div>
    </>
  );
}

export default Header;
