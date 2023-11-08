interface Command {
  execute(): void;
}
class Engine {
  public start() {
    console.log("Engine has been started");
  }

  public stop() {
    console.log("Engine has been turned off");
  }
}

class EngineStartCommand implements Command {
  constructor(private engine: Engine) {
    this.engine = engine;
  }

  public execute() {
    this.engine.start();
  }
}

class EngineStopCommand implements Command {
  constructor(private engine: Engine) {
    this.engine = engine;
  }

  public execute() {
    this.engine.stop();
  }
}

class Switch {
  constructor(private command: Command) {
    this.command = command;
  }

  public press() {
    this.command.execute();
  }
}

const engine = new Engine()
const startEngineAction = new EngineStartCommand(engine)
const stopEngineAction = new EngineStopCommand(engine)

const startEngine = new Switch(startEngineAction)
const stopEngine = new Switch(stopEngineAction)

startEngine.press()
stopEngine.press()
