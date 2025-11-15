const groups = [
  {
    words: [
      //1
      { text: "Entusiasta", type: "I", descripcion: "Persona animada y optimista que contagia energía." },
      { text: "Rápido(a)", type: "D", descripcion: "Actúa con agilidad y toma decisiones sin demora." },
      { text: "Lógico(a)", type: "C", descripcion: "Analiza situaciones de manera racional y objetiva." },
      { text: "Apacible", type: "S", descripcion: "De trato calmado, transmite serenidad a los demás." },

      //2
      { text: "Cauteloso(a)", type: "C", descripcion: "Evalúa cuidadosamente antes de actuar o decidir." },
      { text: "Decidido(a)", type: "D", descripcion: "Persona decidida, que actúa rápidamente." },
      { text: "Receptivo(a)", type: "I", descripcion: "Abierto a nuevas ideas, opiniones y experiencias." },
      { text: "Bondadoso(a)", type: "S", descripcion: "Actúa con amabilidad y preocupación genuina." },

      //3
      { text: "Amigable", type: "I", descripcion: "Crea conexión fácilmente, trato cercano y cálido." },
      { text: "Preciso(a)", type: "C", descripcion: "Cuida los detalles y busca exactitud en todo." },
      { text: "Franco(a)", type: "D", descripcion: "Habla directamente, sin rodeos ni ambigüedades." },
      { text: "Tranquilo(a)", type: "S", descripcion: "Mantiene la calma incluso en situaciones tensas." },

      //4
      { text: "Elocuente", type: "I", descripcion: "Se expresa con claridad y habilidad para comunicar." },
      { text: "Controlado(a)", type: "C", descripcion: "Gestiona sus emociones y acciones con disciplina." },
      { text: "Tolerante", type: "S", descripcion: "Acepta diferencias y mantiene buena convivencia." },
      { text: "Decisivo(a)", type: "D", descripcion: "Toma decisiones con firmeza y seguridad." },

      //5
      { text: "Atrevido(a)", type: "D", descripcion: "Se arriesga y enfrenta retos sin temor." },
      { text: "Concienzudo(a)", type: "C", descripcion: "Trabaja con dedicación, cuidado y responsabilidad." },
      { text: "Comunicativo(a)", type: "I", descripcion: "Se expresa con facilidad y disfruta conversar." },
      { text: "Moderado(a)", type: "S", descripcion: "Equilibrado en su actuar; evita excesos." },

      //6
      { text: "Ameno(a)", type: "S", descripcion: "Trato agradable que genera comodidad." },
      { text: "Ingenioso(a)", type: "I", descripcion: "Creativo y capaz de encontrar soluciones rápidas." },
      { text: "Investigador(a)", type: "C", descripcion: "Curioso, analiza profundamente lo que estudia." },
      { text: "Acepta Riesgos", type: "D", descripcion: "Dispuesto a asumir desafíos inciertos." },

      //7
      { text: "Expresivo", type: "I", descripcion: "Muestra emociones e ideas con claridad." },
      { text: "Cuidadoso(a)", type: "C", descripcion: "Se asegura de evitar errores y fallas." },
      { text: "Dominante", type: "D", descripcion: "Le gusta liderar y tomar control de las situaciones." },
      { text: "Sensible", type: "S", descripcion: "Percibe y comprende las emociones de otros." },

      //8
      { text: "Extrovertido(a)", type: "I", descripcion: "Disfruta socializar, expresivo y abierto." },
      { text: "Precavido(a)", type: "C", descripcion: "Actúa con cautela para evitar problemas." },
      { text: "Constante", type: "S", descripcion: "Persevera y mantiene ritmo estable en el tiempo." },
      { text: "Impaciente", type: "D", descripcion: "Desea resultados rápidos y evita esperas." },

      //9
      { text: "Discreto(a)", type: "C", descripcion: "Reservado, prudente y cuidadoso al hablar." },
      { text: "Complaciente", type: "S", descripcion: "Busca ayudar y agradar a los demás." },
      { text: "Encantador(a)", type: "I", descripcion: "Carisma natural que atrae a la gente." },
      { text: "Insistente", type: "D", descripcion: "Persiste hasta lograr lo que se propone." },

      //10
      { text: "Valeroso(a)", type: "D", descripcion: "Enfrenta situaciones difíciles con valentía." },
      { text: "Anima a los demás", type: "I", descripcion: "Motiva e inspira a quienes lo rodean." },
      { text: "Pacífico(a)", type: "S", descripcion: "Evita conflictos y promueve armonía." },
      { text: "Perfeccionista", type: "C", descripcion: "Exige exactitud y alto estándar en todo." },

      //11
      { text: "Reservado(a)", type: "C", descripcion: "Prefiere mantener su vida personal en privado." },
      { text: "Atento(a)", type: "S", descripcion: "Se preocupa por las necesidades de otros." },
      { text: "Osado(a)", type: "D", descripcion: "Toma decisiones arriesgadas con seguridad." },
      { text: "Alegre", type: "I", descripcion: "Transmite positivismo y buen ánimo." },

      //12
      { text: "Estimulante", type: "I", descripcion: "Inspira y energiza a quienes lo rodean." },
      { text: "Gentil", type: "S", descripcion: "Trato amable y respetuoso." },
      { text: "Perceptivo(a)", type: "C", descripcion: "Capta detalles y comprende situaciones complejas." },
      { text: "Independiente", type: "D", descripcion: "Le gusta actuar por cuenta propia." },

      //13
      { text: "Competitivo(a)", type: "D", descripcion: "Busca superar desafíos y destacar." },
      { text: "Considerado(a)", type: "S", descripcion: "Piensa en el impacto de sus acciones en otros." },
      { text: "Alegre", type: "I", descripcion: "Transmite energía positiva y entusiasmo." },
      { text: "Sagaz", type: "C", descripcion: "Hábil para analizar y comprender rápidamente." },

      //14
      { text: "Meticuloso(a)", type: "C", descripcion: "Cuida con detalle cada parte del proceso." },
      { text: "Obediente", type: "S", descripcion: "Sigue instrucciones y respeta reglas." },
      { text: "Ideas Firmes", type: "D", descripcion: "Mantiene convicciones claras y fuertes." },
      { text: "Alentador(a)", type: "I", descripcion: "Motiva y apoya a los demás." },

      //15
      { text: "Popular", type: "I", descripcion: "Apreciado socialmente, fácilmente querido." },
      { text: "Reflexivo(a)", type: "C", descripcion: "Piensa antes de actuar, profundo en análisis." },
      { text: "Tenaz", type: "D", descripcion: "Persistente ante obstáculos y desafíos." },
      { text: "Calmado(a)", type: "S", descripcion: "Mantiene serenidad y estabilidad." },

      //16
      { text: "Analitico(a)", type: "C", descripcion: "Examina los datos y situaciones con rigor." },
      { text: "Audaz", type: "D", descripcion: "Toma riesgos y enfrenta desafíos con valor." },
      { text: "Leal", type: "S", descripcion: "Firme compromiso con personas y responsabilidades." },
      { text: "Promotor(a)", type: "I", descripcion: "Inicia ideas y contagia entusiasmo." },

      //17
      { text: "Sociable", type: "I", descripcion: "Disfruta rodearse de personas y conversar." },
      { text: "Paciente", type: "S", descripcion: "Tolera tiempos largos sin estresarse." },
      { text: "Autosuficiente", type: "D", descripcion: "Prefiere resolver las cosas por sí mismo." },
      { text: "Certero(a)", type: "C", descripcion: "Preciso y correcto en sus decisiones." },

      //18
      { text: "Adaptable", type: "S", descripcion: "Se ajusta sin dificultad a cambios o imprevistos." },
      { text: "Resuelto(a)", type: "D", descripcion: "Actúa con determinación para lograr objetivos." },
      { text: "Prevenido(a)", type: "C", descripcion: "Planifica para evitar errores o riesgos." },
      { text: "Vivaz", type: "I", descripcion: "Energético, dinámico y animado." },

      //19
      { text: "Agresivo(a)", type: "D", descripcion: "Enfrenta situaciones con intensidad y firmeza." },
      { text: "Impetuoso(a)", type: "I", descripcion: "Actúa con espontaneidad y energía emocional." },
      { text: "Amistoso(a)", type: "S", descripcion: "Crea relaciones cálidas y de confianza." },
      { text: "Discerniente", type: "C", descripcion: "Juzga con claridad y analiza con criterio." },

      //20
      { text: "De Trato Fácil", type: "I", descripcion: "Agradable y sencillo para interactuar." },
      { text: "Compasivo(a)", type: "S", descripcion: "Empático y atento al sufrimiento ajeno." },
      { text: "Cauto(a)", type: "C", descripcion: "Evita riesgos innecesarios, muy prudente." },
      { text: "Habla Directo", type: "D", descripcion: "Se comunica sin rodeos, claro y firme." },

      //21
      { text: "Evaluador(a)", type: "C", descripcion: "Analiza y compara antes de concluir." },
      { text: "Generoso(a)", type: "S", descripcion: "Da y ayuda sin esperar algo a cambio." },
      { text: "Animado(a)", type: "I", descripcion: "Con energía y entusiasmo contagioso." },
      { text: "Persistente", type: "D", descripcion: "Insiste hasta lograr lo que se propone." },

      //22
      { text: "Impulsivo(a)", type: "I", descripcion: "Actúa guiado por el momento, espontáneo." },
      { text: "Cuida los detalles", type: "C", descripcion: "Atención minuciosa a cada aspecto." },
      { text: "Enérgico(a)", type: "D", descripcion: "Actúa con fuerza, dinamismo y decisión." },
      { text: "Tranquilo(a)", type: "S", descripcion: "Sereno aun en situaciones tensas." },

      //23
      { text: "Sociable", type: "I", descripcion: "Le gusta compartir y conversar con otros." },
      { text: "Sistemático(a)", type: "C", descripcion: "Organizado y metódico en su forma de trabajar." },
      { text: "Vigoroso(a)", type: "D", descripcion: "Muestra fuerza, energía y determinación." },
      { text: "Tolerante", type: "S", descripcion: "Acepta diferencias y mantiene la armonía." },

      //24
      { text: "Cautivador(a)", type: "I", descripcion: "Atrae y mantiene la atención de los demás." },
      { text: "Contento(a)", type: "S", descripcion: "Actitud positiva y satisfacción constante." },
      { text: "Exigente", type: "D", descripcion: "Demanda altos estándares y resultados." },
      { text: "Apegado(a) a las normas", type: "C", descripcion: "Cumple reglas con estricta disciplina." },

      //25
      { text: "Le agrada discutir", type: "D", descripcion: "Defiende ideas con firmeza y confrontación." },
      { text: "Metódico(a)", type: "C", descripcion: "Sigue procesos ordenados y estructurados." },
      { text: "Comedido(a)", type: "S", descripcion: "Actúa con prudencia y moderación." },
      { text: "Desenvuelto(a)", type: "I", descripcion: "Seguro al interactuar, fluido socialmente." },

      //26
      { text: "Jovial", type: "I", descripcion: "Alegre, simpático y de espíritu ligero." },
      { text: "Preciso(a)", type: "C", descripcion: "Exacto y detallado en su actuar." },
      { text: "Directo(a)", type: "D", descripcion: "Va al punto sin rodeos ni dudas." },
      { text: "Ecuánime", type: "S", descripcion: "Justo y equilibrado en sus decisiones." },

      //27
      { text: "Inquieto(a)", type: "D", descripcion: "Necesita acción, se impacienta con la espera." },
      { text: "Amable", type: "S", descripcion: "Cordial, cercano y respetuoso." },
      { text: "Elocuente", type: "I", descripcion: "Habla con claridad, fluidez y persuasión." },
      { text: "Cuidadoso(a)", type: "C", descripcion: "Evita errores siendo muy meticuloso." },

      //28
      { text: "Prudente", type: "C", descripcion: "Actúa evitando riesgos y decisiones apresuradas." },
      { text: "Pionero(a)", type: "D", descripcion: "Inicia proyectos y abre caminos nuevos." },
      { text: "Espontáneo(a)", type: "I", descripcion: "Actúa de manera natural y sin planear demasiado." },
      { text: "Colaborador", type: "S", descripcion: "Trabaja bien en equipo y apoya a otros." },
    ],
  },
];
