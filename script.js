function convert() {
        const file = document.getElementById("csv-file").files[0];
        if (file && file.type === "text/csv") {
          const reader = new FileReader();
          reader.onload = function (e) {
            let csv = e.target.result;
            let json = csvToJson(csv);
            document.getElementById("json").value = json;
            document.getElementById("result").style.display = "flex";
          };
          reader.readAsText(file);
        } else {
          alert("Please upload a valid CSV file!");
        }
      }
      function csvToJson(csv) {
        let lines = csv.split("\n");
        let result = [];
        let headers = lines[0].split(",");
        for (let i = 1; i < lines.length; i++) {
          let obj = {};
          let currentline = lines[i].split(",");
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
        }
        return JSON.stringify(result);
      }
      function download() {
        let data = document.getElementById("json").value;
        let a = document.createElement("a");
        let file = new Blob([data], { type: "text/json" });
        a.href = URL.createObjectURL(file);
        a.download = "converted-json.json";
        a.click();
      }