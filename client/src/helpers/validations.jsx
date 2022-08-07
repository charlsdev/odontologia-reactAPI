import Swal from "sweetalert2";

export const validarAd = (cad) => {
   var total = 0;
   var longitud = cad.length;
   var longcheck = longitud - 1;
   for (var i = 0; i < longcheck; i++) {
      if (i % 2 === 0) {
         var aux = cad.charAt(i) * 2;
         if (aux > 9) aux -= 9;
         total += aux;
      } else {
         total += parseInt(cad.charAt(i));
      }
   }
   total = total % 10 ? 10 - (total % 10) : 0;
   if (cad.charAt(longitud - 1) == total) {
      Swal.fire({
         position: "top-end",
         title: "CÉDULA VÁLIDA",
         html: `<p style="font-size: 1rem;">Cédula ingresada válida.</p>`,
         icon: "success",
         confirmButtonColor: "#049947",
         allowOutsideClick: false,
         showConfirmButton: false,
         timer: 1500,
      });
   } else {
      Swal.fire({
         position: "top-end",
         title: "CÉDULA NO VÁLIDA",
         html: `<p style="font-size: 1rem;">Ingrese una cédula válida.</p>`,
         icon: "error",
         confirmButtonColor: "#049947",
         allowOutsideClick: false,
         showConfirmButton: false,
         timer: 1500,
      });
   }
};

export const resCode = (
   { msg, tittle, description, icon, toast },
   handleClose,
   setLoading
) => {
   setLoading(false);

   if (msg === "true") {
      Swal.fire({
         title: tittle,
         html: `<p style="font-size: 1rem;">${description}</p>`,
         icon: icon,
         confirmButtonColor: "#049947",
         allowOutsideClick: false,
      }).then((result) => {
         if (result.value === true) {
            handleClose();
         }
      });
   }

   if (msg === "false") {
      Swal.fire({
         title: tittle,
         html: `<p style="font-size: 1rem;">${description}</p>`,
         icon: icon,
         confirmButtonColor: "#049947",
         allowOutsideClick: false,
      });
   }

   if (msg === "error") {
      Swal.fire({
         title: tittle,
         html: `<p style="font-size: 1rem;">${description}</p>`,
         icon: icon,
         confirmButtonColor: "#049947",
         allowOutsideClick: false,
      });
   }

   if (msg === "toast") {
      toast.forEach((ntfs) => {
         $.toast({
            heading: `${ntfs.tittle}`,
            text: `${ntfs.description}`,
            hideAfter: 5000,
            icon: `${ntfs.icon}`,
            position: "top-right",
         });
      });
   }
};
