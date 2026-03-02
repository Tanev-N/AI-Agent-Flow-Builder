export class ProxyLogger {
  private target: Record<string, unknown>;
  private prefix: string;

  constructor(target: Record<string, unknown>, prefix: string = 'State') {
    this.target = target;
    this.prefix = prefix;
  }

  createProxy(): Record<string, unknown> {
    return new Proxy(this.target, {
      get: (target, prop) => {
        console.log(`[${this.prefix}] GET: ${String(prop)}`);
        return target.prop;
      },
      set: (target, prop, value) => {
        console.log(`[${this.prefix}] SET: ${String(prop)} = ${value}`);
        target.prop = value;
        return true;
      },
      deleteProperty: (target, prop) => {
        console.log(`[${this.prefix}] DELETE: ${String(prop)}`);
        delete target.prop;
        return true;
      },
    });
  }
}