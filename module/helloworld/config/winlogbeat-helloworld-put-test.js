var console = require("console");
var processor = require("processor");

function process(evt) {

    var putValueByMethod = function(evt) {

        var numberValue = 1;
        evt.Put("numberValue",numberValue);

        var stringValue = "hello, world";
        evt.Put("stringValue",stringValue);

        var boolValue = false
        evt.Put("boolValue",boolValue);

        var nullValue = null
        evt.Put("nullValue",nullValue);

        var undefinedValue = undefined
        evt.Put("undefinedValue",undefinedValue);

        var arrayValue = ["element1","element2","element3"];
        evt.Put("arrayValue",arrayValue);

        var objectValue = {key1: "value1", key21: "value2"};
        evt.Put("objectValue",objectValue);
        
        var objectArrayValue = [{KEY1: "VALUE1", KEY2: "VALUE2"},{KEY3: "VALUE3", KEY4: "VALUE4"}]
        evt.Put("objectArrayValue",objectArrayValue);

        var objectObjectValue = {Key1: {Key2:"Value2", Key3:1, Key4: true, Key5:[1,2,3,4]}}
        evt.Put("objectObjectValue",objectObjectValue);
    }

    var putValueToFields = function(evt) {
        var objectObjectValueToFields = {Key1: {Key2:"ばりゅー１", Key3:1, Key4: true, Key5:[1,2,3,4]}}
        evt.fields.objectObjectValueToFields = objectObjectValueToFields;
    }

    var pipeline = new processor.Chain()
        .Add(putValueByMethod)
        .Add(putValueToFields)
        .Build()

    pipeline.Run(evt);
    return;
}

function test() {
    var evt = new Event({});
    process(evt);
    console.log("evt.fields: %j", evt.fields);
}
