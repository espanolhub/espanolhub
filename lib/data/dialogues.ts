export interface Dialogue {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  dialogue: Array<{
    speaker: string;
    text: string;
  }>;
  vocabulary?: Array<{
    word: string;
    translation: string;
  }>;
}

export const dialogues: Dialogue[] = [
  // RESTAURANT / COMIDA
  {
    id: 'dialogue-restaurant-1',
    title: 'En el Restaurante',
    category: 'Restaurante',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Camarero',
        text: 'Buenas tardes, ¿tienen reserva?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, a nombre de Martínez, para dos personas.',
      },
      {
        speaker: 'Camarero',
        text: 'Perfecto, síganme por favor. ¿Quieren ver la carta?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, por favor. ¿Qué recomienda?',
      },
      {
        speaker: 'Camarero',
        text: 'Nuestro plato del día es el pescado a la plancha. También tenemos una paella excelente.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto, entonces quiero la paella y mi acompañante quiere el pescado.',
      },
      {
        speaker: 'Camarero',
        text: '¿Quieren algo de beber?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, una botella de agua y dos copas de vino tinto, por favor.',
      },
      {
        speaker: 'Camarero',
        text: 'Muy bien, enseguida les traigo la bebida.',
      },
    ],
    vocabulary: [
      { word: 'reserva', translation: 'reservation' },
      { word: 'carta', translation: 'menu' },
      { word: 'recomendar', translation: 'to recommend' },
      { word: 'paella', translation: 'paella (Spanish rice dish)' },
      { word: 'a la plancha', translation: 'grilled' },
    ],
  },
  {
    id: 'dialogue-restaurant-2',
    title: 'Pidiendo la Cuenta',
    category: 'Restaurante',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Camarero, ¿puede traernos la cuenta, por favor?',
      },
      {
        speaker: 'Camarero',
        text: 'Por supuesto, ¿está todo bien?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, todo estaba delicioso. ¿Incluyen el servicio?',
      },
      {
        speaker: 'Camarero',
        text: 'No, el servicio no está incluido. Es costumbre dejar entre el 10% y el 15%.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Aceptan tarjeta de crédito?',
      },
      {
        speaker: 'Camarero',
        text: 'Sí, aceptamos todas las tarjetas principales.',
      },
      {
        speaker: 'Cliente',
        text: 'Gracias. Ha sido un placer.',
      },
      {
        speaker: 'Camarero',
        text: 'Gracias a ustedes. ¡Que tengan un buen día!',
      },
    ],
    vocabulary: [
      { word: 'cuenta', translation: 'bill/check' },
      { word: 'servicio', translation: 'service (tip)' },
      { word: 'tarjeta de crédito', translation: 'credit card' },
      { word: 'costumbre', translation: 'custom/habit' },
    ],
  },

  // SHOPPING / COMPRAS
  {
    id: 'dialogue-shopping-1',
    title: 'Comprando Ropa',
    category: 'Compras',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Dependiente',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, busco una camisa azul, talla mediana.',
      },
      {
        speaker: 'Dependiente',
        text: 'Tenemos varias opciones. ¿Qué tipo de camisa busca?',
      },
      {
        speaker: 'Cliente',
        text: 'Algo formal, para el trabajo.',
      },
      {
        speaker: 'Dependiente',
        text: 'Perfecto, tenemos estas camisas de algodón. Pueden probárselas en el probador.',
      },
      {
        speaker: 'Cliente',
        text: '¿Cuánto cuesta esta?',
      },
      {
        speaker: 'Dependiente',
        text: 'Esta camisa cuesta 45 euros. Está en oferta esta semana.',
      },
      {
        speaker: 'Cliente',
        text: 'Me gusta mucho. Me la llevo.',
      },
      {
        speaker: 'Dependiente',
        text: 'Excelente elección. ¿Algo más?',
      },
      {
        speaker: 'Cliente',
        text: 'No, solo esto. ¿Puedo pagar con tarjeta?',
      },
      {
        speaker: 'Dependiente',
        text: 'Por supuesto. Su tarjeta, por favor.',
      },
    ],
    vocabulary: [
      { word: 'talla', translation: 'size' },
      { word: 'probador', translation: 'fitting room' },
      { word: 'en oferta', translation: 'on sale' },
      { word: 'algodón', translation: 'cotton' },
    ],
  },
  {
    id: 'dialogue-shopping-2',
    title: 'Devolviendo un Producto',
    category: 'Compras',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Disculpe, compré estos zapatos ayer y no me quedan bien. ¿Puedo cambiarlos?',
      },
      {
        speaker: 'Dependiente',
        text: 'Por supuesto. ¿Tiene el ticket de compra?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, aquí está.',
      },
      {
        speaker: 'Dependiente',
        text: 'Perfecto. ¿Quiere cambiarlos por otra talla o prefiere un reembolso?',
      },
      {
        speaker: 'Cliente',
        text: 'Preferiría cambiar por una talla más grande, si tienen.',
      },
      {
        speaker: 'Dependiente',
        text: 'Déjeme verificar el almacén. Sí, tenemos su talla. ¿Quiere probárselos?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, por favor.',
      },
      {
        speaker: 'Dependiente',
        text: 'Perfecto, me avisa si le quedan bien.',
      },
    ],
    vocabulary: [
      { word: 'quedar', translation: 'to fit' },
      { word: 'ticket de compra', translation: 'receipt' },
      { word: 'reembolso', translation: 'refund' },
      { word: 'almacén', translation: 'warehouse/stock' },
    ],
  },

  // TRAVEL / VIAJES
  {
    id: 'dialogue-travel-1',
    title: 'En el Aeropuerto',
    category: 'Viajes',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿tiene su pasaporte y el billete?',
      },
      {
        speaker: 'Viajero',
        text: 'Sí, aquí están.',
      },
      {
        speaker: 'Empleado',
        text: '¿Cuántas maletas va a facturar?',
      },
      {
        speaker: 'Viajero',
        text: 'Una maleta grande y este equipaje de mano.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. ¿Tiene algún objeto peligroso o líquidos?',
      },
      {
        speaker: 'Viajero',
        text: 'No, todo está correcto.',
      },
      {
        speaker: 'Empleado',
        text: 'Muy bien. Su asiento está en la fila 15, asiento B. La puerta de embarque es la número 8.',
      },
      {
        speaker: 'Viajero',
        text: 'Gracias. ¿A qué hora es el embarque?',
      },
      {
        speaker: 'Empleado',
        text: 'El embarque comienza a las 10:30. Tenga su tarjeta de embarque lista.',
      },
    ],
    vocabulary: [
      { word: 'pasaporte', translation: 'passport' },
      { word: 'billete', translation: 'ticket' },
      { word: 'facturar', translation: 'to check in (luggage)' },
      { word: 'equipaje de mano', translation: 'hand luggage' },
      { word: 'embarque', translation: 'boarding' },
    ],
  },
  {
    id: 'dialogue-travel-2',
    title: 'Preguntando Direcciones',
    category: 'Viajes',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Turista',
        text: 'Disculpe, ¿sabe dónde está el Museo del Prado?',
      },
      {
        speaker: 'Local',
        text: 'Sí, está en el centro. Puede ir en metro o caminando.',
      },
      {
        speaker: 'Turista',
        text: '¿Cuál es más rápido?',
      },
      {
        speaker: 'Local',
        text: 'En metro es más rápido. Tome la línea 2 y baje en la estación Banco de España.',
      },
      {
        speaker: 'Turista',
        text: '¿Está muy lejos caminando?',
      },
      {
        speaker: 'Local',
        text: 'No, son unos 20 minutos desde aquí. Vaya recto hasta la plaza, luego gire a la derecha.',
      },
      {
        speaker: 'Turista',
        text: 'Perfecto, creo que caminaré. ¿Hay algún restaurante bueno por ahí?',
      },
      {
        speaker: 'Local',
        text: 'Sí, hay varios. El que está al lado del museo es muy bueno.',
      },
      {
        speaker: 'Turista',
        text: 'Muchas gracias por su ayuda.',
      },
      {
        speaker: 'Local',
        text: 'De nada, que disfrute su visita.',
      },
    ],
    vocabulary: [
      { word: 'metro', translation: 'subway/metro' },
      { word: 'estación', translation: 'station' },
      { word: 'girar', translation: 'to turn' },
      { word: 'disfrutar', translation: 'to enjoy' },
    ],
  },

  // WORK / TRABAJO
  {
    id: 'dialogue-work-1',
    title: 'Reunión de Trabajo',
    category: 'Trabajo',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Jefe',
        text: 'Buenos días a todos. Empecemos la reunión. Tenemos que discutir el nuevo proyecto.',
      },
      {
        speaker: 'Empleado 1',
        text: 'Perfecto. ¿Cuál es el objetivo principal?',
      },
      {
        speaker: 'Jefe',
        text: 'Necesitamos aumentar nuestras ventas en un 20% este trimestre.',
      },
      {
        speaker: 'Empleado 2',
        text: 'Eso es ambicioso. ¿Tenemos el presupuesto necesario?',
      },
      {
        speaker: 'Jefe',
        text: 'Sí, la empresa ha aprobado un presupuesto adicional. ¿Cuál es su plan?',
      },
      {
        speaker: 'Empleado 1',
        text: 'Propongo lanzar una campaña publicitaria en redes sociales.',
      },
      {
        speaker: 'Empleado 2',
        text: 'Y también podríamos ofrecer descuentos especiales a clientes nuevos.',
      },
      {
        speaker: 'Jefe',
        text: 'Me parecen buenas ideas. ¿Cuándo pueden tener el plan completo?',
      },
      {
        speaker: 'Empleado 1',
        text: 'Creo que para el viernes podemos tener todo listo.',
      },
      {
        speaker: 'Jefe',
        text: 'Perfecto. Revisemos el progreso el viernes entonces.',
      },
    ],
    vocabulary: [
      { word: 'reunión', translation: 'meeting' },
      { word: 'trimestre', translation: 'quarter' },
      { word: 'presupuesto', translation: 'budget' },
      { word: 'campaña publicitaria', translation: 'advertising campaign' },
      { word: 'descuento', translation: 'discount' },
    ],
  },
  {
    id: 'dialogue-work-2',
    title: 'Entrevista de Trabajo',
    category: 'Trabajo',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Entrevistador',
        text: 'Bienvenido. Gracias por venir. ¿Puede contarme un poco sobre su experiencia?',
      },
      {
        speaker: 'Candidato',
        text: 'Por supuesto. He trabajado en marketing digital durante cinco años. Mi último puesto fue como gerente de campañas.',
      },
      {
        speaker: 'Entrevistador',
        text: 'Interesante. ¿Qué habilidades considera que son sus mayores fortalezas?',
      },
      {
        speaker: 'Candidato',
        text: 'Soy muy organizado y trabajo bien en equipo. También tengo experiencia en análisis de datos y estrategia digital.',
      },
      {
        speaker: 'Entrevistador',
        text: 'Perfecto. ¿Por qué está interesado en trabajar con nosotros?',
      },
      {
        speaker: 'Candidato',
        text: 'Me atrae la oportunidad de crecimiento profesional y el ambiente innovador de la empresa. Además, sus valores coinciden con los míos.',
      },
      {
        speaker: 'Entrevistador',
        text: 'Excelente. ¿Tiene alguna pregunta para nosotros?',
      },
      {
        speaker: 'Candidato',
        text: 'Sí, ¿cuál es el proceso de desarrollo profesional en la empresa?',
      },
      {
        speaker: 'Entrevistador',
        text: 'Tenemos programas de formación continua y oportunidades de promoción interna. Le contactaremos la próxima semana.',
      },
    ],
    vocabulary: [
      { word: 'entrevista', translation: 'interview' },
      { word: 'candidato', translation: 'candidate' },
      { word: 'fortalezas', translation: 'strengths' },
      { word: 'análisis de datos', translation: 'data analysis' },
      { word: 'promoción interna', translation: 'internal promotion' },
    ],
  },

  // HEALTH / SALUD
  {
    id: 'dialogue-health-1',
    title: 'En el Médico',
    category: 'Salud',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Doctor',
        text: 'Buenos días, ¿qué le pasa?',
      },
      {
        speaker: 'Paciente',
        text: 'Buenos días, doctor. Llevo varios días con dolor de cabeza y fiebre.',
      },
      {
        speaker: 'Doctor',
        text: '¿Desde cuándo tiene estos síntomas?',
      },
      {
        speaker: 'Paciente',
        text: 'Desde el lunes. También tengo tos y me duele la garganta.',
      },
      {
        speaker: 'Doctor',
        text: 'Déjeme revisar su garganta. Abra la boca, por favor.',
      },
      {
        speaker: 'Paciente',
        text: 'Ah.',
      },
      {
        speaker: 'Doctor',
        text: 'Tiene la garganta un poco inflamada. Le voy a recetar un antibiótico.',
      },
      {
        speaker: 'Paciente',
        text: '¿Cuántos días debo tomarlo?',
      },
      {
        speaker: 'Doctor',
        text: 'Tres veces al día durante una semana. Y descanse mucho.',
      },
      {
        speaker: 'Paciente',
        text: 'Gracias, doctor. ¿Cuándo debo volver?',
      },
      {
        speaker: 'Doctor',
        text: 'Si no mejora en tres días, venga de nuevo.',
      },
    ],
    vocabulary: [
      { word: 'síntomas', translation: 'symptoms' },
      { word: 'recetar', translation: 'to prescribe' },
      { word: 'antibiótico', translation: 'antibiotic' },
      { word: 'inflamada', translation: 'inflamed' },
    ],
  },
  {
    id: 'dialogue-health-2',
    title: 'En la Farmacia',
    category: 'Salud',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Farmacéutico',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, necesito esta receta médica.',
      },
      {
        speaker: 'Farmacéutico',
        text: 'Perfecto. Déjeme prepararle los medicamentos. ¿Tiene alergia a algún medicamento?',
      },
      {
        speaker: 'Cliente',
        text: 'No, ninguna.',
      },
      {
        speaker: 'Farmacéutico',
        text: 'Muy bien. Tome este medicamento después de cada comida, tres veces al día.',
      },
      {
        speaker: 'Cliente',
        text: '¿Y este otro?',
      },
      {
        speaker: 'Farmacéutico',
        text: 'Este es para el dolor. Tómeselo solo cuando le duela, máximo cada 8 horas.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Cuánto es?',
      },
      {
        speaker: 'Farmacéutico',
        text: 'Son 25 euros en total. ¿Algo más?',
      },
      {
        speaker: 'Cliente',
        text: 'No, eso es todo. Gracias.',
      },
    ],
    vocabulary: [
      { word: 'receta médica', translation: 'medical prescription' },
      { word: 'alergia', translation: 'allergy' },
      { word: 'medicamento', translation: 'medicine' },
      { word: 'farmacéutico', translation: 'pharmacist' },
    ],
  },

  // SCHOOL / EDUCACIÓN
  {
    id: 'dialogue-school-1',
    title: 'En la Universidad',
    category: 'Educación',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Profesor',
        text: 'Buenos días, clase. Hoy vamos a revisar el examen de la semana pasada.',
      },
      {
        speaker: 'Estudiante',
        text: 'Profesor, ¿cuándo publicará las calificaciones?',
      },
      {
        speaker: 'Profesor',
        text: 'Las publicaré mañana en el campus virtual. ¿Tienen alguna pregunta sobre el examen?',
      },
      {
        speaker: 'Estudiante',
        text: 'Sí, sobre la pregunta número 5. No estoy seguro de mi respuesta.',
      },
      {
        speaker: 'Profesor',
        text: 'Bien, repasemos esa pregunta. Era sobre el subjuntivo. ¿Recuerdan la regla?',
      },
      {
        speaker: 'Estudiante',
        text: 'Sí, se usa después de expresiones de duda.',
      },
      {
        speaker: 'Profesor',
        text: 'Exacto. Para la próxima clase, lean el capítulo 8 y preparen la presentación.',
      },
      {
        speaker: 'Estudiante',
        text: '¿Cuándo son las presentaciones?',
      },
      {
        speaker: 'Profesor',
        text: 'Serán la próxima semana, empezando el lunes. Ya les di las fechas.',
      },
    ],
    vocabulary: [
      { word: 'calificaciones', translation: 'grades' },
      { word: 'campus virtual', translation: 'virtual campus' },
      { word: 'subjuntivo', translation: 'subjunctive mood' },
      { word: 'capítulo', translation: 'chapter' },
      { word: 'presentación', translation: 'presentation' },
    ],
  },

  // DAILY LIFE / VIDA DIARIA
  {
    id: 'dialogue-daily-1',
    title: 'Llamada Telefónica',
    category: 'Vida Diaria',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Persona 1',
        text: 'Hola, ¿está Ana?',
      },
      {
        speaker: 'Persona 2',
        text: 'No, no está. ¿Quién llama?',
      },
      {
        speaker: 'Persona 1',
        text: 'Soy Carlos, un amigo de Ana. ¿Puede decirle que llame cuando vuelva?',
      },
      {
        speaker: 'Persona 2',
        text: 'Por supuesto. ¿Tiene su número de teléfono?',
      },
      {
        speaker: 'Persona 1',
        text: 'Sí, es el 654 321 987.',
      },
      {
        speaker: 'Persona 2',
        text: 'Perfecto, se lo diré. ¿Algo más?',
      },
      {
        speaker: 'Persona 1',
        text: 'No, solo eso. Gracias.',
      },
      {
        speaker: 'Persona 2',
        text: 'De nada. Que tenga un buen día.',
      },
    ],
    vocabulary: [
      { word: 'llamar', translation: 'to call' },
      { word: 'número de teléfono', translation: 'phone number' },
      { word: 'vuelva', translation: 'comes back' },
    ],
  },
  {
    id: 'dialogue-daily-2',
    title: 'Haciendo una Cita',
    category: 'Vida Diaria',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Recepcionista',
        text: 'Buenos días, Peluquería Elegante. ¿En qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, me gustaría hacer una cita para cortarme el pelo.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Por supuesto. ¿Qué día le viene bien?',
      },
      {
        speaker: 'Cliente',
        text: '¿Tienen disponibilidad el viernes por la tarde?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Déjeme ver... Sí, tenemos a las 4:30 o a las 5:30.',
      },
      {
        speaker: 'Cliente',
        text: 'La de las 5:30 me viene mejor. ¿Cuánto tiempo dura?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Aproximadamente una hora. ¿Su nombre, por favor?',
      },
      {
        speaker: 'Cliente',
        text: 'María González.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto, señora González. Tiene cita para el viernes a las 5:30. ¿Algo más?',
      },
      {
        speaker: 'Cliente',
        text: 'No, eso es todo. Gracias.',
      },
    ],
    vocabulary: [
      { word: 'hacer una cita', translation: 'to make an appointment' },
      { word: 'disponibilidad', translation: 'availability' },
      { word: 'aproximadamente', translation: 'approximately' },
      { word: 'peluquería', translation: 'hair salon' },
    ],
  },

  // HOTEL / HOTEL
  {
    id: 'dialogue-hotel-1',
    title: 'Check-in en el Hotel',
    category: 'Hotel',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Recepcionista',
        text: 'Buenas tardes. ¿Tiene reserva?',
      },
      {
        speaker: 'Huésped',
        text: 'Sí, a nombre de Rodríguez.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto. Su habitación es la 305. ¿Puedo ver su identificación, por favor?',
      },
      {
        speaker: 'Huésped',
        text: 'Claro, aquí está mi pasaporte.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Gracias. El desayuno se sirve de 7 a 10 de la mañana. El WiFi es gratuito.',
      },
      {
        speaker: 'Huésped',
        text: 'Perfecto. ¿A qué hora es el check-out?',
      },
      {
        speaker: 'Recepcionista',
        text: 'El check-out es a las 12 del mediodía. Si necesita más tiempo, puede solicitar una salida tardía.',
      },
      {
        speaker: 'Huésped',
        text: 'De acuerdo. ¿Dónde está el gimnasio?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Está en la segunda planta. Aquí tiene las llaves. Que disfrute su estancia.',
      },
    ],
    vocabulary: [
      { word: 'huésped', translation: 'guest' },
      { word: 'check-out', translation: 'check-out' },
      { word: 'salida tardía', translation: 'late checkout' },
      { word: 'estancia', translation: 'stay' },
    ],
  },

  // TRANSPORT / TRANSPORTE
  {
    id: 'dialogue-transport-1',
    title: 'Tomando el Autobús',
    category: 'Transporte',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Pasajero',
        text: 'Hola, ¿este autobús va al centro?',
      },
      {
        speaker: 'Conductor',
        text: 'Sí, va al centro. ¿Cuántos billetes necesita?',
      },
      {
        speaker: 'Pasajero',
        text: 'Uno, por favor.',
      },
      {
        speaker: 'Conductor',
        text: 'Son 1,50 euros.',
      },
      {
        speaker: 'Pasajero',
        text: 'Aquí tiene. ¿Cuántas paradas son?',
      },
      {
        speaker: 'Conductor',
        text: 'Son 8 paradas. Le aviso cuando lleguemos.',
      },
      {
        speaker: 'Pasajero',
        text: 'Perfecto, gracias.',
      },
    ],
    vocabulary: [
      { word: 'autobús', translation: 'bus' },
      { word: 'billete', translation: 'ticket' },
      { word: 'parada', translation: 'stop' },
    ],
  },
  {
    id: 'dialogue-transport-2',
    title: 'En el Taxi',
    category: 'Transporte',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Pasajero',
        text: 'Buenos días, ¿está libre?',
      },
      {
        speaker: 'Taxista',
        text: 'Sí, suba. ¿A dónde va?',
      },
      {
        speaker: 'Pasajero',
        text: 'A la estación de tren, por favor.',
      },
      {
        speaker: 'Taxista',
        text: 'De acuerdo. ¿Tiene equipaje?',
      },
      {
        speaker: 'Pasajero',
        text: 'Sí, una maleta. ¿Puede ayudarme?',
      },
      {
        speaker: 'Taxista',
        text: 'Por supuesto. ¿Tiene prisa?',
      },
      {
        speaker: 'Pasajero',
        text: 'Sí, tengo que llegar antes de las 10.',
      },
      {
        speaker: 'Taxista',
        text: 'No se preocupe, llegaremos a tiempo. Son unos 15 minutos.',
      },
      {
        speaker: 'Pasajero',
        text: 'Perfecto. ¿Cuánto cuesta aproximadamente?',
      },
      {
        speaker: 'Taxista',
        text: 'Unos 12 o 13 euros, depende del tráfico.',
      },
    ],
    vocabulary: [
      { word: 'taxista', translation: 'taxi driver' },
      { word: 'equipaje', translation: 'luggage' },
      { word: 'prisa', translation: 'hurry' },
      { word: 'tráfico', translation: 'traffic' },
    ],
  },

  // BANK / BANCO
  {
    id: 'dialogue-bank-1',
    title: 'Abrir una Cuenta',
    category: 'Banco',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Buenos días, quiero abrir una cuenta bancaria.',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. ¿Qué tipo de cuenta necesita?',
      },
      {
        speaker: 'Cliente',
        text: 'Una cuenta corriente, para uso personal.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. Necesito su identificación y comprobante de domicilio.',
      },
      {
        speaker: 'Cliente',
        text: 'Aquí tiene mi pasaporte y una factura de luz.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. ¿Quiere tarjeta de débito también?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, por favor. ¿Tiene algún costo?',
      },
      {
        speaker: 'Empleado',
        text: 'La tarjeta es gratuita. La cuenta tiene una comisión mensual de 5 euros.',
      },
      {
        speaker: 'Cliente',
        text: 'De acuerdo. ¿Cuándo estarán listas las tarjetas?',
      },
      {
        speaker: 'Empleado',
        text: 'En unos 7 días hábiles. Se las enviaremos por correo.',
      },
    ],
    vocabulary: [
      { word: 'cuenta corriente', translation: 'checking account' },
      { word: 'comprobante de domicilio', translation: 'proof of address' },
      { word: 'tarjeta de débito', translation: 'debit card' },
      { word: 'comisión', translation: 'fee' },
    ],
  },
  {
    id: 'dialogue-bank-2',
    title: 'Retirar Dinero',
    category: 'Banco',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Buenos días, quiero retirar dinero de mi cuenta.',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. ¿Tiene su tarjeta?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, aquí está.',
      },
      {
        speaker: 'Empleado',
        text: 'Necesito su identificación también.',
      },
      {
        speaker: 'Cliente',
        text: 'Aquí tiene mi DNI. ¿Cuánto puedo retirar?',
      },
      {
        speaker: 'Empleado',
        text: 'Tiene 1.500 euros disponibles. ¿Cuánto quiere retirar?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero retirar 300 euros.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. Firme aquí, por favor.',
      },
      {
        speaker: 'Cliente',
        text: 'Listo. ¿Necesita algo más?',
      },
      {
        speaker: 'Empleado',
        text: 'No, eso es todo. Aquí tiene su dinero.',
      },
    ],
    vocabulary: [
      { word: 'retirar', translation: 'to withdraw' },
      { word: 'DNI', translation: 'ID card' },
      { word: 'disponibles', translation: 'available' },
    ],
  },

  // POST OFFICE / CORREO
  {
    id: 'dialogue-post-1',
    title: 'Enviar un Paquete',
    category: 'Correo',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿qué necesita?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero enviar este paquete a Madrid.',
      },
      {
        speaker: 'Empleado',
        text: 'De acuerdo. ¿Qué contiene el paquete?',
      },
      {
        speaker: 'Cliente',
        text: 'Libros y ropa. Nada frágil.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. ¿Quiere envío ordinario o urgente?',
      },
      {
        speaker: 'Cliente',
        text: 'Ordinario está bien. ¿Cuánto tarda?',
      },
      {
        speaker: 'Empleado',
        text: 'Unos 3 días hábiles. Son 8 euros.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Necesito rellenar algún formulario?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, complete esta etiqueta con la dirección de destino.',
      },
    ],
    vocabulary: [
      { word: 'paquete', translation: 'package' },
      { word: 'frágil', translation: 'fragile' },
      { word: 'envío ordinario', translation: 'regular mail' },
      { word: 'urgente', translation: 'urgent' },
      { word: 'etiqueta', translation: 'label' },
    ],
  },

  // SUPERMARKET / SUPERMERCADO
  {
    id: 'dialogue-supermarket-1',
    title: 'En el Supermercado',
    category: 'Supermercado',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Disculpe, ¿dónde está la sección de lácteos?',
      },
      {
        speaker: 'Empleado',
        text: 'Está al fondo, a la izquierda.',
      },
      {
        speaker: 'Cliente',
        text: 'Gracias. Y el pan, ¿dónde está?',
      },
      {
        speaker: 'Empleado',
        text: 'En la panadería, junto a la caja.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Aceptan tarjeta?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, aceptamos tarjeta y efectivo.',
      },
    ],
    vocabulary: [
      { word: 'lácteos', translation: 'dairy products' },
      { word: 'panadería', translation: 'bakery' },
      { word: 'caja', translation: 'checkout counter' },
    ],
  },
  {
    id: 'dialogue-supermarket-2',
    title: 'En la Caja',
    category: 'Supermercado',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Cajero',
        text: 'Buenos días. ¿Tiene tarjeta de fidelidad?',
      },
      {
        speaker: 'Cliente',
        text: 'No, no tengo.',
      },
      {
        speaker: 'Cajero',
        text: 'Son 45,30 euros en total. ¿Paga con tarjeta o efectivo?',
      },
      {
        speaker: 'Cliente',
        text: 'Con tarjeta, por favor.',
      },
      {
        speaker: 'Cajero',
        text: 'Inserte su tarjeta en el lector.',
      },
      {
        speaker: 'Cliente',
        text: '¿Puedo tener bolsas?',
      },
      {
        speaker: 'Cajero',
        text: 'Sí, las bolsas cuestan 10 céntimos cada una.',
      },
      {
        speaker: 'Cliente',
        text: 'Deme dos bolsas, por favor.',
      },
      {
        speaker: 'Cajero',
        text: 'Perfecto. Aquí tiene su recibo. ¡Que tenga un buen día!',
      },
    ],
    vocabulary: [
      { word: 'tarjeta de fidelidad', translation: 'loyalty card' },
      { word: 'efectivo', translation: 'cash' },
      { word: 'lector', translation: 'card reader' },
      { word: 'recibo', translation: 'receipt' },
    ],
  },

  // HAIR SALON / PELUQUERÍA (ya tenemos uno pero agreguemos otro nivel)
  {
    id: 'dialogue-hair-2',
    title: 'Cortándose el Pelo',
    category: 'Peluquería',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Peluquero',
        text: 'Buenos días, pase. ¿Qué quiere hacer hoy?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero cortarme el pelo y un poco de tinte.',
      },
      {
        speaker: 'Peluquero',
        text: 'Perfecto. ¿Cómo quiere el corte?',
      },
      {
        speaker: 'Cliente',
        text: 'Más corto por los lados y un poco más largo arriba.',
      },
      {
        speaker: 'Peluquero',
        text: 'De acuerdo. ¿Y el color?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero algo natural, quizás un poco más claro.',
      },
      {
        speaker: 'Peluquero',
        text: 'Perfecto. ¿Quiere también un lavado?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, por favor.',
      },
      {
        speaker: 'Peluquero',
        text: 'Muy bien, vamos a empezar.',
      },
    ],
    vocabulary: [
      { word: 'corte', translation: 'haircut' },
      { word: 'tinte', translation: 'hair dye' },
      { word: 'lavado', translation: 'wash' },
    ],
  },

  // LIBRARY / BIBLIOTECA
  {
    id: 'dialogue-library-1',
    title: 'En la Biblioteca',
    category: 'Biblioteca',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Bibliotecario',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Usuario',
        text: 'Hola, quiero hacer una tarjeta de la biblioteca.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Perfecto. ¿Tiene identificación?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, aquí está mi DNI.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Muy bien. La tarjeta es gratuita. ¿Quiere llevarse algún libro hoy?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, busco un libro de historia de España.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Están en la sección de historia, segunda planta. ¿Necesita ayuda para encontrarlos?',
      },
      {
        speaker: 'Usuario',
        text: 'No, gracias. ¿Cuánto tiempo puedo tener el libro?',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Dos semanas. Puede renovarlo si lo necesita.',
      },
    ],
    vocabulary: [
      { word: 'tarjeta', translation: 'card' },
      { word: 'identificación', translation: 'ID' },
      { word: 'renovar', translation: 'to renew' },
    ],
  },

  // CINEMA / CINE
  {
    id: 'dialogue-cinema-1',
    title: 'Comprando Entradas de Cine',
    category: 'Cine',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenas tardes, ¿para qué película?',
      },
      {
        speaker: 'Cliente',
        text: 'Dos entradas para la sesión de las 8, por favor.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. ¿Prefieren butacas normales o VIP?',
      },
      {
        speaker: 'Cliente',
        text: 'Normales está bien. ¿Cuánto cuesta?',
      },
      {
        speaker: 'Empleado',
        text: 'Son 9 euros cada una. Total 18 euros.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Puedo pagar con tarjeta?',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. Aquí tiene sus entradas. Disfruten la película.',
      },
    ],
    vocabulary: [
      { word: 'entrada', translation: 'ticket' },
      { word: 'sesión', translation: 'showing/session' },
      { word: 'butaca', translation: 'seat' },
    ],
  },
  {
    id: 'dialogue-cinema-2',
    title: 'Después del Cine',
    category: 'Cine',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Persona 1',
        text: '¿Qué te pareció la película?',
      },
      {
        speaker: 'Persona 2',
        text: 'Me gustó mucho. La historia era interesante y los actores actuaron muy bien.',
      },
      {
        speaker: 'Persona 1',
        text: 'Sí, estoy de acuerdo. El final fue sorprendente.',
      },
      {
        speaker: 'Persona 2',
        text: 'Totalmente. No me lo esperaba. ¿Quieres ir a tomar algo?',
      },
      {
        speaker: 'Persona 1',
        text: 'Sí, buena idea. Hay un café cerca.',
      },
    ],
    vocabulary: [
      { word: 'sorprendente', translation: 'surprising' },
      { word: 'actores', translation: 'actors' },
    ],
  },

  // GYM / GIMNASIO
  {
    id: 'dialogue-gym-1',
    title: 'Inscribiéndose en el Gimnasio',
    category: 'Gimnasio',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Recepcionista',
        text: 'Buenos días, ¿está interesado en nuestra membresía?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, me gustaría información sobre las tarifas.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Tenemos planes mensuales y anuales. El mensual cuesta 45 euros y el anual 450 euros.',
      },
      {
        speaker: 'Cliente',
        text: '¿Qué incluye la membresía?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Incluye acceso a todas las máquinas, clases grupales y el gimnasio está abierto de 6 de la mañana a 11 de la noche.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Puedo hacer una visita de prueba?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Por supuesto. Puede venir mañana y hacer un entrenamiento gratis.',
      },
    ],
    vocabulary: [
      { word: 'membresía', translation: 'membership' },
      { word: 'tarifa', translation: 'fee/rate' },
      { word: 'máquinas', translation: 'machines' },
      { word: 'entrenamiento', translation: 'workout' },
    ],
  },
  {
    id: 'dialogue-gym-2',
    title: 'En el Gimnasio',
    category: 'Gimnasio',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Entrenador',
        text: 'Hola, ¿es tu primera vez aquí?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, es mi primer día. ¿Puede ayudarme con las máquinas?',
      },
      {
        speaker: 'Entrenador',
        text: 'Por supuesto. ¿Qué quieres trabajar hoy?',
      },
      {
        speaker: 'Usuario',
        text: 'Quiero hacer ejercicio de piernas.',
      },
      {
        speaker: 'Entrenador',
        text: 'Perfecto. Te muestro las máquinas adecuadas. Empieza con poco peso.',
      },
      {
        speaker: 'Usuario',
        text: 'Gracias. ¿Cuántas series debo hacer?',
      },
      {
        speaker: 'Entrenador',
        text: 'Entre tres y cuatro series de diez repeticiones cada una.',
      },
    ],
    vocabulary: [
      { word: 'entrenador', translation: 'trainer' },
      { word: 'series', translation: 'sets' },
      { word: 'repeticiones', translation: 'repetitions' },
      { word: 'peso', translation: 'weight' },
    ],
  },

  // DOCTOR (more) / MÉDICO
  {
    id: 'dialogue-doctor-2',
    title: 'Chequeo General',
    category: 'Salud',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Doctor',
        text: 'Buenos días, tome asiento. ¿Qué le trae por aquí?',
      },
      {
        speaker: 'Paciente',
        text: 'Buenos días, doctor. Vengo para un chequeo general. Hace un año que no me reviso.',
      },
      {
        speaker: 'Doctor',
        text: 'Muy bien. ¿Tiene algún problema de salud o solo es preventivo?',
      },
      {
        speaker: 'Paciente',
        text: 'Solo preventivo. Me siento bien, pero quiero asegurarme.',
      },
      {
        speaker: 'Doctor',
        text: 'Perfecto. Voy a tomarle la presión y hacerle algunas preguntas.',
      },
      {
        speaker: 'Paciente',
        text: 'De acuerdo.',
      },
      {
        speaker: 'Doctor',
        text: 'Su presión está bien. ¿Hace ejercicio regularmente?',
      },
      {
        speaker: 'Paciente',
        text: 'Sí, voy al gimnasio tres veces por semana.',
      },
      {
        speaker: 'Doctor',
        text: 'Excelente. Todo parece estar bien. Le recomiendo un análisis de sangre para estar seguros.',
      },
    ],
    vocabulary: [
      { word: 'chequeo', translation: 'check-up' },
      { word: 'preventivo', translation: 'preventive' },
      { word: 'presión', translation: 'blood pressure' },
      { word: 'análisis de sangre', translation: 'blood test' },
    ],
  },

  // RESTAURANT (more)
  {
    id: 'dialogue-restaurant-3',
    title: 'Reclamando un Problema',
    category: 'Restaurante',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Disculpe, camarero. Este plato está frío.',
      },
      {
        speaker: 'Camarero',
        text: 'Lo siento mucho. Se lo cambio inmediatamente.',
      },
      {
        speaker: 'Cliente',
        text: 'Y además pedí el plato sin cebolla, pero tiene cebolla.',
      },
      {
        speaker: 'Camarero',
        text: 'Tiene razón, disculpe. Le traigo otro plato sin cebolla ahora mismo.',
      },
      {
        speaker: 'Cliente',
        text: 'Gracias. No es mi intención quejarme, pero...',
      },
      {
        speaker: 'Camarero',
        text: 'No se preocupe, tiene toda la razón. El restaurante se disculpa. ¿Quiere algo de beber mientras espera?',
      },
      {
        speaker: 'Cliente',
        text: 'No, gracias. Solo el plato nuevo.',
      },
      {
        speaker: 'Camarero',
        text: 'Por supuesto. Enseguida se lo traigo.',
      },
    ],
    vocabulary: [
      { word: 'reclamar', translation: 'to complain' },
      { word: 'quejarse', translation: 'to complain' },
      { word: 'disculpar', translation: 'to apologize' },
    ],
  },

  // SHOPPING (more)
  {
    id: 'dialogue-shopping-3',
    title: 'Buscando un Regalo',
    category: 'Compras',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Dependiente',
        text: 'Buenos días, ¿busca algo en particular?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, busco un regalo para mi madre. Es su cumpleaños.',
      },
      {
        speaker: 'Dependiente',
        text: 'Qué bonito. ¿Qué tipo de regalo busca?',
      },
      {
        speaker: 'Cliente',
        text: 'Algo personal, como joyería o perfume.',
      },
      {
        speaker: 'Dependiente',
        text: 'Tenemos collares muy bonitos aquí. ¿Qué precio busca?',
      },
      {
        speaker: 'Cliente',
        text: 'Entre 30 y 50 euros.',
      },
      {
        speaker: 'Dependiente',
        text: 'Perfecto. Tenemos varios modelos en ese rango de precio.',
      },
      {
        speaker: 'Cliente',
        text: 'Este me gusta mucho. Me lo llevo.',
      },
    ],
    vocabulary: [
      { word: 'regalo', translation: 'gift' },
      { word: 'cumpleaños', translation: 'birthday' },
      { word: 'joyería', translation: 'jewelry' },
      { word: 'collar', translation: 'necklace' },
    ],
  },

  // TRAVEL (more)
  {
    id: 'dialogue-travel-3',
    title: 'Alquilando un Coche',
    category: 'Viajes',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿tiene reserva?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, a nombre de García. Quiero alquilar un coche por tres días.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. ¿Tiene carnet de conducir?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, aquí está.',
      },
      {
        speaker: 'Empleado',
        text: 'Muy bien. ¿Qué tipo de coche prefiere?',
      },
      {
        speaker: 'Cliente',
        text: 'Algo económico, para dos personas.',
      },
      {
        speaker: 'Empleado',
        text: 'Tenemos este modelo pequeño. Incluye seguro completo.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Cuánto cuesta por día?',
      },
      {
        speaker: 'Empleado',
        text: '35 euros por día. El depósito es de 200 euros.',
      },
    ],
    vocabulary: [
      { word: 'alquilar', translation: 'to rent' },
      { word: 'carnet de conducir', translation: 'driver\'s license' },
      { word: 'depósito', translation: 'deposit' },
      { word: 'seguro', translation: 'insurance' },
    ],
  },

  // WORK (more)
  {
    id: 'dialogue-work-3',
    title: 'Llamada de Cliente',
    category: 'Trabajo',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, Empresa XYZ, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, llamo para consultar sobre el estado de mi pedido.',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. ¿Puede darme el número de pedido?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, es el 12345.',
      },
      {
        speaker: 'Empleado',
        text: 'Déjeme verificar... Su pedido está en camino. Debería llegar mañana.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Puedo tener el número de seguimiento?',
      },
      {
        speaker: 'Empleado',
        text: 'Claro, es ABC123XYZ. Puede rastrearlo en nuestra página web.',
      },
      {
        speaker: 'Cliente',
        text: 'Excelente. Muchas gracias.',
      },
    ],
    vocabulary: [
      { word: 'consultat', translation: 'to inquire' },
      { word: 'pedido', translation: 'order' },
      { word: 'seguimiento', translation: 'tracking' },
      { word: 'rastrear', translation: 'to track' },
    ],
  },

  // SCHOOL (more)
  {
    id: 'dialogue-school-2',
    title: 'Preguntando sobre Tarea',
    category: 'Educación',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Estudiante',
        text: 'Profesor, tengo una pregunta sobre la tarea.',
      },
      {
        speaker: 'Profesor',
        text: 'Por supuesto, ¿cuál es tu duda?',
      },
      {
        speaker: 'Estudiante',
        text: 'No entiendo el ejercicio número 3.',
      },
      {
        speaker: 'Profesor',
        text: 'Déjame explicarte. Es sobre el uso del pretérito.',
      },
      {
        speaker: 'Estudiante',
        text: 'Ah, ya veo. ¿Puedo entregarlo mañana?',
      },
      {
        speaker: 'Profesor',
        text: 'Sí, no hay problema. Si tienes más dudas, pregunta.',
      },
      {
        speaker: 'Estudiante',
        text: 'Gracias, profesor.',
      },
    ],
    vocabulary: [
      { word: 'tarea', translation: 'homework' },
      { word: 'duda', translation: 'doubt/question' },
      { word: 'entregar', translation: 'to hand in' },
      { word: 'pretérito', translation: 'preterite tense' },
    ],
  },

  // DAILY LIFE (more)
  {
    id: 'dialogue-daily-3',
    title: 'Pidiendo Información',
    category: 'Vida Diaria',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Persona 1',
        text: 'Disculpe, ¿sabe qué hora es?',
      },
      {
        speaker: 'Persona 2',
        text: 'Son las tres y media.',
      },
      {
        speaker: 'Persona 1',
        text: 'Gracias. ¿Dónde está la estación de metro más cercana?',
      },
      {
        speaker: 'Persona 2',
        text: 'Está a dos cuadras, gire a la derecha.',
      },
      {
        speaker: 'Persona 1',
        text: 'Perfecto, muchas gracias.',
      },
      {
        speaker: 'Persona 2',
        text: 'De nada, que tenga un buen día.',
      },
    ],
    vocabulary: [
      { word: 'cuadra', translation: 'block' },
      { word: 'girar', translation: 'to turn' },
    ],
  },
  {
    id: 'dialogue-daily-4',
    title: 'Conociendo a Alguien',
    category: 'Vida Diaria',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Persona 1',
        text: 'Hola, soy Carlos. Mucho gusto.',
      },
      {
        speaker: 'Persona 2',
        text: 'Hola Carlos, soy Ana. Encantada.',
      },
      {
        speaker: 'Persona 1',
        text: '¿De dónde eres?',
      },
      {
        speaker: 'Persona 2',
        text: 'Soy de Madrid. ¿Y tú?',
      },
      {
        speaker: 'Persona 1',
        text: 'Yo soy de Barcelona. ¿Vives aquí desde hace mucho?',
      },
      {
        speaker: 'Persona 2',
        text: 'Sí, desde hace cinco años. ¿Y tú?',
      },
      {
        speaker: 'Persona 1',
        text: 'Solo llevo un año aquí. Aún estoy conociendo la ciudad.',
      },
      {
        speaker: 'Persona 2',
        text: 'Si necesitas ayuda o recomendaciones, dímelo.',
      },
      {
        speaker: 'Persona 1',
        text: 'Gracias, muy amable.',
      },
    ],
    vocabulary: [
      { word: 'mucho gusto', translation: 'nice to meet you' },
      { word: 'encantada', translation: 'pleased to meet you' },
      { word: 'recomendación', translation: 'recommendation' },
    ],
  },

  // BANK (more)
  {
    id: 'dialogue-bank-3',
    title: 'Consultando el Saldo',
    category: 'Banco',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Hola, quiero consultar el saldo de mi cuenta.',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. ¿Tiene su tarjeta?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, aquí está.',
      },
      {
        speaker: 'Empleado',
        text: 'Su saldo actual es de 1.250 euros.',
      },
      {
        speaker: 'Cliente',
        text: 'Gracias. ¿Puedo tener un extracto?',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. Aquí tiene el extracto de los últimos movimientos.',
      },
    ],
    vocabulary: [
      { word: 'saldo', translation: 'balance' },
      { word: 'extracto', translation: 'statement' },
      { word: 'movimientos', translation: 'transactions' },
    ],
  },

  // CAFE / CAFÉ
  {
    id: 'dialogue-cafe-1',
    title: 'En el Café',
    category: 'Café',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Camarero',
        text: 'Buenos días, ¿qué desea?',
      },
      {
        speaker: 'Cliente',
        text: 'Un café con leche y un croissant, por favor.',
      },
      {
        speaker: 'Camarero',
        text: '¿El café solo o con azúcar?',
      },
      {
        speaker: 'Cliente',
        text: 'Con azúcar, por favor.',
      },
      {
        speaker: 'Camarero',
        text: 'Perfecto. ¿Algo más?',
      },
      {
        speaker: 'Cliente',
        text: 'No, eso es todo. ¿Cuánto es?',
      },
      {
        speaker: 'Camarero',
        text: 'Son 3,50 euros. ¿Para aquí o para llevar?',
      },
      {
        speaker: 'Cliente',
        text: 'Para aquí.',
      },
    ],
    vocabulary: [
      { word: 'croissant', translation: 'croissant' },
      { word: 'para llevar', translation: 'to go' },
    ],
  },
  {
    id: 'dialogue-cafe-2',
    title: 'Trabajando en el Café',
    category: 'Café',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Hola, ¿tiene WiFi gratis?',
      },
      {
        speaker: 'Camarero',
        text: 'Sí, la contraseña está en la mesa.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Puedo trabajar aquí un rato?',
      },
      {
        speaker: 'Camarero',
        text: 'Por supuesto, no hay problema. ¿Quiere algo de beber?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, un café largo y una botella de agua.',
      },
      {
        speaker: 'Camarero',
        text: 'Muy bien. ¿Quiere algo de comer también?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, un sándwich mixto, por favor.',
      },
      {
        speaker: 'Camarero',
        text: 'Perfecto, en un momento se lo traigo.',
      },
    ],
    vocabulary: [
      { word: 'WiFi', translation: 'WiFi' },
      { word: 'contraseña', translation: 'password' },
      { word: 'sándwich mixto', translation: 'ham and cheese sandwich' },
    ],
  },

  // POLICE / POLICÍA
  {
    id: 'dialogue-police-1',
    title: 'Reportando un Robo',
    category: 'Policía',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Policía',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Buenos días, quiero reportar un robo.',
      },
      {
        speaker: 'Policía',
        text: 'Entiendo. ¿Cuándo ocurrió?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Ayer por la tarde, alrededor de las 5.',
      },
      {
        speaker: 'Policía',
        text: '¿Dónde ocurrió exactamente?',
      },
      {
        speaker: 'Ciudadano',
        text: 'En la calle Gran Vía, cerca del metro.',
      },
      {
        speaker: 'Policía',
        text: '¿Qué le robaron?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Mi teléfono móvil y mi cartera.',
      },
      {
        speaker: 'Policía',
        text: 'Comprendo. Vamos a rellenar la denuncia. ¿Tiene identificación?',
      },
    ],
    vocabulary: [
      { word: 'reportar', translation: 'to report' },
      { word: 'robo', translation: 'theft/robbery' },
      { word: 'denuncia', translation: 'report/complaint' },
      { word: 'cartera', translation: 'wallet' },
    ],
  },

  // PET SHOP / TIENDA DE MASCOTAS
  {
    id: 'dialogue-petshop-1',
    title: 'Comprando Comida para Mascotas',
    category: 'Mascotas',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Dependiente',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, busco comida para mi perro.',
      },
      {
        speaker: 'Dependiente',
        text: '¿Qué tamaño tiene su perro?',
      },
      {
        speaker: 'Cliente',
        text: 'Es un perro mediano.',
      },
      {
        speaker: 'Dependiente',
        text: 'Tenemos esta marca, es muy buena. ¿Cuánto pesa su perro?',
      },
      {
        speaker: 'Cliente',
        text: 'Unos 15 kilos.',
      },
      {
        speaker: 'Dependiente',
        text: 'Perfecto. Este saco es ideal para su tamaño. Dura un mes.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. También necesito un juguete.',
      },
      {
        speaker: 'Dependiente',
        text: 'Tenemos muchos. ¿Prefiere pelota o mordedor?',
      },
      {
        speaker: 'Cliente',
        text: 'Un mordedor sería mejor.',
      },
    ],
    vocabulary: [
      { word: 'mascota', translation: 'pet' },
      { word: 'saco', translation: 'bag' },
      { word: 'mordedor', translation: 'chew toy' },
    ],
  },

  // ADVANCED LEVEL DIALOGUES
  {
    id: 'dialogue-work-advanced',
    title: 'Negociación de Contrato',
    category: 'Trabajo',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Empresario',
        text: 'Buenos días. Hemos revisado su propuesta y estamos interesados. Sin embargo, hay algunos puntos que necesitamos discutir.',
      },
      {
        speaker: 'Consultor',
        text: 'Por supuesto, estoy aquí para resolver cualquier duda. ¿Qué aspectos le preocupan?',
      },
      {
        speaker: 'Empresario',
        text: 'Principalmente el plazo de entrega y el presupuesto. El tiempo es más corto de lo que esperábamos.',
      },
      {
        speaker: 'Consultor',
        text: 'Entiendo su preocupación. Podemos ajustar el cronograma, pero requerirá recursos adicionales. ¿Está dispuesto a considerar un incremento del presupuesto?',
      },
      {
        speaker: 'Empresario',
        text: 'Depende del incremento. ¿Podría detallarme qué costes adicionales implica?',
      },
      {
        speaker: 'Consultor',
        text: 'Necesitaríamos contratar personal adicional y trabajar horas extraordinarias. Esto supone aproximadamente un 15% más del presupuesto original.',
      },
      {
        speaker: 'Empresario',
        text: 'Podemos considerar un 12%. ¿Qué opina?',
      },
      {
        speaker: 'Consultor',
        text: 'Me parece razonable. Podemos llegar a un acuerdo en ese punto. ¿Hay otros aspectos que quiera negociar?',
      },
    ],
    vocabulary: [
      { word: 'propuesta', translation: 'proposal' },
      { word: 'plazo de entrega', translation: 'delivery deadline' },
      { word: 'presupuesto', translation: 'budget' },
      { word: 'cronograma', translation: 'schedule' },
      { word: 'horas extraordinarias', translation: 'overtime' },
    ],
  },
  {
    id: 'dialogue-business-1',
    title: 'Presentación de Proyecto',
    category: 'Trabajo',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Presentador',
        text: 'Buenos días a todos. Hoy les presentaré nuestro nuevo proyecto de sostenibilidad.',
      },
      {
        speaker: 'Audiencia',
        text: '¿Cuál es el objetivo principal del proyecto?',
      },
      {
        speaker: 'Presentador',
        text: 'Nuestro objetivo es reducir las emisiones de carbono en un 40% durante los próximos cinco años mediante la implementación de tecnologías renovables.',
      },
      {
        speaker: 'Audiencia',
        text: '¿Qué inversión requiere?',
      },
      {
        speaker: 'Presentador',
        text: 'La inversión inicial es de 2 millones de euros, pero calculamos un ahorro de 500.000 euros anuales en costes energéticos.',
      },
      {
        speaker: 'Audiencia',
        text: '¿Cuál es el plazo de recuperación de la inversión?',
      },
      {
        speaker: 'Presentador',
        text: 'Aproximadamente cuatro años. Después, los ahorros serían netos.',
      },
    ],
    vocabulary: [
      { word: 'sostenibilidad', translation: 'sustainability' },
      { word: 'emisiones de carbono', translation: 'carbon emissions' },
      { word: 'recuperación', translation: 'payback period' },
    ],
  },
  {
    id: 'dialogue-doctor-advanced',
    title: 'Consulta Médica Especializada',
    category: 'Salud',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Doctor',
        text: 'Buenos días. He revisado sus análisis y los resultados muestran algunos valores que requieren atención.',
      },
      {
        speaker: 'Paciente',
        text: 'Entiendo. ¿De qué se trata exactamente?',
      },
      {
        speaker: 'Doctor',
        text: 'Sus niveles de colesterol están ligeramente elevados. No es alarmante, pero debemos controlarlos.',
      },
      {
        speaker: 'Paciente',
        text: '¿Qué implica esto? ¿Necesito medicación?',
      },
      {
        speaker: 'Doctor',
        text: 'Por el momento, no. Recomiendo cambios en la dieta: reducir grasas saturadas y aumentar el ejercicio físico. Si en tres meses no mejoran los valores, consideraremos tratamiento farmacológico.',
      },
      {
        speaker: 'Paciente',
        text: '¿Hay algo específico que deba evitar?',
      },
      {
        speaker: 'Doctor',
        text: 'Principalmente alimentos procesados y fritos. También le sugiero aumentar el consumo de pescado y aceite de oliva. ¿Hace ejercicio regularmente?',
      },
      {
        speaker: 'Paciente',
        text: 'No mucho, la verdad. ¿Cuánto recomienda?',
      },
      {
        speaker: 'Doctor',
        text: 'Al menos 30 minutos de ejercicio moderado, cinco días a la semana. Puede ser caminar a buen ritmo, nadar o ciclismo.',
      },
    ],
    vocabulary: [
      { word: 'colesterol', translation: 'cholesterol' },
      { word: 'grasas saturadas', translation: 'saturated fats' },
      { word: 'tratamiento farmacológico', translation: 'pharmacological treatment' },
      { word: 'moderado', translation: 'moderate' },
    ],
  },
  {
    id: 'dialogue-university-1',
    title: 'Discusión Académica',
    category: 'Educación',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Profesor',
        text: 'Hoy discutiremos las implicaciones sociales de la inteligencia artificial.',
      },
      {
        speaker: 'Estudiante',
        text: 'Profesor, ¿cree que la IA puede reemplazar completamente el trabajo humano?',
      },
      {
        speaker: 'Profesor',
        text: 'Es una pregunta compleja. La IA probablemente automatizará tareas rutinarias, pero también creará nuevas oportunidades laborales que requieren habilidades humanas únicas.',
      },
      {
        speaker: 'Estudiante',
        text: '¿Qué habilidades considera que seguirán siendo relevantes?',
      },
      {
        speaker: 'Profesor',
        text: 'El pensamiento crítico, la creatividad, la empatía y la capacidad de resolver problemas complejos. Estas son difíciles de automatizar.',
      },
      {
        speaker: 'Estudiante',
        text: 'Entonces, ¿la educación debería enfocarse más en estas habilidades?',
      },
      {
        speaker: 'Profesor',
        text: 'Exactamente. El sistema educativo necesita adaptarse para preparar a los estudiantes para un mundo donde la colaboración entre humanos e IA será clave.',
      },
    ],
    vocabulary: [
      { word: 'implicaciones', translation: 'implications' },
      { word: 'automatizar', translation: 'to automate' },
      { word: 'rutinarias', translation: 'routine' },
      { word: 'empatía', translation: 'empathy' },
      { word: 'adaptarse', translation: 'to adapt' },
    ],
  },
  {
    id: 'dialogue-law-1',
    title: 'Consulta Legal',
    category: 'Legal',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Abogado',
        text: 'Buenos días. Me ha comentado que tiene un problema con su contrato de trabajo.',
      },
      {
        speaker: 'Cliente',
        text: 'Sí. Mi empresa quiere modificar mis condiciones laborales sin mi consentimiento.',
      },
      {
        speaker: 'Abogado',
        text: 'Comprendo. ¿Puede explicarme exactamente qué cambios pretenden realizar?',
      },
      {
        speaker: 'Cliente',
        text: 'Quieren reducir mi salario en un 20% y cambiar mi horario. Según mi contrato actual, esto requiere mi acuerdo.',
      },
      {
        speaker: 'Abogado',
        text: 'Tiene razón. Las modificaciones sustanciales del contrato laboral requieren acuerdo mutuo. Sin su consentimiento, la empresa no puede imponer estos cambios.',
      },
      {
        speaker: 'Cliente',
        text: '¿Qué puedo hacer si insisten?',
      },
      {
        speaker: 'Abogado',
        text: 'Tiene varias opciones. Puede rechazar los cambios, lo que podría llevar a un despido. En ese caso, tendría derecho a indemnización. Otra opción es negociar una solución mutuamente aceptable.',
      },
      {
        speaker: 'Cliente',
        text: '¿Recomienda algún curso de acción específico?',
      },
      {
        speaker: 'Abogado',
        text: 'Sugiero primero intentar la negociación. Si no funciona, podemos considerar acciones legales. ¿Tiene copia de su contrato?',
      },
    ],
    vocabulary: [
      { word: 'contrato laboral', translation: 'employment contract' },
      { word: 'consentimiento', translation: 'consent' },
      { word: 'modificaciones sustanciales', translation: 'substantial modifications' },
      { word: 'despido', translation: 'dismissal' },
      { word: 'indemnización', translation: 'compensation' },
    ],
  },
  {
    id: 'dialogue-restaurant-4',
    title: 'Reservando Mesa para Ocasión Especial',
    category: 'Restaurante',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Buenos días, quiero hacer una reserva para una ocasión especial.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Por supuesto. ¿Para cuántas personas y qué fecha?',
      },
      {
        speaker: 'Cliente',
        text: 'Para ocho personas, el próximo sábado a las 9 de la noche.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Déjeme verificar... Sí, tenemos disponibilidad. ¿Tiene alguna preferencia de mesa?',
      },
      {
        speaker: 'Cliente',
        text: 'Preferiría una mesa cerca de la ventana, si es posible.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto. ¿Necesitan algún menú especial o tienen restricciones alimentarias?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, una persona es vegetariana y otra tiene alergia a los mariscos.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Muy bien, lo tenemos en cuenta. ¿Quieren que preparemos algo especial para la ocasión?',
      },
      {
        speaker: 'Cliente',
        text: 'Sería maravilloso. Es un aniversario, así que si pudieran decorar la mesa sería perfecto.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Por supuesto. Nos encargamos de todos los detalles. ¿Su nombre para la reserva?',
      },
    ],
    vocabulary: [
      { word: 'ocasión especial', translation: 'special occasion' },
      { word: 'disponibilidad', translation: 'availability' },
      { word: 'restricciones alimentarias', translation: 'dietary restrictions' },
      { word: 'alergia', translation: 'allergy' },
      { word: 'aniversario', translation: 'anniversary' },
    ],
  },
  {
    id: 'dialogue-shopping-4',
    title: 'Comprando Regalo de Boda',
    category: 'Compras',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Dependiente',
        text: 'Buenos días, ¿busca algo en particular?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, busco un regalo de boda. Algo elegante y útil.',
      },
      {
        speaker: 'Dependiente',
        text: 'Perfecto. ¿Tiene algún presupuesto en mente?',
      },
      {
        speaker: 'Cliente',
        text: 'Entre 50 y 100 euros.',
      },
      {
        speaker: 'Dependiente',
        text: 'Tenemos varios artículos para el hogar que podrían funcionar. ¿Los novios tienen lista de bodas?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, pero quiero algo personal además.',
      },
      {
        speaker: 'Dependiente',
        text: 'Entiendo. ¿Qué le parece este juego de sábanas de alta calidad? O tenemos vajillas muy elegantes.',
      },
      {
        speaker: 'Cliente',
        text: 'El juego de sábanas me parece perfecto. ¿Puede envolverlo como regalo?',
      },
      {
        speaker: 'Dependiente',
        text: 'Por supuesto. ¿Quiere una tarjeta también?',
      },
    ],
    vocabulary: [
      { word: 'regalo de boda', translation: 'wedding gift' },
      { word: 'lista de bodas', translation: 'wedding registry' },
      { word: 'sábanas', translation: 'bed sheets' },
      { word: 'vajilla', translation: 'dinnerware' },
      { word: 'envolver', translation: 'to wrap' },
    ],
  },
  {
    id: 'dialogue-travel-4',
    title: 'Cambiando Vuelo',
    category: 'Viajes',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Pasajero',
        text: 'Necesito cambiar mi vuelo. Tengo una emergencia familiar.',
      },
      {
        speaker: 'Empleado',
        text: 'Lamento escuchar eso. ¿Cuál es su número de reserva?',
      },
      {
        speaker: 'Pasajero',
        text: 'Es ABC123.',
      },
      {
        speaker: 'Empleado',
        text: 'Veo que tiene vuelo para mañana. ¿Para qué fecha quiere cambiarlo?',
      },
      {
        speaker: 'Pasajero',
        text: 'Para la próxima semana, el mismo día si es posible.',
      },
      {
        speaker: 'Empleado',
        text: 'Déjeme verificar disponibilidad... Sí, tenemos plazas. Sin embargo, hay un cargo por cambio de 75 euros.',
      },
      {
        speaker: 'Pasajero',
        text: 'Entiendo. ¿Puedo pagar con la misma tarjeta?',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. ¿Quiere que le envíe el nuevo billete por correo?',
      },
      {
        speaker: 'Pasajero',
        text: 'Sí, por favor. Muchas gracias por su ayuda.',
      },
    ],
    vocabulary: [
      { word: 'emergencia familiar', translation: 'family emergency' },
      { word: 'cargo por cambio', translation: 'change fee' },
      { word: 'plazas', translation: 'seats' },
    ],
  },
  {
    id: 'dialogue-hospital-1',
    title: 'Ingreso al Hospital',
    category: 'Salud',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Recepcionista',
        text: 'Buenos días, ¿tiene cita o es urgencia?',
      },
      {
        speaker: 'Paciente',
        text: 'Tengo cita con el Dr. Martínez para una revisión.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto. ¿Puede darme su nombre y número de seguro médico?',
      },
      {
        speaker: 'Paciente',
        text: 'María López, y aquí tiene mi tarjeta sanitaria.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Muy bien. Tome asiento en la sala de espera. El doctor le llamará en unos minutos.',
      },
      {
        speaker: 'Paciente',
        text: 'Gracias. ¿Hay algún formulario que deba rellenar?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Sí, por favor complete este cuestionario sobre su historial médico.',
      },
    ],
    vocabulary: [
      { word: 'ingreso', translation: 'admission' },
      { word: 'urgencia', translation: 'emergency' },
      { word: 'tarjeta sanitaria', translation: 'health card' },
      { word: 'cuestionario', translation: 'questionnaire' },
      { word: 'historial médico', translation: 'medical history' },
    ],
  },
  {
    id: 'dialogue-gym-3',
    title: 'Clase de Yoga',
    category: 'Gimnasio',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Instructor',
        text: 'Bienvenidos a la clase de yoga. Por favor, coloquen sus esterillas.',
      },
      {
        speaker: 'Participante',
        text: 'Es mi primera clase. ¿Necesito algo especial?',
      },
      {
        speaker: 'Instructor',
        text: 'Solo relajarse y seguir el ritmo. Si una postura es muy difícil, puede modificar.',
      },
      {
        speaker: 'Participante',
        text: 'Perfecto. ¿Qué vamos a hacer hoy?',
      },
      {
        speaker: 'Instructor',
        text: 'Empezaremos con ejercicios de respiración y luego posturas básicas. Recuerden respirar profundamente.',
      },
      {
        speaker: 'Participante',
        text: 'Entendido. Gracias.',
      },
    ],
    vocabulary: [
      { word: 'yoga', translation: 'yoga' },
      { word: 'esterilla', translation: 'mat' },
      { word: 'postura', translation: 'pose' },
      { word: 'respiración', translation: 'breathing' },
    ],
  },
  {
    id: 'dialogue-restaurant-5',
    title: 'Pidiendo Recomendaciones del Chef',
    category: 'Restaurante',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Camarero',
        text: 'Buenas noches. ¿Han decidido qué van a pedir?',
      },
      {
        speaker: 'Cliente',
        text: 'Todavía no. ¿Qué recomienda el chef hoy?',
      },
      {
        speaker: 'Camarero',
        text: 'El especial del día es el salmón a la plancha con verduras de temporada. Es muy popular.',
      },
      {
        speaker: 'Cliente',
        text: 'Suena bien. ¿Y para empezar?',
      },
      {
        speaker: 'Camarero',
        text: 'Recomiendo nuestra ensalada mediterránea o la sopa de verduras. Ambas están excelentes.',
      },
      {
        speaker: 'Cliente',
        text: 'Tomaré la ensalada. ¿Y el postre?',
      },
      {
        speaker: 'Camarero',
        text: 'Nuestro tiramisú casero es delicioso. ¿Les apetece?',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. Y una botella de vino blanco, por favor.',
      },
    ],
    vocabulary: [
      { word: 'chef', translation: 'chef' },
      { word: 'especial del día', translation: 'daily special' },
      { word: 'temporada', translation: 'season' },
      { word: 'tiramisú', translation: 'tiramisu' },
      { word: 'apetecer', translation: 'to feel like/want' },
    ],
  },
  {
    id: 'dialogue-tech-1',
    title: 'Soporte Técnico',
    category: 'Tecnología',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Técnico',
        text: 'Buenos días, servicio técnico. ¿En qué puedo ayudarle?',
      },
      {
        speaker: 'Usuario',
        text: 'Hola, tengo un problema con mi ordenador. No enciende.',
      },
      {
        speaker: 'Técnico',
        text: 'Comprendo. ¿Ha intentado cambiar el cable de alimentación?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, lo he intentado. El problema persiste.',
      },
      {
        speaker: 'Técnico',
        text: '¿Escucha algún sonido o ve alguna luz cuando intenta encenderlo?',
      },
      {
        speaker: 'Usuario',
        text: 'No, no hay ningún sonido ni luz.',
      },
      {
        speaker: 'Técnico',
        text: 'Podría ser un problema de la fuente de alimentación. ¿Cuándo empezó el problema?',
      },
      {
        speaker: 'Usuario',
        text: 'Ayer por la tarde. Funcionaba bien por la mañana.',
      },
      {
        speaker: 'Técnico',
        text: 'Entiendo. Necesitaríamos revisar el equipo. ¿Puede traerlo al servicio técnico?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, ¿cuándo puedo traerlo?',
      },
      {
        speaker: 'Técnico',
        text: 'Mañana por la mañana está bien. Traiga también la factura de compra si la tiene.',
      },
    ],
    vocabulary: [
      { word: 'soporte técnico', translation: 'technical support' },
      { word: 'cable de alimentación', translation: 'power cable' },
      { word: 'fuente de alimentación', translation: 'power supply' },
    ],
  },
  {
    id: 'dialogue-realestate-beginner',
    title: 'Buscando un Piso',
    category: 'Inmobiliaria',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Agente',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, busco un piso para alquilar.',
      },
      {
        speaker: 'Agente',
        text: 'Perfecto. ¿Qué tamaño busca?',
      },
      {
        speaker: 'Cliente',
        text: 'Un piso pequeño, para una persona.',
      },
      {
        speaker: 'Agente',
        text: '¿Cuánto quiere pagar al mes?',
      },
      {
        speaker: 'Cliente',
        text: 'Entre 400 y 500 euros.',
      },
      {
        speaker: 'Agente',
        text: 'Tenemos varios pisos. ¿Quiere verlos?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, por favor.',
      },
    ],
    vocabulary: [
      { word: 'piso', translation: 'apartment' },
      { word: 'alquilar', translation: 'to rent' },
    ],
  },
  {
    id: 'dialogue-realestate-intermediate',
    title: 'Visita de Piso',
    category: 'Inmobiliaria',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Agente',
        text: 'Buenos días. Bienvenido. Este es el apartamento que le comenté.',
      },
      {
        speaker: 'Cliente',
        text: 'Muchas gracias. Es bastante amplio. ¿Cuántos metros tiene?',
      },
      {
        speaker: 'Agente',
        text: 'Tiene 75 metros cuadrados. Dos habitaciones y un salón amplio.',
      },
      {
        speaker: 'Cliente',
        text: '¿Está amueblado?',
      },
      {
        speaker: 'Agente',
        text: 'Parcialmente. Tiene los muebles básicos: cama, mesa, sofá. Pero necesita comprar otros.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Cuánto cuesta el alquiler?',
      },
      {
        speaker: 'Agente',
        text: '700 euros al mes, más los gastos de comunidad que son unos 50 euros.',
      },
      {
        speaker: 'Cliente',
        text: '¿Puedo ver el contrato?',
      },
      {
        speaker: 'Agente',
        text: 'Por supuesto. Le muestro el contrato estándar.',
      },
    ],
    vocabulary: [
      { word: 'metros cuadrados', translation: 'square meters' },
      { word: 'amueblado', translation: 'furnished' },
      { word: 'muebles', translation: 'furniture' },
      { word: 'gastos de comunidad', translation: 'building fees' },
    ],
  },
  {
    id: 'dialogue-realestate-1',
    title: 'Alquilando un Apartamento',
    category: 'Inmobiliaria',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Inmobiliaria',
        text: 'Buenos días. Me llamo Elena. Entiendo que está interesado en el apartamento que vimos.',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, me gustó mucho. ¿Cuáles son las condiciones del alquiler?',
      },
      {
        speaker: 'Inmobiliaria',
        text: 'El alquiler mensual es de 850 euros. Requerimos un mes de fianza y otro mes de depósito. El contrato es por un año, renovable.',
      },
      {
        speaker: 'Cliente',
        text: '¿Están incluidos los gastos?',
      },
      {
        speaker: 'Inmobiliaria',
        text: 'El alquiler incluye el agua y la comunidad. La luz y el gas van por su cuenta.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Cuándo podría mudarme?',
      },
      {
        speaker: 'Inmobiliaria',
        text: 'El apartamento está disponible desde el próximo mes. ¿Puede proporcionarnos referencias y justificante de ingresos?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, por supuesto. ¿Puedo ver el contrato antes de firmar?',
      },
      {
        speaker: 'Inmobiliaria',
        text: 'Por supuesto. Le envío una copia por correo electrónico esta tarde.',
      },
    ],
    vocabulary: [
      { word: 'inmobiliaria', translation: 'real estate agency' },
      { word: 'fianza', translation: 'deposit' },
      { word: 'comunidad', translation: 'building fees' },
      { word: 'justificante de ingresos', translation: 'proof of income' },
      { word: 'mudarse', translation: 'to move' },
    ],
  },
  {
    id: 'dialogue-museum-1',
    title: 'Visitando un Museo',
    category: 'Cultura',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días. ¿Cuántas entradas necesita?',
      },
      {
        speaker: 'Visitante',
        text: 'Dos entradas, por favor. ¿Hay descuento para estudiantes?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, los estudiantes tienen 50% de descuento. ¿Tiene carnet de estudiante?',
      },
      {
        speaker: 'Visitante',
        text: 'Sí, aquí está. ¿Cuánto cuesta?',
      },
      {
        speaker: 'Empleado',
        text: 'Normal son 12 euros, con descuento 6 euros cada una. Total 12 euros.',
      },
      {
        speaker: 'Visitante',
        text: 'Perfecto. ¿Hay audioguía disponible?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, cuesta 3 euros adicionales. Está disponible en varios idiomas.',
      },
      {
        speaker: 'Visitante',
        text: 'Tomaremos dos audioguías en español.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. Las exposiciones temporales están en la segunda planta. Disfruten la visita.',
      },
    ],
    vocabulary: [
      { word: 'entrada', translation: 'ticket' },
      { word: 'carnet de estudiante', translation: 'student ID' },
      { word: 'audioguía', translation: 'audio guide' },
      { word: 'exposición temporal', translation: 'temporary exhibition' },
    ],
  },
  {
    id: 'dialogue-job-interview-2',
    title: 'Entrevista Final',
    category: 'Trabajo',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Entrevistador',
        text: 'Gracias por venir. Hemos revisado su candidatura y estamos muy impresionados.',
      },
      {
        speaker: 'Candidato',
        text: 'Muchas gracias. Estoy muy interesado en esta oportunidad.',
      },
      {
        speaker: 'Entrevistador',
        text: 'Perfecto. Esta es una ronda final. ¿Tiene alguna pregunta sobre el puesto o la empresa?',
      },
      {
        speaker: 'Candidato',
        text: 'Sí, me interesa saber sobre las oportunidades de desarrollo profesional y el equilibrio trabajo-vida.',
      },
      {
        speaker: 'Entrevistador',
        text: 'Excelente pregunta. Ofrecemos programas de formación continua y promoción interna. Además, tenemos políticas flexibles de trabajo remoto.',
      },
      {
        speaker: 'Candidato',
        text: 'Eso suena muy bien. ¿Cuál sería el proceso de incorporación?',
      },
      {
        speaker: 'Entrevistador',
        text: 'Tendría un período de orientación de dos semanas con un mentor. Después, gradualmente asumiría más responsabilidades.',
      },
      {
        speaker: 'Candidato',
        text: 'Perfecto. ¿Cuándo sabría la decisión final?',
      },
      {
        speaker: 'Entrevistador',
        text: 'Esta semana. Le contactaremos por teléfono o correo electrónico. ¿Algo más?',
      },
      {
        speaker: 'Candidato',
        text: 'No, eso es todo. Muchas gracias por su tiempo.',
      },
    ],
    vocabulary: [
      { word: 'candidatura', translation: 'application' },
      { word: 'ronda final', translation: 'final round' },
      { word: 'equilibrio trabajo-vida', translation: 'work-life balance' },
      { word: 'trabajo remoto', translation: 'remote work' },
      { word: 'incorporación', translation: 'onboarding' },
      { word: 'mentor', translation: 'mentor' },
    ],
  },
  {
    id: 'dialogue-insurance-1',
    title: 'Contratando Seguro',
    category: 'Seguros',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Agente',
        text: 'Buenos días. Entiendo que está interesado en un seguro de hogar.',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, quiero proteger mi vivienda. ¿Qué cubre exactamente?',
      },
      {
        speaker: 'Agente',
        text: 'Nuestro seguro cubre daños por incendio, robo, inundación y responsabilidad civil. También incluye asistencia 24 horas.',
      },
      {
        speaker: 'Cliente',
        text: '¿Y el valor de los objetos personales?',
      },
      {
        speaker: 'Agente',
        text: 'Sí, hasta el límite que usted elija. ¿Cuál es el valor aproximado de sus pertenencias?',
      },
      {
        speaker: 'Cliente',
        text: 'Aproximadamente 30.000 euros.',
      },
      {
        speaker: 'Agente',
        text: 'Perfecto. Con esa cobertura, la prima mensual sería de 45 euros.',
      },
      {
        speaker: 'Cliente',
        text: '¿Hay período de carencia?',
      },
      {
        speaker: 'Agente',
        text: 'No, la cobertura es inmediata una vez firmado el contrato. ¿Tiene alguna otra pregunta?',
      },
    ],
    vocabulary: [
      { word: 'seguro de hogar', translation: 'home insurance' },
      { word: 'responsabilidad civil', translation: 'liability' },
      { word: 'pertenencias', translation: 'belongings' },
      { word: 'prima', translation: 'premium' },
      { word: 'período de carencia', translation: 'waiting period' },
    ],
  },
  {
    id: 'dialogue-insurance-2',
    title: 'Consultando sobre Seguro de Coche',
    category: 'Seguros',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Agente',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, quiero información sobre seguros de coche.',
      },
      {
        speaker: 'Agente',
        text: 'Por supuesto. ¿Tiene coche actualmente?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, acabo de comprar uno nuevo.',
      },
      {
        speaker: 'Agente',
        text: 'Perfecto. ¿Qué tipo de seguro busca? ¿A todo riesgo o básico?',
      },
      {
        speaker: 'Cliente',
        text: 'Me interesa el seguro a todo riesgo. ¿Cuánto cuesta aproximadamente?',
      },
      {
        speaker: 'Agente',
        text: 'Depende del modelo y su historial. ¿Qué coche tiene?',
      },
      {
        speaker: 'Cliente',
        text: 'Un sedán del año. ¿Incluye asistencia en carretera?',
      },
      {
        speaker: 'Agente',
        text: 'Sí, todos nuestros seguros incluyen asistencia 24 horas. Puedo darle un presupuesto si quiere.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto, gracias.',
      },
    ],
    vocabulary: [
      { word: 'seguro a todo riesgo', translation: 'comprehensive insurance' },
      { word: 'historial', translation: 'history/record' },
      { word: 'asistencia en carretera', translation: 'roadside assistance' },
      { word: 'presupuesto', translation: 'quote/estimate' },
    ],
  },

  // ADDITIONAL ADVANCED DIALOGUES
  {
    id: 'dialogue-bank-advanced',
    title: 'Solicitud de Préstamo Hipotecario',
    category: 'Banco',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Asesor',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, estoy interesado en solicitar un préstamo hipotecario para adquirir una vivienda.',
      },
      {
        speaker: 'Asesor',
        text: 'Perfecto. Para evaluar su solicitud, necesito conocer su situación financiera. ¿Cuál es su ingreso mensual neto?',
      },
      {
        speaker: 'Cliente',
        text: 'Tengo un ingreso fijo de aproximadamente 3.500 euros mensuales, más ingresos variables de alrededor de 500 euros.',
      },
      {
        speaker: 'Asesor',
        text: 'Muy bien. ¿Tiene otras deudas o compromisos financieros?',
      },
      {
        speaker: 'Cliente',
        text: 'Solo un préstamo de coche que me queda un año, con cuotas de 250 euros mensuales.',
      },
      {
        speaker: 'Asesor',
        text: 'Perfecto. ¿Qué cantidad necesita financiar y cuál es el valor de la vivienda?',
      },
      {
        speaker: 'Cliente',
        text: 'La vivienda cuesta 280.000 euros. Puedo aportar un 20% como entrada, así que necesitaría financiar 224.000 euros.',
      },
      {
        speaker: 'Asesor',
        text: 'Entiendo. Con su perfil, podríamos ofrecerle un préstamo a tipo fijo del 3,5% a 25 años, o variable del 2,8% inicial. ¿Qué prefiere?',
      },
      {
        speaker: 'Cliente',
        text: 'Prefiero el tipo fijo para mayor seguridad. ¿Cuál sería la cuota mensual aproximada?',
      },
      {
        speaker: 'Asesor',
        text: 'Con el tipo fijo al 3,5%, la cuota mensual sería de aproximadamente 1.120 euros. ¿Le parece asumible?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, puedo asumirla. ¿Qué documentación necesito presentar?',
      },
      {
        speaker: 'Asesor',
        text: 'Necesitamos sus últimas tres nóminas, declaración de la renta del año pasado, justificante de ingresos y comprobante de la entrada. Le prepararé un dossier con toda la información.',
      },
    ],
    vocabulary: [
      { word: 'préstamo hipotecario', translation: 'mortgage loan' },
      { word: 'ingreso neto', translation: 'net income' },
      { word: 'tipo fijo', translation: 'fixed rate' },
      { word: 'tipo variable', translation: 'variable rate' },
      { word: 'cuota mensual', translation: 'monthly payment' },
      { word: 'nómina', translation: 'payslip' },
      { word: 'declaración de la renta', translation: 'tax return' },
    ],
  },
  {
    id: 'dialogue-travel-advanced',
    title: 'Planificación de Viaje Internacional',
    category: 'Viajes',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Agente',
        text: 'Buenos días. Le llamo respecto a su consulta sobre el viaje a Japón. He preparado varias opciones según sus preferencias.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto, estoy muy interesado. ¿Qué opciones tiene?',
      },
      {
        speaker: 'Agente',
        text: 'Tengo tres paquetes: uno económico de 10 días por 2.200 euros, otro de lujo de 14 días por 4.500 euros, y uno intermedio de 12 días por 3.200 euros. Todos incluyen vuelos, alojamiento y algunos tours.',
      },
      {
        speaker: 'Cliente',
        text: 'Me interesa el intermedio. ¿Qué ciudades incluye?',
      },
      {
        speaker: 'Agente',
        text: 'El paquete incluye Tokio, Kioto y Osaka, con traslados en tren bala. También incluye visitas guiadas a templos, el Palacio Imperial y el distrito de Gion.',
      },
      {
        speaker: 'Cliente',
        text: 'Excelente. ¿Incluye seguros de viaje y cancelación?',
      },
      {
        speaker: 'Agente',
        text: 'El seguro básico está incluido, pero puede contratar una cobertura adicional por 150 euros que incluye cancelación por cualquier motivo.',
      },
      {
        speaker: 'Cliente',
        text: 'Me parece bien. ¿Cuál es la política de cancelación si no contrato el adicional?',
      },
      {
        speaker: 'Agente',
        text: 'Puede cancelar hasta 30 días antes sin penalización. Entre 30 y 15 días hay un 30% de penalización, y menos de 15 días, el 50%.',
      },
      {
        speaker: 'Cliente',
        text: 'Entendido. ¿Necesito visado?',
      },
      {
        speaker: 'Agente',
        text: 'Si su pasaporte es español, no necesita visado para estancias de hasta 90 días. Solo necesita el pasaporte con validez mínima de 6 meses.',
      },
    ],
    vocabulary: [
      { word: 'paquete turístico', translation: 'travel package' },
      { word: 'tren bala', translation: 'bullet train' },
      { word: 'seguro de viaje', translation: 'travel insurance' },
      { word: 'cobertura', translation: 'coverage' },
      { word: 'política de cancelación', translation: 'cancellation policy' },
      { word: 'penalización', translation: 'penalty' },
      { word: 'visado', translation: 'visa' },
    ],
  },
  {
    id: 'dialogue-transport-advanced',
    title: 'Consultando sobre Transporte Público',
    category: 'Transporte',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Usuario',
        text: 'Hola, necesito información sobre abonos de transporte para estudiantes. ¿Qué opciones tienen?',
      },
      {
        speaker: 'Empleado',
        text: 'Para estudiantes, ofrecemos el abono joven que permite uso ilimitado de metro, autobús y cercanías por 20 euros mensuales.',
      },
      {
        speaker: 'Usuario',
        text: 'Perfecto. ¿Qué documentación necesito para acreditar que soy estudiante?',
      },
      {
        speaker: 'Empleado',
        text: 'Necesita presentar su carnet de estudiante vigente y una fotocopia del DNI. También puede acreditarlo con el certificado de matrícula de la universidad.',
      },
      {
        speaker: 'Usuario',
        text: '¿Este abono tiene alguna restricción horaria?',
      },
      {
        speaker: 'Empleado',
        text: 'No, es válido las 24 horas del día, los siete días de la semana. La única restricción es que debe renovarse mensualmente y no es transferible.',
      },
      {
        speaker: 'Usuario',
        text: 'Entendido. ¿Y si quiero incluir también el servicio de bicicletas públicas?',
      },
      {
        speaker: 'Empleado',
        text: 'Puede contratar el abono combinado por 28 euros mensuales, que incluye el transporte público más 30 minutos diarios de bicicleta.',
      },
      {
        speaker: 'Usuario',
        text: 'Me interesa el combinado. ¿Dónde puedo solicitar el alta?',
      },
      {
        speaker: 'Empleado',
        text: 'Puede hacerlo online en nuestra página web con su certificado digital, o presencialmente en cualquiera de nuestras oficinas. Le llevará unos 10 minutos.',
      },
    ],
    vocabulary: [
      { word: 'abono', translation: 'transport pass' },
      { word: 'cercanías', translation: 'commuter trains' },
      { word: 'carnet de estudiante', translation: 'student ID' },
      { word: 'matrícula', translation: 'enrollment' },
      { word: 'transferible', translation: 'transferable' },
      { word: 'certificado digital', translation: 'digital certificate' },
    ],
  },
  {
    id: 'dialogue-daily-life-advanced',
    title: 'Organizando una Mudanza',
    category: 'Vida Diaria',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Coordinador',
        text: 'Buenos días, llamo de la empresa de mudanzas. Hemos revisado su solicitud y tenemos algunas preguntas.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto, dígame.',
      },
      {
        speaker: 'Coordinador',
        text: 'Necesitamos saber el volumen aproximado de sus pertenencias. ¿Cuántas habitaciones tiene su vivienda actual?',
      },
      {
        speaker: 'Cliente',
        text: 'Tengo un piso de tres habitaciones, más salón, cocina y dos baños. También tengo que mover algunos muebles de exterior del balcón.',
      },
      {
        speaker: 'Coordinador',
        text: 'Entiendo. ¿Hay algún objeto especialmente frágil o de valor que requiera embalaje especial?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, tengo un piano de cola que necesita tratamiento especial, y algunas obras de arte.',
      },
      {
        speaker: 'Coordinador',
        text: 'Perfecto. Para el piano necesitaremos embalaje profesional y un equipo especializado. Esto incrementará el presupuesto en aproximadamente 800 euros.',
      },
      {
        speaker: 'Cliente',
        text: 'De acuerdo. ¿Y cuál es el plazo estimado para la mudanza?',
      },
      {
        speaker: 'Coordinador',
        text: 'Dependiendo de la disponibilidad, podemos programarla en un plazo de 10 a 15 días laborables. ¿Tiene alguna fecha preferida?',
      },
      {
        speaker: 'Cliente',
        text: 'Prefiero que sea a finales de mes, después del día 25. ¿Ofrecen servicio de almacenamiento temporal?',
      },
      {
        speaker: 'Coordinador',
        text: 'Sí, tenemos almacenes climatizados. El costo es de 50 euros mensuales por metro cúbico. ¿Necesita ese servicio?',
      },
      {
        speaker: 'Cliente',
        text: 'Solo si hay algún retraso en la entrega de las llaves de la nueva vivienda. Les confirmaré cuando tenga la fecha exacta.',
      },
    ],
    vocabulary: [
      { word: 'mudanza', translation: 'moving' },
      { word: 'pertenencias', translation: 'belongings' },
      { word: 'piano de cola', translation: 'grand piano' },
      { word: 'embalaje', translation: 'packaging' },
      { word: 'almacenamiento', translation: 'storage' },
      { word: 'climatizado', translation: 'climate-controlled' },
    ],
  },
  {
    id: 'dialogue-shopping-advanced',
    title: 'Comprando un Electrodoméstico',
    category: 'Compras',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Vendedor',
        text: 'Buenos días, ¿busca algo en particular?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, estoy buscando una lavadora-secadora eficiente. Necesito que tenga capacidad para al menos 8 kilos y clasificación energética A+++.',
      },
      {
        speaker: 'Vendedor',
        text: 'Perfecto. Tenemos varios modelos que cumplen esos requisitos. ¿Qué presupuesto maneja?',
      },
      {
        speaker: 'Cliente',
        text: 'Estoy dispuesto a invertir hasta 900 euros si el producto realmente lo merece.',
      },
      {
        speaker: 'Vendedor',
        text: 'Tenemos un modelo alemán que está en oferta. Originalmente costaba 1.050 euros, ahora está a 850. Tiene capacidad de 9 kilos, clasificación A+++, y tecnología de lavado con vapor.',
      },
      {
        speaker: 'Cliente',
        text: 'Suena interesante. ¿Qué garantía incluye?',
      },
      {
        speaker: 'Vendedor',
        text: 'Incluye garantía del fabricante de dos años, y podemos ofrecerle una extensión a cinco años por 120 euros adicionales.',
      },
      {
        speaker: 'Cliente',
        text: '¿Incluyen la instalación y retirada de la antigua?',
      },
      {
        speaker: 'Vendedor',
        text: 'Sí, el servicio de instalación y retirada está incluido sin coste adicional. También incluimos una revisión post-instalación a los 15 días.',
      },
      {
        speaker: 'Cliente',
        text: 'Excelente. ¿Aceptan tarjeta de crédito?',
      },
      {
        speaker: 'Vendedor',
        text: 'Sí, aceptamos todas las tarjetas. También ofrecemos financiación sin intereses a 12 meses si lo prefiere.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto, me quedo con este modelo. ¿Cuándo podrían entregarla?',
      },
      {
        speaker: 'Vendedor',
        text: 'Tenemos stock disponible, así que podemos programar la entrega e instalación para mañana o pasado mañana, según prefiera.',
      },
    ],
    vocabulary: [
      { word: 'lavadora-secadora', translation: 'washer-dryer' },
      { word: 'clasificación energética', translation: 'energy rating' },
      { word: 'tecnología de vapor', translation: 'steam technology' },
      { word: 'garantía', translation: 'warranty' },
      { word: 'financiación', translation: 'financing' },
      { word: 'stock', translation: 'stock/inventory' },
    ],
  },
  {
    id: 'dialogue-cafe-advanced',
    title: 'Reunión de Negocios en un Café',
    category: 'Café',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Empresario',
        text: 'Buenos días. He reservado una mesa para una reunión de trabajo.',
      },
      {
        speaker: 'Camarero',
        text: 'Sí, aquí está su mesa. ¿Quieren algo para tomar mientras esperan?',
      },
      {
        speaker: 'Empresario',
        text: 'Sí, por favor. Dos cafés con leche y una jarra de agua. También necesitamos que la zona esté tranquila para trabajar.',
      },
      {
        speaker: 'Camarero',
        text: 'Por supuesto. Esta zona está reservada para reuniones. ¿Necesitan conexión a internet?',
      },
      {
        speaker: 'Empresario',
        text: 'Sí, sería útil. ¿Cuál es la contraseña del WiFi?',
      },
      {
        speaker: 'Camarero',
        text: 'La contraseña está en la carta. Es "CafeNegocios2024". También tenemos enchufes cerca de cada mesa para cargar dispositivos.',
      },
      {
        speaker: 'Empresario',
        text: 'Perfecto. Cuando llegue mi socio, le traeremos algo más fuerte. ¿Tienen algún menú ejecutivo?',
      },
      {
        speaker: 'Camarero',
        text: 'Sí, ofrecemos un menú del día por 15 euros que incluye primer plato, segundo, postre y bebida. O pueden elegir del menú a la carta.',
      },
      {
        speaker: 'Empresario',
        text: 'El menú del día está bien. ¿Cuánto tiempo podemos estar en la mesa?',
      },
      {
        speaker: 'Camarero',
        text: 'No hay límite de tiempo en esta zona. Pueden quedarse el tiempo que necesiten para su reunión.',
      },
      {
        speaker: 'Empresario',
        text: 'Excelente. Les avisaré cuando queramos pedir.',
      },
    ],
    vocabulary: [
      { word: 'zona reservada', translation: 'reserved area' },
      { word: 'conexión a internet', translation: 'internet connection' },
      { word: 'menú ejecutivo', translation: 'business lunch menu' },
      { word: 'menú a la carta', translation: 'à la carte menu' },
    ],
  },
  {
    id: 'dialogue-cinema-advanced',
    title: 'Discutiendo Cine de Autor',
    category: 'Cine',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Crítico',
        text: '¿Viste la última película de Almodóvar? Me pareció fascinante cómo trata el tema de la identidad.',
      },
      {
        speaker: 'Amigo',
        text: 'Sí, la vi el fin de semana pasado. La fotografía es excepcional, y el guion es muy original. Aunque algunos críticos la encontraron demasiado experimental.',
      },
      {
        speaker: 'Crítico',
        text: 'Es cierto, pero creo que esa experimentación es precisamente lo que la hace relevante. El uso de planos secuencia es magistral.',
      },
      {
        speaker: 'Amigo',
        text: 'Estoy de acuerdo. ¿Has visto otras películas de la misma corriente? Hay un director argentino que está haciendo cosas muy interesantes.',
      },
      {
        speaker: 'Crítico',
        text: '¿Te refieres a Lucrecia Martel? Su estilo es muy diferente, más contemplativo. Prefiere dejar espacios en blanco para que el espectador complete.',
      },
      {
        speaker: 'Amigo',
        text: 'Exactamente. Me gusta cómo ambos directores desafían las convenciones narrativas tradicionales, aunque con enfoques distintos.',
      },
      {
        speaker: 'Crítico',
        text: 'Totalmente. ¿Qué opinas de la distribución actual? Parece que cada vez es más difícil encontrar este tipo de cine en salas comerciales.',
      },
      {
        speaker: 'Amigo',
        text: 'Es un problema real. Por suerte tenemos el festival de cine independiente y algunas salas especializadas que programan este tipo de películas.',
      },
    ],
    vocabulary: [
      { word: 'cine de autor', translation: 'auteur cinema' },
      { word: 'planos secuencia', translation: 'long takes' },
      { word: 'contemplativo', translation: 'contemplative' },
      { word: 'convenciones narrativas', translation: 'narrative conventions' },
      { word: 'distribución', translation: 'distribution' },
      { word: 'salas especializadas', translation: 'specialized theaters' },
    ],
  },
  {
    id: 'dialogue-gym-advanced',
    title: 'Programa de Entrenamiento Personalizado',
    category: 'Gimnasio',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Entrenador',
        text: 'Buenos días. Veo que está interesado en nuestro programa de entrenamiento personalizado. ¿Cuáles son sus objetivos?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero mejorar mi condición física general, y específicamente aumentar mi masa muscular y reducir mi porcentaje de grasa corporal.',
      },
      {
        speaker: 'Entrenador',
        text: 'Perfecto. Para diseñar un programa adecuado, necesito saber su experiencia previa y si tiene alguna lesión o limitación física.',
      },
      {
        speaker: 'Cliente',
        text: 'He entrenado esporádicamente durante unos dos años, pero nunca de forma sistemática. No tengo lesiones, pero tengo problemas en la zona lumbar.',
      },
      {
        speaker: 'Entrenador',
        text: 'Entendido. Adaptaremos los ejercicios para evitar sobrecargar la zona lumbar. ¿Cuántas veces a la semana puede entrenar?',
      },
      {
        speaker: 'Cliente',
        text: 'Puedo comprometerme a cuatro sesiones semanales, de aproximadamente una hora cada una.',
      },
      {
        speaker: 'Entrenador',
        text: 'Excelente. Propongo un programa dividido: dos días de fuerza con pesas, un día de entrenamiento funcional, y un día de cardio moderado. ¿Qué opina?',
      },
      {
        speaker: 'Cliente',
        text: 'Me parece bien. ¿Y la nutrición? ¿Ofrecen asesoramiento dietético?',
      },
      {
        speaker: 'Entrenador',
        text: 'Sí, tenemos un nutricionista que puede diseñarle un plan alimenticio acorde a sus objetivos. El servicio tiene un coste adicional de 80 euros mensuales.',
      },
      {
        speaker: 'Cliente',
        text: 'Vale la pena. ¿Cuándo podemos comenzar?',
      },
      {
        speaker: 'Entrenador',
        text: 'Podemos empezar mañana si quiere. Le haré una evaluación inicial para establecer su línea base y luego diseñaremos el programa específico.',
      },
    ],
    vocabulary: [
      { word: 'entrenamiento personalizado', translation: 'personalized training' },
      { word: 'masa muscular', translation: 'muscle mass' },
      { word: 'porcentaje de grasa corporal', translation: 'body fat percentage' },
      { word: 'entrenamiento funcional', translation: 'functional training' },
      { word: 'asesoramiento dietético', translation: 'dietary advice' },
      { word: 'evaluación inicial', translation: 'initial assessment' },
      { word: 'línea base', translation: 'baseline' },
    ],
  },
  {
    id: 'dialogue-library-advanced',
    title: 'Investigación Académica en la Biblioteca',
    category: 'Biblioteca',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Bibliotecario',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Investigador',
        text: 'Hola, estoy realizando una investigación sobre la literatura del Siglo de Oro español y necesito acceso a fuentes primarias.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Tenemos una colección extensa de esa época. ¿Busca específicamente algún autor o período?',
      },
      {
        speaker: 'Investigador',
        text: 'Me interesa especialmente el teatro barroco, concretamente las obras de Calderón de la Barca y Lope de Vega.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Excelente. Tenemos ediciones críticas de sus obras completas, y también manuscritos facsímiles del siglo XVII. ¿Tiene carnet de investigador?',
      },
      {
        speaker: 'Investigador',
        text: 'Sí, soy profesor universitario. Aquí está mi identificación.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Perfecto. Con ese carnet puede acceder a nuestra sala de investigadores, donde puede consultar los materiales antiguos bajo supervisión. También puede solicitar préstamos interbibliotecarios.',
      },
      {
        speaker: 'Investigador',
        text: 'Eso sería muy útil. ¿Tienen acceso a bases de datos académicas especializadas?',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Sí, tenemos suscripción a varias bases de datos, incluyendo JSTOR, MLA y Dialnet. Puede acceder desde nuestros ordenadores o con su cuenta institucional desde casa.',
      },
      {
        speaker: 'Investigador',
        text: 'Perfecto. ¿Pueden ayudarme a localizar artículos específicos?',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Por supuesto. Nuestro servicio de referencia puede ayudarle a buscar y localizar cualquier material que necesite. ¿Quiere que le reserve una mesa en la sala de investigadores?',
      },
    ],
    vocabulary: [
      { word: 'Siglo de Oro', translation: 'Golden Age' },
      { word: 'fuentes primarias', translation: 'primary sources' },
      { word: 'ediciones críticas', translation: 'critical editions' },
      { word: 'manuscritos facsímiles', translation: 'facsimile manuscripts' },
      { word: 'préstamos interbibliotecarios', translation: 'interlibrary loans' },
      { word: 'bases de datos académicas', translation: 'academic databases' },
      { word: 'servicio de referencia', translation: 'reference service' },
    ],
  },
  {
    id: 'dialogue-library-intermediate',
    title: 'Buscando Libros en la Biblioteca',
    category: 'Biblioteca',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Bibliotecario',
        text: 'Buenos días, ¿necesita ayuda?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, estoy buscando libros sobre historia de España del siglo XX.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Perfecto. Esa sección está en la segunda planta. ¿Busca algún autor específico?',
      },
      {
        speaker: 'Usuario',
        text: 'No, quiero información general sobre el período de la Guerra Civil.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Tenemos varios libros sobre ese tema. Puede buscarlos en el catálogo por ordenador, o puedo acompañarle a la sección.',
      },
      {
        speaker: 'Usuario',
        text: 'Prefiero que me acompañe, por favor.',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Por supuesto. Siga por aquí. Los libros están organizados por temas. ¿Tiene carnet de la biblioteca?',
      },
      {
        speaker: 'Usuario',
        text: 'Sí, aquí está. ¿Puedo llevarme los libros a casa?',
      },
      {
        speaker: 'Bibliotecario',
        text: 'Sí, puede llevarse hasta cinco libros durante tres semanas. Puede renovar el préstamo si lo necesita.',
      },
    ],
    vocabulary: [
      { word: 'sección', translation: 'section' },
      { word: 'catálogo', translation: 'catalog' },
      { word: 'carnet', translation: 'library card' },
      { word: 'renovar', translation: 'to renew' },
      { word: 'préstamo', translation: 'loan' },
    ],
  },
  {
    id: 'dialogue-pets-advanced',
    title: 'Consulta Veterinaria Especializada',
    category: 'Mascotas',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Veterinario',
        text: 'Buenos días. He revisado los análisis de su perro y hay algunos valores que requieren atención.',
      },
      {
        speaker: 'Dueño',
        text: '¿De qué se trata? ¿Es algo grave?',
      },
      {
        speaker: 'Veterinario',
        text: 'No es grave, pero su perro tiene los niveles de creatinina ligeramente elevados, lo que puede indicar problemas renales incipientes.',
      },
      {
        speaker: 'Dueño',
        text: '¿Qué causa esto?',
      },
      {
        speaker: 'Veterinario',
        text: 'Puede deberse a varios factores: edad, dieta, o predisposición genética. Su perro tiene 8 años, así que es normal que algunos valores empiecen a cambiar.',
      },
      {
        speaker: 'Dueño',
        text: '¿Necesita medicación?',
      },
      {
        speaker: 'Veterinario',
        text: 'Por ahora no. Recomiendo cambiar a una dieta específica para riñón, que es baja en proteínas de alta calidad pero fácil de digerir. También es importante aumentar su consumo de agua.',
      },
      {
        speaker: 'Dueño',
        text: '¿Hay algún tipo de comida específica que recomiende?',
      },
      {
        speaker: 'Veterinario',
        text: 'Sí, tenemos piensos especiales renales. Le daré una muestra y puede comprarlo aquí o en cualquier tienda especializada. También deberíamos repetir los análisis en tres meses para monitorizar la evolución.',
      },
      {
        speaker: 'Dueño',
        text: 'Perfecto. ¿Hay algo más que deba saber?',
      },
      {
        speaker: 'Veterinario',
        text: 'Mantenga el ejercicio moderado y asegúrese de que siempre tenga agua fresca disponible. Si nota cambios en su comportamiento o apetito, vuelva a consultarnos.',
      },
    ],
    vocabulary: [
      { word: 'creatinina', translation: 'creatinine' },
      { word: 'problemas renales', translation: 'kidney problems' },
      { word: 'incipientes', translation: 'incipient' },
      { word: 'predisposición genética', translation: 'genetic predisposition' },
      { word: 'pienso', translation: 'pet food' },
      { word: 'monitorizar', translation: 'to monitor' },
    ],
  },
  {
    id: 'dialogue-pets-intermediate',
    title: 'Consulta Rutinaria en el Veterinario',
    category: 'Mascotas',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Veterinario',
        text: 'Buenos días. Trae a su gato para la revisión anual, ¿verdad?',
      },
      {
        speaker: 'Dueño',
        text: 'Sí, exacto. También quería preguntarle sobre las vacunas.',
      },
      {
        speaker: 'Veterinario',
        text: 'Perfecto. Primero vamos a revisar a su gato. ¿Come y bebe con normalidad?',
      },
      {
        speaker: 'Dueño',
        text: 'Sí, todo normal. Es muy activo y juguetón.',
      },
      {
        speaker: 'Veterinario',
        text: 'Muy bien. Voy a revisar sus dientes, oídos y peso. ¿Cuándo fue la última vacunación?',
      },
      {
        speaker: 'Dueño',
        text: 'Hace aproximadamente un año. ¿Necesita alguna vacuna ahora?',
      },
      {
        speaker: 'Veterinario',
        text: 'Sí, necesita la vacuna anual. También le recomiendo la vacuna contra la leucemia felina si no la tiene.',
      },
      {
        speaker: 'Dueño',
        text: 'No la tiene. ¿Es importante?',
      },
      {
        speaker: 'Veterinario',
        text: 'Sí, especialmente si su gato sale al exterior. Es una enfermedad seria y la vacuna es muy eficaz.',
      },
      {
        speaker: 'Dueño',
        text: 'Perfecto, se la ponemos entonces.',
      },
    ],
    vocabulary: [
      { word: 'revisión anual', translation: 'annual checkup' },
      { word: 'vacunas', translation: 'vaccines' },
      { word: 'juguetón', translation: 'playful' },
      { word: 'vacunación', translation: 'vaccination' },
      { word: 'leucemia felina', translation: 'feline leukemia' },
    ],
  },
  {
    id: 'dialogue-hair-salon-advanced',
    title: 'Servicio de Peluquería Premium',
    category: 'Peluquería',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Peluquero',
        text: 'Buenos días. Veo que tiene cita para un servicio completo. ¿Qué estilo busca?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero un cambio de look, algo más moderno pero que siga siendo profesional. También quiero un tratamiento de color.',
      },
      {
        speaker: 'Peluquero',
        text: 'Perfecto. ¿Qué tipo de color tiene en mente? ¿Balayage, mechas, o un color sólido?',
      },
      {
        speaker: 'Cliente',
        text: 'Me interesa el balayage, pero que sea sutil, no muy contrastado. Prefiero tonos cálidos.',
      },
      {
        speaker: 'Peluquero',
        text: 'Excelente elección. El balayage le dará volumen y profundidad. Para el corte, ¿qué opina de un corte en capas que enmarque su rostro?',
      },
      {
        speaker: 'Cliente',
        text: 'Me gusta la idea. ¿Cuánto tiempo durará el proceso completo?',
      },
      {
        speaker: 'Peluquero',
        text: 'El servicio completo, incluyendo corte, color, lavado y peinado, tomará aproximadamente tres horas y media.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Qué productos recomienda para el mantenimiento?',
      },
      {
        speaker: 'Peluquero',
        text: 'Para cabello teñido, recomiendo un champú sin sulfatos y una mascarilla hidratante una vez por semana. Tenemos una línea profesional que podemos recomendarle.',
      },
      {
        speaker: 'Cliente',
        text: '¿Y para mantener el color?',
      },
      {
        speaker: 'Peluquero',
        text: 'Es importante usar productos específicos para cabello teñido y evitar el sol directo. También puede venir para retoques cada 8-10 semanas.',
      },
    ],
    vocabulary: [
      { word: 'cambio de look', translation: 'makeover' },
      { word: 'balayage', translation: 'balayage (hair coloring technique)' },
      { word: 'mechas', translation: 'highlights' },
      { word: 'corte en capas', translation: 'layered cut' },
      { word: 'sulfatos', translation: 'sulfates' },
      { word: 'mascarilla hidratante', translation: 'hydrating mask' },
      { word: 'retoques', translation: 'touch-ups' },
    ],
  },
  {
    id: 'dialogue-hair-salon-intermediate',
    title: 'Cita en la Peluquería',
    category: 'Peluquería',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Peluquero',
        text: 'Buenos días. ¿Tiene cita?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, a las 10:00 a nombre de García.',
      },
      {
        speaker: 'Peluquero',
        text: 'Perfecto. Siéntese por favor. ¿Qué quiere hacerse hoy?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero un corte y también me gustaría teñirme el pelo.',
      },
      {
        speaker: 'Peluquero',
        text: 'Muy bien. ¿Qué color tiene en mente?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero algo más claro, quizás un tono castaño claro.',
      },
      {
        speaker: 'Peluquero',
        text: 'Perfecto. Primero le haré el corte y luego el tinte. ¿Le gusta su longitud actual o quiere acortarlo?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero mantener la longitud, solo arreglar las puntas.',
      },
      {
        speaker: 'Peluquero',
        text: 'Perfecto. Empecemos entonces.',
      },
    ],
    vocabulary: [
      { word: 'cita', translation: 'appointment' },
      { word: 'teñirse', translation: 'to dye one\'s hair' },
      { word: 'castaño claro', translation: 'light brown' },
      { word: 'tinte', translation: 'hair dye' },
      { word: 'arreglar las puntas', translation: 'to trim the ends' },
    ],
  },
  {
    id: 'dialogue-supermarket-advanced',
    title: 'Comprando Productos Especializados',
    category: 'Supermercado',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Disculpe, ¿dónde tienen los productos sin gluten?',
      },
      {
        speaker: 'Empleado',
        text: 'Están en el pasillo 5, en la sección de productos dietéticos. ¿Busca algo específico?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, necesito harina de almendra y también pan sin gluten. Además, busco productos orgánicos.',
      },
      {
        speaker: 'Empleado',
        text: 'Los productos orgánicos tienen su propia sección, en el pasillo 8. La harina de almendra la tenemos en la sección de repostería, también en el pasillo 5.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Tienen opciones veganas de productos lácteos?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, tenemos una amplia selección de leches vegetales, yogures y quesos veganos. Están en la sección refrigerada, al final del pasillo 3.',
      },
      {
        speaker: 'Cliente',
        text: 'Excelente. Una última pregunta: ¿aceptan cupones descuento de aplicaciones móviles?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, aceptamos cupones digitales. Puede mostrarlos en la caja y los aplicamos automáticamente. También tenemos nuestra propia app con ofertas exclusivas.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Dónde está la sección de productos internacionales?',
      },
      {
        speaker: 'Empleado',
        text: 'La tenemos en el pasillo 12, dividida por regiones: asiática, latinoamericana, europea, etc. ¿Busca algo de algún país en particular?',
      },
      {
        speaker: 'Cliente',
        text: 'Productos japoneses, específicamente.',
      },
      {
        speaker: 'Empleado',
        text: 'Esos están en la sección asiática, en el estante central. Si necesita ayuda para encontrar algo específico, avíseme.',
      },
    ],
    vocabulary: [
      { word: 'sin gluten', translation: 'gluten-free' },
      { word: 'productos dietéticos', translation: 'dietary products' },
      { word: 'productos orgánicos', translation: 'organic products' },
      { word: 'vegano', translation: 'vegan' },
      { word: 'cupones descuento', translation: 'discount coupons' },
      { word: 'productos internacionales', translation: 'international products' },
    ],
  },
  {
    id: 'dialogue-supermarket-intermediate',
    title: 'Haciendo la Compra Semanal',
    category: 'Supermercado',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Disculpe, ¿dónde está la sección de frutas y verduras?',
      },
      {
        speaker: 'Empleado',
        text: 'Está al fondo, a la izquierda. Es la primera sección cuando entra.',
      },
      {
        speaker: 'Cliente',
        text: 'Gracias. ¿Tienen fresas hoy?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, están en oferta. Dos cajas por el precio de una.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Dónde están los productos de limpieza?',
      },
      {
        speaker: 'Empleado',
        text: 'En el pasillo 7, a la derecha.',
      },
      {
        speaker: 'Cliente',
        text: 'Y los congelados, ¿dónde?',
      },
      {
        speaker: 'Empleado',
        text: 'Al fondo, en las neveras grandes. ¿Necesita algo más?',
      },
      {
        speaker: 'Cliente',
        text: 'No, eso es todo. Gracias.',
      },
    ],
    vocabulary: [
      { word: 'frutas y verduras', translation: 'fruits and vegetables' },
      { word: 'oferta', translation: 'sale' },
      { word: 'productos de limpieza', translation: 'cleaning products' },
      { word: 'congelados', translation: 'frozen foods' },
    ],
  },
  {
    id: 'dialogue-police-advanced',
    title: 'Denuncia de Robo',
    category: 'Policía',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Policía',
        text: 'Buenos días. ¿En qué puedo ayudarle?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Buenos días. Quiero presentar una denuncia por robo. Me robaron el coche anoche.',
      },
      {
        speaker: 'Policía',
        text: 'Lo siento mucho. Voy a tomar su declaración. ¿Puede darme sus datos personales?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Sí, aquí está mi DNI. Mi nombre es Carlos Martínez.',
      },
      {
        speaker: 'Policía',
        text: 'Gracias. ¿Dónde y a qué hora ocurrió el robo?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Fue en la calle Mayor, número 45, aproximadamente a las 2:30 de la madrugada. Lo dejé aparcado allí cuando volví de una cena.',
      },
      {
        speaker: 'Policía',
        text: '¿Puede describir el vehículo? Marca, modelo, color, matrícula.',
      },
      {
        speaker: 'Ciudadano',
        text: 'Es un Seat León, modelo 2020, color gris metalizado. La matrícula es 1234 ABC.',
      },
      {
        speaker: 'Policía',
        text: 'Perfecto. ¿Tenía objetos de valor dentro?',
      },
      {
        speaker: 'Ciudadano',
        text: 'Sí, tenía una maleta con ropa y un ordenador portátil en el maletero. También tenía la documentación del coche en la guantera.',
      },
      {
        speaker: 'Policía',
        text: 'Entendido. ¿Tiene el número de bastidor? Será útil para la búsqueda.',
      },
      {
        speaker: 'Ciudadano',
        text: 'Sí, lo tengo en casa. Puedo traerlo más tarde. ¿Qué debo hacer ahora?',
      },
      {
        speaker: 'Policía',
        text: 'Le daré un número de expediente. Con él puede contactar con su compañía de seguros. También le recomendamos que cancele las tarjetas de crédito si las tenía en el coche.',
      },
    ],
    vocabulary: [
      { word: 'denuncia', translation: 'police report' },
      { word: 'declaración', translation: 'statement' },
      { word: 'matrícula', translation: 'license plate' },
      { word: 'maletero', translation: 'trunk' },
      { word: 'guantera', translation: 'glove compartment' },
      { word: 'número de bastidor', translation: 'VIN (vehicle identification number)' },
      { word: 'expediente', translation: 'case number' },
    ],
  },
  {
    id: 'dialogue-police-beginner',
    title: 'Pidiendo Direcciones a un Policía',
    category: 'Policía',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Turista',
        text: 'Disculpe, ¿sabe dónde está la estación de tren?',
      },
      {
        speaker: 'Policía',
        text: 'Sí, está a dos calles de aquí. Siga recto y gire a la derecha.',
      },
      {
        speaker: 'Turista',
        text: '¿Está lejos?',
      },
      {
        speaker: 'Policía',
        text: 'No, está a cinco minutos caminando.',
      },
      {
        speaker: 'Turista',
        text: 'Perfecto, gracias.',
      },
    ],
    vocabulary: [
      { word: 'estación de tren', translation: 'train station' },
      { word: 'seguir recto', translation: 'go straight' },
      { word: 'girar', translation: 'to turn' },
    ],
  },
  {
    id: 'dialogue-technology-advanced',
    title: 'Soporte Técnico Especializado',
    category: 'Tecnología',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Técnico',
        text: 'Buenos días, llamo del servicio técnico. Veo que reportó un problema con su servidor. ¿Puede describirme qué está ocurriendo?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, tenemos problemas de latencia intermitente y algunos servicios se están desconectando aleatoriamente.',
      },
      {
        speaker: 'Técnico',
        text: 'Entiendo. ¿Cuándo comenzaron estos problemas?',
      },
      {
        speaker: 'Cliente',
        text: 'Hace aproximadamente tres días, después de una actualización del sistema operativo.',
      },
      {
        speaker: 'Técnico',
        text: 'Eso es importante. ¿Realizó algún backup antes de la actualización?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, tenemos backups diarios automáticos. El problema es que incluso después de restaurar desde el backup, los problemas persisten.',
      },
      {
        speaker: 'Técnico',
        text: 'Interesante. Eso sugiere que podría ser un problema de hardware o de configuración de red. ¿Puede acceder al panel de control y verificar los logs del sistema?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, puedo. Los logs muestran múltiples timeouts y errores de conexión en la interfaz de red.',
      },
      {
        speaker: 'Técnico',
        text: 'Eso confirma mi sospecha. Podría ser un problema con la tarjeta de red o el switch. ¿Tiene hardware de respaldo disponible?',
      },
      {
        speaker: 'Cliente',
        text: 'Tenemos algunos componentes, pero no una tarjeta de red de repuesto. ¿Pueden enviar a un técnico para diagnosticar in situ?',
      },
      {
        speaker: 'Técnico',
        text: 'Por supuesto. Podemos programar una visita técnica para mañana. Mientras tanto, le recomiendo monitorear el ancho de banda y considerar un failover temporal si es crítico.',
      },
    ],
    vocabulary: [
      { word: 'latencia', translation: 'latency' },
      { word: 'intermitente', translation: 'intermittent' },
      { word: 'backup', translation: 'backup' },
      { word: 'logs del sistema', translation: 'system logs' },
      { word: 'timeouts', translation: 'timeouts' },
      { word: 'interfaz de red', translation: 'network interface' },
      { word: 'switch', translation: 'network switch' },
      { word: 'hardware de respaldo', translation: 'backup hardware' },
      { word: 'diagnosticar in situ', translation: 'on-site diagnosis' },
      { word: 'ancho de banda', translation: 'bandwidth' },
      { word: 'failover', translation: 'failover' },
    ],
  },
  {
    id: 'dialogue-technology-beginner',
    title: 'Problema con el Ordenador',
    category: 'Tecnología',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Cliente',
        text: 'Hola, tengo un problema con mi ordenador.',
      },
      {
        speaker: 'Técnico',
        text: '¿Qué le pasa?',
      },
      {
        speaker: 'Cliente',
        text: 'No se enciende. Apreté el botón pero no pasa nada.',
      },
      {
        speaker: 'Técnico',
        text: '¿Está conectado a la corriente?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, el cable está conectado.',
      },
      {
        speaker: 'Técnico',
        text: '¿Puede traerlo para revisarlo?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, ¿cuándo puedo traerlo?',
      },
      {
        speaker: 'Técnico',
        text: 'Puede traerlo mañana por la mañana.',
      },
    ],
    vocabulary: [
      { word: 'ordenador', translation: 'computer' },
      { word: 'encenderse', translation: 'to turn on' },
      { word: 'corriente', translation: 'electricity' },
      { word: 'revisar', translation: 'to check' },
    ],
  },
  {
    id: 'dialogue-hotel-advanced',
    title: 'Reservando Suite Ejecutiva',
    category: 'Hotel',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Recepcionista',
        text: 'Buenos días, Hotel Gran Vista. ¿En qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Buenos días. Quisiera reservar una suite ejecutiva para la próxima semana, del lunes al viernes.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto. Déjeme verificar disponibilidad. Sí, tenemos disponibilidad en esas fechas. ¿Prefiere vista al mar o a la ciudad?',
      },
      {
        speaker: 'Cliente',
        text: 'Prefiero vista al mar, si es posible.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Excelente. Las suites con vista al mar están en las plantas superiores. ¿Necesita algún servicio adicional?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, necesito acceso a la sala de negocios, conexión de internet de alta velocidad, y servicio de habitaciones las 24 horas.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Todos esos servicios están incluidos en la suite ejecutiva. También tiene acceso al spa y al restaurante gourmet. ¿Tiene preferencias dietéticas?',
      },
      {
        speaker: 'Cliente',
        text: 'Soy vegetariano. ¿Pueden preparar opciones vegetarianas?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Por supuesto. Nuestro chef puede preparar menús personalizados. ¿Necesita transporte desde el aeropuerto?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, sería muy útil. Llego el lunes a las 14:30.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto. Organizaremos el servicio de traslado. El check-in es a las 15:00, pero si llega antes podemos guardar su equipaje.',
      },
      {
        speaker: 'Cliente',
        text: 'Excelente. ¿Cuál es la política de cancelación?',
      },
      {
        speaker: 'Recepcionista',
        text: 'Puede cancelar sin penalización hasta 48 horas antes. Le enviaré la confirmación por email con todos los detalles.',
      },
    ],
    vocabulary: [
      { word: 'suite ejecutiva', translation: 'executive suite' },
      { word: 'sala de negocios', translation: 'business center' },
      { word: 'internet de alta velocidad', translation: 'high-speed internet' },
      { word: 'servicio de habitaciones', translation: 'room service' },
      { word: 'preferencias dietéticas', translation: 'dietary preferences' },
      { word: 'servicio de traslado', translation: 'shuttle service' },
      { word: 'check-in', translation: 'check-in' },
      { word: 'política de cancelación', translation: 'cancellation policy' },
    ],
  },
  {
    id: 'dialogue-hotel-beginner',
    title: 'Reservando una Habitación',
    category: 'Hotel',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Recepcionista',
        text: 'Buenos días, ¿tiene reserva?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, a nombre de López.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Perfecto. ¿Cuántas noches?',
      },
      {
        speaker: 'Cliente',
        text: 'Dos noches.',
      },
      {
        speaker: 'Recepcionista',
        text: 'Muy bien. Su habitación es la 205. ¿Necesita algo más?',
      },
      {
        speaker: 'Cliente',
        text: '¿A qué hora es el desayuno?',
      },
      {
        speaker: 'Recepcionista',
        text: 'De 7:00 a 10:00 de la mañana.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto, gracias.',
      },
    ],
    vocabulary: [
      { word: 'reserva', translation: 'reservation' },
      { word: 'noches', translation: 'nights' },
      { word: 'habitación', translation: 'room' },
      { word: 'desayuno', translation: 'breakfast' },
    ],
  },
  {
    id: 'dialogue-culture-advanced',
    title: 'Discusión sobre Arte Contemporáneo',
    category: 'Cultura',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Crítico',
        text: '¿Viste la exposición de arte contemporáneo en el museo? Me pareció fascinante cómo los artistas abordan temas de identidad en la era digital.',
      },
      {
        speaker: 'Amigo',
        text: 'Sí, la vi la semana pasada. Me impresionó especialmente la instalación interactiva que cuestionaba la privacidad en las redes sociales.',
      },
      {
        speaker: 'Crítico',
        text: 'Exacto. Ese artista tiene una visión muy crítica del capitalismo de datos. Su uso del espacio y la tecnología es innovador.',
      },
      {
        speaker: 'Amigo',
        text: 'Estoy de acuerdo. ¿Qué opinas del debate sobre si esto es realmente arte o solo tecnología?',
      },
      {
        speaker: 'Crítico',
        text: 'Esa pregunta es antigua. El arte siempre ha incorporado la tecnología disponible en su época. Lo importante es el mensaje y la capacidad de generar reflexión.',
      },
      {
        speaker: 'Amigo',
        text: 'Tienes razón. Pero algunos puristas argumentan que se pierde la técnica manual tradicional.',
      },
      {
        speaker: 'Crítico',
        text: 'Sí, pero el arte evoluciona. Los impresionistas también fueron criticados en su momento por romper con las convenciones. Ahora los consideramos maestros.',
      },
      {
        speaker: 'Amigo',
        text: 'Tienes toda la razón. El arte debe reflejar su tiempo, y nuestra época está definida por la tecnología.',
      },
    ],
    vocabulary: [
      { word: 'arte contemporáneo', translation: 'contemporary art' },
      { word: 'instalación interactiva', translation: 'interactive installation' },
      { word: 'capitalismo de datos', translation: 'data capitalism' },
      { word: 'puristas', translation: 'purists' },
      { word: 'técnica manual', translation: 'manual technique' },
      { word: 'impresionistas', translation: 'impressionists' },
      { word: 'convenciones', translation: 'conventions' },
    ],
  },
  {
    id: 'dialogue-culture-beginner',
    title: 'Visitando un Museo',
    category: 'Cultura',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días. ¿Cuántas entradas?',
      },
      {
        speaker: 'Visitante',
        text: 'Dos entradas, por favor.',
      },
      {
        speaker: 'Empleado',
        text: 'Son 10 euros cada una. Total 20 euros.',
      },
      {
        speaker: 'Visitante',
        text: '¿Hay guía?',
      },
      {
        speaker: 'Empleado',
        text: 'Sí, hay visitas guiadas a las 11:00 y a las 15:00.',
      },
      {
        speaker: 'Visitante',
        text: 'Perfecto, gracias.',
      },
    ],
    vocabulary: [
      { word: 'entradas', translation: 'tickets' },
      { word: 'guía', translation: 'guide' },
      { word: 'visitas guiadas', translation: 'guided tours' },
    ],
  },
  {
    id: 'dialogue-post-office-advanced',
    title: 'Envío Internacional Express',
    category: 'Correo',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Hola, necesito enviar un paquete importante a Estados Unidos con la máxima urgencia.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. Para envíos urgentes tenemos el servicio Express Internacional. ¿Qué contiene el paquete?',
      },
      {
        speaker: 'Cliente',
        text: 'Son documentos comerciales importantes. Necesito que lleguen antes del viernes.',
      },
      {
        speaker: 'Empleado',
        text: 'Con el servicio Express podemos garantizar la entrega en 24-48 horas laborables. ¿Qué valor declarado tiene el paquete?',
      },
      {
        speaker: 'Cliente',
        text: 'Aproximadamente 5.000 euros. Necesito seguro completo.',
      },
      {
        speaker: 'Empleado',
        text: 'Por supuesto. El seguro está incluido en el servicio Express. ¿Necesita acuse de recibo?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, necesito confirmación de entrega firmada.',
      },
      {
        speaker: 'Empleado',
        text: 'Perfecto. El acuse de recibo tiene un coste adicional de 15 euros. ¿Prefiere que el destinatario pague los aranceles o los incluye en el envío?',
      },
      {
        speaker: 'Cliente',
        text: 'Prefiero pagarlos ahora para evitar retrasos.',
      },
      {
        speaker: 'Empleado',
        text: 'Muy bien. Le preparo el envío. El coste total será de 85 euros, incluyendo seguro y acuse de recibo.',
      },
    ],
    vocabulary: [
      { word: 'servicio Express', translation: 'Express service' },
      { word: 'valor declarado', translation: 'declared value' },
      { word: 'seguro completo', translation: 'full insurance' },
      { word: 'acuse de recibo', translation: 'proof of delivery' },
      { word: 'destinatario', translation: 'recipient' },
      { word: 'aranceles', translation: 'customs duties' },
    ],
  },
  {
    id: 'dialogue-post-office-beginner',
    title: 'Enviando una Carta',
    category: 'Correo',
    level: 'beginner',
    dialogue: [
      {
        speaker: 'Empleado',
        text: 'Buenos días, ¿en qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Quiero enviar una carta a Madrid.',
      },
      {
        speaker: 'Empleado',
        text: '¿Nacional o internacional?',
      },
      {
        speaker: 'Cliente',
        text: 'Nacional, dentro de España.',
      },
      {
        speaker: 'Empleado',
        text: 'Son 0,65 euros. ¿Algo más?',
      },
      {
        speaker: 'Cliente',
        text: 'No, eso es todo. Gracias.',
      },
    ],
    vocabulary: [
      { word: 'carta', translation: 'letter' },
      { word: 'nacional', translation: 'national' },
      { word: 'internacional', translation: 'international' },
    ],
  },
  {
    id: 'dialogue-legal-advanced',
    title: 'Consulta Legal Especializada',
    category: 'Legal',
    level: 'advanced',
    dialogue: [
      {
        speaker: 'Abogado',
        text: 'Buenos días. Tengo entendido que necesita asesoramiento sobre un contrato comercial. ¿Puede explicarme la situación?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, estoy negociando un contrato de distribución exclusiva con una empresa europea, y necesito revisar los términos antes de firmar.',
      },
      {
        speaker: 'Abogado',
        text: 'Perfecto. Los contratos de distribución exclusiva son complejos. ¿Qué aspectos le preocupan específicamente?',
      },
      {
        speaker: 'Cliente',
        text: 'Principalmente las cláusulas de exclusividad territorial, los términos de pago, y las condiciones de terminación del contrato.',
      },
      {
        speaker: 'Abogado',
        text: 'Son puntos críticos. En cuanto a la exclusividad, ¿qué territorio cubre?',
      },
      {
        speaker: 'Cliente',
        text: 'Toda la península ibérica. El problema es que la cláusula parece muy restrictiva y no me permite trabajar con otros distribuidores.',
      },
      {
        speaker: 'Abogado',
        text: 'Eso es importante. Necesitamos negociar una cláusula de rendimiento mínimo para ellos, para que no te bloqueen sin compromiso de su parte.',
      },
      {
        speaker: 'Cliente',
        text: 'Exacto, esa es mi preocupación. ¿Y los términos de pago?',
      },
      {
        speaker: 'Abogado',
        text: 'Debemos incluir cláusulas de pago escalonado y protección contra impago. También necesitamos definir claramente las condiciones de terminación y los períodos de preaviso.',
      },
      {
        speaker: 'Cliente',
        text: 'Perfecto. ¿Cuánto tiempo necesitará para revisar el contrato completo?',
      },
      {
        speaker: 'Abogado',
        text: 'Unos tres días hábiles. Le prepararé un informe con las modificaciones recomendadas y las cláusulas que debemos renegociar.',
      },
    ],
    vocabulary: [
      { word: 'contrato de distribución', translation: 'distribution contract' },
      { word: 'exclusividad territorial', translation: 'territorial exclusivity' },
      { word: 'términos de pago', translation: 'payment terms' },
      { word: 'condiciones de terminación', translation: 'termination conditions' },
      { word: 'cláusula de rendimiento mínimo', translation: 'minimum performance clause' },
      { word: 'pago escalonado', translation: 'installment payment' },
      { word: 'protección contra impago', translation: 'protection against non-payment' },
      { word: 'preaviso', translation: 'notice period' },
    ],
  },
  {
    id: 'dialogue-legal-intermediate',
    title: 'Consulta sobre Contrato de Alquiler',
    category: 'Legal',
    level: 'intermediate',
    dialogue: [
      {
        speaker: 'Abogado',
        text: 'Buenos días. ¿En qué puedo ayudarle?',
      },
      {
        speaker: 'Cliente',
        text: 'Necesito revisar un contrato de alquiler antes de firmarlo.',
      },
      {
        speaker: 'Abogado',
        text: 'Por supuesto. ¿Hay alguna cláusula específica que le preocupe?',
      },
      {
        speaker: 'Cliente',
        text: 'Sí, la cláusula sobre el depósito y las condiciones para recuperarlo.',
      },
      {
        speaker: 'Abogado',
        text: 'Esa es una cláusula importante. ¿Qué dice exactamente?',
      },
      {
        speaker: 'Cliente',
        text: 'Dice que el depósito es de dos meses y que se puede usar para reparaciones, pero no está claro qué reparaciones.',
      },
      {
        speaker: 'Abogado',
        text: 'Eso necesita aclararse. Debe especificar que solo cubre daños causados por el inquilino, no desgaste normal.',
      },
      {
        speaker: 'Cliente',
        text: 'Entiendo. ¿Hay algo más que deba revisar?',
      },
      {
        speaker: 'Abogado',
        text: 'Sí, las condiciones de subarriendo, el plazo de preaviso para finalizar el contrato, y las responsabilidades de mantenimiento.',
      },
    ],
    vocabulary: [
      { word: 'contrato de alquiler', translation: 'rental contract' },
      { word: 'depósito', translation: 'deposit' },
      { word: 'reparaciones', translation: 'repairs' },
      { word: 'desgaste normal', translation: 'normal wear and tear' },
      { word: 'subarriendo', translation: 'subletting' },
      { word: 'mantenimiento', translation: 'maintenance' },
    ],
  },
];

// Get dialogues by category
export function getDialoguesByCategory(category: string): Dialogue[] {
  return dialogues.filter(d => d.category === category);
}

// Get dialogues by level
export function getDialoguesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Dialogue[] {
  return dialogues.filter(d => d.level === level);
}

// Get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(dialogues.map(d => d.category)));
}
