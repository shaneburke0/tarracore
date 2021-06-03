import React from "react";

export default function QuantityPicker({
  increment,
  decrement,
  numberOfitems,
  hideQuantityLabel,
}) {
  return (
    <div className={`flex items-center`}>
      {!hideQuantityLabel && <div className="px-2 text-xs">QUANTITY</div>}
      <button
        className="
        w-8 h-8 text-sm
        md:w-10 md:h-10 md:text-2xl
        cursor-pointer text-center border pb-.5
        hover:bg-gray-900 hover:text-white
        focus:outline-none
        "
        onClick={decrement}
      >
        -
      </button>
      <p
        className="
        w-8 h-8 text-sm pt-1
        md:w-10 md:h-10 md:pt-2 md:text-base
        m-0 border-t border-b text-center"
      >
        {numberOfitems}
      </p>

      <button
        className="
        w-8 h-8 text-sm
        md:w-10 md:h-10 md:text-xl
        cursor-pointer text-center border pb-.5
        hover:bg-gray-900 hover:text-white
        focus:outline-none
        "
        onClick={increment}
      >
        +
      </button>
    </div>
  );
}
