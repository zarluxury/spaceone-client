"use client";

import { Footer } from "../ui/Footer";

interface AchievementItem {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  curatedBy: string;
  date: string;
}

const achievementData: AchievementItem[] = [
  {
    id: 1,
    videoUrl: "https://media.istockphoto.com/id/1158647615/video/close-up-view-of-unrecognisable-female-customer-choosing-a-color-sample-at-a-paint-shop.mp4?s=mp4-640x640-is&k=20&c=OO3UW6frNcHdZvy3unpsfpgh1nzLR6GbrZ7JVw62OqI=",
    title: "An Evening of Meaningful Connections",
    description: "An evening where every conversation carried meaning and every connection felt effortless. A night that reminded us how beautiful it is when ideas and people come together.",
    curatedBy: "Mihir Kotak & Rinki Kotak of 4th Dimension",
    date: "Recent Event"
  },
  {
    id: 2,
    videoUrl: "https://media.istockphoto.com/id/1455749437/video/interior-designer-and-clients-discussing-tile-and-color-options-in-her-office.mp4?s=mp4-640x640-is&k=20&c=l1xsk9gCV2Ht-FVnJEEGITcKB6-fzRzs7vkX53orMI4=",
    title: "Architectural Excellence & Trust",
    description: "We're beyond grateful to have had amazing Architect Yogesh Wadhwana from DWG Designs visit our SpaceOne family. Your kind words and continued trust mean so much to us.",
    curatedBy: "Mihir Kotak & Rinki Kotak of 4th Dimension",
    date: "Partnership Highlight"
  },
];

export default function Achievements() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 tracking-tighter">
            Achievements <span className="text-gray-400">&</span> <br /> Highlights
          </h1>
        </div>

        {/* Achievement List */}
        <div className="max-w-7xl mx-auto px-6 pb-32 space-y-40">
          {achievementData.map((achievement) => (
            <div
              key={achievement.id}
              className="relative flex flex-col lg:flex-row items-end gap-12"
            >
              {/* Video Section - Top Left aligned */}
              <div className="w-full lg:w-3/5 group relative">
                <div className="overflow-hidden rounded-sm bg-gray-100 aspect-video lg:aspect-[4/3] shadow-2xl">
                  <video
                    src={achievement.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    // Note: Most browsers require 'muted' for autoPlay to work
                  />
                </div>
                {/* Minimalist Date Tag */}
                <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-2 text-xs uppercase tracking-widest">
                  {achievement.date}
                </div>
              </div>

              {/* Text Section - Bottom Right aligned */}
              <div className="w-full lg:w-2/5 mb-0 lg:mb-8 text-right">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                  {achievement.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-md ml-auto">
                  {achievement.description}
                </p>
                <div className="inline-block border-t border-gray-900 pt-4">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Curated by
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {achievement.curatedBy}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Stats */}
        <div className="border-t border-gray-100 py-24 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "500+", label: "Projects" },
              { number: "50+", label: "Awards" },
              { number: "100+", label: "Partners" },
              { number: "15+", label: "Years" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-4xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}