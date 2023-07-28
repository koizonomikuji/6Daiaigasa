// JSONファイルからデータを取得し、おみくじを引く
function mikuji() {
    // JSONファイルを読み込む
    $.getJSON("json/mikuji.json", function (data) {
        //console.log(data);

        // 乱数を生成
        var random = random_weight(data);
        //console.log(random);

        // おみくじの結果を表示
        var result = data[random];
        //console.log(result);

        let resultText = document.getElementById("luck");
        resultText.textContent = result.luck;
    });
}

// 重み付き乱数
function random_weight(data) {
    var random = Math.random();
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i].weight;
    }
    var tmp = 0;
    for (var i = 0; i < data.length; i++) {
        tmp += data[i].weight / sum;
        if (random < tmp) {
            random = i;
            break;
        }
    }
    //console.log(random);
    return random;
}

// 重み付き乱数のテスト
function test_random_weight(data) {
    result_dict = {};
    const N = 100;
    var id;
    for (var i = 0; i < N; i++) {
        id = random_weight(data);
        if (id in result_dict) {
            result_dict[id] += 1;
        }
        else {
            result_dict[id] = 1;
        }
    }
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += data[i].weight;
    }
    Object.keys(result_dict).forEach(element => {
        result_dict[element] /= N;
        result_dict[element] *= sum;
        result_dict[element] = Math.round(result_dict[element]);
    });
    console.log(result_dict);
}