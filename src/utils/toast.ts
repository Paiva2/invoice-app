import { toast } from "react-toastify"

export default function triggerToastSucess(message: string) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  })
}
