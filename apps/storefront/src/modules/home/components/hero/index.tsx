import { Heading } from "@modules/common/components/ui";

const Hero = () => {
  return (
    <div className="h-[75vh] min-h-[560px] w-full border-b border-ui-border-base relative overflow-hidden bg-[#17261f]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1712]/90 via-[#0d1712]/55 to-transparent" />
      <div className="content-container relative z-10 flex h-full flex-col justify-center gap-8 text-white">
        <span className="max-w-3xl">
          <Heading
            level="h1"
            className="text-[44px] leading-[52px] small:text-[72px] small:leading-[78px] font-semibold"
          >
            Outdoor Gear Shop
          </Heading>
          <Heading
            level="h2"
            className="mt-5 max-w-2xl text-xl leading-8 small:text-2xl small:leading-10 font-normal text-white/82"
          >
            Trail-ready camp storage, cookware accessories, and repair
            essentials.
          </Heading>
        </span>
        <div className="flex flex-wrap gap-3 text-small-semi uppercase tracking-normal text-white/80">
          <span className="border border-white/30 px-3 py-2">
            Camp storage
          </span>
          <span className="border border-white/30 px-3 py-2">
            Cookware accessories
          </span>
          <span className="border border-white/30 px-3 py-2">
            Trail repair
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
