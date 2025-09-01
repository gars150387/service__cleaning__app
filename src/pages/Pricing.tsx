import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [chosenPlan, setChosenPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const plans = [
    {
      id: "basic",
      name: "Basic Clean",
      price: "$120",
      frequency: "One-time",
      features: [
        "General cleaning of all rooms",
        "Bathroom sanitization",
        "Kitchen cleaning",
        "Dusting and vacuuming",
        "2-3 hours service",
      ],
    },
    {
      id: "deep",
      name: "Deep Clean",
      price: "$150",
      frequency: "One-time",
      popular: true,
      features: [
        "Everything in Basic Clean",
        "Inside appliances cleaning",
        "Baseboards and window sills",
        "Light fixtures cleaning",
        "Cabinet fronts",
        "4 hours service",
      ],
    },
    {
      id: "weekly",
      name: "Weekly Service",
      price: "$90",
      frequency: "Per week",
      features: [
        "Regular maintenance cleaning",
        "Consistent quality",
        "Same cleaner each visit",
        "Flexible scheduling",
        "2-3 hours service",
      ],
    },
  ];

  const handleChoosePlan = (planId: string) => {
    setChosenPlan(planId);
    // Navigate to book page with the selected plan as a query parameter
    navigate(`/book?plan=${planId}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Choose the perfect cleaning service for your needs. No hidden fees,
            no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-primary-500 scale-105"
                  : "border-neutral-200"
              } ${
                chosenPlan === plan.id
                  ? "ring-2 ring-primary-300 shadow-xl"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-500">
                    {plan.price}
                  </span>
                  <span className="text-neutral-600 ml-2">
                    {plan.frequency}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(plan.id)}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "bg-primary-500 hover:bg-primary-600 text-white"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 hover:bg-primary-50 hover:text-primary-700"
                } ${
                  chosenPlan === plan.id
                    ? "bg-primary-600 text-white"
                    : ""
                }`}
              >
                {chosenPlan === plan.id ? "Selected" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
