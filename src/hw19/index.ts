abstract class VehicleFactory {
 abstract createCar(): Car;
 abstract createBike(): Bike;
}

interface Bike {
  move(): void;
  performtricks(): void
}

interface Car {
  move(): void;
}

class BMWFactory extends VehicleFactory {
  public createCar(): Car {
    return new BMWCar();
  }

  public createBike(): Bike {
    return new BMWBike();
  }
}

class HondaFactory extends VehicleFactory {
  public createCar(): Car {
    return new HondaCar();
  }

  public createBike(): Bike {
    return new HondaBike();
  }
}

class BMWCar implements Car {
  public move(): void {
    console.log("I'm moving");
  }
}

class HondaCar implements Car {
  public move(): void {
    console.log("I'm moving");
  }
}

class BMWBike implements Bike {
  public move() {
    console.log("I'm moving");
  }
  public performtricks() {
    console.log('Moving on one wheel')
  }
}

class HondaBike implements Bike {
  public move() {
    console.log("I'm moving");
  }
  public performtricks() {
    console.log('Moving on one wheel')
  }
}

function client(factory: VehicleFactory) {
  const bike = factory.createBike();
  bike.move();

  const car = factory.createCar();

  car.move();
}

client(new HondaFactory());
client(new BMWFactory());
