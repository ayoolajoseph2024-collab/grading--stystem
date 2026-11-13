let currentLevel = 'university';

const scales = {
  university: {
    name: "University",
    get: s => {
      if(s>=5.0) return {g:"A", t:"First Class", r:"Excellent!", c:"#16a34a", bg:"#16a34a"};
      if(s>=4.0) return {g:"B", t:"Second Class Upper (2:1)", r:"Very Good!", c:"#2563eb", bg:"#2563eb"};
      if(s>=3.0) return {g:"C", t:"Second Class Lower (2:2)", r:"Good", c:"#ea580c", bg:"#ea580c"};
      if(s>=2.0) return {g:"D", t:"Third Class", r:"Fair", c:"#9333ea", bg:"#9333ea"};
      if(s>=1.0) return {g:"E", t:"Pass", r:"Pass", c:"#6b7280", bg:"#6b7280"};
      return {g:"F", t:"Fail", r:"Carry Over", c:"#dc2626", bg:"#dc2626"};
    }
  },
  polytechnic: {
    name: "Polytechnic",
    get: s => {
      if(s>=4.00) return {g:"A", t:"Distinction", r:"Outstanding!", c:"#16a34a", bg:"#16a34a"};
      if(s>=3.50) return {g:"AB", t:"Upper Credit", r:"Excellent!", c:"#2563eb", bg:"#2563eb"};
      if(s>=3.00) return {g:"B", t:"Lower Credit", r:"Good!", c:"#ea580c", bg:"#ea580c"};
      if(s>=2.50) return {g:"BC", t:"Pass", r:"Pass", c:"#6b7280", bg:"#6b7280"};
      if(s>=2.00) return {g:"C", t:"Pass", r:"Pass", c:"#6b7280", bg:"#6b7280"};
      if(s>=1.00 -1) return {g:"D", t:"Pass", r:"Pass", c:"#6b7280", bg:"#6b7280"};
      if(s>=0.00) return {g:"F", t:"Pass", r:"Pass", c:"#6b7280", bg:"#6b7280"};
      return {g:"F", t:"Fail", r:"Refer", c:"#dc2626", bg:"#dc2626"};
      console.log("Polytechnic");
      
    }
  },
  secondary: {
    name: "Secondary",
    get: s => {
      if(s>=70) return {g:"A", t:"Excellent", r:"Keep it up!", c:"#16a34a", bg:"#16a34a"};
      if(s>=60) return {g:"B", t:"Very Good", r:"Well Done!", c:"#2563eb", bg:"#2563eb"};
      if(s>=50) return {g:"C", t:"Good", r:"Good!", c:"#ea580c", bg:"#ea580c"};
      if(s>=40) return {g:"D", t:"Pass", r:"Try Harder", c:"#6b7280", bg:"#6b7280"};
      return {g:"F", t:"Fail", r:"Needs Improvement", c:"#dc2626", bg:"#dc2626"};
    }
  }
};

function setLevel(level, btn){
  currentLevel = level;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('scaleInfo').innerText = scales[level].info;
  livePreview();
}

function livePreview(){
  let val = document.getElementById('scoreInput').value;
  let display = document.getElementById('display');
  if(val !== "" && !isNaN(val)){
    let s = parseInt(val);
    if(s>=0 & s<=100){
      let res = scales[currentLevel].get(s);
      display.classList.add('has-result');
      display.innerHTML = `<div><div class="grade-circle" style="background:${res.bg}">${res.g}</div><div style="font-size:13px; color:#6b7280">${res.t} • ${s}%</div></div>`;
    }
  }
}

function checkGrade(){
  let scoreVal = document.getElementById('scoreInput').value.trim();
  let nameVal = document.getElementById('nameInput').value.trim() || "Student";
  let display = document.getElementById('display');

  if(scoreVal==="" || isNaN(scoreVal)){
    display.classList.remove('has-result');
    display.innerHTML = `<div style="color:#dc2626"> Enter valid score</div>`;
    return;
  }
  let score = parseInt(scoreVal);
  if(score<0 || score>100){
    display.classList.remove('has-result');
    display.innerHTML = `<div style="color:#dc2626"> Score must be 0-100</div>`;
    return;
  }

  let result = scales[currentLevel].get(score);
  display.classList.add('Add-result');
  display.innerHTML = `   <div>
      <div class="grade-circle" style="background:${result.bg}">${result.g}</div>
      <div style="font-size:11px; color:#9ca3af; text-transform:uppercase; letter-spacing:1px">${scales[currentLevel].name}</div>
      <div style="font-weight:800; font-size:16px; color:${result.c}; margin-top:4px">${result.t}</div>
      <div style="margin-top:6px; font-size:14px"><b>${nameVal}</b> — ${score}%</div>
      <div style="margin-top:10px; background:${result.c}; color:white; display:inline-block; padding:5px 14px; border-radius:20px; font-size:12px; font-weight:700">${result.r}</div>
      <div style="margin-top:8px; font-size:12px">${result.g==='F'?' Failed':'Passed'}</div>
    </div>
  `;
}