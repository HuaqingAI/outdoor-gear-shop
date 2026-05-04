import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Image from "next/image"

type ImageGalleryProps = {
  productId: string
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ productId, images }: ImageGalleryProps) => {
  const visibleImages = images.filter((image) => Boolean(image.url))

  return (
    <div className="flex items-start relative">
      <div className="grid w-full grid-cols-1 gap-4 small:grid-cols-2">
        {visibleImages.map((image, index) => {
          return (
            <Container
              key={`${productId}-${image.id || image.url || index}`}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#d7dfd5] bg-[#f4f6f2] p-0 shadow-none"
              id={image.id || `${productId}-image-${index + 1}`}
              data-testid="product-gallery-image"
            >
              <Image
                src={image.url!}
                priority={index <= 2 ? true : false}
                className="absolute inset-0"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                style={{
                  objectFit: "cover",
                }}
              />
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
