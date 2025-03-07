import React, { useRef, useState, useEffect } from "react";
import { PrismicLink } from "@prismicio/react";
import Link from "next/link";
import { LanguageSwitcher } from "./ui/LanguageSwitcher";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import BrevoForm from "./BrevoForm";

function Header({ altLangs, settings }) {
  const { data } = settings;

  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

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
        className={`fixed bg-transparent transition-all duration-300 left-0 z-[999] top-0 w-full px-1 py-1 md:px-5 font-secondary h-5 flex items-center `}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="lg:w-1/3 md:w-auto">
            <Link href="/">
              <h1 className="font-secondary uppercase text-blue md:text-[22px] text-[25px] leading-none">
                Gambirasio Interni
              </h1>
            </Link>
          </div>

          <div className="md:flex hidden items-center gap-4 justify-center lg:w-1/3 w-auto">
            {settings.data.header[0].link.map((item, i) => {
              return (
                <PrismicLink
                  key={item.key}
                  field={item}
                  className={` header_link tracking-[0.07em]  ${router.pathname.includes(item.text.toLowerCase()) ? "active_link" : ""} uppercase text-blue  font-secondary leading-none relative group`}
                >
                  {item.text}
                  {/* <div className={`header_linka bsolute left-0 bottom-[-2px] w-0 h-[1px] bg-grey transition-all duration-300 group-hover:w-full ${router.pathname.includes(item.text.toLowerCase()) ? 'active_link' : ''}`}></div> */}
                </PrismicLink>
              );
            })}
          </div>

          <div className="lg:w-1/3 w-auto lg:block hidden  tracking-[0.07em]">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={settings.data.link_codice_form}
              className="flex justify-end cursor-pointer hover_opacity transition-all duration-300"
            >
              {settings.data.bottone_contatti}
            </Link>

            {altLangs[0] ? (
              <div className="flex justify-end">
                <LanguageSwitcher altLangs={altLangs} />
              </div>
            ) : null}
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
        <div className="justify-center text-center text-[30px] h-full font-secondary flex flex-col items-center gap-1 text-grey">
          <ul className="gap-4">
            {settings.data.header[0].link.map((item) => {
              return (
                <li>
                  <PrismicLink className="link_col opacity-100" field={item}>
                    {item.text}
                  </PrismicLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[999] bg-white/70 transition-opacity duration-300 ease-in-out p-2 flex items-center justify-center  ${
          modalOpen ? "opacity-100 visible" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-[90vh] max-w-full w-[700px] bg-white flex items-center justify-center border border-grey relative overflow-scroll">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-1 right-1 p-1"
          >
            <div className="grid justify-items-center relative h-[10px] w-2 hover:opacity-50 transition-all duration-300">
              <span className="h-[1px] w-2 rounded-full bg-grey transition absolute left-0 rotate-45 translate-y-[4.5px]"></span>
              <span className="h-[1px] w-2 rounded-full bg-grey transition absolute left-0 -rotate-45 translate-y-[4.5px]"></span>
            </div>
          </button>
          <div className="text-center">
            <div className="text-grey text-base">
              {/* <BrevoForm data={settings.data} /> */}
              <iframe
                width="640"
                height="705"
                src={settings.data.link_codice_form}
                frameborder="0"
                scrolling="auto"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
