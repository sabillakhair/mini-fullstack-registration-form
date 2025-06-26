const form = document.getElementById("form-pendaftaran");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // cegah reload halaman

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch(form.action, {
    method: form.method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Server error: ${res.status}`); // Cek status response
      return res.text();
    })
    .then((text) => {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: text,
        confirmButtonColor: "#a386ff",
      });
      form.reset();
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: `Terjadi kesalahan: ${err.message}`, // Tampilkan error message spesifik
        confirmButtonColor: "#ff6f6f",
      });
      console.error(err);
    });
});
