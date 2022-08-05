const number_detail = [[3, 4, 6, 8, 12, 14, 18, 20],
                    [7, 13, 31, 57, 133, 183, 307, 381]];
const default_background_detail = "default picture is this";

function user_input_available_check(user_input_length) {
    return number_detail.includes(user_input_length);
}

function side_completer(array) {
    if (array[1].length !== 0) {
        return array;
    } else {
        let length = array[0].length;
        let to_add = [];
        for (let i = 0; i < length; i++) {
            to_add.push(default_background_detail);
        }
        return [array[0], to_add];
    }
}

function dobble_form_creator(input_array) {
    var N = number_of_objects_on_each_card(input_array);
    const final_arr = [];
    // Generate series from #01 to #N
    for (let i = 0; i <= N - 1; i++) {
        const row_to_add = [];
        row_to_add.push(input_array[0]);
        for (let i2 = 1; i2 <= N - 1; i2++) {
            row_to_add.push(input_array[((N - 1) + (N - 1) * (i - 1) + (i2 + 1)) - 1]);
        }
        final_arr.push(row_to_add);
    }
    // Generate series from #N+1 to #N+(N-1)*(N-1)
    for (let i = 1; i <= N - 1; i++) {
        for (let i2 = 1; i2 <= N - 1; i2++) {
            const s = [];
            s.push(input_array[(i + 1) - 1]);
            for (i3 = 1; i3 <= N - 1; i3++) {
                s.push(input_array[((N + 1) + (N - 1) * (i3 - 1) + (((i - 1) * (i3 - 1) + (i2 - 1))) % (N - 1)) - 1]);
            }
            final_arr.push(s);
        }
    }
    return final_arr;
}

function number_of_objects_on_each_card(array) {
    let length = array.length;
    let index_number = number_detail[1].indexOf(length);
    return number_detail[0][index_number];
}

function print_test(array) {
    for (let i = 0; i < array[0].length; i++) {
        let top_side = array[0][i];
        let dwn_side = array[1][i];
        document.write("card number :" + (i+1) + " : <br>");
        document.write("top side : " + top_side + "<br>");
        document.write("dwn side :" + dwn_side + "<br>");
        document.write("     <br>");
    }
}

function main_dobble_form_creator(user_array) {
    let completed_array = side_completer(user_array);
    let index_0 = dobble_form_creator(completed_array[0]);
    let index_1 = dobble_form_creator(completed_array[1]);
    print_test([index_0, index_1]);
    return [index_0, index_1];
}
