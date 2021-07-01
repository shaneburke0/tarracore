import React from "react";
import Image from "../Image";

const Showcase = ({ imageSrc, onSale }) => {
  return (
    <div className="z-10 relative">
      <Image src={imageSrc} className="w-136 rounded-lg" alt="Showcase item" />
      {onSale && <div class="freeShippingRibbon">Sale</div>}
    </div>
  );
};

export default Showcase;
