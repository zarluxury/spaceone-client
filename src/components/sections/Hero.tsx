"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";
import "@/app/globals.css";
import Link from "next/link";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  const col1 = useRef<HTMLDivElement>(null);
  const col2 = useRef<HTMLDivElement>(null);
  const col3 = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ------------------ MOBILE DETECTION ------------------ */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ------------------ GSAP SCROLL ------------------ */
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const columns = isMobile
      ? [
          { ref: col1, speed: 1.5 },
          { ref: col2, speed: 1.5 },
        ]
      : [
          { ref: col1, speed: 2 }, // increased speed for desktop
          { ref: col2, speed: 2 }, // 🔥 faster center
          { ref: col3, speed: 2 }, // slower side
        ];

    // Small delay to ensure DOM is ready and scrollHeight is calculated
    const initDelay = setTimeout(() => {
      const animationFrames: number[] = [];
      
      columns.forEach(({ ref, speed }, index) => {
        if (!ref.current) return;

        const el = ref.current;
        let currentScrollTop = 0;
        let isUserScrolling = false;
        let timeout: any;
        let lastWheelTime = 0;
        let startupMultiplier = 0;

        // Cache DOM calculations
        const half = el.scrollHeight / 2;

        /* manual scroll with ultra-smooth performance */
        const onWheel = (e: WheelEvent) => {
          e.preventDefault();
          isUserScrolling = true;
          lastWheelTime = Date.now();

          clearTimeout(timeout);

          // Smooth scroll with advanced easing
          const scrollDelta = e.deltaY * 1.0; // Balanced multiplier for smoothness
          const targetScrollTop = currentScrollTop + scrollDelta;
          const startScrollTop = currentScrollTop;
          const scrollDistance = targetScrollTop - startScrollTop;
          const duration = 200; // Optimized duration for smoothness
          const startTime = performance.now();

          const smoothScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Advanced easing for buttery smoothness
            const easeProgress = progress < 0.5 
              ? 4 * progress * progress * progress // Ease-in cubic
              : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Ease-out cubic
            
            currentScrollTop = startScrollTop + scrollDistance * easeProgress;
            
            // Handle loop
            if (currentScrollTop >= half) {
              currentScrollTop = currentScrollTop % half;
            } else if (currentScrollTop < 0) {
              currentScrollTop = half + currentScrollTop;
            }
            
            // Smooth DOM update
            el.scrollTop = currentScrollTop;

            if (progress < 1) {
              requestAnimationFrame(smoothScroll);
            }
          };

          requestAnimationFrame(smoothScroll);

          timeout = setTimeout(() => {
            isUserScrolling = false;
          }, 100); // Optimized timeout for smooth transition
        };

        el.addEventListener("wheel", onWheel, { passive: false });

        /* 🔥 Set initial position for middle and last columns */
        if (index === 1) { // col2 - middle column
          currentScrollTop = half * 0.9;
          el.scrollTop = currentScrollTop;
        } else if (index === 2) { // col3 - last column
          currentScrollTop = half * 0.8;
          el.scrollTop = currentScrollTop;
        }

        // Optimized startup with requestAnimationFrame
        let startupFrame: number;
        const startupAnimation = () => {
          if (startupMultiplier < 1) {
            startupMultiplier += 0.02;
            if (startupMultiplier > 1) startupMultiplier = 1;
            startupFrame = requestAnimationFrame(startupAnimation);
          }
        };
        startupFrame = requestAnimationFrame(startupAnimation);

        // Maximum smoothness auto scroll with advanced animation
        let animationId: number;
        let animationProgress = 0;
        let lastScrollPosition = 0;
        let accumulator = 0;
        
        const auto = () => {
          // Only pause auto-scroll if user recently scrolled (within last 200ms)
          const now = Date.now();
          const timeSinceLastWheel = now - lastWheelTime;
          
          if (!isUserScrolling || timeSinceLastWheel >= 200) {
            // Reset scrolling state if enough time has passed
            if (timeSinceLastWheel >= 200) {
              isUserScrolling = false;
            }

            // Ultra-smooth animation with advanced easing
            const baseSpeed = speed * startupMultiplier * 0.2; // Ultra-gentle base speed
            animationProgress += 0.008; // Finer animation steps
            
            // Apply advanced easing functions
            const easeInOutQuart = (t: number) => 
              t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
            
            const easedProgress = easeInOutQuart(animationProgress % 1);
            const smoothSpeed = baseSpeed * (0.7 + easedProgress * 0.6); // Enhanced variable speed
            
            // Sub-pixel accumulation for maximum smoothness
            accumulator += smoothSpeed;
            
            // Apply movement with sub-pixel precision
            if (Math.abs(accumulator) >= 0.01) {
              currentScrollTop += accumulator;
              accumulator = 0; // Reset accumulator
            }

            // Seamless loop handling with floating precision
            if (currentScrollTop >= half) {
              currentScrollTop = currentScrollTop - half;
              animationProgress = 0; // Reset animation on loop
            }

            // Hardware-accelerated DOM update
            el.scrollTop = currentScrollTop;
            lastScrollPosition = currentScrollTop;
          }
          
          animationId = requestAnimationFrame(auto);
        };

        // Start animation
        animationId = requestAnimationFrame(auto);
        animationFrames.push(animationId);

        return () => {
          el.removeEventListener("wheel", onWheel);
          if (timeout) clearTimeout(timeout);
          if (startupFrame) cancelAnimationFrame(startupFrame);
          if (animationId) cancelAnimationFrame(animationId);
        };
      });
    }, 100); // 100ms delay for initialization

    return () => {
      clearTimeout(initDelay);
    };
  });

  return () => ctx.revert();
}, [isMobile]);

  /* ------------------ DATA ------------------ */
  const col1Items = [
    { type: "image", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-one/1.jpg", link: "/productview/corazon-or-textured", name: "Corazon or Textured" },
    { type: "video", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-one/2.mp4", link: "/" },
    { type: "image", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-one/3.jpg", link: "/productview/leather-or-laminate", name: "Leather or Laminate" },
  ];

  const col2Items = [
    { type: "image", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-two/1.jpg", link: "/productview/lithe-or-leather", name: "Lithe or Leather" },
    { type: "video", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-two/2.mp4", link: "/" },
    { type: "image", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-two/3.jpg", link: "/productview/omree-or-laminate", name: "Omree or Laminate" },
  ];

  const col3Items = [
    { type: "image", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-three/1.jpg", link: "/productview/spectrum-or-laminates", name: "Spectrum or Laminates" },
    { type: "video", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-three/2.mp4", link: "/" },
    { type: "image", src: "https://pub-0fd661f0d30a4344a3b4d291f6516fc2.r2.dev/products/hero-videos/row-three/3.jpg", link: "/productview/natural-veneer", name: "Natural or Veneer" },
  ];

  /* ------------------ RENDER ITEMS ------------------ */
  const renderItems = (items: any[]) => {
    const loopItems = [...items, ...items];

    return loopItems.map((item, i) => {
      const videoRef = useRef<HTMLVideoElement>(null);
      const isInitialLoad = i < 3; // First 3 items are critical
      
      return (
        <div key={i} className="relative h-screen w-full shrink-0">
          {item.type === "image" ? (
            <div className="relative h-full w-full text-transparent hover:text-white">
            <Link href={item.link}>
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl lg:text-3xl z-10 transition-colors duration-300">
                {item.name}
              </h2>
            <Image
              src={item.src}
              alt={item.name || "Product showcase"}
              fill
              priority={isInitialLoad}
              sizes={isMobile ? "50vw" : "33vw"}
              quality={isInitialLoad ? 75 : 60}
              loading={isInitialLoad ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A"
              className="object-cover transform-gpu"
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                objectFit: 'cover'
              }}
            />
            </Link>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              autoPlay={isInitialLoad}
              muted
              loop
              playsInline
              preload={isInitialLoad ? "metadata" : "none"}
              className="absolute inset-0 w-full h-full object-cover transform-gpu"
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                opacity: isInitialLoad ? 1 : 0.8,
                objectFit: 'cover'
              }}
              onMouseEnter={() => {
                const video = videoRef.current;
                if (video && video.getBoundingClientRect().top < window.innerHeight) {
                  if (video.paused) {
                    video.load();
                    video.play().catch(() => {
                      // Handle autoplay policy
                    });
                  }
                }
              }}
              onLoadStart={() => {
                if (videoRef.current) {
                  videoRef.current.playbackRate = 0.8; // Slightly slower for performance
                }
              }}
            />
          )}
        </div>
      );
    });
  };

  /* ------------------ COLUMN CONFIG ------------------ */
  const columnsData = isMobile
    ? [
        { ref: col1, items: col1Items },
        { ref: col2, items: col2Items },
      ]
    : [
        { ref: col1, items: col1Items },
        { ref: col2, items: col2Items },
        { ref: col3, items: col3Items },
      ];

  /* ------------------ SMOOTH SCROLL SETUP ------------------ */
  useEffect(() => {
    // Add smooth scroll behavior to document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  /* ------------------ UI ------------------ */
  return (
    <section 
      ref={heroRef}
      className="h-screen w-full bg-black flex gap-3 p-3 overflow-hidden"
      style={{ scrollBehavior: 'smooth' }}
    >
      {columnsData.map((col, i) => (
        <div
          key={i}
          ref={col.ref}
          className={`
            flex flex-col overflow-y-scroll scrollbar-hide will-change-scroll
            ${isMobile ? "w-1/2" : "w-1/3"}
            ${!isMobile && i === 1 ? "scale-105 z-10 shadow-2xl" : ""}
          `}
        >
          {renderItems(col.items)}
        </div>
      ))}
    </section>
  );
}
