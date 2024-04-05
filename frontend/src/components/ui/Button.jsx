function Button({
  actionLabel,
  outline,
  small,
  Icon,
  onClick,
  rounded,
  disabled,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` flex gap-3 items-center justify-center  disabled:opacity-70  disabled:cursor-not-allowed  hover:opacity-80 transition w-full
      ${outline ? "bg-white" : "bg-rose-500"}
      ${outline ? "border-black" : "border-rose-500"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "py-1" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-[2px]"} 
      ${rounded ? "rounded-full " : "rounded-lg"} 
      `}
    >
      {Icon && <Icon className="" />}
      {actionLabel}
    </button>
  );
}

export default Button;
