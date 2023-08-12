
function calculateBroilerFeed() {
    var qty = document.getElementById("number-of-birds").value;
    var wk = document.getElementById("age-of-birds").value;
    var textOutput;

    var dailySelected = document.getElementById("daily-duration").checked;
    var weeklySelected = document.getElementById("weekly-duration").checked;
    var rangeSelected = document.getElementById("range-duration").checked;
    var startWeek = document.getElementById("start-week").value;
    var endWeek = document.getElementById("end-week").value;

    let weekQuantity = [1, 24, 54, 93, 135, 174, 205, 228, 242, 245];
    // let weekQuantity = [1, 167, 375, 650, 945, 1215, 1434, 1593, 1691, 1715];

    if (wk > 9) {
        wk = 9;
    }

    if (qty == null || qty.trim().length == 0 || wk == null || wk.length == 0) {
        document.getElementById("result").style.color = "red";
        document.getElementById("result").style.fontSize = "1.3rem";
        document.getElementById("number-of-birds").style.borderColor = "red";
        document.getElementById("age-of-birds").style.borderColor = "red";

        textOutput = "Please fill all necessary fields<br>" + "You'll have to fill the range fields if you want to check for a time range";

        document.getElementById("result").innerHTML = textOutput;
        return;
    }

    if (dailySelected) {
        var dailyIntake = weekQuantity[wk];
        var calc = dailyIntake * qty;
        var inBags = (calc / 25000).toFixed(2);

        textOutput = "Your " + qty + " broiler birds will consume " + inBags + " (25kg) bags daily";

        document.getElementById("result").style.color = "green";
        document.getElementById("result").style.fontSize = "1.3rem";
        document.getElementById("result").innerHTML = textOutput;
    }

    if (rangeSelected) {
        if (startWeek.trim().length == 0 || endWeek.trim().length == 0) {
            document.getElementById("result").style.color = "red";
            document.getElementById("result").style.fontSize = "1.3rem";
            document.getElementById("end-week").style.borderColor = "red";

            textOutput = "Please enter range: Enter range limit to continue";

            document.getElementById("result").innerHTML = textOutput;
            return;
        } else {
            if (endWeek > 9) {
                alert("Range exceeded: maximum of 9 weeks");
                return;
            }
            textOutput = "<button type='submit' onclick='saveToFile()' id='save' class='button save'>PDF Download</button><br>";
            textOutput += "Your " + qty + " birds' estimated consumption for " + endWeek + " weeks is:<br><br>";
            textOutput += "<table><tr><th>Weeks</th><th>Birds Quantity</th><th>Daily Estimate</th><th>Weekly Estimate</th></tr>";
            var total = 0;
            var count = 1;
            while (count <= endWeek) {
                var dailyIntake = weekQuantity[startWeek];
                var calc = dailyIntake * qty;
                var inBags = (calc / 25000).toFixed(2);
                var perWeek = (inBags * 7).toFixed(2);

                textOutput += "<tr><td>Week " + count + "</td><td>" + qty + "</td><td>" + inBags + " bags</td><td>" + perWeek + " bags</td></tr>";
                total += Number(perWeek);
                startWeek++;
                count++;
                if (startWeek > 9)
                    startWeek = 9;
            }
            textOutput += "<tr><td colspan='3'>Total Number of bags</td><td>" + (total).toFixed(2) + " bags</td></tr></table>";
            textOutput += "<br><br><button type='submit' onclick='saveToFile()' id='save' class='button save'>Download as PDF File</button>"
            document.getElementById("result").style.color = "green";
            document.getElementById("result").style.fontSize = "1.3rem";
            document.getElementById("result").innerHTML = textOutput;
            // console.log(textOutput);
            return;
        }
    }

    if (weeklySelected) {
        var dailyIntake = weekQuantity[wk];
        var calc = dailyIntake * qty;
        var inBags = (calc / 25000).toFixed(2);

        textOutput = "Your " + qty + " broiler birds will consume " + inBags + " (25kg) bags daily.<br>" +
            "They will consume a cumulative of " + (inBags * 7).toFixed(2) + " (25kg) bags per week";

        document.getElementById("result").style.color = "green";
        document.getElementById("result").style.fontSize = "1.3rem";
        document.getElementById("result").innerHTML = textOutput;
        return;
    }


}

function saveToFile() {
    console.log(document.getElementById("result").innerHTML);
    document.getElementById("save").style.visibility = "hidden";
    // document.getElementById("save").style.visibility = "hidden";
    textOutput = "<h2 class='print'>Poultry Birds Ration Calculator (Broilers)</h2><p>Thanks for using our service. You can reach out anytime and we'll be here to serve you.</p><br><br>";
    textOutput += "<br><p>For your app development, you can call us on: 07063562900 or 08022647624.</p><br><i>Thank you!</i><br><br>"
    textOutput += document.getElementById("result").innerHTML.substring(0, document.getElementById("result").innerHTML.lastIndexOf("table") + 3);
    saveWebpageToPDF(textOutput);
}


function saveWebpageToPDF(contentToSave) {
    const element = contentToSave;
    // document.getElementById('contentToSave');

    // Options for pdf creation (optional)
    const options = {
        margin: 10,
        filename: `Broiler_feed.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf()
        .from(element)
        .set(options)
        .save();
}
