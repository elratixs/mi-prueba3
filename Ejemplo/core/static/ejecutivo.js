document.getElementById('generateBtn').addEventListener('click', () => {
    fetch('https://randomuser.me/api/') // Utilizamos la API Random User Generator
        .then(response => response.json())
        .then(data => {
            const user = data.results[0]; // Obtenemos el primer usuario de la respuesta JSON
            const name = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            const age = user.dob.age;
            const picture = user.picture.large;
            const profession = "Ejecutivo de MauriRopa"; // Agregamos la profesión

            // Mostramos la información en el HTML
            document.getElementById('name').textContent = `Nombre: ${name}`;
            document.getElementById('email').textContent = `Correo: ${email}`;
            document.getElementById('age').textContent = `Edad: ${age}`;
            document.getElementById('profession').textContent = `Profesión: ${profession}`;
            document.getElementById('picture').src = picture;

            // Mostramos el cuadro de información del usuario
            document.getElementById('userInfo').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al generar la información del usuario:', error);
        });
});