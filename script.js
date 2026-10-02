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
   LLUVIA DIGITAL
========================================== */

const digitalRain = document.querySelector(".digital-rain");


if (
    digitalRain &&
    digitalRain.tagName.toLowerCase() === "canvas"
) {

    const canvas = digitalRain;
    const context = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    let fontSize = 14;
    let columns = 0;

    let drops = [];


    /*
       Caracteres utilizados para
       la lluvia digital.
    */

    const characters =
        "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>[]{}()/*+-=_";


    /* ======================================
       CONFIGURAR CANVAS
    ====================================== */

    function resizeRain() {

        const devicePixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);


        width = canvas.clientWidth;
        height = canvas.clientHeight;


        canvas.width =
            Math.floor(width * devicePixelRatio);

        canvas.height =
            Math.floor(height * devicePixelRatio);


        context.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );


        fontSize =
            Math.max(
                12,
                Math.min(
                    18,
                    width / 90
                )
            );


        columns =
            Math.ceil(
                width / fontSize
            );


        drops =
            Array.from(
                {
                    length: columns
                },
                () =>
                    Math.random() *
                    -(height / fontSize)
            );

    }


    /* ======================================
       DIBUJAR LLUVIA
    ====================================== */

    function drawRain() {

        /*
           Fondo transparente para permitir
           que se vea el diseño del hero.
        */

        context.clearRect(
            0,
            0,
            width,
            height
        );


        context.font =
            `${fontSize}px monospace`;


        for (
            let index = 0;
            index < drops.length;
            index++
        ) {

            const character =
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];


            const x =
                index *
                fontSize;


            const y =
                drops[index] *
                fontSize;


            /*
               Opacidad variable para que
               la lluvia no sea demasiado fuerte.
            */

            const opacity =
                Math.random() *
                0.35 +
                0.15;


            context.fillStyle =
                `rgba(255, 255, 255, ${opacity})`;


            context.fillText(
                character,
                x,
                y
            );


            /*
               Cuando una columna llega
               al final vuelve a comenzar.
            */

            if (
                y > height &&
                Math.random() > 0.975
            ) {

                drops[index] =
                    Math.random() *
                    -20;

            }


            /*
               Velocidad de caída.
            */

            drops[index] +=
                0.45;

        }


        requestAnimationFrame(
            drawRain
        );

    }


    /* ======================================
       INICIAR LLUVIA
    ====================================== */

    resizeRain();

    drawRain();


    /* ======================================
       RESPONSIVE
    ====================================== */

    window.addEventListener(
        "resize",
        resizeRain
    );

}


