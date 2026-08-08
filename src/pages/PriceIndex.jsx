 import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const priceData = {
  A: {
    fairMin: 2800,
    fairMax: 3200,
    middleman: 1900,
    label: "Premium Quality",
    note: "Clean, white, uniform crystals. Suitable for edible-grade buyers.",
  },
  B: {
    fairMin: 2000,
    fairMax: 2400,
    middleman: 1500,
    label: "Standard Quality",
    note: "Good quality with minor unevenness. Common for industrial/edible blends.",
  },
  C: {
    fairMin: 1200,
    fairMax: 1600,
    middleman: 900,
    label: "Basic Quality",
    note: "Visible impurities or unevenness. Best suited for industrial use; lab verification recommended for edible buyers.",
  },
};

function PriceIndex() {
  const location = useLocation();
  const navigate = useNavigate();
  const grade = location.state?.grade || "B";
  const data = priceData[grade];

  const fairAvg = Math.round((data.fairMin + data.fairMax) / 2);
  const gapAmount = fairAvg - data.middleman;
  const gapPercent = Math.round((gapAmount / data.middleman) * 100);
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-salt-navy text-salt-sand font-body">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10 md:py-16">
        {/* Report header */}
        <div className="flex items-start justify-between border-b border-salt-sand/10 pb-6 mb-8">
          <div>
            <p className="text-salt-teal text-xs uppercase tracking-widest font-semibold mb-1">
              Quality &amp; Price Report
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-semibold">
              Fair Price Assessment
            </h1>
          </div>
          <p className="text-salt-sand/40 text-xs text-right hidden sm:block">
            {today}
          </p>
        </div>

        {/* Grade summary block */}
        <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-center bg-salt-card border border-salt-sand/10 rounded-2xl p-6 md:p-8 mb-6">
          <div className="font-display text-7xl font-semibold text-salt-teal text-center sm:text-left">
            {grade}
          </div>
          <div>
            <p className="text-lg font-semibold mb-1">{data.label}</p>
            <p className="text-salt-sand/60 text-sm">{data.note}</p>
          </div>
        </div>

        {/* Price comparison table */}
        <div className="bg-salt-card border border-salt-sand/10 rounded-2xl p-6 md:p-8 mb-6">
          <p className="text-salt-sand/50 text-xs uppercase tracking-wide mb-5">
            Price Comparison — Per Tonne
          </p>

          <div className="mb-5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-salt-sand/80 text-sm">
                Fair Price Range
              </span>
              <span className="text-salt-teal font-semibold text-lg">
                ₹{data.fairMin.toLocaleString()} – ₹{data.fairMax.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-salt-navy rounded-full h-2.5">
              <div className="bg-salt-teal h-2.5 rounded-full w-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-salt-sand/80 text-sm">
                Typical Middleman Offer
              </span>
              <span className="text-salt-red font-semibold text-lg">
                ₹{data.middleman.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-salt-navy rounded-full h-2.5">
              <div
                className="bg-salt-red h-2.5 rounded-full"
                style={{
                  width: Math.round((data.middleman / data.fairMax) * 100) + "%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Impact statement */}
        <div className="bg-salt-amber/10 border border-salt-amber/30 rounded-2xl p-6 md:p-8 mb-8 text-center">
          <p className="text-salt-amber/80 text-sm mb-1">
            Potential earning increase
          </p>
          <p className="font-display text-4xl md:text-5xl font-semibold text-salt-amber mb-1">
            ₹{gapAmount.toLocaleString()}
          </p>
          <p className="text-salt-amber/80 text-sm">
            more per tonne — {gapPercent}% above the typical middleman offer
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/roadmap")}
            className="bg-salt-teal hover:bg-salt-tealDark text-salt-navy font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            See What's Next
          </button>
          <button
            onClick={() => navigate("/grade")}
            className="border border-salt-sand/20 hover:border-salt-teal/50 text-salt-sand/80 font-medium px-8 py-3.5 rounded-xl transition-colors"
          >
            Grade Another Batch
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceIndex;