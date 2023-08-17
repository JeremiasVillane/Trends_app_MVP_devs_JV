
# Back-end TRENDS

# REST-API de TRENDS

Las APIs RESTful están ganando cada vez más popularidad en el desarrollo de back-end debido a su flexibilidad y escalabilidad. Por lo tanto, es importante asegurarse de que la API de TRENDS esté diseñada e implementada de manera RESTful. Esto incluye adherirse a los principios RESTful, como utilizar correctamente los métodos HTTP y proporcionar una estructura de URL coherente.

API_URL: `http://localhost:3001/api/v1/`.

## END-POINTS

- **End-points para la autenticación de usuarios:**
    - Registro de usuarios: `POST: API_URL/auth/register`
        
        ### Puede recibir DOS tipos de objetos:
        
        - Un nuevo usuario con el siguiente formato:
        
        ```jsx
        const User = {
          type: "student", //student or professional
          name: "Juan Perez",
          username: "juanperez",
          email: "juan.perez@example.com",
          password: "contraseña123",
          profile_support: true,
        }
        
        ```
        
        - Una nueva compañía con el siguiente formato:
        
        ```jsx
        const Company = {
          type: "company",
          name: "Toyota Motor Corporation",
          email: "toyota@example.com",
          username: "toyota",
          password: "toyota123",
        };
        ```
        
        ### Responde seteando una `cookie` en el navegador con el `UUID` del usuario creado.
        
        Ejemplo: `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0Y2IxODRhLTZlOTktNGZmZS05ZTJhLWE4OTNmNTZlMDJiZCIsImlhdCI6MTY5MDk2NDM5MiwiZXhwIjoxNjkwOTcxNTkyfQ.DmasDungJe4EmmzUbSysmTLANocm2VNRrMu3ZZXlkzk; Path=/; HttpOnly;`
        
    - Login de usuarios: `POST: API_URL/auth/login`
        
        ### Recibe un objeto con el siguiente formato:
        
        ```jsx
        const Data = {
        	user: "example@mail.com",
        	password: "password123",
        }
        ```
        
        ### Responde seteando una `cookie` en el navegador con el `UUID` del usuario logeado.
        
        Ejemplo: `token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0Y2IxODRhLTZlOTktNGZmZS05ZTJhLWE4OTNmNTZlMDJiZCIsImlhdCI6MTY5MDk2NDM5MiwiZXhwIjoxNjkwOTcxNTkyfQ.DmasDungJe4EmmzUbSysmTLANocm2VNRrMu3ZZXlkzk; Path=/; HttpOnly;`
        
    - Logout de usuarios: `POST: API_URL/auth/logout`
        
        Cuando se llama a este end-point, se borra la `cookie` que contiene el `UUID` del usuario logeado.
        
    

> 🚨 Estos End-points solo se pueden acceder con una `cookie` válida:

