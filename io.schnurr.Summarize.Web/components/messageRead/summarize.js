'use strict';

(function () {
    Office.initialize = function () {
        $(document).ready(function () {
            $("#doWork").click(function () {
                test();
            });
        });
    };

    function test() {
        Office.context.mailbox.item.body.getAsync(
            Office.CoercionType.Text,
            { asyncContext: "This is passed to the callback" },
            function callback(result) {
                summarizeTest(result)
            });
    }

    function summarizeTest(text) {
        var requestUrl = 'http://localhost:7071/api/SummarizeFunction';

        $.ajax({
            url: requestUrl,
            dataType: 'text',
            data: "{ 'text': '"+text.value +"'}",
            contentType: 'application/json',
            type: 'POST',
            error: function (xhr, status, error) {
                console.log("SummarizeTest again", error);
            }
        }).done(function (res) {
            console.log("SummarizeTest", res);
            $("#selectedText").text(res);
        });
    }
})();