"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import { mockMessages } from "@/lib/mockData";
import { Message } from "@/types";

function TelehealthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab State
  const [activeTab, setActiveTab] = useState<"notes" | "chat" | "rx">("notes");

  // Call status toggles
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  // Chat States
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Parse initial tab from search parameters
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "chat" || tab === "notes" || tab === "rx") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Scroll to bottom of chat when new message is added
  useEffect(() => {
    if (activeTab === "chat" && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "patient",
      isRead: true
    };

    setMessages([...messages, newMsg]);
    setChatInput("");

    // Simulate doctor response
    setTimeout(() => {
      const responseMsg: Message = {
        id: `msg-doc-${Date.now()}`,
        text: "I have recorded that in your files. We will review it shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: "doctor",
        isRead: false
      };
      setMessages((prev) => [...prev, responseMsg]);
    }, 1500);
  };

  return (
    <main className="flex-grow flex overflow-y-auto md:overflow-hidden h-auto md:h-[calc(100vh-80px)] flex-col md:flex-row bg-background">
      {/* Video Stream Area */}
      <div className="w-full md:flex-grow relative bg-surface-container-low flex flex-col p-4 shrink-0 md:shrink">
        {/* Main Video Frame with Pulsing Call Border */}
        <div className="w-full aspect-[4/3] sm:aspect-video md:aspect-auto md:h-full rounded-lg overflow-hidden relative shadow-level-3 border-2 border-tertiary/20 group bg-slate-900 transition-all duration-300">
          {!cameraOff ? (
            <img
              alt="Doctor Consultation Video"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-950 text-white flex-col gap-2">
              <span className="material-symbols-outlined text-6xl">videocam_off</span>
              <p className="text-body-md font-body-md text-slate-400">Your camera is turned off</p>
            </div>
          )}

          {/* Call Header Overlay */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-outline-variant/30">
            <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
            <span className="text-label-md font-label-md text-on-surface font-bold">04:23</span>
            <span className="text-label-md font-label-md text-on-surface-variant ml-2 border-l border-outline-variant pl-2 font-semibold">
              Dr. Sarah Jenkins
            </span>
          </div>

          {/* Call Control Center Panel */}
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-surface-container-lowest/95 backdrop-blur-md px-4 md:px-6 py-2.5 md:py-4 rounded-full shadow-level-3 border border-outline-variant/20 transition-opacity duration-300">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                micMuted
                  ? "bg-error text-on-error"
                  : "bg-surface-variant text-on-surface hover:bg-surface-container-high"
              }`}
              title={micMuted ? "Unmute Mic" : "Mute Mic"}
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">
                {micMuted ? "mic_off" : "mic"}
              </span>
            </button>
            <button
              onClick={() => setCameraOff(!cameraOff)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                cameraOff
                  ? "bg-error text-on-error"
                  : "bg-surface-variant text-on-surface hover:bg-surface-container-high"
              }`}
              title={cameraOff ? "Turn Camera On" : "Turn Camera Off"}
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">
                {cameraOff ? "videocam_off" : "videocam"}
              </span>
            </button>
            <button
              onClick={() => setScreenSharing(!screenSharing)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                screenSharing
                  ? "bg-tertiary text-white"
                  : "bg-surface-variant text-on-surface hover:bg-surface-container-high"
              }`}
              title={screenSharing ? "Stop Sharing" : "Share Screen"}
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">screen_share</span>
            </button>
            <Link
              href="/portal"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-error text-on-error flex items-center justify-center hover:opacity-90 transition-opacity ml-2 cursor-pointer shadow-md"
              title="Hang Up"
            >
              <span
                className="material-symbols-outlined text-[20px] md:text-[24px] font-fill animate-pulse"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call_end
              </span>
            </Link>
          </div>
        </div>

        {/* Self PIP View */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-24 h-32 sm:w-32 sm:h-44 md:w-48 md:h-64 rounded-xl overflow-hidden shadow-level-3 border-2 border-surface-container-lowest z-10 bg-slate-800">
          <img
            alt="Patient Local View"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80"
          />
        </div>
      </div>

      {/* Sidebar Tools Area */}
      <aside className="w-full md:w-96 bg-surface-container-lowest border-l border-outline-variant/30 flex flex-col shrink-0 z-20 shadow-sm relative h-full">
        {/* Tabs Control */}
        <div className="flex border-b border-outline-variant/30 p-2 gap-2">
          {(["notes", "chat", "rx"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-label-md font-label-md rounded-lg transition-colors cursor-pointer capitalize font-bold ${
                activeTab === tab
                  ? "bg-surface-container text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {tab === "rx" ? "Rx" : tab}
            </button>
          ))}
        </div>

        {/* Clinical Notes Tab */}
        {activeTab === "notes" && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto animate-pop-in">
            <h3 className="text-headline-md font-headline-md mb-6 font-bold">Clinical Notes</h3>
            <div className="space-y-6">
              <div>
                <label className="text-label-md font-label-md text-on-surface-variant block mb-2 font-semibold">
                  Chief Complaint
                </label>
                <textarea
                  className="w-full bg-background border border-outline-variant rounded-lg p-4 text-body-md focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary transition-colors resize-none h-24"
                  placeholder="Enter patient symptoms..."
                  defaultValue="Experiencing slight tightness in the chest and irregular heart palpitations during moderate exercise."
                ></textarea>
              </div>
              <div>
                <label className="text-label-md font-label-md text-on-surface-variant block mb-2 font-semibold">
                  Patient Vitals
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/50">
                    <span className="text-caption font-caption text-on-surface-variant block font-medium">BP</span>
                    <span className="text-body-lg font-body-lg font-bold">120/80</span>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/50">
                    <span className="text-caption font-caption text-on-surface-variant block font-medium">Temp</span>
                    <span className="text-body-lg font-body-lg font-bold">98.6°F</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-label-md font-label-md text-on-surface-variant block mb-2 font-semibold">
                  Assessment &amp; Plan
                </label>
                <textarea
                  className="w-full bg-background border border-outline-variant rounded-lg p-4 text-body-md focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary transition-colors resize-none h-32"
                  placeholder="Document findings and next steps..."
                  defaultValue="Prescribing low-dose aspirin. Scheduling a follow-up echocardiogram within 10 days. Advised resting and monitoring heart rate using smartwatch sensors."
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Secure Chat Tab */}
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col bg-background animate-pop-in overflow-hidden">
            {/* Conversation Thread */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 flex flex-col justify-end">
              <div className="flex justify-center mb-4">
                <span className="text-caption font-caption text-on-surface-variant bg-surface-container px-3 py-1 rounded-full font-bold">
                  Secure Connection Established
                </span>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[400px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 ${
                      msg.sender === "patient" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl border shadow-sm max-w-[85%] leading-relaxed text-body-md font-body-md ${
                        msg.sender === "patient"
                          ? "bg-surface-container text-on-surface rounded-tr-sm border-outline-variant/30"
                          : "bg-surface-container-lowest text-on-surface rounded-tl-sm border-outline-variant/30"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-caption font-caption text-on-surface-variant px-1 font-semibold">
                      {msg.time}
                    </span>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Input Message Footer */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-surface-container-lowest border-t border-outline-variant/30"
            >
              <div className="flex items-center gap-2 bg-background border border-outline-variant/50 rounded-full px-4 py-2 focus-within:border-tertiary transition-colors">
                <input
                  className="flex-grow bg-transparent border-none focus:ring-0 text-body-md py-2 focus:outline-none"
                  placeholder="Type a secure message..."
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <span className="material-symbols-outlined font-fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                    send
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Prescription (Rx) Tab */}
        {activeTab === "rx" && (
          <div className="flex-1 flex flex-col p-6 overflow-y-auto animate-pop-in">
            <h3 className="text-headline-md font-headline-md mb-6 font-bold">Prescriptions</h3>
            <div className="space-y-4">
              {[
                { name: "Lisinopril 10mg", instructions: "Take 1 tablet by mouth daily", status: "Active", pharmacy: "CVS Pharmacy, NY" },
                { name: "Atorvastatin 20mg", instructions: "Take 1 tablet by mouth at bedtime", status: "Active", pharmacy: "CVS Pharmacy, NY" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-headline-md text-[16px] text-primary font-bold">{item.name}</h4>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                    {item.instructions}
                  </p>
                  <div className="flex items-center gap-2 text-caption text-secondary font-semibold">
                    <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                    <span>{item.pharmacy}</span>
                  </div>
                </div>
              ))}
              <button className="w-full mt-6 bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md hover:scale-[1.01] transition-transform cursor-pointer font-bold">
                Request Rx Refill
              </button>
            </div>
          </div>
        )}
      </aside>
    </main>
  );
}

export default function TelehealthRoom() {
  return (
    <Suspense
      fallback={
        <div className="flex-grow flex items-center justify-center py-24">
          <span className="animate-spin material-symbols-outlined text-4xl text-primary">
            sync
          </span>
        </div>
      }
    >
      <TelehealthContent />
    </Suspense>
  );
}
