import Link from "next/link"
import { FaArrowRight } from "react-icons/fa";

const footerData = {
  navigation: {
    title: "Navigation",
    links: [
      { name: "Products", href: "/products" },
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about-us" },
      { name: "Contact", href: "/contact-us" },
    ]
  },
  newsletter: {
    title: "Newsletter",
    text: "Join our newsletter",
    href: "#"
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
    ]
  },
  certifications: {
    title: "Certifications",
    items: [
      "UNI EN ISO 9001:2015",
      "UNI EN 1090:2009", 
      "UNI EN ISO 14001:2015"
    ],
    additional: "Environmental labeling of packaging"
  },
  social: {
    title: "Follow us on",
    platforms: ["Facebook", "Instagram", "Vimeo", "Pinterest", "Linkedin"]
  },
  legal: {
    studio: "Design Studio Zar Luxury",
    links: [
      "Privacy Policy",
      "Cookie Policy", 
      "Cookie preferences",
      "Whistleblowing",
      "Terms & Conditions"
    ],
    copyright: "Copyright © 2025 Spaceone. All rights reserved."
  }
}

export function Footer() {
  return (
    <footer className="bg-black text-footer-foreground text-white">
      <div className="mx-auto max-w-[1440px] px-8 pt-10 pb-8 lg:px-12 lg:pt-12">
        {/* Top section - 4 columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 - Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-base text-footer-muted mb-4">{footerData.navigation.title}</h3>
            <ul className="flex flex-col gap-1 leading-4">
              {footerData.navigation.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[17px] font-gramatika text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 2 - Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base text-footer-muted">{footerData.newsletter.title}</h3>
            <Link
              href={footerData.newsletter.href}
              className="inline-flex items-center gap-2 text-base text-footer-muted transition-colors hover:text-footer-foreground"
            >
              {footerData.newsletter.text}
              <FaArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Column 3 - Company Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base text-footer-muted">{footerData.company.name}</h3>
            <div className="flex flex-col gap-0.5 text-sm leading-5 text-footer-dim text-gray-400">
              {footerData.company.details.map((detail, index) => (
                <p key={index}>{detail}</p>
              ))}
            </div>
          </div>

          {/* Column 4 - Certifications */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base text-footer-muted">{footerData.certifications.title}</h3>
            <div className="flex flex-col gap-0.5 text-sm leading-5 text-footer-dim text-gray-400">
              {footerData.certifications.items.map((cert) => (
                <p key={cert} className="text-sm text-footer-dim">
                  {cert}
                </p>
              ))}
              <p className="mt-3 text-sm text-footer-dim">
                {footerData.certifications.additional}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-footer-border lg:my-12" />

        {/* Bottom section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Social Links */}
          <div className="flex flex-col gap-1">
            <p className="text-sm text-footer-dim">{footerData.social.title}</p>
            <div className="flex flex-wrap gap-x-1">
              {footerData.social.platforms.map((social, i) => (
                <span key={social} className="text-sm text-footer-muted">
                  <Link
                    href="#"
                    className="transition-colors hover:text-footer-foreground"
                  >
                    {social}
                  </Link>
                  {i < footerData.social.platforms.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start gap-1 lg:items-end">
            <p className="text-sm text-footer-muted">{footerData.legal.studio}</p>
            <div className="flex flex-wrap gap-x-1 lg:justify-end">
              {footerData.legal.links.map((link, i) => (
                <span key={link} className="text-sm text-footer-dim">
                  <Link
                    href="#"
                    className="transition-colors hover:text-footer-muted"
                  >
                    {link}
                  </Link>
                  {i < footerData.legal.links.length - 1 && ","}
                </span>
              ))}
              <span className="text-sm text-footer-dim">
                {footerData.legal.copyright}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
