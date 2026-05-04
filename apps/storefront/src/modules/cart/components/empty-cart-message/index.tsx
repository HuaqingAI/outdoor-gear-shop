import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        Preview interest list
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        The preview catalog is collecting launch interest only. Browse products
        and request updates on the items you want us to validate for launch.
      </Text>
      <div>
        <InteractiveLink href="/products">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
