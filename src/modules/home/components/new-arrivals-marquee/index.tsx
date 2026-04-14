import Link from "next/link"

const NewArrivalsMarquee = () => {
  const items = Array(6).fill(null)

  const MarqueeGroup = () => (
    <div className="flex items-center whitespace-nowrap">
      {items.map((_, i) => (
        <div key={i} className="flex items-center gap-x-8 small:gap-x-16 mx-4 small:mx-8">
          <span className="text-2xl small:text-4xl font-bold uppercase tracking-tighter text-black">
            New Arrivals
          </span>
          <Link
            href="/store"
            className="text-xs small:text-sm font-bold uppercase tracking-widest text-[#912d2d] bg-white border border-neutral-200 px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300 shadow-sm"
          >
            Shop Now
          </Link>
        </div>
      ))}
    </div>
  )

  return (
    <div className="relative flex overflow-hidden bg-white py-5 small:py-10 border-neutral-100 select-none">
      <div className="animate-marquee flex shrink-0">
        <MarqueeGroup />
      </div>
      <div className="animate-marquee flex shrink-0" aria-hidden="true">
        <MarqueeGroup />
      </div>
    </div>
  )
}

export default NewArrivalsMarquee
