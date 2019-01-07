var sum;
var button_count = 0;
var quantity = [];
function start()
{
    set_items();
    init();
}
$(document).ready(function(){
    $("#search_input").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("p").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
function set_items()
{
    var object = [{"name":"冬瓜檸檬","cost":"$25"},{"name":"巧克力奶茶","cost":"$25"},{"name":"甘蔗清茶","cost":"$25"},{"name":"多多綠茶","cost":"$25"},{"name":"百香多多綠茶","cost":"$30"},{"name":"法式風味可可亞","cost":"$39"},{"name":"紅茶","cost":"$20"},{"name":"紅茶拿鐵","cost":"$25"},{"name":"紅茶拿鐵咖啡","cost":"$30"},{"name":"拿鐵咖啡","cost":"$30"},{"name":"梅子風味綠茶","cost":"$30"},{"name":"莫卡咖啡","cost":"$30"},{"name":"麥茶","cost":"$20"},{"name":"經典奶茶","cost":"$25"},{"name":"義式風味拿鐵","cost":"$30"},{"name":"綠奶茶","cost":"$30"},{"name":"綠檬芭樂", "cost":"$30"},{"name":"翡翠綠茶","cost":"$30"},{"name":"鳳梨冰茶","cost":"$35"},{"name":"檸檬紅茶","cost":"$20"}];
    for(var i = 0; i < 20; i++)
    {
        var image = document.createElement("img");
        var div = document.createElement("div");
        div.setAttribute("class", "all_pic");
        image.setAttribute("id", "img-"+i);
        image.setAttribute("src", "images/"+object[i].name+".png");
        image.setAttribute("class", "items");
        image.setAttribute("draggable", "true");
        image.addEventListener("dragstart", drag, false);
        var word = document.createElement("div");
        word.setAttribute("class", "desc");
        word.setAttribute("id", "word-"+i);
        $(word).html("<p>"+object[i].name+"</p><p>"+object[i].cost+"</p>");
        div.appendChild(image);
        div.appendChild(word);
        div.addEventListener("drop", drop, false);
        div.addEventListener("dragover", allowDrop, false);
        document.getElementById("demo").appendChild(div);
    }

    var total_cost = total();
    document.getElementById("total_cost").innerHTML = total_cost;
}
function allowDrop(ev) 
{
    ev.preventDefault();
}

function drag(ev)
{
     ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) 
{
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    var id_array = nodeCopy.id.split("-");
    console.log(nodeCopy.id);
    console.log($("#word-"+id_array[1]).text());
    var string = $("#word-"+id_array[1]).text();
    var array = string.split("$");
    ev.target.appendChild(nodeCopy);
    if(quantity[id_array[1]]!=null)
    {
        quantity[id_array[1]]++;
        document.getElementById("item_num"+id_array[1]).innerHTML = quantity[id_array[1]];
        console.log(id_array[1]);
        console.log(quantity[id_array[1]]);
        console.log(parseInt(array[1])*parseInt(quantity[id_array[1]]));
        var total = parseInt(array[1])*parseInt(quantity[id_array[1]]);
        document.getElementById("item_cost"+id_array[1]).innerHTML = total;

        for(var i  = 0; i <localStorage.length; i++)
        {
            var compare = localStorage.key(i);
            if(array[0] === compare)
            {
                localStorage.removeItem(compare);
                var new_name = array[0];
                var new_cost = array[1];
                var new_num = quantity[id_array[1]];
                var text = id_array[1]+"-"+new_name+"-"+total+"-"+new_num;
                localStorage.setItem(new_name, text);
            }
        }
        re_total()
    }
    else
    {
        console.log(quantity[id_array[1]]);
        quantity[id_array[1]] = 1;
        var text = "<tr id='row"+button_count+"'><td class='item_name' id='item_name'"+id_array[1]+"'>"+array[0]+"</td><td class='item_num' id='item_num"+id_array[1]+"'>"+quantity[id_array[1]]+"</td><td class='item_cost' id='item_cost"+id_array[1]+"'>"+array[1]+"</td><td class='item_set'><input  type='button' value='刪除' id='remove"+button_count+"'  class='button'></td></tr>";
        $("table").after(text);
        var text = id_array[1]+"-"+array[0]+"-"+array[1]+"-1";
        localStorage.setItem(array[0], text);
        button_count++;
        re_total()
    }
    for(var i = 0 ;i < button_count; i++)
    {
        $("#remove"+i).click(function(){
            console.log("ss");
            for(var j = 0; j < localStorage.length ; j++)
            {
                var key = localStorage.key(j);
                var value = localStorage.getItem(key);
                var temp = value.split("-");
                quantity[temp[0]] = null;
                if(temp[1]===$(this).parent().parent().children().first().text().toString())
                    localStorage.removeItem(key);
            }
            $(this).parent().parent().remove();
            sum = 0;
            for(var i = 0; i < localStorage.length; i++)
            {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var temp = value.split("-");
                sum += parseInt(temp[2]);
            }
            document.getElementById("total_cost").innerHTML = sum;

        })
    }
}
function init()
{
    button_count = 0;
    quantity = [];
    for(var i = 0; i<localStorage.length;i++)
    {
        var key = localStorage.key(i);
        var string = localStorage.getItem(key);
        var array = string.split("-");
        var text = "<tr id='row"+button_count+"'><td class='item_name' id='item_name'"+array[0]+"'>"+array[1]+"</td><td class='item_num' id='item_num"+array[0]+"'>"+array[3]+"</td><td class='item_cost' id='item_cost"+array[0]+"'>"+array[2]+"</td><td class='item_set'><input  type='button' value='刪除' id='remove"+button_count+"' class='button'></td></tr>";
        quantity[array[0]] = array[3];
        $("table").after(text);
        button_count++;
    }
    for(var i = 0 ;i < button_count; i++)
    {
        $("#remove"+i).click(function(){
            console.log("ss");
            for(var j = 0; j < localStorage.length ; j++)
            {
                var key = localStorage.key(j);
                var value = localStorage.getItem(key);
                var temp = value.split("-");
                quantity[temp[0]] = null;
                if(temp[1]===$(this).parent().parent().children().first().text().toString())
                    localStorage.removeItem(key);
            }
            $(this).parent().parent().remove();
            var total_cost = total();
            document.getElementById("total_cost").innerHTML = total_cost;
            location.reload();
        })
    }
}
function total()
{
    sum = 0;
    for(var i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var temp = value.split("-");
        sum += parseInt(temp[2]);
    }
    return sum;
}
function re_total()
{
    var total_cost = total();
    document.getElementById("total_cost").innerHTML = total_cost;
}
window.addEventListener("load", start, false);
