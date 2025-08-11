import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/modals/Modal";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

export type FormValues = {
  email: string;
  password: string;
}

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

    router.post('/login', data, {
      onSuccess: () => {
        toast.success('Logged in');
        loginModal.onClose();
      },
      onFinish: () => {
        setIsLoading(false);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={loginModal.onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLable="Continue"
      body={bodyContent}
      footer={footerContent}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
