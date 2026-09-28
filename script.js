/* ==========================================
   CURSOR
========================================== */

const cursor = document.querySelector(".cursor");


if (cursor) {

    document.addEventListener("mousemove", (event) => {

        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;

    });

}


/* ==========================================
   ELEMENTOS INTERACTIVOS
========================================== */

const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, label"
);


interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        if (cursor) {

            cursor.style.width = "30px";
            cursor.style.height = "30px";

        }

    });


    element.addEventListener("mouseleave", () => {

        if (cursor) {

            cursor.style.width = "12px";
            cursor.style.height = "12px";

        }

    });

});


/* ==========================================
   MENÚ MOBILE
========================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        if (
            mobileMenu.style.display === "block"
        ) {

            mobileMenu.style.display = "none";

        } else {

            mobileMenu.style.display = "block";

        }

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.style.display = "none";

        });

    });

}


/* ==========================================
   BRIEF DEL PROYECTO
========================================== */

const projectBrief =
    document.getElementById("projectBrief");


if (projectBrief) {


    const step1 =
        document.getElementById("step1");


    const step2 =
        document.getElementById("step2");


    const nextStep =
        document.getElementById("nextStep");


    const previousStep =
        document.getElementById("previousStep");


    const progress1 =
        document.getElementById("progress1");


    const progress2 =
        document.getElementById("progress2");


    const message =
        document.getElementById("briefMessage");


    const submitButton =
        document.getElementById("submitBrief");


    /* ======================================
       PASO 1 → PASO 2
    ====================================== */

    if (nextStep) {

        nextStep.addEventListener(
            "click",
            () => {


                const nombre =
                    document
                        .getElementById("nombre")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const cliente =
                    document.querySelector(
                        'input[name="cliente"]:checked'
                    );


                const proyecto =
                    document.querySelector(
                        'input[name="proyecto"]:checked'
                    );


                const descripcion =
                    document
                        .getElementById("descripcion")
                        .value
                        .trim();


                /* VALIDAR NOMBRE */

                if (!nombre) {

                    alert(
                        "Por favor escribe tu nombre."
                    );

                    return;

                }


                /* VALIDAR EMAIL */

                if (!email) {

                    alert(
                        "Por favor escribe tu email."
                    );

                    return;

                }


                const emailValido =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailValido.test(email)) {

                    alert(
                        "Escribe un correo electrónico válido."
                    );

                    return;

                }


                /* VALIDAR CLIENTE */

                if (!cliente) {

                    alert(
                        "Selecciona qué tipo de cliente eres."
                    );

                    return;

                }


                /* VALIDAR PROYECTO */

                if (!proyecto) {

                    alert(
                        "Selecciona el tipo de proyecto."
                    );

                    return;

                }


                /* VALIDAR DESCRIPCIÓN */

                if (!descripcion) {

                    alert(
                        "Cuéntame un poco más sobre tu proyecto."
                    );

                    return;

                }


                /* ACTUALIZAR RESUMEN */

                document.getElementById(
                    "summaryName"
                ).textContent = nombre;


                document.getElementById(
                    "summaryEmail"
                ).textContent = email;


                document.getElementById(
                    "summaryProject"
                ).textContent = proyecto.value;


                /* CAMBIAR PASO */

                step1.classList.remove("active");

                step2.classList.add("active");


                progress1.classList.remove(
                    "active"
                );

                progress2.classList.add(
                    "active"
                );


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ======================================
       PASO 2 → PASO 1
    ====================================== */

    if (previousStep) {

        previousStep.addEventListener(
            "click",
            () => {

                step2.classList.remove("active");

                step1.classList.add("active");


                progress2.classList.remove(
                    "active"
                );

                progress1.classList.add(
                    "active"
                );


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ======================================
       PRESUPUESTO
    ====================================== */

    const budgetOptions =
        document.querySelectorAll(
            'input[name="presupuesto"]'
        );


    budgetOptions.forEach((option) => {

        option.addEventListener(
            "change",
            () => {

                document.getElementById(
                    "summaryBudget"
                ).textContent =
                    option.value;

            }
        );

    });


    /* ======================================
       TIEMPO
    ====================================== */

    const timeOptions =
        document.querySelectorAll(
            'input[name="tiempo"]'
        );


    timeOptions.forEach((option) => {

        option.addEventListener(
            "change",
            () => {

                document.getElementById(
                    "summaryTime"
                ).textContent =
                    option.value;

            }
        );

    });


    /* ======================================
       ENVIAR FORMULARIO
    ====================================== */

    projectBrief.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* VALIDAR PRESUPUESTO */

            const presupuesto =
                document.querySelector(
                    'input[name="presupuesto"]:checked'
                );


            if (!presupuesto) {

                message.textContent =
                    "Selecciona un presupuesto aproximado.";

                return;

            }


            /* VALIDAR TIEMPO */

            const tiempo =
                document.querySelector(
                    'input[name="tiempo"]:checked'
                );


            if (!tiempo) {

                message.textContent =
                    "Selecciona cuándo te gustaría empezar.";

                return;

            }


            /* VALIDAR HONEYPOT */

            const honeypot =
                projectBrief.querySelector(
                    'input[name="_gotcha"]'
                );


            if (
                honeypot &&
                honeypot.value
            ) {

                return;

            }


            /* ESTADO DE ENVÍO */

            message.textContent =
                "Enviando tu brief...";


            message.style.color =
                "var(--text-muted)";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Enviando...";

            }


            try {


                /* CREAR DATOS */

                const formData =
                    new FormData(projectBrief);


                /* ENVIAR A FORMSPREE */

                const response =
                    await fetch(
                        projectBrief.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                /* RESPUESTA EXITOSA */

                if (response.ok) {


                    message.textContent =
                        "✓ Brief enviado correctamente. Gracias por contarme sobre tu proyecto. Me pondré en contacto contigo pronto.";


                    message.style.color =
                        "var(--text)";


                    /* LIMPIAR FORMULARIO */

                    projectBrief.reset();


                    /* LIMPIAR RESUMEN */

                    document.getElementById(
                        "summaryName"
                    ).textContent = "—";


                    document.getElementById(
                        "summaryEmail"
                    ).textContent = "—";


                    document.getElementById(
                        "summaryProject"
                    ).textContent = "—";


                    document.getElementById(
                        "summaryBudget"
                    ).textContent = "—";


                    document.getElementById(
                        "summaryTime"
                    ).textContent = "—";


                    /* VOLVER AL PASO 1 */

                    step2.classList.remove(
                        "active"
                    );

                    step1.classList.add(
                        "active"
                    );


                    progress2.classList.remove(
                        "active"
                    );

                    progress1.classList.add(
                        "active"
                    );


                    /* RESTAURAR BOTÓN */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            'Enviar el brief <span>↗</span>';

                    }


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });


                } else {


                    /* ERROR FORMSPREE */

                    const data =
                        await response
                            .json()
                            .catch(() => null);


                    if (
                        data &&
                        data.errors
                    ) {

                        message.textContent =
                            data.errors
                                .map(
                                    (error) =>
                                        error.message
                                )
                                .join(", ");

                    } else {

                        message.textContent =
                            "No fue posible enviar el brief. Inténtalo nuevamente.";

                    }


                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.innerHTML =
                            'Enviar el brief <span>↗</span>';

                    }

                }


            } catch (error) {


                console.error(
                    "Error enviando el brief:",
                    error
                );


                message.textContent =
                    "Ocurrió un error de conexión. Revisa tu conexión a Internet e inténtalo nuevamente.";


                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        'Enviar el brief <span>↗</span>';

                }

            }

        }
    );

}


/* ==========================================
   BODY LOADED
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);