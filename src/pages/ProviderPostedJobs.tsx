import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Clock,
  ArrowLeft,
  Briefcase,
  DollarSign
} from "lucide-react";

export function ProviderPostedJobs() {
  const navigate = useNavigate();

  // Mock posted job requests - jobs users paid to post
  const postedJobRequests = [
    {
      id: 3,
      service: "Home Repair",
      location: "Ikeja, Lagos",
      description: "Fix broken door lock and cabinet hinges. Need someone reliable and experienced with carpentry work. The door lock is completely broken and needs replacement.",
      postedTime: "1 day ago",
      clientName: "Amina Yusuf",
      budgetRange: "₦15,000 - ₦25,000",
      timeline: "Within 3 days",
      occasion: "Home maintenance"
    },
    {
      id: 4,
      service: "Carpentry Work",
      location: "Lekki, Lagos",
      description: "Custom wardrobe installation for master bedroom. Dimensions: 8ft x 6ft. Looking for experienced carpenter with portfolio of previous work.",
      postedTime: "2 days ago",
      clientName: "Chidi Okeke",
      budgetRange: "₦50,000 - ₦80,000",
      timeline: "Within 1 week",
      occasion: "Home renovation"
    },
    {
      id: 5,
      service: "Painting Services",
      location: "Surulere, Lagos",
      description: "Paint entire 3-bedroom flat. Walls are in good condition, just need fresh paint. Prefer neutral colors.",
      postedTime: "3 days ago",
      clientName: "Tunde Balogun",
      budgetRange: "₦80,000 - ₦120,000",
      timeline: "Within 2 weeks",
      occasion: "Moving to new apartment"
    },
    {
      id: 6,
      service: "Electrical Repair",
      location: "Yaba, Lagos",
      description: "Fix faulty wiring in kitchen and install new power outlets. Experienced electrician needed urgently.",
      postedTime: "4 days ago",
      clientName: "Ngozi Obi",
      budgetRange: "₦20,000 - ₦35,000",
      timeline: "ASAP",
      occasion: "Electrical emergency"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate('/provider-dashboard')}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-1.5 bg-secondary/20 rounded-full mb-4">
                <p className="text-sm text-white">Available Opportunities</p>
              </div>
              <h1 className="text-4xl md:text-5xl text-white mb-4">
                Posted Job Requests
              </h1>
              <p className="text-xl text-white/90">
                Browse jobs posted by customers and send your offers
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Stats Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Available Job Requests</p>
                <p className="text-3xl text-slate-900">{postedJobRequests.length}</p>
              </div>
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Posted Job Requests List */}
          <div className="space-y-4">
            {postedJobRequests.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 border border-slate-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl text-slate-900">{job.service}</h3>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full">
                        Posted Job
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <div className="flex items-center gap-1 text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 text-sm">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {job.postedTime}
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 leading-relaxed">{job.description}</p>
                    
                    {/* Job Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <div className="bg-slate-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-slate-500 mb-0.5">Budget Range</p>
                        <p className="text-sm text-slate-900 font-medium">{job.budgetRange}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-slate-500 mb-0.5">Timeline</p>
                        <p className="text-sm text-slate-900 font-medium">{job.timeline}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-slate-500 mb-0.5">Occasion</p>
                        <p className="text-sm text-slate-900 font-medium">{job.occasion}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500">Posted by {job.clientName}</p>
                  </div>

                  <div className="flex flex-col gap-2 w-full lg:w-auto">
                    <Button
                      onClick={() => navigate(`/send-offer/${job.id}`)}
                      className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white"
                    >
                      Send Offer
                    </Button>
                    <Button
                      onClick={() => navigate(`/provider-job-details/${job.id}`)}
                      variant="outline"
                      className="w-full lg:w-auto border-slate-300 hover:bg-slate-50"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {postedJobRequests.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-2">No job requests available</h3>
              <p className="text-slate-600 mb-6">
                There are no posted job requests at the moment. Check back later!
              </p>
              <Button
                onClick={() => navigate('/provider-dashboard')}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
