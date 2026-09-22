const PRODUCTS=[
{id:1,cat:"pan",catName:"Pan",name:"Bolillo",desc:"Pan tradicional de trigo, crujiente por fuera y suave por dentro.",price:8,icon:"🥖"},
{id:2,cat:"pan",catName:"Pan",name:"Telera",desc:"Pan suave y clásico, ideal para tortas.",price:10,icon:"🥯"},
{id:3,cat:"pan",catName:"Pan",name:"Baguette",desc:"Pan alargado de corteza dorada y miga ligera.",price:28,icon:"🥖"},
{id:4,cat:"pan-dulce",catName:"Pan dulce",name:"Concha",desc:"Pan dulce tradicional con cubierta de azúcar.",price:16,icon:"🥐"},
{id:5,cat:"pan-dulce",catName:"Pan dulce",name:"Cuernito",desc:"Pieza hojaldrada, ligera y ligeramente dulce.",price:18,icon:"🥐"},
{id:6,cat:"pan-dulce",catName:"Pan dulce",name:"Dona glaseada",desc:"Dona esponjosa con glaseado dulce.",price:20,icon:"🍩"},
{id:7,cat:"pasteles",catName:"Pasteles",name:"Pastel de chocolate",desc:"Bizcocho de chocolate con relleno cremoso.",price:320,icon:"🍫"},
{id:8,cat:"pasteles",catName:"Pasteles",name:"Pastel de vainilla",desc:"Bizcocho de vainilla con crema y fruta.",price:290,icon:"🍰"},
{id:9,cat:"tartas",catName:"Tartas",name:"Tarta de manzana",desc:"Base crujiente con manzana especiada.",price:260,icon:"🥧"},
{id:10,cat:"tartas",catName:"Tartas",name:"Tarta de frutos rojos",desc:"Tarta cremosa cubierta con frutos rojos.",price:280,icon:"🫐"},
{id:11,cat:"especialidades",catName:"Especialidades",name:"Roles de canela",desc:"Masa suave con canela y glaseado de la casa.",price:25,icon:"🍥"},
{id:12,cat:"especialidades",catName:"Especialidades",name:"Croissant relleno",desc:"Croissant horneado con relleno cremoso.",price:32,icon:"🥐"}
];

function getCart(){return JSON.parse(localStorage.getItem("migajaCart")||"[]")}
function saveCart(c){localStorage.setItem("migajaCart",JSON.stringify(c));updateCount()}
function updateCount(){document.querySelectorAll(".cart-count").forEach(e=>e.textContent=getCart().reduce((a,x)=>a+x.qty,0))}
function addToCart(id,qty=1){const c=getCart(),p=PRODUCTS.find(x=>x.id===id),item=c.find(x=>x.id===id);item?item.qty+=qty:c.push({id,qty});saveCart(c);showToast(`${p.name} agregado al pedido`)}
function changeQty(id,delta){const c=getCart(),i=c.findIndex(x=>x.id===id);if(i>=0){c[i].qty+=delta;if(c[i].qty<=0)c.splice(i,1);saveCart(c);renderOrder()}}
function money(n){return n.toLocaleString("es-MX",{style:"currency",currency:"MXN"})}
function showToast(msg){let t=document.getElementById("toast");if(!t){t=document.createElement("div");t.id="toast";t.className="toast-container position-fixed bottom-0 end-0 p-3";document.body.appendChild(t)}t.innerHTML=`<div class="toast show text-bg-dark"><div class="toast-body">✓ ${msg}</div></div>`;setTimeout(()=>t.innerHTML="",2200)}

function renderCatalog(){
 const root=document.getElementById("catalog-container"); if(!root)return;
 const cats=[["pan","Pan"],["pan-dulce","Pan dulce"],["pasteles","Pasteles"],["tartas","Tartas"],["especialidades","Especialidades"]];
 root.innerHTML=cats.map(([key,title])=>`<section id="${key}" class="category-title mb-5"><h2 class="fw-bold mb-3">${title}</h2><div class="row g-4">${PRODUCTS.filter(p=>p.cat===key).map(p=>`
 <div class="col-sm-6 col-lg-4"><div class="product-card"><div class="product-icon">${p.icon}</div><div class="product-body d-flex flex-column"><h3 class="h5 fw-bold">${p.name}</h3><p class="text-secondary flex-grow-1">${p.desc}</p><div class="d-flex align-items-center justify-content-between gap-2"><span class="price">${money(p.price)}</span><div class="input-group" style="max-width:145px"><input id="qty-${p.id}" type="number" min="1" value="1" class="form-control"><button class="btn btn-dark" onclick="addToCart(${p.id},Number(document.getElementById('qty-${p.id}').value)||1)">Añadir</button></div></div></div></div></div>`).join("")}</div></section>`).join("");
}

function renderOrder(){
 const box=document.getElementById("order-items");if(!box)return;
 const cart=getCart(),empty=document.getElementById("empty-cart"),form=document.getElementById("order-form");
 if(!cart.length){empty.classList.remove("d-none");form.classList.add("d-none");box.innerHTML="";document.getElementById("order-total").textContent=money(0);return}
 empty.classList.add("d-none");form.classList.remove("d-none");
 let total=0;box.innerHTML=cart.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id),sub=p.price*x.qty;total+=sub;return `<div class="d-flex justify-content-between align-items-center gap-3 mb-3"><div><strong>${p.name}</strong><div class="small text-secondary">${money(p.price)} c/u</div></div><div class="d-flex align-items-center gap-2"><button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${p.id},-1)">−</button><span>${x.qty}</span><button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${p.id},1)">+</button><strong>${money(sub)}</strong></div></div>`}).join("");
 document.getElementById("order-total").textContent=money(total);
}
document.addEventListener("DOMContentLoaded",()=>{
 updateCount();renderCatalog();renderOrder();
 const envio=document.getElementById("envio"),rec=document.getElementById("recogida");
 if(envio&&rec){const toggle=()=>{document.getElementById("address-area").classList.toggle("d-none",!envio.checked);document.getElementById("branch-area").classList.toggle("d-none",!rec.checked)};envio.addEventListener("change",toggle);rec.addEventListener("change",toggle)}
 const form=document.getElementById("order-form");
 if(form)form.addEventListener("submit",e=>{e.preventDefault();if(!form.checkValidity()){form.classList.add("was-validated");return}const modal=new bootstrap.Modal(document.getElementById("successModal"));modal.show();localStorage.removeItem("migajaCart");updateCount();});
});