- **End-points para la gestión de los datos de los USUARIOS:**
    - Perfil del usuario: `GET: API_URL/user/profile`
        
        ### Puede devolver DOS tipos de objetos:
        
        ```jsx
        //Perfil de un Usuario:
        const User = {
          type: "professional", //puede ser "student" o "professional"
          name: "Michael Brown",
          username: "michaelbrown",
          email: "michael.brown@example.com",
          password: "password456",
          profile_bio:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
          profile_birth: "1997-06-07",
          profile_image: "",
          profile_city: "New York",
          profile_country: "United States",
          profile_support: false,
          academic_formation: "Middle",
          academic_institution: "Stanford University",
          academic_area: ["Ingeniería de Software"],
          academic_graduation: "2000",
        	//vvvvvvvvvvvvvvv---Solamente en "type: Professional"---vvvvvvvvvvvvvvv
          info_company_name: "XYZ Tech Solutions",
          info_position: "Ingeniero de Software",
        	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
            "Inteligencia Artificial",
            "Desarrollo de aplicaciones híbridas",
          ],
          info_goals: ["Hacer una especialización", "Emprender"],
          info_problematic: ["Dificultad para conseguir trabajo"],
          info_languages: ["Inglés"],
          info_availability: "Full-time",
          info_contract: "Híbrido",
        };
        
        //---------------------------------------------------------------------//
        
        //Perfil de una compañia:
        const Company = {
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
        
        //---------------------------------------------------------------------//
        ```
        
    - Editar perfil del usuario: `PUT: API_URL/user/:userId`
        
        Este end-point es accesible solo al propietario del perfil o al usuario **ADMIN**.
        
        ```json
        {
        	"type": "student",
          "name": "Juan Perez",
          "username": "juanperez333",
          "email": "juan.perez333@example.com",
          "password": "contraseña123",
          "profile_bio": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
          "profile_birth": "2014-01-28",
          "profile_image": "",
          "profile_city": "Buenos Aires",
          "profile_country": "Argentina",
          "profile_support": true,
          "academic_formation": "Universitario Avanzado",
          "academic_institution": "Universidad Nacional de Buenos Aires",
          "academic_level": "En curso",
          "academic_area": ["Ingeniería Informática"],
          "academic_graduation": 2023,
          "info_career": ["Desarrollo de Software"],
          "info_skills": ["Programación en Python", "Desarrollo web"],
          "info_goals": ["Elegir una carrera", "Encontrar una pasantía o trabajo"],
          "info_interests": ["Inteligencia Artificial", "Desarrollo de aplicaciones móviles"],
          "info_problematic": ["Falta de información del mercado laboral", "Falta de guía profesional"],
          "info_languages": ["Español", "Inglés"],
          "info_availability": "Full-time",
          "info_contract": "Remoto"
        }
        ```
        
        - Para perfiles de tipo `student` se espera por *body* un objeto así:
        - Para perfiles de tipo `professional` se espera por *body* un objeto así:
            
            ```json
            {
              "type": "professional",
              "name": "Ana Rodriguez",
              "username": "anarodriguez",
              "email": "ana.rodriguez@example.com",
              "password": "password123",
              "profile_bio": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
              "profile_birth": null,
              "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
              "profile_city": "Madrid",
              "profile_country": "España",
              "profile_support": true,
              "academic_formation": "Senior",
              "academic_institution": "Universidad Autónoma de Madrid",
              "academic_area": ["Marketing"],
              "academic_graduation": "2000",
              "info_company_name": "ABC Marketing Agency",
              "info_position": "Gerente de Marketing",
              "info_career": ["Desarrollo e implementación de estrategias de marketing", "Gestión de equipos y proyectos", "Incremento de la visibilidad de la marca"],
              "info_skills": ["Marketing digital", "Planificación estratégica", "Análisis de datos"],
              "info_interests": ["Marketing de contenidos", "Inteligencia de mercado"],
              "info_goals": ["Conocer más sobre el mercado laboral de mi profesión", "Conocer nuevos colegas y oportunidades"],
              "info_problematic": ["Falta de información del mercado laboral"],
              "info_languages": ["Español", "Inglés"],
              "info_availability": "Full-time",
              "info_contract": "Remoto"
            }
            ```
            
        - Para perfiles de tipo `company` se espera por *body* un objeto así:
            
            ```json
            {
            	"type": "company",
              "name": "Coca Cola",
              "cuit": "27303255418",
              "website": "https://cocacola.com.ar/",
              "bio": "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
              "image": "",
              "username": "cocacola",
              "email": "coca.cola@example.com",
              "password": "contraseña123",
              "city": "Buenos Aires",
              "country": "Argentina"
            }
            ```
            
    - Eliminar perfil del usuario: `DELETE: API_URL/user/:userId`
        
        Este end-point es accesible solo al propietario del perfil y al usuario **ADMIN**.
        
    - Feed del usuario: `GET: API_URL/user/feed/:userId/:usersType`
        
        El **id** debe ser el mismo del usuario logueado, excepto que sea **ADMIN**.
        
        **usersType** puede ser: `student`, `professional`, o `company`
        
        El algoritmo matcheará al usuario del `id` con los usuarios del grupo especificado con `usersType`.
        
        - Se puede calcular match entre:
        
        `student`-`professional`, `professional`-`student`, `student`-`student`, `professional`-`professional`
        
        Si el `id` es de un `professional` o `student` y el `usersType` es `company`, va a retornar las empresas cuyos puestos de trabajo coincidan con el perfil del usuario.
        
        Si el `id` es de una `company` y el `usersType` es `professional` o `student`, va a retornar a los usuarios cuyos perfiles coincidan con los puestos de trabajo de esa empresa.
        
        Si el `id` es de un `job`, va a retornar perfiles alineados solo con ese puesto de trabajo.
        
        **PAGINACIÓN:**
        
        Opcionalmente se puede añadir la *query* **page** que va a retornar la página indicada y **perPage** que determina la cantidad de elementos por página. Si no se indica nada por defecto muestra la página **1** y **10** elementos por página.
        
        Por ejemplo: `GET: API_URL/user/feed/:userId/professional?page=1`
        
        retorna la página **1** de los resultados, con **10** elementos por página.
        
        `GET: API_URL/user/feed/:userId/professional?page=3&perPage=3`
        
        retorna la página **3** de los resultados, con **3** elementos por página. 
        
        Retorna un objeto como:
        
        ```json
        {
          "currentPage": 1,
          "totalPages": 7,
          "data": [
            {
              "user": {
                "id": "47b39dd3-43b1-4827-907e-41dceeb1acfd",
                "type": "professional",
                "email": "ana.rodriguez@example.com",
                "username": "anarodriguez",
                "name": "Ana Rodriguez",
                "profile_bio": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
                "profile_birth": null,
                "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                "profile_city": "Madrid",
                "profile_country": "España",
                "profile_support": true,
                "academic_formation": "Senior",
                "academic_institution": "Universidad Autónoma de Madrid",
                "academic_area": [
                  "Marketing"
                ],
                "academic_graduation": "2000",
                "info_company_name": "ABC Marketing Agency",
                "info_position": "Gerente de Marketing",
                "info_career": [
                  "Desarrollo e implementación de estrategias de marketing",
                  "Gestión de equipos y proyectos",
                  "Incremento de la visibilidad de la marca"
                ],
                "info_skills": [
                  "Marketing digital",
                  "Planificación estratégica",
                  "Análisis de datos"
                ],
                "info_goals": [
                  "Conocer más sobre el mercado laboral de mi profesión",
                  "Conocer nuevos colegas y oportunidades"
                ],
                "info_interests": [
                  "Marketing de contenidos",
                  "Inteligencia de mercado"
                ],
                "info_problematic": [
                  "Falta de información del mercado laboral"
                ],
                "info_languages": [
                  "Español",
                  "Inglés"
                ],
                "info_availability": "Full-time",
                "info_contract": "Remoto",
                "createdAt": "2023-08-07T13:46:50.348Z",
                "updatedAt": "2023-08-07T13:46:50.348Z"
              },
              "matchScore": 35
            },
            {
              "user": {
                "id": "daf5ddad-0e55-4172-bcb0-ca7f62872579",
                "type": "professional",
                "email": "juana.rodriguez@example.com",
                "username": "juanarodriguez",
                "name": "Juana Rodriguez",
                "profile_bio": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
                "profile_birth": null,
                "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                "profile_city": "Madrid",
                "profile_country": "España",
                "profile_support": true,
                "academic_formation": "Senior",
                "academic_institution": "Universidad Autónoma de Madrid",
                "academic_area": [
                  "Marketing"
                ],
                "academic_graduation": "2000",
                "info_company_name": "ABC Marketing Agency",
                "info_position": "Gerente de Marketing",
                "info_career": [
                  "Desarrollo e implementación de estrategias de marketing",
                  "Gestión de equipos y proyectos",
                  "Incremento de la visibilidad de la marca"
                ],
                "info_skills": [
                  "Marketing digital",
                  "Planificación estratégica",
                  "Análisis de datos"
                ],
                "info_goals": [
                  "Conocer más sobre el mercado laboral de mi profesión",
                  "Conocer nuevos colegas y oportunidades"
                ],
                "info_interests": [
                  "Marketing de contenidos",
                  "Inteligencia de mercado"
                ],
                "info_problematic": [
                  "Falta de información del mercado laboral"
                ],
                "info_languages": [
                  "Español",
                  "Inglés"
                ],
                "info_availability": "Full-time",
                "info_contract": "Remoto",
                "createdAt": "2023-08-07T13:46:55.117Z",
                "updatedAt": "2023-08-07T13:46:55.117Z"
              },
              "matchScore": 35
            },
            {
              "user": {
                "id": "1ed26b22-70f4-47b4-8b0d-33f7257c2515",
                "type": "professional",
                "email": "maria.garcia@example.com",
                "username": "mariagarcia",
                "name": "Maria Garcia",
                "profile_bio": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam ipsam officia alias sapiente blanditiis ipsa nisi odio nam maiores corporis doloremque culpa itaque aspernatur inventore hic, sint quisquam voluptatibus iusto!",
                "profile_birth": "2007-01-12",
                "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                "profile_city": "Madrid",
                "profile_country": "España",
                "profile_support": false,
                "academic_formation": "Senior",
                "academic_institution": "IE Business School",
                "academic_area": [
                  "Dirección de Empresas"
                ],
                "academic_graduation": "2000",
                "info_company_name": "ABC Consulting",
                "info_position": "Consultora de Estrategia",
                "info_career": [
                  "Análisis de mercado y competencia",
                  "Desarrollo e implementación de estrategias empresariales",
                  "Gestión de las organizaciones"
                ],
                "info_skills": [
                  "Análisis estratégico",
                  "Planificación empresarial",
                  "Facilitación de talleres"
                ],
                "info_goals": [
                  "Conocer más sobre el mercado laboral de mi profesión",
                  "Conocer nuevos colegas y oportunidades"
                ],
                "info_interests": [
                  "Transformación digital",
                  "Innovación empresarial"
                ],
                "info_problematic": [
                  "Falta de información del mercado laboral"
                ],
                "info_languages": [
                  "Español",
                  "Inglés"
                ],
                "info_availability": "Full-time",
                "info_contract": "Remoto",
                "createdAt": "2023-08-07T16:10:36.242Z",
                "updatedAt": "2023-08-07T16:10:36.242Z"
              },
              "matchScore": 35
            }
          ]
        }
        ```
        
