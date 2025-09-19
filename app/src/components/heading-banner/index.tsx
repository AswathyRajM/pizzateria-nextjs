import Image from "next/image";
import React from "react";

function HeadingBanner({heading, imgUrl}: {heading: string, imgUrl: string    }) {
  return (
    <section className="relative h-[200px] lg:h-[250px] flex items-center justify-center">
      <Image
        src={imgUrl}
        alt={heading }
        fill
        className="object-cover brightness-75"
      />
      <h1 className="mt-[60px] relative z-10 text-4xl md:text-6xl font-bold text-white">
        {heading}
      </h1>
    </section>
  );
}

export default HeadingBanner;
