import Link from "next/link";
import { SERVICES } from "./ServicesSection";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return <span className="section-badge">{children}</span>;
}

const phone = "(212) 555-0199";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-lg"
      style={{ background: "#FFFFFF" }}
    >
      <div className="section-container space-y-2 md:space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-5 reveal-on-scroll flex flex-col items-center">
          <span className="eyebrow mx-auto flex justify-center">
            Contact Us
          </span>
          <h2 className="text-headline pb-10" style={{ color: "#0F172A" }}>
            Ready to Prioritize
            <br />
            <span style={{ color: "#0B3B6E" }}>Your Health?</span>
          </h2>
          <p
            className="leading-relaxed pb-10"
            style={{ color: "#64748B", fontSize: "clamp(14px, 1.8vw, 17px)" , marginBottom: 15}}
          >
            Book a same-day appointment or reach out to our patient care team
            directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Contact info */}
          <div className="space-y-8 flex flex-col gap-9 reveal-on-scroll reveal-left">
            {[
              {
                icon: "location_on",
                label: "Address",
                val: "730 Fifth Avenue, Floor 14, New York, NY 10019",
              },
              {
                icon: "call",
                label: "Phone",
                val: phone,
                href: `tel:${phone}`,
              },
              {
                icon: "mail",
                label: "Email",
                val: "care@auraclinic.com",
                href: "mailto:care@auraclinic.com",
              },
              {
                icon: "schedule",
                label: "Hours",
                val: "Mon–Fri 8AM–8PM · Sat 9AM–5PM · Sun 10AM–3PM",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: "#E8F0FB" }}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: "#0B3B6E" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[12px] font-semibold uppercase tracking-wide mb-1"
                    style={{ color: "#64748B" }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-[16px] font-semibold hover:underline"
                      style={{ color: "#0B3B6E" }}
                    >
                      {item.val}
                    </a>
                  ) : (
                    <p
                      className="text-[16px] font-semibold"
                      style={{ color: "#0F172A" }}
                    >
                      {item.val}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{
                height: "clamp(220px, 25vw, 256px)",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1757547040784!2d-73.97648352412826!3d40.763074971395476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f98da12049%3A0x89c4572a9d70ddd3!2s730%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1685000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AuraClinic Location"
              />
            </div>
          </div>

          {/* Booking form */}
          <div
            className="rounded-[28px] p-18 space-y-6 reveal-on-scroll reveal-right"
            style={{
              background: "#FAFBFD",
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 12px 40px rgba(11,59,110,0.07)",
              padding: 9,
            }}
          >
            <h3
              className="text-[20px] font-bold text-center"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "#0F172A",
                margin: 10,
              }}
            >
              Book an Appointment
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: "First Name", type: "text", placeholder: "John" },
                { label: "Last Name", type: "text", placeholder: "Smith" },
                {
                  label: "Email",
                  type: "email",
                  placeholder: "john@example.com",
                },
                {
                  label: "Phone",
                  type: "tel",
                  placeholder: "+1 (212) 555-0000",
                },
              ].map((f) => (
                <div key={f.label}>
                  <label
                    className="block text-[13px] font-semibold mb-1.5"
                    style={{ color: "#0F172A" }}
                  >
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full h-12 px-4 rounded-xl text-[14px] font-medium outline-none transition-all focus:ring-2"
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid rgba(15,23,42,0.12)",
                      color: "#0F172A",
                      boxShadow: "0 1px 4px rgba(15,23,42,0.06)",
                      padding: 9,
                    }}
                  />
                </div>
              ))}
            </div>

            <div>
              <label
                className="block text-[13px] font-semibold mb-1.5"
                style={{ color: "#0F172A", padding: 9 }}
              >
                Service Needed
              </label>
              <select
                className="w-full h-12 px-4 rounded-xl text-[14px] font-medium outline-none"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(15,23,42,0.12)",
                  color: "#0F172A",
                }}
              >
                <option value="">Select a service...</option>
                {SERVICES.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-[13px] font-semibold mb-1.5 m-6"
                style={{ color: "#0F172A" }}
              >
                Message (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe your symptoms or any special requirements..."
                className="w-full rounded-xl text-[14px] font-medium outline-none resize-none"
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(15,23,42,0.12)",
                  color: "#0F172A",
                  padding: 9,
                }}
              />
            </div>

            <Link
              href="/book"
              className="btn-primary w-full justify-center text-[15px] py-4"
            >
              Confirm Appointment
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>

            <a
              href="https://wa.me/12125550199"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-[14px] btn-primary"
              style={{
                background: "#25D366",
                color: "#FFFFFF",
                paddingTop: 12,
                paddingBottom: 12,
                marginTop: 7,
              }}
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