- **End-points para los PUESTOS DE TRABAJO:**
    - Publicar un nuevo puesto: `POST: API_URL/job/:companyId`
        
        A este end-point podrán acceder solo los usuarios de tipo `company` o el usuario **ADMIN**.
        
        Se va a asociar el trabajo a la empresa con el `id` especificado. El `id` debe coincidir con el del usuario logueado, excepto que sea **ADMIN**.
        
        Este es el formato esperado:
        
        ```json
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
          }
        ```
        
    - Editar un puesto: `PUT: API_URL/job/:id`
        
        Este end-point es accesible solo al perfil que creó el puesto de trabajo con el `id` especificado y al usuario **ADMIN**.
        
        - Se espera por *body* un objeto así:
            
            ```json
            {
              "jobName": "Programador Senior en Python2",
              "creationDate": "2012-12-21",
              "closingDate": "2021-12-21",
              "active": true,
              "levelRequired": "Avanzado",
              "studyArea": ["Ingeniería Informática"],
              "experienceRequired": "3",
              "industry": ["Finanzas y Banca", "TI"],
              "benefits": ["Planes de seguro de salud", "Flexibilidad laboral"],
              "skillsRequired": ["Programación en Python", "Desarrollo web", "Bases de datos"],
              "jobDescription": ["Inteligencia Artificial", "Desarrollo de aplicaciones móviles"],
              "jobGoal": ["Obtener una pasantía en una empresa de tecnología", "Desarrollar habilidades de liderazgo"],
              "languagesRequired": ["Español", "Inglés"],
              "availability": "Full-time",
              "contractOffered": "Remoto"
            }
            ```
            
    - Eliminar un puesto: `DELETE: API_URL/job/:id`
        
        Este end-point es accesible solo al perfil que creó el puesto de trabajo con el `id` especificado y al usuario **ADMIN**.
        
    - Obtener todos lo puestos abiertos por la empresa logueada: `GET: API_URL/job`
        
        Este end-point es accesible solo a usuarios de tipo `company`
        
        Retorna un *array* con los trabajos de la empresa actualmente logueada:
        
        ```json
        [
          {
            "id": "bb18c106-20ee-4cf1-b4e5-ed298da5c8f9",
            "companyId": "1656c8c8-c52f-4631-a73f-e3b12f8e6573",
            "jobName": "Programador Senior en Python",
            "creationDate": "2023-12-21",
            "closingDate": "2024-12-21",
            "active": true,
            "levelRequired": "Avanzado",
            "studyArea": [
              "Ingeniería Informática"
            ],
            "experienceRequired": "3",
            "industry": [
              "Finanzas y Banca",
              "TI"
            ],
            "benefits": [
              "Planes de seguro de salud",
              "Flexibilidad laboral"
            ],
            "skillsRequired": [
              "Programación en Python",
              "Desarrollo web",
              "Bases de datos"
            ],
            "jobDescription": [
              "Inteligencia Artificial",
              "Desarrollo de aplicaciones móviles"
            ],
            "jobGoal": [
              "Obtener una beca"
            ],
            "languagesRequired": [
              "Español",
              "Inglés"
            ],
            "availability": "Full-time",
            "contractOffered": "Remoto"
          }
        ]
        ```
        
