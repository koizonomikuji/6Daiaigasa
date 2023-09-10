let result_dict = {};

// JSONファイルからデータを取得し、おみくじを引く
function mikuji() {
    //const checkbox = document.getElementById("pop-up");
    //checkbox.checked = true;
    // JSONファイルを読み込む
    $.getJSON("json/mikuji.json", function (data) {
        //console.log(data);

        // 乱数を生成
        let random = random_weight(data);
        //console.log(random);

        // おみくじの結果を表示
        result_dict = data;
        //console.log(result_dict[data]);

        // 結果を query で保持して画面を遷移
        let query = "?";
        query += "luck=" + encodeURIComponent(random);
        location.href = "result.html" + query;
        //console.log(query);

        // test_random_weight(data);
    });
}

function set_result() {
    // result までスクロール
    var result = document.getElementById("result");
    var rect = result.getBoundingClientRect();
    var position = rect.top + window.pageYOffset;
    document.documentElement.scrollTop = position;

    // query から結果を取得して表示
    let query = location.search;
    let id = query.split("=")[1];
    console.log(id);
    $.getJSON("json/mikuji.json", function (data) {
        console.log(data);
        const result = data[id];
        console.log(result);

        const luck = document.getElementById("mikuji-luck");
        if (luck == null) { return; }
        luck.textContent = result.luck;
        const description = document.getElementById("mikuji-description");
        description.textContent = result.description;
        const item = document.getElementById("mikuji-item");
        item.textContent = result.item;
    });
}

// 重み付き乱数
function random_weight(data) {
    let random = Math.random();
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].weight;
    }
    let tmp = 0;
    random *= sum;
    for (let i = 0; i < data.length; i++) {
        tmp += data[i].weight;
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
    let id;
    for (let i = 0; i < N; i++) {
        id = random_weight(data);
        if (id in result_dict) {
            result_dict[id] += 1;
        }
        else {
            result_dict[id] = 1;
        }
    }
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i].weight;
    }
    Object.keys(result_dict).forEach(element => {
        result_dict[element] /= N;
        result_dict[element] *= sum;
        result_dict[element] = Math.round(result_dict[element]);
    });
    console.log(result_dict);
}