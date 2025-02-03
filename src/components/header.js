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
      <header className="absolute top-0 z-50 w-full px-[16px] py-2 md:px-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex lg:w-fit w-full items-center justify-between gap-2">
            <Link className="w-[180px] md:w-auto" href="/">
             logo
            </Link>

            <div
              onClick={() => toggleOpen(!expanded)}
              className={
                (mobileOpen
                  ? "menu_btn open text-white "
                  : "menu_btn text-black") + "flex font-medium lg:hidden"
              }
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="18" fill="white" />
                <path d="M10 14H26" stroke="#4A783C" strokeWidth="1.5" />
                <path d="M10 18H26" stroke="#4A783C" strokeWidth="1.5" />
                <path d="M10 22H26" stroke="#4A783C" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* desktop linklist */}
          <div className="hidden rounded-[50px] bg-white px-2 py-1 lg:flex md:gap-2 lg:gap-2 gap-1 ">
              
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
