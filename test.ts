enum MyEvent {
    Start = 'start',
    Stop = 'stop',
}

interface MyEventOptions {
    [MyEvent.Start]: { startTime: number },
    [MyEvent.Stop]: { endTime: number },
}

class EventService {
    private eventCounts: { [key in MyEvent]?: number };

    constructor() {
        // I don't want to have to list every possible enum member here
        this.eventCounts = {};
    }

    private startEvent() {
        this.report(MyEvent.Start, { startTime: 0 });

        // This should be invalid:
        // 
        // this.report(MyEvent.Start, { endTime: 0 });
    }

    private report<T extends keyof MyEventOptions>(event: T, options: MyEventOptions[T]) {
        // errors with `Type 'undefined' is not assignable to type 'number'.`
        const count: number = this.eventCounts[event] || 0;

        // This would do, for example:
        //
        // request(mixpanelUrl, { name: event, options });
    }
}
