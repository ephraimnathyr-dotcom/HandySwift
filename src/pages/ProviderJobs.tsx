import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Clock, 
  CheckCircle2, 
  MapPin, 
  User,
  MessageSquare,
  XCircle,
  Calendar,
  Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";

export function ProviderJobs() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'requested';
  const [activeTab, setActiveTab] = useState<'requested' | 'ongoing' | 'completed' | 'cancelled'>(
    tabFromUrl as 'requested' | 'ongoing' | 'completed' | 'cancelled'
  );

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab as 'requested' | 'ongoing' | 'completed' | 'cancelled');
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'requested' | 'ongoing' | 'completed' | 'cancelled') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Mock jobs data - now using state
  // Requested jobs now includes both direct bookings and posted job requests
  const [requestedJobs, setRequestedJobs] = useState([
    // Direct Bookings
    {
      id: 1,
      service: "Plumbing Repair",
      client: "Kemi Adeyemi",
      location: "Victoria Island, Lagos",
      description: "Leaking kitchen sink needs urgent repair",
      postedDate: "2024-01-03",
      status: "New Request",
      type: "direct_booking", // New field to distinguish types
      preferredDate: "Jan 5, 2024",
      preferredTime: "10:00 AM",
      contactPhone: "+234 803 456 7890"
    },
    {
      id: 2,
      service: "Electrical Installation",
      client: "David Okafor",
      location: "Garki, Abuja",
      description: "Install ceiling fan and fix faulty outlets",
      postedDate: "2024-01-03",
      status: "New Request",
      type: "direct_booking",
      preferredDate: "Jan 6, 2024",
      preferredTime: "2:00 PM",
      contactPhone: "+234 805 123 4567"
    },
    // Posted Job Requests
    {
      id: 3,
      service: "Home Repair",
      client: "Amina Yusuf",
      location: "Ikeja, Lagos",
      description: "Fix broken door lock and cabinet hinges. Need someone reliable and experienced with carpentry work.",
      postedDate: "2024-01-02",
      status: "Offer Sent",
      type: "posted_job", // Posted job request
      budgetRange: "₦15,000 - ₦25,000",
      timeline: "Within 3 days",
      occasion: "Home maintenance"
    },
    {
      id: 4,
      service: "Carpentry Work",
      client: "Chidi Okeke",
      location: "Lekki, Lagos",
      description: "Custom wardrobe installation for master bedroom. Dimensions: 8ft x 6ft. Looking for experienced carpenter.",
      postedDate: "2024-01-01",
      status: "New Request",
      type: "posted_job",
      budgetRange: "₦50,000 - ₦80,000",
      timeline: "Within 1 week",
      occasion: "Home renovation"
    }
  ]);

  const [ongoingJobs, setOngoingJobs] = useState([
    {
      id: 5,
      service: "Home Repair",
      client: "Amina Yusuf",
      location: "Ikeja, Lagos",
      description: "Fix broken door lock and cabinet hinges",
      startDate: "2024-01-02",
      status: "In Progress"
    },
    {
      id: 6,
      service: "Carpentry Work",
      client: "Chidi Okeke",
      location: "Lekki, Lagos",
      description: "Custom wardrobe installation",
      startDate: "2024-01-01",
      status: "In Progress"
    }
  ]);

  const [completedJobs, setCompletedJobs] = useState([
    {
      id: 7,
      service: "Plumbing Services",
      client: "Grace Nnamdi",
      location: "Wuse, Abuja",
      description: "Fixed bathroom leakage and installed new taps",
      completedDate: "2023-12-30"
    },
    {
      id: 8,
      service: "Electrical Repair",
      client: "Fatima Ibrahim",
      location: "Surulere, Lagos",
      description: "Rewired faulty electrical sockets",
      completedDate: "2023-12-28"
    }
  ]);

  const cancelledJobs = [
    {
      id: 9,
      service: "Painting Services",
      client: "Tunde Balogun",
      location: "Ajah, Lagos",
      description: "Paint 3-bedroom apartment",
      cancelledDate: "2023-12-25",
      reason: "Client cancelled"
    }
  ];

  const handleMarkComplete = (jobId: number) => {
    const jobToComplete = ongoingJobs.find(job => job.id === jobId);
    if (jobToComplete) {
      // Remove from ongoing
      setOngoingJobs(ongoingJobs.filter(job => job.id !== jobId));
      // Add to completed
      const completedJob = {
        ...jobToComplete,
        completedDate: new Date().toISOString().split('T')[0]
      };
      setCompletedJobs([completedJob, ...completedJobs]);
      // Show success message
      alert('Job marked as complete!');
    }
  };

  const handleConfirmBooking = (jobId: number) => {
    const jobToConfirm = requestedJobs.find(job => job.id === jobId);
    if (jobToConfirm) {
      // Remove from requested
      setRequestedJobs(requestedJobs.filter(job => job.id !== jobId));
      // Add to ongoing with new status
      const ongoingJob = {
        id: jobToConfirm.id,
        service: jobToConfirm.service,
        client: jobToConfirm.client,
        location: jobToConfirm.location,
        description: jobToConfirm.description,
        startDate: new Date().toISOString().split('T')[0],
        status: "In Progress"
      };
      setOngoingJobs([ongoingJob, ...ongoingJobs]);
      // Show success message
      alert('Booking confirmed! The job has been moved to ongoing jobs.');
    }
  };

  const renderJobCard = (job: any, type: string) => (
    <div
      key={job.id}
      className="bg-white p-6 border border-slate-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-lg text-slate-900">{job.service}</h3>
            {type === 'requested' && job.type === 'direct_booking' && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                Direct Booking
              </span>
            )}
            {type === 'requested' && job.type === 'posted_job' && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full">
                Posted Job
              </span>
            )}
            {type === 'requested' && (
              <span className={`px-2 py-0.5 text-xs rounded-full ${
  job.status === 'New Request' 
    ? 'bg-green-50 text-green-700'
    : 'bg-blue-50 text-blue-700'
}`}>
                {job.status}
              </span>
            )}
            {type === 'ongoing' && (
              <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded-full">
                {job.status}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-3 text-sm flex-wrap">
            <div className="flex items-center gap-1 text-slate-600">
              <User className="w-4 h-4 text-slate-400" />
              {job.client}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400" />
              {job.location}
            </div>
          </div>

          <p className="text-slate-600 mb-3">{job.description}</p>

          {/* Show additional details for posted jobs */}
          {type === 'requested' && job.type === 'posted_job' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
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
          )}

          {/* Show preferred date/time for direct bookings */}
          {type === 'requested' && job.type === 'direct_booking' && job.preferredDate && (
            <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {job.preferredDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.preferredTime}
              </div>
            </div>
          )}

          <div className="flex items-center gap-1 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            {type === 'requested' && `Posted: ${job.postedDate}`}
            {type === 'ongoing' && `Started: ${job.startDate}`}
            {type === 'completed' && `Completed: ${job.completedDate}`}
            {type === 'cancelled' && `Cancelled: ${job.cancelledDate}`}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          {type === 'requested' && job.type === 'direct_booking' && (
            <>
              <Button
                onClick={() => handleConfirmBooking(job.id)}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto border-slate-300"
                onClick={() => navigate(`/provider-job-details/${job.id}`)}
              >
                View Details
              </Button>
            </>
          )}
          {type === 'requested' && job.type === 'posted_job' && (
            <>
              <Button
                onClick={() => navigate(`/send-offer/${job.id}`)}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
              >
                Send Offer
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto border-slate-300"
                onClick={() => navigate(`/provider-job-details/${job.id}`)}
              >
                View Details
              </Button>
            </>
          )}
          {type === 'ongoing' && (
            <>
              <Button
                onClick={() => navigate(`/messages`)}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message Client
              </Button>
              <Button
                variant="outline"
                className="w-full md:w-auto border-slate-300"
                onClick={() => handleMarkComplete(job.id)}
              >
                Mark Complete
              </Button>
            </>
          )}
          {type === 'completed' && (
            <>
              <Button
                variant="outline"
                className="w-full md:w-auto border-slate-300 whitespace-nowrap"
              >
                View Details
              </Button>
            </>
          )}
          {type === 'cancelled' && (
            <Button
              variant="outline"
              className="w-full md:w-auto border-slate-300"
            >
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-1.5 bg-secondary/20 rounded-full mb-4">
                <p className="text-sm text-white">Job Management</p>
              </div>
              <h1 className="text-4xl md:text-5xl text-white mb-4">
                My Jobs
              </h1>
              <p className="text-xl text-white/90">
                Track and manage all your job requests and bookings
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Tabs */}
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => handleTabChange('requested')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === 'requested'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Requested</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === 'requested'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {requestedJobs.length}
                </span>
              </button>

              <button
                onClick={() => handleTabChange('ongoing')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === 'ongoing'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Ongoing</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === 'ongoing'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {ongoingJobs.length}
                </span>
              </button>

              <button
                onClick={() => handleTabChange('completed')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === 'completed'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === 'completed'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {completedJobs.length}
                </span>
              </button>

              <button
                onClick={() => handleTabChange('cancelled')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === 'cancelled'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>Cancelled</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === 'cancelled'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {cancelledJobs.length}
                </span>
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {activeTab === 'requested' && requestedJobs.map(job => renderJobCard(job, 'requested'))}
            {activeTab === 'ongoing' && ongoingJobs.map(job => renderJobCard(job, 'ongoing'))}
            {activeTab === 'completed' && completedJobs.map(job => renderJobCard(job, 'completed'))}
            {activeTab === 'cancelled' && cancelledJobs.map(job => renderJobCard(job, 'cancelled'))}
          </div>

          {/* Empty State */}
          {((activeTab === 'requested' && requestedJobs.length === 0) ||
            (activeTab === 'ongoing' && ongoingJobs.length === 0) ||
            (activeTab === 'completed' && completedJobs.length === 0) ||
            (activeTab === 'cancelled' && cancelledJobs.length === 0)) && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-2">No jobs found</h3>
              <p className="text-slate-600 mb-6">
                You don't have any {activeTab} jobs at the moment.
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