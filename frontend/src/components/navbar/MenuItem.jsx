function MenuItem({ onClick, label }) {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold flex flex-row items-center gap z-40"
    >
      {label}
    </div>
  );
}

export default MenuItem;
