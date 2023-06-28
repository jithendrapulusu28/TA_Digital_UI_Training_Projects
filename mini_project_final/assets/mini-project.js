import data from "./products.json" assert{type:'json'}; 
var count=0;

for(let i=0; i<data.length;i++)
{
    const mobile_data=`<div class="product-item-wrapper">

    <div class="wishlist-item">
        <i class="fa-regular fa-heart"></i>
    </div>
    <div class="product-item">
        <div class="product-img">
            <img src=${data[i].image} alt="Mi Mix 2 (Black, 128 GB)">
        </div>
        <div class="product-details">

            <h3 class="product-name">${data[i].mobilename}(${data[i].color}, ${data[i].storage})</h3>
            <div class="product-rating">
            <i class="fa-solid fa-star rating-color"></i>
            <i class="fa-solid fa-star rating-color"></i>
            <i class="fa-solid fa-star rating-color"></i>
            <i class="fa-solid fa-star rating-color"></i>
            <i class="fa-solid fa-star rating-color"></i>
            <p class="rating-color no-of-ratings">(${data[i].noofratings})</p>
        </div>
        <div class="product-price">
            <h2 class="discount-price">${data[i].discountprice}</h2>
            <p class="original-price"><del>${data[i].originalprice}</del></p>
            <p class="discount-percentage">${data[i].discountpercentage}</p>
        </div>
        </div>

        
    </div>
    
</div>`
count=count+1;

document.getElementById("demo").innerHTML+=mobile_data;
} 
if(count>0)
{
document.getElementById("mobile-count").innerHTML=`Showing 1 - ${count} of ${count} results `;
}
else{
    document.getElementById("mobile-count").innerHTML=`No results for your search`;

}