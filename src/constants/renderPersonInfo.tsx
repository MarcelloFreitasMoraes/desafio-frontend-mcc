export const renderPersonInfo = (label: string, value: string) => (
    <p className="text-red-800 text-sm lg:text-lg font-bold leading-10">
      {label}: <span className="text-black font-semibold text-sm">{value}</span>
    </p>
  );