- **End-points para las BÚSQUEDAS:**
    - *Búsqueda de usuarios:*
        - Buscar un usuario: `GET: API_URL/search/user/:id`
            
            Retorna un usuario `student`, `professional` o `company`, según su `id`
            
            Retorna un objeto como:
            
            ```json
            {
            	id: "a8f67d60-02dd-4d65-9d5e-8de09ed1dc79"
              type: "student",
              name: "David Hernandez",
              username: "davidh",
              email: "david.hernandez@example.com",
              password: "david1234",
              profile_bio:
                "Estudiante apasionado por la programación y el desarrollo de software. Busco adquirir conocimientos en nuevas tecnologías y contribuir a la creación de soluciones innovadoras.",
              profile_birth: "2000-09-12",
              profile_image: "",
              profile_city: "San Francisco",
              profile_country: "United States",
              profile_support: true,
              academic_formation: "Universitario Avanzado",
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
              ],
              info_interests: ["Machine Learning", "Desarrollo de aplicaciones móviles"],
              info_problematic: ["Dificultad para conseguir trabajo"],
              info_languages: ["Inglés", "Español"],
              info_availability: "Full-time",
              info_contract: "Remoto",
            };
            ```
            
        - Búsqueda avanzada de usuarios: `GET: API_URL/search/users?type=`
            
            El `type` siempre tiene que estar presente (`student`, `professional` o `company`).
            
            Para aplicar los filtros se encadenan las *queries* (que coinciden con las propiedades del objeto del usuario). No necesitan ser palabras completas; también busca por fragmentos de palabra: 
            
            `/search/users?type=student&academic_formation=universitario&academic_area=informática`
            
            Para buscar contenido múltiple en una *query*, hay que separar por coma cada palabra buscada:
            
            `/search/users?type=student&info_goals=Elegir una carrera,Encontrar una pasantía o trabajo`
            
            Si no se especifica ninguna *query* retorna todos los usuarios del `type` seleccionado.
            
            **PAGINACIÓN:**
            
            Opcionalmente se puede añadir la *query* **page** que va a retornar la página indicada y **perPage** que determina la cantidad de elementos por página. Si no se indica nada por defecto muestra la página **1** y **10** elementos por página.
            
            Por ejemplo: `GET: API_URL/search/users?type=student&page=1`
            
            retorna la página **1** de los resultados, con **10** estudiantes por página.
            
            `GET: API_URL/search/users?type=professional&page=3&perPage=3`
            
            retorna la página **3** de los resultados, con **3** profesionales por página. 
            
            Retorna un objeto como:
            
            ```json
            {
              "currentPage": 3,
              "totalPages": 7,
              "data": [
                {
                  "id": "e0d7b5a6-74e2-4def-8228-8f3dc010e815",
                  "type": "professional",
                  "email": "john.smith@example.com",
                  "username": "johnsmith",
                  "name": "John Smith",
                  "profile_bio": "Experienced software engineer with a passion for developing scalable and efficient applications. Seeking opportunities to work on challenging projects and collaborate with talented teams.",
                  "profile_birth": "1985-10-12",
                  "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                  "profile_city": "San Francisco",
                  "profile_country": "United States",
                  "profile_support": false,
                  "academic_formation": "Middle",
                  "academic_institution": "Stanford University",
                  "academic_area": [
                    "Computer Science"
                  ],
                  "academic_graduation": "2007",
                  "info_company_name": "Tech Innovations Inc.",
                  "info_position": "Senior Software Engineer",
                  "info_career": [
                    "Full-stack web development",
                    "Cloud computing",
                    "Agile software development"
                  ],
                  "info_skills": [
                    "JavaScript",
                    "Node.js",
                    "AWS",
                    "React"
                  ],
                  "info_goals": [
                    "Conocer nuevos colegas y oportunidades",
                    "Hacer una especialización"
                  ],
                  "info_interests": [
                    "Machine Learning",
                    "Blockchain Technology"
                  ],
                  "info_problematic": [
                    "Falta de guía profesional"
                  ],
                  "info_languages": [
                    "English"
                  ],
                  "info_availability": "Full-time",
                  "info_contract": "Presencial",
                  "createdAt": "2023-08-07T16:10:36.502Z",
                  "updatedAt": "2023-08-07T16:10:36.502Z"
                },
                {
                  "id": "b90909c3-6fb8-4d21-a90b-93b788d4a53b",
                  "type": "professional",
                  "email": "laura.fernandez@example.com",
                  "username": "laurafernandez",
                  "name": "Laura Fernandez",
                  "profile_bio": "Marketing professional with a focus on digital advertising and brand management. Committed to driving brand awareness and customer engagement through innovative marketing strategies.",
                  "profile_birth": "1990-06-25",
                  "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                  "profile_city": "Mexico City",
                  "profile_country": "Mexico",
                  "profile_support": true,
                  "academic_formation": "Senior",
                  "academic_institution": "Instituto Tecnológico de Monterrey",
                  "academic_area": [
                    "Marketing"
                  ],
                  "academic_graduation": "2012",
                  "info_company_name": "Global Brands Agency",
                  "info_position": "Digital Marketing Manager",
                  "info_career": [
                    "Digital advertising campaigns",
                    "Brand identity development",
                    "Social media marketing"
                  ],
                  "info_skills": [
                    "Google Ads",
                    "Social Media Management",
                    "Content Creation"
                  ],
                  "info_goals": [
                    "Conseguir un trabajo",
                    "Conocer más sobre el mercado laboral de mi profesión"
                  ],
                  "info_interests": [
                    "Influencer Marketing",
                    "Data-driven Marketing"
                  ],
                  "info_problematic": [
                    "Falta de información del mercado laboral"
                  ],
                  "info_languages": [
                    "Español",
                    "Inglés"
                  ],
                  "info_availability": "Full-time",
                  "info_contract": "Presencial",
                  "createdAt": "2023-08-07T16:10:36.735Z",
                  "updatedAt": "2023-08-07T16:10:36.735Z"
                },
                {
                  "id": "c98ef5de-5eb6-4ee4-8048-c395e14d84a2",
                  "type": "professional",
                  "email": "michael.chen@example.com",
                  "username": "michaelchen",
                  "name": "Michael Chen",
                  "profile_bio": "Experienced business analyst with a strong background in data analysis and project management. Dedicated to driving business growth and process optimization through data-driven insights.",
                  "profile_birth": "1988-02-18",
                  "profile_image": "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
                  "profile_city": "Singapore",
                  "profile_country": "Singapore",
                  "profile_support": false,
                  "academic_formation": "Senior",
                  "academic_institution": "National University of Singapore",
                  "academic_area": [
                    "Business Administration"
                  ],
                  "academic_graduation": "2010",
                  "info_company_name": "Global Solutions Corporation",
                  "info_position": "Business Analyst Manager",
                  "info_career": [
                    "Data analysis and reporting",
                    "Project management",
                    "Business process improvement"
                  ],
                  "info_skills": [
                    "Excel",
                    "SQL",
                    "Project Management",
                    "Tableau"
                  ],
                  "info_goals": [
                    "Emprender"
                  ],
                  "info_interests": [
                    "Data Visualization",
                    "Business Intelligence"
                  ],
                  "info_problematic": [
                    "Falta de guía profesional"
                  ],
                  "info_languages": [
                    "English",
                    "Mandarin"
                  ],
                  "info_availability": "Full-time",
                  "info_contract": "Presencial",
                  "createdAt": "2023-08-07T16:10:36.980Z",
                  "updatedAt": "2023-08-07T16:10:36.980Z"
                }
              ]
            }
            ```
            
    - *Búsqueda de trabajos:*
        - Buscar un trabajo: `GET: API_URL/search/job/:id`
            
            Retorna un trabajo según su `id`.
            
            Retorna un objeto como:
            
            ```json
            {
              "id": "700841c4-c321-4246-b478-69d5545309ee",
            	"companyId": "33919bb6-0731-4b68-9961-b906db35c064",
              "jobName": "Programador Senior en Python",
              "creationDate": "2012-12-21",
              "closingDate": "2021-12-21",
              "active": true,
              "levelRequired": "Avanzado",
              "studyArea": [
                "Ingeniería Informática"
              ],
              "experienceRequired": "3",
              "industry": [
                "Finanzas y Banca",
                "TI"
              ],
              "benefits": [
                "Planes de seguro de salud",
                "Flexibilidad laboral"
              ],
              "skillsRequired": [
                "Programación en Python",
                "Desarrollo web",
                "Bases de datos"
              ],
              "jobDescription": [
                "Inteligencia Artificial",
                "Desarrollo de aplicaciones móviles"
              ],
              "jobGoal": [
                "Contribuir al desarrollo de tecnologías innovadoras"  
            	],
              "languagesRequired": [
                "Español",
                "Inglés"
              ],
              "availability": "Full-time",
              "contractOffered": "Remoto",
            }
            ```
            
        - Búsqueda avanzada de trabajos: `GET: API_URL/search/jobs`
            
            Igual que con los usuarios, se pueden buscar trabajos aplicando filtros encadenando *queries*: 
            
            `/search/jobs?studyArea=computer&skillsRequired=javascript`
            
            Si no se especifica ninguna *query* retorna todos los puestos de trabajo.
            
