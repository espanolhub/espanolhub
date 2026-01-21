import { TenseType } from './grammar';
import { VerbConjugationData } from './verb-conjugator';

// بيانات الأفعال الشاذة الكاملة
export interface IrregularVerbData {
  infinitive: string;
  conjugations: Record<TenseType, VerbConjugationData>;
}

export const irregularVerbsData: IrregularVerbData[] = [
  {
    infinitive: 'ser',
    conjugations: {
      presente: { yo: 'soy', tú: 'eres', él: 'es', nosotros: 'somos', vosotros: 'sois', ellos: 'son' },
      preterito: { yo: 'fui', tú: 'fuiste', él: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
      futuro: { yo: 'seré', tú: 'serás', él: 'será', nosotros: 'seremos', vosotros: 'seréis', ellos: 'serán' },
      imperfecto: { yo: 'era', tú: 'eras', él: 'era', nosotros: 'éramos', vosotros: 'erais', ellos: 'eran' },
      condicional: { yo: 'sería', tú: 'serías', él: 'sería', nosotros: 'seríamos', vosotros: 'seríais', ellos: 'serían' },
    },
  },
  {
    infinitive: 'estar',
    conjugations: {
      presente: { yo: 'estoy', tú: 'estás', él: 'está', nosotros: 'estamos', vosotros: 'estáis', ellos: 'están' },
      preterito: { yo: 'estuve', tú: 'estuviste', él: 'estuvo', nosotros: 'estuvimos', vosotros: 'estuvisteis', ellos: 'estuvieron' },
      futuro: { yo: 'estaré', tú: 'estarás', él: 'estará', nosotros: 'estaremos', vosotros: 'estaréis', ellos: 'estarán' },
      imperfecto: { yo: 'estaba', tú: 'estabas', él: 'estaba', nosotros: 'estábamos', vosotros: 'estabais', ellos: 'estaban' },
      condicional: { yo: 'estaría', tú: 'estarías', él: 'estaría', nosotros: 'estaríamos', vosotros: 'estaríais', ellos: 'estarían' },
    },
  },
  {
    infinitive: 'tener',
    conjugations: {
      presente: { yo: 'tengo', tú: 'tienes', él: 'tiene', nosotros: 'tenemos', vosotros: 'tenéis', ellos: 'tienen' },
      preterito: { yo: 'tuve', tú: 'tuviste', él: 'tuvo', nosotros: 'tuvimos', vosotros: 'tuvisteis', ellos: 'tuvieron' },
      futuro: { yo: 'tendré', tú: 'tendrás', él: 'tendrá', nosotros: 'tendremos', vosotros: 'tendréis', ellos: 'tendrán' },
      imperfecto: { yo: 'tenía', tú: 'tenías', él: 'tenía', nosotros: 'teníamos', vosotros: 'teníais', ellos: 'tenían' },
      condicional: { yo: 'tendría', tú: 'tendrías', él: 'tendría', nosotros: 'tendríamos', vosotros: 'tendríais', ellos: 'tendrían' },
    },
  },
  {
    infinitive: 'ir',
    conjugations: {
      presente: { yo: 'voy', tú: 'vas', él: 'va', nosotros: 'vamos', vosotros: 'vais', ellos: 'van' },
      preterito: { yo: 'fui', tú: 'fuiste', él: 'fue', nosotros: 'fuimos', vosotros: 'fuisteis', ellos: 'fueron' },
      futuro: { yo: 'iré', tú: 'irás', él: 'irá', nosotros: 'iremos', vosotros: 'iréis', ellos: 'irán' },
      imperfecto: { yo: 'iba', tú: 'ibas', él: 'iba', nosotros: 'íbamos', vosotros: 'ibais', ellos: 'iban' },
      condicional: { yo: 'iría', tú: 'irías', él: 'iría', nosotros: 'iríamos', vosotros: 'iríais', ellos: 'irían' },
    },
  },
  {
    infinitive: 'decir',
    conjugations: {
      presente: { yo: 'digo', tú: 'dices', él: 'dice', nosotros: 'decimos', vosotros: 'decís', ellos: 'dicen' },
      preterito: { yo: 'dije', tú: 'dijiste', él: 'dijo', nosotros: 'dijimos', vosotros: 'dijisteis', ellos: 'dijeron' },
      futuro: { yo: 'diré', tú: 'dirás', él: 'dirá', nosotros: 'diremos', vosotros: 'diréis', ellos: 'dirán' },
      imperfecto: { yo: 'decía', tú: 'decías', él: 'decía', nosotros: 'decíamos', vosotros: 'decíais', ellos: 'decían' },
      condicional: { yo: 'diría', tú: 'dirías', él: 'diría', nosotros: 'diríamos', vosotros: 'diríais', ellos: 'dirían' },
    },
  },
  {
    infinitive: 'hacer',
    conjugations: {
      presente: { yo: 'hago', tú: 'haces', él: 'hace', nosotros: 'hacemos', vosotros: 'hacéis', ellos: 'hacen' },
      preterito: { yo: 'hice', tú: 'hiciste', él: 'hizo', nosotros: 'hicimos', vosotros: 'hicisteis', ellos: 'hicieron' },
      futuro: { yo: 'haré', tú: 'harás', él: 'hará', nosotros: 'haremos', vosotros: 'haréis', ellos: 'harán' },
      imperfecto: { yo: 'hacía', tú: 'hacías', él: 'hacía', nosotros: 'hacíamos', vosotros: 'hacíais', ellos: 'hacían' },
      condicional: { yo: 'haría', tú: 'harías', él: 'haría', nosotros: 'haríamos', vosotros: 'haríais', ellos: 'harían' },
    },
  },
  {
    infinitive: 'poder',
    conjugations: {
      presente: { yo: 'puedo', tú: 'puedes', él: 'puede', nosotros: 'podemos', vosotros: 'podéis', ellos: 'pueden' },
      preterito: { yo: 'pude', tú: 'pudiste', él: 'pudo', nosotros: 'pudimos', vosotros: 'pudisteis', ellos: 'pudieron' },
      futuro: { yo: 'podré', tú: 'podrás', él: 'podrá', nosotros: 'podremos', vosotros: 'podréis', ellos: 'podrán' },
      imperfecto: { yo: 'podía', tú: 'podías', él: 'podía', nosotros: 'podíamos', vosotros: 'podíais', ellos: 'podían' },
      condicional: { yo: 'podría', tú: 'podrías', él: 'podría', nosotros: 'podríamos', vosotros: 'podríais', ellos: 'podrían' },
    },
  },
  {
    infinitive: 'querer',
    conjugations: {
      presente: { yo: 'quiero', tú: 'quieres', él: 'quiere', nosotros: 'queremos', vosotros: 'queréis', ellos: 'quieren' },
      preterito: { yo: 'quise', tú: 'quisiste', él: 'quiso', nosotros: 'quisimos', vosotros: 'quisisteis', ellos: 'quisieron' },
      futuro: { yo: 'querré', tú: 'querrás', él: 'querrá', nosotros: 'querremos', vosotros: 'querréis', ellos: 'querrán' },
      imperfecto: { yo: 'quería', tú: 'querías', él: 'quería', nosotros: 'queríamos', vosotros: 'queríais', ellos: 'querían' },
      condicional: { yo: 'querría', tú: 'querrías', él: 'querría', nosotros: 'querríamos', vosotros: 'querríais', ellos: 'querrían' },
    },
  },
  {
    infinitive: 'venir',
    conjugations: {
      presente: { yo: 'vengo', tú: 'vienes', él: 'viene', nosotros: 'venimos', vosotros: 'venís', ellos: 'vienen' },
      preterito: { yo: 'vine', tú: 'viniste', él: 'vino', nosotros: 'vinimos', vosotros: 'vinisteis', ellos: 'vinieron' },
      futuro: { yo: 'vendré', tú: 'vendrás', él: 'vendrá', nosotros: 'vendremos', vosotros: 'vendréis', ellos: 'vendrán' },
      imperfecto: { yo: 'venía', tú: 'venías', él: 'venía', nosotros: 'veníamos', vosotros: 'veníais', ellos: 'venían' },
      condicional: { yo: 'vendría', tú: 'vendrías', él: 'vendría', nosotros: 'vendríamos', vosotros: 'vendríais', ellos: 'vendrían' },
    },
  },
  {
    infinitive: 'dar',
    conjugations: {
      presente: { yo: 'doy', tú: 'das', él: 'da', nosotros: 'damos', vosotros: 'dais', ellos: 'dan' },
      preterito: { yo: 'di', tú: 'diste', él: 'dio', nosotros: 'dimos', vosotros: 'disteis', ellos: 'dieron' },
      futuro: { yo: 'daré', tú: 'darás', él: 'dará', nosotros: 'daremos', vosotros: 'daréis', ellos: 'darán' },
      imperfecto: { yo: 'daba', tú: 'dabas', él: 'daba', nosotros: 'dábamos', vosotros: 'dabais', ellos: 'daban' },
      condicional: { yo: 'daría', tú: 'darías', él: 'daría', nosotros: 'daríamos', vosotros: 'daríais', ellos: 'darían' },
    },
  },
  {
    infinitive: 'ver',
    conjugations: {
      presente: { yo: 'veo', tú: 'ves', él: 've', nosotros: 'vemos', vosotros: 'veis', ellos: 'ven' },
      preterito: { yo: 'vi', tú: 'viste', él: 'vio', nosotros: 'vimos', vosotros: 'visteis', ellos: 'vieron' },
      futuro: { yo: 'veré', tú: 'verás', él: 'verá', nosotros: 'veremos', vosotros: 'veréis', ellos: 'verán' },
      imperfecto: { yo: 'veía', tú: 'veías', él: 'veía', nosotros: 'veíamos', vosotros: 'veíais', ellos: 'veían' },
      condicional: { yo: 'vería', tú: 'verías', él: 'vería', nosotros: 'veríamos', vosotros: 'veríais', ellos: 'verían' },
    },
  },
  {
    infinitive: 'saber',
    conjugations: {
      presente: { yo: 'sé', tú: 'sabes', él: 'sabe', nosotros: 'sabemos', vosotros: 'sabéis', ellos: 'saben' },
      preterito: { yo: 'supe', tú: 'supiste', él: 'supo', nosotros: 'supimos', vosotros: 'supisteis', ellos: 'supieron' },
      futuro: { yo: 'sabré', tú: 'sabrás', él: 'sabrá', nosotros: 'sabremos', vosotros: 'sabréis', ellos: 'sabrán' },
      imperfecto: { yo: 'sabía', tú: 'sabías', él: 'sabía', nosotros: 'sabíamos', vosotros: 'sabíais', ellos: 'sabían' },
      condicional: { yo: 'sabría', tú: 'sabrías', él: 'sabría', nosotros: 'sabríamos', vosotros: 'sabríais', ellos: 'sabrían' },
    },
  },
  {
    infinitive: 'poner',
    conjugations: {
      presente: { yo: 'pongo', tú: 'pones', él: 'pone', nosotros: 'ponemos', vosotros: 'ponéis', ellos: 'ponen' },
      preterito: { yo: 'puse', tú: 'pusiste', él: 'puso', nosotros: 'pusimos', vosotros: 'pusisteis', ellos: 'pusieron' },
      futuro: { yo: 'pondré', tú: 'pondrás', él: 'pondrá', nosotros: 'pondremos', vosotros: 'pondréis', ellos: 'pondrán' },
      imperfecto: { yo: 'ponía', tú: 'ponías', él: 'ponía', nosotros: 'poníamos', vosotros: 'poníais', ellos: 'ponían' },
      condicional: { yo: 'pondría', tú: 'pondrías', él: 'pondría', nosotros: 'pondríamos', vosotros: 'pondríais', ellos: 'pondrían' },
    },
  },
  {
    infinitive: 'salir',
    conjugations: {
      presente: { yo: 'salgo', tú: 'sales', él: 'sale', nosotros: 'salimos', vosotros: 'salís', ellos: 'salen' },
      preterito: { yo: 'salí', tú: 'saliste', él: 'salió', nosotros: 'salimos', vosotros: 'salisteis', ellos: 'salieron' },
      futuro: { yo: 'saldré', tú: 'saldrás', él: 'saldrá', nosotros: 'saldremos', vosotros: 'saldréis', ellos: 'saldrán' },
      imperfecto: { yo: 'salía', tú: 'salías', él: 'salía', nosotros: 'salíamos', vosotros: 'salíais', ellos: 'salían' },
      condicional: { yo: 'saldría', tú: 'saldrías', él: 'saldría', nosotros: 'saldríamos', vosotros: 'saldríais', ellos: 'saldrían' },
    },
  },
  {
    infinitive: 'traer',
    conjugations: {
      presente: { yo: 'traigo', tú: 'traes', él: 'trae', nosotros: 'traemos', vosotros: 'traéis', ellos: 'traen' },
      preterito: { yo: 'traje', tú: 'trajiste', él: 'trajo', nosotros: 'trajimos', vosotros: 'trajisteis', ellos: 'trajeron' },
      futuro: { yo: 'traeré', tú: 'traerás', él: 'traerá', nosotros: 'traeremos', vosotros: 'traeréis', ellos: 'traerán' },
      imperfecto: { yo: 'traía', tú: 'traías', él: 'traía', nosotros: 'traíamos', vosotros: 'traíais', ellos: 'traían' },
      condicional: { yo: 'traería', tú: 'traerías', él: 'traería', nosotros: 'traeríamos', vosotros: 'traeríais', ellos: 'traerían' },
    },
  },
  {
    infinitive: 'conocer',
    conjugations: {
      presente: { yo: 'conozco', tú: 'conoces', él: 'conoce', nosotros: 'conocemos', vosotros: 'conocéis', ellos: 'conocen' },
      preterito: { yo: 'conocí', tú: 'conociste', él: 'conoció', nosotros: 'conocimos', vosotros: 'conocisteis', ellos: 'conocieron' },
      futuro: { yo: 'conoceré', tú: 'conocerás', él: 'conocerá', nosotros: 'conoceremos', vosotros: 'conoceréis', ellos: 'conocerán' },
      imperfecto: { yo: 'conocía', tú: 'conocías', él: 'conocía', nosotros: 'conocíamos', vosotros: 'conocíais', ellos: 'conocían' },
      condicional: { yo: 'conocería', tú: 'conocerías', él: 'conocería', nosotros: 'conoceríamos', vosotros: 'conoceríais', ellos: 'conocerían' },
    },
  },
  {
    infinitive: 'conducir',
    conjugations: {
      presente: { yo: 'conduzco', tú: 'conduces', él: 'conduce', nosotros: 'conducimos', vosotros: 'conducís', ellos: 'conducen' },
      preterito: { yo: 'conduje', tú: 'condujiste', él: 'condujo', nosotros: 'condujimos', vosotros: 'condujisteis', ellos: 'condujeron' },
      futuro: { yo: 'conduciré', tú: 'conducirás', él: 'conducirá', nosotros: 'conduciremos', vosotros: 'conduciréis', ellos: 'conducirán' },
      imperfecto: { yo: 'conducía', tú: 'conducías', él: 'conducía', nosotros: 'conducíamos', vosotros: 'conducíais', ellos: 'conducían' },
      condicional: { yo: 'conduciría', tú: 'conducirías', él: 'conduciría', nosotros: 'conduciríamos', vosotros: 'conduciríais', ellos: 'conducirían' },
    },
  },
];
