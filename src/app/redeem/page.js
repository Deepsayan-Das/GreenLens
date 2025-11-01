'use client';
import React,{useState,useEffect} from "react";
import {products} from "../data/product.js";


const initialForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    productId: products[0]?.id ?? "",
    quantity: 1,
    notes: "",
    agree: false,
    fileDataUrl: null,
    fileName: "",
};

const validateEmail = (s) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).toLowerCase());

const SubmitPage = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);
  
    useEffect(() => {
      if (!form.productId && products.length) {
        setForm((f) => ({ ...f, productId: products[0].id }));
      }
    }, []);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    };
  
    const handleFile = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({ ...f, fileDataUrl: reader.result, fileName: file.name }));
      };
      reader.readAsDataURL(file);
    };
  
    const validate = () => {
      const errs = {};
      if (!form.name.trim()) errs.name = "Name is a required field";
      if (!form.email.trim() || !validateEmail(form.email)) errs.email = "Valid email required";
      if (!form.agree) errs.agree = "You must confirm before submitting";
      if (!form.productId) errs.productId = "Select a product";
      if (!form.quantity || Number(form.quantity) <= 0) errs.quantity = "Quantity must be >= 1";
      return errs;
    };
  
    const saveSubmissionToLocal = (payload) => {
      try {
        const key = "greenlens_submissions";
        const existing = JSON.parse(localStorage.getItem(key) || "[]");
        existing.unshift(payload);
        localStorage.setItem(key, JSON.stringify(existing));
      } catch (err) {
        console.error("localStorage save failed", err);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      const errs = validate();
      if (Object.keys(errs).length) {
        setErrors(errs);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
  
      setLoading(true);
      await new Promise((r) => setTimeout(r, 700));
  
      const payload = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...form,
        product: products.find((p) => p.id === Number(form.productId)) || null,
      };
      saveSubmissionToLocal(payload);
  
      setSubmittedId(payload.id);
      setLoading(false);
      setForm((f) => ({ ...initialForm, productId: f.productId }));
    };
    return (
        <div className="min-h-screen py-12" style={{ background: "linear-gradient(135deg, #a7f3d0 0%, #d9f99d 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-green-800 mb-6">
              Submit a Redemption Request
            </h2>
            <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-gradient-to-br from-[#E8F5E9] to-[#F1F8E9] border border-[#A5D6A7] shadow-lg shadow-green-200/50 rounded-2xl p-10 mx-auto transition-transform hover:-translate-y-2 hover:shadow-green-300/60 animate-floatCard">
              {Object.keys(errors).length > 0 && (
                <div className="mb-4 text-sm text-red-700">
                  Please fill the required fields.
                </div>
              )}
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`mt-1 input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                    placeholder="Rohit Sharma"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
    
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`mt-1 input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                    placeholder="rohitsharma@example.com"
                    type="email"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
    
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 input input-bordered w-full"
                    placeholder="+91 98765 43210"
                  />
                </div>
    
                <div>
                  <label className="text-sm font-medium text-gray-700">Select product</label>
                  <select
                    name="productId"
                    value={form.productId}
                    onChange={handleChange}
                    className={`mt-1 select select-bordered w-full ${errors.productId ? "select-error" : ""}`}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.price} GT
                      </option>
                    ))}
                  </select>
                  {errors.productId && <p className="text-xs text-red-600 mt-1">{errors.productId}</p>}
                </div>
    
                <div>
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                    className={`mt-1 input input-bordered w-full ${errors.quantity ? "input-error" : ""}`}
                  />
                  {errors.quantity && <p className="text-xs text-red-600 mt-1">{errors.quantity}</p>}
                </div>
              </div>
    
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full mt-1"
                  rows="3"
                  placeholder="Shipping address..."
                />
              </div>
    
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Upload receipt / ID (optional)</label>
                <input type="file" accept="image/*,.pdf" onChange={handleFile} className="file-input file-input-bordered w-full mt-1" />
                {form.fileName && <p className="text-xs text-gray-600 mt-2">Uploaded: {form.fileName}</p>}
              </div>
    
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="Any extra info" className="mt-1 input input-bordered w-full" />
              </div>
    
              <div className="mt-4 flex items-start gap-2">
                <input type="checkbox" id="agree" name="agree" checked={form.agree} onChange={handleChange} className="checkbox border-2 border-emerald-600 checked:bg-emerald-700 checked:border-emerald-700" />
                <label htmlFor="agree" className="text-sm text-emerald-700">
                  I confirm that the information is accurate.
                </label>
              </div>
              {errors.agree && <p className="text-xs text-red-600 mt-1">{errors.agree}</p>}
    
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
    
                <button
                  type="button"
                  onClick={() => setForm(initialForm)}
                  className="btn btn-ghost"
                >
                  Reset
                </button>
    
                {submittedId && (
                  <p className="ml-auto text-sm text-green-700">Submitted ✓ (id: {submittedId})</p>
                )}
              </div>
            </form>
            <div className="mt-8 max-w-5xl mx-auto">
              <SubmissionsList />
            </div>
          </div>
        </div>
      );
};    

function SubmissionsList() {
    const [items, setItems] = useState([]);
    useEffect(() => {
      const key = "greenlens_submissions";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      setItems(existing);
    }, []);
  
    const clearAll = () => {
      if (!confirm("Clear all saved submissions?")) return;
      localStorage.removeItem("greenlens_submissions");
      setItems([]);
    };
  
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Saved Submissions</h3>
          <button onClick={clearAll} className="btn btn-sm btn-ghost text-red-600">Clear</button>
        </div>
  
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No saved submissions yet.</p>
        ) : (
          <div className="space-y-3">
            {items.map((s) => (
              <div key={s.id} className="border rounded-md p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{s.name} — <span className="text-sm text-gray-600">{s.email}</span></div>
                    <div className="text-xs text-gray-600">{new Date(s.createdAt).toLocaleString()}</div>
                    <div className="text-sm mt-1">Product: {s.product?.name} ({s.quantity})</div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>ID: {s.id}</div>
                  </div>
                </div>
  
                {s.fileDataUrl && (
                  <div className="mt-2">
                    <img src={s.fileDataUrl} alt="upload preview" className="h-24 rounded-md object-cover border" />
                  </div>
                )}
  
                <div className="mt-2 text-sm text-gray-700">{s.notes}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default SubmitPage;