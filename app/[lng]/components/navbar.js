"use client";

import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "../../../i18n/client";
import Menu from "./menu";
import { useRef, useState, useEffect, Component } from "react";
import logoName from "../../../public/logoName";
import Image from "next/image";
import { languages } from "../../../i18n/settings";
import { signOut, useSession } from "next-auth/react";
import {
  IoPersonOutline,
  IoCardOutline,
  IoLogOutOutline,
  IoCallOutline,
  IoMailOutline,
  IoLogInOutline,
} from "react-icons/io5";

export default function Navbar({ lng }) {
  const { t } = useTranslation(lng, "navbar");
  const [menuActive, setMenuActive] = useState(false);
  const [langActive, setLangActive] = useState(false);
  const [profilActive, setProfilActive] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const refLang = useRef();
  const refProfil = useRef();
  const refNav = useRef();
  const { data: session, status } = useSession();
  const [scrollY, setScrollY] = useState(0);
  const [navItem, setNavItem] = useState(false);

  function logit() {
    setScrollY(window.pageYOffset);
  }

  const handleClickOutside = (e) => {
    if (
      (refLang.current && !refLang.current.contains(e.target)) ||
      (refProfil.current && !refProfil.current.contains(e.target)) ||
      (refNav.current && !refNav.current.contains(e.target))
    ) {
      setLangActive(false);
      setProfilActive(false);
      setNavActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", logit);
    };
  }, []);

  return (
    <div className="w-screen fixed top-0 flex flex-col z-30">
      <div
        className={`w-full h-[2rem] lg:px-8 px-2 flex items-center lg:space-x-8 justify-around lg:justify-end text-gray-600 bg-slate-50 bg-opacity-80 backdrop-blur-lg`}
      >
        <div
          className={`flex items-center lg:space-x-2 space-x-1 lg:w-auto w-2/3`}
        >
          <IoMailOutline
            color={"rgb(75 85 99)"}
            height="17px"
            width="17px"
          />
          <a
            href="mailto:contact@garageParrot.com"
            className="lg:text-sm text-[10px]"
          >
            contact@garageParrot.com
          </a>
        </div>
        <div className="h-1/2 w-[2px] rounded-full bg-gray-400"></div>
        <div className="flex items-center space-x-2 lg:w-auto w-1/2 justify-center lg:justify-normal">
          <IoCallOutline
            color={"rgb(75 85 99)"}
            height="17px"
            width="17px"
          />
          <a href="tel:+33951388815" className="lg:text-sm text-[10px]">
            +33 7 00 28 84 11
          </a>
        </div>
      </div>
      <nav
        onMouseLeave={() => setNavActive(false)}
        className={`h-20 flex lg:justify-between justify-end w-full items-center lg:px-[10%] px-8 bg_nav ${
          scrollY > 0 && "active text-black"
        }`}
      >
        <div className="flex flex-row items-center w-full h-full">
          <div className="lg:static lg:left-2 left-0 lg:justify-start justify-between w-full lg:w-auto flex items-center flex-row-reverse lg:flex-row z-10">
            <div className="lg:hidden">
              <FaBars
                style={{ fontSize: 30, color: "black" }}
                onClick={() => setMenuActive(true)}
                className="cursor-pointer transition ease-in-out hover:scale-110 lg:hidden"
              />
            </div>
            <Link href={`${lng}/`}>
              <Image
                src={logoName}
                className="w-28 lg:ml-0 cursor-pointer object-contain"
                alt="logo Parrot"
              />
            </Link>
          </div>
        <div>
        </div>
          {/* PROFILE */}
          <div className="hidden lg:inline relative z-20">
            {status === "authenticated" ? (
              <>
                <div className="ml-8 cursor-pointer">
                  <div
                    className="w-8 h-8"
                    onClick={() => setProfilActive(true)}
                  >
                  </div>
                </div>
                {profilActive && (
                  <div
                    ref={refProfil}
                    className="bg-white absolute top-[4rem] -right-10 w-[15rem] z-30 shadow-lg rounded-3xl border-[1px] border-gray-200 flex flex-col justify-center items-center"
                  >
                    <ul className="border-b-[1px] border-gray-200 p-6">
                      <li className="flex items-center cursor-pointer hover:scale-110 transition-all duration-75">
                        <Link
                          className="flex items-center"
                          href={`/${lng}/mon-compte`}
                          onClick={() => setProfilActive(false)}
                        >
                          <IoPersonOutline
                            color={"#00000"}
                            style={{fontSize: 20}}
                          />
                          <span className="ml-4">{t("menu.user")}</span>
                        </Link>
                      </li>
                      <li className="flex items-center my-4 cursor-pointer hover:scale-110 transition-all duration-75">
                        <Link
                          className="flex items-center"
                          href={`/${lng}/mon-compte?id=reservations`}
                          onClick={() => setProfilActive(false)}
                        >
                          <IoCardOutline
                            color={"#00000"}
                            height="20px"
                            width="20px"
                          />
                          <span className="ml-4">{t("menu.resa")}</span>
                        </Link>
                      </li>
                    </ul>
                    <ul className="p-6">
                      <li
                        className="flex items-center cursor-pointer hover:scale-110 transition-all duration-75"
                        onClick={() => signOut()}
                      >
                        <div className="flex items-center">
                          <IoLogOutOutline
                            color={"#00000"}
                            height="20px"
                            width="20px"
                          />
                          <span className="ml-4">{t("disconnect")}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link href={`/${lng}/authentification`}>
                <IoLogInOutline color={"black"} style={{fontSize: 30}} />
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Menu menuActive={menuActive} setMenuActive={setMenuActive} lng={lng} />
    </div>
  );
}
