import CountUp from "react-countup";

const countersData = [
  { label: "Total Biodata", count: 1200, icon: "📋" },
  { label: "Female Biodata", count: 700, icon: "👩" },
  { label: "Male Biodata", count: 500, icon: "👨" },
  { label: "Total Marriages", count: 350, icon: "💍" },
];

const SuccessCounter = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-4 rounded-lg max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-10">Success Counter</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {countersData.map(({ label, count, icon }, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-6xl mb-2">{icon}</div>
            <CountUp
              end={count}
              duration={2}
              className="text-4xl font-extrabold"
              start={0}
              separator=","
            />
            <span className="mt-1 text-lg">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounter;
