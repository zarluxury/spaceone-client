import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const footerData = {
  navigation: {
    title: "Navigation",
    links: [
      { name: "Products", href: "/products" },
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about-us" },
      { name: "Contact", href: "/contact-us" },
    ],
  },

  company: {
    name: "SpaceOne",
    details: [
      "120/A, Bombay Talkies compound,",
      "Dadiseth Lane,",
      "Off S.V. Road,",
      "Opp. Malad Sahakari Bank,",
      "Malad West,",
      "Mumbai 400064. India",
    ],
  },

  contact: {
    title: "Get in Touch",
    phone: "+91 98765 43210",
    email: "info@spaceone.com",
    link: "/contact-us",
  },

  map: {
    title: "Our Location",
    url: "https://share.google/DspzpHZZvfdNYS2ZD",
  },

  social: {
    title: "Follow us on",
    platforms: ["Facebook", "Instagram", "Vimeo", "Pinterest", "Linkedin"],
  },

  legal: {
    studio: "Design Studio Zar Luxury",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Cookie preferences", href: "/cookie-preferences" },
      { name: "Terms & Conditions", href: "/terms-conditions" },
    ],
    copyright: "Copyright 2026 Spaceone. All rights reserved.",
  },
};

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1440px] px-8 pt-10 pb-8 lg:px-12 lg:pt-12">
        
        {/* Top section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1 - Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-base text-white">
              {footerData.navigation.title}
            </h3>
            <ul className="flex flex-col ">
              {footerData.navigation.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[16px] text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2 - Contact */}
          <div className="mb-6">
            <h3 className="text-base text-white">
              {footerData.contact.title}
            </h3>
            <div className="flex flex-col gap-0 mt-4">

            <Link href={`tel:${footerData.contact.phone}`}>
              <p className="text-sm text-gray-400">
                {footerData.contact.phone}
              </p>
            </Link>

            <Link href={`mailto:${footerData.contact.email}`}>
              <p className="text-sm text-gray-400">
                {footerData.contact.email}
              </p>
            </Link>

            <Link
              href={footerData.contact.link}
              className="mt-2 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
            >
              Contact Us
              <FaArrowRight className="h-3 w-3" />
            </Link>
            </div>
          </div>

          {/* Column 3 - Company Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base text-white">
              {footerData.company.name}
            </h3>

            <div className="flex flex-col text-sm text-gray-400 leading-5">
              {footerData.company.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </div>

          {/* Column 4 - Google Map */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base text-white">
              {footerData.map.title}
            </h3>

            <Link
              href={footerData.map.url}
              target="_blank"
              className="text-sm text-gray-400 hover:text-white"
            >
              View on Google Maps →
            </Link>

            {/* Optional Embed */}
            <div className="mt-2 h-40 w-full overflow-hidden rounded-lg">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2978047482798!2d72.84209447596719!3d19.182190848628743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6e357662225%3A0x4cfc166880ef4370!2sSpaceone%20Surfaces!5e0!3m2!1sen!2sin!4v1774851724255!5m2!1sen!2sin" width="400" height="200" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gray-800 lg:my-12" />

        {/* Bottom section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          
          {/* Social */}
          <div>
            <p className="text-sm text-gray-500">
              {footerData.social.title}
            </p>

            <div className="flex flex-wrap gap-x-2">
              {footerData.social.platforms.map((social, i) => (
                <span key={social} className="text-sm text-gray-400">
                  <Link href="#" className="hover:text-white">
                    {social}
                  </Link>
                  {i < footerData.social.platforms.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start lg:items-end">
            <p className="text-sm text-gray-400">
              {footerData.legal.studio}
            </p>

            <div className="flex flex-wrap gap-x-2 lg:justify-end">
              {footerData.legal.links.map((link, i) => (
                <span key={link.name} className="text-sm text-gray-500">
                  <Link href={link.href} className="hover:text-gray-400">
                    {link.name}
                  </Link>
                  {i < footerData.legal.links.length - 1 && ","}
                </span>
              ))}

              <span className="text-sm text-gray-500">
                {footerData.legal.copyright}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}