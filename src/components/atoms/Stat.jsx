const Stat = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-xl font-bold text-gray-800 mt-2">{value}</h2>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default Stat;