- **End-points para la gestión de las IMÁGENES:**
    - Mostrar todas las imágenes en la base de datos: `GET: API_URL/images`
        
        Retorna un *array* como:
        
        ```json
        [
          {
            "id": "3309a492-12ac-413e-b431-ebf5cce87c48",
            "filename": "1691085368384--nombre-original-de-la-imagen.jpg",
            "filepath": "src\\uploads\\1691085368384--nombre-original-de-la-imagen.jpg",
            "createdAt": "2023-08-03T17:56:08.414Z",
            "updatedAt": "2023-08-03T17:56:08.414Z",
            "userId": "0fe1a286-2402-49d5-8034-f1c392e6574d",
            "companyId": null,
        		"adminId": null
          },
        	{
            "id": "4409a492-21dc-131e-b134-bef5cce87c55",
            "filename": "2145085418373--nombre-original-de-la-imagen.jpg",
            "filepath": "src\\uploads\\2145085418373--nombre-original-de-la-imagen.jpg",
            "createdAt": "2023-08-03T18:56:08.414Z",
            "updatedAt": "2023-08-03T18:56:08.414Z",
            "userId": null,
            "companyId": "1de1a286-5732-49d5-8034-f1c392e6543f",
        		"adminId": null
          }
        ]
        ```
        
        Se incluye el `userId` o `companyId` de quien haya subido la imagen.
        
    - Mostrar todas las imágenes subidas por un usuario: `GET: API_URL/images/user/:userId`
        
        Este endpoint es accesible solo al usuario que subió las imágenes y al usuario **ADMIN**.
        
    - Subir una nueva imagen: `POST: API_URL/images/upload`
        
        La imagen subida se asocia automáticamente al perfil del usuario que la subió.
        
        Formatos admitidos: ***jpeg, jpg, png, gif, svg***
        
        Cuando la subida es exitosa responde con el *id* y el *path* de la imagen:
        
        ```json
        {
          "imageId": "bd44225e-e2eb-4ab8-b862-37962e684dc6",
          "imagePath": "src\\uploads\\1691539291170--nombre-original-de-la-imagen.png"
        }
        ```
        
        Por ahora, se almacenan en el mismo servidor, en la carpeta `/src/uploads`
        
    - Subir imagen de perfil: `POST: API_URL/images/profile`
        
        La imagen subida reemplaza automáticamente la imagen de perfil del usuario logueado.
        
        Formatos admitidos: ***jpeg, jpg, png, gif, svg***
        
        Cuando la subida es exitosa responde con el *id* de la imagen y del usuario, y el *path* de la imagen:
        
        ```json
        {
          "imageId": "905d0fec-d4c2-4a18-8c50-d736fd0a5228",
          "profileId": "47b39dd3-43b1-4827-907e-41dceeb1acfd",
          "imagePath": "src\\uploads\\profiles\\1691560359319--nombre-original-de-la-imagen.png"
        }
        ```
        
        Por ahora, se almacenan en el mismo servidor, en la carpeta `/src/uploads/profiles`
        
    - Subir una imagen como foto de perfil de grupo: `POST: API_URL/images/group/:groupId`
        
        La imagen de grupo solo puede ser modificada por el creador, un integrante con rol *moderator* o el usuario **ADMIN**.
        
        Formatos admitidos: ***jpeg, jpg, png, gif, svg***
        
        Cuando la subida es exitosa responde con el *id* de la imagen y del grupo, y el *path* de la imagen:
        
        ```json
        {
          "imageId": "a3dc6561-4e9c-48a0-addd-bd638425c83c",
          "groupId": 9,
          "imagePath": "src\\uploads\\groups\\1691559638202--nombre-original-de-la-imagen.png"
        }
        ```
        
        Por ahora, se almacenan en el mismo servidor, en la carpeta `/src/uploads/groups`
        
    - Eliminar una imagen: `DELETE: API_URL/images/delete/:imageId`
        
        Este endpoint es accesible solo al usuario que subió la imagen y al usuario **ADMIN**.
        
