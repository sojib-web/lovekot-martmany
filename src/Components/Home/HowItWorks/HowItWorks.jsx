const HowItWorksCards = () => {
  const steps = [
    {
      title: "Create Your Profile",
      description:
        "Sign up and create a detailed biodata with your personal info, preferences, and photos.",
      icon: "📝",
    },
    {
      title: "Browse Matches",
      description:
        "Explore profiles filtered by age, location, occupation, and other preferences.",
      icon: "🔍",
    },
    {
      title: "Connect Securely",
      description:
        "Send interest requests or messages to profiles you like. Communication starts only after mutual consent.",
      icon: "🔒",
    },
    {
      title: "Premium Benefits",
      description:
        "Upgrade to Premium to unlock unlimited messaging, advanced search filters, and see who viewed your profile.",
      icon: "💎",
    },
    {
      title: "Find Your Match",
      description:
        "Interact, chat, and arrange meetings to find the perfect life partner.",
      icon: "❤️",
    },
    {
      title: "Find Your Match",
      description:
        "Interact, chat, and arrange meetings to find the perfect life partner.",
      icon: "❤️",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        How It Works
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksCards;
