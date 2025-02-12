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

  useGSAP(
    () => {
      let links = menuRef.current.querySelectorAll(".link_col");
      tl.current = gsap
        .timeline({ paused: true })
        .to(menuRef.current, {
          x: "0%",
          duration: 0.5,
          ease: "power3.inOut",
        })
        .from(links, {
          opacity: 0,
          y: "10px",
          stagger: 0.08,
          ease: "power3.out",
          duration: 0.5,
        });
    },
    { scope: menuRef }
  );

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
      <header
        className={`fixed md:hover:bg-white transition-all duration-300 left-0 z-[999] top-0 w-full px-1 py-1 md:px-4 font-secondary ${router.pathname === "/" ? "bg-transparent" : "bg-white "} ${expanded ? "!bg-white" : ""}`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="md:w-1/3">
            <Link href="/">
              <h1 className="font-secondary uppercase text-grey md:text-[26px] text-[24px]leading-none">
                Gambirasio Interni
              </h1>
            </Link>
          </div>

          <div className="md:flex hidden items-center gap-4 justify-center w-1/3">
            {settings.data.header[0].link.map((item, i) => {
              return (
                <PrismicLink
                  key={item.key}
                  field={item}
                  className={` header_link tracking-[1px]  ${router.pathname.includes(item.text.toLowerCase()) ? "active_link" : ""} uppercase text-grey  font-secondary leading-none relative group`}
                >
                  {item.text}
                  {/* <div className={`header_linka bsolute left-0 bottom-[-2px] w-0 h-[1px] bg-grey transition-all duration-300 group-hover:w-full ${router.pathname.includes(item.text.toLowerCase()) ? 'active_link' : ''}`}></div> */}
                </PrismicLink>
              );
            })}
          </div>

          <div className="w-1/3 md:block hidden">
            {altLangs[0] ? (
              <div className="flex justify-end">
                <LanguageSwitcher altLangs={altLangs} />
              </div>
            ) : null}
          </div>

          <div
            role="button"
            onClick={() => toggleOpen(!expanded)}
            className="md:hidden block text-grey"
          >
            <svg
              width="24"
              height="9"
              viewBox="0 0 24 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="8.5" x2="24" y2="8.5" stroke="#8993A0" />
              <line y1="0.5" x2="24" y2="0.5" stroke="#8993A0" />
            </svg>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        ref={menuRef}
        className={
          " fixed z-[998] translate-x-[-100vw] top-0 h-[100vh] w-[100vw] bg-white px-[15px] py-2  ease-in-out text-black"
        }
      >
        <div className="justify-center text-center text-[30px] h-full font-secondary flex flex-col items-center gap-1 text-grey">
          <ul className="gap-4">
            {settings.data.header[0].link.map((item) => {
              return (
                <li>
                  <PrismicLink
                    className="link_col opacity-100"
                    field={item}
                  >
                    {item.text}
                  </PrismicLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
