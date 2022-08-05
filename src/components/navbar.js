import React from "react";
import logo from "../assets/logo-datasintesa.png"
import { Link } from "react-router-dom";

export default function Navbar({ fixed }) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="fixed top-0 py-4 left-0 right-0 bg-white mb-3">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">

                        <img src={logo} alt="logo" className="w-44 h-12" />
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none ml-8">
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-s leading-snug text-slate-600 hover:opacity-75"
                                    to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-s leading-snug text-slate-600 hover:opacity-75"
                                    to="/form">Upload</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="px-3 py-2 flex items-center text-s leading-snug text-slate-600 hover:opacity-75"
                                    to="/about">About Us</Link>
                            </li>
                        </ul>
                        <button className="bg-transparent hover:bg-blue-500 text-sky-500 hover:text-black py-2 px-4 border-2 border-sky-500 hover:border-transparent rounded-full absolute right-20">
                            <Link to="/contact">Contact</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}