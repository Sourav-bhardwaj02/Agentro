import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

const Profile = () => {
  const { checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    gpa: '',
    tenthMarks: '',
    twelfthMarks: '',
    otherDocuments: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        if (data.user) {
          setFormData({
            name: data.user.name || '',
            gpa: data.user.gpa || '',
            tenthMarks: data.user.tenthMarks || '',
            twelfthMarks: data.user.twelfthMarks || '',
            otherDocuments: data.user.otherDocuments || ''
          });
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.put('/users/profile', formData);
      setMessage('Profile updated successfully!');
      await checkAuth(); // Update global user state (like name in sidebar)
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white p-8">Loading profile...</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-white">My Profile</h1>
      
      <div className="glass-card p-8 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2">Basic Info</h2>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2 mt-8">Academic Records</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">10th Grade Marks (%)</label>
                <input 
                  type="text" 
                  name="tenthMarks"
                  value={formData.tenthMarks}
                  onChange={handleChange}
                  placeholder="e.g. 95%"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">12th Grade Marks (%)</label>
                <input 
                  type="text" 
                  name="twelfthMarks"
                  value={formData.twelfthMarks}
                  onChange={handleChange}
                  placeholder="e.g. 92%"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Current GPA (if applicable)</label>
              <input 
                type="number" 
                step="0.01"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                placeholder="e.g. 3.8"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-white/10 pb-2 mt-8">Documents & Achievements</h2>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Other Documents (Text Summary)</label>
              <p className="text-xs text-slate-500 mb-2">Describe your certificates, extracurriculars, or other documents here so your AI advisor can use them to recommend colleges.</p>
              <textarea 
                name="otherDocuments"
                value={formData.otherDocuments}
                onChange={handleChange}
                rows={5}
                placeholder="e.g. National level basketball certificate, State science fair winner..."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={saving}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
