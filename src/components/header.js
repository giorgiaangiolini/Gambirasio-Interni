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
        className={`fixed md:bg-transparent bg-white transition-all duration-300 left-0 z-[999] top-0 w-full px-1 md:py-1 pb-2 md:px-4 font-secondary h-5 flex items-center md:pt-1 pt-3`}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="lg:w-1/3 md:w-auto">
            <Link href="/">
              <h1 className="font-secondary uppercase text-blue md:text-[22px] text-[23px] leading-none tracking-wider">
                Gambirasio Interni
              </h1>
            </Link>
          </div>

          <div className="md:flex hidden items-center gap-4 justify-center lg:w-1/3 w-auto">
            {settings.data?.header[0]?.link?.map((item, i) => {
              return (
                <PrismicLink
                  key={item.key}
                  field={item}
                  className={`text-sm header_link tracking-[0.07em]  ${router.pathname.includes(item.text.toLowerCase()) ? "active_link" : ""} uppercase text-blue  font-secondary leading-none relative group`}
                >
                  {item.text}
                </PrismicLink>
              );
            })}
          </div>

          <div className="lg:w-1/3 w-auto lg:block hidden  tracking-[0.07em]">
            <div className="flex justify-end">
              {altLangs?.length > 1 && <LanguageSwitcher altLangs={altLangs} />}
            </div>
          </div>

          <div
            role="button"
            onClick={() => toggleOpen()}
            className="md:hidden flex items-center justify-center text-grey"
          >
            <button className="group">
              <div className="grid justify-items-center relative h-[10px] w-3">
                <span
                  className={`h-[1px] w-3 rounded-full bg-grey transition absolute left-0  ${mobileOpen ? "rotate-45 translate-y-[4.5px]" : "translate-y-0"}`}
                ></span>
                <span
                  className={`h-[1px] w-3 rounded-full bg-grey transition absolute left-0 ${mobileOpen ? "-rotate-45 translate-y-[4.5px]" : "translate-y-[9px]"}`}
                ></span>
              </div>
            </button>

            {/* <svg
              width="24"
              height="9"
              viewBox="0 0 24 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="8.5" x2="24" y2="8.5" stroke="#8993A0" />
              <line y1="0.5" x2="24" y2="0.5" stroke="#8993A0" />
            </svg> */}
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
        <div className="justify-center text-center text-[23px] h-full font-secondary flex flex-col items-center gap-4 text-grey">
          <ul className="gap-1 flex flex-col">
            {settings.data?.header[0]?.link?.map((item, i) => {
              return (
                <li key={i}>
                  <PrismicLink className="link_col opacity-100" field={item}>
                    {item.text}
                  </PrismicLink>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center link_col">
            {altLangs?.length > 1 && <LanguageSwitcher altLangs={altLangs} />}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <ul className="flex flex-col gap-1 text-center text-[23px] pb-4 text-grey font-secondary">
            {data?.lista_link?.map((item, i) => {
              return (
                <li key={i}>
                  <PrismicLink
                    field={item.link}
                    className="opacity-100 text-[18px] leading-none transition-all duration-300"
                  >
                    {item.link.text}
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
