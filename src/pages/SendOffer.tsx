import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

export function SendOffer() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [message, setMessage] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the offer to the backend
    alert("Offer sent successfully!");
    navigate("/provider-dashboard");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Header */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate("/provider-dashboard")}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl text-white mb-4">
                Send Your Offer
              </h1>
              <p className="text-xl text-white/90">
                Submit your offer for this job request
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-8 pb-16">
          <div className="max-w-3xl mx-auto">
            {/* Offer Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Message/Note Section */}
                <div>
                  <Label htmlFor="message" className="text-slate-900 mb-2 block">
                    Your Message <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-slate-600 mb-3">
                    Introduce yourself and explain your approach to this job
                  </p>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Hello! I have over 10 years of experience in plumbing repairs. I can assess the issue and provide a detailed quote. I'm available this week..."
                    className="w-full min-h-[150px] p-4 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    required
                  />
                </div>

                {/* Offer Price Section */}
                <div>
                  <Label className="text-slate-900 mb-2 block">
                    Your Offer Price <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-slate-600 mb-3">
                    Enter your offer amount for this job
                  </p>
                  
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₦</span>
                    <Input
                      id="offerPrice"
                      type="number"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="e.g., 15000"
                      className="pl-8 h-12 rounded-xl border-slate-300 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Enter the total amount you're offering for this service
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={() => navigate("/provider-dashboard")}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl border-slate-300 hover:bg-slate-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Offer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}