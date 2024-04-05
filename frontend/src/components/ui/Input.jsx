function Input({ id, label, type, onChange, value }) {
  return (
    <div className="w-full relative">
      <div className="p-4">
        <input
          id={id}
          placeholder=" "
          type={type}
          className="w-full p-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed peer "
          onChange={onChange}
          // {...(notReq ? { required: true } : {})}
          value={value}
        />
        {/*absolute left-8 top-8  */}
        <label
          className={`
          absolute
          text-md
          duration-150
          transform
          -translate-y-4
          left-8
          top-8
          z-10
          origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-90
          peer-focus:-translate-y-7
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default Input;
