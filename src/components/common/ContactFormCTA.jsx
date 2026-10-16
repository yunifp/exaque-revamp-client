import React, { useState, useEffect } from "react";
import useApi from "../../hooks/UseApi";

const CONTACT_OPTIONS = [
  {
    id: "sales",
    label: "Berbicara Dengan Sales",
    title: "Berbicara Dengan Sales",
    serviceValue: "Berbicara Dengan Sales",
  },
  {
    id: "demo",
    label: "Permintaan Demo",
    title: "Dapatkan Demo Produk",
    serviceValue: "Permintaan Demo",
  },
  {
    id: "support",
    label: "Bantuan Teknis",
    title: "Hubungi Bantuan Teknis",
    serviceValue: "Bantuan Teknis",
  },
  {
    id: "office",
    label: "Lokasi Kantor Exaque",
    title: "Kunjungi Kami",
    serviceValue: "",
  },
];

const ContactFormCTA = ({ initialTab = "demo", title = "Dapatkan Demo Produk", subtitle = "Siap mengambil langkah selanjutnya? Isi formulir di bawah ini atau pilih opsi bantuan lain di sebelah kanan." }) => {
  const { request, loading } = useApi();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    job_title: "",
    user_persona: "",
    message: "",
  });

  const currentTab =
    CONTACT_OPTIONS.find((opt) => opt.id === activeTab) || CONTACT_OPTIONS[0];

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = {
        ...formData,
        service_needed: currentTab.serviceValue,
      };

      const response = await request("/inquiries", "POST", payload);

      if (response) {
        setSuccessMsg(
          "Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda."
        );
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          company: "",
          job_title: "",
          user_persona: "",
          message: "",
        });
      }
    } catch (err) {
      setErrorMsg(
        err.message || "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi."
      );
    }
  };

  return (
    <div id="assessment" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {currentTab.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 order-2 lg:order-1">
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMsg}
              </div>
            )}

            {activeTab === "office" ? (
              <div className="bg-white p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.08)] border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Kantor Pusat Exaque
                </h3>
                <p className="text-gray-600 mb-6">
                  Jl. RC. Veteran Raya No.1, RT.1/RW.3, Bintaro Business Centre,
                  Jakarta Selatan, DKI Jakarta 12330, ID
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Nama Depan
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Nama Belakang
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Perusahaan
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Apa yang paling tepat menggambarkan anda ?
                  </label>
                  <select
                    name="user_persona"
                    value={formData.user_persona}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors bg-white"
                  >
                    <option value="">Pilih salah satu...</option>
                    <option value="C-Level Executive">C-Level Executive</option>
                    <option value="Manager Operasional">
                      Manager Operasional
                    </option>
                    <option value="IT Professional">IT Professional</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Bagaimana kami bisa membantu anda?
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-accent text-white font-bold py-3 px-10 rounded-xl shadow-md transition-colors
                      ${
                        loading
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-red-800"
                      }`}
                  >
                    {loading ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white p-8 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.05)] border border-gray-100 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Apa Yang Bisa Kami Bantu?
              </h3>

              <div className="flex flex-col space-y-2">
                {CONTACT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setActiveTab(opt.id);
                      setSuccessMsg("");
                      setErrorMsg("");
                    }}
                    className={`
                      text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-4
                      ${
                        activeTab === opt.id
                          ? "border-accent bg-red-50 text-accent"
                          : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormCTA;
