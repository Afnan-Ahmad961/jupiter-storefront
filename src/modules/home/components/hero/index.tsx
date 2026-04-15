import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="h-[60vh] small:h-screen w-full relative overflow-hidden">
      <Image
        src="/Banner.png"
        alt="Banner"
        fill
        className="hidden small:block object-cover"
        priority
      />
      <Image
        src="/Mobile-Banner.png"
        alt="Mobile Banner"
        fill
        className="block small:hidden object-cover bg-top"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Hero Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 pb-12 small:pb-12">
        <div className="content-container flex flex-col small:flex-row justify-between items-end gap-y-8">
          {/* Left Side Text */}
          <div className="text-white max-w-xl drop-shadow-lg">
            <h1 className="text-2xl small:text-4xl font-bold uppercase tracking-tight mb-4 leading-tight">
              Step Into Volume 1:<br /> Out Of This World
            </h1>
            <p className="text-xs small:text-base font-medium max-w-md leading-relaxed">
              Featuring 7 premium oversized silhouettes built for modern street style.
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
            {/* <Link
              href="/about"
              className="px-6 small:px-12 py-3 border border-white text-white text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 text-center min-w-[200px]"
            >
              About Us
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