- **End-points para el CHAT:**
    - Mostrar los chats del usuario: `GET: API_URL/chatroom/chat/:userId`
        
        Tanto el usuario logueado como el usuario **ADMIN** pueden acceder a este endpoint. Pero solo el propio usuario puede ver el contenido de sus mensajes*.*
        
        Retorna los chats del usuario con el `userId` especificado.
        
        Retorna un array de objetos, cada uno del tipo:
        
        ```json
        {
            "chat_id": 1,
            "messages": [
              {
                "message_id": 3,
                "sender_id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
                "receiver_id": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6",
                "content": "Hello",
                "messageStatus": "sent",
                "createdAt": "2023-08-05T17:18:56.237Z",
                "user": {
                  "username": "anarodriguez",
                  "id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
                  "profile_image": "https://url.com/image.jpg"
                }
              },
              {
                "message_id": 4,
                "sender_id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
                "receiver_id": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6",
                "content": "Hi!",
                "messageStatus": "sent",
                "createdAt": "2023-08-05T17:24:20.700Z",
                "user": {
                  "username": "anarodriguez",
                  "id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
                  "profile_image": "https://url.com/image.jpg"
                }
              }
        	]
        }
        ```
        
    - Mostrar los mensajes de un chat específico: `GET: API_URL/chatroom/chat/:chatId/messages`
        
        Tanto el usuario logueado como el usuario **ADMIN** pueden acceder a este endpoint. Pero solo el propio usuario puede ver el contenido de sus mensajes
        
        Retorna todos los mensajes pertenecientes al chat con el `chatId` especificado.
        
        Retorna un objeto con los datos del remitente (`UserSent`) y destinatario(`UserReceived`), y un *array* con los mensajes.
        
        ```json
        {
          "UserSent": {
            "username": "anarodriguez",
            "id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
            "profile_image": "https://images.unsplash.com/photo.jpg"
          },
          "UserReceived": {
            "username": "juanperez2",
            "id": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6",
            "profile_image": "https://images.unsplash.com/photo.jpg"
          },
          "messages": [
            {
              "userId": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
              "username": "anarodriguez",
              "profile_image": "https://images.unsplash.com/photo.jpg",
              "createdAt": "2023-08-05T20:51:42.069Z",
              "content": "Hello!",
              "messageStatus": "sent"
            },
            {
              "userId": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6",
              "username": "juanperez2",
              "profile_image": "https://images.unsplash.com/photo.jpg",
              "createdAt": "2023-08-05T20:51:27.188Z",
              "content": "Hi!",
              "messageStatus": "sent"
            }
        	]
        }
        ```
        
    - Enviar un nuevo mensaje: `POST: API_URL/chatroom/message`
        
        Espera por *body* un objeto como:
        
        ```json
        {
          "sender_id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe", 
          "receiver_id": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6", 
          "content": "Hello!"
        }
        ```
        
        Si todavía no existe un chat entre ambos usuarios se crea uno nuevo.
        
        Retorna un objeto como:
        
        ```json
        {
          "messageStatus": "sent",
          "createdAt": "2023-08-06T04:41:20.221Z",
          "message_id": 8,
          "chat_id": 1,
          "sender_id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
          "receiver_id": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6",
          "content": "Hello!"
        }
        ```
        
    - /Editar/Eliminar un mensaje: `PUT: API_URL/chatroom/chat/:chatId/message/:messageId`
        
        Tanto el usuario logueado como el usuario **ADMIN** pueden acceder a este endpoint. Pero solo el propio usuario puede ver el contenido de sus mensajes
        
        Espera el **id** del chat y el **id** del mensaje por *params*. Y por *body* un objeto con el contenido y el estado del mensaje (*sent*, *read*, *deleted*):
        
        ```json
        {
          "content": "Hi y'all!",
          "messageStatus": "sent"
        }
        ```
        
        Responde con un objeto:
        
        ```json
        {
          "message_id": 13,
          "chat_id": 6,
          "content": "Hi y'all!",
          "messageStatus": "sent",
          "createdAt": "2023-08-08T21:57:47.505Z",
          "sender_id": "47b39dd3-43b1-4827-907e-41dceeb1acfd",
          "receiver_id": "ecde47a3-2657-4cb3-8d47-e7b36f891380"
        }
        ```
        
        Además de editar el contenido, con este end-point se puede editar el *status* del mensaje (***sent***, ***read***, ***deleted***).
        
        Si el mensaje pasó del estado ***sent*** al ***read***, no puede volver a estar en ***sent***.
        
        Si el estado es cambiado a ***deleted***, se borra el mensaje y se retorna el texto a ser renderizado:
        
        ```json
        { 
        	"content": "Este mensaje fue eliminado" 
        }
        ```
        
    - Borrar un mensaje de la base de datos: `DELETE: API_URL/chatroom/chat/:chatId/message/:messageId`
        
        Solo el autor del mensaje o el usuario **ADMIN** pueden acceder a este *endpoint*.
        
        Elimina definitivamente el mensaje de la base de datos.
        
