"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import React from 'react'
import { Footer } from '../ui/Footer'

const aboutData = {
  hero: {
    title: "About SpaceOne",
    subtitle: "Crafting Excellence in Surface Design"
  },
  content: {
    mission: {
      title: "Our Mission",
      description: "At SpaceOne, our mission is to be a leading force in premium veneer surfacing, creating high-end solutions that seamlessly blend masterful craftsmanship with cutting-edge materials. We are driven by a deep respect for design, detail, and durability, working closely with architects and designers to transform their most ambitious ideas into refined, enduring surfaces. Every SpaceOne creation is guided by precision, innovation, and an uncompromising commitment to quality, elevating interiors into meaningful, expressive spaces."
    },
    vision: {
      title: "Our Vision",
      description: "Our vision is to be globally recognised as the definitive authority in luxury architectural surfaces. We aspire to shape spaces that go beyond aesthetics, spaces that evoke emotion, inspire creativity, and leave a lasting impression. By continuously pushing the boundaries of material innovation and design excellence, SpaceOne aims to set new benchmarks for how surfaces define and elevate modern architecture across the world."
    },
    values: {
      title: "Our Values",
      items: [
        {
          title: "Innovation",
          description: "Continuously pushing the boundaries of surface technology and design"
        },
        {
          title: "Quality",
          description: "Uncompromising commitment to excellence in every product we create"
        },
        {
          title: "Sustainability",
          description: "Environmentally responsible manufacturing processes and materials"
        },
        {
          title: "Customer Focus",
          description: "Building lasting relationships through exceptional service and support"
        }
      ]
    },
    whyChooseUs: {
      title: "Why Choose Us",
      items: [
        {
          title: "WIDE RANGE",
          description: "Our veneer collection boasts an extensive variety of colours, designs, species, and sizes, including both standard 8×4 and spacious 10×4 dimensions, giving you an abundant choice and design freedom."
        },
        {
          title: "Unparalleled Quality & Durability",
          description: "We use premium paper veneers paired with superior backing materials, ensuring high visual impact and long-lasting performance."
        },
        {
          title: "Cutting-Edge Design",
          description: "Choose from contemporary patterns to timeless classics, designed to suit diverse aesthetic preferences and elevate interiors."
        },
        {
          title: "Tailored Customization",
          description: "From marquetry to ombré finishes and digital printing, we offer flexible customisation to meet your exact design requirements."
        },
        {
          title: "Expert Craftsmanship",
          description: "Every sheet is hand-finished by skilled artisans, reflecting exceptional detail and precision in every layer."
        },
        {
          title: "Exceptional Customer Support",
          description: "Experience seamless service from consultation to delivery, with a dedicated team to assist you throughout."
        }
      ]
    }
  }
}

const AboutUs = () => {

  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(()=>{
    // Reset animations when component mounts
    gsap.set(titleRef.current, { y: -100, opacity: 0 })
    gsap.set(subtitleRef.current, { y: 100, opacity: 0 })

    // Animate in
    gsap.to(titleRef.current,{
      y:0,
      opacity:1,
      duration:1.5,
      ease:"power2.out"
    })
    
    gsap.to(subtitleRef.current,{
      y:0,
      opacity:1,
      duration:1.5,
      ease:"power2.out",
      delay:0.3
    })


  }, [])


  return (
    <>
      {/* Hero Section - Full Height and Width */}
      <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        
        {/* Hero Content */}
        <div className="text-center text-white px-6">
          <h1 ref={titleRef} className=" text-5xl md:text-7xl font-gramatika font-light mb-4 tracking-wide">
            {aboutData.hero.title}
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl font-light tracking-wider">
            {aboutData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Mission Section */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-gramatika font-light text-gray-900 mb-8">
              {aboutData.content.mission.title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {aboutData.content.mission.description}
            </p>
          </div>

          {/* Vision Section */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-gramatika font-light text-gray-900 mb-8">
              {aboutData.content.vision.title}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {aboutData.content.vision.description}
            </p>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <h2 className="text-4xl font-gramatika font-light text-gray-900 mb-12 text-center">
              {aboutData.content.values.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aboutData.content.values.items.map((value, index) => (
                <div key={index} className="text-center p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-gramatika font-medium text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-gramatika font-light text-gray-900 mb-12 text-center">
              {aboutData.content.whyChooseUs.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aboutData.content.whyChooseUs.items.map((item, index) => (
                <div key={index} className="p-8 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="text-xl font-gramatika font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Content */}
          <div className="text-center py-12 border-t border-gray-200">
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              With years of expertise in surface design and manufacturing, SpaceOne has established itself as a trusted partner for architects, designers, and developers who demand excellence. Our state-of-the-art facilities and dedicated team ensure that every product meets the highest standards of quality and aesthetics.
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-sm text-gray-600">Global Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutUs