"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../ui/Footer';

interface MemberProps {
  name: string;
  role: string;
  desc: string;
  img: string;
}

const Team: React.FC = () => {
  const managingDirectors: MemberProps[] = [
    { 
      name: "Mr. Rajesh Chheda", 
      role: "CFO | Finance Director", 
      desc: "The second generation entrepreneur with his knack for numbers has been instrumental in building the robust base of the empire with his sharp vision and financial strategies scaling the brand manifold in 20 years.", 
      img: "/images/team/director-2.jpg" 
    },
    { 
      name: "Mr. Manan Chheda", 
      role: "Executive Director", 
      desc: "The third generation entrepreneur driving the family business with a contemporary approach and vision. He has a magnified focus on product line expansion and has introduced multiple new products of international grade. His understanding of the trade.", 
      img: "/images/team/director-3.jpg" 
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100">
      
      {/* 1. Page Header */}
      <section className="bg-slate-50 py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
          >
            Our <span className="text-blue-600">Team</span>
          </motion.h1>
          <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
            The visionaries and craftspeople behind the Space One legacy.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-20">
        
        {/* 2. Founder Director Section - FIXED FOR CLARITY */}
        <motion.section {...fadeIn} className="mb-32">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 h-[700px] group shadow-2xl">
            <Image 
              src="/images/team/founder.jpg" 
              alt="Mr. Bhawanji Chheda" 
              fill
              priority
              quality={100}
              className="object-contain object-top transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-110"
            />
            
            {/* Subtle Gradient Overlay: Darker at bottom for text readability, clear at top for the face */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-widest uppercase mb-6 shadow-lg">
                  Founder Director
                </span>
                <h2 className="text-5xl md:text-7xl text-white font-bold mb-6 tracking-tight">
                    Mr. Bhawanji Chheda
                </h2>
                <p className="text-gray-200 text-lg md:text-2xl max-w-4xl leading-relaxed font-light drop-shadow-md">
                  52 years ago, the first-generation Head Honcho <span className="text-white font-semibold">Mr. Bhawanji Chheda</span>, 
                  laid the foundation of Space One so strong, facilitating the brand to grow manifold. 
                  His vision was to make Space One the most sought-after brand—a single destination for 
                  Plywood, Wood Veneers, and Laminates.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

       {/* 3. Managing Directors Grid */}
<div className="text-center mb-16">
  <h2 className="text-3xl font-bold text-slate-900">Leadership Excellence</h2>
  <div className="mt-2 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
</div>

<section className="flex flex-wrap justify-center gap-8 mb-32 max-w-6xl mx-auto px-4">
  {managingDirectors.map((md, index) => (
    <motion.div 
      key={index} 
      {...fadeIn}
      transition={{ delay: index * 0.1 }}
      // Responsive width: full on mobile, fixed width on md screens
      className="w-full md:w-[350px] group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative h-80 overflow-hidden">
        <Image 
          src={md.img} 
          alt={md.name} 
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        {/* Subtle overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{md.name}</h3>
        <p className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-xs uppercase tracking-widest mb-4">
          {md.role}
        </p>
        <p className="text-slate-600 leading-relaxed italic text-sm">"{md.desc}"</p>
      </div>
    </motion.div>
  ))}
</section>
        {/* 4. Full Team Image Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-[2rem] overflow-hidden h-[500px] shadow-2xl group">
            <Image 
              src="/images/team/team.jpg" 
              alt="Space One Full Team" 
              fill
              className="object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center text-center p-6">
              <div className="max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">The Space One Collective</h2>
                <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
                <p className="text-xl md:text-2xl text-blue-100 font-light leading-snug">
                  "Individual commitment to a group effort—that is what makes a team work, a company work, a society work, a civilization work."
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
    <Footer />
    </>
  );
};

export default Team; 