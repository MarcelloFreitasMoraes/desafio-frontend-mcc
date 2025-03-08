import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Input } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/useStore";
import { CircleSmall, CircleCheckBig, CircleX, MoveLeft } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
    password: z
      .string()
      .min(12, "A senha deve ter pelo menos 12 caracteres")
      .max(40, "A senha deve ter no máximo 40 caracteres")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Must contain at least one capital letter")
      .regex(/[0-9]/, "Must contain at least one digit (0-9)")
      .regex(/[\W_]/, "Must contain at least one special character"),
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
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const validateLowerCase = /[a-z]/.test(password || "");
  const validateUpperCase = /[A-Z]/.test(password || "");
  const validateNumber = /[0-9]/.test(password || "");
  const validateSpecialChar = /[\W_]/.test(password || "");
  const validateLength = password ? password.length >= 12 && password.length <= 40 : false;
  const isPasswordValid = confirmPassword && password && password === confirmPassword;

  const onSubmit = async ({ name, email, password }: RegisterFormData) => {
    await registerUser(name, email, password);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(/bg-login-top.gif)] bg-no-repeat bg-cover p-8 gap-8">
      <Card title="Create new account" description="Fill in the information below!">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <Input label="Name" {...register("name")} error={errors.name?.message} required/>
          <Input label="Email" {...register("email")} error={errors.email?.message} required />
          <Input
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            required
          />
          <Input label="Confirm password" type="password" required {...register("confirmPassword")} error={errors.confirmPassword?.message} />

          <Button type="submit" variant="danger" size="small">
            To create
          </Button>

          <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/login")}>
            <MoveLeft />
            <p>Return to login screen</p>
          </div>          
        </form>
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-1 items-center">
              {isPasswordValid ? (validateLowerCase ? <CircleCheckBig /> : <CircleX />) : <CircleSmall />}
              <p className="text-black text-sm">Must contain at least one lowercase letter</p>
            </div>
            <div className="flex gap-1 items-center">
              {isPasswordValid ? (validateUpperCase ? <CircleCheckBig /> : <CircleX />) : <CircleSmall />}
              <p className="text-black text-sm">Must contain at least one capital letter</p>
            </div>
            <div className="flex gap-1 items-center">
              {isPasswordValid ? (validateNumber ? <CircleCheckBig /> : <CircleX />) : <CircleSmall />}
              <p className="text-black text-sm">Must contain at least one digit (0-9)</p>
            </div>
            <div className="flex gap-1 items-center">
              {isPasswordValid ? (validateSpecialChar ? <CircleCheckBig /> : <CircleX />) : <CircleSmall />}
              <p className="text-black text-sm">Must contain at least one special character</p>
            </div>
            <div className="flex gap-1 items-center">
              {isPasswordValid ? (validateLength ? <CircleCheckBig /> : <CircleX />) : <CircleSmall />}
              <p className="text-black text-sm">Must be between 12 and 40 characters long</p>
            </div>
          </div>
      </Card>
    </div>
  );
};

export default Register;
