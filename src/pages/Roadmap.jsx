 import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Roadmap() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Chemical Test Kit Integration",
      desc: "Partner with low-cost refractometer/test-strip kits (~₹800) to back up visual AI grading with verified chemical purity data.",
      tag: "Hardware",
    },
    {
      title: "Instant Settlement",
      desc: "Guaranteed payout on delivery, so farmers get paid as fast as they would from a middleman — removing their biggest reason to go around us.",
      tag: "Fintech",
    },
    {
      title: "Target Micro-Refineries First",
      desc: "Focus early adoption on flexible buyers like local food processors and micro-refineries, before chasing rigid industrial chemical companies.",
      tag: "Go-To-Market",
    },
    {
      title: "Field Worker Enablement",
      desc: "Design for cooperative and SHG field workers who already visit farmers, so adoption doesn't depend on farmers using an app directly.",
      tag: "Adoption",
    },
  ];

  return (
    <div className="min-h-screen bg-salt-navy text-salt-sand font-body">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 text-center">
          What's Next
        </h1>
        <p className="text-salt-sand/60 text-sm mb-10 text-center max-w-md mx-auto">
          Today's prototype is step one. Here's where we're headed.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-salt-card border border-salt-sand/10 rounded-2xl p-6 hover:border-salt-teal/30 transition-colors"
            >
              <span className="text-xs uppercase tracking-wide text-salt-teal font-semibold">
                {item.tag}
              </span>
              <p className="font-display text-lg font-semibold mt-2 mb-2">
                {item.title}
              </p>
              <p className="text-salt-sand/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-salt-teal hover:bg-salt-tealDark text-salt-navy font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;