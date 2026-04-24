import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Camera, User, Lock, Eye, X, Mail } from 'lucide-react';

const Profile = () => {
  const { user, fetchUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Name sync
  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  // AUTOMATIC UPLOAD: Jab bhi file change hogi, ye function chalega
  useEffect(() => {
    if (file) {
      handleAutoUpload();
    }
  }, [file]);

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0066FF&color=fff&bold=true&size=512`;
  const currentImg = preview || user?.profilePicture || avatarUrl;

  const handleAutoUpload = async () => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    try {
      await api.put('/auth/update-profile', formData);
      await fetchUser();
      alert("Profile picture updated! ✅");
    } catch (err) {
      alert("Photo upload failed.");
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/update-profile', { name });
      await fetchUser();
      alert("Name updated successfully! ✅");
    } catch (err) {
      alert("Update failed.");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("Passwords do not match!");
    }
    try {
      await api.put('/auth/change-password', passwords);
      alert("Password changed! 🔑");
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <div className="flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 space-y-2">
          <h2 className="text-xl font-bold text-slate-900 mb-6 px-2">Account Settings</h2>
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm min-w-max transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
            >
              <User size={18} /> Profile Details
            </button>
            <button 
              onClick={() => setActiveTab('password')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm min-w-max transition-all ${activeTab === 'password' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
            >
              <Lock size={18} /> Security & Pass
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 md:p-12 overflow-hidden">
          {activeTab === 'profile' ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-slate-50">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full border-4 border-slate-50 shadow-md overflow-hidden cursor-pointer" onClick={() => setIsViewOpen(true)}>
                    <img src={currentImg} className="w-full h-full object-cover" alt="pfp" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="text-white" size={20} />
                    </div>
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-slate-200 text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">
                    <Camera size={14} />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      const f = e.target.files[0];
                      if (f) { 
                        setFile(f); 
                        setPreview(URL.createObjectURL(f)); 
                      }
                    }} />
                  </label>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{user?.name}</h3>
                  <p className="text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                    <Mail size={16} /> {user?.email}
                  </p>
                </div>
              </div>

              <form onSubmit={handleNameUpdate} className="space-y-6 max-w-lg">
                <Input 
                  label="Display Name" 
                  value={name || ''} 
                  onChange={(e) => setName(e.target.value)} 
                  className="py-3 text-base font-semibold"
                />
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Registered Email</p>
                  <p className="text-sm font-semibold text-slate-600">{user?.email}</p>
                </div>
                <Button type="submit" className="w-full md:w-auto px-10 py-3 rounded-xl font-bold">
                  Update Name
                </Button>
              </form>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500 max-w-lg">
              <h3 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-tight">Security Update</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Update your account password below.</p>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-5">
                <Input label="Current Password" type="password" value={passwords.oldPassword || ''} onChange={(e)=>setPasswords({...passwords, oldPassword:e.target.value})} />
                <Input label="New Password" type="password" value={passwords.newPassword || ''} onChange={(e)=>setPasswords({...passwords, newPassword:e.target.value})} />
                <Input label="Confirm Password" type="password" value={passwords.confirmPassword || ''} onChange={(e)=>setPasswords({...passwords, confirmPassword:e.target.value})} />
                <div className="pt-4">
                  <Button type="submit" variant="dark" className="w-full py-3 rounded-xl font-bold">
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* VIEW MODAL */}
      {isViewOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setIsViewOpen(false)}>
          <button className="absolute top-8 right-8 text-white"><X size={32} /></button>
          <img src={currentImg} className="max-w-full max-h-[75vh] rounded-2xl border-4 border-white shadow-2xl" alt="Full view" />
        </div>
      )}
    </div>
  );
};

export default Profile;