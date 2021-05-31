// ####################################################

// Product Row Creator ================//
let sku_input = 115;
let product_name_input = 'Potato Roll';
let stock_input = 19500;
let rate_input = 100;
let received_input = 500;
let returned_input = 36;
let sale_price_input = 4522;
let agent_name_input = 'Ekram';

let tr =
  `<tr class='product_row'>
    <td>#${sku_input}</td>
    <td>${product_name_input}</td>
    <td>${stock_input}</td>
    <td>${rate_input}</td>
    <td>${received_input}</td>
    <td>${returned_input}</td>
    <td>${sale_price_input}</td>
    <td style="border-right: 1px dashed;">${agent_name_input}</td>
    <td class="arrow"><img src="./assets/icon/down-arrow.png" alt="Arrow" class="down_arrow"> </td>
  </tr>`;

let t_body = document.querySelector('#t_body');
let t_body_text = t_body.innerHTML;

let rows = 10;
for(let i =0; i < rows; i++){
    t_body_text = t_body_text + tr; 
    t_body.innerHTML = t_body_text;
}

// #######################################################

// All Selectors
let update_form_div = t_body.firstElementChild; // Select update_form_div
let form = document.querySelector('form'); // Select update_form_div
let all_product_row = document.querySelectorAll('.product_row');
let all_arrow = document.querySelectorAll('.arrow');
let active_row = document.getElementsByClassName("active");

// #######################################################

// Nav Menu Activation
let nav_menu = document.getElementsByClassName("nav-menu")[0];
let nav_menu_li = document.querySelectorAll("li");
for (let i = 0; i < nav_menu_li.length; i++) {
  nav_menu_li[i].addEventListener("click", function() {
    let active_nav = document.getElementsByClassName("active_nav");
    if(active_nav!=null){
      active_nav[0].className = active_nav[0].className.replace("active_nav", "");
      this.className += "active_nav";
    }
  });
}
// #######################################################

