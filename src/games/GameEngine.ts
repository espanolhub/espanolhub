type TickCallback = (remainingMs: number) => void;
type EndCallback = (result: { score: number; correct: number; total: number }) => void;

export default class GameEngine {
  private durationMs: number;
  private remainingMs: number;
  private timerId: number | null = null;
  private onTick?: TickCallback;
  private onEnd?: EndCallback;
  private score = 0;
  private correct = 0;
  private total = 0;

  constructor(durationSeconds = 60) {
    this.durationMs = durationSeconds * 1000;
    this.remainingMs = this.durationMs;
  }

  start() {
    this.stop();
    const start = Date.now();
    this.timerId = setInterval(() => {
      const passed = Date.now() - start;
      this.remainingMs = Math.max(0, this.durationMs - passed);
      if (this.onTick) this.onTick(this.remainingMs);
      if (this.remainingMs <= 0) {
        this.finish();
      }
    }, 250) as unknown as number;
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  onTickCallback(cb: TickCallback) {
    this.onTick = cb;
  }

  onEndCallback(cb: EndCallback) {
    this.onEnd = cb;
  }

  addScore(points: number, correct = false) {
    this.score += points;
    if (correct) this.correct += 1;
    this.total += 1;
  }

  finish() {
    this.stop();
    if (this.onEnd) {
      this.onEnd({ score: this.score, correct: this.correct, total: this.total });
    }
  }

  getState() {
    return {
      remainingMs: this.remainingMs,
      score: this.score,
      correct: this.correct,
      total: this.total,
    };
  }
}

