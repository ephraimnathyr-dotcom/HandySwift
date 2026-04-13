import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ChevronLeft, FileText, Users, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PostJob() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-24 pb-12 border-b border-slate-100">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 hover:text-primary mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl text-slate-900 mb-4">
                Post Your Job
              </h1>
              <p className="text-xl text-slate-600">
                Get competitive offers from verified professionals in minutes
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-slate-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-600">
                Three simple steps to get your job done
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Connecting line - positioned behind the numbered circles */}
              <div className="absolute top-[118px] left-0 right-0 h-0.5 bg-slate-200 hidden md:block" style={{ left: 'calc(50% / 3)', right: 'calc(50% / 3)' }}></div>
              
              {/* Step 1 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <FileText className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="relative bg-white px-4">
                    <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm relative z-10">
                      1
                    </div>
                    <h3 className="text-xl text-slate-900 mb-3">Describe Your Job</h3>
                    <p className="text-slate-600">
                      Tell us what you need done, your budget, and timeline
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Users className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="relative bg-white px-4">
                    <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm relative z-10">
                      2
                    </div>
                    <h3 className="text-xl text-slate-900 mb-3">Receive Offers</h3>
                    <p className="text-slate-600">
                      Verified professionals will send you competitive offers
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="relative bg-white px-4">
                    <div className="w-8 h-8 bg-slate-700 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm relative z-10">
                      3
                    </div>
                    <h3 className="text-xl text-slate-900 mb-3">Choose Your Provider</h3>
                    <p className="text-slate-600">
                      Review offers and select the best professional for your job
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Post Your Job Form */}
          <div className="max-w-3xl mx-auto mb-8">
            {/* Pricing Notice */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg text-slate-900 mb-1">Job Posting Fee: ₦500</h3>
                <p className="text-slate-600 text-sm">
                  A one-time fee of ₦500 is required to post your job. This helps us maintain quality and ensures serious job postings for our verified professionals.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl text-slate-900 mb-6">Job Details</h2>
              
              <form className="space-y-6">
                {/* Job Title */}
                <div>
                  <Label htmlFor="jobTitle" className="text-slate-900 mb-2 block">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Fix leaking pipe in kitchen"
                    className="w-full h-12 rounded-xl border-slate-300"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-slate-900 mb-2 block">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="category"
                    className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select a category</option>
                    <option value="home">Home Services</option>
                    <option value="technical">Technical Repairs</option>
                    <option value="automotive">Automotive</option>
                    <option value="trades">Specialized Trades</option>
                    <option value="health">Health & Wellness</option>
                    <option value="security">Security & Maintenance</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-slate-900 mb-2 block">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you need done, any specific requirements, and relevant details..."
                    className="min-h-32 rounded-xl border-slate-300"
                  />
                </div>

                {/* Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budgetMin" className="text-slate-900 mb-2 block">
                      Minimum Budget (₦) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="budgetMin"
                      type="number"
                      placeholder="e.g., 5000"
                      className="w-full h-12 rounded-xl border-slate-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="budgetMax" className="text-slate-900 mb-2 block">
                      Maximum Budget (₦) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="budgetMax"
                      type="number"
                      placeholder="e.g., 15000"
                      className="w-full h-12 rounded-xl border-slate-300"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <Label htmlFor="timeline" className="text-slate-900 mb-2 block">
                    Timeline <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="timeline"
                    className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (within 24 hours)</option>
                    <option value="week">Within a week</option>
                    <option value="month">Within a month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-slate-900 mb-2 block">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Victoria Island, Lagos"
                    className="w-full h-12 rounded-xl border-slate-300"
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
                      className="w-full h-12 rounded-xl border-slate-300"
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
                      className="w-full h-12 rounded-xl border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-900 mb-2 block">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-12 rounded-xl border-slate-300"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Submit Button */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="px-8 py-6 rounded-xl border-2 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Post Job
              </Button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-6">
              By posting a job, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}