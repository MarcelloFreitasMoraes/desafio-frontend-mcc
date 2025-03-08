import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/useStore";
import { Button, Card, Input } from "../../components";
import { useToast } from "../../constants/toast";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    const success = await login(email, password);
    if (success) {
      navigate("/people");
    } else {
      showToast("Email ou senha incorretos!")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(/bg-login-top.gif)] bg-no-repeat bg-cover p-8">
      <Card title="Welcome" description="Log in to access the system!">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-96">
          <Input
            label="Login"
            placeholder="Enter email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" variant="primary" size="small">
            Sign in
          </Button>

          <p className="text-black text-sm">
            {' '}  Don't have an account? <Link to="/register" className="text-red-500">Create account!</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
