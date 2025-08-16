import { FaUsers, FaComments, FaLayerGroup, FaChartLine } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    { icon: <FaUsers className="w-10 h-10 " />, label: "Active Members", value: "12,000+" },
    { icon: <FaComments className="w-10 h-10 " />, label: "Posts & Discussions", value: "58,000+" },
    { icon: <FaLayerGroup className="w-10 h-10 " />, label: "Categories", value: "35+" },
    { icon: <FaChartLine className="w-10 h-10 " />, label: "Daily Activity", value: "2,500+" },
  ];

  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-12">📊 Our Growing Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <div key={i} className=" p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-4xl font-bold ">{item.value}</h3>
              <p className="mt-2 ">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection
