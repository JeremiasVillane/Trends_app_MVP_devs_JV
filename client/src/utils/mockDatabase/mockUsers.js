///--- ESTUDIANTES ---///

const student1 = {
  type: "student",
  name: "Juan Perez",
  username: "juanperez",
  email: "juan.perez@example.com",
  password: "contraseña123",
  profile_bio:
    "Estudiante apasionado de ingeniería informática y desarrollo de software. Buscando especialización y oportunidades laborales.",
  profile_birth: "2003-05-21",
  profile_image: "https://randomuser.me/api/portraits/men/8.jpg",
  profile_city: "Buenos Aires",
  profile_country: "Argentina",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad Nacional de Buenos Aires",
  academic_level: "En curso", // Principiante - En curso - Intermedio - Avanzado
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2023",
  info_career: ["Desarrollo de Software"],
  info_skills: ["Python"],
  info_goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Informática / Telecomunicaciones"],
  info_problematic: [
    "Falta de información del mercado laboral",
    "Falta de guía profesional",
  ], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-Time", // Full-time - part-time
  info_contract: "Remoto", // Presencial - Remoto - Híbrido
};

const student2 = {
  type: "student",
  name: "Maria Sanchez",
  username: "mariasanchez",
  email: "maria.sanchez@example.com",
  password: "password456",
  profile_bio:
    "Estudiante de Recursos Humanos en busca de especialización y desarrollo profesional. Apasionada por la gestión del talento.",
  profile_birth: "2003-05-12",
  profile_image: "https://randomuser.me/api/portraits/women/13.jpg",
  profile_city: "Madrid",
  profile_country: "España",
  profile_support: false,
  academic_formation: "Universitario Intermedio",
  academic_institution: "Universidad Complutense de Madrid",
  academic_level: "En curso",
  academic_area: ["Administración de Empresas"],
  academic_graduation: "2023",
  info_career: ["Recursos Humanos"],
  info_skills: [
    "Gestión del talento",
    "Entrevistas de selección",
    "Administración de personal",
  ],
  info_goals: ["Profundizar en mis estudios", "Elegir una especialización"],
  info_interests: ["Informática / Telecomunicaciones"],
  info_problematic: ["Falta de guía profesional"],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student3 = {
  type: "student",
  name: "Mark Smith",
  username: "marksmith",
  email: "mark.smith@example.com",
  password: "password789",
  profile_bio:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
  profile_birth: "2003-05-12",
  profile_image: "https://randomuser.me/api/portraits/men/9.jpg",
  profile_city: "New York",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Universitario Junior",
  academic_institution: "New York University",
  academic_level: "Principiante",
  academic_area: ["Psicología"],
  academic_graduation: "2023",
  info_career: ["Psicoterapia"],
  info_skills: [
    "Entrevistas clínicas",
    "Terapia cognitivo-conductual",
    "Manejo de casos",
  ],
  info_goals: ["Profundizar en mis estudios", "Elegir una especialización"],
  info_interests: [
    "Informática / Telecomunicaciones"
  ],
  info_problematic: [
    "No sé que es lo que me gusta",
    "Falta de guía profesional",
  ],
  info_languages: ["Inglés", "Español"],
  info_availability: "Part-time",
  info_contract: "Remoto",
};

const student4 = {
  type: "student",
  name: "Laura Johnson",
  username: "laurajohnson",
  email: "laura.johnson@example.com",
  password: "qwerty123",
  profile_bio:
    "Estudiante de Psicología en New York University, interesado en investigar neurociencia y tratar trastornos de ansiedad. Busco definir mi camino profesional.",
  profile_birth: "2007-01-12",
  profile_image: "https://randomuser.me/api/portraits/women/14.jpg",
  profile_city: "London",
  profile_country: "United Kingdom",
  profile_support: false,
  academic_formation: "Secundaria",
  academic_institution: "London High School",
  academic_level: "Principiante",
  academic_area: ["Derecho"],
  academic_graduation: "2023",
  info_career: ["Abogacía"],
  info_skills: ["Litigio"],
  info_goals: ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
  info_interests: ["Derecho laboral"],
  info_problematic: ["Dificultad para conseguir trabajo"],
  info_languages: ["Español"],
  info_availability: "Part-Time",
  info_contract: "Remoto",
};

const student5 = {
  type: "student",
  name: "Carlos Fernández",
  username: "carlosfernandez",
  email: "carlos.fernandez@example.com",
  password: "contraseña456",
  profile_bio:
    "Estudiante de Derecho en la UNAM, interesado en derecho internacional y propiedad intelectual. Busco pasantía o trabajo y conocer el mercado laboral.",
  profile_birth: "2000-02-12",
  profile_image: "https://randomuser.me/api/portraits/men/10.jpg",
  profile_city: "Mexico City",
  profile_country: "Mexico",
  profile_support: true,
  academic_formation: "Universitario Avanzado",
  academic_institution: "Universidad Nacional Autónoma de México",
  academic_level: "Avanzado",
  academic_area: ["Derecho"],
  academic_graduation: "2023",
  info_career: ["Abogacía"],
  info_skills: ["Investigación jurídica", "Litigio", "Redacción legal"],
  info_goals: [
    "Encontrar una pasantía o trabajo",
    "Conocer más sobre el mercado laboral de mi profesión",
    "Profundizar en mis estudios",
  ],
  info_interests: ["Derecho internacional", "Propiedad intelectual"],
  info_problematic: [
    "No sé que es lo que me gusta",
    "Falta de información del mercado laboral",
  ],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student6 = {
  type: "student",
  name: "Juan Gomez",
  username: "juan",
  email: "juan@email.com",
  password: "1234",
  profile_bio:
    "Estudiante de Finanzas y Marketing en busca de pasantía o trabajo. Interesado en marketing internacional y conocer el mercado laboral de mi profesión.",
  profile_birth: "2000-02-02",
  profile_image: "https://randomuser.me/api/portraits/men/11.jpg",
  profile_city: "Cartagena",
  profile_country: "Colombia",
  profile_support: true,
  academic_formation: "Secundaria",
  academic_institution: "Instituto Superior de Enseñanza Inferior",
  academic_level: "Intermedio",
  academic_area: ["Finanzas", "Marketing"],
  academic_graduation: "2023",
  info_career: ["Perito mercantil"],
  info_skills: ["Contabilidad", "Gestión"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Encontrar una pasantía o trabajo",
  ],
  info_interests: ["Marketing internacional"],
  info_problematic: ["Dificultad para conseguir trabajo"],
  info_languages: ["Inglés", "Español"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student7 = {
  type: "student",
  name: "Jonathan Leroy",
  username: "jonathan",
  email: "jona@example.com",
  password: "qwerty",
  profile_bio:
    "Estudiante de Finanzas en University of California, Berkeley, interesado en análisis de inversiones y mercado de valores. Busco profundizar mis estudios y elegir una especialización.",
  profile_birth: "2000-02-02",
  profile_image: "https://randomuser.me/api/portraits/men/12.jpg",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Secundaria",
  academic_institution: "University of California, Berkeley",
  academic_level: "Principiante",
  academic_area: ["Finanzas"],
  academic_graduation: "2023",
  info_career: ["Análisis de inversiones"],
  info_skills: [
    "Modelado financiero",
    "Análisis de riesgos",
    "Conocimientos en mercado de capitales",
  ],
  info_goals: ["Profundizar en mis estudios", "Elegir una especialización"],
  info_interests: ["Mercado de valores", "Inversiones sostenibles"],
  info_problematic: [
    "Falta de guía profesional",
    "Dificultad para conseguir trabajo",
  ],
  info_languages: ["Español"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const student8 = {
  type: "student",
  name: "Maria Lopez",
  username: "marialopez",
  email: "maria.lopez@example.com",
  password: "marialopezpass",
  profile_bio:
    "Soy una estudiante apasionada por el diseño gráfico y la creatividad. Siempre busco aprender nuevas técnicas y enfoques para mejorar mis habilidades.",
  profile_birth: "2000-11-12",
  profile_image: "https://randomuser.me/api/portraits/women/15.jpg",
  profile_city: "Bogotá",
  profile_country: "Colombia",
  profile_support: false,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad de los Andes",
  academic_level: "Avanzado",
  academic_area: ["Diseño Gráfico"],
  academic_graduation: "2022",
  info_career: ["Diseño Gráfico"],
  info_skills: ["Adobe Illustrator", "Adobe Photoshop", "Diseño de logotipos"],
  info_goals: [
    "Encontrar una pasantía o trabajo",
    "Profundizar en mis estudios",
    "Conocer nuevos colegas y oportunidades",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Branding", "Diseño editorial"],
  info_problematic: [
    "Falta de información del mercado laboral",
    "Falta de guía profesional",
    "Dificultad para conseguir trabajo",
  ], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Part-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student9 = {
  type: "student",
  name: "Michael Johnson",
  username: "mikejohnson",
  email: "mike.johnson@example.com",
  password: "mike1234",
  profile_bio:
    "Estudiante de ciencias ambientales y amante de la naturaleza. Mi objetivo es trabajar en proyectos que ayuden a preservar y proteger el medio ambiente para las generaciones futuras.",
  profile_birth: "2002-09-03",
  profile_image: "https://randomuser.me/api/portraits/men/12.jpg",
  profile_city: "Sydney",
  profile_country: "Australia",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "University of Sydney",
  academic_level: "En curso",
  academic_area: ["Ciencias Ambientales"],
  academic_graduation: "2024",
  info_career: ["Conservación del Medio Ambiente"],
  info_skills: ["Investigación ambiental", "Manejo de ecosistemas"],
  info_goals: [
    "Profundizar en mis estudios",
    "Elegir una especialización",
    "Conocer nuevos colegas y oportunidades",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Restauración de hábitats naturales", "Energías renovables"],
  info_problematic: [
    "Falta de guía profesional",
    "Falta de información del mercado laboral",
  ], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Inglés"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Híbrido", // Presencial - Remoto - Híbrido
};

const student10 = {
  type: "student",
  name: "Sophie Martin",
  username: "sophiem",
  email: "sophie.martin@example.com",
  password: "sophiepass",
  profile_bio:
    "Estudiante de medicina con pasión por la investigación y el servicio a los demás. Sueño con convertirme en una médica que marque la diferencia en la vida de las personas.",
  profile_birth: "2001-07-19",
  profile_image: "https://randomuser.me/api/portraits/women/16.jpg",
  profile_city: "Paris",
  profile_country: "France",
  profile_support: false,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Université Paris Descartes",
  academic_level: "Intermedio",
  academic_area: ["Medicina"],
  academic_graduation: "2023",
  info_career: ["Medicina General"],
  info_skills: ["Investigación médica", "Atención al paciente"],
  info_goals: [
    "Elegir una especialización",
    "Encontrar una pasantía o trabajo",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Salud pública", "Medicina comunitaria"],
  info_problematic: ["Dificultad para conseguir trabajo"], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Francés", "Inglés"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student11 = {
  type: "student",
  name: "Emily Chen",
  username: "emilyc",
  email: "emily.chen@example.com",
  password: "emily123",
  profile_bio:
    "Apasionada por las artes escénicas y el teatro. Siempre en busca de oportunidades para expresar mi creatividad y conectar con el público a través de las actuaciones.",
  profile_birth: "2000-04-25",
  profile_image: "https://randomuser.me/api/portraits/women/17.jpg",
  profile_city: "New York City",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Tisch School of the Arts, NYU",
  academic_level: "En curso",
  academic_area: ["Artes Escénicas"],
  academic_graduation: "2022",
  info_career: ["Actuación Teatral"],
  info_skills: ["Interpretación", "Expresión corporal", "Danza"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Conocer nuevos colegas y oportunidades",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Teatro musical", "Actuación en cine"],
  info_problematic: [
    "Falta de guía profesional",
    "Dificultad para conseguir trabajo",
  ], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Inglés", "Mandarín"],
  info_availability: "Part-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student12 = {
  type: "student",
  name: "Carlos Gutierrez",
  username: "carlosg",
  email: "carlos.gutierrez@example.com",
  password: "carlos1234",
  profile_bio:
    "Estudiante de ingeniería civil con pasión por el diseño de infraestructuras sostenibles. Busco contribuir al desarrollo urbano de manera responsable con el medio ambiente.",
  profile_birth: "2001-09-15",
  profile_image: "https://randomuser.me/api/portraits/men/13.jpg",
  profile_city: "Mexico City",
  profile_country: "Mexico",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad Nacional Autónoma de México",
  academic_level: "En curso",
  academic_area: ["Ingeniería Civil"],
  academic_graduation: "2023",
  info_career: ["Diseño de Infraestructuras Sostenibles"],
  info_skills: [
    "Diseño estructural",
    "Modelado 3D",
    "Análisis de recursos naturales",
  ],
  info_goals: ["Encontrar una pasantía o trabajo"],
  info_interests: ["Infraestructuras verdes", "Construcción ecológica"],
  info_problematic: [
    "Falta de información del mercado laboral, Falta de guía profesional, Dificultad para conseguir trabajo",
  ],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student13 = {
  type: "student",
  name: "Sophia Lee",
  username: "sophial",
  email: "sophia.lee@example.com",
  password: "sophia1234",
  profile_bio:
    "Estudiante de psicología interesada en el bienestar emocional y mental. Aspiro a ayudar a las personas a superar sus desafíos emocionales y desarrollar una mentalidad positiva.",
  profile_birth: "2002-03-07",
  profile_image: "https://randomuser.me/api/portraits/women/18.jpg",
  profile_city: "Los Angeles",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "University of California, Los Angeles",
  academic_level: "En curso",
  academic_area: ["Psicología"],
  academic_graduation: "2024",
  info_career: ["Psicología Clínica"],
  info_skills: [
    "Evaluación psicológica",
    "Terapia cognitivo-conductual",
    "Psicología positiva",
  ],
  info_goals: [
    "Profundizar en mis estudios",
    "Conocer nuevos colegas y oportunidades",
  ],
  info_interests: [
    "Psicología infantil",
    "Salud emocional en el ámbito laboral",
  ],
  info_problematic: ["Falta de información del mercado laboral"],
  info_languages: ["Inglés", "Español", "Coreano"],
  info_availability: "Part-time", // Full-time - part-time
  info_contract: "Remoto", // Presencial - Remoto - Híbrido
};

const student14 = {
  type: "student",
  name: "Alexandre Silva",
  username: "alexandres",
  email: "alexandre.silva@example.com",
  password: "alexandre1234",
  profile_bio:
    "Estudiante de biología con interés en la investigación de la biodiversidad y la conservación de especies. Me apasiona el estudio de los ecosistemas y su relación con el cambio climático.",
  profile_birth: "2000-12-28",
  profile_image: "https://randomuser.me/api/portraits/women/19.jpg",
  profile_city: "São Paulo",
  profile_country: "Brazil",
  profile_support: false,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidade de São Paulo",
  academic_level: "En curso",
  academic_area: ["Biología"],
  academic_graduation: "2023",
  info_career: ["Ecología y Conservación"],
  info_skills: [
    "Investigación de campo",
    "Estadísticas aplicadas a la ecología",
    "Manejo de biodiversidad",
  ],
  info_goals: ["Conocer nuevos colegas y oportunidades"],
  info_interests: ["Falta de información del mercado laboral"],
  info_problematic: ["Deforestación", "Contaminación de ecosistemas acuáticos"],
  info_languages: ["Portugués", "Inglés", "Español"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student15 = {
  type: "student",
  name: "Pedro Martinez",
  username: "pedrom",
  email: "pedro.martinez@example.com",
  password: "pedro2023",
  profile_bio:
    "Estudiante de arquitectura apasionado por el diseño sostenible y la construcción ecológica. Mi objetivo es crear espacios armoniosos que respeten el entorno y promuevan un estilo de vida más sustentable.",
  profile_birth: "2002-06-15",
  profile_image: "https://randomuser.me/api/portraits/men/13.jpg",
  profile_city: "Santiago",
  profile_country: "Chile",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Pontificia Universidad Católica de Chile",
  academic_level: "En curso",
  academic_area: ["Arquitectura"],
  academic_graduation: "2024",
  info_career: ["Diseño Sostenible"],
  info_skills: ["Modelado 3D", "Diseño bioclimático", "Tecnologías verdes"],
  info_goals: [
    "Elegir una especialización",
    "Conocer nuevos colegas y oportunidades",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Arquitectura sustentable", "Eficiencia energética"],
  info_problematic: ["Falta de información del mercado laboral"], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student16 = {
  type: "student",
  name: "Ana Ramirez",
  username: "anaram",
  email: "ana.ramirez@example.com",
  password: "anapass123",
  profile_bio:
    "Estudiante de ingeniería civil enfocada en proyectos de infraestructura vial. Mi objetivo es contribuir al diseño y construcción de carreteras seguras y eficientes para mejorar la movilidad urbana.",
  profile_birth: "2001-08-10",
  profile_image: "https://randomuser.me/api/portraits/women/20.jpg",
  profile_city: "Lima",
  profile_country: "Peru",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad Nacional de Ingeniería",
  academic_level: "En curso",
  academic_area: ["Ingeniería Civil"],
  academic_graduation: "2023",
  info_career: ["Infraestructura Vial"],
  info_skills: [
    "Diseño de carreteras",
    "Análisis de tráfico",
    "Ingeniería de pavimentos",
  ],
  info_goals: [
    "Encontrar una pasantía o trabajo",
    "Conocer más sobre el mercado laboral de mi profesión",
  ],
  info_interests: [
    "Transporte público eficiente",
    "Innovación en ingeniería civil",
  ],
  info_problematic: [
    "Falta de guía profesional",
    "Dificultad para conseguir trabajo",
  ],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student17 = {
  type: "student",
  name: "Isabella Torres",
  username: "isatorres",
  email: "isabella.torres@example.com",
  password: "isabella2023",
  profile_bio:
    "Estudiante de arquitectura con pasión por el diseño urbano y la regeneración de espacios públicos. Aspiro a crear ciudades más habitables y amigables con el entorno.",
  profile_birth: "2001-11-28",
  profile_image: "https://randomuser.me/api/portraits/women/21.jpg",
  profile_city: "Bogotá",
  profile_country: "Colombia",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad de Los Andes",
  academic_level: "En curso",
  academic_area: ["Arquitectura"],
  academic_graduation: "2023",
  info_career: ["Diseño Urbano"],
  info_skills: [
    "Planificación urbana",
    "Diseño de espacios públicos",
    "Sostenibilidad urbana",
  ],
  info_goals: [
    "Profundizar en mis estudios",
    "Conocer nuevos colegas y oportunidades",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Regeneración urbana", "Movilidad sostenible"],
  info_problematic: ["Falta de guía profesional"], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student18 = {
  type: "student",
  name: "David Hernandez",
  username: "davidh",
  email: "david.hernandez@example.com",
  password: "david1234",
  profile_bio:
    "Estudiante apasionado por la programación y el desarrollo de software. Busco adquirir conocimientos en nuevas tecnologías y contribuir a la creación de soluciones innovadoras.",
  profile_birth: "2000-09-12",
  profile_image: "https://randomuser.me/api/portraits/men/14.jpg",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Stanford University",
  academic_level: "En curso",
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2023",
  info_career: ["Desarrollo de Software"],
  info_skills: [
    "Programación en Java",
    "Desarrollo web",
    "Inteligencia Artificial",
  ],
  info_goals: [
    "Encontrar una pasantía o trabajo",
    "Elegir una especialización",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Machine Learning", "Desarrollo de aplicaciones móviles"],
  info_problematic: ["Dificultad para conseguir trabajo"], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Inglés", "Español"],
  info_availability: "Full-time", // Full-time - part-time
  info_contract: "Remoto", // Presencial - Remoto - Híbrido
};

const student19 = {
  type: "student",
  name: "Luisa Sánchez",
  username: "luisas",
  email: "luisa.sanchez@example.com",
  password: "luisa5678",
  profile_bio:
    "Estudiante de ingeniería informática con interés en la ciberseguridad. Me apasiona la protección de datos y la prevención de ataques informáticos.",
  profile_birth: "2001-05-18",
  profile_image: "https://randomuser.me/api/portraits/women/22.jpg",
  profile_city: "Madrid",
  profile_country: "Spain",
  profile_support: false,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad Politécnica de Madrid",
  academic_level: "En curso",
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2024",
  info_career: ["Ciberseguridad"],
  info_skills: [
    "Seguridad de redes",
    "Criptografía",
    "Análisis de vulnerabilidades",
  ],
  info_goals: [
    "Conocer nuevos colegas y oportunidades",
    "Encontrar una pasantía o trabajo",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Ethical Hacking", "Seguridad en sistemas operativos"],
  info_problematic: ["Falta de guía profesional"], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Part-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

const student20 = {
  type: "student",
  name: "María Rodriguez",
  username: "mariar",
  email: "maria.rodriguez@example.com",
  password: "maria2023",
  profile_bio:
    "Estudiante de diseño gráfico enfocada en la creación de identidades visuales impactantes. Mi objetivo es combinar la creatividad con la estrategia para transmitir mensajes poderosos a través del diseño.",
  profile_birth: "2002-02-05",
  profile_image: "https://randomuser.me/api/portraits/women/15.jpg",
  profile_city: "Buenos Aires",
  profile_country: "Argentina",
  profile_support: true,
  academic_formation: "Universitario Avanzado", // Secundaria - Universitario Junior - Universitario Intermedio - Universitario Avanzado
  academic_institution: "Universidad de Buenos Aires",
  academic_level: "En curso",
  academic_area: ["Diseño Gráfico"],
  academic_graduation: "2023",
  info_career: ["Diseño Gráfico"],
  info_skills: ["Ilustración digital", "Branding", "Diseño de interfaces"],
  info_goals: [
    "Encontrar una pasantía o trabajo",
    "Elegir una especialización",
  ], // Elegir una carrera - Encontrar una pasantía o trabajo - Conocer más sobre el mercado laboral de mi profesión - Profundizar en mis estudios - Elegir una especialización - Conocer nuevos colegas y oportunidades
  info_interests: ["Diseño editorial", "Animación gráfica"],
  info_problematic: ["Falta de guía profesional"], // No sé que es lo que me gusta - Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Part-time", // Full-time - part-time
  info_contract: "Presencial", // Presencial - Remoto - Híbrido
};

///--- PROFESIONALES ---///

const professional1 = {
  type: "professional",
  name: "Ana Rodriguez",
  username: "anarodriguez",
  email: "ana.rodriguez@example.com",
  password: "password123",
  profile_bio:
    "Gerente de Marketing en ABC Marketing Agency. Especializada en marketing digital y planificación estratégica. Interesada en conocer más sobre el mercado laboral y conectar con colegas.",
  profile_birth: "1997-03-01",
  profile_image: "https://randomuser.me/api/portraits/women/1.jpg",
  profile_city: "Madrid",
  profile_country: "España",
  profile_support: true,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Universidad Autónoma de Madrid",
  academic_area: ["Marketing"],
  academic_graduation: "2000",
  info_company_name: "ABC Marketing Agency",
  info_position: "Gerente de Marketing",
  info_career: [
    "Desarrollo e implementación de estrategias de marketing",
    "Gestión de equipos y proyectos",
    "Incremento de la visibilidad de la marca",
  ],
  info_skills: [
    "Marketing digital",
    "Planificación estratégica",
    "Análisis de datos",
  ],
  info_interests: ["Informática / Telecomunicaciones"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Conocer nuevos colegas y oportunidades",
  ], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de información del mercado laboral"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const professional2 = {
  type: "professional",
  name: "Michael Brown",
  username: "michaelbrown",
  email: "michael.brown@example.com",
  password: "password456",
  profile_bio:
    "Ingeniero de Software en XYZ Tech Solutions. Especializado en desarrollo web y móvil, con interés en Inteligencia Artificial y aplicaciones híbridas. Busco especialización y emprender.",
  profile_birth: "1997-06-07",
  profile_image: "https://randomuser.me/api/portraits/men/1.jpg",
  profile_city: "New York",
  profile_country: "United States",
  profile_support: false,
  academic_formation: "Middle",
  academic_institution: "Stanford University",
  academic_area: ["Ingeniería de Software"],
  academic_graduation: "2000",
  info_company_name: "XYZ Tech Solutions",
  info_position: "Ingeniero de Software",
  info_career: [
    "Desarrollo de aplicaciones web y móviles",
    "Colaboración en equipos de desarrollo ágiles",
    "Optimización de rendimiento de software",
  ],
  info_skills: [
    "Programación en Java",
    "Desarrollo de APIs",
    "Pruebas automatizadas",
  ],
  info_interests: [
    "Informática / Telecomunicaciones"
  ],
  info_goals: ["Hacer una especialización", "Emprender"],
  info_problematic: ["Dificultad para conseguir trabajo"],
  info_languages: ["Inglés"],
  info_availability: "Full-time",
  info_contract: "Híbrido",
};

const professional3 = {
  type: "professional",
  name: "Marie Martin",
  username: "mariemartin",
  email: "marie.martin@example.com",
  password: "qwerty123",
  profile_bio:
    "Consultora de Recursos Humanos en ABC Consulting, especializada en evaluación de personal y desarrollo de talento. Interesada en psicología organizacional y liderazgo.",
  profile_birth: "1997-03-01",
  profile_image: "https://randomuser.me/api/portraits/women/2.jpg",
  profile_city: "Paris",
  profile_country: "France",
  profile_support: true,
  academic_formation: "Junior",
  academic_institution: "Sorbonne University",
  level: "Principiante",
  academic_area: ["Psicología"],
  academic_graduation: "2000",
  info_company_name: "ABC Consulting",
  info_position: "Consultora de Recursos Humanos",
  info_career: [
    "Evaluación y selección de personal",
    "Desarrollo de planes de capacitación",
    "Gestión del clima laboral",
  ],
  info_skills: [
    "Entrevistas de selección",
    "Gestión del talento",
    "Capacitación y desarrollo",
  ],
  info_interests: ["Informática / Telecomunicaciones"],
  info_goals: ["Conocer nuevos colegas y oportunidades"],
  info_problematic: ["Falta de información del mercado laboral"],
  info_languages: ["Francés", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Híbrido",
};

const professional4 = {
  type: "professional",
  name: "David Lee",
  username: "davidlee",
  email: "david.lee@example.com",
  password: "password789",
  profile_bio:
    "Estudiante de Finanzas en University of California, Berkeley, interesado en análisis de inversiones y mercado de valores. Buscando adquirir experiencia en el campo financiero.",
  profile_birth: "2005-10-20",
  profile_image: "https://randomuser.me/api/portraits/men/2.jpg",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Sin Experiencia",
  academic_institution: "University of California, Berkeley",
  academic_area: ["Finanzas"],
  academic_graduation: "2000",
  info_company_name: "",
  info_position: "",
  info_career: [
    "Análisis de inversiones",
    "Elaboración de informes financieros",
    "Gestión de carteras",
  ],
  info_skills: [
    "Modelado financiero",
    "Análisis de riesgos",
    "Conocimientos en mercado de capitales",
  ],
  info_interests: ["Mercado de valores", "Inversiones sostenibles"],
  info_goals: [
    "Conseguir un trabajo",
    "Conocer más sobre el mercado laboral de mi profesión",
  ],
  info_problematic: [
    "Falta de información del mercado laboral",
    "Dificultad para conseguir trabajo",
  ],
  info_languages: ["Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional5 = {
  type: "professional",
  name: "Maria Garcia",
  username: "mariagarcia",
  email: "maria.garcia@example.com",
  password: "contraseña456",
  profile_bio:
    "Consultora de Estrategia en ABC Consulting, especializada en análisis de mercado y desarrollo empresarial. Interesada en transformación digital e innovación empresarial.",
  profile_birth: "2007-01-12",
  profile_image: "https://randomuser.me/api/portraits/women/3.jpg",
  profile_city: "Madrid",
  profile_country: "España",
  profile_support: false,
  academic_formation: "Senior",
  academic_institution: "IE Business School",
  academic_area: ["Dirección de Empresas"],
  academic_graduation: "2000",
  info_company_name: "ABC Consulting",
  info_position: "Consultora de Estrategia",
  info_career: [
    "Análisis de mercado y competencia",
    "Desarrollo e implementación de estrategias empresariales",
    "Gestión de las organizaciones",
  ],
  info_skills: [
    "Análisis estratégico",
    "Planificación empresarial",
    "Facilitación de talleres",
  ],
  info_interests: ["Transformación digital", "Innovación empresarial"],
  info_goals: [
    "Conocer más sobre el mercado laboral de mi profesión",
    "Conocer nuevos colegas y oportunidades",
  ],
  info_problematic: ["Falta de información del mercado laboral"],
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Remoto",
};

const professional6 = {
  type: "professional",
  name: "John Smith",
  username: "johnsmith",
  email: "john.smith@example.com",
  password: "password123",
  profile_bio:
    "Experienced software engineer with a passion for developing scalable and efficient applications. Seeking opportunities to work on challenging projects and collaborate with talented teams.",
  profile_birth: "1985-10-12",
  profile_image: "https://randomuser.me/api/portraits/men/3.jpg",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: false,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Stanford University",
  academic_area: ["Computer Science"],
  academic_graduation: "2007",
  info_company_name: "Tech Innovations Inc.",
  info_position: "Senior Software Engineer",
  info_career: [
    "Full-stack web development",
    "Cloud computing",
    "Agile software development",
  ],
  info_skills: ["JavaScript", "Node.js", "AWS", "React"],
  info_interests: ["Machine Learning", "Blockchain Technology"],
  info_goals: [
    "Conocer nuevos colegas y oportunidades",
    "Hacer una especialización",
  ], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  info_languages: ["English"],

  
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional7 = {
  type: "professional",
  name: "Laura Fernandez",
  username: "laurafernandez",
  email: "laura.fernandez@example.com",
  password: "password123",
  profile_bio:
    "Marketing professional with a focus on digital advertising and brand management. Committed to driving brand awareness and customer engagement through innovative marketing strategies.",
  profile_birth: "1990-06-25",
  profile_image: "https://randomuser.me/api/portraits/women/4.jpg",
  profile_city: "Mexico City",
  profile_country: "Mexico",
  profile_support: true,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Instituto Tecnológico de Monterrey",
  academic_area: ["Marketing"],
  academic_graduation: "2012",
  info_company_name: "Global Brands Agency",
  info_position: "Digital Marketing Manager",
  info_career: [
    "Digital advertising campaigns",
    "Brand identity development",
    "Social media marketing",
  ],
  info_skills: ["Google Ads", "Social Media Management", "Content Creation"],
  info_interests: ["Influencer Marketing", "Data-driven Marketing"],
  info_goals: [
    "Conseguir un trabajo",
    "Conocer más sobre el mercado laboral de mi profesión",
  ], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de información del mercado laboral"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional8 = {
  type: "professional",
  name: "Michael Chen",
  username: "michaelchen",
  email: "michael.chen@example.com",
  password: "password123",
  profile_bio:
    "Experienced business analyst with a strong background in data analysis and project management. Dedicated to driving business growth and process optimization through data-driven insights.",
  profile_birth: "1988-02-18",
  profile_image: "https://randomuser.me/api/portraits/men/4.jpg",
  profile_city: "Singapore",
  profile_country: "Singapore",
  profile_support: false,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "National University of Singapore",
  academic_area: ["Business Administration"],
  academic_graduation: "2010",
  info_company_name: "Global Solutions Corporation",
  info_position: "Business Analyst Manager",
  info_career: [
    "Data analysis and reporting",
    "Project management",
    "Business process improvement",
  ],
  info_skills: ["Excel", "SQL", "Project Management", "Tableau"],
  info_interests: ["Data Visualization", "Business Intelligence"],
  info_goals: ["Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  info_languages: ["English", "Mandarin"],

  
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional9 = {
  type: "professional",
  name: "Carolina Vargas",
  username: "carovargas",
  email: "carolina.vargas@example.com",
  password: "password123",
  profile_bio:
    "Profesional en administración de empresas con experiencia en gestión financiera y estratégica. Comprometida con el crecimiento y el éxito empresarial a través de la eficiencia y la toma de decisiones informadas.",
  profile_birth: "1992-09-08",
  profile_image: "https://randomuser.me/api/portraits/women/5.jpg",
  profile_city: "Bogotá",
  profile_country: "Colombia",
  profile_support: true,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Universidad de los Andes",
  academic_area: ["Administración de Empresas"],
  academic_graduation: "2014",
  info_company_name: "Inversiones Corporativas SA",
  info_position: "Gerente Financiero",
  info_career: [
    "Análisis financiero",
    "Planificación estratégica",
    "Optimización de recursos",
  ],
  info_skills: ["Gestión financiera", "Business Intelligence", "Negociación"],
  info_interests: ["Finanzas Corporativas", "Estrategia Empresarial"],
  info_goals: [
    "Conocer nuevos colegas y oportunidades",
    "Hacer una especialización",
  ], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional10 = {
  type: "professional",
  name: "Julia García",
  username: "juliagarcia",
  email: "julia.garcia@example.com",
  password: "password123",
  profile_bio:
    "Psicóloga clínica con experiencia en terapia cognitivo-conductual. Comprometida con ayudar a las personas a superar desafíos emocionales y mejorar su bienestar mental.",
  profile_birth: "1987-12-15",
  profile_image: "https://randomuser.me/api/portraits/women/6.jpg",
  profile_city: "Santiago",
  profile_country: "Chile",
  profile_support: true,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Universidad de Chile",
  academic_area: ["Psicología"],
  academic_graduation: "2010",
  info_company_name: "Centro de Salud Mental",
  info_position: "Psicóloga Clínica",
  info_career: [
    "Terapia individual y grupal",
    "Evaluación psicológica",
    "Intervención en crisis",
  ],
  info_skills: [
    "Terapia Cognitivo-Conductual",
    "Manejo de emociones",
    "Escucha activa",
  ],
  info_interests: ["Salud Mental en la comunidad", "Mindfulness"],
  info_goals: ["Hacer una especialización", "Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Dificultad para conseguir trabajo"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Part-time",
  info_contract: "Presencial",
};

const professional11 = {
  type: "professional",
  name: "Alexandra Li",
  username: "alexandrali",
  email: "alexandra.li@example.com",
  password: "password123",
  profile_bio:
    "Psicóloga organizacional apasionada por el desarrollo del talento y la promoción del bienestar en el trabajo. Busco colaborar con organizaciones para potenciar el crecimiento personal y profesional de sus empleados.",
  profile_birth: "1990-08-22",
  profile_image: "https://randomuser.me/api/portraits/women/7.jpg",
  profile_city: "Buenos Aires",
  profile_country: "Argentina",
  profile_support: false,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Universidad de Buenos Aires",
  academic_area: ["Psicología"],
  academic_graduation: "2012",
  info_company_name: "Recursos Humanos SA",
  info_position: "Consultora de Recursos Humanos",
  info_career: [
    "Evaluación de desempeño",
    "Capacitación y desarrollo",
    "Gestión del cambio organizacional",
  ],
  info_skills: [
    "Psicología Organizacional",
    "Coaching",
    "Resolución de conflictos",
  ],
  info_interests: ["Clima laboral", "Desarrollo de liderazgo"],
  info_goals: ["Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de información del mercado laboral"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional12 = {
  type: "professional",
  name: "Ricardo Martinez",
  username: "ricardomartinez",
  email: "ricardo.martinez@example.com",
  password: "password123",
  profile_bio:
    "Abogado especializado en derecho laboral y derecho de negocios. En búsqueda de oportunidades para asesorar a empresas y particulares en cuestiones legales complejas.",
  profile_birth: "1983-06-10",
  profile_image: "https://randomuser.me/api/portraits/men/5.jpg",
  profile_city: "Mexico City",
  profile_country: "Mexico",
  profile_support: true,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Universidad Nacional Autónoma de México",
  academic_area: ["Abogacía"],
  academic_graduation: "2005",
  info_company_name: "Bufete Legal Corporativo",
  info_position: "Abogado Senior",
  info_career: [
    "Asesoramiento legal a empresas",
    "Litigio en temas laborales",
    "Contratos comerciales",
  ],
  info_skills: ["Derecho Laboral", "Negociación", "Redacción jurídica"],
  info_interests: ["Arbitraje Comercial", "Mediación"],
  info_goals: ["Conocer nuevos colegas y oportunidades"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional13 = {
  type: "professional",
  name: "Emma Johnson",
  username: "emmajohnson",
  email: "emma.johnson@example.com",
  password: "password123",
  profile_bio:
    "Environmental scientist with a focus on sustainable resource management and conservation. Passionate about finding innovative solutions to environmental challenges.",
  profile_birth: "1991-11-28",
  profile_image: "https://randomuser.me/api/portraits/women/8.jpg",
  profile_city: "Vancouver",
  profile_country: "Canada",
  profile_support: false,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "University of British Columbia",
  academic_area: ["Ciencias Ambientales"],
  academic_graduation: "2014",
  info_company_name: "Green Earth Foundation",
  info_position: "Environmental Scientist",
  info_career: [
    "Environmental impact assessment",
    "Sustainable development projects",
    "Climate change adaptation",
  ],
  info_skills: ["GIS", "Environmental Policy", "Data Analysis"],
  info_interests: ["Renewable Energy", "Biodiversity Conservation"],
  info_goals: ["Conseguir un trabajo", "Hacer una especialización"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de información del mercado laboral"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  
  info_languages: ["Inglés"],

  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional14 = {
  type: "professional",
  name: "Sarah Lee",
  username: "sarahlee",
  email: "sarah.lee@example.com",
  password: "password123",
  profile_bio:
    "Software engineer with a focus on mobile app development. Passionate about creating user-friendly and efficient applications that improve people's lives.",
  profile_birth: "1995-04-17",
  profile_image: "https://randomuser.me/api/portraits/women/9.jpg",
  profile_city: "New York",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Massachusetts Institute of Technology",
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2018",
  info_company_name: "Tech Innovators Inc.",
  info_position: "Mobile App Developer",
  info_career: [
    "iOS and Android app development",
    "User interface design",
    "Cross-platform development",
  ],
  info_skills: ["Swift", "Java", "React Native"],
  info_interests: ["AR/VR Development", "Mobile UX Design"],
  info_goals: ["Conocer nuevos colegas y oportunidades", "Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Inglés", "Koreano"],

  info_availability: "Full-time",
  info_contract: "Remoto",
};

const professional15 = {
  type: "professional",
  name: "Markus Weber",
  username: "markusw",
  email: "markus.weber@example.com",
  password: "password123",
  profile_bio:
    "Front-end web developer with a passion for creating interactive and visually appealing websites. Committed to delivering exceptional user experiences through responsive design.",
  profile_birth: "1989-11-02",
  profile_image: "https://randomuser.me/api/portraits/men/6.jpg",
  profile_city: "Berlin",
  profile_country: "Germany",
  profile_support: false,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Technical University of Berlin",
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2011",
  info_company_name: "WebTech Solutions",
  info_position: "Front-end Developer",
  info_career: [
    "HTML, CSS, and JavaScript development",
    "Responsive and mobile-first design",
    "Website performance optimization",
  ],
  info_skills: ["React", "Vue.js", "Sass"],
  info_interests: ["UI/UX Design", "Web Accessibility"],
  info_goals: ["Conocer nuevos colegas y oportunidades", "Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Dificultad para conseguir trabajo"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  info_languages: ["Inglés", "Alemán"],

  
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional16 = {
  type: "professional",
  name: "Sophie Chen",
  username: "sophiechen",
  email: "sophie.chen@example.com",
  password: "password123",
  profile_bio:
    "Data scientist with a background in machine learning and statistical analysis. Passionate about leveraging data to solve complex problems and drive business growth.",
  profile_birth: "1992-08-12",
  profile_image: "https://randomuser.me/api/portraits/women/10.jpg",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Stanford University",
  academic_area: ["Ingeniería Informática"],
  academic_graduation: "2014",
  info_company_name: "Data Insights Corporation",
  info_position: "Data Scientist",
  info_career: [
    "Machine learning algorithms",
    "Big data analysis",
    "Predictive modeling",
  ],
  info_skills: ["Python", "R", "SQL", "TensorFlow"],
  info_interests: ["Natural Language Processing", "Data Visualization"],
  info_goals: ["Conocer nuevos colegas y oportunidades", "Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de información del mercado laboral"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  info_languages: ["Inglés", "Mandarín"],

  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional17 = {
  type: "professional",
  name: "David Johnson",
  username: "davidjohnson",
  email: "david.johnson@example.com",
  password: "password123",
  profile_bio:
    "Computer scientist specializing in artificial intelligence and machine learning. Dedicated to developing cutting-edge technologies that drive innovation and solve complex problems.",
  profile_birth: "1990-07-25",
  profile_image: "https://randomuser.me/api/portraits/men/7.jpg",
  profile_city: "San Francisco",
  profile_country: "United States",
  profile_support: true,
  academic_formation: "Senior", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Stanford University",
  academic_area: ["Computer Science"],
  academic_graduation: "2012",
  info_company_name: "Tech Innovations Lab",
  info_position: "AI Research Scientist",
  info_career: [
    "Machine learning research",
    "Natural language processing",
    "Computer vision",
  ],
  info_skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
  info_interests: ["Reinforcement Learning", "Ethical AI"],
  info_goals: ["Conocer nuevos colegas y oportunidades", "Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  info_languages: ["Inglés"],

  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional18 = {
  type: "professional",
  name: "Sophia Kim",
  username: "sophiakim",
  email: "sophia.kim@example.com",
  password: "password123",
  profile_bio:
    "Software engineer with a focus on web development and user experience design. Committed to building intuitive and user-friendly applications that deliver seamless experiences.",
  profile_birth: "1988-09-16",
  profile_image: "https://randomuser.me/api/portraits/women/11.jpg",
  profile_city: "London",
  profile_country: "United Kingdom",
  profile_support: false,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "University of Cambridge",
  academic_area: ["Computer Science"],
  academic_graduation: "2010",
  info_company_name: "Tech Solutions Ltd.",
  info_position: "Senior Web Developer",
  info_career: [
    "Front-end and back-end web development",
    "User interface and user experience design",
    "Responsive web design",
  ],
  info_skills: ["JavaScript", "React", "Node.js", "CSS"],
  info_interests: ["Web Accessibility", "Progressive Web Apps"],
  info_goals: ["Conocer nuevos colegas y oportunidades"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de guía profesional"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo

  info_languages: ["Inglés", "Koreano"],

  
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional19 = {
  type: "professional",
  name: "Carlos Gomez",
  username: "carlosgomez",
  email: "carlos.gomez@example.com",
  password: "password123",
  profile_bio:
    "Ingeniero civil especializado en diseño y gestión de proyectos de infraestructuras. Comprometido con el desarrollo de soluciones innovadoras que mejoren la calidad de vida de las personas.",
  profile_birth: "1985-12-03",
  profile_image: "https://randomuser.me/api/portraits/men/8.jpg",
  profile_city: "Lima",
  profile_country: "Perú",
  profile_support: true,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Pontificia Universidad Católica del Perú",
  academic_area: ["Ingeniería Civil"],
  academic_graduation: "2009",
  info_company_name: "Ingeniería & Construcciones SAC",
  info_position: "Ingeniero de Proyectos",
  info_career: [
    "Diseño y planificación de infraestructuras",
    "Gestión de obras civiles",
    "Control de calidad y seguridad en construcciones",
  ],
  info_skills: ["AutoCAD", "Project Management", "Geotecnia"],
  info_interests: ["Ingeniería sostenible", "Desarrollo urbano"],
  info_goals: [
    "Conocer nuevos colegas y oportunidades",
    "Hacer una especialización",
  ], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Dificultad para conseguir trabajo"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

const professional20 = {
  type: "professional",
  name: "Isabella Rossi",
  username: "isabellarossi",
  email: "isabella.rossi@example.com",
  password: "password123",
  profile_bio:
    "Arquitecta apasionada por el diseño de espacios funcionales y estéticamente atractivos. Comprometida con la creación de ambientes que mejoren la experiencia de quienes los habitan.",
  profile_birth: "1992-06-20",
  profile_image: "https://randomuser.me/api/portraits/women/12.jpg",
  profile_city: "Barcelona",
  profile_country: "Spain",
  profile_support: false,
  academic_formation: "Middle", // Sin Experiencia - Junior - Middle - Senior
  academic_institution: "Polytechnic University of Catalonia",
  academic_area: ["Arquitectura"],
  academic_graduation: "2014",
  info_company_name: "Architectura Studio",
  info_position: "Arquitecta de Proyectos",
  info_career: [
    "Diseño arquitectónico",
    "Dibujo técnico y modelado 3D",
    "Presupuestos y planificación de obras",
  ],
  info_skills: ["AutoCAD", "SketchUp", "Adobe Creative Suite"],
  info_interests: ["Arquitectura sostenible", "Rehabilitación de edificios"],
  info_goals: ["Conocer nuevos colegas y oportunidades", "Emprender"], // Conseguir un trabajo - Conocer más sobre el mercado laboral de mi profesión - Conocer nuevos colegas y oportunidades - Hacer una especialización - Emprender
  info_problematic: ["Falta de información del mercado laboral"], // Falta de información del mercado laboral - Falta de guía profesional - Dificultad para conseguir trabajo
  info_languages: ["Español", "Italiano", "Inglés"],
  info_availability: "Full-time",
  info_contract: "Presencial",
};

///--- EMPRESAS ---///

const company1 = {
  type: "company",
  name: "The Coca-Cola Company",
  email: "contact@coca-cola.com",
  username: "cocacola_official",
  password: "C0caC0laP@ss",
  cuit: 30503255418,
  city: "Atlanta",
  country: "United States",
  website: "https://www.coca-cola.com/",
  image: "https://www.coca-cola.com/logo.png",
  bio: "The Coca-Cola Company is a multinational beverage corporation that manufactures and markets a wide range of non-alcoholic beverages, including Coca-Cola, Diet Coke, Sprite, Fanta, and more. Our mission is to refresh the world, inspire moments of happiness, and create value for our stakeholders.",
};

const company2 = {
  type: "company",
  name: "Apple Inc.",
  email: "apple.inc@example.com",
  username: "apple",
  password: "apple123",
  cuit: 59383135409,
  city: "Cupertino",
  country: "United States",
  website: "https://www.apple.com/",
  image: "",
  bio: "Apple Inc. is a technology company that designs, manufactures, and sells consumer electronics, software, and services.",
};

const company3 = {
  type: "company",
  name: "Samsung Electronics",
  email: "samsung@example.com",
  username: "samsung",
  password: "samsung123",
  cuit: 12481293952,
  city: "Suwon",
  country: "South Korea",
  website: "https://www.samsung.com/",
  image: "",
  bio: "Samsung Electronics is a global leader in technology, opening new possibilities for people everywhere.",
};

const company4 = {
  type: "company",
  name: "Amazon",
  email: "amazon@example.com",
  username: "amazon",
  password: "amazon123",
  cuit: 28391273655,
  city: "Seattle",
  country: "United States",
  website: "https://www.amazon.com/",
  image: "",
  bio: "Amazon is the world's largest online retailer, offering a wide range of products and services.",
};

const company5 = {
  type: "company",
  name: "Google",
  email: "google@example.com",
  username: "google",
  password: "google123",
  cuit: 18373627181,
  city: "Mountain View",
  country: "United States",
  website: "https://www.google.com/",
  image: "",
  bio: "Google is a multinational technology company that specializes in internet-related services and products.",
};

const company6 = {
  type: "company",
  name: "Microsoft",
  email: "microsoft@example.com",
  username: "microsoft",
  password: "microsoft123",
  cuit: 23528193912,
  city: "Redmond",
  country: "United States",
  website: "https://www.microsoft.com/",
  image: "",
  bio: "Microsoft is a leading global technology company that develops, manufactures, licenses, supports, and sells software, consumer electronics, and personal computers.",
};

const company7 = {
  type: "company",
  name: "Facebook",
  email: "facebook@example.com",
  username: "facebook",
  password: "facebook123",
  cuit: 47281936201,
  city: "Menlo Park",
  country: "United States",
  website: "https://www.facebook.com/",
  image: "",
  bio: "Facebook is a social media and technology company that connects people and builds communities.",
};

const company8 = {
  type: "company",
  name: "Tesla, Inc.",
  email: "tesla@example.com",
  username: "tesla",
  password: "tesla123",
  cuit: 38172649301,
  city: "Palo Alto",
  country: "United States",
  website: "https://www.tesla.com/",
  image: "",
  bio: "Tesla, Inc. is an electric vehicle and clean energy company.",
};

const company9 = {
  type: "company",
  name: "Netflix",
  email: "netflix@example.com",
  username: "netflix",
  password: "netflix123",
  cuit: 59102938456,
  city: "Los Gatos",
  country: "United States",
  website: "https://www.netflix.com/",
  image: "",
  bio: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
};

const company10 = {
  type: "company",
  name: "Uber",
  email: "uber@example.com",
  username: "uber",
  password: "uber123",
  cuit: 82917364512,
  city: "San Francisco",
  country: "United States",
  website: "https://www.uber.com/",
  image: "",
  bio: "Uber is a technology company that offers ride-sharing, food delivery, and transportation services.",
};
const company11 = {
  type: "company",
  name: "Nike",
  email: "nike@example.com",
  username: "nike",
  password: "nike123",
  cuit: 89273619273,
  city: "Beaverton",
  country: "United States",
  website: "https://www.nike.com/",
  image: "",
  bio: "Nike is a multinational corporation that designs, manufactures, and sells athletic footwear, apparel, equipment, and accessories.",
};

const company12 = {
  type: "company",
  name: "Toyota Motor Corporation",
  email: "toyota@example.com",
  username: "toyota",
  password: "toyota123",
  cuit: 82736401928,
  city: "Toyota City",
  country: "Japan",
  website: "https://www.toyota-global.com/",
  image: "",
  bio: "Toyota Motor Corporation is a Japanese multinational automotive manufacturer.",
};

const company13 = {
  type: "company",
  name: "Adobe Inc.",
  email: "adobe@example.com",
  username: "adobe",
  password: "adobe123",
  cuit: 30192847162,
  city: "San Jose",
  country: "United States",
  website: "https://www.adobe.com/",
  image: "",
  bio: "Adobe Inc. is a multinational software company known for its creative software products.",
};

const company14 = {
  type: "company",
  name: "Walt Disney Company",
  email: "disney@example.com",
  username: "disney",
  password: "disney123",
  cuit: 59273648172,
  city: "Burbank",
  country: "United States",
  website: "https://www.disney.com/",
  image: "",
  bio: "The Walt Disney Company is a diversified multinational entertainment and media company.",
};

const company15 = {
  type: "company",
  name: "Intel Corporation",
  email: "intel@example.com",
  username: "intel",
  password: "intel123",
  cuit: 38391274910,
  city: "Santa Clara",
  country: "United States",
  website: "https://www.intel.com/",
  image: "",
  bio: "Intel Corporation is an American multinational corporation and technology company.",
};

const company16 = {
  type: "company",
  name: "XYZ Tech Solutions",
  email: "contact@xyztech.com",
  username: "xyztech",
  password: "xyz1234",
  cuit: 12345678901,
  city: "San Francisco",
  country: "United States",
  website: "https://www.xyztech.com/",
  image: "https://www.xyztech.com/logo.png",
  bio: "XYZ Tech Solutions is a cutting-edge technology company that specializes in developing innovative software solutions for businesses worldwide.",
};

const company17 = {
  type: "company",
  name: "PepsiCo",
  email: "pepsico@example.com",
  username: "pepsico",
  password: "pepsico123",
  cuit: 67291048271,
  city: "Purchase",
  country: "United States",
  website: "https://www.pepsico.com/",
  image: "",
  bio: "PepsiCo is a global food and beverage company with a diverse portfolio of brands.",
};

const company18 = {
  type: "company",
  name: "IBM",
  email: "ibm@example.com",
  username: "ibm",
  password: "ibm123",
  cuit: 28104910273,
  city: "Armonk",
  country: "United States",
  website: "https://www.ibm.com/",
  image: "",
  bio: "IBM is a multinational technology company that provides hardware, software, cloud computing, and consulting services.",
};

const company19 = {
  type: "company",
  name: "McDonald's Corporation",
  email: "mcdonalds@example.com",
  username: "mcdonalds",
  password: "mcdonalds123",
  cuit: 48102938471,
  city: "Chicago",
  country: "United States",
  website: "https://www.mcdonalds.com/",
  image: "",
  bio: "McDonald's Corporation is a fast-food restaurant chain known for its hamburgers and fries.",
};

const company20 = {
  type: "company",
  name: "Sony Corporation",
  email: "sony@example.com",
  username: "sony",
  password: "sony123",
  cuit: 19384710293,
  city: "Tokyo",
  country: "Japan",
  website: "https://www.sony.net/",
  image: "",
  bio: "Sony Corporation is a Japanese multinational conglomerate corporation.",
};

///--- TRABAJOS ---///

const companyJobs1 = [
  {
    jobName: "Senior Software Engineer",
    creationDate: "2023-10-01",
    closingDate: "2023-10-31",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Computer Science"],
    experienceRequired: "5", // años
    industry: ["Bebidas", "Tecnología"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Opciones de acciones",
    ],
    skillsRequired: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    jobDescription: [
      "Diseñar y desarrollar soluciones de software escalables",
      "Colaborar con equipos multidisciplinarios",
      "Optimizar el rendimiento de las aplicaciones",
    ],
    jobGoal: [
      "Contribuir al desarrollo de tecnologías innovadoras para bebidas",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Abogado Corporativo",
    creationDate: "2023-11-01",
    closingDate: "2023-11-30",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Abogacía"],
    experienceRequired: "7", // años
    industry: ["Bebidas", "Legal"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Subsidio para desarrollo profesional",
    ],
    skillsRequired: [
      "Derecho Corporativo",
      "Negociación de contratos",
      "Asesoría legal",
    ],
    jobDescription: [
      "Brindar asesoramiento legal a la empresa en diversos temas",
      "Redactar y revisar contratos y acuerdos",
      "Garantizar el cumplimiento de leyes y regulaciones pertinentes",
    ],
    jobGoal: ["Proteger los intereses legales de The Coca-Cola Company"],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Gerente de Marketing",
    creationDate: "2023-12-01",
    closingDate: "2023-12-31",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Administración de Empresas"],
    experienceRequired: "8", // años
    industry: ["Bebidas", "Marketing"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Membresía de gimnasio",
    ],
    skillsRequired: [
      "Estrategia de Marketing",
      "Gestión de Marca",
      "Marketing Digital",
    ],
    jobDescription: [
      "Desarrollar e implementar estrategias de marketing",
      "Gestionar la posición de la marca y las campañas",
      "Analizar tendencias de mercado e insights de consumidores",
    ],
    jobGoal: [
      "Impulsar el crecimiento y éxito de los productos de bebidas de Coca-Cola",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
];

const companyJobs2 = [
  {
    jobName: "Ingeniero de Software",
    creationDate: "2023-10-15",
    closingDate: "2023-11-15",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Ingeniería Informática"],
    experienceRequired: "5", // años
    industry: ["Tecnología", "Informática"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Plan de compra de acciones para empleados",
    ],
    skillsRequired: [
      "C++",
      "Python",
      "Computación en la Nube",
      "Gestión de Bases de Datos",
    ],
    jobDescription: [
      "Diseñar, codificar y probar aplicaciones de software",
      "Colaborar con equipos multidisciplinarios",
      "Resolver desafíos técnicos complejos",
    ],
    jobGoal: ["Contribuir al desarrollo de tecnologías innovadoras"],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Científico de Datos",
    creationDate: "2023-10-20",
    closingDate: "2023-11-20",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Ciencia de Datos"],
    experienceRequired: "4", // años
    industry: ["Tecnología", "Análisis de Datos"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Oportunidades de desarrollo profesional",
    ],
    skillsRequired: [
      "Aprendizaje Automático",
      "Análisis Estadístico",
      "Visualización de Datos",
    ],
    jobDescription: [
      "Desarrollar e implementar modelos de aprendizaje automático",
      "Analizar e interpretar datos para obtener insights",
      "Colaborar con equipos de ingeniería de datos",
    ],
    jobGoal: ["Impulsar la toma de decisiones basada en datos en Microsoft"],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Gerente de Producto",
    creationDate: "2023-11-01",
    closingDate: "2023-11-30",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Administración de Empresas"],
    experienceRequired: "6", // años
    industry: ["Tecnología", "Gestión de Productos"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Opciones de acciones",
    ],
    skillsRequired: [
      "Gestión del Ciclo de Vida del Producto",
      "Análisis de Mercado",
      "Gestión de Proyectos",
    ],
    jobDescription: [
      "Desarrollar e implementar estrategias y hojas de ruta de productos",
      "Analizar tendencias de mercado y necesidades de los clientes",
      "Coordinar lanzamientos y promociones de productos",
    ],
    jobGoal: [
      "Impulsar el éxito y la competitividad en el mercado de los productos de Microsoft",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Diseñador de Experiencia de Usuario (UX/UI)",
    creationDate: "2023-11-05",
    closingDate: "2023-12-05",
    active: true,
    levelRequired: "Intermedio", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Diseño", "Ingeniería Informática"],
    experienceRequired: "3", // años
    industry: ["Tecnología", "Experiencia de Usuario"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Oportunidades de crecimiento profesional",
    ],
    skillsRequired: [
      "Investigación de Usuarios",
      "Creación de Prototipos",
      "Pruebas de Usabilidad",
    ],
    jobDescription: [
      "Diseñar interfaces y experiencias de usuario para productos de Microsoft",
      "Realizar investigaciones y pruebas de usabilidad",
      "Colaborar con equipos de producto y desarrollo",
    ],
    jobGoal: [
      "Crear experiencias digitales intuitivas y visualmente atractivas",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
];

const companyJobs3 = [
  {
    jobName: "Desarrollador Full Stack Senior",
    creationDate: "2023-08-10",
    closingDate: "2023-09-01",
    active: true,
    levelRequired: "Avanzado",
    studyArea: ["Ingeniería Informática"],
    experienceRequired: "5", // años
    industry: ["Entretenimiento", "TI"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Opciones de acciones",
    ],
    skillsRequired: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    jobDescription: [
      "Diseñar y desarrollar aplicaciones web escalables",
      "Colaborar con equipos interdisciplinarios",
      "Optimizar el rendimiento de la aplicación",
    ],
    jobGoal: [
      "Contribuir al crecimiento de la plataforma de streaming de Netflix",
    ],
    languagesRequired: ["Inglés"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Científico de Datos",
    creationDate: "2023-08-15",
    closingDate: "2023-09-15",
    active: true,
    levelRequired: "Avanzado",
    studyArea: ["Ciencia de Datos"],
    experienceRequired: "4", // años
    industry: ["Entretenimiento", "Análisis de datos"],
    benefits: [
      "Planes de seguro de salud",
      "Opción de trabajo remoto",
      "Subsidio para desarrollo profesional",
    ],
    skillsRequired: [
      "Python",
      "Machine Learning",
      "Análisis Estadístico",
      "Herramientas de Big Data",
    ],
    jobDescription: [
      "Analizar e interpretar conjuntos de datos complejos",
      "Desarrollar modelos predictivos para recomendación de contenido",
      "Realizar pruebas A/B para optimizar la experiencia del usuario",
    ],
    jobGoal: [
      "Mejorar la personalización de contenido y el compromiso del usuario",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Remoto", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Diseñador UI/UX Senior",
    creationDate: "2023-08-20",
    closingDate: "2023-09-20",
    active: true,
    levelRequired: "Avanzado",
    studyArea: ["Diseño Gráfico", "Diseño de Interacción"],
    experienceRequired: "6", // años
    industry: ["Entretenimiento", "Diseño"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Membresía de gimnasio",
    ],
    skillsRequired: [
      "Diseño de Interfaz de Usuario",
      "Diseño de Experiencia de Usuario",
      "Adobe Creative Suite",
      "Herramientas de prototipado",
    ],
    jobDescription: [
      "Crear interfaces de usuario visualmente atractivas e intuitivas",
      "Colaborar con gestores de producto y desarrolladores",
      "Realizar investigaciones de usuarios y pruebas de usabilidad",
    ],
    jobGoal: [
      "Elevar la experiencia del usuario en las plataformas de Netflix",
    ],
    languagesRequired: ["Inglés"],
    availability: "Full-time",
    contractOffered: "Híbrido",
  },
];

const companyJobs4 = [
  {
    jobName: "Administrador de Proyectos",
    creationDate: "2023-09-01",
    closingDate: "2023-09-30",
    active: true,
    levelRequired: "Intermedio", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Administración de Empresas"],
    experienceRequired: "3", // años
    industry: ["Automotriz", "Negocios"],
    benefits: [
      "Planes de seguro de salud",
      "Bono anual por rendimiento",
      "Oportunidades de crecimiento profesional",
    ],
    skillsRequired: [
      "Gestión de proyectos",
      "Liderazgo",
      "Comunicación efectiva",
    ],
    jobDescription: [
      "Planificar y supervisar proyectos de la empresa",
      "Coordinar equipos y recursos para cumplir objetivos",
      "Realizar seguimiento y reportes de avance",
    ],
    jobGoal: ["Optimizar la eficiencia y calidad en la ejecución de proyectos"],
    languagesRequired: ["Inglés", "Japonés"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Especialista en Marketing Digital",
    creationDate: "2023-09-05",
    closingDate: "2023-09-25",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Marketing"],
    experienceRequired: "4", // años
    industry: ["Automotriz", "Marketing"],
    benefits: [
      "Planes de seguro de salud",
      "Horario flexible",
      "Programas de capacitación continua",
    ],
    skillsRequired: [
      "Marketing digital",
      "SEO y SEM",
      "Analítica web",
      "Redes sociales",
    ],
    jobDescription: [
      "Desarrollar estrategias de marketing digital",
      "Ejecutar campañas en línea para aumentar la visibilidad de la marca",
      "Analizar métricas y KPIs para optimizar resultados",
    ],
    jobGoal: [
      "Incrementar el tráfico y conversiones en el sitio web de Toyota",
    ],
    languagesRequired: ["Inglés", "Japonés"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Ingeniero de Diseño de Vehículos",
    creationDate: "2023-09-10",
    closingDate: "2023-09-30",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Ingeniería Mecánica", "Diseño de Vehículos"],
    experienceRequired: "5", // años
    industry: ["Automotriz", "Ingeniería"],
    benefits: [
      "Planes de seguro de salud",
      "Bonos de productividad",
      "Desarrollo profesional y capacitación técnica",
    ],
    skillsRequired: [
      "Diseño CAD",
      "Ingeniería automotriz",
      "Conocimiento de materiales y tecnologías de fabricación",
    ],
    jobDescription: [
      "Crear y mejorar diseños de vehículos",
      "Evaluar la viabilidad y seguridad de los diseños",
      "Colaborar con equipos de ingeniería y producción",
    ],
    jobGoal: [
      "Desarrollar vehículos innovadores y de alta calidad para Toyota",
    ],
    languagesRequired: ["Inglés", "Japonés"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Técnico de Mantenimiento Automotriz",
    creationDate: "2023-09-15",
    closingDate: "2023-10-15",
    active: true,
    levelRequired: "Intermedio", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Automotriz", "Mecánica"],
    experienceRequired: "2", // años
    industry: ["Automotriz", "Servicio Técnico"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios flexibles",
      "Oportunidades de desarrollo profesional",
    ],
    skillsRequired: [
      "Mantenimiento y reparación de vehículos",
      "Diagnóstico de problemas mecánicos",
      "Trabajo en equipo",
    ],
    jobDescription: [
      "Realizar el mantenimiento y reparación de vehículos Toyota",
      "Identificar y resolver problemas mecánicos",
      "Colaborar con el equipo técnico para brindar soluciones efectivas",
    ],
    jobGoal: [
      "Garantizar la calidad y seguridad en el servicio de mantenimiento",
    ],
    languagesRequired: ["Inglés", "Japonés"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
];

const companyJobs5 = [
  {
    jobName: "Programador Senior en Python",
    creationDate: "2023-05-21",
    closingDate: "2023-06-01",
    active: true,
    levelRequired: "Avanzado",
    studyArea: ["Ingeniería Informática"],
    experienceRequired: "3", // años
    industry: ["Finanzas y Banca", "TI"],
    benefits: ["Planes de seguro de salud", "Flexibilidad laboral"],
    skillsRequired: [
      "Programación en Python",
      "Desarrollo web",
      "Bases de datos",
    ],
    jobDescription: [
      "Inteligencia Artificial",
      "Desarrollo de aplicaciones móviles",
    ],
    jobGoal: ["Liderar un equipo de desarrollo"],
    languagesRequired: ["Español", "Inglés"],
    availability: "Part-time", // Full-time - Part-time
    contractOffered: "Remoto", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Arquitecto de Aplicaciones",
    creationDate: "2023-04-15",
    closingDate: "2023-07-10",
    active: true,
    levelRequired: "Avanzado",
    studyArea: ["Ingeniería Informática"],
    experienceRequired: "5",
    industry: ["Servicios TI", "Consultoria de TI"],
    benefits: ["Planes de seguro de salud", "Flexibilidad laboral"],
    skillsRequired: ["C#", ".NET", "Java", "UML"],
    jobDescription: [
      "Arquitecto de Aplicación",
      "Experiencia en metodologías Agiles y DevSecOps",
    ],
    jobGoal: ["Liderazgo", "Atención al detalle", "Calidad del software"],
    languagesRequired : ["Español", "Inglés"],
    contractOffered: "Presencial",
    availability: "Part-time",
  },
];

const companyJobs6 = [
  {
    jobName: "Diseñador Gráfico",
    creationDate: "2023-10-20",
    closingDate: "2023-11-20",
    active: true,
    levelRequired: "Intermedio", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Diseño Gráfico"],
    experienceRequired: "3", // años
    industry: ["Tecnología", "Diseño"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Entorno de trabajo creativo",
    ],
    skillsRequired: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Diseño de Identidad de Marca",
    ],
    jobDescription: [
      "Crear gráficos e ilustraciones visualmente atractivas",
      "Desarrollar materiales de branding y marketing",
      "Colaborar con equipos de marketing y productos",
    ],
    jobGoal: [
      "Mejorar la identidad visual y la comunicación de la marca de IBM",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Ingeniero de Software",
    creationDate: "2023-11-01",
    closingDate: "2023-11-30",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Ingeniería Informática"],
    experienceRequired: "5", // años
    industry: ["Tecnología", "Informática"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Oportunidades de desarrollo profesional",
    ],
    skillsRequired: [
      "Java",
      "Python",
      "Computación en la Nube",
      "Gestión de Bases de Datos",
    ],
    jobDescription: [
      "Diseñar, codificar y probar aplicaciones de software",
      "Colaborar con equipos multidisciplinarios",
      "Resolver desafíos técnicos complejos",
    ],
    jobGoal: [
      "Contribuir al desarrollo de soluciones tecnológicas innovadoras",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Híbrido", // Presencial - Remoto - Híbrido
  },
];

const companyJobs7 = [
  {
    jobName: "Abogado Corporativo",
    creationDate: "2023-10-25",
    closingDate: "2023-11-25",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Derecho"], // Derecho
    experienceRequired: "5", // años
    industry: ["Alimentación", "Legal"],
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Subsidio para desarrollo profesional",
    ],
    skillsRequired: [
      "Derecho Corporativo",
      "Negociación de contratos",
      "Asesoría legal",
    ],
    jobDescription: [
      "Brindar asesoramiento legal a la empresa en diversos temas",
      "Redactar y revisar contratos y acuerdos",
      "Garantizar el cumplimiento de leyes y regulaciones pertinentes",
    ],
    jobGoal: ["Proteger los intereses legales de McDonald's Corporation"],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Analista Financiero",
    creationDate: "2023-11-01",
    closingDate: "2023-11-30",
    active: true,
    levelRequired: "Intermedio", // Principiante - En curso - Intermedio - Avanzado
    studyArea: ["Finanzas"], // Finanzas
    experienceRequired: "3", // años
    industry: ["Alimentación", "Finanzas"], // Alimentación - Finanzas
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Oportunidades de crecimiento profesional",
    ],
    skillsRequired: [
      "Análisis financiero",
      "Elaboración de informes",
      "Modelado financiero",
    ],
    jobDescription: [
      "Realizar análisis de datos financieros",
      "Elaborar informes para la toma de decisiones",
      "Colaborar con el equipo de finanzas y contabilidad",
    ],
    jobGoal: ["Contribuir al éxito financiero de McDonald's Corporation"],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
  {
    jobName: "Especialista en Marketing",
    creationDate: "2023-12-01",
    closingDate: "2023-12-31",
    active: true,
    levelRequired: "Avanzado", // Principiante - En curso - Avanzado
    studyArea: ["Marketing"], // Marketing
    experienceRequired: "5", // años
    industry: ["Alimentación", "Marketing"], // Alimentación - Marketing
    benefits: [
      "Planes de seguro de salud",
      "Horarios de trabajo flexibles",
      "Descuentos en productos de la empresa",
    ],
    skillsRequired: [
      "Estrategia de Marketing",
      "Gestión de Marca",
      "Marketing Digital",
    ],
    jobDescription: [
      "Desarrollar e implementar estrategias de marketing",
      "Gestionar la posición de la marca y las campañas",
      "Analizar tendencias de mercado e insights de consumidores",
    ],
    jobGoal: [
      "Impulsar el crecimiento y la visibilidad de McDonald's Corporation",
    ],
    languagesRequired: ["Inglés", "Español"],
    availability: "Full-time",
    contractOffered: "Presencial", // Presencial - Remoto - Híbrido
  },
];

const companyJobs8 = [
  {
    jobName: "Senior Game Developer",
    creationDate: "2023-10-15",
    closingDate: "2023-11-15",
    active: true,

//    levelRequired: "Avanzado",
    levelRequired: "Advanced", // Beginner - In progress - Advanced

    studyArea: ["Computer Science", "Game Development"], // Ingeniería Informática - Desarrollo de Videojuegos
    experienceRequired: "6", // years
    industry: ["Electrónica", "Entretenimiento"], // Electrónica - Entretenimiento
    benefits: [
      "Health insurance plans",
      "Flexible working hours",
      "Discounts on Sony products",
    ],
    skillsRequired: ["C++", "Unity", "3D Graphics", "Game Mechanics"],
    jobDescription: [
      "Design and implement game features and systems",
      "Collaborate with cross-functional teams to create immersive gaming experiences",
      "Optimize performance and memory usage for gaming consoles",
    ],
    jobGoal: [
      "Contribute to the development of cutting-edge video games for Sony",
    ],
    languagesRequired: ["Inglés", "Japonés"],
    availability: "Full-time", // Full-time - Part-time
    contractOffered: "Híbrido",
  },
  {
    jobName: "Product Manager",
    creationDate: "2023-11-01",
    closingDate: "2023-11-30",
    active: true,

    levelRequired: "Avanzado",
    studyArea: ["Business Administration"],
    experienceRequired: "7", // years
    industry: ["Electrónica", "Product Management"],

    
    benefits: [
      "Health insurance plans",
      "Flexible working hours",
      "Employee stock purchase plan",
    ],
    skillsRequired: [
      "Product Lifecycle Management",
      "Market Analysis",
      "Project Management",
    ],
    jobDescription: [
      "Develop and execute product strategies and roadmaps",
      "Analyze market trends and customer needs",
      "Coordinate product launches and promotions",
    ],
    jobGoal: ["Drive the success and market competitiveness of Sony products"],
    languagesRequired: ["Inglés", "Japonés"],
    availability: "Full-time", // Full-time - Part-time
    contractOffered: "Híbrido",
  },
];

export const professionals = [
  professional1,
  professional2,
  professional3,
  professional4,
  professional5,
  professional6,
  professional7,
  professional8,
  professional9,
  professional10,
  professional11,
  professional12,
  professional13,
  professional14,
  professional15,
  professional16,
  professional17,
  professional18,
  professional19,
  professional20,
];

export const students = [
  student1,
  student2,
  student3,
  student4,
  student5,
  student6,
  student7,
  student8,
  student9,
  student10,
  student11,
  student12,
  student13,
  student14,
  student15,
  student16,
  student17,
  student18,
  student19,
  student20,
];

export const companies = [
  company1,
  company2,
  company3,
  company4,
  company5,
  company6,
  company7,
  company8,
  company9,
  company10,
  company11,
  company12,
  company13,
  company14,
  company15,
  company16,
  company17,
  company18,
  company19,
  company20,
];

export const jobs = [
  companyJobs1,
  companyJobs2,
  companyJobs3,
  companyJobs4,
  companyJobs5,
  companyJobs6,
  companyJobs7,
  companyJobs8,
];
