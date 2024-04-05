import { IoMdClose } from "react-icons/io";

function Heading({ title, subtitle, onClick }) {
  return (
    <div className="flex items-center p-2 rounded-t justify-center border-b-[1px] relative">
      <button
        className="p-1 border-0 hover:opacity-70 transition absolute left-3 lg:left-9 z-99"
        onClick={onClick}
      >
        <IoMdClose size={18} />
      </button>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-light text-neutral-500">{subtitle}</div>
      </div>
    </div>
  );
}

export default Heading;
