import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  MapPin, 
  User,
  Calendar,
  Clock,
  ArrowLeft,
  XCircle
} from "lucide-react";

export function ProviderJobBookings() {
  const navigate = useNavigate();

  // Mock job bookings data - direct bookings from users
  const jobBookings = [
    {
      id: 1,
      service: "Plumbing Repair",
      customerName: "Kemi Adeyemi",
      location: "Victoria Island, Lagos",
      description: "Leaking kitchen sink needs urgent repair",
      preferredDate: "Jan 5, 2024",
      preferredTime: "10:00 AM",
      contactPhone: "+234 803 456 7890",
      status: "pending"
    },
    {
      id: 2,
      service: "Electrical Installation",
      customerName: "David Okafor",
      location: "Garki, Abuja",
      description: "Install ceiling fan and fix faulty outlets",
      preferredDate: "Jan 6, 2024",
      preferredTime: "2:00 PM",
      contactPhone: "+234 805 123 4567",
      status: "pending"
    },
    {
      id: 3,
      service: "Home Maintenance",
      customerName: "Chioma Eze",
      location: "Lekki, Lagos",
      description: "Fix broken door handle and paint touch-ups",
      preferredDate: "Jan 7, 2024",
      preferredTime: "11:00 AM",
      contactPhone: "+234 807 890 1234",
      status: "pending"
    }
  ];

  const handleConfirmBooking = (jobId: number) => {
    alert('Booking confirmed! The customer will be notified.');
  };

  const handleDeclineBooking = (jobId: number) => {
    alert('Booking declined. The customer will be notified.');
  };

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
                <p className="text-sm text-white">Direct Bookings</p>
              </div>
              <h1 className="text-4xl md:text-5xl text-white mb-4">
                Job Bookings
              </h1>
              <p className="text-xl text-white/90">
                Manage direct booking requests from customers
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Warning Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-amber-700 text-xl">💡</span>
            </div>
            <div>
              <p className="text-amber-900 font-medium mb-1">Booking Tip</p>
              <p className="text-amber-800 text-sm leading-relaxed">
                Avoid accepting too many jobs at once to prevent overbooking and schedule clashes. Only accept what you can comfortably handle.
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Pending Bookings</p>
                <p className="text-3xl text-slate-900">{jobBookings.length}</p>
              </div>
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Job Bookings List */}
          <div className="space-y-4">
            {jobBookings.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 border border-slate-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl text-slate-900">{job.service}</h3>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full">
                        Direct Booking
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <div className="flex items-center gap-1 text-slate-600 text-sm">
                        <User className="w-4 h-4 text-slate-400" />
                        {job.customerName}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 leading-relaxed">{job.description}</p>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{job.preferredDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.preferredTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full lg:w-auto">
                    <Button
                      onClick={() => handleConfirmBooking(job.id)}
                      className="w-full lg:w-auto bg-primary hover:bg-primary/90 text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Confirm Booking
                    </Button>
                    <Button
                      onClick={() => handleDeclineBooking(job.id)}
                      variant="outline"
                      className="w-full lg:w-auto border-slate-300 hover:bg-slate-50"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline Booking
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full lg:w-auto text-slate-600 hover:text-primary"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Booking Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-1">Service</h4>
                            <p className="text-slate-900">{job.service}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-1">Customer Name</h4>
                            <p className="text-slate-900">{job.customerName}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-1">Contact Phone</h4>
                            <p className="text-slate-900">{job.contactPhone}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-1">Location</h4>
                            <p className="text-slate-900">{job.location}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-1">Description</h4>
                            <p className="text-slate-900 leading-relaxed">{job.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-slate-500 mb-1">Preferred Date</h4>
                              <p className="text-slate-900">{job.preferredDate}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-slate-500 mb-1">Preferred Time</h4>
                              <p className="text-slate-900">{job.preferredTime}</p>
                            </div>
                          </div>
                          <div className="pt-4 border-t border-slate-200 flex gap-2">
                            <Button
                              onClick={() => handleConfirmBooking(job.id)}
                              className="flex-1 bg-primary hover:bg-primary/90 text-white"
                            >
                              Confirm Booking
                            </Button>
                            <Button
                              onClick={() => handleDeclineBooking(job.id)}
                              variant="outline"
                              className="flex-1 border-slate-300"
                            >
                              Decline Booking
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {jobBookings.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl text-slate-900 mb-2">No bookings yet</h3>
              <p className="text-slate-600 mb-6">
                You don't have any pending booking requests at the moment.
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