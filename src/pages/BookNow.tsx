import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Shield,
  Calendar as CalendarIcon,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export function BookNow() {
  const navigate = useNavigate();
  const location = useLocation();
  const provider = location.state?.provider;
  const [selectedDateTime, setSelectedDateTime] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("09:00");

  // Default provider data if none is passed
  const defaultProvider = {
    id: 1,
    name: "Adebayo Ogundimu",
    verified: true,
    service: "Home Repairs & Maintenance",
    rating: 4.9,
    reviewCount: 127,
    location: "Lagos",
    price: "₦3,000",
    image: "https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NjE2MDcwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    yearsExperience: 8,
    completedJobs: 450,
    responseTime: "Within 2 hours"
  };

  const currentProvider = {
    ...defaultProvider,
    ...provider
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking request sent successfully! The provider will confirm shortly.");
    navigate('/dashboard');
  };

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Header */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <button
              onClick={() => navigate(`/provider/${currentProvider.id}`, { state: { provider: currentProvider } })}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Provider</span>
            </button>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl text-white mb-4">
                Book {currentProvider.name}
              </h1>
              <p className="text-xl text-white/90">
                Fill in the details to request this service
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-8 pb-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl text-slate-900 mb-6">Booking Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Description */}
                  <div>
                    <Label htmlFor="serviceDescription" className="text-slate-900 mb-2 block">
                      Service Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      placeholder="Describe what you need done..."
                      className="min-h-32 rounded-xl border-slate-300"
                      required
                    />
                  </div>

                  {/* Date and Time */}
                  <div>
                    <Label htmlFor="datetime" className="text-slate-900 mb-2 block">
                      Preferred Date & Time <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 rounded-xl border-slate-300 justify-start text-left font-normal hover:bg-slate-50"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDateTime && selectedTime
                            ? `${format(selectedDateTime, "PPP")} at ${selectedTime}`
                            : <span className="text-slate-500">Pick a date and time</span>
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 border-b border-slate-200 bg-slate-50">
                          <h4 className="text-sm font-medium text-slate-900">Select Date & Time</h4>
                        </div>
                        <div className="p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDateTime}
                            onSelect={setSelectedDateTime}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </div>
                        <div className="p-3 border-t border-slate-200">
                          <Label className="text-xs text-slate-600 mb-2 block">Select Time</Label>
                          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                            {timeSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`px-2 py-1.5 text-xs rounded-lg border transition-all ${
                                  selectedTime === time
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-primary/50'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location" className="text-slate-900 mb-2 block">
                      Service Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter your address"
                      className="h-12 rounded-xl border-slate-300"
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-900 mb-2 block">
                        Your Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Full name"
                        className="h-12 rounded-xl border-slate-300"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-slate-900 mb-2 block">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+234 xxx xxx xxxx"
                        className="h-12 rounded-xl border-slate-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label htmlFor="notes" className="text-slate-900 mb-2 block">
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requirements or additional information..."
                      className="min-h-24 rounded-xl border-slate-300"
                    />
                  </div>

                  {/* Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Booking Information</p>
                      <p className="text-blue-800">
                        This is a booking request. The provider will review your details and confirm the booking. 
                        Final pricing will be negotiated directly with the provider.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => navigate(`/provider/${currentProvider.id}`, { state: { provider: currentProvider } })}
                      variant="outline"
                      className="flex-1 h-12 rounded-xl border-slate-300 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      Send Booking Request
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Provider Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h3 className="text-lg text-slate-900 mb-4">Provider Details</h3>
                  
                  {/* Provider Info */}
                  <div className="flex items-start gap-4 mb-6 pb-6 border-b border-slate-100">
                    <ImageWithFallback
                      src={currentProvider.image}
                      alt={currentProvider.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-slate-900">{currentProvider.name}</h4>
                        {currentProvider.verified && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{currentProvider.service}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-slate-900">{currentProvider.rating}</span>
                        </div>
                        <span className="text-sm text-slate-500">({currentProvider.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">Starting from</p>
                    <p className="text-3xl text-slate-900">{currentProvider.price}</p>
                  </div>

                  {/* Key Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-slate-900">{currentProvider.location}</p>
                        <p className="text-slate-500 text-xs">Location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-slate-900">{currentProvider.completedJobs}+ jobs</p>
                        <p className="text-slate-500 text-xs">Completed</p>
                      </div>
                    </div>
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