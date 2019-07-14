var console = require("console");
var processor = require("processor");

function process(evt) {
    var addHello = function(evt) {
        evt.Put("hello","hello, world");
    }

    var addGoodbye = function(evt) {
        evt.Put("goodbye","goodbye cruel world");
    }

    var pipeline = new processor.Chain()
        .Add(addHello)
        .Add(addGoodbye)
        .Convert({
            fields: [
                {from: "hello", to: "HELLO"},
                {from: "goodbye", to: "GOODBYE"}
            ],
            mode: "rename",
            ignore_missing: true,
            fail_on_error: false,
        })
        .Build()

    pipeline.Run(evt);
    return;
}

function test() {
    var evt = new Event({
        message: "Windows event log message...",
        winlog : {
            provider_name : "Microsoft-Windows-Sysmon"
        }
    });
    process(evt);
    if (evt.Get("HELLO") !== "hello, world") {
        throw "expected goodbye !== hello, world";
    }
    if (evt.Get("GOODBYE") !== "goodbye cruel world") {
        throw "expected goodbye !== goodbye cruel world";
    }
}
