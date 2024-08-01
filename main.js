document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form');
    const listaCursos = document.getElementById('courses');
    const nombreCursoInput = document.getElementById('course-name');
    const descripcionCursoInput = document.getElementById('course-description');
    const idCursoInput = document.getElementById('course-id');

    let cursos = [];
    let indiceEdicion = -1;

    formulario.addEventListener('submit', (opc) => {
        opc.preventDefault();

        
        let nombreCurso = nombreCursoInput.value.trim();
        let descripcionCurso = descripcionCursoInput.value.trim();

        if (indiceEdicion >= 0) {
           
            if (nombreCurso && descripcionCurso) {
                console.log('Intentando editar curso:', nombreCurso);
                editarCurso(indiceEdicion, { nombre: nombreCurso, descripcion: descripcionCurso })
                    .then(() => {
                        console.log('Curso editado exitosamente:', nombreCurso);
                        limpiarFormulario();
                        mostrarCursos();
                    })
                    .catch((error) => {
                        console.error('Error al editar el curso:', error);
                    });
            } else {
                console.error('Nombre o descripción del curso están vacíos.');
            }
        } else {
            
            nombreCurso = prompt("Ingrese el nombre del curso:").trim();
            descripcionCurso = prompt("Ingrese la descripción del curso:").trim();

            if (nombreCurso && descripcionCurso) {
                console.log('Agregando el curso:', nombreCurso);
                agregarCurso({ nombre: nombreCurso, descripcion: descripcionCurso })
                    .then(() => {
                        console.log('Curso agregado exitosamente:', nombreCurso);
                        limpiarFormulario();
                        mostrarCursos();
                    })
                    .catch((error) => {
                        console.error('Error al agregar el curso:', error);
                    });
            } else {
                console.error('Nombre o descripción del curso están vacíos.');
            }
        }
    });

    function agregarCurso(curso) {
        return new Promise((resolve) => {
            setTimeout(() => {
                cursos.push(curso);
                resolve();
            }, 1000);
        });
    }

    function editarCurso(indice, curso) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (indice >= 0 && indice < cursos.length) {
                    cursos[indice] = curso;
                    resolve();
                } else {
                    reject('Índice inválido');
                }
            }, 1000);
        });
    }

    function eliminarCurso(indice) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (indice >= 0 && indice < cursos.length) {
                    console.log('Eliminando curso en el índice:', indice);
                    cursos.splice(indice, 1);
                    resolve();
                } else {
                    reject('Índice inválido');
                }
            }, 1000);
        });
    }

    function mostrarCursos() {
        listaCursos.innerHTML = '';
        cursos.forEach((curso, indice) => {
            const li = document.createElement('li');
            li.textContent = `${curso.nombre}: ${curso.descripcion} `;
            const botonEditar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.onclick = () => {
                console.log('Intentando editar curso en el índice:', indice);
                nombreCursoInput.value = curso.nombre;
                descripcionCursoInput.value = curso.descripcion;
                idCursoInput.value = indice; 
                indiceEdicion = indice; 
            };
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick = () => {
                console.log('Intentando eliminar curso en el índice:', indice);
                eliminarCurso(indice)
                    .then(() => {
                        console.log('Curso eliminado exitosamente en el índice:', indice);
                        mostrarCursos();
                    })
                    .catch((error) => {
                        console.error('Error al eliminar el curso:', error);
                    });
            };
            li.appendChild(botonEditar);
            li.appendChild(botonEliminar);
            listaCursos.appendChild(li);
        });
    }

    function limpiarFormulario() {
        nombreCursoInput.value = '';
        descripcionCursoInput.value = '';
        idCursoInput.value = '';
        indiceEdicion = -1; 

    }
});
