import React from "react";

export default function Button({
  title,
  onClick,
  full = false,
  customClasses,
}) {
  let classNames =
    "bg-secondary hover:bg-black text-white font-bold py-4 px-4 mt-4 rounded focus:outline-none focus:shadow-outline w-full";

  if (full) {
    classNames = `${classNames} w-full`;
  }

  if (customClasses) {
    classNames = `${classNames} ${customClasses}`;
  }

  return (
    <button onClick={onClick} className={classNames}>
      <div>{title}</div>
    </button>
  );
}
