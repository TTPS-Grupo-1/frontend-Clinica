import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      // Petición al backend
      const response = await axios.post("/api/login/", {
        username: email,
        password: password,
      });

      const { token, user, role_data } = response.data;

      // Guardar en Redux y localStorage
      dispatch(login({ token, user }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (role_data) {
        localStorage.setItem("role_data", JSON.stringify(role_data));
      }

      // Redirigir según rol
      if (user.rol === "MEDICO") navigate("/medicos");
      else if (user.rol === "paciente") navigate("/pacientes");
      else navigate("/dashboard");

      toast.success(`Bienvenido, ${user.username}`);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Error de autenticación. Verifique sus credenciales.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}
