 'use strict';

// Categorized verbs for Gramática
export const grammarVerbs = {
  dailyLife: [
    'girar',
    'cruzar',
    'avanzar',
    'estacionar',
    'discutir',
    'aclarar',
    'sugerir',
    'preparar',
    'comprar',
    'vender',
    'cocinar',
    'limpiar',
    'organizar',
    'visitar',
    'invitar',
    'celebrar',
    'saludar',
    'despedirse',
    'preguntar',
    'responder',
  ],
  driving: [
    'estacionar',
    'frenar',
    'adelantar',
    'girar',
    'acelerar',
    'conducir',
    'detenerse',
    'parar',
    'revisar',
    'reparar',
    'cambiar',
    'señalizar',
    'circular',
    'aparcar',
    'despistar',
    'chocar',
    'rebasar',
    'cruzar',
  ],
  adminLegal: [
    'solicitar',
    'renovar',
    'tramitar',
    'inscribir',
    'presentar',
    'firmar',
    'registrar',
    'certificar',
    'notificar',
    'justificar',
    'reclamar',
    'denunciar',
    'apelar',
    'resolver',
    'aprovechar',
    'rechazar',
    'aprobar',
    'cancelar',
  ],
};

// Backwards-compatible single array (merged, deduped)
export const dailyVerbs = Array.from(new Set([
  ...grammarVerbs.dailyLife,
  ...grammarVerbs.driving,
  ...grammarVerbs.adminLegal,
]));

export default grammarVerbs;

