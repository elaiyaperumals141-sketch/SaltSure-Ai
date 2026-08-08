 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function GradeSalt() {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [notSalt, setNotSalt] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 500;
        const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.6;
        let compressed = canvas.toDataURL("image/jpeg", quality);
        while (compressed.length > 800000 && quality > 0.2) {
          quality -= 0.1;
          compressed = canvas.toDataURL("image/jpeg", quality);
        }

        setImage(compressed);
        setImageBase64(compressed);
        setResult(null);
        setNotSalt(false);
        setErrorMsg(null);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const analyzeSalt = async () => {
    setAnalyzing(true);
    setNotSalt(false);
    setErrorMsg(null);

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_GROQ_API_KEY,
          },
          body: JSON.stringify({
            model: "qwen/qwen3.6-27b",
            reasoning_effort: "none",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `You are a salt quality inspector for small-scale salt farmers. Look at this image and respond with ONLY raw JSON, nothing else, no explanation, no thinking, no markdown. Format exactly:
{
  "isSalt": true or false,
  "grade": "A" or "B" or "C" (only if isSalt is true, else null),
  "whitenessPercent": number 0-100,
  "uniformityPercent": number 0-100,
  "needsLab": true or false,
  "reason": "one short sentence explaining the grade or why it's not salt"
}
Grade A = very white, clean, uniform crystals. Grade B = decent but some discoloration or unevenness. Grade C = visibly impure, discolored, or very uneven, and needsLab should be true. If the image is not salt (e.g. a person, object, food, fabric, random photo), set isSalt to false and grade to null. Respond with JSON only.`,
                  },
                  {
                    type: "image_url",
                    image_url: { url: imageBase64 },
                  },
                ],
              },
            ],
            temperature: 0.2,
            max_tokens: 400,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Groq API error:", data);
        setErrorMsg("AI check failed. Please try again.");
        setAnalyzing(false);
        return;
      }

      let raw = data.choices[0].message.content.trim();
      raw = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      raw = raw.replace(/json|/g, "").trim();
      const jsonStart = raw.indexOf("{");
      const jsonEnd = raw.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No JSON found in AI response");
      }
      raw = raw.substring(jsonStart, jsonEnd + 1);

      const parsed = JSON.parse(raw);

      if (!parsed.isSalt) {
        setNotSalt(true);
        setResult(null);
        setAnalyzing(false);
        return;
      }

      let gradeColor = "text-salt-amber";
      if (parsed.grade === "A") gradeColor = "text-salt-teal";
      if (parsed.grade === "C") gradeColor = "text-salt-red";

      setResult({
        grade: parsed.grade,
        gradeColor,
        whitenessPercent: parsed.whitenessPercent,
        uniformityPercent: parsed.uniformityPercent,
        needsLab: parsed.needsLab,
        reason: parsed.reason,
      });
      setAnalyzing(false);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong reading the AI response. Try again.");
      setAnalyzing(false);
    }
  };

  const goToPriceIndex = () => {
    navigate("/price", { state: { grade: result.grade } });
  };

  const resetImage = () => {
    setImage(null);
    setImageBase64(null);
    setResult(null);
    setNotSalt(false);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-salt-navy text-salt-sand font-body">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-10 md:py-16">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 text-center">
          Grade Your Salt
        </h1>
        <p className="text-salt-sand/60 text-sm mb-10 text-center max-w-md mx-auto">
          Upload a close-up photo that fills the frame with salt — checked by AI vision
        </p>

        <div className="max-w-sm md:max-w-md mx-auto">
          {!image && (
            <label className="border-2 border-dashed border-salt-sand/20 rounded-2xl p-12 md:p-16 text-center cursor-pointer hover:border-salt-teal/50 transition-colors flex flex-col items-center gap-3 bg-salt-card/40">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-4xl">📷</span>
              <p className="text-salt-sand/60 text-sm">
                Tap to upload a photo of your salt
              </p>
            </label>
          )}

          {image && (
            <div>
              <img
                src={image}
                alt="uploaded salt"
                className="rounded-2xl w-full mb-4 border border-salt-sand/10 max-h-96 object-cover"
              />

              {!result && !notSalt && (
                <button
                  onClick={analyzeSalt}
                  disabled={analyzing}
                  className="w-full bg-salt-teal hover:bg-salt-tealDark disabled:bg-salt-sand/20 text-salt-navy font-semibold py-3.5 rounded-xl transition-colors"
                >
                  {analyzing ? "AI is analyzing..." : "Analyze Quality"}
                </button>
              )}

              {errorMsg && (
                <p className="text-salt-red text-sm mt-3 text-center">
                  {errorMsg}
                </p>
              )}

              {notSalt && (
                <div className="bg-salt-red/10 border border-salt-red/30 rounded-2xl p-6 mt-2">
                  <p className="text-salt-red font-semibold mb-1">
                    This doesn't look like salt
                  </p>
                  <p className="text-salt-sand/70 text-sm mb-4">
                    Our AI couldn't identify this as salt. Please upload a
                    clear photo of your harvested salt.
                  </p>
                  <button
                    onClick={resetImage}
                    className="w-full bg-salt-red/80 hover:bg-salt-red text-white font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Try Another Photo
                  </button>
                </div>
              )}

              {result && (
                <div className="bg-salt-card border border-salt-sand/10 rounded-2xl p-6 md:p-8 mt-4">
                  <p className="text-salt-sand/50 text-xs uppercase tracking-wide mb-1">
                    Grade
                  </p>
                  <p
                    className={
                      "font-display text-6xl font-semibold mb-2 " +
                      result.gradeColor
                    }
                  >
                    {result.grade}
                  </p>
                  <p className="text-salt-sand/60 text-sm mb-6">
                    {result.reason}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-salt-sand/70">Whiteness</span>
                        <span className="text-salt-sand">
                          {result.whitenessPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-salt-navy rounded-full h-2">
                        <div
                          className="bg-salt-teal h-2 rounded-full"
                          style={{ width: result.whitenessPercent + "%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-salt-sand/70">Uniformity</span>
                        <span className="text-salt-sand">
                          {result.uniformityPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-salt-navy rounded-full h-2">
                        <div
                          className="bg-salt-teal h-2 rounded-full"
                          style={{ width: result.uniformityPercent + "%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {result.needsLab && (
                    <p className="text-xs text-salt-amber bg-salt-amber/10 border border-salt-amber/20 rounded-xl p-3 mb-5">
                      Lab verification recommended for chemical/food buyers
                    </p>
                  )}

                  <button
                    onClick={goToPriceIndex}
                    className="w-full bg-salt-teal hover:bg-salt-tealDark text-salt-navy font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    See Fair Price
                  </button>
                </div>
              )}

              <button
                onClick={resetImage}
                className="text-salt-sand/50 text-sm underline mt-4 block mx-auto hover:text-salt-sand/80"
              >
                Upload a different photo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GradeSalt;