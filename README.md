# Typed EventDispatcher

Just a simple strictly typed event dispatcher

## Installation

```bash
npm install @keupoz/typed-event-dispatcher
```

## Usage

```typescript
import { EventDispatcher } from "@keupoz/typed-event-dispatcher";

// EventDispatcher accepts any type
// but it should be a record of data types associated with event names
export interface IFooEvents {
  init: null;
  bar: {
    type: string;
    data: any;
  };
}

export class Foo extends EventDispatcher<IFooEvents> {
  constructor() {
    super();

    this.dispatch("init", null);
  }

  public bar(data: any): void {
    this.dispatch("bar", {
      type: "test data",
      data: data,
    });
  }
}

const foo = new Foo();

// data is null
foo.on("init", () => {
  console.log("Foo is initialized");
});

// data is { type: string; data: any; }
foo.on("bar", (data) => {
  console.log(`Got data of type '${data.type}'`, data.data);
});

foo.bar(["some", "random", "data"]);

// Remove all listeners
foo.dispose();
```
