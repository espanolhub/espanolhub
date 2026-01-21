'use server';

export type GameEvent = 'start' | 'end' | 'score';

export type GameLifecycleHandler = (payload?: any) => void;

const handlers: Partial<Record<GameEvent, GameLifecycleHandler[]>> = {};

export function onGameEvent(event: GameEvent, fn: GameLifecycleHandler) {
  handlers[event] = handlers[event] || [];
  handlers[event]!.push(fn);
}

export function emitGameEvent(event: GameEvent, payload?: any) {
  const list = handlers[event] || [];
  for (const h of list) {
    try { h(payload); } catch (e) { /* ignore */ }
  }
}

// convenience: register submit-to-leaderboard handler (server side optional)
export function registerSubmitToLeaderboard(fn: (payload:any)=>Promise<void>) {
  onGameEvent('score', (payload) => { try { fn(payload).catch(()=>{}); } catch(e){} });
}

