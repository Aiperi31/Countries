const hero=document.querySelector(".hero");
const headerTitle=document.querySelector(".title");
const blackMode=document.querySelector(".blackMode");
const body=document.querySelector("body");
const option=document.querySelector(".option");
const regionSelect=document.querySelector(".region-select");
const search=document.querySelector(".search");

fetch("https://restcountries.com/v3.1/all")
.then((res)=>{
     return res.json();
 })
 .then((data)=>{
  const allCountries=data;
  function createCountries(el) {
    
    const block=document.createElement("div");
    block.classList.add("block");
    const title=document.createElement("h2");
    title.classList.add("title");
    block.appendChild(title);
    title.innerHTML=el.name.common;
    hero.append(block);
    const img=document.createElement("img");
    img.classList.add("img");
    img.src=el.flags.svg;
    block.append(img);

    const region=document.createElement("p");
    region.classList.add("region");
    region.innerHTML=`region: ${el.region}`;
    block.appendChild(region);
    hero.appendChild(block);
  }
  
    function displayCountries(region="all", searchValue = "") {
      hero.innerHTML="";

      let filteredCountries=
      region==="all"
      ? allCountries
      : allCountries.filter((el)=>el.region===region);

      if (searchValue!=="") {
        filteredCountries=filteredCountries.filter((el)=>
        el.name.common.toLowerCase().includes(searchValue.toLowerCase())
      );
      }

      filteredCountries.forEach(createCountries);
    }
    displayCountries();

    regionSelect.addEventListener("change",(e)=>{
      const selectedRegion=e.target.value;
      displayCountries(selectedRegion, search.value); 
    });

    search.addEventListener("input", (e)=>{
      const searchValue= e.target.value;
      displayCountries(regionSelect.value,searchValue);
     });
  })
.catch((error)=>{
     console.log(error);
 });
 blackMode.addEventListener("click",()=>{
  if (body.style.background=="black") {
    body.style.background="white";
    headerTitle.style.color="rgb(33, 20, 218)";
    blackMode.innerHTML="Dark mode";

  }else{
    body.style.background="black";
    headerTitle.style.color="white";
    blackMode.innerHTML="Light mode";

  }
 })

 

 