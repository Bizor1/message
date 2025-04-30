import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="relative w-full h-screen">
        {/* Hero image */}
        <div className="absolute inset-0">
          <Image
            src="/images/danilo-capece-NoVnXXmDNi0-unsplash.jpg"
            alt="Giant sneaker in cityscape"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Hero content overlay */}
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <div className="mb-4 text-xs uppercase tracking-widest">Coming Soon</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-wide">PONY HTN & MULE</h1>
          <div className="text-xl mb-8">
            <span>02D</span> : <span>09H</span> : <span>12M</span> : <span>00S</span>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="btn-underline"
          >
            <span className="mr-2">→</span> New Arrivals
          </Link>
        </div>
      </section>

      {/* Full-height fashion image section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/oladimeji-odunsi-aNj8Hvbrss8-unsplash.jpg"
            alt="Fashion model with blinds"
            fill
            className="object-cover object-center"
            quality={100}
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center md:justify-end text-center text-white px-4 pb-0 md:pb-32">
          <div className="mb-2 text-xs uppercase tracking-widest letter-spacing-wider">Discover</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-wide">NEW ARRIVALS</h2>
          <Link
            href="/collections/new-arrivals"
            className="btn-underline mb-16 md:mb-0"
          >
            SHOP NOW
          </Link>
        </div>
      </section>

      {/* SS25 Overdrive Collection - Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/3206478-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <div className="mb-3 text-xs uppercase tracking-widest">EXPLORE COLLECTIONS</div>
          <div className="space-y-3 md:space-y-4 mb-6">
            <Link href="/collections/ss25-overdrive" className="block text-xl md:text-3xl font-medium uppercase">SS25 Overdrive</Link>
            <Link href="/collections/247" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">247</Link>
            <Link href="/collections/woman" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">Woman</Link>
            <Link href="/collections/initial" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">Initial</Link>
          </div>
          <Link
            href="/collections/ss25-overdrive"
            className="btn-underline"
          >
            <span className="mr-2">→</span> DISCOVER
          </Link>
        </div>
      </section>

      {/* 247 Collection - Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/3753702-uhd_3840_2160_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <div className="mb-3 text-xs uppercase tracking-widest">EXPLORE COLLECTIONS</div>
          <div className="space-y-3 md:space-y-4 mb-6">
            <Link href="/collections/ss25-overdrive" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">SS25 Overdrive</Link>
            <Link href="/collections/247" className="block text-xl md:text-3xl font-medium uppercase">247</Link>
            <Link href="/collections/woman" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">Woman</Link>
            <Link href="/collections/initial" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">Initial</Link>
          </div>
          <Link
            href="/collections/247"
            className="btn-underline"
          >
            <span className="mr-2">→</span> DISCOVER
          </Link>
        </div>
      </section>

      {/* Woman Collection - Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/3206478-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <div className="mb-3 text-xs uppercase tracking-widest">EXPLORE COLLECTIONS</div>
          <div className="space-y-3 md:space-y-4 mb-6">
            <Link href="/collections/ss25-overdrive" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">SS25 Overdrive</Link>
            <Link href="/collections/247" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">247</Link>
            <Link href="/collections/woman" className="block text-xl md:text-3xl font-medium uppercase">Woman</Link>
            <Link href="/collections/initial" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">Initial</Link>
          </div>
          <Link
            href="/collections/woman"
            className="btn-underline"
          >
            <span className="mr-2">→</span> DISCOVER
          </Link>
        </div>
      </section>

      {/* Initial Collection - Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/3753702-uhd_3840_2160_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <div className="mb-3 text-xs uppercase tracking-widest">EXPLORE COLLECTIONS</div>
          <div className="space-y-3 md:space-y-4 mb-6">
            <Link href="/collections/ss25-overdrive" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">SS25 Overdrive</Link>
            <Link href="/collections/247" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">247</Link>
            <Link href="/collections/woman" className="block text-lg md:text-2xl font-medium uppercase opacity-60 hover:opacity-100 transition-opacity">Woman</Link>
            <Link href="/collections/initial" className="block text-xl md:text-3xl font-medium uppercase">Initial</Link>
          </div>
          <Link
            href="/collections/initial"
            className="btn-underline"
          >
            <span className="mr-2">→</span> DISCOVER
          </Link>
        </div>
      </section>
    </div>
  );
}
