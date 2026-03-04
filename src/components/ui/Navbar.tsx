"use client"
import { useState } from 'react'
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx"
import { CiSearch } from "react-icons/ci"
import { FiUser } from "react-icons/fi"
import Image from 'next/image'
import logo from '../../../public/data/logo.png'
import { CiUser } from "react-icons/ci"
import Link from 'next/link'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false) // New state for search modal

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="h-14 shadow-2xs bg-white backdrop-blur-md border-b-2 border-neutral-200 grid grid-cols-3 items-center px-6 text-black">
        
        {/* Left: Navigation Links & Hamburger */}
        <div className="flex items-center">
          <ul className="flex items-center gap-6 text-[15px] font-gramatika font-[100] -tracking-tighter">
            <li className="cursor-pointer hover:opacity-70 transition-opacity" onClick={toggleMenu}>
              {isMenuOpen ? <RxCross2 className="text-2xl" /> : <RxHamburgerMenu className="text-2xl" />}
            </li>
            <Link href="/products">
              <li className="hidden md:block cursor-pointer hover:underline underline-offset-4">Products</li>
            </Link>
            <Link href="/archivements">
              <li className="hidden md:block cursor-pointer hover:underline underline-offset-4">Archivements</li>
            </Link>
            <Link href="/downloads">
              <li className="hidden md:block cursor-pointer hover:underline underline-offset-4">Downloads</li>
            </Link>
            
          </ul>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center items-center">
          <Link href="/" onClick={closeMenu}>
            <Image src={logo} alt="logo" width={80} height={40} className="object-contain" />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex justify-end items-center">
          <ul className="flex items-center gap-5">
            <li 
              onClick={() => setIsSearchOpen(true)} // Open search modal
              className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <CiSearch className="text-2xl" />
            </li>
            <li
              onClick={() => setIsLoginOpen(true)}
              className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <CiUser className="text-2xl" />
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed top-0 left-0 right-0 z-[100] bg-white text-black transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}
      `}>
        {/* Top Bar */}
        <div className="h-14 grid grid-cols-3 items-center px-6">
          {/* Close Button */}
          <div className="flex items-center">
            <button
              onClick={closeMenu}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <RxCross2 className="text-2xl" />
            </button>
          </div>

          {/* Center Logo */}
          <div className="flex justify-center items-center">
            <Link href="/" onClick={closeMenu}>
              <Image src={logo} alt="logo" width={80} height={40} className="object-contain" />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex justify-end items-center gap-5">
            <button
              onClick={() => {
                setIsSearchOpen(true)
                closeMenu()
              }}
              className="cursor-pointer p-2 hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <CiSearch className="text-2xl" />
            </button>
            <button
              onClick={() => {
                setIsLoginOpen(true)
                closeMenu()
              }}
              className="cursor-pointer p-2 hover:opacity-70 transition-opacity"
              aria-label="User account"
            >
              <CiUser className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 " />

        {/* Content Area */}
        <div className="flex overflow-hidden font-[100]  font-gramatika -tracking-tighter">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-between px-6 py-8 md:px-10 md:py-5 text-[15px]">
            {/* Navigation Links */}
            <div>
              <div className="flex gap-16 md:gap-24">
                {/* Column 1 */}
                <nav className="flex flex-col gap-1">
                  <Link
                    href="/products"
                    onClick={closeMenu}
                    className="text-sm md:text-base font-medium hover:opacity-60 transition-opacity"
                  >
                    Products
                  </Link>
                  <Link
                    href="/archivements"
                    onClick={closeMenu}
                    className="text-sm md:text-base font-medium hover:opacity-60 transition-opacity"
                  >
                    Archivements
                  </Link>
                 

                </nav>

                {/* Column 2 */}
                <nav className="flex flex-col gap-1">
                  <Link
                    href="/about-us"
                    onClick={closeMenu}
                    className="text-sm md:text-base font-medium hover:opacity-60 transition-opacity"
                  >
                    AboutUs
                  </Link>
                  <Link
                    href="/team"
                    onClick={closeMenu}
                    className="text-sm md:text-base font-medium hover:opacity-60 transition-opacity"
                  >
                    OurTeam
                  </Link>
                  
                  <Link
                    href="/designer"
                    onClick={closeMenu}
                    className="text-sm md:text-base font-medium hover:opacity-60 transition-opacity"
                  >
                    Designer
                  </Link>
                </nav>
              </div>

            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
              {/* Footer Links */}
              <div className="flex items-center gap-4 text-xs md:text-sm text-black">
                <Link
                  href="/downloads"
                  onClick={closeMenu}
                  className="hover:opacity-60 transition-opacity"
                >
                  Downloads
                </Link>
                
                <Link
                  href="/contact-us"
                  onClick={closeMenu}
                  className="hover:opacity-60 transition-opacity"
                >
                  ContactUs
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-xs" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xs" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-xs" />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="Pinterest"
                >
                  <FaPinterestP className="text-xs" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-xs" />
                </a>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-1 text-xs md:text-sm text-neutral-500">
                <span>Language:</span>
                <button className="text-black hover:opacity-60 transition-opacity cursor-pointer">
                  EN
                </button>
                <span>,</span>
                <button className="hover:opacity-60 transition-opacity cursor-pointer">
                  IT
                </button>
              </div>
            </div>
          </div>

          {/* Right Featured Image - hidden on mobile */}
          <div className="hidden lg:flex flex-col items-start w-[380px] xl:w-[400px] px-6 py-8 md:py-10">
            <Link
              href="/metal-affinities"
              onClick={closeMenu}
              className="text-sm text-red-600 hover:opacity-70 transition-opacity mb-2"
            >
              Metal Affinities
            </Link>
            <div className="relative w-full aspect-[7/3] overflow-hidden">
              <Image
                src="/data/metal-affinities.jpg"
                alt="Metal Affinities - Modern interior with abstract artwork and elegant furniture"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <div
        className={`
          fixed inset-0 z-[200] flex items-center justify-center
          bg-black/60 backdrop-blur-md
          transition-all duration-300
          ${isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsSearchOpen(false)}
      >
        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white w-[500px] max-w-[92%]
            px-8 py-8
            shadow-2xl
            transition-all duration-300
            ${isSearchOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-gramatika font-[100]">Search</h3>
            <button onClick={() => setIsSearchOpen(false)}>
              <RxCross2 className="text-xl hover:opacity-60" />
            </button>
          </div>

          {/* Search Form */}
          <form className="flex flex-col gap-5" onSubmit={(e) => {
            e.preventDefault()
            // Handle search logic here
            console.log('Searching for:', e.target.search.value)
            setIsSearchOpen(false)
          }}>
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="What are you looking for?"
                className="w-full border-b border-neutral-400 focus:outline-none py-3 text-base pr-10"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <CiSearch className="text-2xl hover:opacity-60 transition-opacity" />
              </button>
            </div>

            {/* Optional: Quick Links or Categories */}
            <div className="mt-4">
              <p className="text-xs text-neutral-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  type="button"
                  onClick={() => {
                    console.log('Searching for: Products')
                    setIsSearchOpen(false)
                  }}
                  className="text-xs px-3 py-1 border border-neutral-300 rounded-full hover:bg-neutral-100 transition"
                >
                  Products
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    console.log('Searching for: Downloads')
                    setIsSearchOpen(false)
                  }}
                  className="text-xs px-3 py-1 border border-neutral-300 rounded-full hover:bg-neutral-100 transition"
                >
                  Downloads
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    console.log('Searching for: Metal Affinities')
                    setIsSearchOpen(false)
                  }}
                  className="text-xs px-3 py-1 border border-neutral-300 rounded-full hover:bg-neutral-100 transition"
                >
                  Metal Affinities
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    console.log('Searching for: Designers')
                    setIsSearchOpen(false)
                  }}
                  className="text-xs px-3 py-1 border border-neutral-300 rounded-full hover:bg-neutral-100 transition"
                >
                  Designers
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Login Modal */}
      <div
        className={`
          fixed inset-0 z-[200] flex items-center justify-center
          bg-black/60 backdrop-blur-md
          transition-all duration-300
          ${isLoginOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsLoginOpen(false)}
      >
        {/* Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white w-[420px] max-w-[92%]
            px-10 py-8
            shadow-2xl
            transition-all duration-300
            ${isLoginOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-gramatika font-[100]">Reserved area</h3>
            <button onClick={() => setIsLoginOpen(false)}>
              <RxCross2 className="text-xl hover:opacity-60" />
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              className="border-b border-neutral-400 focus:outline-none py-2 text-sm"
            />

            <input
              type="password"
              placeholder="Password"
              className="border-b border-neutral-400 focus:outline-none py-2 text-sm"
            />

            <p className="text-xs text-neutral-400 cursor-pointer hover:underline">
              Have you lost your password?
            </p>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="flex-1 border border-black rounded-full py-2 text-sm hover:bg-black hover:text-white transition"
              >
                LOG IN
              </button>

              <Link
                href="/register"
                className="flex-1 border border-black rounded-full py-2 text-sm text-center hover:bg-black hover:text-white transition"
                onClick={() => setIsLoginOpen(false)}
              >
                REGISTER →
              </Link>
            </div>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar