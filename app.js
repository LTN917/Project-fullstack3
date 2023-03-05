let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector(".animation-wrapper");

const time_line = new TimelineMax();
//p1 要控制的對象
//p2 duration
//p3 控制對象的原始狀態
//p4 控制對象的動畫結束狀態
//p5 動畫提早開始
time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.6, { opacity: 1 }, { opacity: 0 });

//讓動畫不影響網頁使用
setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

//讓整個網站的Enter key都無法使用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//防止Form內部的Button提交表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//select內選取分數後顏色會改變
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); //e.target就是select
  });
});

// 改變credit之後 GPA也要更新
let credits = document.querySelectorAll(".class-credits");
credits.forEach((c) => {
  c.addEventListener("change", (e) => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-")
    target.style.backgroundColor = "lightgreen";
  else if (target.value == "B+" || target.value == "B" || target.value == "B-")
    target.style.backgroundColor = "yellow";
  else if (target.value == "C+" || target.value == "C" || target.value == "C-")
    target.style.backgroundColor = "orange";
  else if (target.value == "D+" || target.value == "D" || target.value == "D-")
    target.style.backgroundColor = "red";
  else if (target.value == "F") target.style.backgroundColor = "gray";
  else target.style.backgroundColor = "white";
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1;
    case "D-":
      return 0.7;
    case "F":
      return 0;
    default:
      return 0;
  }
}

function setGPA() {
  let credits = document.querySelectorAll(".class-credits");
  let selects = document.querySelectorAll("select");
  let sum = 0; //計算分子
  let creditsSum = 0; //計算分母

  for (let i = 0; i < credits.length; i++) {
    let c = credits[i].value - 0; //將value從 string --> int
    if (!isNaN(c)) creditsSum += c;
  }

  for (let i = 0; i < selects.length; i++) {
    if (!isNaN(convertor(selects[i].value)))
      sum += (credits[i].value - 0) * convertor(selects[i].value);
  }

  let result = creditsSum == 0 ? 0.0 : (sum / creditsSum).toFixed(2);
  document.getElementById("result-gpa").innerText = result;
}

// 按下新增btn產生新表格
let addButton = document.querySelector(".plus-button");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  //製作五個小元素

  let input1 = document.createElement("input");
  input1.setAttribute("type", "text");
  input1.setAttribute("placeholder", "class category");
  input1.setAttribute("list", "opt");
  input1.classList.add("class-type");

  let input2 = document.createElement("input");
  input2.setAttribute("type", "text");
  input2.setAttribute("placeholder", "class number");
  input2.classList.add("class-number");

  let input3 = document.createElement("input");
  input3.setAttribute("type", "number");
  input3.setAttribute("placeholder", "credits");
  input3.setAttribute("min", "0");
  input3.setAttribute("max", "6");
  input3.classList.add("class-credits");
  input3.addEventListener("change", () => {
    setGPA();
  });

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.classList.add("remove");
    // .5s後移除跟重新計算GPA
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
      setGPA();
    }, 500);
  });

  newDiv.appendChild(input1);
  newDiv.appendChild(input2);
  newDiv.appendChild(input3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

// trash can按下去會刪除form
let allTrashes = document.querySelectorAll(".trash-button");
allTrashes.forEach((t) => {
  t.addEventListener("click", (e) => {
    // 移除的動畫
    e.target.parentElement.parentElement.classList.add("remove");
    // .5s後移除跟重新計算GPA
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
      setGPA();
    }, 500);
  });
});

// 排序merge sort

let btn1 = document.querySelector(".btn-sortDescending");
let btn2 = document.querySelector(".btn-sortAscending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // 大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    }
  }

  // 取得object array後，我們可以把成績String換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  // 根據object array的內容，來更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
        <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value=${objectArray[i].class_name}
        /><!--
        --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
        /><!--
        --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
        /><!--
        --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
        ><!--
        --><button class="trash-button">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    </form>`;
  }

  // SELECT可直接用JS更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // select事件監聽
  allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  // credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
