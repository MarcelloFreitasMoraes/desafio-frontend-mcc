import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/useStore";
import { CircleSmall } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
    password: z
      .string()
      .min(12, "A senha deve ter pelo menos 12 caracteres")
      .max(40, "A senha deve ter no máximo 40 caracteres")
      .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
      .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter pelo menos um dígito (0-9)")
      .regex(/[\W_]/, "Deve conter pelo menos um caractere especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async ({ name, email, password }: RegisterFormData) => {
    await registerUser(name, email, password);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(/bg-login-top.gif)] bg-no-repeat bg-cover p-8 gap-8">
      <Card title="Criar nova conta" description="Preencha as informações abaixo!">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <Input label="Nome *" {...register("name")} error={errors.name?.message} />

          <Input
            label="Email *"
            {...register("email", {
              required: "O e-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Por favor, insira um e-mail válido"
              }
            })}
            error={errors.email?.message}
          />

          <Input label="Senha *" type="password" {...register("password")} error={errors.password?.message} />

          <Input
            label="Confirmar senha *"
            type="password"
            {...register("confirmPassword", {
              required: "Confirme sua senha",
              validate: (value) => value === watch("password") || "As senhas não coincidem"
            })}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" variant="danger" size="small">
            Criar
          </Button>

          {/* Regras da senha */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-1 items-center">
              <CircleSmall />
              <p className="text-black text-sm">Deve conter pelo menos uma letra minúscula</p>
            </div>
            <div className="flex gap-1 items-center">
              <CircleSmall />
              <p className="text-black text-sm">Deve conter pelo menos uma letra maiúscula</p>
            </div>
            <div className="flex gap-1 items-center">
              <CircleSmall />
              <p className="text-black text-sm">Deve conter pelo menos um dígito (0-9)</p>
            </div>
            <div className="flex gap-1 items-center">
              <CircleSmall />
              <p className="text-black text-sm">Deve conter pelo menos um caractere especial</p>
            </div>
            <div className="flex gap-1 items-center">
              <CircleSmall />
              <p className="text-black text-sm">Deve ter um comprimento entre 12 e 40 caracteres</p>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
