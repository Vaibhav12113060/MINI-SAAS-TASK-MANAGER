import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data); navigate('/');
    } catch (err) { alert("Invalid Credentials!"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">VAIB<span className="text-blue-600">FLOW</span></h2>
          <p className="text-slate-400 font-black mt-2 uppercase text-[10px] tracking-widest opacity-60">Log in to your workspace</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <Input label="Email Address" type="email" placeholder="vaibhav@example.com" onChange={(e)=>setEmail(e.target.value)} required />
          <Input label="Password" type="password" placeholder="••••••••" onChange={(e)=>setPassword(e.target.value)} required />
          <Button type="submit" className="w-full py-5 text-lg font-black rounded-3xl shadow-xl shadow-blue-100">Sign In</Button>
        </form>
        <div className="mt-8 text-center text-sm font-bold text-slate-500">New to VaibFlow? <Link to="/register" className="text-blue-600 hover:underline">Create an account</Link></div>
      </div>
    </div>
  );
};
export default Login;