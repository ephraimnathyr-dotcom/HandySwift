import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { 
  Star, 
  MapPin, 
  CheckCircle2,
  Upload,
  Plus,
  X,
  Briefcase,
  Award,
  Clock,
  TrendingUp,
  Camera
} from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ProviderProfileEdit() {
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock provider data
  const providerData = {
    name: "Adebayo Ogundimu",
    photo: "https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NjE2MDcwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviewCount: 127,
    jobsCompleted: 127,
    yearsExperience: 8,
    responseRate: 95,
    location: "Lagos, Nigeria",
    priceRange: "₦20,000 - ₦50,000",
    services: ["Plumbing", "Electrical Work", "Carpentry", "General Home Repairs"],
    certifications: ["Licensed Plumber", "Electrical Safety Certificate"],
    about: "Professional handyman with over 8 years of experience in home repairs and maintenance. Committed to delivering quality workmanship and excellent customer service.",
    portfolio: [
      "https://images.unsplash.com/photo-1635221798248-8a3452ad07cd?w=400",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400"
    ]
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-1.5 bg-secondary/20 rounded-full mb-4">
                <p className="text-sm text-white">Profile Management</p>
              </div>
              <h1 className="text-4xl md:text-5xl text-white mb-4">
                Edit Your Profile
              </h1>
              <p className="text-xl text-white/90">
                Keep your profile updated to attract more clients
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Profile Stats Overview */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-2xl text-slate-900">{providerData.rating}</span>
                  </div>
                  <p className="text-sm text-slate-600">Rating</p>
                  <p className="text-xs text-slate-500">{providerData.reviewCount} reviews</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-1" />
                    <span className="text-2xl text-slate-900">{providerData.jobsCompleted}</span>
                  </div>
                  <p className="text-sm text-slate-600">Jobs Done</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="text-2xl text-slate-900">{providerData.yearsExperience}</span>
                  </div>
                  <p className="text-sm text-slate-600">Years Exp.</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-600 mr-1" />
                    <span className="text-2xl text-slate-900">{providerData.responseRate}%</span>
                  </div>
                  <p className="text-sm text-slate-600">Response</p>
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-6">Profile Photo</h2>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <img
                    src={providerData.photo}
                    alt={providerData.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-slate-200"
                  />
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-slate-900 mb-2">Upload a professional photo</p>
                  <p className="text-sm text-slate-600 mb-4">
                    A clear photo helps clients trust you more. JPG or PNG, max 5MB.
                  </p>
                  <Button variant="outline" className="border-slate-300">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-6">Basic Information</h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    defaultValue={providerData.name}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    defaultValue={providerData.location}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    type="number"
                    defaultValue={providerData.yearsExperience}
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-2">Pricing</h2>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  Set a price range for your services. Final pricing is agreed between you and the client directly.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="minPrice">Minimum Price (₦) *</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    defaultValue="20000"
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice">Maximum Price (₦) *</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    defaultValue="50000"
                    className="mt-2 h-12 rounded-xl"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                No in-app payments. All pricing is negotiated directly with clients.
              </p>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-6">About Me</h2>
              <div>
                <Label htmlFor="about">Professional Summary *</Label>
                <Textarea
                  id="about"
                  defaultValue={providerData.about}
                  rows={5}
                  className="mt-2 rounded-xl resize-none"
                  placeholder="Tell clients about your experience, skills, and what makes you unique..."
                />
                <p className="text-sm text-slate-500 mt-2">
                  This appears at the top of your profile. Make it compelling!
                </p>
              </div>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-6">Services Offered</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {providerData.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl"
                  >
                    <span>{service}</span>
                    <button className="hover:bg-primary/20 rounded-full p-1 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="border-slate-300">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-6">Certifications</h2>
              <div className="space-y-3 mb-4">
                {providerData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <span className="text-slate-900">{cert}</span>
                    </div>
                    <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="border-slate-300">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </div>

            {/* Portfolio */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <h2 className="text-2xl text-slate-900 mb-6">Portfolio</h2>
              <p className="text-slate-600 mb-6">
                Showcase your best work to attract more clients
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {providerData.portfolio.map((image, index) => (
                  <div key={index} className="relative group">
                    <ImageWithFallback
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="border-slate-300">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </div>

            {/* Availability Toggle */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl text-slate-900 mb-2">Availability Status</h2>
                  <p className="text-slate-600">
                    Turn off if you're not accepting new jobs
                  </p>
                </div>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative w-16 h-8 rounded-full transition-colors ${
                    isAvailable ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      isAvailable ? 'translate-x-8' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => navigate('/provider-dashboard')}
                variant="outline"
                className="flex-1 h-12 border-slate-300 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Save logic here
                  navigate('/provider-dashboard');
                }}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
