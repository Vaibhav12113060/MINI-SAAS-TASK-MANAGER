import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", formData);
      // Backend returns { token, id, name, email }
      login(data.token, data);
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-100 transition-all">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">
            VAIB<span className="text-blue-600">FLOW</span>
          </h2>
          <p className="text-slate-400 font-black mt-2 uppercase text-[10px] tracking-widest opacity-60">
            Create your new workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            placeholder="Vaibhav Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <div className="pt-4">
            <Button type="submit" className="w-full py-5 text-lg font-black rounded-3xl shadow-xl shadow-blue-100">
              Create Account
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm font-bold text-slate-500">
          Already a member?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;