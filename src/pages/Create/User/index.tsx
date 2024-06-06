// CreateUser.tsx

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ComponentInput from "../../../components/ComponentInput";
import { useForm } from "react-hook-form";
import { UserSummary } from "../../../interfaces/user";
import ComponentModal from "../../../components/ComponentModal";
import ComponentButton from "../../../components/ComponentButton";
import { ModalBody, ModalFooter } from "@chakra-ui/react";
import { formatPhoneInput } from "../../../utils/formatPhoneInput";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/userSlice";
import { useToast } from "../../../toast";

interface CreateProps {
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  phone: yup.string().required("Telefone é obrigatório"),
  lat: yup.number().typeError("Latitude deve ser um número").required("Latitude é obrigatória"),
  lng: yup.number().typeError("Longitude deve ser um número").required("Longitude é obrigatória"),
});

const CreateUser: React.FC<CreateProps> = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const { showToastMessage } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: UserSummary) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    dispatch(createUser(data));
    showToastMessage("success", "Operação concluída", "Os dados foram salvos com sucesso!");

    setIsLoading(false);
    onClose();
  };

  return (
    <ComponentModal open={open} onClose={onClose} title="Criar novo usuário" loading={isLoading}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalBody pb={6}>
          <div className="flex flex-col gap-2">
            <div>
              <ComponentInput error={errors.name?.message} {...register("name")} label="Nome" />
            </div>
            <div>
              <ComponentInput error={errors.email?.message} {...register("email")} label="Email" />
            </div>
            <div>
              <ComponentInput error={errors.city?.message} {...register("city")} label="Cidade" />
            </div>
            <div>
              <ComponentInput
                error={errors.phone?.message}
                {...register("phone")}
                label="Telefone"
                onChange={(e) => setValue("phone", formatPhoneInput(e.target.value))}
              />
            </div>
            <div>
              <ComponentInput error={errors.lat?.message} {...register("lat")} label="Latitude" />
            </div>
            <div>
              <ComponentInput error={errors.lng?.message} {...register("lng")} label="Longitude" />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex gap-2 items-center">
            <ComponentButton
              variant="outline"
              style={{ width: "100px" }}
              title="Sair"
              onClick={onClose}
            />
            <ComponentButton title="Salvar" style={{ width: "100px" }} type="submit" />
          </div>
        </ModalFooter>
      </form>
    </ComponentModal>
  );
};

export default CreateUser;
