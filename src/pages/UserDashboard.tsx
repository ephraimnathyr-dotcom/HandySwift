import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, Crown, Edit, Settings, Star, Calendar, CheckCircle2, 
  XCircle, Clock, MessageSquare, FileText, Users, Copy,
  Shield, Key, Bell, Trash2, Zap, Gift, TrendingUp, X
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import userPhoto from 'figma:asset/2a28796b137397043b571617798c141af8759769.png';
import { useState, useEffect } from "react";

interface Booking {
  id: number;
  service: string;
  provider: string;
  date: string;
  time: string;
  price: string;
  status: 'ongoing' | 'completed' | 'cancelled';
  providerImage: string;
}

interface Job {
  id: number;
  title: string;
  category: string;
  budget: string;
  offers: number;
  postedDate: string;
  status: 'active' | 'closed';
}

const mockBookings: Booking[] = [
  {
    id: 1,
    service: "Plumbing Repair",
    provider: "Adebayo Ogundimu",
    date: "Nov 8, 2025",
    time: "10:00 AM",
    price: "₦3,000",
    status: "ongoing",
    providerImage: "https://images.unsplash.com/photo-1740754699699-c8b4b1635faf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5keW1hbiUyMHdvcmtlcnxlbnwxfHx8fDE3NjE2MDcwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    service: "House Cleaning",
    provider: "Fatima Aliyu",
    date: "Nov 2, 2025",
    time: "2:00 PM",
    price: "₦5,000",
    status: "completed",
    providerImage: "https://images.unsplash.com/photo-1679137315174-ff25263f2e1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmVyJTIwc2VydmljZXxlbnwxfHx8fDE3NjE2MDcwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    service: "Electrical Installation",
    provider: "Yusuf Mohammed",
    date: "Oct 25, 2025",
    time: "11:00 AM",
    price: "₦6,500",
    status: "cancelled",
    providerImage: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHByb2Zlc3Npb25hbCUyMHdvcmtlcnxlbnwxfHx8fDE3NjE2MDcwNTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

// Mock pending bookings (waiting for provider confirmation)
const mockPendingBookings = [
  {
    id: 4,
    service: "AC Repair",
    provider: "Ibrahim Musa",
    date: "Nov 12, 2025",
    time: "3:00 PM",
    price: "₦4,500",
    providerImage: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobmljaWFuJTIwd29ya2VyfGVufDF8fHx8MTc2MTYwNzA1NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 5,
    service: "Painting Services",
    provider: "Ngozi Okafor",
    date: "Nov 15, 2025",
    time: "9:00 AM",
    price: "₦8,000",
    providerImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwd29ya2VyfGVufDF8fHx8MTc2MTYwNzA1NHww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Need a carpenter for furniture assembly",
    category: "Carpentry",
    budget: "₦15,000",
    offers: 5,
    postedDate: "3 days ago",
    status: "active"
  },
  {
    id: 2,
    title: "AC repair needed urgently",
    category: "Technical Repairs",
    budget: "₦10,000",
    offers: 8,
    postedDate: "1 week ago",
    status: "closed"
  }
];

export function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewAnonymous, setReviewAnonymous] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Don't render if no user
  if (!user) {
    return null;
  }

  const referralLink = `https://handyswift.ng/ref/${user.username}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleOpenReviewModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewModalOpen(true);
    setReviewRating(0);
    setReviewText("");
    setReviewAnonymous(false);
  };

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedBooking(null);
    setReviewRating(0);
    setReviewText("");
    setReviewAnonymous(false);
  };

  const handleSubmitReview = () => {
    if (reviewRating === 0) {
      alert("Please select a rating");
      return;
    }
    if (reviewText.trim() === "") {
      alert("Please write a review");
      return;
    }
    
    // In a real app, this would submit to an API
    const reviewerName = reviewAnonymous ? "Anonymous" : user.username;
    alert(`Review submitted!\nRating: ${reviewRating} stars\nReview: ${reviewText}\nPosted as: ${reviewerName}`);
    handleCloseReviewModal();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'active': return 'text-green-600 bg-green-50';
      case 'closed': return 'text-slate-600 bg-slate-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <div className="pt-20 min-h-screen bg-slate-50">
          <div className="container mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Photo */}
                <div className="relative">
                  <img 
                    src={userPhoto} 
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-200"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl text-slate-900">{user.name}</h1>
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                      user.membershipType === 'Premium' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {user.membershipType === 'Premium' && <Crown className="w-4 h-4" />}
                      <span className="text-sm">{user.membershipType}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">{user.email}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    {user.membershipType === 'Free' && (
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-xl">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Premium
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl text-primary mb-1">12</div>
                    <div className="text-xs text-slate-600">Bookings</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 rounded-xl">
                    <div className="text-2xl text-black mb-1">2</div>
                    <div className="text-xs text-slate-600">Jobs Posted</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Pending Bookings Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl text-slate-900 mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-amber-600" />
                    Pending Bookings
                  </h2>
                  <p className="text-sm text-slate-600 mb-6">
                    Bookings waiting for provider confirmation
                  </p>

                  <div className="space-y-4">
                    {mockPendingBookings.map((booking) => (
                      <div key={booking.id} className="border border-amber-200 bg-amber-50/30 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <ImageWithFallback
                            src={booking.providerImage}
                            alt={booking.provider}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg text-slate-900 mb-1">{booking.service}</h3>
                                <p className="text-sm text-slate-600">{booking.provider}</p>
                              </div>
                              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700">
                                <Clock className="w-4 h-4" />
                                <span>Pending</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {booking.time}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg">
                                View Details
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg text-red-600 hover:text-red-700 border-red-200">
                                Cancel Request
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {mockPendingBookings.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Clock className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <p>No pending bookings</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* My Booked Jobs Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    My Booked Jobs
                  </h2>
                  <p className="text-sm text-slate-600 mb-6">
                    Direct bookings with providers that have been confirmed
                  </p>
                  
                  <Tabs defaultValue="ongoing" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="ongoing" className="space-y-4">
                      {mockBookings.filter(b => b.status === 'ongoing').map(booking => (
                        <div key={booking.id} className="border border-slate-200 rounded-xl p-4 hover:border-primary transition-colors">
                          <div className="flex items-start gap-4">
                            <ImageWithFallback
                              src={booking.providerImage}
                              alt={booking.provider}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg text-slate-900 mb-1">{booking.service}</h3>
                                  <p className="text-sm text-slate-600">{booking.provider}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="capitalize">{booking.status}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {booking.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {booking.time}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="rounded-lg">
                                  <MessageSquare className="w-4 h-4 mr-1" />
                                  Message
                                </Button>
                                <Button size="sm" variant="outline" className="rounded-lg text-red-600 hover:text-red-700">
                                  Cancel Booking
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                      {mockBookings.filter(b => b.status === 'completed').map(booking => (
                        <div key={booking.id} className="border border-slate-200 rounded-xl p-4">
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            <ImageWithFallback
                              src={booking.providerImage}
                              alt={booking.provider}
                              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="flex-1 w-full">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg text-slate-900 mb-1">{booking.service}</h3>
                                  <p className="text-sm text-slate-600">{booking.provider}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="capitalize">{booking.status}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                <span>{booking.date}</span>
                              </div>
                              <Button size="sm" className="rounded-lg bg-primary hover:bg-primary/90 w-full sm:w-auto" onClick={() => handleOpenReviewModal(booking)}>
                                <Star className="w-4 h-4 mr-1" />
                                Leave Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="cancelled" className="space-y-4">
                      {mockBookings.filter(b => b.status === 'cancelled').map(booking => (
                        <div key={booking.id} className="border border-slate-200 rounded-xl p-4 opacity-75">
                          <div className="flex items-start gap-4">
                            <ImageWithFallback
                              src={booking.providerImage}
                              alt={booking.provider}
                              className="w-16 h-16 rounded-xl object-cover grayscale"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-lg text-slate-900 mb-1">{booking.service}</h3>
                                  <p className="text-sm text-slate-600">{booking.provider}</p>
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                                  {getStatusIcon(booking.status)}
                                  <span className="capitalize">{booking.status}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-500">{booking.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Posted Jobs Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl text-slate-900 flex items-center gap-2">
                      <FileText className="w-6 h-6 text-primary" />
                      My Posted Jobs
                    </h2>
                    <Button onClick={() => navigate('/post-job')} className="rounded-xl bg-primary hover:bg-primary/90">
                      Post New Job
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600 mb-6">
                    Jobs you've paid to post — view and compare offers from providers
                  </p>

                  <div className="space-y-4">
                    {mockJobs.map(job => (
                      <div key={job.id} className="border border-slate-200 rounded-xl p-4 hover:border-primary transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg text-slate-900 mb-2">{job.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <span>{job.category}</span>
                              <span>•</span>
                              <span className="text-primary">{job.budget}</span>
                            </div>
                          </div>
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
                            <span className="capitalize">{job.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{job.offers} offers received</span>
                            <span>•</span>
                            <span>{job.postedDate}</span>
                          </div>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            View Offers
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl text-slate-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900">Booking completed with Fatima Aliyu</p>
                        <p className="text-sm text-slate-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900">New message from Adebayo Ogundimu</p>
                        <p className="text-sm text-slate-500">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-900">You posted a new job</p>
                        <p className="text-sm text-slate-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Premium Upgrade */}
                {user.membershipType === 'Free' && (
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-6 h-6" />
                      <h3 className="text-xl">HandySwift Premium</h3>
                    </div>
                    <p className="text-white/90 mb-4 text-sm">
                      Unlock exclusive benefits and features with Premium membership
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Unlimited job postings</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Priority customer support</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Verified badge on profile</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Access to top-rated providers</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-white text-yellow-600 hover:bg-white/90 rounded-xl">
                      Upgrade Now - ₦3,000/month
                    </Button>
                  </div>
                )}

                {/* Referral Program */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-6 h-6 text-primary" />
                    <h3 className="text-xl text-slate-900">Invite & Earn</h3>
                  </div>
                  <p className="text-slate-600 mb-4 text-sm">
                    Invite at least 5 friends and get <span className="text-primary">10% off</span> your Premium plan!
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <p className="text-xs text-slate-500 mb-2">Your Referral Link:</p>
                    <p className="text-sm text-slate-900 break-all mb-3">{referralLink}</p>
                    <Button 
                      onClick={handleCopyReferral}
                      className="w-full rounded-lg"
                      variant="outline"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedReferral ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <span className="text-sm text-slate-700">Friends referred:</span>
                    <span className="text-primary">0 / 5</span>
                  </div>
                </div>

                {/* Settings & Account */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-xl text-slate-900 mb-4">Settings & Account</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Settings className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Account Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Bell className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Key className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Change Password</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left">
                      <Shield className="w-5 h-5 text-slate-600" />
                      <span className="text-slate-900">Privacy & Security</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left text-red-600">
                      <Trash2 className="w-5 h-5" />
                      <span>Deactivate Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        {/* Review Modal */}
        {reviewModalOpen && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={handleCloseReviewModal}>
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-2xl text-slate-900">Leave a Review</h2>
                <button
                  onClick={handleCloseReviewModal}
                  className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Provider Info */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <ImageWithFallback
                    src={selectedBooking.providerImage}
                    alt={selectedBooking.provider}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg text-slate-900">{selectedBooking.provider}</h3>
                    <p className="text-sm text-slate-600">{selectedBooking.service}</p>
                  </div>
                </div>

                {/* Rating Selection */}
                <div>
                  <label className="block text-slate-900 mb-3">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setReviewRating(rating)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            rating <= reviewRating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {reviewRating > 0 && (
                    <p className="text-sm text-slate-600 mt-2">
                      {reviewRating} {reviewRating === 1 ? "star" : "stars"} selected
                    </p>
                  )}
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="reviewText" className="block text-slate-900 mb-2">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this provider..."
                    className="min-h-32 rounded-xl border-slate-300"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    {reviewText.length} / 500 characters
                  </p>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={reviewAnonymous}
                    onChange={(e) => setReviewAnonymous(e.target.checked)}
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary focus:ring-2"
                  />
                  <label className="text-sm text-slate-600">Post anonymously</label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={handleCloseReviewModal}
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}