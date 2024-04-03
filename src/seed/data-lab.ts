interface LabRegisterInterface {
  type: string;
  scope: string;
  order: number;
  totalHours: number;
  unitValue: number;
}

export const dataSeedLab: LabRegisterInterface[] = [
  {
    type: 'presion',
    scope: `CAL-LAB-P01 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Transmisores de Presión con Indicación Digital, Manómetros Digitales, Módulos y Transductores de Presión.
    Intervalo de Medición: desde 0 inH2O hasta 400 inH2O / 0 psi hasta 15 psi.`,
    order: 1,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P02 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Transmisores de Presión con Indicación Digital, Manómetros Digitales, Módulos y Transductores de Presión.
    Intervalo de Medición: >15 psi  //  0 psi hasta 300 psi.`,
    order: 2,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P03 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Transmisores de Presión con Indicación Digital, Manómetros Digitales, Módulos y Transductores de Presión.
    Intervalo de Medición: >300 psi  //  0 psi hasta 1.000 psi.`,
    order: 3,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P04 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Transmisores de Presión con Indicación Digital, Manómetros Digitales, Módulos y Transductores de Presión.
    Intervalo de Medición: >1.000 psi  //  0 psi hasta 5.000 psi.`,
    order: 4,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P05 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Manómetros Analógicos.
    Intervalo de Medición: desde 0 inH2O hasta 400 inH2O / 0 psi hasta 15 psi.`,
    order: 5,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P06 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Manómetros Analógicos.
    Intervalo de Medición: >15 psi  //  0 psi hasta 300 psi.`,
    order: 6,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P07 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Manómetros Analógicos.
    Intervalo de Medición: >300 psi  //  0 psi hasta 1.000 psi.`,
    order: 7,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P08 - Calibración en Laboratorio, Magnitud Presión, para equipos:
    Manómetros Analógicos..
    Intervalo de Medición: >1.000 psi  //  0 psi hasta 5.000 psi.`,
    order: 8,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LAB-P09 - Calibración en Laboratorio, Magnitud Presión/Temperatura, para equipos:
    Transmisores de Presión Multivariable con Sensores RTD o Termopar.
    Intervalo de Medición: > 0 psi hasta 1.000 psi  / > 50 °C hasta 660 °C + Pto. Ref. en 0 °C`,
    order: 9,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `VER-LAB-P00 - Verificación en Laboratorio - Magnitud Presión, Revisión General y Verificación en Máximo Tres (3) Puntos de Calibración contra Datos del Certificado.
    Aplica a Equipos: Manómetros Analógicos y Digitales, Registradores - Dataloggers, Switches Transmisores de Presión con Indicación Digital, Módulos y Transductores de Presión.
    Intervalo de Medición: -12 psi hasta 10.000 psi`,
    order: 10,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `VER-LAB-P01 - Verificación en Laboratorio, Unidad Móvil, Taller o en Sitio - Magnitud Presión, Revisión General, Registro en el Rango de Operación del Equipo para Reporte de la Prueba.
    Aplica a Equipos: Registradores Analógicos y Digitales, Dataloggers, Switches, Transmisores o Transductores de Presión con Indicación Digital y Función de Registro.
    Intervalo de Medición: -12 psi hasta 10.000 psi`,
    order: 11,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LABX-P01 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Presión, para equipos:
    Manovacuómetros Digitales, Transmisores de Presión-Vacío con Indicación Digital, Módulos y Transductores de Presión-Vacío.
    Intervalo de Medición: desde -12,5 psi hasta 00 psi. (presion-vacio no cubierto por alcance ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 12,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LABX-P02 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Presión, para equipos:
    Manómetros Digitales, Transmisores de Presión con Indicación Digital, Módulos y Transductores de Presión (Equipos de Alta Presión).
    Intervalo de Medición: >5.000 psi  //  0 psi hasta 10.000 psi. (alcance no cubierto por ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 13,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LABX-P03 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Presión, para equipos:
    Vacuómetros y Manovacuómetros Analógicos.
    Intervalo de Medición: desde -12,5 psi hasta 0 psi. (presion-vacio no cubierto por alcance ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 14,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LABX-P04 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Presión, para equipos:
    Manómetros Analógicos..
    Intervalo de Medición: >5.000 psi  //  0 psi hasta 10.000 psi. (alcance no cubierto por ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 15,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `CAL-LABX-P05 - Calibración en Unidad Móvil o En Sitio - Magnitud Presión, para equipos:
    Manómetros Digitales, Transmisores de Presión con Indicación Digital, Equipos Medidores de Presión con Indicador (Controladores o Registradores), Módulos y/o Transductores de Presión.
    Intervalo de Medición: 0 psi hasta 5.000 psi. (alcance en sitio o unidad móvil no cubierto por ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 16,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `VER-LAB-P02 - Verificación en Laboratorio y/o Talleres - Magnitud Presión, para equipos:
    Interruptores de Presión tipo: Electromecánico, Electrónico Óptico, Optoacoplado, Galvánico o Similar.
    Dispositivos de Relevo de Presión tipo: Válvulas PSV/PRV, Válvulas PV, Válvulas de Alivio o similares.
    Intervalo de Medición: desde -12,5 psi hasta 100 psi.  (no cubierto por alcance ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 17,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `VER-LAB-P03 - Verificación en Laboratorio y/o Talleres - Magnitud Presión, para equipos:
    Interruptores de Presión tipo: Electromecánico, Electrónico Óptico, Optoacoplado, Galvánico o Similar.
    Dispositivos de Relevo de Presión tipo: Válvulas PSV/PRV, Válvulas PV, Válvulas de Alivio o similares.
    Intervalo de Medición: desde >100 psi hasta 1.000 psi.  (no cubierto por alcance ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 18,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `VER-LAB-P04 - Verificación en Laboratorio y/o Talleres - Magnitud Presión, para equipos:
    Interruptores de Presión tipo: Electromecánico, Electrónico Óptico, Optoacoplado, Galvánico o Similar.
    Dispositivos de Relevo de Presión tipo: Válvulas PSV/PRV, Válvulas PV, Válvulas de Alivio o similares.
    Intervalo de Medición: desde >1.000 psi hasta 10.000 psi.  (no cubierto por alcance ONAC).
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 19,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `SERV-LABX-P00 - Servicio Especializado en Sitio, Magnitud Presión, para equipos:
    Transmisores, Transductores, Interruptores, Medidores/Registradores/Controladores.
    Intervalos de Medición: -12 psi hasta 10.000 psi / 4-20 mA / 0-5 Vdc - 0-10 Vdc.
    Protocolos de Comunicación: HART / Foundation Fieldbus
    Incluye: Pruebas de Lazos de Control (con variable generada o simulada), Parametrización/Configuración, Pruebas Funcionales, Escalizacion y Ajuste de Lazos, Precomisionado y/o Comisión de Equipos, Apoyo para Estabilización de Plantas, Suministro de Personal para Actividades de Mantenimiento.
    *Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 20,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `SERV-LABX-P01 - Servicio Especializado En Sitio - Magnitud Presión, para:
    Manómetros Analógicos o Digitales; Equipos Transmisores, Módulos y Transductores, Interruptores, Medidores/Registradores/Controladores con Indicación
    Intervalos de Medición: -12 psi hasta 10.000 psi (presión) // 4-20 mA / 0-5 Vdc - 0-48 Vdc (m. eléctrica).
    Incluye: Ajuste General de Equipos, Parametrización/Configuración, Pruebas Funcionales, Escalizacion.
    *Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 21,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'presion',
    scope: `SERV-LABX-P02 - Servicio Especializado En Sitio - Magnitud Presión, para:
    Registro de Datos con Equipos Calibrados tipo: Transductor, Modulo de Presión o Manómetro Digital - Equipos con Función de Datalogger (Registrador).
    Servicio para Pruebas Intervalos de Medición: 0 psi hasta 10.000 psi.
    Incluye: Servicio con Personal Tecnico y Equipos de Prueba Calibrados, Registro de Datos, Entrega de Reporte de Resultados por Software.
    *Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones a Petición.`,
    order: 22,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T01 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Conjunto de Transmisores con Sensores tipo Termopar o RTD, Sensores tipo Termopar o RTD, Termómetros con Indicador Digital. (Hasta 3 Puntos de Calibración)
    Intervalo de Medición: desde 0 °C hasta 100 °C con Calibración de Referencia en 0 °C.`,
    order: 1,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T02 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Conjunto de Transmisores con Sensores tipo Termopar o RTD, Sensores tipo Termopar o RTD, termómetros con Indicador Digital. (Hasta 3 Puntos de Calibración)
    Intervalo de Medición: >100 °C  //  0 °C hasta 450 °C con Calibración de Referencia en 0 °C.`,
    order: 2,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T03 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Conjunto de Transmisores con Sensores tipo Termopar o RTD, Sensores tipo Termopar o RTD, Termómetros con Indicador Digital. (Hasta 3 Puntos de Calibración)
    Intervalo de Medición: >450 °C  //  0 °C hasta 660 °C con Calibración de Referencia en 0 °C.`,
    order: 3,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T04 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Termómetros Analógicos (Bimetálicos o Similares), Termómetros de Contacto con Lectura Directa. (Hasta 3 Puntos  de Calibración)
    Intervalo de Medición: desde 0 °C hasta 100 °C con Calibración de Referencia en 0 °C.`,
    order: 4,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T05 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Termómetros Analógicos (Bimetálicos o Similares), Termómetros de Contacto con Lectura Directa. (Hasta 3 Puntos  de Calibración)
    Intervalo de Medición: >100 °C  //  0 °C hasta 450 °C con Calibración de Referencia en 0 °C.`,
    order: 5,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T06 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Termómetros Analógicos (Bimetálicos o Similares), Termómetros de Contacto con Lectura Directa. (Hasta 3 Puntos  de Calibración)
    Intervalo de Medición: >450 °C  //  0 °C hasta 660 °C con Calibración de Referencia en 0 °C.`,
    order: 6,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LAB-T07 - Calibración en Laboratorio, Magnitud Temperatura, Punto Adicional de Calibración para equipos: Conjunto de Transmisores con Sensores tipo Termopar o RTD, Sensores tipo Termopar o RTD, Termómetros con Indicador Digital, Termómetros Analógicos, Termómetros de Contacto con Lectura Directa.
    Intervalo de Medición: 0 °C hasta 660 °C.`,
    order: 7,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `VER-LAB-T00 - Verificación en Laboratorio - Magnitud Temperatura, Revisión General y Verificación en Máximo Tres (3) Puntos de Calibración contra Datos del Certificado.
    Aplica a Equipos: Termómetros Analógicos, Termómetros de Contacto con Lectura Directa, Registradores - Dataloggers, Switches, Conjunto de Transmisores con Sensores tipo Termopar o RTD, Sensores tipo Termopar o RTD, termómetros con Indicador Digital.
    Intervalo de Medición: ->50 °C hasta 660 °C + Pto. Ref. en 0 °C.`,
    order: 8,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `VER-LAB-T01 - Verificación en Laboratorio, Unidad Móvil, Taller o en Sitio - Magnitud Temperatura, Revisión General, Registro en el Rango de Operación del Equipo para Reporte de la Prueba.
    Aplica a Equipos: Registradores Analógicos y Digitales, Dataloggers, Switches, Transmisores o Transductores de Temperatura con Indicación Digital y Función de Registro.
    Intervalo de Medición: 0 °C hasta 660 °C`,
    order: 9,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LABX-T01 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Temperatura, para equipos:
    Hornos, Cámaras Climáticas, Muflas y Equipos tipo Bloque Seco con Lectura Directa.
    Intervalo de Medición: desde -25 °C hasta 150 °C.
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 10,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LABX-T02 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Temperatura, para equipos:
    Hornos, Cámaras Climáticas, Muflas y Equipos tipo Bloque Seco con Lectura Directa.
    Intervalo de Medición: desde >150 °C  //  -25°C hasta 300 °C.
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 11,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LABX-T03 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Temperatura, para equipos:
    Hornos, Cámaras Climáticas, Muflas y Equipos tipo Bloque Seco con Lectura Directa.
    Intervalo de Medición: desde >300 °C  //  -25°C hasta 650 °C.
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 12,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LABX-T04 - Calibración en Laboratorio, Unidad Móvil o En Sitio - Magnitud Temperatura, Punto Adicional de Calibración para equipos:
    Hornos, Cámaras Climáticas, Muflas y Equipos tipo Bloque Seco con Lectura Directa.
    Intervalo de Medición: desde -25 °C hasta 650 °C.
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 13,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LABX-T05 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Sensores tipo RTD o Termopares con Indicador Digital o Termómetros con Lectura Directa (Calibración con Medios de Generación Externa).
    Intervalo de Medición: desde 0 °C hasta 250 °C.
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 14,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `CAL-LABX-T06 - Calibración en Laboratorio, Magnitud Temperatura, para equipos:
    Sensores tipo RTD o Termopares con Indicador Digital o Termómetros con Lectura Directa (Calibración con Medios de Generación Externa).
    Intervalo de Medición: >250 °C  //  desde 0 °C hasta 660 °C.
    Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega con Certificado de Patrones`,
    order: 15,
    totalHours: 15,
    unitValue: 15000,
  },
  {
    type: 'temperatura',
    scope: `SERV-LABX-T00 - Servicio Especializado en Laboratorio o Sitio, Magnitud Temperatura, para equipos:
    Transmisores, Transductores, Interruptores, Medidores/Registradores/Controladores.
    Intervalos de Medición: 0 °C hasta 660 °C / 4-20 mA / 0-5 Vdc - 0-10 Vdc.
    Protocolos de Comunicación: HART / Foundation Fieldbus
    Incluye: Pruebas de Lazos de Control (con variable generada o simulada), Parametrización/Configuración, Pruebas Funcionales, Escalizacion y Ajuste de Lazos, Precomisionado y/o Comisión de Equipos, Apoyo para Estabilización de Plantas, Suministro de Personal para Actividades de Mantenimiento.
    *Servicio NO Acreditado con Trazabilidad Metrológica - Se entrega Certificado de Equipos Patrones`,
    order: 16,
    totalHours: 15,
    unitValue: 15000,
  },
];
