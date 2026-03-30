"use client";

import { Footer } from "../ui/Footer";

interface ReelItem {
  id: number;
  videoUrl: string;
  caption: string;
  curatedBy: string;
}

const reelData: ReelItem[] = [
  {
    id: 1,
    videoUrl: "https://www.instagram.com/reel/DPnzZJ-DMgL/?igsh=MXZvbjFpbHRjbnlwag==",
    caption: "An evening where every conversation carried meaning and every connection felt effortless. A night that reminded us how beautiful it is when ideas and people come together.\n\nGracefully curated by Mihir Kotak & Rinki Kotak of 4th Dimension.\n\n#SpaceOne #Veneer #InteriorDesign #luxurydesign #Art #Networking #ConnectionsThatLast #InspiringEvening #MakingConnections #IdeasInMotion #MomentsOfMagic #NetworkingVibes #SharedInspiration",
    curatedBy: "Mihir Kotak & Rinki Kotak of 4th Dimension"
  },
  {
    id: 2,
    videoUrl: "https://www.instagram.com/reel/C-fb4P9o834/?igsh=MWhubzl5MzY5aDM4aQ==",
    caption: "We're beyond grateful to have had the amazing Architect @yogesh.wadhwana from @dwgdesigns visit our SpaceOne family. Your kind words and continued trust mean so much to us. Thank you for always choosing us, and for the incredible bond we've built over the years. Here's to many more years of creativity together! #SpaceOneSurfaces #YogeshWadhwana #DWGDesign #ArchitectsChoice #gratitude",
    curatedBy: "Mihir Kotak & Rinki Kotak of 4th Dimension"
  },
];

export default function Achievements() {
  const getEmbedUrl = (url: string) => {
    const match = url.match(/\/reel\/([^/?]+)/);
    if (match) {
      return `https://www.instagram.com/reel/${match[1]}/embed/`;
    }
    return url;
  };

  return (
    <>
      <div className="min-h-screen bg-black font-gramatika">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-12 py-10 sm:py-14">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-12 mt-12 text-center">
            Achievements & Highlights
          </h1>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reelData.map((reel) => (
              <div
                key={reel.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >


                {/* Reel/Video */}
                <div className="relative w-full aspect-[9/16] overflow-hidden rounded-sm">
                  <iframe
                    src={getEmbedUrl(reel.videoUrl)}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    style={{ scrollbarWidth: "none" }}
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}