- **End-points para los GRUPOS DE CHAT:**
    
    **GRUPOS**
    
    - Mostrar todos los grupos en los que participa el usuario logueado: `GET: API_URL/chatroom/groups`
        
        Si la consulta es hecha por un usuario común, retorna los grupos en lo que participa. Si la consulta es hecha por el usuario **ADMIN** responde con todos los grupos, pero con los mensajes encriptados.
        
        Retorna un *array* de objetos, cada uno con la información de los grupos, sus integrantes, y sus mensajes. Cada objeto es como:
        
        ```json
        	{
            "id": 1,
            "name": "My new group",
            "createdAt": "2023-08-05T06:55:25.285Z",
            "updatedAt": "2023-08-05T06:55:25.285Z",
            "users": [
              {
                "id": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6",
                "username": "juanperez2",
                "type": "student",
                "profile_image": "https://images.unsplash.com/photo.jpg",
                "userChatGroup": {
                  "role": "moderator"
                },
        			{
                "id": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe",
                "username": "anarodriguez",
                "type": "professional",
                "profile_image": "https://images.unsplash.com/photo.jpg",
                "userChatGroup": {
                  "role": "member"
                }
              }
            ],
            "messages": [
              {
                "id": 17,
                "content": "This is a message",
                "messageStatus": "sent",
                "createdAt": "2023-08-06T00:21:19.019Z",
                "updatedAt": "2023-08-06T00:21:19.068Z",
                "userId": "ebf3d283-38f7-42dd-b580-ee6bb1febcd6"
              },
              {
                "id": 16,
                "content": "This is a message 2",
                "messageStatus": "sent",
                "createdAt": "2023-08-06T00:20:33.698Z",
                "updatedAt": "2023-08-06T00:20:33.823Z",
                "userId": "b0565a99-6250-4c4d-9886-7e3b4a1ba3fe"
              }
            ]
          }
        ```
        
        Si se incluye la *query* **list** en `true` (si no se incluye se la toma por `false`), retorna una lista con cada grupo del que el usuario es su creador o en el que tiene el rol *moderator.*
        
        `GET: API_URL/chatroom/groups?list=true` retorna:
        
        ```json
        [
          {
            "groupId": 1,
            "groupName": "Grupo 1"
          },
        
          {
            "groupId": 2,
            "groupName": "Grupo 2"
          }
        ]
        ```
        
    - Crear un nuevo grupo: `POST: API_URL/chatroom/groups`
        
        Espera un objeto así (si no se indica url de imagen establece una por defecto):
        
        ```json
        {
          "name": "My newest group",
        	"image": "http://url.com/img.jpg"
        }
        ```
        
        Crear un nuevo grupo y añade al usuario actual con el rol de `moderator`. Excepto que el usuario sea **ADMIN**. En ese caso, solo se crea el grupo.
        
        Retorna un objeto:
        
        ```json
        {
          "id": 9,
        	"ownerId": "908c221d-627d-40c1-ad5a-a577a03060e2",
          "name": "My newestest group",
        	"image": "http://url.com/img.jpg",
          "updatedAt": "2023-08-06T05:13:14.561Z",
          "createdAt": "2023-08-06T05:13:14.561Z"
        }
        ```
        
    - Editar nombre y/o imagen de un grupo: `PUT: API_URL/chatroom/groups/:groupId`
        
        Este end-point es accesible solo al creador del grupo, a los usuarios con rol *moderator* y al usuario **ADMIN**. Se pueden modificar el nombre, la imagen o ambas cosas a la vez.
        
        Espera un objeto como:
        
        ```json
        {
          "name": "Edited chat group name",
        	"image": "http://www.url.com/image.jpg"
        }
        ```
        
    - Eliminar un grupo: `DELETE: API_URL/chatroom/groups/:groupId`
        
        Este end-point es accesible solo al creador del grupo y al usuario **ADMIN**.
        
    
    **USUARIOS**
    
    - Añadir un usuario a un grupo: `POST: API_URL/chatroom/groups/:groupId/users`
        
        Solo pueden añadir nuevos miembros: el creador del grupo, los usuarios con rol *moderator* y el usuario **ADMIN**.
        
        Espera el `:groupId` por *params* y por *body* el `id`  del usuario y su `role` (*moderator*, *member*):
        
        ```json
        {
          "userId": "e0937fb6-9e32-4b78-a4b9-e16caa0c154d",
          "role": "member"
        }
        ```
        
    
    - Editar el rol de un usuario: `PATCH: API_URL/chatroom/groups/:groupId/users/:userId`
        
        El creador del grupo y el usuario **ADMIN** puede modificar el rol de todos los integrantes. Los integrantes con rol *moderator* pueden modificar el rol de otros integrantes, excepto el de otros integrantes con rol *moderator* y el del creador del grupo, que siempre es *moderator*.
        
        Espera el **id** del grupo y del usuario por *params*. Y por *body* un objeto con el nuevo rol:
        
        ```json
        {
          "role": "moderator"
        }
        ```
        
    - Expulsar a un usuario de un grupo: `DELETE: API_URL/chatroom/groups/:groupId/users/:userId`
        
        El creador del grupo y el usuario **ADMIN** pueden eliminar cualquier integrante. Los integrantes con rol *moderator* pueden eliminar otros integrantes, excepto al creador del grupo u otros integrantes con rol *moderator.*
        
    
    **MENSAJES**
    
    - Mostrar todos los mensajes de un grupo: `GET: API_URL/chatroom/groups/:groupId/messages`
        
        Tanto los integrantes del grupo del `:groupId` como el usuario **ADMIN** pueden acceder a este *endpoint*. Pero solo los integrantes puede ver el contenido de sus mensajes.
        
        Retorna un *array* de mensajes ordenados del más reciente al más antiguo:
        
        ```json
        [
          {
            "userId": "e0937fb6-9e32-4b78-a4b9-e16caa0c154d",
            "username": "juanperez2",
            "profile_image": "https://images.unsplash.com/photo.jpg",
            "messageId": 2,
            "createdAt": "2023-08-06T07:29:27.858Z",
            "content": "This is another message",
            "messageStatus": "sent"
          },
          {
            "userId": "908c221d-627d-40c1-ad5a-a577a03060e2",
            "username": "anarodriguez",
            "profile_image": "https://images.unsplash.com/photo.jpg",
            "messageId": 1,
            "createdAt": "2023-08-06T07:25:58.420Z",
            "content": "This is a message",
            "messageStatus": "sent"
          }
        ]
        ```
        
    - Publicar un nuevo mensaje grupal: `POST: API_URL/chatroom/groups/:groupId/messages`
        
        Solo los integrantes del grupo con el `:groupId` y el usuario **ADMIN** pueden acceder a este *endpoint*.
        
        Espera un objeto como:
        
        ```json
        {
          "content": "New message"
        }
        ```
        
        Responde con:
        
        ```json
        {
          "messageStatus": "sent",
          "id": 3,
          "content": "New message",
          "updatedAt": "2023-08-06T07:34:02.200Z",
          "createdAt": "2023-08-06T07:34:02.171Z",
          "userId": "e0937fb6-9e32-4b78-a4b9-e16caa0c154d",
          "chatGroupId": "1"
        }
        ```
        
    - Editar/Eliminar un mensaje grupal: `PUT: API_URL/chatroom/groups/:groupId/messages/:messageId`
        
        Solo el autor del mensaje o el usuario **ADMIN** pueden acceder a este *endpoint*.
        
        Espera el **id** del grupo y el del mensaje a ser editado.
        Espera un objeto como:
        
        ```json
        {
          "content": "Edited message",
          "messageStatus": "read"
        }
        ```
        
        Responde con un objeto:
        
        ```json
        [
          {
            "userId": "47b39dd3-43b1-4827-907e-41dceeb1acfd",
            "username": "anarodriguez",
            "profile_image": "https://www.url.com/image.jpg",
            "messageId": 7,
            "createdAt": "2023-08-08T18:08:27.164Z",
            "content": "Edited message",
            "messageStatus": "read"
          }
        ]
        ```
        
        Además de editar el contenido, con este end-point se puede editar el *status* del mensaje (***sent***, ***read***, ***deleted***).
        
        Si el mensaje pasó del estado ***sent*** al ***read***, no puede volver a estar en ***sent***.
        
        Si el estado es cambiado a ***deleted***, se borra el mensaje y se retorna el texto a ser renderizado:
        
        ```json
        { 
        	"content": "Este mensaje fue eliminado" 
        }
        ```
        
    - Eliminar un mensaje: `DELETE: API_URL/chatroom/:groupId/messages/:messageId`
        
        Solo el autor del mensaje o el usuario **ADMIN** pueden acceder a este *endpoint*.
        
        Elimina definitivamente el mensaje de la base de datos.
        
    - Mostrar una lista de las últimas conversaciones del usuario (combinando chats y grupos): `GET: API_URL/chatroom/conversations/:id/query_name=`
