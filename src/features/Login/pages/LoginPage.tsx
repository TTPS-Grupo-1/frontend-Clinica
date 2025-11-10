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
      console.log("Intentando login con:", { email, password });
      // Petición al backend
      const response = await axios.post("/api/login/", {
        email: email,
        password: password,
      });

      const { token, user } = response.data;
      const role = user.rol;
      console.log(role)
      // Guardar usuario y token en Redux, y solo valores simples en localStorage
      dispatch(login({ token, user }));
      localStorage.setItem("token", token);
      if (role) {
        // Guardar role como string directa para evitar problemas de parseo
        localStorage.setItem("role", role);
      }
    console.log("Login exitoso, usuario:", user);
    // Redirigir según rol
    if (role === "MEDICO") navigate("/medicos");
    else if (role === "PACIENTE") navigate("/pacientes/home");
    else if (role === "OPERADOR_LABORATORIO") navigate("/operador");
    else navigate("/dashboard");

      toast.success(`Bienvenido, ${user.first_name}!`);
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
