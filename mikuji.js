// JSONファイルからデータを取得し、おみくじを引く
function mikuji() {
    const checkbox = document.getElementById("pop-up");
    checkbox.checked = true;
    // JSONファイルを読み込む
    $.getJSON("json/mikuji.json", function (data) {
        //console.log(data);

        // 乱数を生成
        let random = random_weight(data);
        //console.log(random);

        // おみくじの結果を表示
        let result = data[random];
        console.log(result);

        const luck = document.getElementById("mikuji-luck");
        luck.textContent = result.luck;
        const description = document.getElementById("mikuji-description");
        description.textContent = result.description;
        const item = document.getElementById("mikuji-item");
        item.textContent = result.item;
        // test_random_weight(data);
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