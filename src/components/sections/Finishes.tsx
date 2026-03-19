'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GoDownload } from "react-icons/go";
import bottomImg from '../../../public/data/Materioteca-footer.jpeg'
import { Footer } from '../ui/Footer';
import Link from 'next/link';

interface Finish {
  productId: string;
  productName: string;
  productSlug: string;
  finishType: string;
  type: string;
  colorName: string;
  colorImage: string;
}

interface FinishesProps {
  finishName?: string
}

const Finishes = ({ finishName }: FinishesProps) => {
  const [allFinishes, setAllFinishes] = useState<Finish[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<Finish | null>(null);
  const [relatedFinishes, setRelatedFinishes] = useState<Finish[]>([]);
  const [loading, setLoading] = useState(true);

  // API functions
  const getAllFinishes = async (): Promise<Finish[]> => {
    try {
      const response = await fetch('http://localhost:5000/api/products/finishes');

      if (!response.ok) {
        throw new Error('Failed to fetch finishes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching finishes:', error);
      throw error;
    }
  };

  const getFinishByName = async (finishName: string): Promise<Finish | null> => {
    try {
      const finishes = await getAllFinishes();
      const normalizedName = finishName.replace(/-/g, ' ').toLowerCase().trim();

      // Try exact match first
      let foundFinish = finishes.find(finish => {
        const finishNormalizedName = finish.colorName.replace(/\s+/g, ' ').toLowerCase().trim();
        return finishNormalizedName === normalizedName;
      });

      // If no exact match, try partial match
      if (!foundFinish) {
        const searchTerms = normalizedName.split(' ');
        foundFinish = finishes.find(finish => {
          const finishNormalizedName = finish.colorName.toLowerCase();
          return searchTerms.every(term => finishNormalizedName.includes(term));
        });
      }

      return foundFinish || null;
    } catch (error) {
      console.error('Error finding finish by name:', error);
      return null;
    }
  };

  const getRelatedFinishes = async (currentFinish: Finish): Promise<Finish[]> => {
    try {
      const finishes = await getAllFinishes();
      return finishes.filter(finish =>
        finish.productId !== currentFinish.productId &&
        finish.type === currentFinish.type
      ).slice(0, 3);
    } catch (error) {
      console.error('Error getting related finishes:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finishes = await getAllFinishes();
        setAllFinishes(finishes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [finishName]);

  // Generate display images from all finishes
  const displayImages = allFinishes.map(finish => ({
    src: finish.colorImage,
    name: finish.colorName
  }));

  // Group finishes by type
  const groupedFinishes = allFinishes.reduce((acc, finish) => {
    const type = finish.type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(finish);
    return acc;
  }, {} as Record<string, Finish[]>);

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${name}.jpg`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading finish data...</div>
      </div>
    );
  }

  // Always show all finishes grouped by type
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-gramatika text-gray-900 mb-6">
          Metal Finishes
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg font-gramatika tracking-wide">
          Explore our complete collection of premium metal finishes. Each finish is carefully crafted
          to provide exceptional quality and aesthetic appeal for your design projects.
        </p>
      </div>

      {/* Finishes Grid by Type */}
      <div className="px-6 md:px-16 pb-16">
        {Object.entries(groupedFinishes).map(([type, typeFinishes]) => (
          <div key={type} className="mb-16">
            <h2 className="text-3xl font-gramatika text-gray-800 mb-8 capitalize">
              {type} Finishes ({typeFinishes.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {typeFinishes.map((finish, index) => (
                <Link
                  href={`/finishes/${finish.colorName.replace(/\s+/g, '-')}`}
                  key={`${finish.productId}-${finish.colorName}-${index}`}
                  className="group cursor-pointer"
                >
                  <div className="w-full mb-4">
                    <Image
                      src={finish.colorImage}
                      alt={finish.colorName}
                      width={500}
                      height={500}
                      className="w-full h-auto object-contain rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDownload(finish.colorImage, finish.colorName);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-gramatika text-gray-900 group-hover:text-blue-600 transition-colors">
                        {finish.colorName}
                      </h3>
                      <GoDownload
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDownload(finish.colorImage, finish.colorName);
                        }}
                        className="text-xl hover:scale-110 transition cursor-pointer text-gray-600 hover:text-black"
                      />
                    </div>
                    <p className="text-sm text-gray-600 font-gramatika">
                      {finish.productName}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {finish.finishType}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Finishes