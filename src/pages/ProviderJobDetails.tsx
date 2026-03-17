import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, DollarSign, Briefcase, Send, User } from "lucide-react";

export function ProviderJobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  // Mock job data - in real app, this would be fetched based on jobId
  const job = {
    id: jobId,
    title: "Kitchen Plumbing Repair Needed",
    category: "Plumbing",
    description: "My kitchen sink has been leaking for the past few days. The leak appears to be coming from underneath the sink. I need a professional plumber to come assess the situation and fix the issue. The leak is getting worse and I'm concerned about water damage.",
    location: "Ikeja, Lagos",
    budgetMin: 10000,
    budgetMax: 25000,
    datePosted: "2 hours ago",
    status: "Open",
    clientName: "Chioma A.",
    urgency: "Medium",
    additionalInfo: "Preferably looking for someone who can come within the next 2-3 days. I have pets at home, so please be mindful."
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
              <span>Back to Job Requests</span>
            </button>
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-green-500/20 text-green-100 text-sm rounded-full border border-green-400/30">
                  {job.status}
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-100 text-sm rounded-full border border-yellow-400/30">
                  {job.urgency} Priority
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl text-white mb-3">
                {job.title}
              </h1>
              <p className="text-lg text-white/90">
                Posted {job.datePosted} • {job.category}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Job Details - Main Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Job Description */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-2xl text-slate-900 mb-4">Job Description</h2>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {job.description}
                  </p>

                  {job.additionalInfo && (
                    <>
                      <h3 className="text-lg text-slate-900 mb-3">Additional Information</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {job.additionalInfo}
                      </p>
                    </>
                  )}
                </div>

                {/* Job Details Grid */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-2xl text-slate-900 mb-6">Job Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Category</p>
                        <p className="text-slate-900">{job.category}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Location</p>
                        <p className="text-slate-900">{job.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Budget Range</p>
                        <p className="text-slate-900">
                          ₦{job.budgetMin.toLocaleString()} - ₦{job.budgetMax.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Date Posted</p>
                        <p className="text-slate-900">{job.datePosted}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Posted By</p>
                        <p className="text-slate-900">{job.clientName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Status</p>
                        <p className="text-green-600">{job.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
                  <h3 className="text-lg text-slate-900 mb-4">Take Action</h3>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate(`/send-offer/${job.id}`)}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Offer
                    </Button>

                    <Button
                      onClick={() => navigate("/provider-dashboard")}
                      variant="outline"
                      className="w-full h-12 rounded-xl border-slate-300 hover:bg-slate-50"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Job Requests
                    </Button>
                  </div>

                  {/* Tips */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="text-sm text-blue-900 mb-2">💡 Tip</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Review the job details carefully and provide a competitive offer based on your experience and the client's budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