// Single arrow Click Event
for (let i = 0; i < all_arrow.length; i++) {
  all_arrow[i].addEventListener("click", function(e) {
    td = e.target.parentElement;
    let tr_ele = td.parentElement;   // clicked single tr element

    // add 'Active' class after click the single element
    let current = document.getElementsByClassName("active");
    for(let j = 0; j < current.length; j++){
      if(current[j].className.includes('active')){
        current[j].className = current[j].className.replace(" active", "");
      }
    }
    this.parentElement.className += " active";

    // remove all 'next_tr' class element after click any single element
    let next_tr_class = document.getElementsByClassName("next_tr");
    for(let k = 0; k < next_tr_class.length; k++){
      if(next_tr_class[k].className.includes('next_tr')){
        next_tr_class[k].remove();
      }
    }

    // set all 'down_arrow' image src to down arrow
    let up_arrow = document.querySelectorAll('.up_arrow');
    for(let l = 0; l < up_arrow.length; l++){
      up_arrow[l].setAttribute("src", "./assets/icon/down-arrow.png");
    }
    
    // add row and add 'next_tr' class after the clicked row
    if(tr_ele.nextSibling != null){
      if(tr_ele.nextSibling.className.includes('next_tr') == false){
        t_body.insertRow(tr_ele.rowIndex);
        tr_ele.nextSibling.className = 'next_tr';
        tr_ele.nextSibling.innerHTML += update_form_div.innerHTML;

        // Set up arrow based their activities
        let active_arrow = tr_ele.lastElementChild.children[0];
        if(active_arrow.className == 'down_arrow'){
          active_arrow.setAttribute("src", "./assets/icon/up-arrow.png"); // change down arrow icon to up arrow
          active_arrow.className = active_arrow.className.replace('down_arrow','up_arrow'); // change down arrow icon to up arrow
          // let a = active_arrow.className;
        } else if(active_arrow.className == 'up_arrow'){
          active_arrow.setAttribute("src", "./assets/icon/down-arrow.png"); // change up arrow icon to down arrow
          active_arrow.className = active_arrow.className.replace('up_arrow','down_arrow'); // change down arrow icon to up arrow
          tr_ele.nextSibling.remove();
        }        
      }
    } else if (tr_ele.nextSibling == null){
        t_body.insertRow(tr_ele.rowIndex);
        tr_ele.nextSibling.className = 'next_tr';
        tr_ele.nextSibling.innerHTML += update_form_div.innerHTML;    
        
        // Set up arrow based their activities
        let active_arrow = tr_ele.lastElementChild.children[0];
        if(active_arrow.className == 'down_arrow'){
          active_arrow.setAttribute("src", "./assets/icon/up-arrow.png"); // change down arrow icon to up arrow
          active_arrow.className = active_arrow.className.replace('down_arrow','up_arrow'); // change down arrow icon to up arrow
          // let a = active_arrow.className;
        } else if(active_arrow.className == 'up_arrow'){
          active_arrow.setAttribute("src", "./assets/icon/down-arrow.png"); // change up arrow icon to down arrow
          active_arrow.className = active_arrow.className.replace('up_arrow','down_arrow'); // change down arrow icon to up arrow
          // let next_tr_ele = document.querySelector('next_tr');
          tr_ele.nextSibling.remove();
        }     
    } 

    function grab_data(){
      let tr_children = tr_ele.children;
      let tr_children_array = [];
      for(let i = 0; i < tr_children.length - 1; i++){
        tr_children_data = tr_children[i].innerText;
        tr_children_array.push(tr_children_data);
        tr_children_obj = new Object({
          sku : tr_children[0].innerText,
          product_name : tr_children[1].innerText,
          product_category : tr_children[1].innerText,
          stock_price : tr_children[2].innerText,
          product_rate : tr_children[3].innerText,
          received_qty : tr_children[4].innerText,
          returned_qty : tr_children[5].innerText,
          sale_price : tr_children[6].innerText,
          agent_name : tr_children[7].innerText,
        })
      }
      return tr_children_obj;
    }

    ///// Set form data from grabbed data
    function set_data_to_form(){
      grab_data(); // return 'tr_children_obj' which is object of tr data
      let next_tr_ele = document.querySelector('.next_tr');
      if(next_tr_ele != null){
        const sku = next_tr_ele.querySelector('#sku');
        const product_name = next_tr_ele.querySelector('#product_name');
        const product_category = next_tr_ele.querySelector('#product_category');
        const stock_price = next_tr_ele.querySelector('#stock_price');
        const product_rate = next_tr_ele.querySelector('#product_rate');
        const received_qty = next_tr_ele.querySelector('#received_qty');
        const returned_qty = next_tr_ele.querySelector('#returned_qty');
        const sale_price = next_tr_ele.querySelector('#sale_price');
        const product_price = next_tr_ele.querySelector('#product_price');

        sku.innerHTML = tr_children_obj['sku'];
        product_name.innerHTML = tr_children_obj['product_name'];
        product_category.innerHTML = tr_children_obj['product_category'];
        stock_price.value = tr_children_obj['stock_price'];
        product_rate.value = tr_children_obj['product_rate'];
        received_qty.value = tr_children_obj['received_qty'];
        returned_qty.value = tr_children_obj['returned_qty'];
        sale_price.value = tr_children_obj['sale_price'];
        product_price.value = tr_children_obj['product_rate'];
      }
    }
    set_data_to_form();

  });
}

// #################################################
// Sider Bar Menu
let cancel_bar = document.querySelector('.cancel_bar').firstElementChild;
let left_menu = document.querySelector('.left_menu');
let menu_icon = document.querySelector('.menu_icon');
let container = document.querySelector('.container');

cancel_bar.addEventListener('click', function(){
  left_menu.style.display = 'none';
  container.style.backgroundColor = '#fff';
})

menu_icon.addEventListener('click', function(){
  left_menu.style.display = 'block';
  container.style.backgroundColor = 'rgb(166, 166, 166)';
  container.style.zIndex  = '5';
})

// ##################################################

// Delete tr using delete_btn
function delete_data(){
  let delete_btn = document.querySelectorAll('#delete_btn')[1];
  delete_btn_parent = delete_btn.closest('tr');
  delete_next_tr = delete_btn_parent.previousSibling;
  delete_btn_parent.remove();
  delete_next_tr.remove();
}
