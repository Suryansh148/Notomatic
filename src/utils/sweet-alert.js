// to use sweet alert we need to install it.
// npm i sweetalert2
import Swal from "sweetalert2";
 export async function toast (type, msg){
    Swal.fire({
        position : "top-end",
        icon: type,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        title: msg,
    });
 }