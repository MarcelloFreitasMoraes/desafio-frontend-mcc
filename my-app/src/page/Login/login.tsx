import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/useStore";
import { Button, Card, Input } from "../../components";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  
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
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(/bg-login-top.gif)] bg-no-repeat bg-cover p-8">
      <Card title="Bem-vindo" description="Faça login para acessar o sistema!">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-96">
          <Input
            label="Login"
            placeholder="Digite o e-mail"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite a senha"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" variant="primary" size="small">
            Entrar
          </Button>

          <p className="text-black text-sm">
            Não tem conta? <Link to="/register" className="text-red-500">Criar conta!</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
