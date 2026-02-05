"use client"
import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex flex-col small:flex-row gap-x-4 relative">
      {/* Thumbnails */}
      <div className="hidden small:flex flex-col gap-y-2 sticky top-24 h-fit">
        {images.map((image, index) => (
          <a
            key={image.id}
            href={`#${image.id}`}
            className="w-16 h-16 relative border border-ui-border-base hover:border-ui-border-interactive overflow-hidden"
          >
            {!!image.url && (
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="16vw"
                style={{ objectFit: "cover" }}
              />
            )}
          </a>
        ))}
      </div>

      {/* Main Images */}
      <div className="flex flex-col flex-1 gap-y-4">
        {images.map((image, index) => {
          return (
            <div
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
