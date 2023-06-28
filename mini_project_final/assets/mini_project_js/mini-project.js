"use strict";

// toggle button functionality 
$(function () {
  var tempData;
  var data;
  var cartCounter=0;
  var heartCount = 0;
  init();
     // A centralized init function to start the JS sequence
  function init(){
       preFetch();
  }
  /*
  @Function: preFetch
  @Description: Fetch the product Info from JSON file and store in the cache
  @Param: null
  @Returns: null
  */
  async function preFetch() {
     try{ 
     /* after this line, our function will wait for the `fetch()` call to be settled
      the `fetch()` call will either return a Response or throw an error*/
            const fetchedData = await fetch('products.json');
            if (!fetchedData.ok) {
                   throw new Error(`HTTP error: ${fetchedData.status}`);
              }
     /* after this line, our function will wait for the `response.json()` call to be settled
      the `response.json()` call will either return the parsed JSON object or throw an error*/
             tempData = await fetchedData.json();
             data = tempData;
             displayData(tempData);
          
     /*
     @Function: displayData
     @Description: Display the all products data render from JSON file
     @Param: data- An array of objects
     @Returns: null
        */
        function displayData(data) {
          for (let i = 0; i < data.length; i++) {
            let salePrice = calculatingSalePrice(data[i]);
            let tag = "";
            if (data[i].isNew === true && data[i].isSale === false) {
              tag += `<span class="new-tag" >NEW</span>`;
            }
            else if (data[i].isSale === true && data[i].isNew === false) {
              tag += `<span class="sale-tag">SALE</span>`;
            }
            else if (data[i].isNew === true && data[i].isSale === true) {
              tag += `<span class="new-tag" >NEW</span>
                  <span class="sale-tag">SALE</span>`;
            }
            let icon = "";
            for (let index = 0; index < 5; index++) {
              (index < data[i].rating) ? icon += `<i id="star1" class="fa-solid fa-star colored-rating"></i>` 
              : icon += `<i id="star2" class="fa-solid fa-star uncolored-rating"></i>`;
            }
          
            var cardData =
              `<div class="product-item-wrapper">
               <div class="tag">
                  ${tag}
                  </div>    
                  <div id="wishlist-item-heart"class="wishlist-item">
                     <i class="fa-regular fa-heart heart-icon"></i>
                  </div>
                  <div class="product-item">
                      <div class="product-img">
                        <img src=${data[i].image} alt="Mi Mix 2 (Black, 128 GB)">
                      </div> 
                      <div class="overlay"> 
                            <ul class="overlay-list">
                               <li id="add-cart-item" class="cart-item">
                                  <a href="#" class="preventing_reloading">ADD TO CART</a>
                               </li>
                               <li class="gallery-item">
                                   <a>VIEW GALLERY</a>
                                </li>
                            </ul>
                      </div> 
                      <div class="product-details">
                          <div class="product-name">
                              <h3>${data[i].mobileName}(${data[i].color}, ${data[i].storage})</h3>
                           </div>
                          <div class="product-rating">
                              ${icon}
                              <p class=" no-of-ratings">(${data[i].numberOfReviews})</p>
                          </div>
                          <div class="product-color">
                                 <span class="grey"></span>
                                 <span class="black"></span>
                                 <span class="yellow"></span>
                          </div>
                          <div class="product-price">
                                 <h2 class="discount-price">$${salePrice}</h2>
                                 <p class="original-price"><del>$${data[i].actualPrice}</del></p>
                                 <p class="discount-percentage">${data[i].discountPercentage}% off</p>
                          </div>
                       </div>
                   </div>
                  <div>
                </div>`;
        
            document.querySelector('#product-tiles-data').innerHTML+=cardData;
            
          }
        
          document.querySelector("#count").innerHTML=data.length;
          addingItemsToCart(data);
          addingItemsToWishlist(data);
                
        }
        
        /*
        @Function: calculatingSalePrice
        @Description: calculating  SalePrice of the product
        @Param: product - object which represents the product data
        @Returns: salePriceofProduct - number
        */
     
        // sale price of a product calculator
        function calculatingSalePrice(product){
          let salePriceofProduct = Math.round(
            product.actualPrice -
            product.actualPrice * (product.discountPercentage / 100)
           );
           return salePriceofProduct;
         }
     
        /*
        @Function: sortingCaller
        @Description: sort the data based on choice of clicked event
        @Param: data - array of objects which are present in JSON file
        @param: event - fired event 
        @Returns: null
        */
        
        function sortingCaller(data,event){
             var filteredData;
            if(event.target.getAttribute('id')=='low-High')
           {
              filteredData = data.sort(function (product1, product2) {
              let salePriceofProduct1 = calculatingSalePrice(product1);
              let salePriceofProduct2 = calculatingSalePrice(product2);
              return salePriceofProduct1 - salePriceofProduct2;
             });
           }
            else if(event.target.getAttribute('id')=='rating'){
              filteredData = data.sort(function (product1, product2) {
              return product2.rating - product1.rating;
             });
           }
             else if(event.target.getAttribute('id')=='new'){
              filteredData = data.sort((value) => (value.isNew ? -1 : 1));
     
            }
              else{
                    return;
            }
     
              document.querySelector('#product-tiles-data').replaceChildren(); 
              displayData(filteredData);
              
         }
     
         // event is fired when low-High is clicked
         
         document.querySelector("#priceFilter").addEventListener('click', function (event) {
           triggeredEvent(event);
           event.preventDefault();
           sortingCaller(data,event);
         });
         
         
         // event is fired when new is clicked
         document.querySelector('#new-tag-product').addEventListener('click', function (event) {
           triggeredEvent(event);
           event.preventDefault();
           sortingCaller(data,event);
         });
         
         // event is fired when rating is clicked
         
         document.querySelector('#product-rating').addEventListener('click', function (event) {
           triggeredEvent(event);
           event.preventDefault();
           sortingCaller(data,event);
         }
         );
        /*
        @Function: triggeredEvent
        @Description: It removes add-color class of sortingList and add add-color whcih was clicked
        @Param: event - fired event
        @Returns: null
        */
        function triggeredEvent(event) {
          var sortingList = document.querySelectorAll('#sort-by-connector > li  > a');
          //  Remove Class from sortingList
          for (let i = 0; i < sortingList.length; i++) {
            sortingList[i].classList.remove("add-color");
          }
          // add Class to clicked element
          event.target.classList.add("add-color");
        }
     
         /*
         @Function: checkedData
         @Description: It adds the checked brands to array and display them
         @Param: tempData - array of objects which was rendered from JSON file
         @Returns: selectedBrandData - filtered array of objects
         */
         function checkedData(tempData)
         {
           var checkboxCollection = document.querySelectorAll(
             "input[type=checkbox]"
           );
           let selectedBrandData = [];
           for (var i = 0; i < checkboxCollection.length; i++) {
             if (checkboxCollection[i].checked) {
               var appendedData = tempData.filter((Obj) => {
                 if ((Obj.brand === checkboxCollection[i].value)) {
                   return Obj;
                 }
               });
               selectedBrandData = [...selectedBrandData, ...appendedData];
             }
           }
           if (selectedBrandData.length > 0) {
                   document.querySelector('#product-tiles-data').replaceChildren();      
                   displayData(selectedBrandData);
           }
           else {
             document.querySelector('#product-tiles-data').replaceChildren(); 
             displayData(tempData);
           }
           return selectedBrandData;
         }
         // event is fired when rating is clicked
         document
         .querySelector("#brand-contents")
         .addEventListener("change", function () {
         data=checkedData(tempData);
         });
     
     /*
     @Function: priceFilter
     @Description: It will display as per price value with in a range
     @Param: data - array of objects which was rendered from JSON file
     @Returns: rangeData - filtered array of objects
     */
     function priceFilter(data) { 
          var minValue = document.querySelector("#minimumPrice").innerHTML;
          var maxValue = document.querySelector("#maximumPrice").innerHTML;
          var rangeData = data.filter((obj) => {
            let salePrice = calculatingSalePrice(obj);
            if (minValue <= salePrice && salePrice <= maxValue) {
              return obj;
            }
          });
           document.querySelector('#product-tiles-data').replaceChildren(); 
            displayData(rangeData);
        
      }
      // event is fired if changes happened in price filter
      document
         .querySelector("#minimumPrice")
         .addEventListener("DOMSubtreeModified", function () {
          priceFilter(data);
         });
      
      /*
     @Function: addingItemsToCart
     @Description: It will add product to cart and update cart count 
     @Param: data - array of objects which was rendered from JSON file
     @Returns: null
     */
        function addingItemsToCart(data) {
             const AddCart =  document.getElementsByClassName("cart-item");
             if(JSON.parse(localStorage.getItem("CartCount")))
            {
              cartCounter=JSON.parse(localStorage.getItem("CartCount"));
            }
             document.getElementById("cart-counter").innerText = cartCounter;
            
               for (let i = 0; i < data.length; i++) {
                 AddCart[i].addEventListener('click',function(event){
                  event.preventDefault();
                  cartCounter += 1;
                  var localCartCount = cartCounter.toString();
                  localStorage.setItem("CartCount", localCartCount);

                  if (!(AddCart[i]).classList.contains("new-cls")) {
           
                   AddCart[i].innerHTML = '<a class="preventing_reloading"> ADDED TO CART</a>';
           
                   AddCart[i].classList.add('new-cls');
                   document.querySelector('#cart-counter').innerText = cartCounter;
                 }
                 else {
                   document.querySelector('#cart-counter').innerText = cartCounter;
                 }
                 });
                 }
             }
                /*
     @Function: addingItemsToWishlist
     @Description: It will add product to cart and update cart count 
     @Param: data - array of objects which was rendered from JSON file
     @Returns: null
     */

          function addingItemsToWishlist(data) {
              const heartIconArray = document.getElementsByClassName("heart-icon");
              if(JSON.parse(localStorage.getItem("HeartCount")))
            {
              heartCount=JSON.parse(localStorage.getItem("HeartCount"));
            }
              for (let i = 0; i < data.length; i++) {
                   document.querySelector("#wishlist-counter").innerText = heartCount;
                   let heartIcon = heartIconArray[i];
                   heartIcon.classList.add('black-class')
                   heartIcon.addEventListener("click", function () {
                     if (this.classList.contains('black-class')) {
                      this.classList.remove('black-class');
                      this.classList.add('red-class');
                       heartCount++;
                       var localHeartCount = heartCount.toString();
                       localStorage.setItem("HeartCount", localHeartCount);
                       document.querySelector("#wishlist-counter").innerText = heartCount;
                     } 
                     else if (this.classList.contains('red-class')) {
                      this.classList.remove('red-class');
                      this.classList.add('black-class');
                       heartCount--;
                       document.querySelector("#wishlist-counter").innerText = heartCount;
                     }
                     else{
                        return;
                     }
                });
              }
            }
      
     //toggle functionality
       $("#filter-price-slider").click(function () {
         $("div.price-slide").toggleClass("rangeSliderShow");
       });
       $("#filter-brand").click(function () {
         $("div.brands-list").toggleClass("show");
       });
       $("a.preventing_reloading").click(function (event) {
         event.preventDefault();
       });
       //slider functionality
       $("#slider").slider({
         range: true,
         min: 50,
         max: 2000,
         values: [50, 2000],
         slide: function (event, ui) {
           document.getElementById("minimumPrice").innerText = `${ui.values[0]}`;
           document.getElementById("maximumPrice").innerText = `${ui.values[1]}`;
         },
       });
     
     
     // clearing all checkboxes when clear is clicked
     document.querySelector("#clear-all").addEventListener('click', function (event) {
      event.preventDefault();
       var checkboxCollection = document.querySelectorAll(
         "input[type=checkbox]"
       );
       for (var i = 0; i < checkboxCollection.length; i++) {
         checkboxCollection[i].checked = false;
       }
       displayData(tempData);
     }
     );
    }
   catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
});
 
















