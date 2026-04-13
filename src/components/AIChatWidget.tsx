import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string; services?: string[] }>>([
    { type: 'bot', text: "Hello! I'm your HandySwift assistant. Tell me what service you need, and I'll help you find the perfect professional. You can speak in English or Pidgin! 😊" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const serviceCategories = {
    plumbing: ["plumbing", "plumber", "pipe", "leak", "faucet", "tap", "toilet", "sink", "water", "drainage", "pipo", "water dey comot"],
    electrical: ["electrical", "electrician", "wiring", "socket", "power", "light", "electricity", "nepa", "gen", "generator", "light no dey work"],
    cleaning: ["cleaning", "cleaner", "clean", "wash", "sweep", "mop", "dirty", "mess", "house cleaning", "wan clean", "make you clean"],
    carpentry: ["carpentry", "carpenter", "wood", "furniture", "cabinet", "door", "window", "shelf", "wardrobe", "wood work"],
    painting: ["painting", "painter", "paint", "wall", "color", "brush", "wan paint", "colour"],
    repairs: ["repair", "fix", "broken", "damage", "spoil", "e don spoil", "wan fix"],
    moving: ["moving", "mover", "relocation", "transport", "shift", "move", "wan move", "wan comot"],
    gardening: ["gardening", "gardener", "garden", "lawn", "grass", "plant", "flower", "tree", "compound"],
    hvac: ["ac", "air conditioning", "hvac", "cooling", "heating", "ventilation", "ac no dey cold"],
    security: ["security", "guard", "cctv", "camera", "alarm", "protection", "surveillance"],
    laundry: ["laundry", "washing", "ironing", "dry cleaning", "clothes", "wan wash clothes"],
    catering: ["catering", "cook", "food", "chef", "party", "event", "catering", "wan cook"],
  };

  const serviceNames = {
    plumbing: "Plumbing Services",
    electrical: "Electrical Services",
    cleaning: "Cleaning Services",
    carpentry: "Carpentry",
    painting: "Painting Services",
    repairs: "Home Repairs & Maintenance",
    moving: "Moving & Relocation",
    gardening: "Gardening & Landscaping",
    hvac: "HVAC Services",
    security: "Security Services",
    laundry: "Laundry Services",
    catering: "Catering Services"
  };

  const analyzeQuery = (query: string): string[] => {
    const lowerQuery = query.toLowerCase();
    const matchedServices: string[] = [];

    Object.entries(serviceCategories).forEach(([category, keywords]) => {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        matchedServices.push(serviceNames[category as keyof typeof serviceNames]);
      }
    });

    // If no specific service found, try general categories
    if (matchedServices.length === 0) {
      if (lowerQuery.includes("house") || lowerQuery.includes("home")) {
        matchedServices.push("Home Repairs & Maintenance", "Cleaning Services");
      }
      if (lowerQuery.includes("urgent") || lowerQuery.includes("emergency")) {
        matchedServices.push("Home Repairs & Maintenance", "Plumbing Services", "Electrical Services");
      }
    }

    return [...new Set(matchedServices)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue("");

    // Analyze the user's query
    setTimeout(() => {
      const recommendedServices = analyzeQuery(userMessage);
      
      if (recommendedServices.length > 0) {
        const responseText = recommendedServices.length === 1
          ? `Based on your request, I recommend checking out our ${recommendedServices[0]} category! Click below to find professionals:`
          : `Great! Based on what you described, these services might help you:`;
        
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: responseText,
          services: recommendedServices
        }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: "I can help you find the right professional! Could you tell me more about what you need? For example: 'I need a plumber for a leaking pipe' or 'My AC is not cooling well'."
        }]);
      }
    }, 500);
  };

  const handleServiceClick = (service: string) => {
    navigate('/get-started', { state: { searchQuery: service } });
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-50 group"
          aria-label="Open AI Chat Assistant"
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/90 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-white/80">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-white rounded-br-sm'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  
                  {/* Service Recommendations */}
                  {message.services && message.services.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.services.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleServiceClick(service)}
                          className="w-full text-left px-4 py-2.5 bg-white hover:bg-primary/5 border border-slate-200 hover:border-primary/30 rounded-xl transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-900 group-hover:text-primary transition-colors">
                              {service}
                            </span>
                            <svg className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe what you need..."
                className="flex-1 rounded-xl border-slate-300 focus:border-primary"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Powered by HandySwift AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