/* ==========================================
   MENÚ MOBILE
========================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.style.display === "block";


        if (isOpen) {

            mobileMenu.style.display =
                "none";


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        } else {

            mobileMenu.style.display =
                "block";


            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.style.display =
                "none";


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

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

                const nombreElement =
                    document.getElementById(
                        "nombre"
                    );


                const emailElement =
                    document.getElementById(
                        "email"
                    );


                const descripcionElement =
                    document.getElementById(
                        "descripcion"
                    );


                const nombre =
                    nombreElement
                        ? nombreElement.value.trim()
                        : "";


                const email =
                    emailElement
                        ? emailElement.value.trim()
                        : "";


                const cliente =
                    document.querySelector(
                        'input[name="cliente"]:checked'
                    );


                const proyecto =
                    document.querySelector(
                        'input[name="proyecto"]:checked'
                    );


                const descripcion =
                    descripcionElement
                        ? descripcionElement.value.trim()
                        : "";


                /* ==========================
                   VALIDAR NOMBRE
                ========================== */

                if (!nombre) {

                    alert(
                        "Por favor escribe tu nombre."
                    );

                    return;

                }


                /* ==========================
                   VALIDAR EMAIL
                ========================== */

                if (!email) {

                    alert(
                        "Por favor escribe tu email."
                    );

                    return;

                }


                const emailValido =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailValido.test(email)
                ) {

                    alert(
                        "Escribe un correo electrónico válido."
                    );

                    return;

                }


                /* ==========================
                   VALIDAR CLIENTE
                ========================== */

                if (!cliente) {

                    alert(
                        "Selecciona qué tipo de cliente eres."
                    );

                    return;

                }


                /* ==========================
                   VALIDAR PROYECTO
                ========================== */

                if (!proyecto) {

                    alert(
                        "Selecciona el tipo de proyecto."
                    );

                    return;

                }


                /* ==========================
                   VALIDAR DESCRIPCIÓN
                ========================== */

                if (!descripcion) {

                    alert(
                        "Cuéntame un poco más sobre tu proyecto."
                    );

                    return;

                }


                /* ==========================
                   ACTUALIZAR RESUMEN
                ========================== */

                const summaryName =
                    document.getElementById(
                        "summaryName"
                    );


                const summaryEmail =
                    document.getElementById(
                        "summaryEmail"
                    );


                const summaryProject =
                    document.getElementById(
                        "summaryProject"
                    );


                if (summaryName) {

                    summaryName.textContent =
                        nombre;

                }


                if (summaryEmail) {

                    summaryEmail.textContent =
                        email;

                }


                if (summaryProject) {

                    summaryProject.textContent =
                        proyecto.value;

                }


                /* ==========================
                   CAMBIAR PASO
                ========================== */

                if (step1) {

                    step1.classList.remove(
                        "active"
                    );

                }


                if (step2) {

                    step2.classList.add(
                        "active"
                    );

                }


                if (progress1) {

                    progress1.classList.remove(
                        "active"
                    );

                }


                if (progress2) {

                    progress2.classList.add(
                        "active"
                    );

                }


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

                if (step2) {

                    step2.classList.remove(
                        "active"
                    );

                }


                if (step1) {

                    step1.classList.add(
                        "active"
                    );

                }


                if (progress2) {

                    progress2.classList.remove(
                        "active"
                    );

                }


                if (progress1) {

                    progress1.classList.add(
                        "active"
                    );

                }


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

                const summaryBudget =
                    document.getElementById(
                        "summaryBudget"
                    );


                if (summaryBudget) {

                    summaryBudget.textContent =
                        option.value;

                }

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

                const summaryTime =
                    document.getElementById(
                        "summaryTime"
                    );


                if (summaryTime) {

                    summaryTime.textContent =
                        option.value;

                }

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


            /* ==============================
               VALIDAR PRESUPUESTO
            ============================== */

            const presupuesto =
                document.querySelector(
                    'input[name="presupuesto"]:checked'
                );


            if (!presupuesto) {

                if (message) {

                    message.textContent =
                        "Selecciona un presupuesto aproximado.";

                }

                return;

            }


            /* ==============================
               VALIDAR TIEMPO
            ============================== */

            const tiempo =
                document.querySelector(
                    'input[name="tiempo"]:checked'
                );


            if (!tiempo) {

                if (message) {

                    message.textContent =
                        "Selecciona cuándo te gustaría empezar.";

                }

                return;

            }


            /* ==============================
               VALIDAR HONEYPOT
            ============================== */

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


            /* ==============================
               ESTADO DE ENVÍO
            ============================== */

            if (message) {

                message.textContent =
                    "Enviando tu brief...";


                message.style.color =
                    "var(--text-muted)";

            }


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.innerHTML =
                    "Enviando...";

            }


            try {

                /* ==========================
                   CREAR DATOS
                ========================== */

                const formData =
                    new FormData(
                        projectBrief
                    );


                /* ==========================
                   ENVIAR A FORMSPREE
                ========================== */

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


                /* ==========================
                   RESPUESTA EXITOSA
                ========================== */

                if (response.ok) {

                    if (message) {

                        message.textContent =
                            "✓ Brief enviado correctamente. Gracias por contarme sobre tu proyecto. Me pondré en contacto contigo pronto.";


                        message.style.color =
                            "var(--text)";

                    }


                    /* ======================
                       LIMPIAR FORMULARIO
                    ====================== */

                    projectBrief.reset();


                    /* ======================
                       LIMPIAR RESUMEN
                    ====================== */

                    const summaryElements = [

                        "summaryName",
                        "summaryEmail",
                        "summaryProject",
                        "summaryBudget",
                        "summaryTime"

                    ];


                    summaryElements.forEach(
                        (id) => {

                            const element =
                                document.getElementById(
                                    id
                                );


                            if (element) {

                                element.textContent =
                                    "—";

                            }

                        }
                    );


                    /* ======================
                       VOLVER AL PASO 1
                    ====================== */

                    if (step2) {

                        step2.classList.remove(
                            "active"
                        );

                    }


                    if (step1) {

                        step1.classList.add(
                            "active"
                        );

                    }


                    if (progress2) {

                        progress2.classList.remove(
                            "active"
                        );

                    }


                    if (progress1) {

                        progress1.classList.add(
                            "active"
                        );

                    }


                    /* ======================
                       RESTAURAR BOTÓN
                    ====================== */

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

                    /* ======================
                       ERROR FORMSPREE
                    ====================== */

                    const data =
                        await response
                            .json()
                            .catch(
                                () => null
                            );


                    if (
                        data &&
                        data.errors &&
                        Array.isArray(
                            data.errors
                        )
                    ) {

                        if (message) {

                            message.textContent =
                                data.errors
                                    .map(
                                        (error) =>
                                            error.message
                                    )
                                    .join(", ");

                        }

                    } else {

                        if (message) {

                            message.textContent =
                                "No fue posible enviar el brief. Inténtalo nuevamente.";

                        }

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


                if (message) {

                    message.textContent =
                        "Ocurrió un error de conexión. Revisa tu conexión a Internet e inténtalo nuevamente.";

                }


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