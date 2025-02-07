document.addEventListener("DOMContentLoaded", function () {
    function enforceSingleSelection(name) {
        document.querySelectorAll(`input[name='${name}']`).forEach(input => {
            input.addEventListener("change", function () {
                document.querySelectorAll(`input[name='${name}']`).forEach(other => {
                    if (other !== this) {
                        other.checked = false;
                    }
                });
            });
        });
    }
    
    enforceSingleSelection("transport");
    enforceSingleSelection("schedule");
    enforceSingleSelection("accommodation");
    
    const transportPrices = {
        "台北": { adult: 4000, elder: 2000, child: 2000 },
        "台中": { adult: 3500, elder: 1500, child: 1500 },
        "高雄": { adult: 3500, elder: 1500, child: 1500 },
        "布袋": { adult: 3500, elder: 1500, child: 1500 }
    };
    
    const accommodationPrices = {
        "喜來登": { two: 4000, three: 2000, four: 1000 },
        "雅霖": { two: 3000, three: 1500, four: 800 },
        "澎澄": { two: 5000, three: 3000, four: 2000 }
    };
    
    const schedulePrices = {
        "吉貝玩水樂": 5000,
        "東海無限逍遙遊": 4000,
        "浪漫七美行腳": 4000,
        "神秘南方四島": 5000,
        "瑰麗南海跳島": 5000
    };
    
    document.getElementById("calculateBtn").addEventListener("click", function () {
        const selectedTransport = document.querySelector("input[name='transport']:checked");
        const selectedAccommodation = document.querySelector("input[name='accommodation']:checked");
        const selectedSchedule = document.querySelector("input[name='schedule']:checked");
        
        if (!selectedTransport || !selectedAccommodation || !selectedSchedule) {
            alert("請選擇交通、住宿與行程");
            return;
        }
        
        const transportCost = transportPrices[selectedTransport.value];
        const accommodationCost = accommodationPrices[selectedAccommodation.value];
        const scheduleCost = schedulePrices[selectedSchedule.value];
        
        let tableContent = `<tr>
            <th>房型</th>
            <th>成人</th>
            <th>敬老</th>
            <th>兒童</th>
        </tr>`;
        
        ["two", "three", "four"].forEach(roomType => {
            const totalAdult = transportCost.adult + accommodationCost[roomType] + scheduleCost;
            const totalElder = transportCost.elder + accommodationCost[roomType] + scheduleCost;
            const totalChild = transportCost.child + accommodationCost[roomType] + scheduleCost;
            tableContent += `<tr>
                <td>${roomType === "two" ? "兩人房" : roomType === "three" ? "三人房" : "四人房"}</td>
                <td>${totalAdult}</td>
                <td>${totalElder}</td>
                <td>${totalChild}</td>
            </tr>`;
        });
        
        document.getElementById("resultTable").innerHTML = tableContent;
    });
});
