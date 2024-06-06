// CreateUser.tsx

import React, { useEffect, useState } from "react";
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
import { updateUser } from "../../../redux/userSlice";
import { useToast } from "../../../toast";

interface CreateProps {
  open: boolean;
  onClose: () => void;
  row: UserSummary;
}

const schema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  phone: yup.string().required("Telefone é obrigatório"),
  lat: yup.number().typeError("Latitude deve ser um número").required("Latitude é obrigatória"),
  lng: yup.number().typeError("Longitude deve ser um número").required("Longitude é obrigatória"),
});

const EditUser: React.FC<CreateProps> = ({ onClose, open, row }) => {
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

    dispatch(updateUser({ ...data, id: row.id }));
    showToastMessage("success", "Operação concluída", "Os dados foram salvos com sucesso!");
    setIsLoading(false);
    onClose();
  };

  useEffect(() => {
    if (row) {
      setValue("name", row.name);
      setValue("email", row.email);
      setValue("phone", formatPhoneInput(row.phone));
      setValue("city", row.city);
      setValue("lat", row.lat);
      setValue("lng", row.lng);
    }
  }, [row]);
  return (
    <ComponentModal open={open} onClose={onClose} title="Editar usuário" loading={isLoading}>
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

export default EditUser;
