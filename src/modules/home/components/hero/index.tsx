import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Image
        src="/banner1.jpeg"
        alt="Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Hero Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 pb-12 small:pb-12">
        <div className="content-container flex flex-col small:flex-row justify-between items-end gap-y-8">
          {/* Left Side Text */}
          <div className="text-white max-w-xl">
            <h1 className="text-base small:text-4xl font-bold uppercase tracking-tight mb-4">
              Kith for the NFL:<br /> Road to Victory
            </h1>
            <p className="text-sm small:text-base font-medium opacity-90 max-w-md leading-relaxed">
              Kith and the NFL return for the third season, celebrating the historic 1991 Super Bowl run, featuring the New York Giants, Chicago Bears, Buffalo Bills, and the San Francisco 49ers.
            </p>
          </div>

          {/* Right Side Buttons */}
          <div className="flex flex-col small:flex-row gap-4 w-full small:w-auto">
            <Link
              href="/store"
              className="px-6 small:px-12 py-3 border border-white text-white text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 text-center min-w-[200px]"
            >
              Shop Now
            </Link>
            <Link
              href="/store"
              className="px-6 small:px-12 py-3 border border-white text-white text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 text-center min-w-[200px]"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
